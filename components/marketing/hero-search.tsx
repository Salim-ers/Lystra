"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, CalendarDays, MapPin, Sparkles, PartyPopper } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/data/categories";
import { CITIES, EVENT_TYPES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

export function HeroSearch({ className, variant = "hero" }: { className?: string; variant?: "hero" | "compact" }) {
  const router = useRouter();
  const [eventType, setEventType] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [city, setCity] = React.useState("");
  const [date, setDate] = React.useState("");

  function submit() {
    const params = new URLSearchParams();
    if (eventType) params.set("event", eventType);
    if (category) params.set("category", category);
    if (city) params.set("city", city);
    if (date) params.set("date", date);
    router.push(`/prestataires${params.toString() ? `?${params}` : ""}`);
  }

  return (
    <div
      className={cn(
        "rounded-3xl border border-lystra-champagne/30 bg-lystra-cream/95 p-2 shadow-lift backdrop-blur-md",
        className,
      )}
    >
      <div className="grid grid-cols-1 gap-1 md:grid-cols-[1.1fr_1.1fr_0.9fr_0.9fr_auto] md:items-stretch">
        <Field icon={<PartyPopper className="h-4 w-4" />} label="Événement">
          <Select value={eventType} onValueChange={setEventType}>
            <SelectTrigger className="h-auto border-0 bg-transparent px-0 shadow-none focus:ring-0">
              <SelectValue placeholder="Tous types" />
            </SelectTrigger>
            <SelectContent>
              {EVENT_TYPES.map((e) => <SelectItem key={e} value={e}>{e}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>

        <Field icon={<Sparkles className="h-4 w-4" />} label="Catégorie" className="md:border-l md:border-lystra-champagne/20">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="h-auto border-0 bg-transparent px-0 shadow-none focus:ring-0">
              <SelectValue placeholder="Toutes" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>

        <Field icon={<MapPin className="h-4 w-4" />} label="Ville" className="md:border-l md:border-lystra-champagne/20">
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="h-auto border-0 bg-transparent px-0 shadow-none focus:ring-0">
              <SelectValue placeholder="Partout" />
            </SelectTrigger>
            <SelectContent>
              {CITIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>

        <Field icon={<CalendarDays className="h-4 w-4" />} label="Date" className="md:border-l md:border-lystra-champagne/20">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
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
      <span className="text-lystra-champagne">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-[0.65rem] uppercase tracking-wide text-lystra-gray">{label}</p>
        {children}
      </div>
    </div>
  );
}
