import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  index,
  title,
  intro,
  align = "left",
  size = "md",
  tone = "ink",
  className = "",
}: {
  eyebrow?: string;
  index?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  size?: "md" | "xl";
  tone?: "ink" | "light";
  className?: string;
}) {
  const alignCls = align === "center" ? "mx-auto max-w-3xl items-center text-center" : "max-w-3xl";
  const titleCls = size === "xl" ? "h-display font-display" : "font-display text-3xl leading-[1.05] sm:text-4xl";
  const titleColor = tone === "light" ? "text-white" : "text-ink";
  const introColor = tone === "light" ? "text-white/70" : "text-ink-soft";
  return (
    <Reveal className={`flex flex-col ${alignCls} ${className}`}>
      {(index || eyebrow) && (
        <div className={`mb-4 flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
          {index && <span className="index-num font-display italic">{index}</span>}
          {eyebrow && <Eyebrow className={tone === "light" ? "text-teal-glow" : "text-camellia"}>{eyebrow}</Eyebrow>}
        </div>
      )}
      <h2 className={`${titleCls} ${titleColor}`}>{title}</h2>
      {intro && <p className={`mt-5 max-w-2xl text-lg leading-relaxed ${introColor}`}>{intro}</p>}
    </Reveal>
  );
}
