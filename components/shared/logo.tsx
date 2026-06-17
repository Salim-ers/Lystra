import Link from "next/link";
import { cn } from "@/lib/utils";
import { RibbonMark } from "./ribbon-mark";

/**
 * Primary Lystra lockup: the ribbon mark + the wordmark set in Playfair.
 * Rendered as crisp vector + type so it sits cleanly on light or dark
 * surfaces (the supplied PNG carries a baked plum background and is reserved
 * for OG images / dark hero badges).
 */
export function Logo({
  href = "/",
  tone = "ink",
  showTagline = false,
  className,
  markClassName,
}: {
  href?: string | null;
  tone?: "ink" | "light";
  showTagline?: boolean;
  className?: string;
  markClassName?: string;
}) {
  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <RibbonMark className={cn("h-8 w-8 text-lystra-champagne", markClassName)} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif text-2xl tracking-[0.06em]",
            tone === "light" ? "text-lystra-cream" : "text-lystra-ink",
          )}
        >
          Lystra
        </span>
        {showTagline && (
          <span className="mt-1 text-[0.55rem] uppercase tracking-[0.32em] text-lystra-gray">
            Event Services Marketplace
          </span>
        )}
      </span>
    </span>
  );

  if (href === null) return content;
  return (
    <Link href={href} aria-label="Lystra — accueil" className="transition-opacity hover:opacity-80">
      {content}
    </Link>
  );
}
