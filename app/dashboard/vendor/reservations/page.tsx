import { Calendar, Users } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Euro, Wallet } from "lucide-react";
import { formatDateFr, formatPrice, computeCommission } from "@/lib/utils";

const COMMISSION_RATE = 12;

const BOOKINGS = [
  { id: "b1", client: "Sophie Marchand", event: "Baptême", date: "2026-10-20", guests: 60, status: "confirmed", total: 1800 },
  { id: "b2", client: "Camille Petit", event: "Mariage", date: "2026-06-28", guests: 90, status: "paid", total: 3200 },
  { id: "b3", client: "Léa Dubois", event: "Événement privé", date: "2026-05-15", guests: 30, status: "completed", total: 1100 },
];

export default function VendorBookingsPage() {
  const gross = BOOKINGS.reduce((sum, b) => sum + b.total, 0);
  const net = BOOKINGS.reduce((sum, b) => sum + computeCommission(b.total, COMMISSION_RATE).vendorNet, 0);

  return (
    <DashboardShell
      role="vendor"
      title="Réservations"
      subtitle="Vos prestations confirmées et vos versements."
      userName="Atelier Roselia"
    >
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <DashboardStatCard label="Chiffre d'affaires" value={formatPrice(gross)} icon={Euro} />
        <DashboardStatCard label="Net après commission" value={formatPrice(net)} icon={Wallet} hint={`commission ${COMMISSION_RATE} %`} />
        <DashboardStatCard label="Réservations" value={String(BOOKINGS.length)} icon={Calendar} />
      </div>

      <div className="overflow-hidden rounded-2xl border border-lystra-champagne/25 bg-white/70">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-lystra-champagne/20 bg-lystra-cream/50 text-left text-xs uppercase tracking-wider text-lystra-gray">
                <th className="px-5 py-3">Client</th>
                <th className="px-5 py-3">Événement</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3 text-right">Montant</th>
                <th className="px-5 py-3 text-right">Net</th>
                <th className="px-5 py-3 text-right">Statut</th>
              </tr>
            </thead>
            <tbody>
              {BOOKINGS.map((b) => {
                const { vendorNet } = computeCommission(b.total, COMMISSION_RATE);
                return (
                  <tr key={b.id} className="border-b border-lystra-champagne/10 last:border-0">
                    <td className="px-5 py-4 font-medium text-lystra-ink">{b.client}</td>
                    <td className="px-5 py-4 text-lystra-gray">
                      {b.event} · <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" />{b.guests}</span>
                    </td>
                    <td className="px-5 py-4 text-lystra-gray">{formatDateFr(b.date)}</td>
                    <td className="px-5 py-4 text-right text-lystra-ink">{formatPrice(b.total)}</td>
                    <td className="px-5 py-4 text-right font-medium text-lystra-ink">{formatPrice(vendorNet)}</td>
                    <td className="px-5 py-4 text-right"><StatusBadge status={b.status} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
}
