"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MagneticLink } from "@/components/ui/MagneticButton";
import { WordReveal } from "@/components/ui/WordReveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { StarRating } from "@/components/ui/StarRating";
import { Marquee } from "@/components/ui/Marquee";

const ticker = [
  "Copper Peptides",
  "Exosomes",
  "Niacinamide",
  "Centella",
  "Vitamin C",
  "Hyaluronic Acid",
  "Retinol",
  "Skin Boosters",
];

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 18 });
  const py = useSpring(my, { stiffness: 60, damping: 18 });
  // parallax depths (hooks must run unconditionally)
  const x1 = useTransform(px, (v) => v * 1.6);
  const y1 = useTransform(py, (v) => v * 1.6);
  const x2 = useTransform(px, (v) => v * 2.2);
  const y2 = useTransform(py, (v) => v * 2.2);
  const x3 = useTransform(px, (v) => v * 3);
  const y3 = useTransform(py, (v) => v * 3);

  function onMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - (r.left + r.width / 2)) / r.width) * 28);
    my.set(((e.clientY - (r.top + r.height / 2)) / r.height) * 28);
  }

  return (
    <section className="relative overflow-hidden" onMouseMove={onMove}>
      <AuroraBackground tone="light" />
      <div className="glow-backdrop absolute inset-0 -z-10" />

      <div className="shell grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-bronze-deep">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-coral" />
              </span>
              Advanced K-beauty · Ships same-day
            </span>
          </motion.div>

          <h1 className="mt-5 text-5xl leading-[1.0] text-ink sm:text-6xl xl:text-7xl">
            <WordReveal text="Glass-skin," className="block font-display" />
            <WordReveal text="backed by science." className="block font-display italic text-gradient" delay={0.25} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft"
          >
            Copper peptides, exosomes and skin boosters — the advanced actives behind real results, made approachable.
            Fully stocked in Wyoming for same-day shipping.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <MagneticLink href="/quiz" variant="primary">
              Take the skin quiz
            </MagneticLink>
            <MagneticLink href="/collections/bestsellers" variant="ghost">
              Shop bestsellers
            </MagneticLink>
          </motion.div>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3 text-sm text-ink-soft">
              <StarRating rating={4.8} showValue={false} />
              <span>
                Loved by <AnimatedCounter value={12000} suffix="+" className="font-semibold text-ink" /> skintellectuals
              </span>
            </div>
          </div>
        </div>

        {/* Floating parallax visual */}
        <div ref={ref} className="relative mx-auto aspect-[4/5] w-full max-w-md [perspective:1000px]">
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-rose/70 via-peach/60 to-mint/50 blur-[2px] animate-blob" />

          <motion.div style={reduce ? undefined : { x: x1, y: y1 }} className="absolute left-4 top-6 w-44 -rotate-6">
            <div className="animate-float-slow">
              <div className="group rounded-3xl glass-strong p-4 shadow-lift ring-gradient">
                <div className="h-32 rounded-2xl bg-gradient-to-br from-gold/60 to-peach/70" />
                <p className="mt-3 font-display text-sm text-ink">GHK-Cu Copper Peptide</p>
                <p className="text-xs text-ink-soft">The signature active</p>
              </div>
            </div>
          </motion.div>

          <motion.div style={reduce ? undefined : { x: x2, y: y2 }} className="absolute bottom-8 right-4 w-44 rotate-6">
            <div className="animate-float" style={{ animationDelay: "-3s" }}>
              <div className="group rounded-3xl glass-strong p-4 shadow-lift ring-gradient">
                <div className="h-32 rounded-2xl bg-gradient-to-br from-mint/70 to-lavender/60" />
                <p className="mt-3 font-display text-sm text-ink">2XSOME Skin Booster</p>
                <p className="text-xs text-ink-soft">Exosome glow</p>
              </div>
            </div>
          </motion.div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              style={reduce ? undefined : { x: x3, y: y3 }}
              className="rounded-3xl bg-ink/90 px-6 py-4 text-center text-porcelain shadow-glow backdrop-blur"
            >
              <p className="font-display text-3xl">
                <AnimatedCounter value={92} suffix="%" />
              </p>
              <p className="text-[11px] uppercase tracking-wide text-porcelain/80">firmer-looking skin*</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Ingredient ticker */}
      <div className="border-y border-sand/60 bg-white/40 py-4 backdrop-blur-sm">
        <Marquee className="mask-fade-x">
          {ticker.map((t) => (
            <span key={t} className="flex items-center gap-3 font-display text-lg text-ink/70">
              <span className="h-1.5 w-1.5 rounded-full bg-coral" />
              {t}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
