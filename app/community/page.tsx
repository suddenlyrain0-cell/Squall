import { Filter, Pencil, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CommunitySidebar } from "@/features/community/community-sidebar";
import { PostCard } from "@/features/community/post-card";
import { posts } from "@/services/mock-data";

export default function CommunityPage() {
  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-5 py-12 lg:grid-cols-[260px_1fr] lg:px-8">
      <CommunitySidebar />
      <section>
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-primary">Community</p>
            <h1 className="mt-3 text-4xl font-black text-white md:text-6xl">플레이어 허브</h1>
            <p className="mt-3 max-w-2xl leading-7 text-white/60">공략을 공유하고, 버그를 제보하고, 개발팀과 함께 게임을 다듬는 공간입니다.</p>
          </div>
          <Button asChild>
            <Link href="/community/write">
              <Pencil className="h-4 w-4" />
              글쓰기
            </Link>
          </Button>
        </div>

        <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3 md:flex-row">
          <label className="flex min-h-12 flex-1 items-center gap-3 rounded-xl bg-[#111111] px-4 text-white/54">
            <Search className="h-5 w-5" />
            <input className="w-full bg-transparent text-sm font-semibold text-white outline-none placeholder:text-white/34" placeholder="게시글 검색" />
          </label>
          <div className="flex gap-2 overflow-x-auto">
            {["최신순", "추천순", "조회순"].map((sort, index) => (
              <button
                key={sort}
                className={
                  index === 0
                    ? "h-12 shrink-0 rounded-xl bg-primary px-4 text-sm font-black text-[#111111]"
                    : "h-12 shrink-0 rounded-xl px-4 text-sm font-bold text-white/62 transition hover:bg-white/8 hover:text-white"
                }
              >
                {sort}
              </button>
            ))}
            <button className="flex h-12 shrink-0 items-center gap-2 rounded-xl px-4 text-sm font-bold text-white/62 transition hover:bg-white/8">
              <Filter className="h-4 w-4" />
              필터
            </button>
          </div>
        </div>

        <div className="grid gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}
