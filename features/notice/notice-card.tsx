import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Notice } from "@/types/community";
import { cn } from "@/lib/utils";

const typeLabel = {
  update: "업데이트",
  event: "이벤트",
  maintenance: "점검",
  general: "공지"
};

export function NoticeCard({ notice, theme = "dark" }: { notice: Notice; theme?: "dark" | "light" }) {
  const isLight = theme === "light";

  return (
    <Card className={cn("group h-full p-5 hover:-translate-y-1 hover:border-primary/50", isLight ? "border-zinc-200 bg-white shadow-sm hover:bg-zinc-50" : "hover:bg-white/[0.08]")}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <Badge tone={notice.pinned ? "orange" : "muted"}>{typeLabel[notice.type]}</Badge>
        <time className={isLight ? "text-sm font-semibold text-zinc-500" : "text-sm font-semibold text-white/42"}>{notice.date}</time>
      </div>
      <h3 className={isLight ? "text-xl font-black leading-snug text-[#111111] transition group-hover:text-primary" : "text-xl font-black leading-snug text-white transition group-hover:text-primary"}>{notice.title}</h3>
      <p className={isLight ? "mt-3 line-clamp-2 text-sm leading-6 text-zinc-600" : "mt-3 line-clamp-2 text-sm leading-6 text-white/58"}>{notice.excerpt}</p>
    </Card>
  );
}
