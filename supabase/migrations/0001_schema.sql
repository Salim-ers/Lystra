-- =====================================================================
-- Lystra — 0001_schema.sql
-- Marketplace premium de prestataires événementiels.
-- PostgreSQL / Supabase. Run with: supabase db push  (or paste in SQL editor)
-- =====================================================================

create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

-- ---------------------------------------------------------------------
-- ENUMS
-- ---------------------------------------------------------------------
create type user_role          as enum ('client', 'vendor', 'admin');
create type subscription_plan  as enum ('starter', 'pro', 'elite');
create type subscription_status as enum ('trialing', 'active', 'past_due', 'canceled', 'incomplete');
create type booking_status     as enum (
  'draft','pending','quoted','accepted','rejected',
  'paid','confirmed','completed','cancelled','refunded'
);
create type payment_status     as enum ('unpaid','deposit_paid','paid','refunded','failed');
create type payment_kind       as enum ('deposit','balance','full','subscription');
create type review_status      as enum ('pending','published','rejected');
create type notification_type  as enum ('booking_request','booking_update','message','review','payout','system');

-- ---------------------------------------------------------------------
-- PROFILES  (1-1 with auth.users)
-- ---------------------------------------------------------------------
create table public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  role          user_role not null default 'client',
  full_name     text,
  email         text,
  phone         text,
  avatar_url    text,
  city          text,
  -- client onboarding context
  event_type    text,
  event_date    date,
  budget        integer,
  is_active     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- CATEGORIES
