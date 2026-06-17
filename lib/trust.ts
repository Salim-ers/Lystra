import type { Vendor } from "@/types";

/** Score de confiance agrégé (0–100) à partir des signaux Lystra. */
export function trustScore(v: Vendor): number {
  const t = v.trust ?? {};
  let score = 0;
  if (t.identityVerified) score += 18;
  if (t.portfolioValidated) score += 16;
  if (t.reviewsVerified) score += 14;
  if (t.insured) score += 10;
  if (v.bookingEnabled) score += 8;
  if (v.securePayment) score += 6;
  score += Math.min(12, Math.round((t.acceptanceRate ?? 0) / 8));
  score += Math.min(10, Math.round((t.responseRate ?? v.responseRate ?? 0) / 10));
  score += Math.min(6, Math.round((t.completedBookings ?? 0) / 40));
  return Math.min(100, score);
}

export function trustLabel(score: number): string {
  if (score >= 90) return "Confiance exceptionnelle";
  if (score >= 75) return "Confiance élevée";
  if (score >= 55) return "Confiance solide";
  return "Profil en construction";
}
