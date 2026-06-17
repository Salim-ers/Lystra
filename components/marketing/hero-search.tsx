"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, CalendarDays, MapPin, PartyPopper } from "lucide-react";
import { cn } from "@/lib/utils";
import { CITIES, EVENT_TYPES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

/**
 * Barre de recherche premium façon Airbnb : segments arrondis, bordures
 * champagne, ombre douce. Champ mot-clé en tête ("Que recherchez-vous ?").
 */
export function HeroSearch({ className, variant = "hero" }: { className?: string; variant?: "hero" | "compact" }) {
  const router = useRouter();
  const [q, setQ] = React.useState("");
  const [city, setCity] = React.useState("");
  const [eventType, setEventType] = React.useState("");
  const [date, setDate] = React.useState("");

  function submit() {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (city) params.set("city", city);
    if (eventType) params.set("event", eventType);
    if (date) params.set("date", date);
    router.push(`/prestataires${params.toString() ? `?${params}` : ""}`);
  }

  return (
    <div
      className={cn(
        "rounded-[1.75rem] border border-lystra-champagne/40 bg-lystra-cream/95 p-2 shadow-lift backdrop-blur-md ring-1 ring-white/40",
        className,
      )}
    >
      <div className="grid grid-cols-1 gap-1 md:grid-cols-[1.5fr_1fr_1fr_1fr_auto] md:items-stretch">
        <Field icon={<Search className="h-4 w-4" />} label="Que recherchez-vous ?">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            aria-label="Que recherchez-vous ?"
            placeholder="Coiffeuse, photographe, traiteur, DJ…"
            className="w-full bg-transparent text-sm text-lystra-ink outline-none placeholder:text-lystra-gray/80"
          />
        </Field>

        <Field icon={<MapPin className="h-4 w-4" />} label="Où ?" className="md:border-l md:border-lystra-champagne/20">
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger aria-label="Où ?" className="h-auto border-0 bg-transparent px-0 shadow-none focus:ring-0">
              <SelectValue placeholder="Partout" />
            </SelectTrigger>
            <SelectContent>
              {CITIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>

        <Field icon={<PartyPopper className="h-4 w-4" />} label="Pour quel moment ?" className="md:border-l md:border-lystra-champagne/20">
          <Select value={eventType} onValueChange={setEventType}>
            <SelectTrigger aria-label="Pour quel moment ?" className="h-auto border-0 bg-transparent px-0 shadow-none focus:ring-0">
              <SelectValue placeholder="Tous" />
            </SelectTrigger>
            <SelectContent>
              {EVENT_TYPES.map((e) => <SelectItem key={e} value={e}>{e}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>

        <Field icon={<CalendarDays className="h-4 w-4" />} label="Quand ?" className="md:border-l md:border-lystra-champagne/20">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            aria-label="Quand ? Date de l'événement"
            className="w-full bg-transparent text-sm text-lystra-ink outline-none placeholder:text-lystra-gray [color-scheme:light]"
          />
        </Field>

        <div className="flex items-center p-1">
          <Button onClick={submit} variant="champagne" size="lg" className="w-full gap-2 md:w-auto md:px-6">
            <Search className="h-4 w-4" />
            <span className={cn(variant === "hero" ? "md:sr-only lg:not-sr-only" : "")}>Rechercher</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

function Field({
  icon, label, children, className,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3 rounded-2xl px-4 py-2.5 transition hover:bg-white/60", className)}>
      <span className="text-lystra-champagne" aria-hidden="true">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-[0.65rem] font-medium uppercase tracking-wide text-lystra-gray">{label}</p>
        {children}
      </div>
    </div>
  );
}
