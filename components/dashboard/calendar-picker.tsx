"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const WEEKDAYS = ["L", "M", "M", "J", "V", "S", "D"];
const MONTHS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

type DayState = "available" | "booked" | "blocked";

function keyOf(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export function CalendarPicker({
  initialBooked = [],
}: {
  initialBooked?: string[];
}) {
  const today = new Date();
  const [cursor, setCursor] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [states, setStates] = useState<Record<string, DayState>>(() => {
    const s: Record<string, DayState> = {};
    initialBooked.forEach((k) => (s[k] = "booked"));
    return s;
  });

  const cells = useMemo(() => {
    const first = new Date(cursor.y, cursor.m, 1);
    const startOffset = (first.getDay() + 6) % 7; // Monday-first
    const daysInMonth = new Date(cursor.y, cursor.m + 1, 0).getDate();
    const out: (number | null)[] = [];
    for (let i = 0; i < startOffset; i++) out.push(null);
    for (let d = 1; d <= daysInMonth; d++) out.push(d);
    return out;
  }, [cursor]);

  function cycle(day: number) {
    const k = keyOf(cursor.y, cursor.m, day);
    setStates((prev) => {
      const cur = prev[k] ?? "available";
      const next: DayState = cur === "available" ? "blocked" : cur === "blocked" ? "available" : "booked";
      return { ...prev, [k]: next };
    });
  }

  function shift(delta: number) {
    setCursor((c) => {
      const m = c.m + delta;
      if (m < 0) return { y: c.y - 1, m: 11 };
      if (m > 11) return { y: c.y + 1, m: 0 };
      return { ...c, m };
    });
  }

  return (
    <div className="rounded-2xl border border-lystra-champagne/25 bg-white/70 p-5">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-serif text-lg text-lystra-ink">
          {MONTHS[cursor.m]} {cursor.y}
        </p>
        <div className="flex gap-1">
          <Button variant="outline" size="icon" onClick={() => shift(-1)} aria-label="Mois précédent">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => shift(1)} aria-label="Mois suivant">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((w, i) => (
          <div key={i} className="pb-2 text-xs font-medium text-lystra-gray">
            {w}
          </div>
        ))}
        {cells.map((day, i) => {
          if (day === null) return <div key={i} />;
          const k = keyOf(cursor.y, cursor.m, day);
          const state = states[k] ?? "available";
          const isPast =
            new Date(cursor.y, cursor.m, day) <
            new Date(today.getFullYear(), today.getMonth(), today.getDate());
          return (
            <button
              key={i}
              disabled={isPast || state === "booked"}
              onClick={() => cycle(day)}
              className={cn(
                "aspect-square rounded-lg text-sm transition-colors",
                isPast && "cursor-not-allowed text-lystra-gray/40",
                !isPast && state === "available" && "bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
                state === "blocked" && "bg-lystra-gray/15 text-lystra-gray line-through",
                state === "booked" && "bg-lystra-plum text-lystra-cream",
              )}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap gap-4 text-xs text-lystra-gray">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-emerald-100" /> Disponible
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-lystra-gray/20" /> Bloqué
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-lystra-plum" /> Réservé
        </span>
      </div>
      <p className="mt-3 text-xs text-lystra-gray">
        Cliquez sur une date pour basculer entre disponible et bloqué.
      </p>
    </div>
  );
}
