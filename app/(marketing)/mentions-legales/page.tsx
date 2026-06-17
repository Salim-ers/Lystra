import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales de Lystra, plateforme premium pour trouver et réserver des talents pour tous vos moments d'exception.",
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  return (
    <div className="bg-lystra-ivory">
      <div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
        <p className="eyebrow">Informations légales</p>
        <h1 className="display mt-3 text-4xl text-lystra-ink lg:text-5xl">Mentions légales</h1>
        <div className="mt-8 space-y-6 text-pretty leading-relaxed text-lystra-gray">
          <section>
            <h2 className="font-serif text-xl text-lystra-ink">Éditeur du site</h2>
            <p className="mt-2">Lystra — [raison sociale, forme juridique, capital social]. RCS / SIREN : [à compléter]. Siège social : [adresse].</p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-lystra-ink">Directeur de la publication</h2>
            <p className="mt-2">[Nom du directeur de la publication].</p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-lystra-ink">Hébergeur</h2>
            <p className="mt-2">[Nom et adresse de l'hébergeur].</p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-lystra-ink">Contact</h2>
            <p className="mt-2">[Adresse e-mail de contact].</p>
          </section>
          <p className="text-sm italic text-lystra-gray/80">Contenu à compléter avec vos informations légales avant mise en production.</p>
        </div>
      </div>
    </div>
  );
}
