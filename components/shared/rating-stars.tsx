import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function RatingStars({
  rating,
  count,
  size = "sm",
  showValue = true,
  className,
}: {
  rating: number;
  count?: number;
  size?: "sm" | "md";
  showValue?: boolean;
  className?: string;
}) {
  const px = size === "md" ? "h-4 w-4" : "h-3.5 w-3.5";
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className="inline-flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < Math.round(rating);
          return (
            <Star
              key={i}
              className={cn(px, filled ? "fill-lystra-champagne text-lystra-champagne" : "fill-transparent text-lystra-champagne/35")}
            />
          );
        })}
      </span>
      {showValue && (
        <span className="text-sm font-medium text-lystra-ink">
          {rating.toFixed(1)}
          {count != null && <span className="ml-1 font-normal text-lystra-gray">({count})</span>}
        </span>
      )}
    </span>
  );
}
