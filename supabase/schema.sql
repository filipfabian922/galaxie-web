-- =====================================================================
--  Zastavárna Galaxie – databáze pro admin portál
--  Spusť celý tento skript jednou v Supabase: SQL Editor → New query → Run
--  Skript je bezpečné pustit i opakovaně.
-- =====================================================================

-- 1) Kdo smí web upravovat (jediný e-mail administrátora)
create table if not exists public.admins (email text primary key);
insert into public.admins (email) values ('peterfabian@email.cz') on conflict do nothing;
alter table public.admins enable row level security;   -- bez politik = nikdo přes API nevidí

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins where lower(email) = lower(coalesce(auth.jwt() ->> 'email','')));
$$;

-- 2) Obsah webu (texty, kontakty, oznámení, odkazy na fotky)
create table if not exists public.site_content (
  key text primary key,
  value jsonb,
  updated_at timestamptz not null default now()
);
alter table public.site_content enable row level security;
drop policy if exists "content_read"  on public.site_content;
drop policy if exists "content_write" on public.site_content;
create policy "content_read"  on public.site_content for select using (true);
create policy "content_write" on public.site_content for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- 3) Anonymní statistika návštěv
create table if not exists public.page_views (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  path text not null check (char_length(path) <= 200),
  referrer text check (char_length(referrer) <= 120),
  device text check (char_length(device) <= 20),
  sid text check (char_length(sid) <= 20)
);
create index if not exists page_views_created_idx on public.page_views (created_at desc);
alter table public.page_views enable row level security;
drop policy if exists "views_insert" on public.page_views;
drop policy if exists "views_read"   on public.page_views;
create policy "views_insert" on public.page_views for insert to anon, authenticated with check (true);
create policy "views_read"   on public.page_views for select to authenticated using (public.is_admin());

-- 4) Souhrn statistik pro admin (agregace v databázi)
create or replace function public.admin_stats(days int default 30) returns json
language plpgsql stable security definer set search_path = public as $$
declare since timestamptz := now() - make_interval(days => greatest(days,1));
begin
  if not public.is_admin() then raise exception 'forbidden'; end if;
  return json_build_object(
    'totals', (select json_build_object('views', count(*), 'visitors', count(distinct sid)) from page_views where created_at >= since),
    'today',  (select json_build_object('views', count(*), 'visitors', count(distinct sid)) from page_views where (created_at at time zone 'Europe/Prague')::date = (now() at time zone 'Europe/Prague')::date),
    'daily',  (select coalesce(json_agg(r order by r.d), '[]'::json) from (
                 select (created_at at time zone 'Europe/Prague')::date as d, count(*) as views, count(distinct sid) as visitors
                 from page_views where created_at >= since group by 1) r),
    'pages',  (select coalesce(json_agg(r), '[]'::json) from (
                 select path, count(*) as views from page_views where created_at >= since group by path order by count(*) desc limit 8) r),
    'referrers', (select coalesce(json_agg(r), '[]'::json) from (
                 select coalesce(nullif(referrer,''),'přímý vstup / neznámé') as name, count(*) as views from page_views where created_at >= since group by 1 order by count(*) desc limit 8) r),
    'devices',(select coalesce(json_agg(r), '[]'::json) from (
                 select coalesce(device,'?') as name, count(*) as views from page_views where created_at >= since group by 1 order by count(*) desc) r)
  );
end $$;
revoke all on function public.admin_stats(int) from public, anon;
grant execute on function public.admin_stats(int) to authenticated;

-- 5) Úložiště fotek (veřejné čtení, nahrávat smí jen admin)
insert into storage.buckets (id, name, public) values ('site-images', 'site-images', true) on conflict (id) do update set public = true;
drop policy if exists "img_read"   on storage.objects;
drop policy if exists "img_insert" on storage.objects;
drop policy if exists "img_update" on storage.objects;
drop policy if exists "img_delete" on storage.objects;
create policy "img_read"   on storage.objects for select using (bucket_id = 'site-images');
create policy "img_insert" on storage.objects for insert to authenticated with check (bucket_id = 'site-images' and public.is_admin());
create policy "img_update" on storage.objects for update to authenticated using (bucket_id = 'site-images' and public.is_admin());
create policy "img_delete" on storage.objects for delete to authenticated using (bucket_id = 'site-images' and public.is_admin());

-- 6) Skrytá stránka zaměstnanců: tajná adresa (slug) a obsah leží v databázi, ne v kódu webu.
--    Veřejnost smí jen zavolat staff_get(slug) – obsah dostane, jen když slug přesně sedí.
create table if not exists public.staff_page (
  id int primary key default 1 check (id = 1),
  slug text not null,
  title text not null default 'Zaměstnanci',
  body text not null default 'Obsah doplníme.',
  updated_at timestamptz not null default now()
);
alter table public.staff_page enable row level security;
drop policy if exists "staff_admin" on public.staff_page;
create policy "staff_admin" on public.staff_page for all to authenticated using (public.is_admin()) with check (public.is_admin());
insert into public.staff_page (id, slug) values (1, substr(replace(gen_random_uuid()::text, '-', ''), 1, 20)) on conflict do nothing;

create or replace function public.staff_get(p_slug text) returns json
language sql stable security definer set search_path = public as $$
  select json_build_object('title', title, 'body', body) from public.staff_page where id = 1 and slug = p_slug;
$$;
grant execute on function public.staff_get(text) to anon, authenticated;
