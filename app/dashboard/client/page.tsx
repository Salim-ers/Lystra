import Link from "next/link";
import { Heart, Send, CalendarCheck, MessageSquare, ArrowRight, MapPin } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import { getFeaturedVendors } from "@/data/vendors";
import { formatDateFr, formatPrice } from "@/lib/utils";

const REQUESTS = [
  { id: "r1", vendor: "Atelier Roselia", event: "Anniversaire", date: "2026-09-12", status: "quoted", amount: 2400 },
  { id: "r2", vendor: "Lumière Studio", event: "Soirée privée", date: "2026-09-12", status: "pending", amount: null },
  { id: "r3", vendor: "Éclat Traiteur", event: "Mariage", date: "2026-09-12", status: "accepted", amount: 6800 },
];

export default function ClientDashboardPage() {
  const favorites = getFeaturedVendors(3);

  return (
    <DashboardShell
      role="client"
      title="Bonjour, Marie 👋"
      subtitle="Voici un aperçu de la préparation de votre moment."
      actions={
        <Button asChild>
          <Link href="/prestataires">
            Trouver un talent <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      }
    >
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardStatCard label="Favoris" value="8" icon={Heart} hint="talents sauvegardés" />
        <DashboardStatCard label="Demandes" value="3" icon={Send} trend={{ value: "+2", positive: true }} hint="ce mois" />
        <DashboardStatCard label="Réservations" value="1" icon={CalendarCheck} hint="confirmée" />
        <DashboardStatCard label="Messages" value="2" icon={MessageSquare} hint="non lus" />
      </div>

      {/* Recent requests */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-xl text-lystra-ink">Demandes récentes</h2>
            <Link href="/dashboard/client/demandes" className="text-sm text-lystra-plum hover:underline">
              Tout voir
            </Link>
          </div>
          <div className="overflow-hidden rounded-2xl border border-lystra-champagne/25 bg-white/70">
            {REQUESTS.map((r, i) => (
              <div
                key={r.id}
                className={`flex items-center justify-between gap-4 px-5 py-4 ${
                  i > 0 ? "border-t border-lystra-champagne/15" : ""
                }`}
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-lystra-ink">{r.vendor}</p>
                  <p className="text-sm text-lystra-gray">
                    {r.event} · {formatDateFr(r.date)}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="hidden text-sm text-lystra-ink sm:block">
                    {r.amount ? formatPrice(r.amount) : "—"}
                  </span>
                  <StatusBadge status={r.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Event card */}
        <div className="card-premium rounded-2xl border-lystra-champagne/25 bg-lystra-plum p-6 text-lystra-cream">
          <p className="text-xs uppercase tracking-[0.2em] text-lystra-champagne">Mon moment</p>
          <h3 className="mt-3 font-serif text-2xl">Mariage</h3>
          <div className="mt-4 space-y-2 text-sm text-lystra-cream/80">
            <p className="flex items-center gap-2">
              <CalendarCheck className="h-4 w-4 text-lystra-champagne" /> 12 septembre 2026
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-lystra-champagne" /> Bordeaux · 120 invités
            </p>
          </div>
          <Button variant="outline" className="mt-6 w-full border-lystra-champagne/40 text-lystra-cream hover:bg-white/10">
            Gérer l'événement
          </Button>
        </div>
      </div>

      {/* Favorites preview */}
      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-xl text-lystra-ink">Vos favoris</h2>
          <Link href="/dashboard/client/favoris" className="text-sm text-lystra-plum hover:underline">
            Tout voir
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {favorites.map((v) => (
            <Link
              key={v.id}
              href={`/prestataires/${v.slug}`}
              className="card-premium flex items-center gap-3 rounded-2xl border-lystra-champagne/25 bg-white/70 p-3"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={v.coverUrl} alt={v.businessName} className="h-14 w-14 shrink-0 rounded-xl object-cover" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-lystra-ink">{v.businessName}</p>
                <p className="truncate text-xs text-lystra-gray">{v.categoryName} · {v.city}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
