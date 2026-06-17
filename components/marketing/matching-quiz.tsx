"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  PartyPopper, CalendarDays, MapPin, Wallet, Sparkles, Users,
  Home, ArrowLeft, ArrowRight, RotateCcw, SlidersHorizontal, Boxes,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CITIES, EVENT_TYPES } from "@/lib/constants";
import { VENDORS, getVendorsByEvent } from "@/data/vendors";
import type { Vendor } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RibbonMark } from "@/components/shared/ribbon-mark";
import { VendorCard } from "@/components/marketplace/vendor-card";

/* ------------------------------------------------------------------ */
/* Types & constantes                                                  */
/* ------------------------------------------------------------------ */

type Budget = "< 500 €" | "500–1 500 €" | "1 500–5 000 €" | "5 000 €+";
type Style = "Épuré" | "Bohème" | "Luxe" | "Moderne" | "Champêtre";
type Place = "À domicile" | "Sur le lieu" | "En studio";
type Team = "Un talent" | "Une équipe complète";

interface Answers {
  event: string;
  date: string;
  city: string;
  budget: Budget | "";
  style: Style | "";
  guests: string;
  place: Place | "";
  team: Team | "";
}

const BUDGETS: Budget[] = ["< 500 €", "500–1 500 €", "1 500–5 000 €", "5 000 €+"];
const STYLES: Style[] = ["Épuré", "Bohème", "Luxe", "Moderne", "Champêtre"];
const PLACES: Place[] = ["À domicile", "Sur le lieu", "En studio"];
const TEAMS: Team[] = ["Un talent", "Une équipe complète"];

const INITIAL: Answers = {
  event: "", date: "", city: "", budget: "", style: "",
  guests: "", place: "", team: "",
};

/** Bornes budget (en €) pour filtrer sur startingPrice. */
const BUDGET_RANGE: Record<Budget, [number, number]> = {
  "< 500 €": [0, 500],
  "500–1 500 €": [500, 1500],
  "1 500–5 000 €": [1500, 5000],
  "5 000 €+": [5000, Infinity],
};

const TOTAL_STEPS = 8;

/* ------------------------------------------------------------------ */
/* Composant principal                                                 */
/* ------------------------------------------------------------------ */

