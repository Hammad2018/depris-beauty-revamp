"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** Guide reading frame: sticky table of contents with the current section highlighted, plus a reading-progress rule. */
export function GuideBody({ toc, children }: { toc: { id: string; label: string }[]; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 20%", "end 80%"] });
  const [active, setActive] = useState(toc[0]?.id);

  useEffect(() => {
    const els = toc.map((t) => document.getElementById(t.id)).filter((e): e is HTMLElement => Boolean(e));
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [toc]);

  return (
    <div ref={ref} className="shell grid gap-12 py-16 lg:grid-cols-[14rem_1fr] lg:gap-20">
      <aside className="hidden lg:block">
        <div className="sticky top-28">
          <p className="mono-label text-ink-soft">In this guide</p>
          <div className="relative mt-4 pl-4">
            <span className="absolute left-0 top-0 h-full w-px bg-sand" />
            {!reduce && <motion.span style={{ scaleY: scrollYProgress }} className="absolute left-0 top-0 h-full w-px origin-top bg-camellia" />}
            <ol className="space-y-2.5">
              {toc.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className={`block text-sm leading-snug transition-colors ${active === t.id ? "text-ink" : "text-ink-soft hover:text-ink"}`}>{t.label}</a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
