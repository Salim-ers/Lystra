import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  MessageSquare,
  Sparkles,
  ListChecks,
  Clock,
  Gem,
  ShieldCheck,
  CalendarCheck,
} from "lucide-react";
import { CONCIERGE_PRICE } from "@/lib/constants";
import { RibbonMark } from "@/components/shared/ribbon-mark";
import { SectionHeading } from "@/components/shared/section-heading";
import { ConciergeForm } from "@/components/marketing/concierge-form";

export const metadata: Metadata = {
  title: "Conciergerie",
  description:
    "Confiez-nous votre recherche. Nos experts qualifient votre projet et vous proposent 3 sélections de talents disponibles, adaptées à votre style et votre budget. À partir de 49 €.",
};

const STEPS = [
  {
    icon: MessageSquare,
    title: "Décrivez votre besoin",
    text: "Partagez votre projet en quelques minutes : moment, style, budget, lieu et envies.",
  },
  {
    icon: Sparkles,
    title: "Nous qualifions",
    text: "Nos experts étudient votre demande et identifient les talents qui vous correspondent vraiment.",
  },
  {
    icon: ListChecks,
    title: "Recevez 3 sélections",
    text: "Une shortlist sur mesure de talents disponibles, prêts à concrétiser votre événement.",
  },
];

const REASONS = [
  {
    icon: Clock,
    title: "Un gain de temps précieux",
    text: "Plus de recherches interminables : nous comparons et présélectionnons à votre place.",
  },
  {
    icon: Gem,
    title: "Une sélection sur-mesure",
    text: "Chaque proposition est pensée pour votre style, votre budget et l'esprit de votre moment.",
  },
  {
    icon: ShieldCheck,
    title: "Des talents vérifiés",
    text: "Uniquement des professionnels sélectionnés, vérifiés et reconnus pour leur excellence.",
  },
  {
    icon: CalendarCheck,
    title: "Des disponibilités confirmées",
    text: "Nous ne proposons que des talents réellement disponibles à votre date.",
  },
];

export default function ConciergeriePage() {
  return (
    <>
      {/* En-tête éditorial */}
      <section className="relative overflow-hidden bg-ivory-fade py-20 lg:py-28">
        <RibbonMark
          withDots={false}
          className="pointer-events-none absolute -right-24 -top-16 h-[30rem] w-[30rem] text-lystra-plum/[0.04]"
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <span className="inline-flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-[#8a6a2f]">
            <RibbonMark withDots={false} className="h-3.5 w-3.5 text-lystra-champagne" />
            Conciergerie Lystra
          </span>
          <h1 className="display mt-5 text-balance text-4xl leading-[1.1] text-lystra-ink lg:text-6xl">
            Confiez-nous votre recherche.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-lystra-gray">
            Nos experts qualifient votre projet et vous proposent 3 sélections de talents
            disponibles, adaptées à votre style et à votre budget. Vous n'avez plus qu'à choisir.
          </p>
          <p className="mt-6 text-sm text-lystra-gray">
            À partir de{" "}
            <strong className="font-medium text-lystra-ink">{CONCIERGE_PRICE} €</strong>
          </p>
        </div>
      </section>

      {/* 3 étapes */}
      <section className="bg-lystra-ivory py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Comment ça marche"
            title="Trois étapes, zéro effort"
            intro="Un accompagnement discret et premium, du premier échange à votre shortlist."
            align="center"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="relative rounded-[2rem] border border-lystra-champagne/25 bg-white/70 p-8 shadow-soft"
                >
                  <span className="font-serif text-sm text-lystra-champagne">0{i + 1}</span>
                  <span className="mt-4 grid h-12 w-12 place-items-center rounded-full bg-lystra-champagne/15 text-[#8a6a2f]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-serif text-xl text-lystra-ink">{step.title}</h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-lystra-gray">
                    {step.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pourquoi la conciergerie */}
      <section className="bg-lystra-cream py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Pourquoi la conciergerie"
            title="L'exigence d'une maison, le confort d'un service"
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {REASONS.map((reason) => {
              const Icon = reason.icon;
              return (
                <div
                  key={reason.title}
                  className="rounded-2xl border border-lystra-champagne/25 bg-white/70 p-6 shadow-soft"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-lystra-plum/[0.06] text-lystra-plum">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-serif text-lg text-lystra-ink">{reason.title}</h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-lystra-gray">
                    {reason.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Formulaire */}
      <section className="bg-lystra-ivory py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading
            eyebrow="Votre demande"
            title="Parlez-nous de votre moment"
            intro="Plus votre demande est précise, plus notre sélection sera juste. Tout est confidentiel."
            align="center"
          />
          <div className="mt-12">
            <ConciergeForm />
          </div>

          <p className="mt-10 text-center text-sm text-lystra-gray">
            <Link
              href="/trouver"
              className="inline-flex items-center gap-1.5 text-lystra-plum underline-offset-4 transition hover:underline"
            >
              Ou trouvez votre talent idéal en 1 minute
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
