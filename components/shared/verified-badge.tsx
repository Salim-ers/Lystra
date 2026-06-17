import { BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function VerifiedBadge({ className, label = "Vérifié" }: { className?: string; label?: string }) {
  return (
    <Badge variant="verified" className={cn("gap-1", className)}>
      <BadgeCheck className="h-3.5 w-3.5 text-lystra-champagne" />
      {label}
    </Badge>
  );
}

export function EliteBadge({ className }: { className?: string }) {
  return (
    <Badge variant="elite" className={cn("gap-1", className)}>
      <span className="text-[0.65rem] tracking-[0.18em]">ELITE</span>
    </Badge>
  );
}
