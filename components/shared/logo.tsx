import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Primary Lystra lockup: the brand mark (rose-gold ribbon on plum) set as a
 * rounded badge next to the wordmark in Playfair. The mark PNG carries its own
 * plum background, so it reads cleanly on both light and dark surfaces.
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
      <Image
        src="/brand/lystra-mark.png"
        alt="Lystra"
        width={44}
        height={44}
        priority
        className={cn(
          "h-9 w-9 rounded-xl object-cover shadow-soft ring-1 ring-lystra-champagne/30",
          markClassName,
        )}
      />
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
