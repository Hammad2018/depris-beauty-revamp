import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { AuroraBackground } from "@/components/ui/AuroraBackground";

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-sand/60">
      <AuroraBackground tone="light" className="opacity-50" />
      <div className="glow-backdrop absolute inset-0 -z-10 opacity-70" />
      <div className="shell py-14 text-center">
        {eyebrow && <Eyebrow className="text-camellia">{eyebrow}</Eyebrow>}
        <h1 className="mx-auto mt-3 max-w-3xl text-4xl leading-tight text-ink sm:text-5xl">{title}</h1>
        {intro && <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-soft">{intro}</p>}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
