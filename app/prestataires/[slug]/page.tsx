import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  MapPin, ChevronLeft, ShieldCheck, Clock, CheckCircle2, HelpCircle, Share2, Navigation,
} from "lucide-react";
import { VENDORS, getVendor, getSimilarVendors } from "@/data/vendors";
import { formatPrice } from "@/lib/utils";
import { RatingStars } from "@/components/shared/rating-stars";
import { VerifiedBadge, EliteBadge } from "@/components/shared/verified-badge";
import { FavoriteButton } from "@/components/shared/favorite-button";
import { AvailabilityBadge } from "@/components/shared/availability-badge";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookingBox } from "@/components/marketplace/booking-box";
import { TrustPanel } from "@/components/marketplace/trust-panel";
import { ReviewCard } from "@/components/marketplace/review-card";
import { VendorCard } from "@/components/marketplace/vendor-card";

export function generateStaticParams() {
  return VENDORS.map((v) => ({ slug: v.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const vendor = getVendor(params.slug);
  if (!vendor) return { title: "Talent introuvable" };
  return {
    title: `${vendor.businessName} — ${vendor.categoryName} à ${vendor.city}`,
    description: vendor.description?.slice(0, 155) ?? vendor.tagline,
    openGraph: {
      title: `${vendor.businessName} · Lystra`,
      description: vendor.tagline ?? vendor.description,
      images: [{ url: vendor.coverUrl }],
    },
  };
}

const DEFAULT_FAQ = [
  { q: "Comment réserver ce talent ?", a: "Sélectionnez une prestation et une date, puis envoyez votre demande. Le talent vous répond avec un devis ; après validation, vous réglez l'acompte en ligne pour confirmer." },
  { q: "Le déplacement est-il inclus ?", a: "La zone d'intervention couvre un rayon défini autour de la ville. Au-delà, des frais de déplacement peuvent s'appliquer et figureront sur votre devis." },
  { q: "Puis-je personnaliser une prestation ?", a: "Oui. Indiquez vos besoins dans votre message : la plupart des talents Lystra proposent des formules sur mesure." },
];

export default function VendorPage({ params }: { params: { slug: string } }) {
  const vendor = getVendor(params.slug);
  if (!vendor) notFound();

  const photos = vendor.photos?.length ? vendor.photos : [vendor.coverUrl];
  const ratingAvg = vendor.averageRating;
  const faq = vendor.faq?.length ? vendor.faq : DEFAULT_FAQ;
  const packs = vendor.services.filter((s) => s.isPack);
  const similar = getSimilarVendors(vendor, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: vendor.businessName,
    description: vendor.description,
    address: { "@type": "PostalAddress", addressLocality: vendor.city, addressCountry: "FR" },
    image: vendor.coverUrl,
    aggregateRating: { "@type": "AggregateRating", ratingValue: ratingAvg, reviewCount: vendor.reviewsCount },
    priceRange: vendor.startingPrice ? `À partir de ${vendor.startingPrice}€` : undefined,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Link href="/prestataires" className="inline-flex items-center gap-1 text-sm text-lystra-gray transition hover:text-lystra-plum">
        <ChevronLeft className="h-4 w-4" /> Retour aux talents
      </Link>

      {/* Gallery */}
      <div className="mt-4 grid gap-2 md:h-[440px] md:grid-cols-3">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl md:col-span-2 md:aspect-auto md:h-full">
          <Image src={photos[0]} alt={vendor.businessName} fill priority sizes="(max-width:768px) 100vw, 66vw" className="object-cover" />
          <div className="absolute right-4 top-4 flex gap-2">
            <FavoriteButton initial vendorSlug={vendor.slug} />
            <button className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-lystra-champagne/30 bg-white/85 shadow-soft transition hover:scale-105" aria-label="Partager">
              <Share2 className="h-[18px] w-[18px] text-lystra-ink/70" />
            </button>
          </div>
        </div>
        <div className="hidden grid-rows-2 gap-2 md:grid">
          {photos.slice(1, 3).map((p, i) => (
            <div key={i} className="relative overflow-hidden rounded-2xl">
              <Image src={p} alt={`${vendor.businessName} ${i + 2}`} fill sizes="33vw" className="object-cover" />
            </div>
          ))}
          {photos.length < 3 && <div className="rounded-2xl bg-lystra-plum/5" />}
        </div>
      </div>

      {/* Header + content / booking */}
      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="champagne">{vendor.categoryName}</Badge>
            {vendor.isElite ? <EliteBadge /> : vendor.isVerified && <VerifiedBadge />}
            <AvailabilityBadge status={vendor.availability} />
            {vendor.homeService && <Badge variant="soft">À domicile</Badge>}
          </div>

          <h1 className="display mt-3 text-3xl text-lystra-ink sm:text-4xl">{vendor.businessName}</h1>
          {vendor.tagline && <p className="mt-2 text-lg text-lystra-gray">{vendor.tagline}</p>}

          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-lystra-gray">
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-lystra-champagne" /> {vendor.city}{vendor.serviceRadiusKm ? ` · rayon ${vendor.serviceRadiusKm} km` : ""}</span>
            <RatingStars rating={ratingAvg} count={vendor.reviewsCount} size="md" />
            {vendor.responseTime && <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-lystra-champagne" /> Répond {vendor.responseTime}</span>}
          </div>

          <Separator className="my-8 bg-lystra-champagne/20" />

          {/* Score de confiance */}
          <TrustPanel vendor={vendor} />

          <Separator className="my-8 bg-lystra-champagne/20" />

          {/* À propos */}
          <section>
            <h2 className="font-serif text-2xl text-lystra-ink">À propos</h2>
            <p className="mt-4 leading-relaxed text-lystra-ink/85">{vendor.description}</p>

            {vendor.eventTypes && vendor.eventTypes.length > 0 && (
              <div className="mt-6">
                <p className="text-xs uppercase tracking-wide text-lystra-gray">Types d&apos;événements acceptés</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {vendor.eventTypes.map((e) => <Badge key={e} variant="outline">{e}</Badge>)}
                </div>
              </div>
            )}

            {vendor.zones && vendor.zones.length > 0 && (
              <div className="mt-5">
                <p className="text-xs uppercase tracking-wide text-lystra-gray">Zone d&apos;intervention</p>
                <p className="mt-2 flex items-center gap-2 text-sm text-lystra-ink/85">
                  <Navigation className="h-4 w-4 text-lystra-champagne" /> {vendor.zones.join(" · ")}
                </p>
              </div>
            )}
          </section>

          {packs.length > 0 && (
            <>
              <Separator className="my-8 bg-lystra-champagne/20" />
              <section>
                <h2 className="font-serif text-2xl text-lystra-ink">Packs prêts à réserver</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {packs.map((s) => (
                    <div key={s.id} className="rounded-2xl border border-lystra-champagne/30 bg-lystra-cream/70 p-5">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-medium text-lystra-ink">{s.title}</h3>
                        <Badge variant="champagne" className="text-[0.65rem]">Pack</Badge>
                      </div>
                      {s.description && <p className="mt-1 text-sm text-lystra-gray">{s.description}</p>}
                      <p className="mt-3 font-serif text-lg text-lystra-ink">
                        {formatPrice(s.price)}<span className="text-xs font-sans text-lystra-gray"> {s.priceUnit}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          <Separator className="my-8 bg-lystra-champagne/20" />

          {/* Prestations */}
          <section>
            <h2 className="font-serif text-2xl text-lystra-ink">Prestations & tarifs</h2>
            <div className="mt-5 space-y-3">
              {vendor.services.map((s) => (
                <div key={s.id} className="flex items-start justify-between gap-4 rounded-2xl border border-lystra-champagne/20 bg-white/60 p-5">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-medium text-lystra-ink">{s.title}</h3>
                      {s.isPack && <Badge variant="champagne" className="text-[0.65rem]">Pack</Badge>}
                      {s.popular && <Badge variant="soft" className="text-[0.65rem]">Populaire</Badge>}
                    </div>
                    {s.description && <p className="mt-1 text-sm text-lystra-gray">{s.description}</p>}
                    {s.duration && <p className="mt-1 text-xs text-lystra-gray">Durée : {s.duration}</p>}
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-serif text-lg text-lystra-ink">{formatPrice(s.price)}</p>
                    {s.priceUnit && <p className="text-xs text-lystra-gray">{s.priceUnit}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Separator className="my-8 bg-lystra-champagne/20" />

          {/* Avis */}
          <section>
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl text-lystra-ink">Avis clients</h2>
              <RatingStars rating={ratingAvg} count={vendor.reviewsCount} size="md" />
            </div>
            {vendor.reviews && vendor.reviews.length > 0 ? (
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {vendor.reviews.map((r) => <ReviewCard key={r.id} review={r} />)}
              </div>
            ) : (
              <p className="mt-4 text-sm text-lystra-gray">Aucun avis pour le moment — soyez le premier à recommander ce talent.</p>
            )}
          </section>

          <Separator className="my-8 bg-lystra-champagne/20" />

          {/* FAQ */}
          <section>
            <h2 className="font-serif text-2xl text-lystra-ink">Questions fréquentes</h2>
            <div className="mt-5 space-y-4">
              {faq.map((f) => (
                <div key={f.q} className="rounded-2xl border border-lystra-champagne/20 bg-white/60 p-5">
                  <p className="flex items-center gap-2 font-medium text-lystra-ink">
                    <HelpCircle className="h-4 w-4 text-lystra-champagne" /> {f.q}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-lystra-gray">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Conditions */}
          <section className="mt-8 rounded-2xl bg-lystra-plum/5 p-6">
            <h3 className="flex items-center gap-2 font-serif text-lg text-lystra-ink">
              <ShieldCheck className="h-5 w-5 text-lystra-champagne" /> Conditions d&apos;annulation
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-lystra-gray">
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-lystra-champagne" /> Annulation gratuite jusqu&apos;à 30 jours avant l&apos;événement.</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-lystra-champagne" /> Remboursement de l&apos;acompte à 50% entre 30 et 15 jours.</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-lystra-champagne" /> Acompte non remboursable à moins de 15 jours.</li>
            </ul>
          </section>
        </div>

        {/* Sticky booking */}
        <aside>
          <div className="lg:sticky lg:top-24">
            <BookingBox vendor={vendor} />
          </div>
        </aside>
      </div>

      {/* Similar */}
      {similar.length > 0 && (
        <section className="mt-16">
          <h2 className="font-serif text-2xl text-lystra-ink">Talents similaires</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((v) => <VendorCard key={v.id} vendor={v} />)}
          </div>
        </section>
      )}
    </div>
  );
}
