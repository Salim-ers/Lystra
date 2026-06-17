"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/logo";
// Runs before first paint on the client (avoids a one-frame light-header flash
// when the homepage is opened already scrolled, e.g. via /#comment-ca-marche),
// while falling back to useEffect on the server to avoid SSR warnings.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;
import { Button } from "@/components/ui/button";
import {
  Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose,
} from "@/components/ui/sheet";

const NAV = [
  { href: "/prestataires", label: "Prestataires" },
  { href: "/categories", label: "Catégories" },
  { href: "/packs", label: "Packs" },
  { href: "/conciergerie", label: "Conciergerie" },
  { href: "/devenir-prestataire", label: "Devenir prestataire" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  useIsomorphicLayoutEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Homepage opens on a full-bleed dark hero → light header until the user scrolls.
  const overHero = pathname === "/" && !scrolled;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-lystra-champagne/25 bg-lystra-ivory/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo tone={overHero ? "light" : "ink"} />

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm transition-colors",
                overHero
                  ? "text-lystra-cream/85 hover:text-lystra-cream"
                  : "text-lystra-ink/80 hover:text-lystra-plum",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className={cn(overHero && "text-lystra-cream hover:bg-white/10 hover:text-lystra-cream")}
          >
            <Link href="/login">Connexion</Link>
          </Button>
          <Button asChild variant="champagne" size="sm">
            <Link href="/register?role=vendor">Devenir prestataire</Link>
          </Button>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Menu"
                className={cn(overHero && "text-lystra-cream hover:bg-white/10 hover:text-lystra-cream")}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col">
              <SheetHeader>
                <SheetTitle><Logo href={null} /></SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4 py-2">
                {NAV.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className="rounded-xl px-3 py-3 text-base text-lystra-ink transition hover:bg-lystra-champagne/10"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-2 p-4">
                <Button asChild variant="outline">
                  <Link href="/login">Connexion</Link>
                </Button>
                <Button asChild variant="champagne">
                  <Link href="/register?role=vendor">Devenir prestataire</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
