import Link from "next/link";
import * as Icons from "lucide-react";
import { FAMILIES } from "@/data/families";
import { RevealStagger, RevealItem } from "@/components/marketing/reveal";

type IconType = React.ComponentType<{ className?: string }>;

/**
 * "Explorez par univers" — les 8 familles de talents Lystra.
 * Signale immédiatement que la plateforme dépasse le mariage.
 */
export function FamilyStrip() {
  return (
    <RevealStagger className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8" stagger={0.06}>
      {FAMILIES.map((f) => {
        const Icon = ((Icons as Record<string, unknown>)[f.icon] as IconType) ?? Icons.Sparkles;
        return (
          <RevealItem key={f.slug}>
            <Link
              href={`/prestataires?family=${f.slug}`}
              className="group flex h-full flex-col items-center gap-2.5 rounded-2xl border border-lystra-champagne/25 bg-white/60 px-3 py-5 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-lystra-champagne/60 hover:bg-white hover:shadow-soft"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lystra-plum/[0.06] text-lystra-plum transition-colors group-hover:bg-lystra-champagne/15 group-hover:text-[#8a6a2f]">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-xs font-medium leading-tight text-lystra-ink">{f.shortName}</span>
            </Link>
          </RevealItem>
        );
      })}
    </RevealStagger>
  );
}
