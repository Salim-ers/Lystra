"use client";
import * as React from "react";
import { RotateCcw } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { FAMILIES } from "@/data/families";
import { CITIES, EVENT_TYPES } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

export type SortKey = "recommended" | "rating" | "price-asc" | "price-desc" | "newest";

export interface VendorFilterState {
  q: string;
  family: string;
  category: string;
  city: string;
  eventType: string;
  maxBudget: number;
  minRating: number;
  verifiedOnly: boolean;
  eliteOnly: boolean;
  homeServiceOnly: boolean;
  bookingOnly: boolean;
  packsOnly: boolean;
  availableSoon: boolean;
  sort: SortKey;
}

export const DEFAULT_FILTERS: VendorFilterState = {
  q: "",
  family: "all",
  category: "all",
  city: "all",
  eventType: "all",
  maxBudget: 7000,
  minRating: 0,
  verifiedOnly: false,
  eliteOnly: false,
  homeServiceOnly: false,
  bookingOnly: false,
  packsOnly: false,
  availableSoon: false,
  sort: "recommended",
};

const RATINGS = [
  { value: 0, label: "Toutes les notes" },
  { value: 4, label: "4,0 et plus" },
  { value: 4.5, label: "4,5 et plus" },
  { value: 4.8, label: "4,8 et plus" },
];

const TOGGLES: { key: keyof VendorFilterState; label: string }[] = [
  { key: "availableSoon", label: "Disponible bientôt" },
  { key: "bookingOnly", label: "Réservation directe" },
  { key: "packsOnly", label: "Packs disponibles" },
  { key: "homeServiceOnly", label: "Service à domicile" },
  { key: "verifiedOnly", label: "Talents vérifiés" },
  { key: "eliteOnly", label: "Sélection Elite" },
];

export function VendorFilters({
  value,
  onChange,
}: {
  value: VendorFilterState;
  onChange: (next: VendorFilterState) => void;
}) {
  const set = <K extends keyof VendorFilterState>(key: K, v: VendorFilterState[K]) =>
    onChange({ ...value, [key]: v });

  // Categories shown depend on the selected family
  const categoryOptions =
    value.family !== "all" ? CATEGORIES.filter((c) => c.family === value.family) : CATEGORIES;

  return (
    <div className="space-y-7">
      <div>
        <Label className="mb-2 block text-xs uppercase tracking-wide text-lystra-gray">Univers</Label>
        <Select
          value={value.family}
          onValueChange={(v) => onChange({ ...value, family: v, category: "all" })}
        >
          <SelectTrigger aria-label="Univers"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les univers</SelectItem>
            {FAMILIES.map((f) => <SelectItem key={f.slug} value={f.slug}>{f.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="mb-2 block text-xs uppercase tracking-wide text-lystra-gray">Catégorie</Label>
        <Select value={value.category} onValueChange={(v) => set("category", v)}>
          <SelectTrigger aria-label="Catégorie"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les catégories</SelectItem>
            {categoryOptions.map((c) => (
              <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="mb-2 block text-xs uppercase tracking-wide text-lystra-gray">Ville</Label>
        <Select value={value.city} onValueChange={(v) => set("city", v)}>
          <SelectTrigger aria-label="Ville"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les villes</SelectItem>
            {CITIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="mb-2 block text-xs uppercase tracking-wide text-lystra-gray">Pour quel moment ?</Label>
        <Select value={value.eventType} onValueChange={(v) => set("eventType", v)}>
          <SelectTrigger aria-label="Type d'événement"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les événements</SelectItem>
            {EVENT_TYPES.map((e) => <SelectItem key={e} value={e}>{e}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <Label className="text-xs uppercase tracking-wide text-lystra-gray">Budget maximum</Label>
          <span className="text-sm font-medium text-lystra-ink">{formatPrice(value.maxBudget)}</span>
        </div>
        <Slider
          aria-label="Budget maximum"
          min={50}
          max={7000}
          step={50}
          value={[value.maxBudget]}
          onValueChange={([v]) => set("maxBudget", v)}
        />
      </div>

      <div>
        <Label className="mb-2 block text-xs uppercase tracking-wide text-lystra-gray">Note minimale</Label>
        <Select value={String(value.minRating)} onValueChange={(v) => set("minRating", Number(v))}>
          <SelectTrigger aria-label="Note minimale"><SelectValue /></SelectTrigger>
          <SelectContent>
            {RATINGS.map((r) => (
              <SelectItem key={r.value} value={String(r.value)}>{r.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3 border-t border-lystra-champagne/20 pt-5">
        {TOGGLES.map((t) => (
          <label key={t.key} className="flex cursor-pointer items-center gap-3 text-sm text-lystra-ink">
            <Checkbox
              checked={Boolean(value[t.key])}
              onCheckedChange={(c) => set(t.key, Boolean(c) as never)}
            />
            {t.label}
          </label>
        ))}
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="w-full gap-2 text-lystra-gray"
        onClick={() => onChange(DEFAULT_FILTERS)}
      >
        <RotateCcw className="h-3.5 w-3.5" /> Réinitialiser les filtres
      </Button>
    </div>
  );
}

/** Pure helper: apply filters + sort to a vendor list. */
export function applyVendorFilters<T extends {
  category: string; secondaryCategories?: string[]; family?: string; city: string;
  businessName: string; categoryName: string; startingPrice?: number; averageRating: number;
  isVerified: boolean; isElite?: boolean; homeService?: boolean; bookingEnabled?: boolean;
  availability?: string; eventTypes?: string[]; services?: { isPack?: boolean }[]; id: string;
}>(vendors: T[], f: VendorFilterState): T[] {
  const q = f.q.trim().toLowerCase();

  let out = vendors.filter((v) => {
    if (q) {
      const hay = [v.businessName, v.categoryName, v.city, ...(v.eventTypes ?? [])].join(" ").toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (f.family !== "all" && v.family !== f.family) return false;
    if (f.category !== "all" && v.category !== f.category && !v.secondaryCategories?.includes(f.category)) return false;
    if (f.city !== "all" && v.city !== f.city) return false;
    if (f.eventType !== "all" && !(v.eventTypes ?? []).includes(f.eventType)) return false;
    if (f.verifiedOnly && !v.isVerified) return false;
    if (f.eliteOnly && !v.isElite) return false;
    if (f.homeServiceOnly && !v.homeService) return false;
    if (f.bookingOnly && !v.bookingEnabled) return false;
    if (f.packsOnly && !(v.services ?? []).some((s) => s.isPack)) return false;
    if (f.availableSoon && !(v.availability === "available" || v.availability === "weekend")) return false;
    if (f.minRating && v.averageRating < f.minRating) return false;
    if (v.startingPrice != null && v.startingPrice > f.maxBudget) return false;
    return true;
  });

  switch (f.sort) {
    case "rating": out = [...out].sort((a, b) => b.averageRating - a.averageRating); break;
    case "price-asc": out = [...out].sort((a, b) => (a.startingPrice ?? 0) - (b.startingPrice ?? 0)); break;
    case "price-desc": out = [...out].sort((a, b) => (b.startingPrice ?? 0) - (a.startingPrice ?? 0)); break;
    case "newest": out = [...out].reverse(); break;
    default: break;
  }
  return out;
}

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "recommended", label: "Recommandés" },
  { value: "rating", label: "Meilleures notes" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "newest", label: "Nouveautés" },
];
