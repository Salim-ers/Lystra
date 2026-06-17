"use client";
import * as React from "react";
import { RotateCcw } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
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
  category: string;
  city: string;
  eventType: string;
  maxBudget: number;
  minRating: number;
  verifiedOnly: boolean;
  homeServiceOnly: boolean;
  sort: SortKey;
}

export const DEFAULT_FILTERS: VendorFilterState = {
  category: "all",
  city: "all",
  eventType: "all",
  maxBudget: 6000,
  minRating: 0,
  verifiedOnly: false,
  homeServiceOnly: false,
  sort: "recommended",
};

const RATINGS = [
  { value: 0, label: "Toutes les notes" },
  { value: 4, label: "4,0 et plus" },
  { value: 4.5, label: "4,5 et plus" },
  { value: 4.8, label: "4,8 et plus" },
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

  return (
    <div className="space-y-7">
      <div>
        <Label className="mb-2 block text-xs uppercase tracking-wide text-lystra-gray">Catégorie</Label>
        <Select value={value.category} onValueChange={(v) => set("category", v)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les catégories</SelectItem>
            {CATEGORIES.map((c) => (
              <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="mb-2 block text-xs uppercase tracking-wide text-lystra-gray">Ville</Label>
        <Select value={value.city} onValueChange={(v) => set("city", v)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les villes</SelectItem>
            {CITIES.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="mb-2 block text-xs uppercase tracking-wide text-lystra-gray">Type d&apos;événement</Label>
        <Select value={value.eventType} onValueChange={(v) => set("eventType", v)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les événements</SelectItem>
            {EVENT_TYPES.map((e) => (
              <SelectItem key={e} value={e}>{e}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <Label className="text-xs uppercase tracking-wide text-lystra-gray">Budget maximum</Label>
          <span className="text-sm font-medium text-lystra-ink">{formatPrice(value.maxBudget)}</span>
        </div>
        <Slider
          min={200}
          max={6000}
          step={100}
          value={[value.maxBudget]}
          onValueChange={([v]) => set("maxBudget", v)}
        />
      </div>

      <div>
        <Label className="mb-2 block text-xs uppercase tracking-wide text-lystra-gray">Note minimale</Label>
        <Select value={String(value.minRating)} onValueChange={(v) => set("minRating", Number(v))}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {RATINGS.map((r) => (
              <SelectItem key={r.value} value={String(r.value)}>{r.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3 border-t border-lystra-champagne/20 pt-5">
        <label className="flex cursor-pointer items-center gap-3 text-sm text-lystra-ink">
          <Checkbox checked={value.verifiedOnly} onCheckedChange={(c) => set("verifiedOnly", Boolean(c))} />
          Prestataires vérifiés uniquement
        </label>
        <label className="flex cursor-pointer items-center gap-3 text-sm text-lystra-ink">
          <Checkbox checked={value.homeServiceOnly} onCheckedChange={(c) => set("homeServiceOnly", Boolean(c))} />
          Service à domicile
        </label>
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
  category: string; city: string; startingPrice?: number; averageRating: number;
  isVerified: boolean; homeService?: boolean; eventTypes?: string[]; id: string;
}>(vendors: T[], f: VendorFilterState): T[] {
  let out = vendors.filter((v) => {
    if (f.category !== "all" && v.category !== f.category) return false;
    if (f.city !== "all" && v.city !== f.city) return false;
    if (f.eventType !== "all" && !(v.eventTypes ?? []).includes(f.eventType)) return false;
    if (f.verifiedOnly && !v.isVerified) return false;
    if (f.homeServiceOnly && !v.homeService) return false;
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
