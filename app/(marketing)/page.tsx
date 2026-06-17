import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSearch } from "@/components/marketing/hero-search";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { TrustSection } from "@/components/marketing/trust-section";
import { SubscriptionTeaser } from "@/components/marketing/subscription-teaser";
import { Testimonials } from "@/components/marketing/testimonials";
import { SectionHeading } from "@/components/shared/section-heading";
import { CategoryCard } from "@/components/marketplace/category-card";
import { VendorCard } from "@/components/marketplace/vendor-card";
import { RibbonMark } from "@/components/shared/ribbon-mark";
import { CATEGORIES, POPULAR_CATEGORY_SLUGS, getCategory } from "@/data/categories";
import { getFeaturedVendors } from "@/data/vendors";

export default function HomePage() {
  const popular = POPULAR_CATEGORY_SLUGS.map(getCategory).filter(Boolean);
  const featured = getFeaturedVendors(6);

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden bg-plum-deep pb-32 pt-24 sm:pt-28">
        <RibbonMark
          className="pointer-events-none absolute left-1/2 top-10 h-[34rem] w-[34rem] -translate-x-1/2 text-lystra-champagne/[0.06]"
          withDots={false}
        />
        <div className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-lystra-rose/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-lystra-champagne/30 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-lystra-champagne backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Prestataires événementiels sélectionnés
          </span>

          <h1 className="display mt-7 text-balance text-4xl leading-[1.08] text-lystra-cream sm:text-5xl lg:text-6xl">
            Trouvez les prestataires d&apos;exception pour vos plus beaux événements.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-lystra-cream/75 sm:text-lg">
            Coiffeurs, maquilleurs, fleuristes, photographes, traiteurs, décorateurs, lieux de
            réception et talents événementiels sélectionnés, réunis sur une seule plateforme.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="champagne" size="lg" className="gap-2">
              <Link href="/prestataires">Explorer les prestataires <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="dark" size="lg">
              <Link href="/register?role=vendor">Rejoindre en tant que prestataire</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ---------- FLOATING SEARCH (overlaps hero / ivory boundary) ---------- */}
      <div className="relative z-20 mx-auto -mt-20 max-w-5xl px-4 sm:px-6">
        <HeroSearch />
      </div>

      {/* ---------- POPULAR CATEGORIES ---------- */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Catégories populaires"
            title="Tout ce qu'il faut pour un événement réussi"
            intro="Des talents pour chaque moment, de la décoration florale au lieu de réception."
          />
          <Button asChild variant="link" className="hidden shrink-0 gap-1 sm:inline-flex">
            <Link href="/categories">Voir tout <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-6">
          {popular.map((c) => c && <CategoryCard key={c.slug} category={c} />)}
        </div>
      </section>

      {/* ---------- HOW IT WORKS ---------- */}
      <HowItWorks />

      {/* ---------- FEATURED VENDORS ---------- */}
      <section className="bg-lystra-cream/60">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Sélection Lystra"
              title="Prestataires mis en avant"
              intro="Une sélection de profils premium, vérifiés et plébiscités par nos clients."
            />
            <Button asChild variant="link" className="hidden shrink-0 gap-1 sm:inline-flex">
              <Link href="/prestataires">Tous les prestataires <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((v, i) => <VendorCard key={v.id} vendor={v} priority={i < 3} />)}
          </div>
        </div>
      </section>

      {/* ---------- TRUST ---------- */}
      <TrustSection />

      {/* ---------- SUBSCRIPTION ---------- */}
      <SubscriptionTeaser />

      {/* ---------- TESTIMONIALS ---------- */}
      <Testimonials />

      {/* ---------- FINAL CTA ---------- */}
      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-plum-deep px-8 py-16 text-center">
          <RibbonMark className="pointer-events-none absolute right-6 top-6 h-24 w-24 text-lystra-champagne/15" withDots={false} />
          <h2 className="display text-3xl text-lystra-cream sm:text-4xl">Prêt à composer votre événement ?</h2>
          <p className="mx-auto mt-4 max-w-xl text-lystra-cream/75">
            Parcourez les prestataires, demandez vos devis et réservez en toute sérénité.
          </p>
          <Button asChild variant="champagne" size="lg" className="mt-8 gap-2">
            <Link href="/prestataires">Commencer ma recherche <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </>
  );
}
