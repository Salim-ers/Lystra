export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  event: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "On a trouvé notre fleuriste, notre photographe et notre traiteur en une soirée. Tout au même endroit, tout vérifié. Lystra nous a fait gagner des semaines.",
    author: "Camille & Julien",
    role: "Mariés",
    event: "Mariage · Domaine en Provence",
  },
  {
    quote:
      "Une interface claire, des prestataires haut de gamme, des réponses rapides. Exactement ce qui manquait pour organiser un événement d'entreprise sereinement.",
    author: "Sarah Lemoine",
    role: "Office Manager",
    event: "Soirée d'entreprise · Paris",
  },
  {
    quote:
      "Depuis Lystra, je reçois des demandes vraiment qualifiées. Mon agenda se remplit avec des clients qui correspondent à mon univers.",
    author: "Atelier Roselia",
    role: "Fleuriste événementiel",
    event: "Prestataire Elite · Paris",
  },
];

export const TRUST_POINTS = [
  { icon: "BadgeCheck", title: "Prestataires vérifiés", text: "Chaque profil est validé par notre équipe avant publication." },
  { icon: "ShieldCheck", title: "Paiement sécurisé", text: "Acompte ou paiement complet protégé, géré par Stripe." },
  { icon: "Star", title: "Avis authentiques", text: "Les avis proviennent uniquement de réservations réalisées." },
  { icon: "Headset", title: "Support dédié", text: "Une équipe à vos côtés, de la demande à l'événement." },
];
