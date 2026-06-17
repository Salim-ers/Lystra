"use client";

import Link from "next/link";
import { Menu, Bell } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Logo } from "@/components/shared/logo";
import { DashboardSidebar, type DashboardRole } from "./dashboard-sidebar";

const ROLE_NAV: Record<DashboardRole, { href: string; label: string }[]> = {
  client: [
    { href: "/dashboard/client", label: "Vue d'ensemble" },
    { href: "/dashboard/client/favoris", label: "Favoris" },
    { href: "/dashboard/client/demandes", label: "Demandes" },
    { href: "/dashboard/client/reservations", label: "Réservations" },
    { href: "/dashboard/client/messages", label: "Messages" },
  ],
  vendor: [
    { href: "/dashboard/vendor", label: "Vue d'ensemble" },
    { href: "/dashboard/vendor/demandes", label: "Demandes" },
    { href: "/dashboard/vendor/reservations", label: "Réservations" },
    { href: "/dashboard/vendor/messages", label: "Messages" },
    { href: "/dashboard/vendor/profil", label: "Profil" },
    { href: "/dashboard/vendor/services", label: "Services & packs" },
    { href: "/dashboard/vendor/disponibilites", label: "Disponibilités" },
    { href: "/dashboard/vendor/abonnement", label: "Abonnement" },
  ],
  admin: [{ href: "/admin", label: "Vue d'ensemble" }],
};

export function DashboardShell({
  role,
  title,
  subtitle,
  actions,
  userName = "Marie Lambert",
  children,
}: {
  role: DashboardRole;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  userName?: string;
  children: React.ReactNode;
}) {
  const initials = userName
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex min-h-screen bg-lystra-ivory">
      <DashboardSidebar role={role} />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-lystra-champagne/20 bg-lystra-ivory/85 px-4 backdrop-blur-md lg:px-8">
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 bg-lystra-ivory p-0">
                <div className="flex h-16 items-center border-b border-lystra-champagne/15 px-6">
                  <Logo />
                </div>
                <nav className="space-y-1 p-3">
                  {ROLE_NAV[role].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-xl px-3 py-2.5 text-sm text-lystra-ink/80 hover:bg-lystra-champagne/10"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <div className="lg:hidden">
              <Logo />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-lystra-plum text-xs text-lystra-cream">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 lg:px-8 lg:py-10">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="font-serif text-3xl text-lystra-ink lg:text-4xl">{title}</h1>
                {subtitle && <p className="mt-1.5 text-lystra-gray">{subtitle}</p>}
              </div>
              {actions && <div className="flex shrink-0 gap-2">{actions}</div>}
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
