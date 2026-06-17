import { Calendar, MapPin, Receipt } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { formatDateFr, formatPrice } from "@/lib/utils";

const BOOKINGS = [
  {
    id: "b1",
    vendor: "Éclat Traiteur",
    category: "Traiteurs",
    event: "Mariage",
    date: "2026-09-12",
    city: "Bordeaux",
    status: "confirmed",
    total: 6800,
    deposit: 2040,
  },
];

export default function ClientBookingsPage() {
  if (BOOKINGS.length === 0) {
    return (
      <DashboardShell role="client" title="Mes réservations">
        <EmptyState
          title="Aucune réservation pour le moment"
          description="Vos réservations confirmées apparaîtront ici."
        />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell
      role="client"
      title="Mes réservations"
      subtitle="Vos prestations confirmées et leurs détails de paiement."
    >
      <div className="space-y-5">
        {BOOKINGS.map((b) => (
          <div key={b.id} className="card-premium rounded-2xl border-lystra-champagne/25 bg-white/70 p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-serif text-xl text-lystra-ink">{b.vendor}</h3>
                  <StatusBadge status={b.status} />
                </div>
                <p className="mt-1 text-sm text-lystra-gray">{b.category} · {b.event}</p>
              </div>
              <Button variant="outline" size="sm">
                <Receipt className="h-4 w-4" /> Reçu
              </Button>
            </div>

            <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
              <p className="flex items-center gap-2 text-lystra-ink">
                <Calendar className="h-4 w-4 text-lystra-champagne" /> {formatDateFr(b.date)}
              </p>
              <p className="flex items-center gap-2 text-lystra-ink">
                <MapPin className="h-4 w-4 text-lystra-champagne" /> {b.city}
              </p>
            </div>

            <div className="mt-5 rounded-xl bg-lystra-cream/60 p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-lystra-gray">Montant total</span>
                <span className="font-medium text-lystra-ink">{formatPrice(b.total)}</span>
              </div>
              <div className="mt-1.5 flex justify-between">
                <span className="text-lystra-gray">Acompte versé (30 %)</span>
                <span className="text-lystra-ink">{formatPrice(b.deposit)}</span>
              </div>
              <div className="mt-1.5 flex justify-between border-t border-lystra-champagne/20 pt-1.5">
                <span className="text-lystra-gray">Solde restant</span>
                <span className="font-medium text-lystra-ink">{formatPrice(b.total - b.deposit)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}
