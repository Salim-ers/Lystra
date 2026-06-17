export const SITE = {
  name: "Lystra",
  tagline: "Trouvez et réservez les meilleurs prestataires pour vos événements d'exception.",
  taglineEn: "Find and book exceptional event vendors.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  description:
    "Lystra réunit coiffeurs, maquilleurs, fleuristes, photographes, traiteurs, décorateurs et lieux de réception sélectionnés pour vos mariages, anniversaires et événements premium.",
} as const;

export const CITIES = ["Paris", "Lyon", "Marseille", "Bordeaux", "Nice"] as const;

export const EVENT_TYPES = [
  "Mariage", "Anniversaire", "Baby shower", "Baptême",
  "Événement privé", "Événement d'entreprise", "Soirée premium",
] as const;

export const BOOKING_STATUS_LABELS: Record<string, { label: string; tone: string }> = {
  draft:     { label: "Brouillon",  tone: "muted" },
  pending:   { label: "En attente", tone: "amber" },
  quoted:    { label: "Devis reçu", tone: "champagne" },
  accepted:  { label: "Acceptée",   tone: "plum" },
  rejected:  { label: "Refusée",    tone: "rose" },
  paid:      { label: "Payée",      tone: "plum" },
  confirmed: { label: "Confirmée",  tone: "plum" },
  completed: { label: "Terminée",   tone: "muted" },
  cancelled: { label: "Annulée",    tone: "rose" },
  refunded:  { label: "Remboursée", tone: "muted" },
};
