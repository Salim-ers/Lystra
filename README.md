# Lystra

> **Trouvez et réservez les meilleurs prestataires pour vos événements d'exception.**

Lystra est une marketplace premium de prestataires événementiels — pensée comme un croisement entre **Malt** et **Airbnb**, dédiée au haut de gamme : mariages, anniversaires, baby showers, baptêmes, événements privés et corporate, soirées d'exception.

Ce dépôt contient le **MVP** : une application **Next.js 14 (App Router)** en **TypeScript**, avec un design system sur mesure, un schéma **Supabase** complet, des données de démonstration et l'ensemble des pages du parcours (vitrine, marketplace, fiche prestataire, authentification, espaces client & prestataire, administration).

---

## Stack technique

| Domaine | Technologie |
| --- | --- |
| Framework | Next.js 14 (App Router) + React 18 |
| Langage | TypeScript (strict) |
| Styles | Tailwind CSS + design tokens maison |
| Composants | Primitives shadcn/ui personnalisées (Radix) |
| Animations | Framer Motion |
| Formulaires | React Hook Form + Zod |
| Backend | Supabase (Postgres, Auth, Storage, RLS) |
| Paiements | Stripe + Stripe Connect |
| Emails | Resend |
| Icônes | Lucide |
| Calendrier | react-day-picker |

---

## Design system

L'univers visuel est **éditorial et luxueux** : beaucoup d'espace, des cartes arrondies, des ombres très légères, de fins filets champagne et des micro-interactions discrètes. À l'opposé du cliché « mariage rose bonbon ».

**Palette** (définie dans `tailwind.config.ts`, clés `lystra-*`) :

| Clé | Hex | Usage |
| --- | --- | --- |
| `ivory` | `#FBF7F0` | Fond principal |
| `cream` | `#FFF9F1` | Fond secondaire / sections |
| `ink` | `#24121F` | Texte (prune-noir) |
| `champagne` | `#D8B47A` | Accent premium / or-rose |
| `plum` | `#3A1633` | Accent profond / CTA |
| `rose` | `#D9A6A0` | Touches rosées |
| `dark` | `#180B16` | Sections sombres |
| `gray` | `#8C7E87` | Texte secondaire |

**Typographie** : `Playfair Display` (titres, classe `.display` / `font-serif`) + `Inter` (corps, `font-sans`), chargées via `next/font`.

**Signature de marque** : la **« ribbon mark »** (`components/shared/ribbon-mark.tsx`) — une recréation vectorielle du symbole Lystra, réutilisée comme marque dans le header, ornement de section et filigrane dans les héros et le footer. Le logo applicatif est composé de ce symbole vectoriel + le mot « Lystra » en Playfair ; les PNG fournis (`public/brand/`) sont réservés aux images OG / favicon car ils embarquent un fond prune.

---

## Démarrage rapide

### 1. Prérequis