export function MatchingQuiz() {
  const router = useRouter();
  const [step, setStep] = React.useState(0);
  const [submitted, setSubmitted] = React.useState(false);
  const [answers, setAnswers] = React.useState<Answers>(INITIAL);

  const set = React.useCallback(<K extends keyof Answers>(key: K, value: Answers[K]) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }, []);

  /** Choix simple : sélectionne et avance directement (étapes à boutons). */
  const choose = React.useCallback(
    <K extends keyof Answers>(key: K, value: Answers[K]) => {
      setAnswers((prev) => ({ ...prev, [key]: value }));
      setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
    },
    [],
  );

  /* --- Sélection composée à partir des réponses --------------------- */
  const recommendations = React.useMemo<Vendor[]>(() => {
    let pool = answers.event ? getVendorsByEvent(answers.event) : VENDORS;

    // Ville (optionnelle)
    if (answers.city) {
      const inCity = pool.filter((v) => v.city.toLowerCase() === answers.city.toLowerCase());
      if (inCity.length >= 3) pool = inCity; // on garde une sélection lisible
    }

    // Budget (optionnel, souple : on n'écrase pas la sélection si trop strict)
    if (answers.budget) {
      const [min, max] = BUDGET_RANGE[answers.budget];
      const inBudget = pool.filter((v) => {
        const price = v.startingPrice ?? 0;
        return price >= min && price <= max;
      });
      if (inBudget.length >= 3) pool = inBudget;
    }

    // Lieu de la prestation (souple, comme la ville et le budget)
    if (answers.place) {
      const matchesPlace = (v: Vendor) => {
        if (answers.place === "À domicile") return v.homeService;
        if (answers.place === "En studio") return v.studioService;
        if (answers.place === "Sur le lieu") return v.onSiteService;
        return true;
      };
      const inPlace = pool.filter(matchesPlace);
      if (inPlace.length >= 3) pool = inPlace;
    }

    return [...pool].sort((a, b) => b.averageRating - a.averageRating).slice(0, 6);
  }, [answers.event, answers.city, answers.budget, answers.place]);

  /* --- Navigation vers la marketplace ------------------------------- */
  const refineHref = React.useMemo(() => {
    const params = new URLSearchParams();
    if (answers.event) params.set("event", answers.event);
    if (answers.city) params.set("city", answers.city);
    if (answers.date) params.set("date", answers.date);
    const qs = params.toString();
    return `/prestataires${qs ? `?${qs}` : ""}`;
  }, [answers.event, answers.city, answers.date]);

  function handleRefine() {
    router.push(refineHref);
  }

  /* --- Résultat ----------------------------------------------------- */
  if (submitted) {
    return (
      <QuizResult
        answers={answers}
        recommendations={recommendations}
        onRefine={handleRefine}
        onRestart={() => {
          setAnswers(INITIAL);
          setStep(0);
          setSubmitted(false);
        }}
      />
    );
  }

  /* --- Validation par étape (pour activer "Suivant") ---------------- */
  const canAdvance: boolean[] = [
    Boolean(answers.event),
    true, // date optionnelle
    true, // ville optionnelle
    Boolean(answers.budget),
    Boolean(answers.style),
    true, // invités optionnel
    Boolean(answers.place),
    Boolean(answers.team),
  ];

  const isLast = step === TOTAL_STEPS - 1;

  return (
    <div className="overflow-hidden rounded-[2rem] border border-lystra-champagne/25 bg-white/70 shadow-card backdrop-blur-sm">
      <ProgressBar step={step} total={TOTAL_STEPS} />

      <div className="px-6 py-10 sm:px-12 sm:py-14">
        {/* Une question visible à la fois */}
        <div key={step} className="animate-fade-up">
          {step === 0 && (
            <QuestionShell
              icon={<PartyPopper className="h-4 w-4" />}
              index={1}
              title="Quel événement préparez-vous ?"
              hint="Choisissez le moment à célébrer."
            >
              <ChipGroup
                ariaLabel="Quel événement préparez-vous ?"
                options={EVENT_TYPES as readonly string[]}
                value={answers.event}
                onSelect={(v) => choose("event", v)}
              />
            </QuestionShell>
          )}

          {step === 1 && (
            <QuestionShell
              icon={<CalendarDays className="h-4 w-4" />}
              index={2}
              title="Pour quand ?"
              hint="Une date approximative suffit (optionnel)."
            >
              <div className="mx-auto max-w-sm">
                <Label htmlFor="quiz-date" className="sr-only">Date de l'événement</Label>
                <Input
                  id="quiz-date"
                  type="date"
                  value={answers.date}
                  onChange={(e) => set("date", e.target.value)}
                  className="[color-scheme:light]"
                />
              </div>
            </QuestionShell>
          )}

          {step === 2 && (
            <QuestionShell
              icon={<MapPin className="h-4 w-4" />}
              index={3}
              title="Dans quelle ville ?"
              hint="Pour vous proposer des talents proches (optionnel)."
            >
              <ChipGroup
                ariaLabel="Dans quelle ville ?"
                options={CITIES as readonly string[]}
                value={answers.city}
                onSelect={(v) => choose("city", v === answers.city ? "" : v)}
                allowToggle
              />
            </QuestionShell>
          )}

          {step === 3 && (
            <QuestionShell
              icon={<Wallet className="h-4 w-4" />}
              index={4}
              title="Quel budget ?"
              hint="Une fourchette pour cadrer la sélection."
            >
              <ChipGroup
                ariaLabel="Quel budget ?"
                options={BUDGETS}
                value={answers.budget}
                onSelect={(v) => choose("budget", v as Budget)}
                columns={2}
              />
            </QuestionShell>
          )}

          {step === 4 && (
            <QuestionShell
              icon={<Sparkles className="h-4 w-4" />}
              index={5}
              title="Quel style ?"
              hint="L'esthétique qui vous ressemble."
            >
              <ChipGroup
                ariaLabel="Quel style ?"
                options={STYLES}
                value={answers.style}
                onSelect={(v) => choose("style", v as Style)}
              />
            </QuestionShell>
          )}

          {step === 5 && (
            <QuestionShell
              icon={<Users className="h-4 w-4" />}
              index={6}
              title="Combien d'invités ?"
              hint="Un ordre de grandeur (optionnel)."
            >
              <div className="mx-auto max-w-sm">
                <Label htmlFor="quiz-guests" className="sr-only">Nombre d'invités</Label>
                <Input
                  id="quiz-guests"
                  type="number"
                  min={1}
                  inputMode="numeric"
                  placeholder="Ex. 80"
                  value={answers.guests}
                  onChange={(e) => set("guests", e.target.value)}
                />
              </div>
            </QuestionShell>
          )}

          {step === 6 && (
            <QuestionShell
              icon={<Home className="h-4 w-4" />}
              index={7}
              title="À domicile ou sur le lieu ?"
              hint="Où la prestation se déroulera-t-elle ?"
            >
              <ChipGroup
                ariaLabel="À domicile ou sur le lieu ?"
                options={PLACES}
                value={answers.place}
                onSelect={(v) => choose("place", v as Place)}
              />
            </QuestionShell>
          )}

          {step === 7 && (
            <QuestionShell
              icon={<Users className="h-4 w-4" />}
              index={8}
              title="Un seul talent ou une équipe complète ?"
              hint="Un prestataire ciblé, ou une équipe coordonnée."
            >
              <ChipGroup
                ariaLabel="Un seul talent ou une équipe complète ?"
                options={TEAMS}
                value={answers.team}
                onSelect={(v) => set("team", v as Team)}
                columns={2}
              />
            </QuestionShell>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-12 flex items-center justify-between gap-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className={cn(step === 0 && "pointer-events-none opacity-0")}
          >
            <ArrowLeft className="h-4 w-4" /> Précédent
          </Button>

          {isLast ? (
            <Button
              type="button"
              variant="champagne"
              size="lg"
              disabled={!canAdvance[step]}
              onClick={() => setSubmitted(true)}
            >
              Découvrir notre sélection <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="button"
              variant="default"
              onClick={() => setStep((s) => Math.min(TOTAL_STEPS - 1, s + 1))}
              disabled={!canAdvance[step]}
            >
              Suivant <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Barre de progression                                                */
/* ------------------------------------------------------------------ */

function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = ((step + 1) / total) * 100;
  return (
    <div className="border-b border-lystra-champagne/15 px-6 pb-4 pt-6 sm:px-12">
      <div className="flex items-center justify-between text-[0.7rem] font-medium uppercase tracking-eyebrow text-lystra-gray">
        <span className="inline-flex items-center gap-1.5">
          <RibbonMark withDots={false} className="h-3.5 w-3.5 text-lystra-champagne" />
          Étape {step + 1} sur {total}
        </span>
        <span>{Math.round(pct)} %</span>
      </div>
      <div
        className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-lystra-champagne/15"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={step + 1}
        aria-valuetext={`Étape ${step + 1} sur ${total}`}
      >
        <div
          className="h-full rounded-full bg-lystra-champagne transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Coquille de question                                                */
/* ------------------------------------------------------------------ */

function QuestionShell({
  icon, index, title, hint, children,
}: {
  icon: React.ReactNode;
  index: number;
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="text-center">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-lystra-plum/[0.05] text-lystra-champagne">
        {icon}
      </span>
      <p className="mt-4 text-[0.7rem] font-medium uppercase tracking-eyebrow text-lystra-gray">
        Question {index}
      </p>
      <h2 className="display mt-1.5 text-2xl text-lystra-ink sm:text-3xl">{title}</h2>
      {hint && <p className="mx-auto mt-2 max-w-md text-sm text-lystra-gray">{hint}</p>}
      <div className="mt-8">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Groupe de choix (chips)                                             */
/* ------------------------------------------------------------------ */

function ChipGroup({
  options, value, onSelect, columns, allowToggle, ariaLabel,
}: {
  options: readonly string[];
  value: string;
  onSelect: (value: string) => void;
  columns?: 2;
  allowToggle?: boolean;
  ariaLabel?: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn(
        "mx-auto flex max-w-xl flex-wrap justify-center gap-2.5",
        columns === 2 && "sm:grid sm:grid-cols-2",
      )}
    >
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onSelect(allowToggle && active ? "" : opt)}
            className={cn(
              "rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300",
              active
                ? "border-lystra-champagne bg-lystra-champagne text-lystra-ink shadow-soft"
                : "border-lystra-champagne/30 bg-white/60 text-lystra-ink hover:border-lystra-champagne hover:bg-lystra-champagne/10",
            )}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Écran de résultat                                                   */
/* ------------------------------------------------------------------ */

function QuizResult({
  answers, recommendations, onRefine, onRestart,
}: {
  answers: Answers;
  recommendations: Vendor[];
  onRefine: () => void;
  onRestart: () => void;
}) {
  const summary = [answers.event, answers.city, answers.style]
    .filter(Boolean)
    .join(" · ");
  const wantsTeam = answers.team === "Une équipe complète";

  return (
    <div className="animate-fade-up">
      {/* En-tête résultat */}
      <div className="text-center">
        <p className="eyebrow justify-center">
          <RibbonMark withDots={false} className="h-4 w-4 text-lystra-champagne" />
          Une sélection composée pour vous
        </p>
        <h2 className="display mt-3 text-3xl text-lystra-ink sm:text-4xl">
          Les talents que nous avons réunis
        </h2>
        {summary && (
          <p className="mx-auto mt-3 max-w-xl text-pretty text-base text-lystra-gray">
            {summary}
          </p>
        )}
        <p className="mx-auto mt-2 max-w-lg text-sm text-lystra-gray/90">
          Un premier aperçu — affinez le style et les détails directement sur la marketplace.
        </p>
      </div>

      {/* Encart équipe complète -> packs */}
      {wantsTeam && (
        <div className="mt-8 flex flex-col items-start gap-4 rounded-2xl border border-lystra-champagne/30 bg-lystra-plum/[0.05] p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/70 text-lystra-champagne">
              <Boxes className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-serif text-lg text-lystra-ink">
                Vous cherchez une équipe complète ?
              </h3>
              <p className="mt-1 max-w-md text-sm text-lystra-gray">
                Découvrez nos packs : des talents coordonnés et réunis pour orchestrer votre
                événement de bout en bout.
              </p>
            </div>
          </div>
          <Button asChild variant="champagne" className="shrink-0">
            <Link href="/packs">
              Voir les packs <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}

      {/* Grille de prestataires */}
      {recommendations.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((vendor, i) => (
            <VendorCard key={vendor.slug} vendor={vendor} priority={i < 3} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-lystra-champagne/25 bg-white/70 p-10 text-center">
          <p className="text-lystra-gray">
            Aucun talent ne correspond exactement à ces critères pour le moment. Affinez votre
            recherche sur la marketplace pour explorer toute notre sélection.
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button type="button" variant="outline" size="lg" onClick={onRefine}>
          <SlidersHorizontal className="h-4 w-4" /> Affiner sur la marketplace
        </Button>
        <Button type="button" variant="ghost" size="lg" onClick={onRestart}>
          <RotateCcw className="h-4 w-4" /> Recommencer
        </Button>
      </div>
    </div>
  );
}
