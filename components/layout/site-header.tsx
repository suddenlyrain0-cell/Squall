"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, LogOut, Menu, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { mainNav } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { notices, posts, updateNotes } from "@/services/mock-data";
import { useAuth } from "@/features/auth/auth-provider";

export function SiteHeader() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const isLoggedIn = !!user;
  const userLabel = user?.email?.split("@")[0] ?? "Squaller";
  const userInitials = userLabel.slice(0, 2).toUpperCase();
  const loginHref = "/login";
  const trimmedSearch = search.trim().toLowerCase();
  const searchResults = useMemo(() => {
    if (!trimmedSearch) {
      return [];
    }

    const postResults = posts.map((post) => ({
      key: post.id,
      type: post.tag,
      title: post.title,
      description: post.excerpt,
      href: `/post/${post.id}`,
      searchable: [post.title, post.excerpt, post.author, post.tag].join(" ")
    }));
    const noticeResults = notices.map((notice) => ({
      key: notice.id,
      type: "공지",
      title: notice.title,
      description: notice.excerpt,
      href: "/notice",
      searchable: [notice.title, notice.excerpt, notice.type].join(" ")
    }));
    const updateResults = updateNotes.map((note) => ({
      key: note.version,
      type: "업데이트",
      title: note.version,
      description: note.summary,
      href: "/update",
      searchable: [note.version, note.summary, note.items.join(" ")].join(" ")
    }));

    return [...postResults, ...noticeResults, ...updateResults]
      .filter((item) => item.searchable.toLowerCase().includes(trimmedSearch))
      .slice(0, 5);
  }, [trimmedSearch]);

  return (
    <header className="sticky top-0 z-50 bg-[#0f0f0f]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <div className="flex items-center gap-10 lg:gap-14">
          <Logo />

          <nav className="hidden items-center gap-8 md:flex lg:gap-10">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-semibold text-zinc-500 transition hover:text-white lg:text-base",
                  pathname === item.href && "text-white"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <form
            className="relative"
            role="search"
            onSubmit={(event) => event.preventDefault()}
          >
            <label className="group flex h-10 w-[230px] items-center gap-2.5 rounded-full border border-zinc-700 bg-[#121212] px-4 text-zinc-500 transition focus-within:border-zinc-300 focus-within:bg-[#171717] lg:w-[280px]">
              <input
                className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-white outline-none placeholder:text-zinc-500"
                placeholder="게시물 검색"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    setSearchOpen(false);
                    event.currentTarget.blur();
                  }
                }}
              />
              <Search className="h-5 w-5 shrink-0 text-zinc-500 transition group-focus-within:text-white" />
            </label>
            {searchOpen && trimmedSearch ? (
              <div className="absolute right-0 top-12 w-[300px] overflow-hidden rounded-2xl border border-white/10 bg-[#171717] p-2 shadow-2xl ring-1 ring-black/30">
                {searchResults.length > 0 ? (
                  <div className="grid gap-1">
                    {searchResults.map((item) => (
                      <Link
                        key={`${item.type}-${item.key}`}
                        href={item.href}
                        className="block rounded-xl px-4 py-3 transition hover:bg-white/8"
                        onClick={() => setSearchOpen(false)}
                      >
                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-primary/16 px-2.5 py-1 text-xs font-black text-primary">{item.type}</span>
                          <p className="truncate text-sm font-black text-white">{item.title}</p>
                        </div>
                        <p className="mt-2 line-clamp-1 text-xs font-semibold text-white/48">{item.description}</p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="px-4 py-5 text-sm font-bold text-white/48">검색 결과가 없습니다.</p>
                )}
              </div>
            ) : null}
          </form>
          {isLoggedIn ? (
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] py-1 pl-1 pr-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-black text-[#111111]">
                {userInitials}
              </span>
              <span className="max-w-28 truncate text-sm font-bold">{userLabel}</span>
              <Bell className="h-4 w-4 text-white/60" />
              <button
                type="button"
                className="rounded-full p-1 text-white/60 transition hover:bg-white/10 hover:text-white"
                aria-label="Logout"
                onClick={() => void signOut()}
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Button
              asChild
              className="h-9 rounded-full bg-[#F34818] px-5 text-sm font-semibold text-white shadow-none hover:-translate-y-0 hover:bg-[#ff5a2a]"
            >
              <Link href={loginHref}>Login</Link>
            </Button>
          )}
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <Button asChild variant="ghost" size="icon">
            <Link href="/search" aria-label="Search">
              <Search className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/55"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute right-0 top-0 flex h-full w-[84vw] max-w-sm flex-col bg-[#0f0f0f] px-6 py-6 shadow-2xl">
            <div className="mb-8 flex items-center justify-between">
              <Logo />
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="grid gap-3">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-xl px-4 py-3 text-base font-semibold text-zinc-500 transition hover:bg-white/8 hover:text-white",
                    pathname === item.href && "text-white"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              {isLoggedIn ? (
                <div className="mt-3 grid gap-3 rounded-xl border border-white/10 bg-white/[0.08] p-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-black text-[#111111]">
                      {userInitials}
                    </span>
                    <span className="min-w-0 truncate text-sm font-bold text-white">{userLabel}</span>
                  </div>
                  <Button
                    variant="secondary"
                    className="h-10 w-full rounded-full"
                    onClick={() => {
                      setOpen(false);
                      void signOut();
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button
                  asChild
                  className="mt-3 h-10 w-full rounded-full bg-[#F34818] text-sm font-semibold text-white shadow-none hover:-translate-y-0 hover:bg-[#ff5a2a]"
                >
                  <Link href={loginHref} onClick={() => setOpen(false)}>
                    Login
                  </Link>
                </Button>
              )}
            </div>
          </aside>
        </div>
      ) : null}
    </header>
  );
}
