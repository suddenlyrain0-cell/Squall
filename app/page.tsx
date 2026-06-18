import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MobileCommunityRedirect } from "@/app/mobile-community-redirect";
import { AnimatedHero } from "@/features/community/animated-hero";
import { notices } from "@/services/mock-data";

export default function HomePage() {
  return (
    <main>
      <MobileCommunityRedirect />
      <AnimatedHero />

      <div className="bg-white text-[#111111]">
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="mb-5 flex items-end justify-between border-b border-zinc-200 pb-3">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">Community</p>
              <h2 className="text-2xl font-black text-[#111111]">커뮤니티</h2>
            </div>
            <Link href="/community" className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 transition hover:text-primary">
              커뮤니티로 이동
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="overflow-hidden border-y border-zinc-200 bg-white">
            {notices.map((notice) => (
              <Link
                key={notice.id}
                href="/community"
                className="grid grid-cols-[minmax(0,1fr)_96px_104px] items-center gap-4 border-b border-zinc-200 px-3 py-3 transition hover:bg-zinc-50 max-md:grid-cols-1"
              >
                <div className="min-w-0">
                  <h3 className="truncate text-base font-medium text-zinc-900">{notice.title}</h3>
                  <p className="mt-1 truncate text-xs text-zinc-500">{notice.excerpt}</p>
                </div>
                <span className="text-center text-xs font-normal text-primary max-md:text-left">
                  {notice.type === "general"
                    ? "공지"
                    : notice.type === "maintenance"
                      ? "점검"
                      : notice.type === "event"
                        ? "이벤트"
                        : "업데이트"}
                </span>
                <time className="whitespace-nowrap text-center text-xs font-normal text-zinc-500 max-md:text-left">{notice.date}</time>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
