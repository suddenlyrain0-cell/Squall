import Link from "next/link";
import { MessageSquare, ThumbsUp, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Post } from "@/types/community";
import { cn } from "@/lib/utils";

export function PostCard({ post, compact = false, theme = "dark" }: { post: Post; compact?: boolean; theme?: "dark" | "light" }) {
  const isLight = theme === "light";

  return (
    <Link href={`/post/${post.id}`}>
      <Card className={cn("group p-5 hover:-translate-y-1 hover:border-primary/50", isLight ? "border-zinc-200 bg-white shadow-sm hover:bg-zinc-50" : "hover:bg-white/[0.08]")}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="mb-3 flex items-center gap-2">
              <Badge>{post.tag}</Badge>
              <span className={isLight ? "text-xs font-bold text-zinc-500" : "text-xs font-bold text-white/38"}>{post.date}</span>
            </div>
            <h3 className={isLight ? "line-clamp-2 text-xl font-black leading-snug text-[#111111] transition group-hover:text-primary" : "line-clamp-2 text-xl font-black leading-snug text-white transition group-hover:text-primary"}>
              {post.title}
            </h3>
            {!compact ? <p className={isLight ? "mt-2 line-clamp-2 text-sm leading-6 text-zinc-600" : "mt-2 line-clamp-2 text-sm leading-6 text-white/54"}>{post.excerpt}</p> : null}
            <div className={isLight ? "mt-4 flex items-center gap-3 text-sm font-bold text-zinc-500" : "mt-4 flex items-center gap-3 text-sm font-bold text-white/48"}>
              <span className={isLight ? "flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-xs text-zinc-700" : "flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs text-white"}>
                {post.avatar}
              </span>
              {post.author}
            </div>
          </div>
          <div className={isLight ? "flex shrink-0 items-center gap-4 text-sm font-bold text-zinc-500 sm:flex-col sm:items-end" : "flex shrink-0 items-center gap-4 text-sm font-bold text-white/48 sm:flex-col sm:items-end"}>
            <span className="inline-flex items-center gap-1.5">
              <Eye className="h-4 w-4" />
              {post.views.toLocaleString()}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MessageSquare className="h-4 w-4" />
              {post.comments}
            </span>
            <span className="inline-flex items-center gap-1.5 text-primary">
              <ThumbsUp className="h-4 w-4" />
              {post.likes}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
