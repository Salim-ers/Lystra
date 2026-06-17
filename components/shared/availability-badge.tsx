import { cn } from "@/lib/utils";
import { AVAILABILITY } from "@/lib/constants";
import type { AvailabilityKey } from "@/types";

const TONE: Record<string, { dot: string; text: string; ring: string }> = {
  emerald:   { dot: "bg-emerald-500",  text: "text-emerald-700",  ring: "border-emerald-600/25 bg-emerald-50/70" },
  champagne: { dot: "bg-lystra-champagne", text: "text-[#8a6a2f]", ring: "border-lystra-champagne/40 bg-lystra-champagne/10" },
  amber:     { dot: "bg-amber-500",    text: "text-amber-700",    ring: "border-amber-500/30 bg-amber-50/70" },
  rose:      { dot: "bg-lystra-rose",  text: "text-lystra-plum",  ring: "border-lystra-rose/40 bg-lystra-rose/10" },
  muted:     { dot: "bg-lystra-gray",  text: "text-lystra-gray",  ring: "border-lystra-gray/25 bg-lystra-gray/10" },
};

export function AvailabilityBadge({
  status,
  className,
  size = "sm",
}: {
  status?: AvailabilityKey;
  className?: string;
  size?: "sm" | "md";
}) {
  if (!status) return null;
  const meta = AVAILABILITY[status];
  const tone = TONE[meta.tone] ?? TONE.muted;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium",
        tone.ring,
        tone.text,
        size === "sm" ? "px-2 py-0.5 text-[0.7rem]" : "px-3 py-1 text-xs",
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", tone.dot, status !== "full" && "animate-pulse")} />
      {meta.label}
    </span>
  );
}