- Node.js ≥ 18.17
- Un projet [Supabase](https://supabase.com)
- Un compte [Stripe](https://stripe.com) (mode test)
- (Optionnel) Un compte [Resend](https://resend.com) pour les emails

### 2. Installation

```bash
npm install
```

### 3. Variables d'environnement

Copiez le fichier d'exemple puis renseignez vos clés :

```bash
cp .env.example .env.local
```

```dotenv
# Supabase
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_PRICE_STARTER=price_...
STRIPE_PRICE_PRO=price_...
STRIPE_PRICE_ELITE=price_...

# Resend
RESEND_API_KEY=...

# App
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Base de données

Avec la **CLI Supabase**, appliquez le schéma, les règles RLS puis les données de démonstration :

```bash
supabase db push                       # migrations (schéma + RLS)
supabase db execute -f supabase/seed.sql   # données de démo
```

> Le seed crée 2 comptes de démonstration (`client.demo@lystra.app` / `vendor.demo@lystra.app`, mot de passe `lystra-demo`), des catégories, des prestataires et un avis.

### 5. Lancer l'application

```bash
npm run dev
```

L'app tourne sur [http://localhost:3000](http://localhost:3000).

### 6. Webhooks Stripe (en local)

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Événements gérés : `checkout.session.completed`, `customer.subscription.{created,updated,deleted}`, `payment_intent.{succeeded,payment_failed}`.

---

## Structure du projet

```
lystra/
├── app/
│   ├── (marketing)/          # Vitrine : accueil, catégories, tarifs, devenir prestataire
│   ├── (auth)/               # Connexion, inscription, mot de passe oublié
│   ├── onboarding/           # Assistant d'inscription prestataire (multi-étapes)
│   ├── prestataires/         # Marketplace + fiche prestataire ([slug])
│   ├── dashboard/
│   │   ├── client/           # Espace client : favoris, demandes, réservations, messages
│   │   └── vendor/           # Espace prestataire : profil, services, dispos, abonnement…
│   ├── admin/                # Back-office : modération, commissions
│   ├── api/stripe/           # Routes checkout + webhook
│   ├── layout.tsx            # Layout racine (polices, metadata, PWA)
│   └── globals.css           # Variables CSS + classes utilitaires
├── components/
│   ├── ui/                   # Primitives shadcn/ui personnalisées
│   ├── shared/               # Logo, ribbon-mark, notes, badges, états…
│   ├── marketing/            # Header, footer, hero, sections vitrine
│   ├── marketplace/          # VendorCard, filtres, BookingBox, avis…
│   ├── dashboard/            # Sidebar, stat cards, messagerie, calendrier…
│   └── admin/                # Table d'administration
├── data/                     # Données de démo (catégories, prestataires, témoignages)
├── lib/                      # utils, constantes, clients Supabase & Stripe
├── types/                    # Types du domaine
├── supabase/
│   ├── migrations/           # 0001_schema.sql, 0002_rls.sql
│   └── seed.sql              # Données de démonstration
└── public/brand/             # Logo & symbole Lystra
```

---

## Modèle de données (Supabase)

Le schéma couvre l'ensemble du domaine : `profiles`, `vendors`, `vendor_services`, `vendor_categories`, `categories`, `vendor_photos`, `vendor_availability`, `events`, `booking_requests`, `bookings`, `conversations`, `messages`, `reviews`, `favorites`, `subscriptions`, `payments`, `payouts`, `invoices`, `commission_settings`, `admin_settings`, `notifications`.

Points clés :

- **RLS activée** sur toutes les tables : un client ne voit que ses données, un prestataire ne gère que son profil et ses réservations, l'admin modère, et les écritures financières passent par la clé `service_role`.
- **Statuts de réservation** : `draft → pending → quoted → accepted/rejected → paid → confirmed → completed → cancelled/refunded`.
- **Commission configurable** (8–15 %, défaut **12 %**) stockée dans `commission_settings` et figée sur chaque réservation.
- **Recherche** full-text français (index GIN) sur les prestataires.

---

## Abonnements prestataires

| Offre | Prix | Pour qui |
| --- | --- | --- |
| **Starter** | 19 €/mois | Lancer son activité |
| **Pro** ⭐ | 49 €/mois | Grandir (mise en avant, badge vérifié) |
| **Elite** | 99 €/mois | Visibilité maximale |

S'y ajoute une commission plateforme de **12 %** sur les réservations payées via Lystra.

---

## Scripts

```bash
npm run dev      # Développement
npm run build    # Build de production
npm run start    # Serveur de production
npm run lint     # ESLint
```

---

## Prochaines itérations

Le MVP est conçu pour être **branché** sur le backend. Pistes prioritaires :

- Câbler les formulaires (connexion, inscription, demandes) sur Supabase Auth + actions serveur Zod.
- Remplacer les données de démo (`data/`) par des requêtes Supabase.
- Finaliser le flux de paiement Stripe Connect (acomptes, versements prestataires).
- Notifications temps réel (messagerie, demandes) et emails transactionnels Resend.
- Upload réel des photos vers Supabase Storage.

---

## Notes de conception

Le design s'appuie sur une lecture « anti-template » : variance visuelle maîtrisée, motion discret, densité adaptée (aérée sur la vitrine, plus dense sur les tableaux de bord). L'audace est concentrée sur la signature de marque (ribbon mark) ; le reste reste sobre et premium.

---

*Lystra — Event Services Marketplace.*
