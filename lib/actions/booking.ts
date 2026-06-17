"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { stripe } from "@/lib/stripe/server";
import { SITE, DEFAULT_COMMISSION_RATE } from "@/lib/constants";
import { getVendor } from "@/data/vendors";
import { getCategory } from "@/data/categories";

type SupabaseAdmin = ReturnType<typeof createAdminClient>;

export interface BookingInput {
  vendorSlug: string;
  serviceTitle?: string;
  eventType?: string;
  eventDate?: string; // yyyy-mm-dd
  guests?: number;
  estimate: number; // whole €
  message?: string;
  options?: string[];
}

export type QuoteResult = { ok: true } | { ok: false; error: string; needAuth?: boolean };
export type CheckoutResult = { url: string } | { error: string; needAuth?: boolean };

/**
 * Provisioning paresseux : garantit que le prestataire du catalogue statique
 * existe en base (sans propriétaire) et renvoie son UUID. Idempotent par slug.
 */
async function ensureVendorInDb(admin: SupabaseAdmin, slug: string): Promise<string | null> {
  const existing = await admin.from("vendors").select("id").eq("slug", slug).maybeSingle();
  if (existing.data?.id) return existing.data.id as string;

  const v = getVendor(slug);
  if (!v) return null;

  // Catégorie (créée si absente)
  let categoryId: string | null = null;
  const cat = getCategory(v.category);
  if (cat) {
    const c = await admin.from("categories").select("id").eq("slug", cat.slug).maybeSingle();
    if (c.data?.id) {
      categoryId = c.data.id as string;
    } else {
      const nc = await admin
        .from("categories")
        .insert({ slug: cat.slug, name: cat.name, icon: cat.icon, description: cat.description })
        .select("id")
        .maybeSingle();
      categoryId = (nc.data?.id as string) ?? null;
    }
  }

  const inserted = await admin
    .from("vendors")
    .insert({
      slug: v.slug,
      business_name: v.businessName,
      tagline: v.tagline,
      description: v.description,
      category_id: categoryId,
      city: v.city,
      starting_price: v.startingPrice,
      average_rating: v.averageRating,
      reviews_count: v.reviewsCount,
      is_verified: v.isVerified,
      is_featured: Boolean(v.isFeatured),
      is_elite: Boolean(v.isElite),
      is_published: true,
      home_service: Boolean(v.homeService),
      response_time: v.responseTime,
      response_rate: v.responseRate,
      cover_url: v.coverUrl,
      source: "catalog",
    })
    .select("id")
    .maybeSingle();

  if (inserted.error || !inserted.data) {
    // Course possible sur le slug unique : on relit.
    const again = await admin.from("vendors").select("id").eq("slug", slug).maybeSingle();
    return (again.data?.id as string) ?? null;
  }

  const vendorId = inserted.data.id as string;

  // Prestations (best-effort, pour le futur espace prestataire)
  if (v.services?.length) {
    await admin.from("vendor_services").insert(
      v.services.map((s, i) => ({
        vendor_id: vendorId,
        title: s.title,
        description: s.description ?? null,
        price: s.price,
        price_unit: s.priceUnit ?? "forfait",
        duration: s.duration ?? null,
        is_pack: Boolean(s.isPack),
        sort_order: i,
      })),
    );
  }

  return vendorId;
}

async function ensureProfile(admin: SupabaseAdmin, userId: string, email?: string | null) {
  await admin
    .from("profiles")
    .upsert({ id: userId, email: email ?? null }, { onConflict: "id", ignoreDuplicates: true });
}

function composeMessage(input: BookingInput): string {
  const parts: string[] = [];
  if (input.serviceTitle) parts.push(`Prestation : ${input.serviceTitle}`);
  if (input.options?.length) parts.push(`Options : ${input.options.join(", ")}`);
  if (input.guests) parts.push(`Invités : ${input.guests}`);
  parts.push(`Estimation : ${input.estimate} €`);
  if (input.message?.trim()) parts.push(`\n${input.message.trim()}`);
  return parts.join(" · ");
}

