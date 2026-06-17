import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { EVENT_SLUGS, getEventBySlug } from "@/lib/constants";
import { getVendorsByEvent } from "@/data/vendors";
import { CATEGORIES } from "@/data/categories";
import { FAMILIES } from "@/data/families";
import { VendorGrid } from "@/components/marketplace/vendor-grid";
import { SiteShell } from "@/components/marketing/site-shell";

export const dynamicParams = false;

export function generateStaticParams() {
  return EVENT_SLUGS.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const event = getEventBySlug(params.slug);
  if (!event) return { title: "Événement introuvable" };
  return {
    title: `${event.label} — tous les talents pour votre événement`,
    description: `Composez l'équipe idéale pour votre ${event.label.toLowerCase()} : beauté, image, décoration, lieux, gastronomie et animation. Talents vérifiés et réservables sur Lystra.`,
    alternates: { canonical: `/evenement/${event.slug}` },
  };
}

const TOP_ROLES = ["photographe", "maquilleur", "coiffeur", "traiteur", "fleuriste", "dj", "decorateur", "lieu-evenementiel"];

export default function EventLandingPage({ params }: { params: { slug: string } }) {
  const event = getEventBySlug(params.slug);
  if (!event) notFound();

  const vendors = getVendorsByEvent(event.label).slice(0, 9);
  const roles = TOP_ROLES.map((s) => CATEGORIES.find((c) => c.slug === s)).filter(Boolean);

  return (
    <SiteShell>
      <div className="bg-lystra-ivory">
        <section className="relative overflow-hidden bg-ivory-fade">
          <div className="pointer-events-none absolute -right-24 -top-20 h-80 w-80 rounded-full bg-lystra-champagne/15 blur-3xl" />
          <div className="relative mx-auto max-w-6xl px-6 py-12 lg:py-16">
            <nav className="flex items-center gap-1.5 text-xs text-lystra-gray">
              <Link href="/" className="hover:text-lystra-plum">Accueil</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-lystra-ink">{event.label}</span>
            </nav>
            <h1 className="display mt-4 text-4xl text-lystra-ink lg:text-5xl">
              Vos talents pour un {event.label.toLowerCase()} d&apos;exception
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-lg text-lystra-gray">
              Beauté, image, décoration, lieux, gastronomie et animation — tous les métiers réunis
              pour composer votre {event.label.toLowerCase()}, en un seul endroit.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {roles.map((c) => c && (
                <Link key={c.slug} href={`/evenement/${event.slug}/${c.slug}`} className="rounded-full border border-lystra-champagne/30 bg-white/70 px-3.5 py-1.5 text-sm text-lystra-ink transition hover:border-lystra-champagne hover:shadow-soft">
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-serif text-2xl text-lystra-ink">Talents recommandés</h2>
              <Link href={`/prestataires?event=${encodeURIComponent(event.label)}`} className="text-sm font-medium text-lystra-plum hover:underline">
                Tout voir →
              </Link>
            </div>
            <VendorGrid vendors={vendors} />
          </div>
        </section>

        <section className="border-t border-lystra-champagne/20 bg-lystra-cream/40 py-12">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="font-serif text-xl text-lystra-ink">Tous les univers pour votre {event.label.toLowerCase()}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {FAMILIES.map((f) => (
                <Link key={f.slug} href={`/prestataires?family=${f.slug}&event=${encodeURIComponent(event.label)}`} className="rounded-full border border-lystra-champagne/30 bg-white/70 px-3.5 py-1.5 text-sm text-lystra-ink transition hover:border-lystra-champagne">
                  {f.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
