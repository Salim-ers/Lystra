import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/marketing/hero";
import { HeroSearch } from "@/components/marketing/hero-search";
import { FamilyStrip } from "@/components/marketing/family-strip";
import { MomentsSection } from "@/components/marketing/moments-section";
import { ConciergeSection } from "@/components/marketing/concierge-section";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { SubscriptionTeaser } from "@/components/marketing/subscription-teaser";
import { Testimonials } from "@/components/marketing/testimonials";
import { SectionHeading } from "@/components/shared/section-heading";
import { RibbonMark } from "@/components/shared/ribbon-mark";
import { Reveal, RevealStagger, RevealItem } from "@/components/marketing/reveal";
import { CategoryCard } from "@/components/marketplace/category-card";
import { VendorCard } from "@/components/marketplace/vendor-card";
import { BundleCard } from "@/components/marketplace/bundle-card";
import { CATEGORIES, POPULAR_CATEGORY_SLUGS, getCategory } from "@/data/categories";
import { getFeaturedVendors } from "@/data/vendors";
import { BUNDLES } from "@/data/bundles";

export default function HomePage() {
  const popular = POPULAR_CATEGORY_SLUGS.map(getCategory).filter(Boolean).slice(0, 8);
  const featured = getFeaturedVendors(6);
  const bundles = BUNDLES.slice(0, 3);

  return (
    <>
      {/* ---------- HERO (light, editorial) ---------- */}
      <Hero />

      {/* ---------- FLOATING SEARCH ---------- */}
      <div className="relative z-20 mx-auto -mt-6 max-w-6xl px-4 sm:px-6 lg:-mt-10">
        <HeroSearch />
      </div>

      {/* ---------- FAMILIES (breadth signal) ---------- */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-3">
          <SectionHeading eyebrow="Explorez par univers" title="Bien plus qu'un site de mariage" />
          <Button asChild variant="link" className="hidden shrink-0 gap-1 sm:inline-flex">
            <Link href="/prestataires">Tout voir <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </Reveal>
        <div className="mt-8">
          <FamilyStrip />
        </div>
      </section>

      {/* ---------- POPULAR TALENTS ---------- */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <Reveal className="flex items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Les talents les plus recherchés"
            title="Des métiers, pas des cases"
            intro="Coiffeurs, photographes, traiteurs, DJ… des talents pour chaque moment, jamais enfermés dans le mariage."
          />
          <Button asChild variant="link" className="hidden shrink-0 gap-1 sm:inline-flex">
            <Link href="/categories">Toutes les catégories <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </Reveal>
        <RevealStagger className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {popular.map((c) => c && (
            <RevealItem key={c.slug}>
              <CategoryCard category={c} />
            </RevealItem>
          ))}
        </RevealStagger>
      </section>

      {/* ---------- MOMENTS ---------- */}
      <MomentsSection />

      {/* ---------- SÉLECTION LYSTRA ---------- */}
      <section className="bg-lystra-cream/60">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal className="flex items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Sélection Lystra"
              title="Les talents mis en avant"
              intro="Des profils premium, vérifiés et plébiscités par nos clients."
            />
            <Button asChild variant="link" className="hidden shrink-0 gap-1 sm:inline-flex">
              <Link href="/prestataires">Tous les talents <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </Reveal>
          <RevealStagger className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((v, i) => (
              <RevealItem key={v.id} className="h-full [&>a]:h-full">
                <VendorCard vendor={v} priority={i < 3} />
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ---------- BUNDLES ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="flex items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Packs événementiels"
            title="Une équipe complète, prête à réserver"
            intro="Plusieurs talents coordonnés en un seul pack, pensé pour votre occasion."
          />
          <Button asChild variant="link" className="hidden shrink-0 gap-1 sm:inline-flex">
            <Link href="/packs">Tous les packs <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </Reveal>
        <RevealStagger className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bundles.map((b) => (
            <RevealItem key={b.id} className="h-full [&>a]:h-full">
              <BundleCard bundle={b} />
            </RevealItem>
          ))}
        </RevealStagger>
      </section>

      {/* ---------- CONCIERGERIE (subtle) ---------- */}
      <ConciergeSection />

      {/* ---------- HOW IT WORKS ---------- */}
      <HowItWorks />

      {/* ---------- BECOME VENDOR ---------- */}
      <SubscriptionTeaser />

      {/* ---------- TESTIMONIALS ---------- */}
      <Testimonials />

      {/* ---------- FINAL CTA ---------- */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-lystra-champagne/30 bg-ivory-fade px-8 py-16 text-center shadow-soft">
          <RibbonMark withDots={false} className="pointer-events-none absolute left-1/2 top-6 h-16 w-16 -translate-x-1/2 text-lystra-champagne/40" />
          <h2 className="display mt-6 text-3xl text-lystra-ink sm:text-4xl">
            Prêt à composer votre moment d&apos;exception ?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lystra-gray">
            Parcourez les talents, demandez vos devis et réservez en toute sérénité.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="champagne" size="lg" className="gap-2">
              <Link href="/prestataires">Explorer les prestataires <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/conciergerie">Confier ma recherche</Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
