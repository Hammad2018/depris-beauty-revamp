"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { DuotoneImage } from "@/components/ui/DuotoneImage";
import { Eyebrow } from "@/components/ui/Eyebrow";

type Palette = "cool" | "warm" | "lilac" | "jade";

const panels: { n: string; title: string; copy: string; product: string; href: string; palette: Palette }[] = [
  { n: "01", title: "Cleanse", copy: "A low-pH gel that lifts the day without stripping the barrier.", product: "Low-pH Gentle Gel Cleanser", href: "/products/gentle-gel-cleanser", palette: "jade" },
  { n: "02", title: "Treat", copy: "Copper tripeptides that support collagen and firmness — the signature.", product: "GHK-Cu Copper Peptide Serum", href: "/products/ghk-cu-copper-peptide-serum", palette: "cool" },
  { n: "03", title: "Boost", copy: "Exosome-powered radiance for a next-level, clinic-grade glow.", product: "2XSOME Skin Booster", href: "/products/2xsome-skin-booster", palette: "lilac" },
  { n: "04", title: "Protect", copy: "Luminous daily SPF that evens tone and locks the ritual in.", product: "Bellmona CC Cream Sunscreen", href: "/products/bellmona-cc-cream-sunscreen", palette: "warm" },
];

/** Vertical scroll drives a horizontal editorial rail of duotone "ritual" panels. */
export function Lookbook() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // each panel ≈ 72vw + gap; travel = total width − viewport
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${panels.length * 74 - 100 + 6}vw`]);

  const rail = (
    <div className="flex gap-[2vw] px-[4vw]">
      {panels.map((p) => (
        <article
          key={p.n}
          className="group relative h-[68vh] w-[86vw] shrink-0 overflow-hidden rounded-[2rem] shadow-lift sm:w-[72vw]"
        >
          <DuotoneImage alt={`${p.title} — ${p.product}`} palette={p.palette} className="liquid absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-navy-deep/10 to-transparent" />
          <div className="relative flex h-full flex-col justify-between p-7 text-white sm:p-10">
            <span className="index-num font-display italic" style={{ WebkitTextStroke: "1.2px rgba(255,255,255,0.6)" }}>
              {p.n}
            </span>
            <div className="max-w-md">
              <h3 className="font-display text-4xl leading-none sm:text-6xl">{p.title}</h3>
              <p className="mt-3 text-base text-white/80 sm:text-lg">{p.copy}</p>
              <Link
                href={p.href}
                className="mt-5 inline-flex items-center gap-2 rounded-full glass-dark px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
              >
                {p.product}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );

  if (reduce) {
    return (
      <section className="mesh-tint py-20">
        <div className="shell mb-8">
          <Eyebrow className="text-camellia">The ritual</Eyebrow>
          <h2 className="h-display mt-3 font-display text-ink">Four steps to <span className="italic text-gradient">glass skin</span></h2>
        </div>
        <div className="no-scrollbar overflow-x-auto">{rail}</div>
      </section>
    );
  }

  return (
    <section ref={ref} className="mesh-tint relative" style={{ height: `${panels.length * 70}vh` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="shell mb-6">
          <Eyebrow className="text-camellia">The ritual</Eyebrow>
          <h2 className="h-display mt-2 font-display text-ink">
            Four steps to <span className="italic text-gradient">glass skin</span>
          </h2>
        </div>
        <motion.div style={{ x }}>{rail}</motion.div>
      </div>
    </section>
  );
}
