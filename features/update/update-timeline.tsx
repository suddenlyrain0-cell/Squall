import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { UpdateNote } from "@/types/community";

export function UpdateTimeline({ notes }: { notes: UpdateNote[] }) {
  return (
    <div className="relative space-y-5 before:absolute before:left-5 before:top-3 before:h-[calc(100%-24px)] before:w-px before:bg-white/12">
      {notes.map((note) => (
        <div key={note.version} className="relative grid gap-4 pl-14">
          <span className="absolute left-2 top-6 h-7 w-7 rounded-full border-4 border-[#111111] bg-primary shadow-glow" />
          <Card className="p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Badge>{note.version}</Badge>
                <h3 className="mt-3 text-2xl font-black text-white">{note.summary}</h3>
              </div>
              <time className="text-sm font-bold text-white/42">{note.date}</time>
            </div>
            <ul className="mt-5 grid gap-2 text-sm leading-6 text-white/66">
              {note.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      ))}
    </div>
  );
}
