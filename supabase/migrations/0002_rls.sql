-- =====================================================================
-- Lystra — 0002_rls.sql
-- Row Level Security. Clients only touch their own data, vendors manage
-- only their own profile/bookings, admins can moderate everything.
-- =====================================================================

alter table public.profiles            enable row level security;
alter table public.categories          enable row level security;
alter table public.vendors             enable row level security;
alter table public.vendor_categories   enable row level security;
alter table public.vendor_services     enable row level security;
alter table public.vendor_photos       enable row level security;
alter table public.vendor_availability enable row level security;
alter table public.events              enable row level security;
alter table public.booking_requests    enable row level security;
alter table public.bookings            enable row level security;
alter table public.conversations       enable row level security;
alter table public.messages            enable row level security;
alter table public.reviews             enable row level security;
alter table public.favorites           enable row level security;
alter table public.subscriptions       enable row level security;
alter table public.payments            enable row level security;
alter table public.payouts             enable row level security;
alter table public.invoices            enable row level security;
alter table public.commission_settings enable row level security;
alter table public.admin_settings      enable row level security;
alter table public.notifications       enable row level security;

-- ---------------- PROFILES ----------------
create policy "profiles self read"   on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy "profiles self upsert" on public.profiles for insert with check (id = auth.uid());
create policy "profiles self update" on public.profiles for update using (id = auth.uid() or public.is_admin());

-- ---------------- CATEGORIES (public catalogue) ----------------
create policy "categories public read" on public.categories for select using (true);
create policy "categories admin write" on public.categories for all using (public.is_admin()) with check (public.is_admin());

-- ---------------- VENDORS ----------------
create policy "vendors public read"  on public.vendors for select using (is_published or user_id = auth.uid() or public.is_admin());
create policy "vendors owner insert" on public.vendors for insert with check (user_id = auth.uid());
create policy "vendors owner update" on public.vendors for update using (user_id = auth.uid() or public.is_admin());
create policy "vendors admin delete" on public.vendors for delete using (public.is_admin());

-- ---------------- VENDOR SUB-TABLES ----------------
create policy "vcat read"   on public.vendor_categories for select using (true);
create policy "vcat manage" on public.vendor_categories for all using (public.owns_vendor(vendor_id) or public.is_admin()) with check (public.owns_vendor(vendor_id) or public.is_admin());

create policy "services read"   on public.vendor_services for select using (true);
create policy "services manage" on public.vendor_services for all using (public.owns_vendor(vendor_id) or public.is_admin()) with check (public.owns_vendor(vendor_id) or public.is_admin());

create policy "photos read"   on public.vendor_photos for select using (true);
create policy "photos manage" on public.vendor_photos for all using (public.owns_vendor(vendor_id) or public.is_admin()) with check (public.owns_vendor(vendor_id) or public.is_admin());

create policy "availability read"   on public.vendor_availability for select using (true);
create policy "availability manage" on public.vendor_availability for all using (public.owns_vendor(vendor_id) or public.is_admin()) with check (public.owns_vendor(vendor_id) or public.is_admin());

-- ---------------- EVENTS ----------------
create policy "events owner" on public.events for all using (client_id = auth.uid() or public.is_admin()) with check (client_id = auth.uid());

-- ---------------- BOOKING REQUESTS ----------------
create policy "requests read"   on public.booking_requests for select using (client_id = auth.uid() or public.owns_vendor(vendor_id) or public.is_admin());
create policy "requests client insert" on public.booking_requests for insert with check (client_id = auth.uid());
-- client can edit while still pending; vendor can update (quote/accept/reject)
create policy "requests update" on public.booking_requests for update using (client_id = auth.uid() or public.owns_vendor(vendor_id) or public.is_admin());

-- ---------------- BOOKINGS ----------------
create policy "bookings read"   on public.bookings for select using (client_id = auth.uid() or public.owns_vendor(vendor_id) or public.is_admin());
create policy "bookings update" on public.bookings for update using (public.owns_vendor(vendor_id) or public.is_admin());
-- inserts/financial mutations go through the service-role (server actions / webhooks)

-- ---------------- CONVERSATIONS / MESSAGES ----------------
create policy "conv participants" on public.conversations for select
  using (client_id = auth.uid() or public.owns_vendor(vendor_id) or public.is_admin());
create policy "conv create" on public.conversations for insert
  with check (client_id = auth.uid() or public.owns_vendor(vendor_id));

create policy "messages read" on public.messages for select using (
  exists (select 1 from public.conversations c
          where c.id = conversation_id
            and (c.client_id = auth.uid() or public.owns_vendor(c.vendor_id) or public.is_admin()))
);
create policy "messages send" on public.messages for insert with check (
  sender_id = auth.uid() and exists (
    select 1 from public.conversations c
    where c.id = conversation_id and (c.client_id = auth.uid() or public.owns_vendor(c.vendor_id))
  )
);
create policy "messages mark read" on public.messages for update using (
  exists (select 1 from public.conversations c
          where c.id = conversation_id and (c.client_id = auth.uid() or public.owns_vendor(c.vendor_id)))
);

-- ---------------- REVIEWS ----------------
create policy "reviews public read" on public.reviews for select using (status = 'published' or client_id = auth.uid() or public.is_admin());
create policy "reviews client write" on public.reviews for insert with check (client_id = auth.uid());
create policy "reviews moderate" on public.reviews for update using (public.is_admin());

-- ---------------- FAVORITES ----------------
create policy "favorites owner" on public.favorites for all using (client_id = auth.uid()) with check (client_id = auth.uid());

-- ---------------- BILLING ----------------
create policy "subs owner read"  on public.subscriptions for select using (public.owns_vendor(vendor_id) or public.is_admin());
create policy "payments read"    on public.payments for select using (payer_id = auth.uid() or public.owns_vendor(vendor_id) or public.is_admin());
create policy "payouts read"     on public.payouts for select using (public.owns_vendor(vendor_id) or public.is_admin());
create policy "invoices read"    on public.invoices for select using (client_id = auth.uid() or public.owns_vendor(vendor_id) or public.is_admin());
-- writes to billing tables happen via Stripe webhooks using the service-role key

-- ---------------- SETTINGS ----------------
create policy "commission public read" on public.commission_settings for select using (true);
create policy "commission admin write" on public.commission_settings for all using (public.is_admin()) with check (public.is_admin());
create policy "admin settings"         on public.admin_settings for all using (public.is_admin()) with check (public.is_admin());

-- ---------------- NOTIFICATIONS ----------------
create policy "notifications owner" on public.notifications for all using (user_id = auth.uid() or public.is_admin()) with check (user_id = auth.uid() or public.is_admin());
