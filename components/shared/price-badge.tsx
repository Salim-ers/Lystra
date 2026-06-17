import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function PriceBadge({
  price,
  from = true,
  className,
}: {
  price?: number | null;
  from?: boolean;
  className?: string;
}) {
  if (price == null) {
    return <span className={cn("text-sm font-medium text-lystra-gray", className)}>Sur devis</span>;
  }
  return (
    <span className={cn("text-sm text-lystra-ink", className)}>
      {from && <span className="text-lystra-gray">À partir de </span>}
      <span className="font-serif text-base font-medium">{formatPrice(price)}</span>
    </span>
  );
}
