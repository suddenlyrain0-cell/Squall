import Link from "next/link";
import { Flag, MessageSquare, Share2, ThumbsUp } from "lucide-react";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { posts } from "@/services/mock-data";

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const post = posts.find((item) => item.id === params.id);

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
      <article>
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <Badge>{post.tag}</Badge>
          <span className="text-sm font-bold text-white/42">{post.date}</span>
          <span className="text-sm font-bold text-white/42">조회 {post.views.toLocaleString()}</span>
        </div>
        <h1 className="text-4xl font-black leading-tight text-white md:text-6xl">{post.title}</h1>
        <div className="mt-7 flex flex-col gap-4 border-b border-white/10 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-black text-[#111111]">{post.avatar}</span>
            <div>
              <p className="font-black text-white">{post.author}</p>
              <p className="text-sm text-white/42">Official Hub Member</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">
              <Share2 className="h-4 w-4" />
              공유
            </Button>
            <Button variant="ghost" size="sm">
              <Flag className="h-4 w-4" />
              신고
            </Button>
          </div>
        </div>

        <Card className="mt-8 p-6 md:p-8">
          <div className="space-y-5 text-base leading-8 text-white/70">
            <p>{post.excerpt}</p>
            <p>
              SQUALL 커뮤니티에서는 플레이어의 관찰과 피드백이 다음 업데이트의 중요한 재료가 됩니다. 이 글은 테스트 빌드 기준으로 작성된
              예시 본문이며, 실제 서비스에서는 에디터 콘텐츠와 이미지가 이 영역에 표시됩니다.
            </p>
            <p>
              댓글로 추가 사례를 남겨주시면 개발팀이 재현 여부를 확인하고, 필요한 경우 공지나 패치노트로 후속 안내를 드릴 예정입니다.
            </p>
          </div>
          <div className="mt-8 flex justify-center">
            <Button size="lg">
              <ThumbsUp className="h-5 w-5" />
              추천 {post.likes}
            </Button>
          </div>
        </Card>
      </article>

      <section className="mt-10">
        <h2 className="mb-5 text-2xl font-black text-white">댓글 {post.comments}</h2>
        <div className="grid gap-4">
          {["좋은 정리 감사합니다. 2번 루트도 같이 테스트해볼게요.", "동일 현상 재현했습니다. 영상도 첨부해두면 좋을 것 같아요."].map((comment, index) => (
            <Card key={comment} className="p-5">
              <div className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-black text-white">
                  C{index + 1}
                </span>
                <div>
                  <p className="text-sm font-black text-white">CommunityUser{index + 1}</p>
                  <p className="mt-2 leading-7 text-white/62">{comment}</p>
                  <button className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-primary">
                    <MessageSquare className="h-4 w-4" />
                    답글
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <nav className="mt-10 grid gap-3 border-t border-white/10 pt-8 sm:grid-cols-2">
        <Link href="/post/p-002" className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 font-bold text-white/62 transition hover:border-primary hover:text-white">
          이전글: 이번 패치 이후 타격감이 훨씬 좋아졌네요
        </Link>
        <Link href="/post/p-003" className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 font-bold text-white/62 transition hover:border-primary hover:text-white">
          다음글: 보스 2페이즈에서 충돌 판정 이슈
        </Link>
      </nav>
    </main>
  );
}
