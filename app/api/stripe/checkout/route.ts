import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/server";
import { STRIPE_PRICE_IDS } from "@/lib/stripe/plans";
import { SITE } from "@/lib/constants";

/**
 * Creates a Stripe Checkout Session for a vendor subscription.
 * Body: { plan: "starter" | "pro" | "elite", vendorId?: string, email?: string }
 */
export async function POST(req: Request) {
  try {
    const { plan, vendorId, email } = await req.json();

    const priceId = STRIPE_PRICE_IDS[plan as string];
    if (!priceId) {
      return NextResponse.json({ error: "Offre inconnue ou prix Stripe non configuré." }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email,
      client_reference_id: vendorId,
      subscription_data: {
        metadata: { vendorId: vendorId ?? "", plan },
      },
      metadata: { vendorId: vendorId ?? "", plan },
      allow_promotion_codes: true,
      success_url: `${SITE.url}/dashboard/vendor/abonnement?success=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE.url}/pricing?canceled=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[stripe/checkout]", err);
    return NextResponse.json({ error: "Impossible de créer la session de paiement." }, { status: 500 });
  }
}
