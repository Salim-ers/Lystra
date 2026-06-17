import Link from "next/link";
import {
  Check,
  ArrowRight,
  Camera,
  CalendarRange,
  ShieldCheck,
  Package,
  Clock,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { RibbonMark } from "@/components/shared/ribbon-mark";
import { cn } from "@/lib/utils";

type ScoreCriterion = {
  /** Libellé du critère évalué */
  label: string;
  /** Critère rempli / atteint */
  done?: boolean;
  /** Valeur affichée à droite (ex. "98 %", "4,9", "< 2 h") */
  value?: string;
};

type Recommendation = {
  /** Conseil actionnable affiché au prestataire */
  label: string;
  /** Icône d'illustration */
  icon: LucideIcon;
  /** Lien d'action interne */
  href: string;
};

const DEFAULT_CRITERIA: ScoreCriterion[] = [
  { label: "Profil complété", value: "85 %", done: true },
  { label: "Qualité des photos", value: "8 / 12", done: true },
  { label: "Délai de réponse", value: "< 2 h", done: true },
  { label: "Avis clients", value: "4,9 · 87 avis", done: true },
  { label: "Taux de conversion", value: "32 %", done: true },
  { label: "Disponibilités remplies", value: "Partiel", done: false },
  { label: "Packs configurés", value: "0", done: false },
];

const DEFAULT_RECOMMENDATIONS: Recommendation[] = [
  { label: "Ajoutez 5 photos pour gagner en visibilité", icon: Camera, href: "/dashboard/vendor/profil" },
  { label: "Créez un pack réservable", icon: Package, href: "/dashboard/vendor/services" },
  { label: "Ajoutez vos disponibilités", icon: CalendarRange, href: "/dashboard/vendor/disponibilites" },
  { label: "Répondez en moins de 24h", icon: Clock, href: "/dashboard/vendor/demandes" },
  { label: "Activez le paiement sécurisé", icon: ShieldCheck, href: "/dashboard/vendor/abonnement" },
];

function scoreTone(score: number): string {
  if (score >= 80) return "text-emerald-600";
  if (score >= 60) return "text-lystra-plum";
  return "text-amber-600";
}

export function PerformanceScore({
  score = 72,
  items = DEFAULT_CRITERIA,
  recommendations = DEFAULT_RECOMMENDATIONS,
  className,
}: {
  score?: number;
  items?: ScoreCriterion[];
  recommendations?: Recommendation[];
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(100, Math.round(score)));

  return (
    <div className={cn("space-y-5", className)}>
      {/* Score card */}
      <div className="card-premium overflow-hidden rounded-3xl border-lystra-champagne/25 bg-white/70">
        <div className="flex flex-col gap-6 p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <RibbonMark withDots={false} className="h-4 w-4 text-lystra-champagne" />
              <div>
                <p className="eyebrow">Visibilité</p>
                <h3 className="mt-1 font-serif text-xl text-lystra-ink">Score de performance</h3>
              </div>
            </div>
            <div className="text-right">
              <p className={cn("font-serif text-4xl leading-none", scoreTone(clamped))}>
                {clamped}
                <span className="text-lg text-lystra-gray">/100</span>
              </p>
              <p className="mt-1.5 inline-flex items-center gap-1 text-xs text-lystra-gray">
                <TrendingUp className="h-3.5 w-3.5 text-lystra-champagne" />
                Plus votre score est élevé, plus vous apparaissez en tête.
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div
            className="h-2.5 overflow-hidden rounded-full bg-lystra-champagne/15"
            role="progressbar"
            aria-valuenow={clamped}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Score de performance"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-lystra-champagne to-lystra-plum transition-all"
              style={{ width: `${clamped}%` }}
            />
          </div>

          {/* Criteria */}
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {items.map((item) => (
              <li key={item.label} className="flex items-center justify-between gap-3 text-sm">
                <span className="flex items-center gap-2.5">
                  <span
                    className={cn(
                      "grid h-5 w-5 shrink-0 place-items-center rounded-full",
                      item.done
                        ? "bg-emerald-100 text-emerald-700"
                        : "border border-dashed border-lystra-champagne/50 text-lystra-gray",
                    )}
                  >
                    {item.done && <Check className="h-3 w-3" />}
                  </span>
                  <span className={item.done ? "text-lystra-ink" : "text-lystra-gray"}>{item.label}</span>
                </span>
                {item.value && (
                  <span className={cn("shrink-0 text-xs font-medium", item.done ? "text-lystra-ink" : "text-lystra-gray")}>
                    {item.value}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommendations */}
      <div className="card-premium rounded-3xl border-lystra-champagne/25 bg-lystra-plum/[0.05] p-6 sm:p-7">
        <h4 className="font-serif text-lg text-lystra-ink">Comment progresser</h4>
        <p className="mt-1 text-sm text-lystra-gray">
          Quelques actions pour gagner en visibilité auprès des organisateurs.
        </p>
        <ul className="mt-5 space-y-2.5">
          {recommendations.map((rec) => {
            const Icon = rec.icon;
            return (
              <li key={rec.label}>
                <Link
                  href={rec.href}
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-lystra-champagne/20 bg-white/70 px-4 py-3 transition-colors hover:border-lystra-champagne/40"
                >
                  <span className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-lystra-champagne/15 text-lystra-plum">
                      <Icon className="h-[1.05rem] w-[1.05rem]" />
                    </span>
                    <span className="text-sm text-lystra-ink">{rec.label}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-lystra-gray transition-transform group-hover:translate-x-0.5 group-hover:text-lystra-plum" />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
