"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, LogIn, Menu, Search, UserRound, X } from "lucide-react";
import { useState } from "react";
import { mainNav } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isLoggedIn = false;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#111111]/82 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-2 md:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-bold text-white/62 transition hover:bg-white/8 hover:text-white",
                pathname === item.href && "bg-primary text-[#111111] hover:bg-primary hover:text-[#111111]"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="ghost" size="icon">
            <Link href="/search" aria-label="Search">
              <Search className="h-5 w-5" />
            </Link>
          </Button>
          {isLoggedIn ? (
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/8 py-1 pl-1 pr-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-black text-[#111111]">
                SQ
              </span>
              <span className="text-sm font-bold">Squaller</span>
              <Bell className="h-4 w-4 text-white/58" />
            </div>
          ) : (
            <Button variant="secondary">
              <LogIn className="h-4 w-4" />
              Login
            </Button>
          )}
        </div>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen((value) => !value)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-[#111111] px-5 py-5 md:hidden">
          <div className="grid gap-2">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-bold text-white/76 hover:bg-white/8"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/search" onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-base font-bold text-white/76 hover:bg-white/8">
              Search
            </Link>
            <Button className="mt-3 w-full">
              <UserRound className="h-4 w-4" />
              Login
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
