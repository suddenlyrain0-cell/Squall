import { Search } from "lucide-react";
import { NoticeCard } from "@/features/notice/notice-card";
import { PostCard } from "@/features/community/post-card";
import { notices, posts, updateNotes } from "@/services/mock-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SearchPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-primary">Search</p>
      <h1 className="mt-3 text-4xl font-black text-white md:text-6xl">전체 검색</h1>
      <label className="mt-8 flex min-h-14 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-5 text-white/54">
        <Search className="h-5 w-5" />
        <input className="w-full bg-transparent text-base font-semibold text-white outline-none placeholder:text-white/34" placeholder="공지, 게시글, 업데이트 검색" />
      </label>
      <div className="mt-6 flex gap-2 overflow-x-auto">
        {["게시글", "공지", "업데이트"].map((tab, index) => (
          <button
            key={tab}
            className={
              index === 0
                ? "rounded-full bg-primary px-4 py-2 text-sm font-black text-[#111111]"
                : "rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-white/58 transition hover:border-primary hover:text-primary"
            }
          >
            {tab}
          </button>
        ))}
      </div>

      <section className="mt-10 grid gap-4">
        {posts.slice(0, 3).map((post) => (
          <PostCard key={post.id} post={post} compact />
        ))}
      </section>

      <section className="mt-12 grid gap-5 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-black text-white">공지 결과</h2>
          <div className="grid gap-4">
            {notices.slice(0, 2).map((notice) => (
              <NoticeCard key={notice.id} notice={notice} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-black text-white">업데이트 결과</h2>
          <div className="grid gap-4">
            {updateNotes.slice(0, 2).map((note) => (
              <Card key={note.version} className="p-5">
                <Badge>{note.version}</Badge>
                <h3 className="mt-4 text-xl font-black text-white">{note.summary}</h3>
                <p className="mt-2 text-sm text-white/46">{note.date}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
