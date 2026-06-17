import Link from "next/link";
import { Euro, Inbox, Clock, Star, ArrowRight, Eye } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import { formatDateFr, formatPrice } from "@/lib/utils";

const REQUESTS = [
  { id: "r1", client: "Marie L.", event: "Mariage", date: "2026-09-12", status: "pending", guests: 120 },
  { id: "r2", client: "Thomas R.", event: "Anniversaire", date: "2026-07-04", status: "quoted", guests: 40 },
  { id: "r3", client: "Sophie M.", event: "Baptême", date: "2026-10-20", status: "accepted", guests: 60 },
];

export default function VendorDashboardPage() {
  return (
    <DashboardShell
      role="vendor"
      title="Tableau de bord"
      subtitle="Atelier Roselia · Fleuriste à Paris"
      userName="Atelier Roselia"
      actions={
        <Button asChild variant="outline">
          <Link href="/prestataires/atelier-roselia">
            <Eye className="h-4 w-4" /> Voir mon profil
          </Link>
        </Button>
      }
    >
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardStatCard label="Revenus (30 j)" value="9 240 €" icon={Euro} trend={{ value: "+18 %", positive: true }} />
        <DashboardStatCard label="Demandes" value="12" icon={Inbox} trend={{ value: "+4", positive: true }} hint="ce mois" />
        <DashboardStatCard label="Taux de réponse" value="98 %" icon={Clock} hint="< 2 h en moyenne" />
        <DashboardStatCard label="Note moyenne" value="4,9" icon={Star} hint="sur 87 avis" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Incoming requests */}
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-xl text-lystra-ink">Demandes entrantes</h2>
            <Link href="/dashboard/vendor/demandes" className="text-sm text-lystra-plum hover:underline">
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
                  <p className="font-medium text-lystra-ink">{r.client}</p>
                  <p className="text-sm text-lystra-gray">
                    {r.event} · {formatDateFr(r.date)} · {r.guests} invités
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={r.status} />
                  {r.status === "pending" && (
                    <Button size="sm" className="hidden sm:inline-flex">
                      Répondre
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Profile completion */}
        <div className="card-premium rounded-2xl border-lystra-champagne/25 bg-white/70 p-6">
          <h3 className="font-serif text-lg text-lystra-ink">Profil complété</h3>
          <div className="mt-4 flex items-end gap-2">
            <span className="font-serif text-4xl text-lystra-plum">85 %</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-lystra-champagne/20">
            <div className="h-full rounded-full bg-lystra-plum" style={{ width: "85%" }} />
          </div>
          <ul className="mt-5 space-y-2 text-sm">
            <li className="flex items-center justify-between text-lystra-gray">
              <span>Ajouter 2 photos</span>
              <Link href="/dashboard/vendor/profil" className="text-lystra-plum hover:underline">+</Link>
            </li>
            <li className="flex items-center justify-between text-lystra-gray">
              <span>Compléter vos tarifs</span>
              <Link href="/dashboard/vendor/services" className="text-lystra-plum hover:underline">+</Link>
            </li>
          </ul>
          <Button asChild variant="outline" className="mt-6 w-full">
            <Link href="/dashboard/vendor/profil">
              Compléter <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </DashboardShell>
  );
}
