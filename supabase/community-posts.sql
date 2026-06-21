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

create or replace function public.increment_community_post_view(target_post_id uuid)
returns table (views integer)
language plpgsql
security definer
set search_path = public
as $$
begin
  return query
  update public.community_posts
  set views = community_posts.views + 1
  where id = target_post_id
  returning community_posts.views;
end;
$$;

grant execute on function public.increment_community_post_view(uuid) to anon, authenticated;

create table if not exists public.community_post_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.community_posts(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete cascade,
  author_name text not null default 'Squaller',
  content text not null check (char_length(trim(content)) between 1 and 2000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists community_post_comments_post_id_created_at_idx
  on public.community_post_comments (post_id, created_at asc);

create index if not exists community_post_comments_author_id_idx
  on public.community_post_comments (author_id);

drop trigger if exists set_community_post_comments_updated_at on public.community_post_comments;

create trigger set_community_post_comments_updated_at
before update on public.community_post_comments
for each row
execute function public.set_updated_at();

create or replace function public.refresh_community_post_comment_count()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    update public.community_posts
    set comments_count = comments_count + 1
    where id = new.post_id;
    return new;
  end if;

  if tg_op = 'DELETE' then
    update public.community_posts
    set comments_count = greatest(comments_count - 1, 0)
    where id = old.post_id;
    return old;
  end if;

  if new.post_id <> old.post_id then
    update public.community_posts
    set comments_count = greatest(comments_count - 1, 0)
    where id = old.post_id;

    update public.community_posts
    set comments_count = comments_count + 1
    where id = new.post_id;
  end if;

  return new;
end;
$$;

drop trigger if exists refresh_community_post_comment_count_on_insert on public.community_post_comments;
drop trigger if exists refresh_community_post_comment_count_on_delete on public.community_post_comments;
drop trigger if exists refresh_community_post_comment_count_on_update on public.community_post_comments;

create trigger refresh_community_post_comment_count_on_insert
after insert on public.community_post_comments
for each row
execute function public.refresh_community_post_comment_count();

create trigger refresh_community_post_comment_count_on_delete
after delete on public.community_post_comments
for each row
execute function public.refresh_community_post_comment_count();

create trigger refresh_community_post_comment_count_on_update
after update of post_id on public.community_post_comments
for each row
execute function public.refresh_community_post_comment_count();

alter table public.community_post_comments enable row level security;

drop policy if exists "Anyone can read community post comments" on public.community_post_comments;
drop policy if exists "Authenticated users can create comments" on public.community_post_comments;
drop policy if exists "Authors can update comments" on public.community_post_comments;
drop policy if exists "Authors can delete comments" on public.community_post_comments;

create policy "Anyone can read community post comments"
on public.community_post_comments
for select
using (true);

create policy "Authenticated users can create comments"
on public.community_post_comments
for insert
to authenticated
with check ((select auth.uid()) = author_id);

create policy "Authors can update comments"
on public.community_post_comments
for update
to authenticated
using ((select auth.uid()) = author_id)
with check ((select auth.uid()) = author_id);

create policy "Authors can delete comments"
on public.community_post_comments
for delete
to authenticated
using ((select auth.uid()) = author_id);
