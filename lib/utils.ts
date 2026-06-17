import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a whole-euro amount, French style. */
export function formatPrice(value?: number | null, opts?: { from?: boolean }) {
  if (value == null) return "Sur devis";
  const formatted = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
  return opts?.from ? `À partir de ${formatted}` : formatted;
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function formatDateFr(date?: string | Date | null) {
  if (!date) return "";
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(
    typeof date === "string" ? new Date(date) : date,
  );
}

export function initials(name?: string | null) {
  if (!name) return "L";
  return name.split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");
}

/** Platform commission helper (rate in %). */
export function computeCommission(amount: number, rate: number) {
  const commission = Math.round((amount * rate) / 100);
  return { commission, vendorNet: amount - commission };
}
