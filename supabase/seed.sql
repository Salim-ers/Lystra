-- =====================================================================
-- Lystra — seed.sql   (run after migrations: supabase db execute --file supabase/seed.sql)
-- Demo data: categories, commission settings, demo client + vendor, and
-- a few published vendor profiles so the marketplace works DB-backed.
-- =====================================================================

-- ---------------- CATEGORIES ----------------
-- Métiers GÉNÉRIQUES (jamais enfermés dans "mariage"). Le type d'événement est un filtre séparé.
insert into public.categories (slug, name, icon, description, sort_order) values
  ('coiffeur',             'Coiffeur / Coiffeuse',        'Scissors',        'Coiffure pour tous vos moments d''exception.', 1),
  ('maquilleur',           'Maquilleur / Maquilleuse',    'Sparkles',        'Mise en beauté longue tenue, à domicile ou en studio.', 2),
  ('estheticienne',        'Esthéticienne',               'Gem',             'Soins et préparation beauté avant l''événement.', 3),
  ('photographe',          'Photographe',                 'Camera',          'Reportages photo élégants et intemporels.', 4),
  ('videaste',             'Vidéaste',                    'Video',           'Films d''événement cinématographiques.', 5),
  ('content-creator',      'Content creator événementiel','Clapperboard',    'Reels et contenus social media pour vos événements.', 6),
  ('fleuriste',            'Fleuriste',                   'Flower2',         'Compositions et scénographies florales sur mesure.', 7),
  ('decorateur',           'Décorateur événementiel',     'Palette',         'Décorateurs et scénographes d''exception.', 8),
  ('traiteur',             'Traiteur',                    'UtensilsCrossed', 'Gastronomie et service premium.', 9),
  ('chef-prive',           'Chef privé',                  'ChefHat',         'Dîners privés et expériences gastronomiques.', 10),
  ('patissier',            'Pâtissier',                   'CakeSlice',       'Pièces montées, layer cakes et desserts signatures.', 11),
  ('dj',                   'DJ',                          'Disc3',           'DJ, sets et ambiances sonores premium.', 12),
  ('lieu-evenementiel',    'Lieu de réception',           'Building2',       'Domaines, villas, rooftops et lieux atypiques.', 13),
  ('wedding-planner',      'Wedding planner',             'ClipboardList',   'Organisation complète de A à Z.', 14)
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
   'Atelier Roselia', 'atelier-roselia', 'Fleuriste — l''art floral comme signature',
   'Atelier floral parisien pour vos moments d''exception, de la cérémonie au dîner.',
   (select id from cat where slug='fleuriste'), 'Paris', 1200, 4.9, 87, true, true, true, true, true, '< 2h',
   'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80'),

  ('00000000-0000-0000-0000-00000000d002'::uuid, '00000000-0000-0000-0000-0000000000a1'::uuid,
   'Lumière Studio', 'lumiere-studio', 'Photographie d''événement — la lumière, toujours',
   'Photographes d''événement basés à Bordeaux. Approche éditoriale et naturelle.',
   (select id from cat where slug='photographe'), 'Bordeaux', 1500, 4.9, 132, true, true, false, true, false, '< 1h',
   'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=1200&q=80'),

  ('00000000-0000-0000-0000-00000000d003'::uuid, '00000000-0000-0000-0000-0000000000a1'::uuid,
   'Éclat Traiteur', 'eclat-traiteur', 'Traiteur premium — la table comme spectacle',
   'Maison traiteur marseillaise, cuisine méditerranéenne raffinée.',
   (select id from cat where slug='traiteur'), 'Marseille', 75, 4.8, 98, true, true, true, true, false, '< 2h',
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
