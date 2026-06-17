import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { PLANS } from "@/lib/stripe/plans";
import { PricingCard } from "@/components/marketing/pricing-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { RibbonMark } from "@/components/shared/ribbon-mark";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Tarifs prestataires",
  description:
    "Des abonnements clairs pour développer votre activité événementielle sur Lystra. Starter, Pro et Elite.",
};

const FAQ = [
  {
    q: "Puis-je changer d'offre à tout moment ?",
    a: "Oui. Vous pouvez passer à une offre supérieure ou inférieure quand vous le souhaitez depuis votre espace prestataire. Le changement est appliqué immédiatement et facturé au prorata.",
  },
  {
    q: "Comment fonctionne la commission sur les réservations ?",
    a: "En plus de l'abonnement, Lystra prélève une commission sur chaque réservation payée via la plateforme. Le taux par défaut est de 12 % et reste transparent : il s'affiche avant chaque confirmation.",
  },
  {
    q: "Y a-t-il un engagement ?",
    a: "Aucun engagement de durée. Les abonnements sont mensuels et résiliables à tout moment, sans frais cachés.",
  },
  {
    q: "Quand suis-je payé pour mes prestations ?",
    a: "Les paiements clients sont sécurisés via Stripe. Les fonds vous sont reversés sur votre compte après l'événement, déduction faite de la commission Lystra.",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-plum-deep py-20 text-lystra-cream lg:py-28">
        <RibbonMark
          className="pointer-events-none absolute -right-16 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 text-lystra-champagne/10"
          withDots={false}
        />
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="eyebrow justify-center text-lystra-champagne">Tarifs prestataires</p>
          <h1 className="display mt-4 text-balance text-4xl leading-[1.1] lg:text-6xl">
            Investissez dans votre visibilité, pas dans la complexité.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-lystra-cream/75">
            Choisissez l'offre qui correspond à votre ambition. Sans engagement, résiliable à tout
            moment.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="bg-lystra-ivory py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-3 md:items-stretch">
            {PLANS.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>

          {/* Commission note */}
          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-lystra-champagne/30 bg-lystra-cream/60 p-6 text-center">
            <p className="text-sm text-lystra-ink">
              <span className="font-medium">Commission plateforme : 12 %</span> sur les réservations
              payées via Lystra. Transparente, affichée avant chaque confirmation, et incluant le
              paiement sécurisé.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-lystra-cream py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeading
            eyebrow="Questions fréquentes"
            title="Tout ce qu'il faut savoir avant de commencer"
            align="center"
          />
          <div className="mt-10 divide-y divide-lystra-champagne/20 rounded-2xl border border-lystra-champagne/25 bg-white/70">
            {FAQ.map((item) => (
              <div key={item.q} className="p-6">
                <h3 className="font-serif text-lg text-lystra-ink">{item.q}</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-lystra-gray">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-lystra-ivory py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="display text-3xl text-lystra-ink lg:text-4xl">
            Prêt·e à rejoindre Lystra ?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lystra-gray">
            Créez votre profil premium en quelques minutes et commencez à recevoir des demandes
            qualifiées.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/register?role=vendor">
              Devenir prestataire <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
