import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "orange" | "white" | "muted";
};

export function Badge({ className, tone = "orange", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.12em]",
        tone === "orange" && "bg-primary/16 text-primary ring-1 ring-primary/30",
        tone === "white" && "bg-white text-[#111111]",
        tone === "muted" && "bg-white/8 text-white/64 ring-1 ring-white/10",
        className
      )}
      {...props}
    />
  );
}
