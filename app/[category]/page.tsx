import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { CATEGORIES, getCategory, categoriesByFamily } from "@/data/categories";
import { getVendorsByCategory } from "@/data/vendors";
import { CITIES, CITY_SLUGS, EVENT_SLUGS } from "@/lib/constants";
import { VendorGrid } from "@/components/marketplace/vendor-grid";
import { SiteShell } from "@/components/marketing/site-shell";

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const category = getCategory(params.category);
  if (!category) return { title: "Catégorie introuvable" };
  const title = `${category.name} — comparez & réservez`;
  return {
    title,
    description: `Trouvez, comparez et réservez les meilleurs ${category.name.toLowerCase()} pour tous vos moments d'exception sur Lystra. Profils vérifiés, packs, avis et réservation directe.`,
    alternates: { canonical: `/${category.slug}` },
  };
}

export default function CategoryLandingPage({ params }: { params: { category: string } }) {
  const category = getCategory(params.category);
  if (!category) notFound();

  const vendors = getVendorsByCategory(category.slug);
  const siblings = categoriesByFamily(category.family!).filter((c) => c.slug !== category.slug).slice(0, 8);

  return (
    <SiteShell>
      <div className="bg-lystra-ivory">
        {/* Light header */}
        <section className="relative overflow-hidden bg-ivory-fade">
          <div className="pointer-events-none absolute -right-24 -top-20 h-80 w-80 rounded-full bg-lystra-champagne/15 blur-3xl" />
          <div className="relative mx-auto max-w-6xl px-6 py-12 lg:py-16">
            <nav className="flex items-center gap-1.5 text-xs text-lystra-gray">
              <Link href="/" className="hover:text-lystra-plum">Accueil</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/categories" className="hover:text-lystra-plum">{category.familyName}</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-lystra-ink">{category.name}</span>
            </nav>
            <h1 className="display mt-4 text-4xl text-lystra-ink lg:text-5xl">{category.name}</h1>
            <p className="mt-4 max-w-2xl text-pretty text-lg text-lystra-gray">
              {category.name} sélectionné·e·s par Lystra — comparez les profils, les packs et les
              avis vérifiés, puis réservez en toute sérénité pour vos moments d&apos;exception.
            </p>

            {/* City quick links */}
            <div className="mt-6 flex flex-wrap gap-2">
              {CITIES.map((city) => (
                <Link
                  key={city}
                  href={`/${category.slug}/${CITY_SLUGS[city]}`}
                  className="rounded-full border border-lystra-champagne/30 bg-white/70 px-3.5 py-1.5 text-sm text-lystra-ink transition hover:border-lystra-champagne hover:shadow-soft"
                >
                  {category.name} à {city}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-lystra-gray">
                {vendors.length} talent{vendors.length > 1 ? "s" : ""} disponible{vendors.length > 1 ? "s" : ""}
              </p>
              <Link href={`/prestataires?category=${category.slug}`} className="text-sm font-medium text-lystra-plum hover:underline">
                Affiner la recherche →
              </Link>
            </div>
            <VendorGrid vendors={vendors} />
          </div>
        </section>

        {/* Related categories + events for internal linking */}
        <section className="border-t border-lystra-champagne/20 bg-lystra-cream/40 py-12">
          <div className="mx-auto max-w-6xl space-y-8 px-6">
            {siblings.length > 0 && (
              <div>
                <h2 className="font-serif text-xl text-lystra-ink">Dans le même univers</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {siblings.map((c) => (
                    <Link key={c.slug} href={`/${c.slug}`} className="rounded-full border border-lystra-champagne/30 bg-white/70 px-3.5 py-1.5 text-sm text-lystra-ink transition hover:border-lystra-champagne">
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <div>
              <h2 className="font-serif text-xl text-lystra-ink">{category.name} par moment</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {EVENT_SLUGS.slice(0, 8).map((e) => (
                  <Link key={e.slug} href={`/evenement/${e.slug}/${category.slug}`} className="rounded-full border border-lystra-champagne/30 bg-white/70 px-3.5 py-1.5 text-sm text-lystra-ink transition hover:border-lystra-champagne">
                    {category.name} · {e.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
