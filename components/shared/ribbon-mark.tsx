import { cn } from "@/lib/utils";

/**
 * Lystra signature mark — an inline-SVG recreation of the brand symbol
 * (four interlaced ribbon petals, a central sparkle, four cardinal points).
 * Uses currentColor so it adapts to any surface. This is the brand's
 * recurring ornament: header mark, section divider, hero watermark.
 */
export function RibbonMark({
  className,
  withDots = true,
  withSparkle = true,
  strokeWidth = 2.4,
  ...props
}: React.SVGProps<SVGSVGElement> & {
  withDots?: boolean;
  withSparkle?: boolean;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className={cn("text-lystra-champagne", className)}
      {...props}
    >
      <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {/* North petal */}
        <path d="M50 50 C40 40 40 18 50 9 C60 18 60 40 50 50 Z" />
        {/* East petal */}
        <path d="M50 50 C60 40 82 40 91 50 C82 60 60 60 50 50 Z" />
        {/* South petal */}
        <path d="M50 50 C60 60 60 82 50 91 C40 82 40 60 50 50 Z" />
        {/* West petal */}
        <path d="M50 50 C40 60 18 60 9 50 C18 40 40 40 50 50 Z" />
      </g>
      {withSparkle && (
        <path
          d="M50 43 L51.6 48.4 L57 50 L51.6 51.6 L50 57 L48.4 51.6 L43 50 L48.4 48.4 Z"
          fill="currentColor"
          className="text-lystra-champagne"
        />
      )}
      {withDots && (
        <g fill="currentColor">
          <circle cx="50" cy="3" r="2.6" />
          <circle cx="97" cy="50" r="2.6" />
          <circle cx="50" cy="97" r="2.6" />
          <circle cx="3" cy="50" r="2.6" />
        </g>
      )}
    </svg>
  );
}