/** Demande de devis : persiste une booking_request + notifie le prestataire. */
export async function requestQuote(input: BookingInput): Promise<QuoteResult> {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { ok: false, error: "Connectez-vous pour envoyer votre demande.", needAuth: true };

    const admin = createAdminClient();
    await ensureProfile(admin, user.id, user.email);

    const vendorId = await ensureVendorInDb(admin, input.vendorSlug);
    if (!vendorId) return { ok: false, error: "Prestataire introuvable." };

    const { error } = await admin.from("booking_requests").insert({
      client_id: user.id,
      vendor_id: vendorId,
      event_type: input.eventType ?? null,
      event_date: input.eventDate || null,
      guest_count: input.guests ?? null,
      budget: Math.round(input.estimate) || null,
      message: composeMessage(input),
      status: "pending",
    });
    if (error) return { ok: false, error: "Impossible d'envoyer la demande pour le moment." };

    // Notifie l'owner du prestataire s'il en a un.
    const owner = await admin.from("vendors").select("user_id, business_name").eq("id", vendorId).maybeSingle();
    if (owner.data?.user_id) {
      await admin.from("notifications").insert({
        user_id: owner.data.user_id,
        type: "booking_request",
        title: "Nouvelle demande de devis",
        body: `Vous avez reçu une demande pour ${input.eventType ?? "un événement"}.`,
        link: "/dashboard/vendor/demandes",
      });
    }

    return { ok: true };
  } catch (err) {
    console.error("[requestQuote]", err);
    return { ok: false, error: "Une erreur est survenue. Réessayez." };
  }
}

/**
 * Réservation directe : crée une booking (pending/unpaid) + une session
 * Stripe Checkout pour l'acompte, et renvoie l'URL de paiement.
 */
export async function createBookingCheckout(input: BookingInput): Promise<CheckoutResult> {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Connectez-vous pour réserver.", needAuth: true };

    const admin = createAdminClient();
    await ensureProfile(admin, user.id, user.email);

    const vendorId = await ensureVendorInDb(admin, input.vendorSlug);
    if (!vendorId) return { error: "Prestataire introuvable." };

    const settings = await admin
      .from("commission_settings")
      .select("rate, deposit_percent")
      .eq("id", 1)
      .maybeSingle();
    const rate = Number(settings.data?.rate ?? DEFAULT_COMMISSION_RATE);
    const depositPct = Number(settings.data?.deposit_percent ?? 30);

    const finalPrice = Math.max(1, Math.round(input.estimate));
    const depositAmount = Math.max(1, Math.round((finalPrice * depositPct) / 100));
    const commissionAmount = Math.round((finalPrice * rate) / 100);

    const booking = await admin
      .from("bookings")
      .insert({
        client_id: user.id,
        vendor_id: vendorId,
        event_date: input.eventDate || null,
        final_price: finalPrice,
        deposit_amount: depositAmount,
        commission_rate: rate,
        commission_amount: commissionAmount,
        status: "pending",
        payment_status: "unpaid",
      })
      .select("id")
      .maybeSingle();
    if (booking.error || !booking.data) return { error: "Impossible de créer la réservation." };
    const bookingId = booking.data.id as string;

    await admin.from("payments").insert({
      booking_id: bookingId,
      payer_id: user.id,
      vendor_id: vendorId,
      amount: depositAmount,
      kind: "deposit",
      status: "pending",
    });

    const v = getVendor(input.vendorSlug);
    const productName = `Acompte — ${v?.businessName ?? "Prestataire"}${input.serviceTitle ? ` · ${input.serviceTitle}` : ""}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: { name: productName },
            unit_amount: depositAmount * 100,
          },
          quantity: 1,
        },
      ],
      customer_email: user.email ?? undefined,
      client_reference_id: bookingId,
      metadata: { kind: "booking_deposit", bookingId },
      payment_intent_data: { metadata: { kind: "booking_deposit", bookingId } },
      success_url: `${SITE.url}/dashboard/client/reservations?success=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE.url}/prestataires/${input.vendorSlug}?canceled=1`,
    });

    await admin.from("payments").update({ stripe_checkout_id: session.id }).eq("booking_id", bookingId);

    if (!session.url) return { error: "Session de paiement indisponible." };
    return { url: session.url };
  } catch (err) {
    console.error("[createBookingCheckout]", err);
    return { error: "Le paiement n'a pas pu être initié. Réessayez." };
  }
}
