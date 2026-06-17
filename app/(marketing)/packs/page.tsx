import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { BUNDLES } from "@/data/bundles";
import { BundleCard } from "@/components/marketplace/bundle-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { RibbonMark } from "@/components/shared/ribbon-mark";

export const metadata: Metadata = {
  title: "Packs événementiels — une équipe complète, prête à réserver",
  description:
    "Réservez une équipe complète de talents en un seul geste : mariage, anniversaire, baby shower, événement d'entreprise, shooting et plus. Des packs premium coordonnés par Lystra.",
};

export default function PacksPage() {
  return (
    <>
      {/* En-tête éditorial clair */}
      <section className="relative overflow-hidden bg-ivory-fade">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-lystra-champagne/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-lystra-plum/[0.05] blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-6 py-16 text-center lg:py-24">
          <p className="eyebrow justify-center">Packs événementiels</p>
          <h1 className="display mt-4 text-balance text-4xl leading-[1.1] text-lystra-ink lg:text-5xl">
            Une équipe complète, prête à réserver
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg text-lystra-gray">
            Plutôt qu'un simple contact, Lystra réunit pour vous les bons talents — beauté, image,
            lieu, décoration — déjà coordonnés. Un pack, une demande, un seul interlocuteur.
          </p>
        </div>
      </section>

      {/* Grille de packs */}
      <section className="bg-lystra-ivory py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BUNDLES.map((b) => (
              <BundleCard key={b.slug} bundle={b} />
            ))}
          </div>
        </div>
      </section>

      {/* Pack sur mesure */}
      <section className="bg-lystra-cream/50 py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative overflow-hidden rounded-[2rem] border border-lystra-champagne/30 bg-white/70 px-8 py-12 shadow-card lg:px-14 lg:py-16">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-lystra-plum/[0.05] blur-3xl" />
            <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 text-[0.72rem] font-medium uppercase tracking-eyebrow text-lystra-champagne">
                  <RibbonMark withDots={false} className="h-4 w-4" />
                  Conciergerie
                </span>
                <SectionHeading
                  className="mt-3"
                  title="Besoin d'un pack sur mesure ?"
                  intro="Un moment singulier, une exigence particulière ? Notre conciergerie compose une sélection de talents taillée pour votre événement, et orchestre tout de A à Z."
                />
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
                <Button asChild variant="champagne" size="lg">
                  <Link href="/conciergerie">
                    <Sparkles className="h-4 w-4" /> Demander la conciergerie
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/prestataires">Explorer les talents</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-center bg-lystra-ivory pb-12">
        <RibbonMark withDots={false} className="h-8 w-8 text-lystra-champagne/40" />
      </div>
    </>
  );
}
