import { NoticeCard } from "@/features/notice/notice-card";
import { notices } from "@/services/mock-data";

export default function NoticePage() {
  const pinned = notices.filter((notice) => notice.pinned);
  const regular = notices.filter((notice) => !notice.pinned);

  return (
    <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-primary">Notice</p>
      <h1 className="mt-3 text-4xl font-black text-white md:text-6xl">공식 공지</h1>
      <p className="mt-4 max-w-2xl leading-7 text-white/60">업데이트, 이벤트, 점검, 일반 공지를 한눈에 확인하세요.</p>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-black text-white">중요 공지</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {pinned.map((notice) => (
            <NoticeCard key={notice.id} notice={notice} />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-4 flex flex-wrap gap-2">
          {["전체", "업데이트", "이벤트", "점검", "일반"].map((filter, index) => (
            <button
              key={filter}
              className={
                index === 0
                  ? "rounded-full bg-primary px-4 py-2 text-sm font-black text-[#111111]"
                  : "rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-white/58 transition hover:border-primary hover:text-primary"
              }
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {regular.map((notice) => (
            <NoticeCard key={notice.id} notice={notice} />
          ))}
        </div>
      </section>
    </main>
  );
}
