"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Heart,
  Send,
  CalendarCheck,
  MessageSquare,
  Star,
  User,
  Image as ImageIcon,
  Package,
  CalendarRange,
  Inbox,
  CreditCard,
  BarChart3,
  Users,
  FolderTree,
  Flag,
  Settings,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/logo";

type NavItem = { href: string; label: string; icon: LucideIcon };
type NavGroup = { title?: string; items: NavItem[] };

const CLIENT_NAV: NavGroup[] = [
  {
    items: [
      { href: "/dashboard/client", label: "Vue d'ensemble", icon: LayoutDashboard },
      { href: "/dashboard/client/favoris", label: "Favoris", icon: Heart },
      { href: "/dashboard/client/demandes", label: "Demandes", icon: Send },
      { href: "/dashboard/client/reservations", label: "Réservations", icon: CalendarCheck },
      { href: "/dashboard/client/messages", label: "Messages", icon: MessageSquare },
    ],
  },
];

const VENDOR_NAV: NavGroup[] = [
  {
    items: [
      { href: "/dashboard/vendor", label: "Vue d'ensemble", icon: LayoutDashboard },
      { href: "/dashboard/vendor/demandes", label: "Demandes", icon: Inbox },
      { href: "/dashboard/vendor/reservations", label: "Réservations", icon: CalendarCheck },
      { href: "/dashboard/vendor/messages", label: "Messages", icon: MessageSquare },
    ],
  },
  {
    title: "Mon activité",
    items: [
      { href: "/dashboard/vendor/profil", label: "Profil", icon: User },
      { href: "/dashboard/vendor/services", label: "Services & packs", icon: Package },
      { href: "/dashboard/vendor/disponibilites", label: "Disponibilités", icon: CalendarRange },
      { href: "/dashboard/vendor/abonnement", label: "Abonnement", icon: CreditCard },
    ],
  },
];

const ADMIN_NAV: NavGroup[] = [
  {
    items: [
      { href: "/admin", label: "Vue d'ensemble", icon: BarChart3 },
      { href: "/admin#prestataires", label: "Prestataires", icon: ShieldCheck },
      { href: "/admin#utilisateurs", label: "Utilisateurs", icon: Users },
      { href: "/admin#categories", label: "Catégories", icon: FolderTree },
      { href: "/admin#avis", label: "Avis & signalements", icon: Flag },
      { href: "/admin#parametres", label: "Paramètres", icon: Settings },
    ],
  },
];

const NAV_BY_ROLE = { client: CLIENT_NAV, vendor: VENDOR_NAV, admin: ADMIN_NAV } as const;

export type DashboardRole = keyof typeof NAV_BY_ROLE;

export function DashboardSidebar({ role }: { role: DashboardRole }) {
  const pathname = usePathname();
  const groups = NAV_BY_ROLE[role];

  return (
    <aside className="hidden w-64 shrink-0 border-r border-lystra-champagne/20 bg-white/60 lg:flex lg:flex-col">
      <div className="flex h-16 items-center border-b border-lystra-champagne/15 px-6">
        <Logo />
      </div>
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-6">
        {groups.map((group, gi) => (
          <div key={gi}>
            {group.title && (
              <p className="px-3 pb-2 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-lystra-gray">
                {group.title}
              </p>
            )}
            <ul className="space-y-1">
              {group.items.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== `/dashboard/${role}` &&
                    item.href !== "/admin" &&
                    pathname.startsWith(item.href));
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                        active
                          ? "bg-lystra-plum text-lystra-cream"
                          : "text-lystra-ink/70 hover:bg-lystra-champagne/10 hover:text-lystra-ink",
                      )}
                    >
                      <Icon className="h-[1.05rem] w-[1.05rem]" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="border-t border-lystra-champagne/15 p-3">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-lystra-gray transition-colors hover:bg-lystra-champagne/10 hover:text-lystra-ink"
        >
          <Star className="h-[1.05rem] w-[1.05rem]" />
          Retour au site
        </Link>
      </div>
    </aside>
  );
}
