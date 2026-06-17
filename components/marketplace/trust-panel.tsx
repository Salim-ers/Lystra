import { ShieldCheck, BadgeCheck, Star, FileCheck2, CreditCard, Clock, CheckCircle2 } from "lucide-react";
import type { Vendor } from "@/types";
import { trustScore, trustLabel } from "@/lib/trust";

export function TrustPanel({ vendor }: { vendor: Vendor }) {
  const score = trustScore(vendor);
  const t = vendor.trust ?? {};

  const signals = [
    { ok: t.identityVerified, icon: BadgeCheck, label: "Identité vérifiée" },
    { ok: t.portfolioValidated, icon: FileCheck2, label: "Portfolio validé" },
    { ok: t.reviewsVerified, icon: Star, label: "Avis vérifiés" },
    { ok: t.insured, icon: ShieldCheck, label: "Assurance & documents" },
    { ok: vendor.securePayment, icon: CreditCard, label: "Paiement sécurisé" },
    { ok: vendor.bookingEnabled, icon: CheckCircle2, label: "Réservation directe" },
  ];

  const stats = [
    { value: t.completedBookings != null ? `${t.completedBookings}` : "—", label: "Réservations" },
    { value: t.acceptanceRate != null ? `${t.acceptanceRate}%` : "—", label: "Taux d'acceptation" },
    { value: (t.responseRate ?? vendor.responseRate) != null ? `${t.responseRate ?? vendor.responseRate}%` : "—", label: "Taux de réponse" },
    { value: vendor.responseTime ?? "—", label: "Délai de réponse" },
  ];

  return (
    <div className="rounded-3xl border border-lystra-champagne/25 bg-white/60 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 font-serif text-lg text-lystra-ink">
            <ShieldCheck className="h-5 w-5 text-lystra-champagne" /> Score de confiance
          </p>
          <p className="mt-1 text-sm text-lystra-gray">{trustLabel(score)}</p>
        </div>
        <div className="text-right">
          <span className="font-serif text-3xl text-lystra-plum">{score}</span>
          <span className="text-sm text-lystra-gray">/100</span>
        </div>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-lystra-plum/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-lystra-champagne to-lystra-plum"
          style={{ width: `${score}%` }}
        />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="font-serif text-xl text-lystra-ink">{s.value}</p>
            <p className="text-xs text-lystra-gray">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-2 border-t border-lystra-champagne/15 pt-5 sm:grid-cols-2">
        {signals.map((s) => (
          <div
            key={s.label}
            className={s.ok ? "flex items-center gap-2 text-sm text-lystra-ink" : "flex items-center gap-2 text-sm text-lystra-gray/50 line-through"}
          >
            <s.icon className={s.ok ? "h-4 w-4 text-lystra-champagne" : "h-4 w-4 text-lystra-gray/40"} />
            {s.label}
          </div>
        ))}
      </div>
    </div>
  );
}
