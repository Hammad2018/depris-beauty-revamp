"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { MagneticLink } from "@/components/ui/MagneticButton";
import { WordReveal } from "@/components/ui/WordReveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { StarRating } from "@/components/ui/StarRating";
import { Marquee } from "@/components/ui/Marquee";
import { Starfield } from "@/components/ui/Starfield";
import { LightRays } from "@/components/ui/LightRays";
import { FloatingPetals } from "@/components/ui/FloatingPetals";
import { LotusMark } from "@/components/ui/LotusMark";

const ticker = [
  "Copper Peptides", "Exosomes", "Niacinamide", "Centella",
  "Vitamin C", "Hyaluronic Acid", "Retinol", "Skin Boosters",
];

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 18 });
  const py = useSpring(my, { stiffness: 60, damping: 18 });
  const x1 = useTransform(px, (v) => v * 1.8);
  const y1 = useTransform(py, (v) => v * 1.8);
  const x2 = useTransform(px, (v) => v * 2.6);
  const y2 = useTransform(py, (v) => v * 2.6);
  const x3 = useTransform(px, (v) => v * 1.2);
  const y3 = useTransform(py, (v) => v * 1.2);

  function onMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - (r.left + r.width / 2)) / r.width) * 26);
    my.set(((e.clientY - (r.top + r.height / 2)) / r.height) * 26);
  }

  return (
    <section className="celestial relative overflow-hidden text-white" onMouseMove={onMove}>
      <Starfield />
      <LightRays />
      <FloatingPetals />

      <div className="shell grid items-center gap-10 py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 rounded-full glass-dark px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-white/90">
              <LotusMark size={18} />
              Advanced Korean skincare · Ships same-day
            </span>
          </motion.div>

          <h1 className="mt-6 text-5xl leading-[1.02] sm:text-6xl xl:text-7xl">
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
            Copper peptides, exosomes and skin boosters — the advanced actives behind real results, stocked in the US for
            same-day shipping.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <MagneticLink href="/quiz" variant="primary">Take the skin quiz</MagneticLink>
            <MagneticLink href="/collections/bestsellers" variant="light">Shop bestsellers</MagneticLink>
          </motion.div>

          <div className="mt-8 flex items-center gap-3 text-sm text-white/75">
            <StarRating rating={4.8} showValue={false} />
            <span>
              Loved by <AnimatedCounter value={12000} suffix="+" className="font-semibold text-white" /> skintellectuals
            </span>
          </div>
        </div>

        {/* Lotus centerpiece + floating glass cards */}
        <div ref={ref} className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center [perspective:1000px]">
          <div className="absolute inset-[14%] rounded-full bg-teal-glow/25 blur-3xl" />
          <motion.div style={reduce ? undefined : { x: x3, y: y3 }} className="animate-float">
            <LotusMark size={230} className="drop-shadow-[0_10px_40px_rgba(92,195,184,0.5)]" />
          </motion.div>

          <motion.div style={reduce ? undefined : { x: x1, y: y1 }} className="absolute left-0 top-8 w-40 -rotate-6">
            <div className="animate-float-slow">
              <div className="group rounded-3xl glass-dark p-4 shadow-lift ring-gradient">
                <div className="h-28 rounded-2xl bg-gradient-to-br from-teal-glow/70 to-teal/70" />
                <p className="mt-3 font-display text-sm text-white">GHK-Cu Copper Peptide</p>
                <p className="text-xs text-white/60">The signature active</p>
              </div>
            </div>
          </motion.div>

          <motion.div style={reduce ? undefined : { x: x2, y: y2 }} className="absolute bottom-6 right-0 w-40 rotate-6">
            <div className="animate-float" style={{ animationDelay: "-3s" }}>
              <div className="group rounded-3xl glass-dark p-4 shadow-lift ring-gradient">
                <div className="h-28 rounded-2xl bg-gradient-to-br from-periwinkle/70 to-lavender/70" />
                <p className="mt-3 font-display text-sm text-white">2XSOME Skin Booster</p>
                <p className="text-xs text-white/60">Exosome glow</p>
              </div>
            </div>
          </motion.div>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2">
            <div className="rounded-2xl glass-dark px-5 py-3 text-center">
              <p className="font-display text-2xl text-white"><AnimatedCounter value={92} suffix="%" /></p>
              <p className="text-[10px] uppercase tracking-wide text-white/70">firmer-looking skin*</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ingredient ticker */}
      <div className="relative border-t border-white/10 bg-white/[0.04] py-4 backdrop-blur-sm">
        <Marquee className="mask-fade-x">
          {ticker.map((t) => (
            <span key={t} className="flex items-center gap-3 font-display text-lg text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-glow" />
              {t}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
