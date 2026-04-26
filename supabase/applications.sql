create extension if not exists pgcrypto;

create table if not exists public.driver_applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(trim(full_name)) >= 3),
  phone text not null check (char_length(trim(phone)) >= 8),
  vehicle_type text not null check (vehicle_type in ('motorcycle', 'bicycle', 'car')),
  status text not null default 'pending' check (status in ('pending', 'reviewing', 'approved', 'rejected')),
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.vendor_applications (
  id uuid primary key default gen_random_uuid(),
  
  business_name text not null check (char_length(trim(business_name)) >= 2),
  phone text not null check (char_length(trim(phone)) >= 8),
  business_type text not null check (business_type in ('restaurant', 'supermarket', 'pharmacy', 'other')),
  status text not null default 'pending' check (status in ('pending', 'reviewing', 'approved', 'rejected')),
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists driver_applications_created_at_idx
  on public.driver_applications (created_at desc);

create index if not exists vendor_applications_created_at_idx
  on public.vendor_applications (created_at desc);

alter table public.driver_applications enable row level security;
alter table public.vendor_applications enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    auth.jwt() ->> 'role' = 'service_role'
    or (auth.jwt() -> 'app_metadata' -> 'roles') @> '["admin"]'::jsonb,
    false
  );
$$;

grant insert on public.driver_applications to anon;
grant insert on public.vendor_applications to anon;
grant select on public.driver_applications to authenticated;
grant select on public.vendor_applications to authenticated;
grant execute on function public.is_admin() to authenticated;

drop policy if exists driver_applications_insert_public on public.driver_applications;
create policy driver_applications_insert_public
on public.driver_applications
for insert
to anon
with check (true);

drop policy if exists driver_applications_select_admin on public.driver_applications;
create policy driver_applications_select_admin
on public.driver_applications
for select
to authenticated
using (public.is_admin());

drop policy if exists vendor_applications_insert_public on public.vendor_applications;
create policy vendor_applications_insert_public
on public.vendor_applications
for insert
to anon
with check (true);

drop policy if exists vendor_applications_select_admin on public.vendor_applications;
create policy vendor_applications_select_admin
on public.vendor_applications
for select
to authenticated
using (public.is_admin());

drop view if exists public.admin_website_form_submissions;
create view public.admin_website_form_submissions
with (security_invoker = true)
as
select
  d.id,
  'driver'::text as form_type,
  d.full_name as primary_name,
  d.phone,
  d.vehicle_type as category,
  d.status,
  d.created_at,
  d.full_name,
  d.vehicle_type,
  null::text as business_name,
  null::text as business_type
from public.driver_applications d
union all
select
  v.id,
  'vendor'::text as form_type,
  v.business_name as primary_name,
  v.phone,
  v.business_type as category,
  v.status,
  v.created_at,
  null::text as full_name,
  null::text as vehicle_type,
  v.business_name,
  v.business_type
from public.vendor_applications v;

grant select on public.admin_website_form_submissions to authenticated;
