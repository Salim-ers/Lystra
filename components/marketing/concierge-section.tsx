import Link from "next/link";
import { ArrowRight, MessageSquare, ListChecks, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RibbonMark } from "@/components/shared/ribbon-mark";
import { CONCIERGE_PRICE } from "@/lib/constants";

const STEPS = [
  { icon: MessageSquare, text: "Décrivez votre besoin en 2 minutes" },
  { icon: Sparkles, text: "Nos experts qualifient votre projet" },
  { icon: ListChecks, text: "Recevez 3 sélections sur mesure" },
];

/**
 * Conciergerie — panneau prune SUBTIL (carte arrondie sur fond ivoire),
 * jamais un grand mur de couleur plein écran.
 */
export function ConciergeSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-lystra-plum/15 bg-lystra-plum/[0.04] px-6 py-12 sm:px-12 lg:py-16">
        <RibbonMark
          withDots={false}
          className="pointer-events-none absolute -right-8 -top-8 h-48 w-48 text-lystra-plum/[0.06]"
        />
        <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-[#8a6a2f]">
              <RibbonMark withDots={false} className="h-3.5 w-3.5 text-lystra-champagne" />
              Conciergerie Lystra
            </span>
            <h2 className="display mt-4 text-3xl text-lystra-ink sm:text-4xl">
              Confiez-nous votre recherche.
            </h2>
            <p className="mt-4 max-w-lg text-pretty leading-relaxed text-lystra-gray">
              Pas le temps de comparer ? Nos experts qualifient votre projet et vous proposent
              une shortlist de talents disponibles, adaptés à votre style et votre budget.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild variant="default" size="lg" className="gap-2">
                <Link href="/conciergerie">
                  Confier ma recherche <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <span className="text-sm text-lystra-gray">
                À partir de <strong className="font-medium text-lystra-ink">{CONCIERGE_PRICE} €</strong>
              </span>
            </div>
          </div>

          <ul className="space-y-3">
            {STEPS.map((s, i) => (
              <li
                key={i}
                className="flex items-center gap-4 rounded-2xl border border-lystra-champagne/25 bg-white/70 px-5 py-4"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-lystra-champagne/15 text-[#8a6a2f]">
                  <s.icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-medium text-lystra-ink">
                  <span className="mr-2 font-serif text-lystra-champagne">{i + 1}.</span>
                  {s.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
