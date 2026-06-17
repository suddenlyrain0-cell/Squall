import { CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { EventItem } from "@/types/community";

export function EventCard({ event }: { event: EventItem }) {
  return (
    <Card className="overflow-hidden hover:-translate-y-1 hover:border-primary/50">
      <div className="h-28 bg-[radial-gradient(circle_at_30%_30%,rgba(246,139,31,0.72),transparent_28%),linear-gradient(135deg,#2a1605,#111111_70%)]" />
      <div className="p-6">
        <Badge tone={event.status === "ongoing" ? "orange" : "muted"}>{event.status === "ongoing" ? "진행 중" : "종료"}</Badge>
        <h3 className="mt-4 text-2xl font-black leading-snug text-white">{event.title}</h3>
        <p className="mt-3 text-sm leading-6 text-white/58">{event.description}</p>
        <p className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white/46">
          <CalendarDays className="h-4 w-4 text-primary" />
          {event.period}
        </p>
      </div>
    </Card>
  );
}
