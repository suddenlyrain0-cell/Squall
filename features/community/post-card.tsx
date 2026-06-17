import Link from "next/link";
import { MessageSquare, ThumbsUp, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Post } from "@/types/community";

export function PostCard({ post, compact = false }: { post: Post; compact?: boolean }) {
  return (
    <Link href={`/post/${post.id}`}>
      <Card className="group p-5 hover:-translate-y-1 hover:border-primary/50 hover:bg-white/[0.08]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="mb-3 flex items-center gap-2">
              <Badge>{post.tag}</Badge>
              <span className="text-xs font-bold text-white/38">{post.date}</span>
            </div>
            <h3 className="line-clamp-2 text-xl font-black leading-snug text-white transition group-hover:text-primary">
              {post.title}
            </h3>
            {!compact ? <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/54">{post.excerpt}</p> : null}
            <div className="mt-4 flex items-center gap-3 text-sm font-bold text-white/48">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs text-white">
                {post.avatar}
              </span>
              {post.author}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-4 text-sm font-bold text-white/48 sm:flex-col sm:items-end">
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
