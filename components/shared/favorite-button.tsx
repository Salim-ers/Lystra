"use client";
import * as React from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export function FavoriteButton({
  initial = false,
  vendorSlug,
  size = "md",
  className,
  onToggle,
}: {
  initial?: boolean;
  vendorSlug?: string;
  size?: "sm" | "md";
  className?: string;
  onToggle?: (active: boolean) => void;
}) {
  const [active, setActive] = React.useState(initial);
  const dim = size === "sm" ? "h-8 w-8" : "h-9 w-9";
  const icon = size === "sm" ? "h-4 w-4" : "h-[18px] w-[18px]";

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? "Retirer des favoris" : "Ajouter aux favoris"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const next = !active;
        setActive(next);
        onToggle?.(next);
        // Persist via server action / Supabase in production (favorites table).
      }}
      className={cn(
        "inline-flex items-center justify-center rounded-full border border-lystra-champagne/30 bg-white/85 backdrop-blur-sm shadow-soft transition hover:scale-105 active:scale-95",
        dim,
        className,
      )}
    >
      <Heart
        className={cn(
          icon,
          "transition-colors",
          active ? "fill-lystra-rose text-lystra-rose" : "fill-transparent text-lystra-ink/70",
        )}
      />
    </button>
  );
}
