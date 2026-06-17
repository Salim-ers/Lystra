import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RibbonMark } from "./ribbon-mark";
import Link from "next/link";

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  icon,
  className,
}: {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-lystra-champagne/40 bg-white/50 px-6 py-16 text-center",
        className,
      )}
    >
      <div className="mb-1 text-lystra-champagne/70">{icon ?? <RibbonMark className="h-10 w-10" withDots={false} />}</div>
      <h3 className="font-serif text-xl text-lystra-ink">{title}</h3>
      {description && <p className="max-w-sm text-sm text-lystra-gray">{description}</p>}
      {actionLabel && actionHref && (
        <Button asChild variant="champagne" className="mt-2">
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      )}
    </div>
  );
}
