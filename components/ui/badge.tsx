import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-lystra-plum text-lystra-cream",
        champagne: "border-lystra-champagne/40 bg-lystra-champagne/15 text-[#8a6a2f]",
        verified: "border-lystra-champagne/50 bg-lystra-cream text-lystra-plum",
        elite: "border-transparent bg-gradient-to-r from-lystra-plum to-[#5a2a4f] text-lystra-champagne",
        soft: "border-lystra-champagne/30 bg-white/70 text-lystra-gray",
        outline: "border-lystra-champagne/40 text-lystra-ink",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export function Badge({ className, variant, ...props }: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
export { badgeVariants };
