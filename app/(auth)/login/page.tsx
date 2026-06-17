"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/dashboard/client";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError("Email ou mot de passe incorrect.");
        setSubmitting(false);
        return;
      }
      router.push(redirect);
      router.refresh();
    } catch {
      setError("Connexion impossible. Vérifiez votre configuration Supabase.");
      setSubmitting(false);
    }
  }

  async function withGoogle() {
    try {
      const supabase = createClient();
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}${redirect}` },
      });
    } catch {
      setError("Connexion Google indisponible.");
    }
  }

  return (
    <div>
      <h1 className="font-serif text-3xl text-lystra-ink">Bon retour sur Lystra</h1>
      <p className="mt-2 text-sm text-lystra-gray">
        Connectez-vous pour retrouver vos talents et vos réservations.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-lystra-gray" />
            <Input id="email" type="email" placeholder="vous@exemple.com" className="pl-10" required
              value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Mot de passe</Label>
            <Link href="/forgot-password" className="text-xs text-lystra-plum hover:underline">
              Oublié ?
            </Link>
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-lystra-gray" />
            <Input id="password" type="password" placeholder="••••••••" className="pl-10" required
              value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button type="submit" size="lg" className="w-full gap-2" disabled={submitting}>
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {submitting ? "Connexion…" : "Se connecter"}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <Separator className="flex-1" />
        <span className="text-xs uppercase tracking-wider text-lystra-gray">ou</span>
        <Separator className="flex-1" />
      </div>

      <Button variant="outline" size="lg" className="w-full" onClick={withGoogle} type="button">
        Continuer avec Google
      </Button>

      <p className="mt-8 text-center text-sm text-lystra-gray">
        Pas encore de compte ?{" "}
        <Link href="/register" className="font-medium text-lystra-plum hover:underline">
          Créer un compte
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
