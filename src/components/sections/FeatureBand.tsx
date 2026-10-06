"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Starfield } from "@/components/ui/Starfield";
import { LightRays } from "@/components/ui/LightRays";
import { FloatingPetals } from "@/components/ui/FloatingPetals";
import { LotusMark } from "@/components/ui/LotusMark";
import { MagneticLink } from "@/components/ui/MagneticButton";
import { Eyebrow } from "@/components/ui/Eyebrow";

/** Signature pinned scroll beat: the brand promise, held while you scroll. */
export function FeatureBand() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 1.06]);
  const opacity = useTransform(scrollYProgress, [0, 0.14, 0.86, 1], [0.2, 1, 1, 0.2]);
  const yPetals = useTransform(scrollYProgress, [0, 1], [60, -120]);

  return (
    <section ref={ref} className="celestial relative text-white" style={{ height: "130vh" }}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <Starfield />
        <LightRays />
        <motion.div className="absolute inset-0" style={reduce ? undefined : { y: yPetals }}>
          <FloatingPetals />
        </motion.div>
        <motion.div
          style={reduce ? undefined : { scale, opacity }}
          className="shell relative z-10 flex flex-col items-center text-center"
        >
          <LotusMark size={72} className="mb-6 drop-shadow-[0_8px_30px_rgba(92,195,184,0.5)]" />
          <Eyebrow className="justify-center text-teal-glow">The Depris promise</Eyebrow>
          <h2 className="h-hero mt-4 font-display">
            <span className="block text-white">Turn back the clock,</span>
            <span className="block italic text-metallic text-metallic-dark">one drop at a time.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            Clinic-grade peptides, exosomes and skin boosters — the advanced actives that make time
            feel optional, in a routine built around your skin.
          </p>
          <div className="mt-8">
            <MagneticLink href="/quiz" variant="primary">Find your ritual</MagneticLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
