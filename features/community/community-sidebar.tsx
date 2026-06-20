import Link from "next/link";
import type { ComponentType } from "react";
import { Bug, MessagesSquare, Trophy } from "lucide-react";
import { boardCategories } from "@/constants/navigation";
import type { BoardCategory } from "@/types/community";

const icons: Partial<Record<BoardCategory, ComponentType<{ className?: string }>>> = {
  free: MessagesSquare,
  guide: Trophy,
  bug: Bug
};

export function CommunitySidebar() {
  return (
    <aside className="hidden lg:sticky lg:top-28 lg:block">
      <p className="mb-2 px-2 text-xs font-black tracking-[0.14em] text-zinc-400">Boards</p>
      <nav className="grid gap-0.5">
        {boardCategories.map((category, index) => {
          const Icon = icons[category.value] ?? MessagesSquare;
          return (
            <Link
              key={category.value}
              href={`/community?board=${category.value}`}
              className={
                index === 0
                  ? "flex items-center gap-2 rounded-md bg-zinc-100 px-2.5 py-2 text-sm font-black text-[#111111]"
                  : "flex items-center gap-2 rounded-md px-2.5 py-2 text-sm font-bold text-zinc-500 transition hover:bg-zinc-100 hover:text-[#111111]"
              }
            >
              <Icon className={index === 0 ? "h-4 w-4 text-primary" : "h-4 w-4 text-zinc-500"} />
              <span className="truncate">{category.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
