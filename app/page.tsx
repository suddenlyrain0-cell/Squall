import { MessageSquare, Radio, ThumbsUp, Wrench } from "lucide-react";
import { AnimatedHero } from "@/features/community/animated-hero";
import { EventCard } from "@/features/event/event-card";
import { NoticeCard } from "@/features/notice/notice-card";
import { PostCard } from "@/features/community/post-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { events, notices, posts } from "@/services/mock-data";

export default function HomePage() {
  return (
    <main>
      <AnimatedHero />

      <div className="bg-white text-[#111111]">
        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <SectionHeading
            eyebrow="Latest Notice"
            title="공식 소식이 먼저 도착하는 곳"
            description="업데이트, 이벤트, 점검 공지를 커뮤니티 흐름 안에서 바로 확인하세요."
            href="/notice"
            theme="light"
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {notices.map((notice) => (
              <NoticeCard key={notice.id} notice={notice} theme="light" />
            ))}
          </div>
        </section>

        <section className="bg-zinc-50 py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="Popular Posts"
              title="지금 플레이어들이 이야기하는 것"
              description="공략, 피드백, 버그 제보, 팬아트가 공식 허브 안에서 함께 순환합니다."
              href="/community"
              theme="light"
            />
            <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="grid gap-4">
                {posts.slice(0, 3).map((post) => (
                  <PostCard key={post.id} post={post} theme="light" />
                ))}
              </div>
              <Card className="border-zinc-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-2xl font-black text-[#111111]">Live Pulse</h3>
                  <Radio className="h-5 w-5 text-primary" />
                </div>
                <div className="grid gap-5">
                  {[
                    ["새 댓글", "148", MessageSquare],
                    ["오늘 추천", "392", ThumbsUp],
                    ["버그 제보 처리", "17", Wrench]
                  ].map(([label, value, Icon]) => (
                    <div key={label as string} className="flex items-center justify-between rounded-xl bg-zinc-100 p-4">
                      <span className="inline-flex items-center gap-3 text-sm font-bold text-zinc-600">
                        <Icon className="h-5 w-5 text-primary" />
                        {label as string}
                      </span>
                      <strong className="text-3xl font-black text-[#111111]">{value as string}</strong>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-5 py-20 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div>
            <SectionHeading eyebrow="Recent Posts" title="최신 게시글" href="/community" theme="light" />
            <div className="grid gap-4">
              {posts.slice(2).map((post) => (
                <PostCard key={post.id} post={post} compact theme="light" />
              ))}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Developer Notes" title="최근 개발일지" theme="light" />
            <Card className="border-zinc-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-primary">Dev Log 06</p>
              <h3 className="mt-4 text-3xl font-black leading-tight text-[#111111]">플레이어 피드백이 다음 빌드를 바꾸는 방식</h3>
              <p className="mt-4 leading-7 text-zinc-600">
                이번 주에는 전투 리듬, 초반 성장 압박, 보스 충돌 판정에 대한 커뮤니티 의견을 중심으로 수정 범위를 정리했습니다.
              </p>
              <div className="mt-7 grid gap-3">
                <Skeleton className="h-3 w-full bg-zinc-200" />
                <Skeleton className="h-3 w-10/12 bg-zinc-200" />
                <Skeleton className="h-3 w-8/12 bg-zinc-200" />
              </div>
            </Card>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
          <SectionHeading eyebrow="Event" title="진행 중 이벤트" href="/event" theme="light" />
          <div className="grid gap-5 md:grid-cols-2">
            {events.slice(0, 2).map((event) => (
              <EventCard key={event.id} event={event} theme="light" />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
