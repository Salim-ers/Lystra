import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { EVENT_SLUGS, getEventBySlug, CITIES, CITY_SLUGS } from "@/lib/constants";
import { getVendorsByEvent } from "@/data/vendors";
import { CATEGORIES, getCategory } from "@/data/categories";
import { VendorGrid } from "@/components/marketplace/vendor-grid";
import { SiteShell } from "@/components/marketing/site-shell";

export const dynamicParams = false;

export function generateStaticParams() {
  const params: { slug: string; category: string }[] = [];
  for (const e of EVENT_SLUGS) {
    for (const c of CATEGORIES) {
      params.push({ slug: e.slug, category: c.slug });
    }
  }
  return params;
}

export function generateMetadata({ params }: { params: { slug: string; category: string } }): Metadata {
  const event = getEventBySlug(params.slug);
  const category = getCategory(params.category);
  if (!event || !category) return { title: "Page introuvable" };
  const empty = getVendorsByEvent(event.label).filter(
    (v) => v.category === category.slug || v.secondaryCategories?.includes(category.slug),
  ).length === 0;
  return {
    title: `${category.name} pour ${event.label.toLowerCase()} — Lystra`,
    description: `Les meilleurs ${category.name.toLowerCase()} pour votre ${event.label.toLowerCase()} : profils vérifiés, packs, avis et réservation directe sur Lystra.`,
    robots: empty ? { index: false, follow: true } : undefined,
    alternates: { canonical: empty ? `/evenement/${event.slug}` : `/evenement/${event.slug}/${category.slug}` },
  };
}

export default function EventCategoryPage({ params }: { params: { slug: string; category: string } }) {
  const event = getEventBySlug(params.slug);
  const category = getCategory(params.category);
  if (!event || !category) notFound();

  const vendors = getVendorsByEvent(event.label).filter(
    (v) => v.category === category.slug || v.secondaryCategories?.includes(category.slug),
  );

  return (
    <SiteShell>
      <div className="bg-lystra-ivory">
        <section className="relative overflow-hidden bg-ivory-fade">
          <div className="pointer-events-none absolute -right-24 -top-20 h-80 w-80 rounded-full bg-lystra-champagne/15 blur-3xl" />
          <div className="relative mx-auto max-w-6xl px-6 py-12 lg:py-16">
            <nav className="flex flex-wrap items-center gap-1.5 text-xs text-lystra-gray">
              <Link href="/" className="hover:text-lystra-plum">Accueil</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href={`/evenement/${event.slug}`} className="hover:text-lystra-plum">{event.label}</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-lystra-ink">{category.name}</span>
            </nav>
            <h1 className="display mt-4 text-4xl text-lystra-ink lg:text-5xl">
              {category.name} pour {event.label.toLowerCase()}
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-lg text-lystra-gray">
              {category.name} spécialisé·e·s pour votre {event.label.toLowerCase()}. Comparez,
              consultez les avis vérifiés et réservez votre date.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {CITIES.slice(0, 6).map((city) => (
                <Link key={city} href={`/${category.slug}/${CITY_SLUGS[city]}`} className="rounded-full border border-lystra-champagne/30 bg-white/70 px-3.5 py-1.5 text-sm text-lystra-ink transition hover:border-lystra-champagne">
                  {category.name} à {city}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-6xl px-6">
            <p className="mb-6 text-sm text-lystra-gray">
              {vendors.length} talent{vendors.length > 1 ? "s" : ""} pour {event.label.toLowerCase()}
            </p>
            {vendors.length > 0 ? (
              <VendorGrid vendors={vendors} />
            ) : (
              <div className="rounded-2xl border border-lystra-champagne/25 bg-white/60 p-8 text-center">
                <p className="text-lystra-ink">Aucun talent pour cette combinaison pour l&apos;instant.</p>
                <p className="mt-2 text-sm text-lystra-gray">
                  Voir tous les <Link href={`/${category.slug}`} className="text-lystra-plum hover:underline">{category.name.toLowerCase()}</Link> ou
                  les talents pour <Link href={`/evenement/${event.slug}`} className="text-lystra-plum hover:underline">{event.label.toLowerCase()}</Link>.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
