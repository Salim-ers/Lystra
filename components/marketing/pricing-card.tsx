import Link from "next/link";
import { Check } from "lucide-react";
import type { PricingPlan } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-3xl border p-8 transition-all duration-300",
        plan.highlighted
          ? "border-lystra-champagne/60 bg-lystra-plum text-lystra-cream shadow-lift lg:-translate-y-3"
          : "border-lystra-champagne/25 bg-white/70 text-lystra-ink shadow-soft hover:shadow-card",
      )}
    >
      {plan.highlighted && (
        <Badge variant="champagne" className="absolute -top-3 left-1/2 -translate-x-1/2 bg-lystra-champagne text-lystra-ink">
          Le plus choisi
        </Badge>
      )}
      <h3 className={cn("font-serif text-2xl", plan.highlighted ? "text-lystra-cream" : "text-lystra-ink")}>
        {plan.name}
      </h3>
      <p className={cn("mt-1 text-sm", plan.highlighted ? "text-lystra-cream/75" : "text-lystra-gray")}>
        {plan.tagline}
      </p>
      <div className="mt-6 flex items-baseline gap-1">
        <span className="font-serif text-4xl">{plan.price}€</span>
        <span className={cn("text-sm", plan.highlighted ? "text-lystra-cream/70" : "text-lystra-gray")}>
          {plan.cadence}
        </span>
      </div>

      <ul className="mt-7 flex-1 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm">
            <Check className={cn("mt-0.5 h-4 w-4 shrink-0", plan.highlighted ? "text-lystra-champagne" : "text-lystra-plum")} />
            <span className={plan.highlighted ? "text-lystra-cream/90" : "text-lystra-ink/85"}>{f}</span>
          </li>
        ))}
      </ul>

      <Button
        asChild
        variant={plan.highlighted ? "champagne" : "outline"}
        className="mt-8 w-full"
      >
        <Link href={`/register?role=vendor&plan=${plan.id}`}>{plan.cta}</Link>
      </Button>
    </div>
  );
}
