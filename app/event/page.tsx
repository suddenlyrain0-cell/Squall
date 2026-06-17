import { EventCard } from "@/features/event/event-card";
import { events } from "@/services/mock-data";

export default function EventPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-primary">Event</p>
      <h1 className="mt-3 text-4xl font-black text-white md:text-6xl">이벤트</h1>
      <p className="mt-4 max-w-2xl leading-7 text-white/60">진행 중인 커뮤니티 이벤트와 종료된 캠페인을 확인하세요.</p>
      <div className="mt-8 flex flex-wrap gap-2">
        {["진행 중", "종료", "전체"].map((filter, index) => (
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
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </main>
  );
}
