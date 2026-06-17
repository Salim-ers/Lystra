import type { Metadata } from "next";
import { RibbonMark } from "@/components/shared/ribbon-mark";
import { MatchingQuiz } from "@/components/marketing/matching-quiz";

export const metadata: Metadata = {
  title: "Trouvez votre talent idéal",
  description:
    "Répondez à quelques questions et laissez Lystra vous recommander les talents les plus adaptés à votre moment : événement, ville, budget, style et plus encore.",
};

export default function TrouverPage() {
  return (
    <section className="relative overflow-hidden bg-ivory-fade py-16 lg:py-24">
      <RibbonMark
        className="pointer-events-none absolute -right-24 top-24 h-[26rem] w-[26rem] text-lystra-champagne/[0.07]"
        withDots={false}
      />

      <div className="mx-auto max-w-3xl px-6">
        {/* En-tête éditorial */}
        <header className="text-center">
          <p className="eyebrow justify-center">
            <RibbonMark withDots={false} className="h-4 w-4 text-lystra-champagne" />
            Matching intelligent
          </p>
          <h1 className="display mt-4 text-balance text-4xl leading-[1.1] text-lystra-ink sm:text-5xl">
            Trouvez votre talent idéal
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-lystra-gray">
            Quelques questions suffisent. Nous composons une sélection sur mesure de talents
            d'exception pour votre moment.
          </p>
        </header>

        {/* Quiz multi-étapes */}
        <div className="mt-12">
          <MatchingQuiz />
        </div>
      </div>
    </section>
  );
}
