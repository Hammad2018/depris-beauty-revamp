"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const tiles = [
  { k: "PRIMARY ACTIVE", name: "Copper peptides", sub: "GHK-Cu · AHK-Cu", img: "/renders/crystal.webp", href: "/collections/cosmetic-peps", copy: "Signal peptides that support collagen, firmness and renewal." },
  { k: "BOOSTER", name: "Exosomes", sub: "2XSOME · skin boosters", img: "/renders/swirl.webp", href: "/collections/mesotherapy-skin-boosters", copy: "Cell-signalling vesicles for radiance and post-procedure recovery." },
  { k: "BOTANICAL", name: "Lotus & centella", sub: "Nelumbo nucifera · cica", img: "/renders/lotus.webp", href: "/collections/concern-redness", copy: "Antioxidant, calming botanicals that keep the barrier happy." },
];

/** Three actives, zero compromise: hover/focus expands a tile. */
export function ActivesTriptych() {
  const [active, setActive] = useState(0);
  return (
    <section className="bg-navy-deep py-20 text-white">
      <div className="shell">
        <p className="mono-label text-teal-glow">Three actives · zero compromise</p>
        <h2 className="h-display mt-3 font-display">The actives most brands <span className="italic text-metallic text-metallic-dark">can&apos;t formulate.</span></h2>
        <div className="mt-10 flex flex-col gap-3 lg:h-[34rem] lg:flex-row">
          {tiles.map((t, i) => {
            const on = active === i;
            return (
              <motion.div
                key={t.k}
                layout
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                animate={{ flexGrow: on ? 2.4 : 1 }}
                transition={{ type: "spring", stiffness: 160, damping: 24 }}
                className="group relative min-h-[16rem] flex-1 overflow-hidden rounded-[2rem] shadow-lift"
              >
                <Image src={t.img} alt="" fill sizes="(max-width:1024px) 100vw, 50vw" className={`liquid object-cover transition-transform duration-700 ${on ? "scale-105" : "scale-100"}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                  <p className="mono-label text-teal-glow">{t.k}</p>
                  <h3 className="mt-2 font-display text-3xl sm:text-4xl">{t.name}</h3>
                  <p className="mono-label mono-label-plain mt-1 text-white/60">{t.sub}</p>
                  <motion.p animate={{ opacity: on ? 1 : 0, height: on ? "auto" : 0 }} className="mt-3 max-w-sm overflow-hidden text-white/80">{t.copy}</motion.p>
                  <Link href={t.href} className="mt-4 inline-flex w-fit items-center gap-2 rounded-full glass-dark px-4 py-2 text-sm hover:bg-white/20">Shop {t.name.toLowerCase()} →</Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
