"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

const rows = [
  { k: "Clinically dosed", body: "Actives at the concentrations the studies used — GHK-Cu at 3.0%, not a label flourish. pH 5.5 so the barrier stays intact.", tag: "3.0% · pH 5.5" },
  { k: "Lot-tested", body: "Every batch is assayed for peptide concentration and stability before it ships. Your carton's lot code opens its certificate.", tag: "Verify by lot" },
  { k: "Cold-chain shipped", body: "Peptides and exosomes travel in an insulated mailer with a frozen pack. Same-day from Wyoming; arrives cold or we replace it.", tag: "Arrives cold" },
  { k: "Fragrance-free, always", body: "No added fragrance, essential oils or dyes. Formulated in Korea for sensitive skin first.", tag: "0 fragrance" },
];

/** "The Depris Standard": split background, the box crossing the seam, four expandable guarantees. */
export function DeprisStandard() {
  const [open, setOpen] = useState(0);
  return (
    <section className="relative overflow-hidden">
      <div className="grid lg:grid-cols-[42%_58%]">
        <div className="mesh-tint relative min-h-[26rem] lg:min-h-[44rem]">
          <Reveal className="shell relative z-10 py-16 lg:pr-0">
            <p className="mono-label text-camellia">The Depris standard</p>
            <h2 className="h-display mt-3 font-display text-ink">
              Quality you can <span className="italic text-gradient">open.</span>
            </h2>
            <p className="mt-5 max-w-sm text-ink-soft">Transparency, cold-chain care and clinical dosing — packed into every order.</p>
          </Reveal>
          {/* box crossing the seam */}
          <motion.div
            initial={{ opacity: 0, x: -30, rotate: -4 }}
            whileInView={{ opacity: 1, x: 0, rotate: -6 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute bottom-[-8%] right-[-10%] z-20 w-[62%] max-w-[26rem] overflow-hidden rounded-[1.75rem] shadow-lift lg:bottom-auto lg:top-1/2 lg:right-[-26%] lg:-translate-y-1/2"
          >
            <Image src="/renders/unbox.webp" alt="Depris insulated mailer: serum, cold pack and ritual card in a molded insert" width={1024} height={688} className="h-auto w-full" />
          </motion.div>
        </div>

        <div className="bg-navy-deep py-16 text-white lg:py-24 lg:pl-[24%]">
          <div className="shell lg:px-10">
            <ul className="divide-y divide-white/10">
              {rows.map((r, i) => {
                const isOpen = open === i;
                return (
                  <li key={r.k}>
                    <button
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center gap-5 py-6 text-left"
                    >
                      <span className={`h-2.5 w-2.5 shrink-0 rounded-full transition ${isOpen ? "bg-teal-glow shadow-[0_0_14px_rgba(92,195,184,1)]" : "bg-white/30"}`} />
                      <span className="flex-1 font-display text-2xl sm:text-3xl">{r.k}</span>
                      <span className="mono-label mono-label-plain hidden text-white/50 sm:block">{r.tag}</span>
                      <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="text-2xl text-white/60">+</motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-xl pb-7 pl-7 text-white/70">{r.body}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