-- ---------------------------------------------------------------------
create table public.categories (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  name         text not null,
  description  text,
  icon         text,            -- lucide icon name
  cover_url    text,
  seo_intro    text,
  sort_order   integer not null default 0,
  is_active    boolean not null default true,
  created_at   timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- VENDORS
-- ---------------------------------------------------------------------
create table public.vendors (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references public.profiles(id) on delete cascade,
  business_name    text not null,
  slug             text unique not null,
  tagline          text,
  description      text,
  category_id      uuid references public.categories(id) on delete set null,
  city             text,
  country          text default 'France',
  address          text,
  latitude         double precision,
  longitude        double precision,
  service_radius_km integer default 30,
  starting_price   integer,                         -- cents or whole € (whole € here)
  currency         text not null default 'EUR',
  average_rating   numeric(2,1) not null default 0, -- 0.0 - 5.0
  reviews_count    integer not null default 0,
  is_verified      boolean not null default false,
  is_featured      boolean not null default false,
  is_elite         boolean not null default false,
  is_published     boolean not null default false,
  home_service     boolean not null default false,
  response_time    text,                            -- e.g. "< 2h"
  response_rate    integer default 100,             -- %
  cover_url        text,
  portfolio_url    text,
  instagram_url    text,
  website_url      text,
  siret            text,
  views_count      integer not null default 0,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- secondary categories (vendor can serve several event types)
create table public.vendor_categories (
  vendor_id    uuid not null references public.vendors(id) on delete cascade,
  category_id  uuid not null references public.categories(id) on delete cascade,
  primary key (vendor_id, category_id)
);

create table public.vendor_services (
  id           uuid primary key default gen_random_uuid(),
  vendor_id    uuid not null references public.vendors(id) on delete cascade,
  title        text not null,
  description  text,
  price        integer not null,        -- whole €
  price_unit   text default 'forfait',  -- forfait | par personne | par heure | par jour
  duration     text,
  is_pack      boolean not null default false,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now()
);

create table public.vendor_photos (
  id           uuid primary key default gen_random_uuid(),
  vendor_id    uuid not null references public.vendors(id) on delete cascade,
  url          text not null,
  caption      text,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now()
);

create table public.vendor_availability (
  id           uuid primary key default gen_random_uuid(),
  vendor_id    uuid not null references public.vendors(id) on delete cascade,
  date         date not null,
  is_available boolean not null default true,
  note         text,
  unique (vendor_id, date)
);

-- ---------------------------------------------------------------------
-- EVENTS  (a client's event in preparation)
-- ---------------------------------------------------------------------
create table public.events (
  id           uuid primary key default gen_random_uuid(),
  client_id    uuid not null references public.profiles(id) on delete cascade,
  title        text,
  event_type   text,
  event_date   date,
  city         text,
  guest_count  integer,
  budget       integer,
  notes        text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- BOOKING REQUESTS  →  BOOKINGS
-- ---------------------------------------------------------------------
create table public.booking_requests (
  id                  uuid primary key default gen_random_uuid(),
  client_id           uuid not null references public.profiles(id) on delete cascade,
  vendor_id           uuid not null references public.vendors(id) on delete cascade,
  event_id            uuid references public.events(id) on delete set null,
  event_type          text,
  event_date          date,
  event_city          text,
  guest_count         integer,
  budget              integer,
  selected_service_id uuid references public.vendor_services(id) on delete set null,
  message             text,
  status              booking_status not null default 'pending',
  quoted_price        integer,
  proposed_date       date,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create table public.bookings (
  id                       uuid primary key default gen_random_uuid(),
  booking_request_id       uuid references public.booking_requests(id) on delete set null,
  client_id                uuid not null references public.profiles(id) on delete cascade,
  vendor_id                uuid not null references public.vendors(id) on delete cascade,
  event_date               date,
  final_price              integer not null,
  deposit_amount           integer,
  commission_rate          numeric(4,2),         -- snapshot of platform rate at booking time
  commission_amount        integer,
  status                   booking_status not null default 'confirmed',
  payment_status           payment_status not null default 'unpaid',
  stripe_payment_intent_id text,
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- MESSAGING
-- ---------------------------------------------------------------------
create table public.conversations (
  id                 uuid primary key default gen_random_uuid(),
  client_id          uuid not null references public.profiles(id) on delete cascade,
  vendor_id          uuid not null references public.vendors(id) on delete cascade,
  booking_request_id uuid references public.booking_requests(id) on delete set null,
  last_message_at    timestamptz default now(),
  created_at         timestamptz not null default now(),
  unique (client_id, vendor_id)
);

create table public.messages (
  id               uuid primary key default gen_random_uuid(),
  conversation_id  uuid not null references public.conversations(id) on delete cascade,
  sender_id        uuid not null references public.profiles(id) on delete cascade,
  body             text not null,
  is_read          boolean not null default false,
  created_at       timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- REVIEWS
-- ---------------------------------------------------------------------
create table public.reviews (
  id            uuid primary key default gen_random_uuid(),
  booking_id    uuid references public.bookings(id) on delete set null,
  vendor_id     uuid not null references public.vendors(id) on delete cascade,
  client_id     uuid not null references public.profiles(id) on delete cascade,
  rating        integer not null check (rating between 1 and 5),
  quality       integer check (quality between 1 and 5),
  communication integer check (communication between 1 and 5),
  punctuality   integer check (punctuality between 1 and 5),
  value         integer check (value between 1 and 5),
  comment       text,
  status        review_status not null default 'published',
  created_at    timestamptz not null default now(),
  unique (booking_id)
);

-- ---------------------------------------------------------------------
-- FAVORITES
-- ---------------------------------------------------------------------
create table public.favorites (
  client_id   uuid not null references public.profiles(id) on delete cascade,
  vendor_id   uuid not null references public.vendors(id) on delete cascade,
  created_at  timestamptz not null default now(),
  primary key (client_id, vendor_id)
);

-- ---------------------------------------------------------------------
-- BILLING : subscriptions / payments / payouts / invoices / settings
-- ---------------------------------------------------------------------
create table public.subscriptions (
  id                     uuid primary key default gen_random_uuid(),
  vendor_id              uuid not null references public.vendors(id) on delete cascade,
  plan                   subscription_plan not null default 'starter',
  status                 subscription_status not null default 'trialing',
  stripe_customer_id     text,
  stripe_subscription_id text,
  current_period_end     timestamptz,
  cancel_at_period_end   boolean not null default false,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now(),
  unique (vendor_id)
);

create table public.payments (
  id                       uuid primary key default gen_random_uuid(),
  booking_id               uuid references public.bookings(id) on delete set null,
  payer_id                 uuid references public.profiles(id) on delete set null,
  vendor_id                uuid references public.vendors(id) on delete set null,
  amount                   integer not null,          -- whole €
  currency                 text not null default 'EUR',
  kind                     payment_kind not null default 'full',
  status                   text not null default 'pending',
  stripe_payment_intent_id text,
  stripe_checkout_id       text,
  created_at               timestamptz not null default now()
);

create table public.payouts (
  id                 uuid primary key default gen_random_uuid(),
  vendor_id          uuid not null references public.vendors(id) on delete cascade,
  booking_id         uuid references public.bookings(id) on delete set null,
  amount             integer not null,
  currency           text not null default 'EUR',
  status             text not null default 'pending',  -- pending | in_transit | paid | failed
  stripe_transfer_id text,
  created_at         timestamptz not null default now()
);

create table public.invoices (
  id           uuid primary key default gen_random_uuid(),
  number       text unique,
  booking_id   uuid references public.bookings(id) on delete set null,
  vendor_id    uuid references public.vendors(id) on delete set null,
  client_id    uuid references public.profiles(id) on delete set null,
  amount       integer not null,
  pdf_url      text,
  created_at   timestamptz not null default now()
);

-- single-row table holding the configurable platform commission
create table public.commission_settings (
  id              integer primary key default 1 check (id = 1),
  rate            numeric(4,2) not null default 12.00,  -- percent
  deposit_percent integer not null default 30,          -- default deposit %
  updated_at      timestamptz not null default now()
);
insert into public.commission_settings (id) values (1) on conflict do nothing;

-- generic key/value admin settings
create table public.admin_settings (
  key         text primary key,
  value       jsonb not null default '{}',
  updated_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- NOTIFICATIONS
-- ---------------------------------------------------------------------
create table public.notifications (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references public.profiles(id) on delete cascade,
  type       notification_type not null,
  title      text not null,
  body       text,
  link       text,
  is_read    boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- INDEXES
-- ---------------------------------------------------------------------
create index idx_vendors_category      on public.vendors(category_id);
create index idx_vendors_city          on public.vendors(city);
create index idx_vendors_published      on public.vendors(is_published) where is_published = true;
create index idx_vendors_rating         on public.vendors(average_rating desc);
create index idx_vendors_featured       on public.vendors(is_featured) where is_featured = true;
create index idx_vendors_search         on public.vendors
  using gin (to_tsvector('french', coalesce(business_name,'') || ' ' || coalesce(tagline,'') || ' ' || coalesce(description,'')));
create index idx_services_vendor        on public.vendor_services(vendor_id);
create index idx_photos_vendor          on public.vendor_photos(vendor_id);
create index idx_availability_vendor    on public.vendor_availability(vendor_id, date);
create index idx_requests_vendor        on public.booking_requests(vendor_id, status);
create index idx_requests_client        on public.booking_requests(client_id, status);
create index idx_bookings_vendor        on public.bookings(vendor_id, status);
create index idx_bookings_client        on public.bookings(client_id, status);
create index idx_messages_conversation  on public.messages(conversation_id, created_at);
create index idx_reviews_vendor         on public.reviews(vendor_id, status);
create index idx_notifications_user     on public.notifications(user_id, is_read);

-- ---------------------------------------------------------------------
-- TRIGGERS
-- ---------------------------------------------------------------------
-- generic updated_at
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger trg_profiles_touch   before update on public.profiles         for each row execute function public.touch_updated_at();
create trigger trg_vendors_touch    before update on public.vendors          for each row execute function public.touch_updated_at();
create trigger trg_events_touch     before update on public.events           for each row execute function public.touch_updated_at();
create trigger trg_requests_touch   before update on public.booking_requests for each row execute function public.touch_updated_at();
create trigger trg_bookings_touch   before update on public.bookings         for each row execute function public.touch_updated_at();
create trigger trg_subs_touch       before update on public.subscriptions    for each row execute function public.touch_updated_at();

-- create a profile row automatically when a user signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    coalesce((new.raw_user_meta_data->>'role')::user_role, 'client')
  )
  on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- recompute vendor rating aggregates when reviews change
create or replace function public.refresh_vendor_rating()
returns trigger language plpgsql as $$
declare v_id uuid;
begin
  v_id := coalesce(new.vendor_id, old.vendor_id);
  update public.vendors v set
    average_rating = coalesce((select round(avg(rating)::numeric, 1) from public.reviews r where r.vendor_id = v_id and r.status = 'published'), 0),
    reviews_count  = coalesce((select count(*) from public.reviews r where r.vendor_id = v_id and r.status = 'published'), 0)
  where v.id = v_id;
  return null;
end; $$;

create trigger trg_reviews_rating
  after insert or update or delete on public.reviews
  for each row execute function public.refresh_vendor_rating();

-- helper: is the current user an admin? (used by RLS)
create or replace function public.is_admin()
returns boolean language sql security definer stable set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

-- helper: does the current user own this vendor?
create or replace function public.owns_vendor(v_id uuid)
returns boolean language sql security definer stable set search_path = public as $$
  select exists (select 1 from public.vendors where id = v_id and user_id = auth.uid());
$$;
