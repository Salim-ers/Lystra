import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { CATEGORIES, getCategory } from "@/data/categories";
import { getVendorsByCategory } from "@/data/vendors";
import { CITIES, CITY_SLUGS, cityFromSlug } from "@/lib/constants";
import { VendorGrid } from "@/components/marketplace/vendor-grid";
import { SiteShell } from "@/components/marketing/site-shell";

export const dynamicParams = false;

export function generateStaticParams() {
  const params: { category: string; city: string }[] = [];
  for (const c of CATEGORIES) {
    for (const city of CITIES) {
      params.push({ category: c.slug, city: CITY_SLUGS[city] });
    }
  }
  return params;
}

export function generateMetadata({ params }: { params: { category: string; city: string } }): Metadata {
  const category = getCategory(params.category);
  const city = cityFromSlug(params.city);
  if (!category || !city) return { title: "Page introuvable" };
  // Évite l'index bloat : une combinaison sans talent reste accessible mais
  // n'est pas indexée et se canonicalise vers la page catégorie parente.
  const empty = getVendorsByCategory(category.slug).filter((v) => v.city === city).length === 0;
  return {
    title: `${category.name} à ${city} — comparez & réservez`,
    description: `Les meilleurs ${category.name.toLowerCase()} à ${city} : profils vérifiés, packs, avis et réservation directe sur Lystra. Pour mariages, anniversaires, événements pro et plus.`,
    robots: empty ? { index: false, follow: true } : undefined,
    alternates: { canonical: empty ? `/${category.slug}` : `/${category.slug}/${params.city}` },
  };
}

export default function CategoryCityPage({ params }: { params: { category: string; city: string } }) {
  const category = getCategory(params.category);
  const city = cityFromSlug(params.city);
  if (!category || !city) notFound();

  const vendors = getVendorsByCategory(category.slug).filter((v) => v.city === city);
  const otherCities = CITIES.filter((c) => c !== city);

  return (
    <SiteShell>
      <div className="bg-lystra-ivory">
        <section className="relative overflow-hidden bg-ivory-fade">
          <div className="pointer-events-none absolute -right-24 -top-20 h-80 w-80 rounded-full bg-lystra-champagne/15 blur-3xl" />
          <div className="relative mx-auto max-w-6xl px-6 py-12 lg:py-16">
            <nav className="flex flex-wrap items-center gap-1.5 text-xs text-lystra-gray">
              <Link href="/" className="hover:text-lystra-plum">Accueil</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href={`/${category.slug}`} className="hover:text-lystra-plum">{category.name}</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-lystra-ink">{city}</span>
            </nav>
            <h1 className="display mt-4 text-4xl text-lystra-ink lg:text-5xl">{category.name} à {city}</h1>
            <p className="mt-4 max-w-2xl text-pretty text-lg text-lystra-gray">
              Trouvez et réservez les meilleurs {category.name.toLowerCase()} à {city} et alentours.
              Profils vérifiés, disponibilités en temps réel et acompte sécurisé.
            </p>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-lystra-gray">
                {vendors.length} talent{vendors.length > 1 ? "s" : ""} à {city}
              </p>
              <Link href={`/prestataires?category=${category.slug}&city=${encodeURIComponent(city)}`} className="text-sm font-medium text-lystra-plum hover:underline">
                Affiner la recherche →
              </Link>
            </div>
            {vendors.length > 0 ? (
              <VendorGrid vendors={vendors} />
            ) : (
              <div className="rounded-2xl border border-lystra-champagne/25 bg-white/60 p-8 text-center">
                <p className="text-lystra-ink">Aucun·e {category.name.toLowerCase()} à {city} pour l&apos;instant.</p>
                <p className="mt-2 text-sm text-lystra-gray">
                  Découvrez tous les <Link href={`/${category.slug}`} className="text-lystra-plum hover:underline">{category.name.toLowerCase()}</Link> ou
                  confiez-nous votre <Link href="/conciergerie" className="text-lystra-plum hover:underline">recherche</Link>.
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="border-t border-lystra-champagne/20 bg-lystra-cream/40 py-12">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="font-serif text-xl text-lystra-ink">{category.name} dans d&apos;autres villes</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {otherCities.map((c) => (
                <Link key={c} href={`/${category.slug}/${CITY_SLUGS[c]}`} className="rounded-full border border-lystra-champagne/30 bg-white/70 px-3.5 py-1.5 text-sm text-lystra-ink transition hover:border-lystra-champagne">
                  {category.name} à {c}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
