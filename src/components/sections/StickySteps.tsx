"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LotusMark } from "@/components/ui/LotusMark";
import { MagneticLink } from "@/components/ui/MagneticButton";

const steps = [
  { n: "01", title: "Tell us about your skin", body: "Two quick questions, skin type and your top concerns. Sixty seconds, no account needed.", grad: "from-[#C9EAE3] to-[#E8F4F6]", accent: "#157A73" },
  { n: "02", title: "We match the actives", body: "Our taxonomy maps concerns to clinically-loved ingredients: copper peptides, exosomes, niacinamide, centella.", grad: "from-[#DBE4FB] to-[#EFF2FE]", accent: "#4E6AD0" },
  { n: "03", title: "Your routine, in order", body: "Cleanse → treat → boost → moisturize → protect. Built around you, priced as a set.", grad: "from-[#EADBF5] to-[#F6EFFB]", accent: "#B9A3DE" },
  { n: "04", title: "Add it in one tap", body: "The whole ritual goes to your bag at once, and ships same-day from Wyoming.", grad: "from-[#F6E0A6] to-[#FBF2D9]", accent: "#E3B34C" },
];

function Step({ i, onActive }: { i: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.6 });
  useEffect(() => {
    if (inView) onActive(i);
  }, [inView, i, onActive]);
  const s = steps[i];
  return (
    <div ref={ref} className="flex min-h-[40vh] flex-col justify-center py-8 lg:min-h-[48vh]">
      <div className="flex items-center gap-3">
        <span className="index-num font-display italic">{s.n}</span>
        <span className="sheen-line w-16" />
      </div>
      <h3 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl">{s.title}</h3>
      <p className="mt-3 max-w-md text-lg leading-relaxed text-ink-soft">{s.body}</p>
    </div>
  );
}

/** Pinned visual crossfades while the steps scroll past it. */
export function StickySteps() {
  const [active, setActive] = useState(0);
  const s = steps[active];

  return (
    <section className="mesh-light">
      <div className="shell grid gap-10 py-20 lg:grid-cols-2 lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow className="text-camellia">How it works</Eyebrow>
          <h2 className="h-display mt-3 font-display text-ink">
            No guesswork. <span className="italic text-gradient">Just results.</span>
          </h2>
          <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-[2rem] shadow-lift">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${s.grad}`}
              >
                <div className="animate-float">
                  <LotusMark size={160} className="drop-shadow-[0_14px_40px_rgba(30,42,68,0.18)]" />
                </div>
                <span
                  className="absolute bottom-6 left-6 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white"
                  style={{ background: s.accent }}
                >
                  Step {s.n}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-6">
            <MagneticLink href="/quiz" variant="primary">Build my ritual</MagneticLink>
          </div>
        </div>

        <div>
          {steps.map((_, i) => (
            <Step key={i} i={i} onActive={setActive} />
          ))}
        </div>
      </div>
    </section>
  );
}
