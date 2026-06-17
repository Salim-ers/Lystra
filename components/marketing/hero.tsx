import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RibbonMark } from "@/components/shared/ribbon-mark";
import { AvailabilityBadge } from "@/components/shared/availability-badge";

const img = (id: string, w = 1100) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/**
 * Hero éditorial clair — direction artistique "maison de luxe / conciergerie".
 * Fond ivoire/champagne, accents prune & or rose, étoile-signature subtile,
 * composition asymétrique avec images événementielles sans humains.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ivory-fade">
      {/* soft champagne glow + faint signature mark — never a flat colour wall */}
      <div className="pointer-events-none absolute -right-32 -top-24 h-[32rem] w-[32rem] rounded-full bg-lystra-champagne/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-lystra-rose/10 blur-3xl" />
      <RibbonMark
        withDots={false}
        className="pointer-events-none absolute -right-10 top-10 hidden h-[26rem] w-[26rem] text-lystra-champagne/[0.07] lg:block"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-12 pt-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-8 lg:pb-16 lg:pt-24">
        {/* ---- Left: editorial copy ---- */}
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-lystra-champagne/40 bg-white/60 px-3.5 py-1.5 text-[0.7rem] uppercase tracking-[0.2em] text-[#8a6a2f] backdrop-blur-sm">
            <RibbonMark withDots={false} className="h-3.5 w-3.5 text-lystra-champagne" />
            Conciergerie &amp; marketplace premium
          </span>

          <h1 className="display mt-6 text-balance text-4xl leading-[1.05] text-lystra-ink sm:text-5xl lg:text-[3.6rem]">
            Trouvez les meilleurs talents pour vos{" "}
            <span className="italic text-lystra-plum">moments d&apos;exception.</span>
          </h1>

          <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-lystra-gray sm:text-lg">
            Beauté, image, décoration, lieux, gastronomie et talents événementiels
            sélectionnés — réunis sur une seule plateforme.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="champagne" size="lg" className="gap-2">
              <Link href="/prestataires">
                Explorer les prestataires <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/conciergerie">
                <RibbonMark withDots={false} withSparkle className="h-4 w-4 text-lystra-champagne" />
                Confier ma recherche
              </Link>
            </Button>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-lystra-gray">
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-lystra-champagne text-lystra-champagne" />
              <strong className="font-medium text-lystra-ink">4,8/5</strong> en moyenne
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-lystra-champagne" />
              <strong className="font-medium text-lystra-ink">1 200+</strong> talents vérifiés
            </span>
          </div>
        </div>

        {/* ---- Right: asymmetric image composition (no humans) ---- */}
        <div className="relative hidden lg:block">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-lystra-champagne/40 shadow-lift">
            <Image
              src={img("1519225421980-715cb0215aed", 1200)}
              alt="Table de réception dressée avec soin"
              fill
              priority
              sizes="(max-width: 1024px) 0px, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-lystra-ink/15 to-transparent" />
          </div>

          {/* floating editorial inset — bouquet detail */}
          <div className="absolute -left-10 bottom-16 h-44 w-36 overflow-hidden rounded-2xl border-4 border-lystra-cream shadow-card">
            <Image
              src={img("1561181286-d3fee7d55364", 600)}
              alt="Bouquet de fleurs fraîches en atelier"
              fill
              sizes="160px"
              className="object-cover"
            />
          </div>

          {/* floating availability card */}
          <div className="absolute -right-4 top-10 rounded-2xl border border-lystra-champagne/40 bg-white/90 px-4 py-3 shadow-card backdrop-blur-sm">
            <AvailabilityBadge status="weekend" size="md" />
            <p className="mt-1.5 text-xs text-lystra-gray">Réservation directe</p>
          </div>
        </div>
      </div>
    </section>
  );
}
