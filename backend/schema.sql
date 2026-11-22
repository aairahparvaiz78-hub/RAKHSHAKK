<<<<<<< HEAD
-- Run this in the Supabase SQL Editor to create Rakshak's cloud tables.
-- The local Node.js backend uses a server-side secret key only. Do not put that
-- key in browser JavaScript. Keep RLS enabled and do not add public write rules.
=======
-- Run this in the Supabase SQL Editor to create Rakhshak's cloud tables.
-- The local Node.js backend and Vercel functions use a server-side secret key.
-- Do not put that key in browser JavaScript. Keep RLS enabled and do not add
-- public write rules.
>>>>>>> c6fb400426897a8e758b31e8f6b9f88e8ec9a94a

create table if not exists public.Rakshak_app_state (
  state_key text primary key,
  payload jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.Rakshak_observations (
  id text primary key,
  village_id text not null,
  village_name text not null,
  observed_at timestamptz not null,
  rainfall_6h_mm double precision not null check (rainfall_6h_mm between 0 and 1000),
  rainfall_24h_mm double precision not null check (rainfall_24h_mm between 0 and 3000),
  river_level_cm double precision not null check (river_level_cm between 0 and 100000),
  river_rise_cm_hr double precision not null check (river_rise_cm_hr between -100 and 100),
  soil_saturation_pct double precision not null check (soil_saturation_pct between 0 and 100),
  source text not null,
  is_simulated boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists Rakshak_observations_village_time
  on public.Rakshak_observations(village_id, observed_at desc);

create table if not exists public.Rakshak_forecasts (
  id text primary key,
  village_id text not null,
  village_name text not null,
  generated_at timestamptz not null,
  horizons jsonb not null,
  confidence text not null,
  source text not null,
  is_simulated boolean not null,
  model_version text not null
);
create index if not exists Rakshak_forecasts_village_time
  on public.Rakshak_forecasts(village_id, generated_at desc);

alter table public.Rakshak_app_state enable row level security;
alter table public.Rakshak_observations enable row level security;
alter table public.Rakshak_forecasts enable row level security;

-- No anon policies are created. Both backends use the server-side Supabase
-- secret key; the local server binds only to 127.0.0.1.
