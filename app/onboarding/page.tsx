"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ArrowRight, ArrowLeft, PartyPopper } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/data/categories";
import { CITIES } from "@/lib/constants";
import { PLANS } from "@/lib/stripe/plans";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/dashboard/image-uploader";

const STEPS = ["Catégorie", "Votre profil", "Portfolio", "Abonnement"];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState<string>();
  const [plan, setPlan] = useState<string>("pro");
  const [done, setDone] = useState(false);

  const canNext = step === 0 ? Boolean(category) : true;
  const isLast = step === STEPS.length - 1;

  function next() {
    if (isLast) {
      setDone(true);
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  if (done) {
    return (
      <div className="mx-auto max-w-lg px-6 py-20 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-lystra-champagne/20 text-lystra-plum">
          <PartyPopper className="h-8 w-8" />
        </span>
        <h1 className="mt-6 font-serif text-3xl text-lystra-ink">Bienvenue sur Lystra !</h1>
        <p className="mt-3 text-lystra-gray">
          Votre profil est en cours de vérification. Vous recevrez un email dès qu'il sera publié
          (24–48 h). En attendant, explorez votre espace prestataire.
        </p>
        <Button size="lg" className="mt-8" onClick={() => router.push("/dashboard/vendor")}>
          Accéder à mon espace <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lystra-ivory">
      <div className="mx-auto max-w-2xl px-6 py-12 lg:py-16">
        {/* Progress */}
        <div className="mb-10 flex items-center justify-between">
          {STEPS.map((label, i) => (
            <div key={label} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-2">
                <span
                  className={cn(
                    "grid h-9 w-9 place-items-center rounded-full text-sm font-medium transition-colors",
                    i < step && "bg-lystra-plum text-lystra-cream",
                    i === step && "bg-lystra-champagne text-lystra-ink",
                    i > step && "bg-lystra-champagne/20 text-lystra-gray",
                  )}
                >
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </span>
                <span className="hidden text-xs text-lystra-gray sm:block">{label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={cn("mx-2 h-px flex-1", i < step ? "bg-lystra-plum" : "bg-lystra-champagne/30")} />
              )}
            </div>
          ))}
        </div>

        <div className="card-premium rounded-2xl border-lystra-champagne/25 bg-white/70 p-6 lg:p-8">
          {step === 0 && (
            <div>
              <h2 className="font-serif text-2xl text-lystra-ink">Quelle est votre spécialité ?</h2>
              <p className="mt-1 text-sm text-lystra-gray">Choisissez votre catégorie principale.</p>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCategory(c.slug)}
                    className={cn(
                      "rounded-xl border p-3 text-left text-sm transition-all",
                      category === c.slug
                        ? "border-lystra-plum bg-lystra-plum/5 ring-1 ring-lystra-plum"
                        : "border-lystra-champagne/30 hover:border-lystra-champagne/60",
                    )}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h2 className="font-serif text-2xl text-lystra-ink">Présentez votre activité</h2>
                <p className="mt-1 text-sm text-lystra-gray">Ces informations apparaîtront sur votre profil public.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="biz">Nom de l'entreprise</Label>
                <Input id="biz" placeholder="Atelier Roselia" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tagline">Accroche</Label>
                <Input id="tagline" placeholder="Scénographies florales sur mesure" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="city">Ville</Label>
                  <select
                    id="city"
                    className="flex h-11 w-full rounded-xl border border-lystra-champagne/30 bg-transparent px-3 text-sm focus:outline-none focus:ring-1 focus:ring-lystra-plum"
                  >
                    {CITIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">À partir de (€)</Label>
                  <Input id="price" type="number" placeholder="1500" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc">Description</Label>
                <Textarea id="desc" rows={4} placeholder="Décrivez votre univers, votre approche, vos prestations…" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-serif text-2xl text-lystra-ink">Ajoutez vos plus belles photos</h2>
              <p className="mt-1 text-sm text-lystra-gray">
                Un portfolio soigné multiplie vos chances d'être contacté·e.
              </p>
              <div className="mt-6">
                <ImageUploader max={12} />
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="font-serif text-2xl text-lystra-ink">Choisissez votre abonnement</h2>
              <p className="mt-1 text-sm text-lystra-gray">Sans engagement, modifiable à tout moment.</p>
              <div className="mt-6 space-y-3">
                {PLANS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlan(p.id)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl border p-4 text-left transition-all",
                      plan === p.id
                        ? "border-lystra-plum bg-lystra-plum/5 ring-1 ring-lystra-plum"
                        : "border-lystra-champagne/30 hover:border-lystra-champagne/60",
                    )}
                  >
                    <div>
                      <p className="font-medium text-lystra-ink">
                        {p.name}
                        {p.highlighted && (
                          <span className="ml-2 rounded-full bg-lystra-champagne/20 px-2 py-0.5 text-[0.65rem] text-lystra-plum">
                            Recommandé
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-lystra-gray">{p.tagline}</p>
                    </div>
                    <span className="font-serif text-xl text-lystra-ink">
                      {p.price}€<span className="text-xs text-lystra-gray">{p.cadence}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Nav */}
          <div className="mt-8 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => setStep((s) => Math.max(s - 1, 0))}
              disabled={step === 0}
              className={cn(step === 0 && "invisible")}
            >
              <ArrowLeft className="h-4 w-4" /> Retour
            </Button>
            <Button onClick={next} disabled={!canNext}>
              {isLast ? "Finaliser mon inscription" : "Continuer"}
              {!isLast && <ArrowRight className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
