"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { MagneticLink } from "@/components/ui/MagneticButton";
import { WordReveal } from "@/components/ui/WordReveal";
import { Constellation } from "@/components/ui/Constellation";
import { LightRays } from "@/components/ui/LightRays";
import { TrustPills } from "@/components/ui/TrustPills";

const callouts = [
  { label: "GHK-Cu · 1 g", sub: "copper tripeptide, topical grade", pos: "-left-[6%] top-[16%]", line: "right" },
  { label: "Cosmetic Peps", sub: "the Depris signature line", pos: "-right-[4%] top-[44%]", line: "left" },
  { label: "Ships same-day", sub: "from Cheyenne, WY", pos: "-left-[4%] bottom-[14%]", line: "right" },
];

/** Hero: peptide constellation + the drop, lit like a specimen. */
export function Hero({ image, imageAlt = "GHK-Cu Topical Cosmetic" }: { image: string; imageAlt?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 50, damping: 18 });
  const py = useSpring(my, { stiffness: 50, damping: 18 });
  const bx = useTransform(px, (v) => v * 0.8);
  const by = useTransform(py, (v) => v * 0.8);
  const rx = useTransform(py, (v) => v * -0.25);
  const ry = useTransform(px, (v) => v * 0.35);
  const hx = useTransform(px, (v) => v * -1.4);
  const hy = useTransform(py, (v) => v * -1.4);

  function onMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - (r.left + r.width / 2)) / r.width) * 30);
    my.set(((e.clientY - (r.top + r.height / 2)) / r.height) * 30);
  }

  return (
    <section className="celestial relative overflow-hidden text-white" onMouseMove={onMove}>
      <Constellation />
      <LightRays />

      <div className="shell relative grid items-center gap-8 pb-10 pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:pb-14 lg:pt-20">
        <div className="relative z-10 lg:w-[118%]">
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mono-label text-teal-glow">
            Luxury Korean skincare · Pro aesthetics
          </motion.p>

          <h1 className="mt-6 text-5xl leading-[1.04] sm:text-6xl xl:text-[4rem]">
            <WordReveal text="Turn back the clock," className="block font-display text-white lg:whitespace-nowrap" />
            <span className="block overflow-hidden pb-2">
              <motion.span
                className="block font-display italic text-metallic text-metallic-dark lg:whitespace-nowrap"
                initial={reduce ? false : { transform: "translateY(110%)", opacity: 0 }}
                animate={{ transform: "translateY(0%)", opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
              >
                one drop at a time.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-6 max-w-md text-lg leading-relaxed text-white/75"
          >
            Copper peptides, exosomes and skin boosters: clinic-grade actives for the night your skin repairs itself.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <MagneticLink href="/products/ghk-cu-topical-cosmetic-1g" variant="primary">Shop GHK-Cu</MagneticLink>
            <MagneticLink href="/quiz" variant="light">Build my ritual</MagneticLink>
          </motion.div>

        </div>

        {/* The drop: lit render, parallax tilt, mono callouts */}
        <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[34rem] [perspective:1200px] lg:mt-14 lg:-mr-6">
          <motion.div style={reduce ? undefined : { x: hx, y: hy }} className="absolute inset-[18%] rounded-full bg-teal-glow/25 blur-3xl" />
          {/* depth plate: offset glass slab behind the photo */}
          <motion.div
            aria-hidden
            initial={reduce ? false : { opacity: 0, transform: "translate(14px, 14px) rotate(-3deg)" }}
            animate={{ opacity: 1, transform: "translate(0px, 0px) rotate(-3deg)" }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.35 }}
            className="absolute -bottom-6 -left-6 right-10 top-10 rounded-[2.5rem] border border-white/15 bg-white/5 backdrop-blur-sm"
          />
          <motion.div
            style={reduce ? undefined : { x: bx, y: by, rotateX: rx, rotateY: ry }}
            initial={reduce ? false : { opacity: 0, scale: 0.9, filter: "blur(14px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1], delay: 0.2 }}
            className="absolute inset-0"
          >
            <div className="animate-float h-full w-full">
              <Image
                src={image}
                alt={imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="rounded-[2.5rem] object-cover shadow-lift"
              />
            </div>
          </motion.div>

          {callouts.map((c, i) => (
            <motion.div
              key={c.label}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + i * 0.18, duration: 0.6 }}
              className={`absolute ${c.pos} hidden sm:block`}
            >
              <div className={`flex items-center gap-3 ${c.line === "left" ? "flex-row-reverse text-right" : ""}`}>
                <div className="rounded-2xl border border-white/15 bg-navy-deep/70 px-3.5 py-2.5 shadow-lift backdrop-blur-md">
                  <p className="mono-label mono-label-plain text-white">{c.label}</p>
                  <p className="text-[11px] text-white/60">{c.sub}</p>
                </div>
                <span className="sheen-line w-10 opacity-80" />
              </div>
            </motion.div>
          ))}

        </div>
      </div>

      <div className="shell relative z-10 pb-10">
        <TrustPills />
      </div>
    </section>
  );
}
