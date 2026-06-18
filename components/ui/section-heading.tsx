import Link from "next/link";
import { ArrowRight } from "lucide-react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  action?: string;
  theme?: "dark" | "light";
};

export function SectionHeading({ eyebrow, title, description, href, action = "View All", theme = "dark" }: SectionHeadingProps) {
  const isLight = theme === "light";

  return (
    <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow ? <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-primary">{eyebrow}</p> : null}
        <h2 className={isLight ? "text-3xl font-black leading-tight text-[#111111] md:text-5xl" : "text-3xl font-black leading-tight text-white md:text-5xl"}>{title}</h2>
        {description ? <p className={isLight ? "mt-3 max-w-2xl text-base leading-7 text-zinc-600" : "mt-3 max-w-2xl text-base leading-7 text-white/62"}>{description}</p> : null}
      </div>
      {href ? (
        <Link href={href} className="inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:gap-3">
          {action}
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : null}
    </div>
  );
}
