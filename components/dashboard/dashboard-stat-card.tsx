import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function DashboardStatCard({
  label,
  value,
  icon: Icon,
  trend,
  hint,
  className,
}: {
  label: string;
  value: string;
  icon?: LucideIcon;
  trend?: { value: string; positive?: boolean };
  hint?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "card-premium flex flex-col justify-between rounded-2xl border-lystra-champagne/25 bg-white/70 p-5",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <p className="text-sm text-lystra-gray">{label}</p>
        {Icon && (
          <span className="grid h-9 w-9 place-items-center rounded-full bg-lystra-champagne/15 text-lystra-plum">
            <Icon className="h-[1.05rem] w-[1.05rem]" />
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="font-serif text-3xl text-lystra-ink">{value}</p>
        <div className="mt-1 flex items-center gap-2">
          {trend && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 text-xs font-medium",
                trend.positive === false ? "text-rose-600" : "text-emerald-600",
              )}
            >
              {trend.positive === false ? (
                <ArrowDownRight className="h-3.5 w-3.5" />
              ) : (
                <ArrowUpRight className="h-3.5 w-3.5" />
              )}
              {trend.value}
            </span>
          )}
          {hint && <span className="text-xs text-lystra-gray">{hint}</span>}
        </div>
      </div>
    </div>
  );
}
