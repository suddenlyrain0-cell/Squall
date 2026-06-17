import { UpdateTimeline } from "@/features/update/update-timeline";
import { updateNotes } from "@/services/mock-data";

export default function UpdatePage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-12 lg:px-8">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-primary">Update</p>
      <h1 className="mt-3 text-4xl font-black text-white md:text-6xl">패치노트</h1>
      <p className="mt-4 max-w-2xl leading-7 text-white/60">버전별 변경사항을 타임라인으로 정리했습니다.</p>
      <div className="mt-10">
        <UpdateTimeline notes={updateNotes} />
      </div>
    </main>
  );
}
