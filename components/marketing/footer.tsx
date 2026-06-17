import Link from "next/link";
import { Instagram, Linkedin } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { RibbonMark } from "@/components/shared/ribbon-mark";
import { SITE } from "@/lib/constants";

const COLUMNS = [
  {
    title: "Explorer",
    links: [
      { href: "/prestataires", label: "Tous les prestataires" },
      { href: "/categories", label: "Catégories" },
      { href: "/prestataires?sort=rating", label: "Les mieux notés" },
      { href: "/prestataires?elite=1", label: "Sélection Elite" },
    ],
  },
  {
    title: "Prestataires",
    links: [
      { href: "/devenir-prestataire", label: "Devenir prestataire" },
      { href: "/pricing", label: "Tarifs & abonnements" },
      { href: "/login", label: "Espace prestataire" },
    ],
  },
  {
    title: "Lystra",
    links: [
      { href: "/#comment-ca-marche", label: "Comment ça marche" },
      { href: "/#confiance", label: "Confiance & sécurité" },
      { href: "/#temoignages", label: "Témoignages" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-lystra-dark text-lystra-cream">
      <RibbonMark
        className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 text-lystra-champagne/10"
        withDots={false}
      />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo tone="light" showTagline />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-lystra-cream/70">
              {SITE.tagline}
            </p>
            <div className="mt-6 flex gap-3">
              <a href="https://instagram.com" aria-label="Instagram" className="rounded-full border border-lystra-champagne/30 p-2 text-lystra-champagne transition hover:bg-lystra-champagne/10">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn" className="rounded-full border border-lystra-champagne/30 p-2 text-lystra-champagne transition hover:bg-lystra-champagne/10">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs uppercase tracking-[0.18em] text-lystra-champagne">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-lystra-cream/75 transition hover:text-lystra-cream">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-lystra-champagne/15 pt-8 text-xs text-lystra-cream/55 sm:flex-row">
          <p>© {new Date().getFullYear()} Lystra. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="transition hover:text-lystra-cream">Mentions légales</Link>
            <Link href="/confidentialite" className="transition hover:text-lystra-cream">Confidentialité</Link>
            <Link href="/cgu" className="transition hover:text-lystra-cream">CGU</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
