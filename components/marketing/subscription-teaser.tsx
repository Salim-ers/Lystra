import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PLANS } from "@/lib/stripe/plans";
import { Button } from "@/components/ui/button";
import { PricingCard } from "./pricing-card";
import { RibbonMark } from "@/components/shared/ribbon-mark";

export function SubscriptionTeaser() {
  return (
    <section className="relative overflow-hidden bg-lystra-dark py-20 text-lystra-cream">
      <RibbonMark className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 text-lystra-champagne/8" withDots={false} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center text-lystra-champagne">Prestataires</p>
          <h2 className="display mt-3 text-3xl text-lystra-cream sm:text-4xl">
            Développez votre activité événementielle
          </h2>
          <p className="mt-4 text-base leading-relaxed text-lystra-cream/75">
            Recevez des demandes qualifiées de clients qui préparent des événements d&apos;exception.
            Choisissez l&apos;abonnement adapté à votre ambition.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild variant="dark" size="lg" className="gap-2">
            <Link href="/devenir-prestataire">
              Rejoindre Lystra <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
