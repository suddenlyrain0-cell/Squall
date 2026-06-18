import Image from "next/image";
import { CommunityPostTabs } from "@/features/community/community-post-tabs";
import { CommunitySidebar } from "@/features/community/community-sidebar";

export default function CommunityPage() {
  return (
    <main className="bg-white text-[#111111]">
      <div className="mx-auto grid max-w-7xl gap-7 px-4 py-8 sm:px-5 lg:grid-cols-[190px_1fr] lg:px-8 lg:py-12">
        <CommunitySidebar />
        <section>
          <div className="relative mb-8 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-900 shadow-sm">
            <Image
              src="/SQUALLHero.png"
              alt=""
              fill
              priority
              className="object-contain object-center md:object-cover"
              sizes="(min-width: 1024px) 900px, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/[0.62] via-black/[0.3] to-black/[0.08]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/[0.78] via-black/[0.36] to-black/[0.06]" />

            <div className="relative flex min-h-[240px] flex-col justify-end gap-4 p-5 sm:min-h-[220px] sm:p-6 md:min-h-[190px] md:flex-row md:items-end md:justify-between">
              <div className="flex min-w-0 items-center gap-4 sm:gap-5">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-black shadow-[0_12px_30px_rgba(0,0,0,0.3)] ring-1 ring-white/20 sm:h-20 sm:w-20">
                  <Image src="/VikingDefense600.png" alt="Viking Defense" fill className="object-cover" sizes="80px" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-2xl font-black text-white sm:text-3xl">바이킹 디펜스</h1>
                  <p className="mt-1.5 max-w-md text-sm font-medium leading-6 text-white">
                    공략을 공유하고, 버그를 제보하고, 개발팀과 함께 게임을 다듬는 공간입니다.
                  </p>
                </div>
              </div>

            </div>
          </div>

          <CommunityPostTabs />
        </section>
      </div>
    </main>
  );
}
