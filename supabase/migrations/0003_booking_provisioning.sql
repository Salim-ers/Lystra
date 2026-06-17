-- =====================================================================
-- Lystra — 0003_booking_provisioning.sql
-- Permet le "provisioning paresseux" : un prestataire du catalogue statique
-- est inséré à la volée lors de la première réservation/demande (via la clé
-- service-role), sans propriétaire (user_id null) tant qu'il n'est pas revendiqué.
-- =====================================================================

-- Un prestataire provisionné depuis le catalogue n'a pas encore de compte owner.
alter table public.vendors alter column user_id drop not null;

-- Origine du prestataire (catalogue auto-provisionné vs. inscrit/revendiqué).
alter table public.vendors add column if not exists source text not null default 'owner';

-- Index pour retrouver rapidement un paiement par session Checkout (webhook).
create index if not exists idx_payments_checkout on public.payments(stripe_checkout_id);
create index if not exists idx_payments_intent   on public.payments(stripe_payment_intent_id);

-- Lookup prestataire par slug (déjà unique, mais explicite pour le provisioning).
create index if not exists idx_vendors_slug on public.vendors(slug);
