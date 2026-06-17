import { cn } from "@/lib/utils";
import { BOOKING_STATUS_LABELS } from "@/lib/constants";

const TONE_CLASSES: Record<string, string> = {
  muted: "bg-lystra-gray/15 text-lystra-gray",
  amber: "bg-amber-100 text-amber-700",
  champagne: "bg-lystra-champagne/25 text-lystra-plum",
  plum: "bg-lystra-plum/10 text-lystra-plum",
  rose: "bg-rose-100 text-rose-700",
};

export function StatusBadge({ status }: { status: string }) {
  const meta = BOOKING_STATUS_LABELS[status] ?? { label: status, tone: "muted" };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        TONE_CLASSES[meta.tone] ?? TONE_CLASSES.muted,
      )}
    >
      {meta.label}
    </span>
  );
}
