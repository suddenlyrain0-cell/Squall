import Link from "next/link";
import type { ComponentType } from "react";
import { Bug, Brush, Lightbulb, MessageCircle, MessagesSquare, Trophy } from "lucide-react";
import { boardCategories } from "@/constants/navigation";
import type { BoardCategory } from "@/types/community";

const icons: Record<BoardCategory, ComponentType<{ className?: string }>> = {
  free: MessagesSquare,
  guide: Trophy,
  question: MessageCircle,
  bug: Bug,
  suggestion: Lightbulb,
  fanart: Brush
};

export function CommunitySidebar() {
  return (
    <aside className="rounded-2xl border border-white/10 bg-white/[0.06] p-3 lg:sticky lg:top-28">
      <p className="px-3 pb-3 pt-2 text-xs font-black uppercase tracking-[0.16em] text-white/36">Boards</p>
      <nav className="grid gap-1">
        {boardCategories.map((category, index) => {
          const Icon = icons[category.value];
          return (
            <Link
              key={category.value}
              href={`/community?board=${category.value}`}
              className={
                index === 0
                  ? "flex items-center gap-3 rounded-xl bg-primary px-3 py-3 text-sm font-black text-[#111111]"
                  : "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-white/66 transition hover:bg-white/8 hover:text-white"
              }
            >
              <Icon className="h-4 w-4" />
              {category.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
