"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { MagneticLink } from "@/components/ui/MagneticButton";
import { WordReveal } from "@/components/ui/WordReveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { StarRating } from "@/components/ui/StarRating";
import { Constellation } from "@/components/ui/Constellation";
import { LightRays } from "@/components/ui/LightRays";
import { LotusMark } from "@/components/ui/LotusMark";
import { TrustPills } from "@/components/ui/TrustPills";

const callouts = [
  { label: "GHK-Cu · 3.0%", sub: "signal peptide", pos: "left-[2%] top-[22%]", line: "right" },
  { label: "pH 5.5", sub: "barrier-friendly", pos: "right-[0%] top-[38%]", line: "left" },
  { label: "Lotus extract", sub: "botanical antioxidant", pos: "left-[4%] bottom-[20%]", line: "right" },
];

/** Hero: peptide constellation + the drop, lit like a specimen. */
export function Hero() {
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

      <div className="shell relative grid items-center gap-8 pb-10 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:pb-14 lg:pt-20">
        <div className="relative z-10">
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mono-label text-teal-glow">
            Advanced Korean skincare · The science of one drop
          </motion.p>

          <h1 className="mt-6 text-5xl leading-[1.0] sm:text-6xl xl:text-[5.4rem]">
            <WordReveal text="Turn back the clock," className="block font-display text-white" />
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="block font-display italic text-metallic text-metallic-dark"
                initial={reduce ? false : { y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 140, damping: 18, delay: 0.3 }}
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
            Copper peptides, exosomes and skin boosters — clinic-grade actives in a ritual built for the night your
            skin does its repair work.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <MagneticLink href="/products/ghk-cu-copper-peptide-serum" variant="primary">Shop the serum</MagneticLink>
            <MagneticLink href="/quiz" variant="light">Build my ritual</MagneticLink>
          </motion.div>

          <div className="mt-8 flex items-center gap-3 text-sm text-white/75">
            <StarRating rating={4.8} showValue={false} />
            <span>
              Loved by <AnimatedCounter value={12000} suffix="+" className="font-semibold text-white" /> skintellectuals
            </span>
          </div>
        </div>

        {/* The drop: lit render, parallax tilt, mono callouts */}
        <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[34rem] [perspective:1200px]">
          <motion.div style={reduce ? undefined : { x: hx, y: hy }} className="absolute inset-[18%] rounded-full bg-teal-glow/25 blur-3xl" />
          <motion.div
            style={reduce ? undefined : { x: bx, y: by, rotateX: rx, rotateY: ry }}
            initial={reduce ? false : { opacity: 0, scale: 0.9, filter: "blur(14px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1], delay: 0.2 }}
            className="absolute inset-0"
          >
            <div className="animate-float h-full w-full">
              <Image
                src="/renders/bottle-front.webp"
                alt="GHK-Cu Copper Peptide Serum — frosted glass dropper bottle with glowing teal serum"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="render-fade object-contain"
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
                <div>
                  <p className="mono-label mono-label-plain text-white">{c.label}</p>
                  <p className="text-[11px] text-white/55">{c.sub}</p>
                </div>
                <span className="sheen-line w-14 opacity-80" />
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="absolute bottom-[6%] right-[4%] rounded-2xl glass-dark px-5 py-3 text-center"
          >
            <p className="font-display text-2xl text-white"><AnimatedCounter value={92} suffix="%" /></p>
            <p className="mono-label mono-label-plain text-[9px] text-white/70">firmer in 4 wks*</p>
          </motion.div>

          <div className="absolute left-1/2 top-[6%] -translate-x-1/2 opacity-80">
            <LotusMark size={28} />
          </div>
        </div>
      </div>

      <div className="shell relative z-10 pb-10">
        <TrustPills />
      </div>
    </section>
  );
}
