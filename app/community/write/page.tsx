import { WritePostForm } from "@/features/community/write-post-form";
import { AuthGate } from "@/features/auth/auth-gate";

export default function WritePostPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-primary">Write Post</p>
      <h1 className="mt-3 text-4xl font-black text-white md:text-6xl">새 글 작성</h1>
      <p className="mt-4 max-w-2xl leading-7 text-white/60">현재는 Mock UI입니다. 이후 Supabase Auth와 Storage를 연결하기 쉽게 폼 단위로 분리했습니다.</p>
      <div className="mt-8">
        <AuthGate redirectTo="/community/write">
          <WritePostForm />
        </AuthGate>
      </div>
    </main>
  );
}
