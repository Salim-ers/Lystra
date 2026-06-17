-- =====================================================================
-- Lystra — seed.sql   (run after migrations: supabase db execute --file supabase/seed.sql)
-- Demo data: categories, commission settings, demo client + vendor, and
-- a few published vendor profiles so the marketplace works DB-backed.
-- =====================================================================

-- ---------------- CATEGORIES ----------------
insert into public.categories (slug, name, icon, description, sort_order) values
  ('coiffure-mariage',     'Coiffure mariage',            'Scissors',        'Coiffeurs spécialisés mariages et cérémonies.', 1),
  ('maquillage',           'Maquillage',                  'Sparkles',        'Maquilleurs professionnels pour vos évènements.', 2),
  ('fleuristes',           'Fleuristes',                  'Flower2',         'Compositions et scénographies florales sur mesure.', 3),
  ('photographes',         'Photographes',                'Camera',          'Reportages photo élégants et intemporels.', 4),
  ('videastes',            'Vidéastes',                   'Video',           'Films d''évènement cinématographiques.', 5),
  ('traiteurs',            'Traiteurs',                   'UtensilsCrossed', 'Gastronomie et service premium.', 6),
  ('wedding-planners',     'Wedding planners',            'ClipboardList',   'Organisation complète de A à Z.', 7),
  ('decoration',           'Décoration',                  'Palette',         'Décorateurs et scénographes d''exception.', 8),
  ('lieux-de-reception',   'Lieux de réception',          'Building2',       'Domaines, châteaux et lieux d''exception.', 9),
  ('dj-musique',           'DJ & musique',                'Disc3',           'DJ, groupes et ambiances sonores premium.', 10),
  ('patisserie',           'Pâtisserie & wedding cake',   'CakeSlice',       'Wedding cakes et créations sucrées.', 11),
  ('son-lumiere',          'Son & lumière',               'Lightbulb',       'Mise en lumière et sonorisation événementielle.', 12)
on conflict (slug) do nothing;

-- ---------------- SETTINGS ----------------
update public.commission_settings set rate = 12.00, deposit_percent = 30 where id = 1;
insert into public.admin_settings (key, value) values
  ('homepage', '{"featured_limit": 6}'),
  ('branding', '{"primary": "#3A1633", "accent": "#D8B47A"}')
on conflict (key) do nothing;

-- ---------------- DEMO AUTH USERS ----------------
-- Fixed UUIDs so the seed is idempotent. Passwords are placeholders; use the
-- "Forgot password" flow or Supabase dashboard to set a real one for demos.
-- (Inserting into auth.users is allowed from the SQL editor / service role.)
insert into auth.users (id, instance_id, aud, role, email, encrypted_password,
                        email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
values
  ('00000000-0000-0000-0000-0000000000c1', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
   'client.demo@lystra.app', crypt('lystra-demo', gen_salt('bf')), now(),
   '{"provider":"email","providers":["email"]}', '{"full_name":"Camille Client","role":"client"}', now(), now()),
  ('00000000-0000-0000-0000-0000000000a1', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
   'vendor.demo@lystra.app', crypt('lystra-demo', gen_salt('bf')), now(),
   '{"provider":"email","providers":["email"]}', '{"full_name":"Atelier Roselia","role":"vendor"}', now(), now())
on conflict (id) do nothing;

-- ensure roles on the auto-created profiles
update public.profiles set role = 'vendor', full_name = 'Atelier Roselia', city = 'Paris'
  where id = '00000000-0000-0000-0000-0000000000a1';
update public.profiles set role = 'client', full_name = 'Camille Client', city = 'Paris',
  event_type = 'Mariage', budget = 12000 where id = '00000000-0000-0000-0000-0000000000c1';

-- ---------------- DEMO VENDORS ----------------
with cat as (select id, slug from public.categories)
insert into public.vendors
  (id, user_id, business_name, slug, tagline, description, category_id, city, starting_price,
   average_rating, reviews_count, is_verified, is_featured, is_elite, is_published, home_service, response_time, cover_url)
select * from (values
  ('00000000-0000-0000-0000-00000000d001'::uuid, '00000000-0000-0000-0000-0000000000a1'::uuid,
   'Atelier Roselia', 'atelier-roselia', 'Fleuriste événementiel — l''art floral comme signature',
   'Atelier floral parisien dédié aux mariages et événements d''exception.',
   (select id from cat where slug='fleuristes'), 'Paris', 1200, 4.9, 87, true, true, true, true, true, '< 2h',
   'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80'),

  ('00000000-0000-0000-0000-00000000d002'::uuid, '00000000-0000-0000-0000-0000000000a1'::uuid,
   'Lumière Studio', 'lumiere-studio', 'Photographie d''événement — la lumière, toujours',
   'Photographes d''événement basés à Bordeaux. Approche éditoriale et naturelle.',
   (select id from cat where slug='photographes'), 'Bordeaux', 1500, 4.9, 132, true, true, false, true, false, '< 1h',
   'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=1200&q=80'),

  ('00000000-0000-0000-0000-00000000d003'::uuid, '00000000-0000-0000-0000-0000000000a1'::uuid,
   'Éclat Traiteur', 'eclat-traiteur', 'Traiteur premium — la table comme spectacle',
   'Maison traiteur marseillaise, cuisine méditerranéenne raffinée.',
   (select id from cat where slug='traiteurs'), 'Marseille', 75, 4.8, 98, true, true, true, true, false, '< 2h',
   'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80')
) as v
on conflict (id) do nothing;

-- services for Atelier Roselia
insert into public.vendor_services (vendor_id, title, description, price, price_unit, is_pack, sort_order) values
  ('00000000-0000-0000-0000-00000000d001', 'Décor floral cérémonie', 'Arche, allée et compositions d''autel.', 1200, 'forfait', true, 1),
  ('00000000-0000-0000-0000-00000000d001', 'Centres de table (x10)', 'Compositions de saison, vases inclus.', 850, 'forfait', false, 2),
  ('00000000-0000-0000-0000-00000000d001', 'Bouquet de mariée + boutonnière', null, 220, 'forfait', false, 3)
on conflict do nothing;

-- a couple of published reviews (will auto-update vendor rating via trigger)
insert into public.reviews (vendor_id, client_id, rating, quality, communication, punctuality, value, comment, status) values
  ('00000000-0000-0000-0000-00000000d001', '00000000-0000-0000-0000-0000000000c1', 5, 5, 5, 5, 4,
   'Roselia a transformé notre domaine en jardin de rêve. Chaque détail était pensé.', 'published')
on conflict do nothing;
