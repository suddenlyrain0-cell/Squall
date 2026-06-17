import Link from "next/link";
import { Github, MessageCircle } from "lucide-react";
import { Logo } from "@/components/layout/logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0d0d0d]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-md text-sm leading-6 text-white/52">
            SQUALL Community Hub connects players, updates, events, and developer stories in one official place.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm font-bold text-white/64">
          <Link href="#" className="inline-flex items-center gap-2 transition hover:text-primary">
            <Github className="h-4 w-4" />
            Github
          </Link>
          <Link href="#" className="inline-flex items-center gap-2 transition hover:text-primary">
            <MessageCircle className="h-4 w-4" />
            Discord
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs font-bold uppercase tracking-[0.16em] text-white/38">
        Copyright 2026 SQUALL. All rights reserved.
      </div>
    </footer>
  );
}
