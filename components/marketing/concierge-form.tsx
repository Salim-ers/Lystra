"use client";

import * as React from "react";
import { Check, Send } from "lucide-react";
import { CITIES, EVENT_TYPES } from "@/lib/constants";
import { FAMILIES } from "@/data/families";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RibbonMark } from "@/components/shared/ribbon-mark";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const BUDGETS = ["< 500 €", "500–1 500 €", "1 500–5 000 €", "5 000 €+"] as const;
const STYLES = ["Épuré", "Bohème", "Luxe", "Moderne", "Champêtre", "Minimal"] as const;
const VENUES = ["À domicile", "Sur le lieu de l'événement", "En studio"] as const;
const NEEDS = ["Un seul talent", "Une équipe complète"] as const;

interface ConciergeFormState {
  eventType: string;
  city: string;
  date: string;
  budget: string;
  style: string;
  guests: string;
  venue: string;
  need: string;
  universes: string[];
  message: string;
  email: string;
}

const INITIAL_STATE: ConciergeFormState = {
  eventType: "",
  city: "",
  date: "",
  budget: "",
  style: "",
  guests: "",
  venue: "",
  need: "",
  universes: [],
  message: "",
  email: "",
};

export function ConciergeForm() {
  const [form, setForm] = React.useState<ConciergeFormState>(INITIAL_STATE);
  const [submitted, setSubmitted] = React.useState(false);

  function update<K extends keyof ConciergeFormState>(key: K, value: ConciergeFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleUniverse(name: string, checked: boolean) {
    setForm((prev) => ({
      ...prev,
      universes: checked
        ? [...prev.universes, name]
        : prev.universes.filter((u) => u !== name),
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="relative overflow-hidden rounded-[2rem] border border-lystra-champagne/30 bg-white/70 p-10 text-center shadow-card sm:p-14">
        <RibbonMark
          withDots={false}
          className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 text-lystra-plum/[0.05]"
        />
        <span className="relative mx-auto grid h-16 w-16 place-items-center rounded-full bg-lystra-champagne/15 text-lystra-champagne ring-1 ring-lystra-champagne/30">
          <Check className="h-7 w-7" />
        </span>
        <h3 className="display relative mt-6 text-2xl text-lystra-ink sm:text-3xl">
          Votre demande est bien reçue.
        </h3>
        <p className="relative mx-auto mt-4 max-w-md text-pretty leading-relaxed text-lystra-gray">
          Nos experts reviennent vers vous sous 24h avec 3 sélections de talents disponibles,
          adaptées à votre style et à votre budget.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-lystra-champagne/30 bg-white/70 p-6 shadow-card sm:p-10"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Type d'événement" htmlFor="eventType">
          <Select value={form.eventType} onValueChange={(v) => update("eventType", v)}>
            <SelectTrigger id="eventType">
              <SelectValue placeholder="Choisir un moment" />
            </SelectTrigger>
            <SelectContent>
              {EVENT_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Ville" htmlFor="city">
          <Select value={form.city} onValueChange={(v) => update("city", v)}>
            <SelectTrigger id="city">
              <SelectValue placeholder="Choisir une ville" />
            </SelectTrigger>
            <SelectContent>
              {CITIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Date" htmlFor="date">
          <Input
            id="date"
            type="date"
            value={form.date}
            onChange={(e) => update("date", e.target.value)}
            className="[color-scheme:light]"
          />
        </Field>

        <Field label="Budget" htmlFor="budget">
          <Select value={form.budget} onValueChange={(v) => update("budget", v)}>
            <SelectTrigger id="budget">
              <SelectValue placeholder="Estimer un budget" />
            </SelectTrigger>
            <SelectContent>
              {BUDGETS.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Style" htmlFor="style">
          <Select value={form.style} onValueChange={(v) => update("style", v)}>
            <SelectTrigger id="style">
              <SelectValue placeholder="Choisir une ambiance" />
            </SelectTrigger>
            <SelectContent>
              {STYLES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Nombre d'invités" htmlFor="guests">
          <Input
            id="guests"
            type="number"
            min={1}
            inputMode="numeric"
            value={form.guests}
            onChange={(e) => update("guests", e.target.value)}
            placeholder="Ex. 80"
          />
        </Field>

        <Field label="Lieu" htmlFor="venue">
          <Select value={form.venue} onValueChange={(v) => update("venue", v)}>
            <SelectTrigger id="venue">
              <SelectValue placeholder="Où se déroule l'événement ?" />
            </SelectTrigger>
            <SelectContent>
              {VENUES.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Besoin" htmlFor="need">
          <Select value={form.need} onValueChange={(v) => update("need", v)}>
            <SelectTrigger id="need">
              <SelectValue placeholder="Que recherchez-vous ?" />
            </SelectTrigger>
            <SelectContent>
              {NEEDS.map((n) => <SelectItem key={n} value={n}>{n}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <div className="mt-8">
        <Label>Univers souhaités</Label>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {FAMILIES.map((family) => {
            const checked = form.universes.includes(family.shortName);
            return (
              <label
                key={family.slug}
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-lystra-champagne/25 bg-white/60 px-4 py-3 text-sm text-lystra-ink transition hover:border-lystra-champagne/50"
              >
                <Checkbox
                  checked={checked}
                  onCheckedChange={(c) => toggleUniverse(family.shortName, Boolean(c))}
                />
                {family.shortName}
              </label>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <Field label="Votre message" htmlFor="message">
          <Textarea
            id="message"
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder="Décrivez votre projet, vos envies, vos contraintes…"
          />
        </Field>
      </div>

      <div className="mt-6">
        <Field label="Email" htmlFor="email">
          <Input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="vous@exemple.com"
          />
        </Field>
      </div>

      <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-lystra-gray">
          Sans engagement. Vos informations restent confidentielles.
        </p>
        <Button type="submit" variant="champagne" size="lg" className="w-full gap-2 sm:w-auto">
          <Send className="h-4 w-4" />
          Recevoir ma shortlist
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}
