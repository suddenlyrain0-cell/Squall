create table if not exists public.community_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references auth.users(id) on delete cascade,
  author_name text not null default 'Squaller',
  title text not null check (char_length(trim(title)) between 2 and 120),
  category text not null check (
    category in ('free', 'guide', 'question', 'bug', 'suggestion', 'fanart')
  ),
  content text not null check (char_length(trim(content)) between 1 and 20000),
  tags text[] not null default '{}',
  excerpt text not null default '',
  views integer not null default 0 check (views >= 0),
  comments_count integer not null default 0 check (comments_count >= 0),
  likes_count integer not null default 0 check (likes_count >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists community_posts_created_at_idx
  on public.community_posts (created_at desc);

create index if not exists community_posts_author_id_idx
  on public.community_posts (author_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_community_posts_updated_at on public.community_posts;

create trigger set_community_posts_updated_at
before update on public.community_posts
for each row
execute function public.set_updated_at();

alter table public.community_posts enable row level security;

drop policy if exists "Anyone can read community posts" on public.community_posts;
drop policy if exists "Authenticated users can create posts" on public.community_posts;
drop policy if exists "Authors can update posts" on public.community_posts;
drop policy if exists "Authors can delete posts" on public.community_posts;

create policy "Anyone can read community posts"
on public.community_posts
for select
using (true);

create policy "Authenticated users can create posts"
on public.community_posts
for insert
to authenticated
with check ((select auth.uid()) = author_id);

create policy "Authors can update posts"
on public.community_posts
for update
to authenticated
using ((select auth.uid()) = author_id)
with check ((select auth.uid()) = author_id);

create policy "Authors can delete posts"
on public.community_posts
for delete
to authenticated
using ((select auth.uid()) = author_id);
