import { Logo } from "@/components/layout/logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0d0d0d]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 lg:px-8">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-md text-sm leading-6 text-zinc-500">
            SQUALL Community Hub connects players, updates, events, and developer stories in one official place.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs font-bold uppercase tracking-[0.16em] text-zinc-600">
        Copyright 2026 SQUALL. All rights reserved.
      </div>
    </footer>
  );
}
