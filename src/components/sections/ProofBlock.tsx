import Image from "next/image";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { RotatingSeal } from "@/components/ui/RotatingSeal";
import { LabTicker } from "@/components/ui/LabTicker";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MagneticLink } from "@/components/ui/MagneticButton";

const stats = [
  { v: 92, suffix: "%", label: "firmer-looking skin", sub: "4 weeks · n = 84", pos: "left-[6%] top-[18%]" },
  { v: 88, suffix: "%", label: "smoother texture", sub: "12 weeks · n = 84", pos: "right-[8%] top-[34%]" },
  { v: 97, suffix: "%", label: "no irritation reported", sub: "sensitive panel · n = 40", pos: "left-[10%] bottom-[18%]" },
];

/** Proof: macro skin with counting stat callouts, a verification seal, lab ticker and before/after. */
export function ProofBlock() {
  return (
    <section className="relative overflow-hidden bg-navy-deep text-white">
      <div className="relative min-h-[88vh]">
        <Image src="/renders/skin.webp" alt="" fill sizes="100vw" className="liquid object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/60 to-navy-deep/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-navy-deep/40" />

        <div className="shell relative grid min-h-[88vh] items-center gap-10 py-20 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="mono-label text-teal-glow">Proof · independent panel</p>
            <h2 className="h-display mt-3 font-display">
              Skin that looks like it <span className="italic text-metallic text-metallic-dark">turned back time.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/75">
              Measured, not promised. Every claim on this page comes from a dermatologist-supervised consumer study and
              a lot-tested formula.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <RotatingSeal light size={132} />
              <div className="text-sm text-white/70">
                <p className="mono-label mono-label-plain text-white">Lot 2611-D</p>
                <p>Bottled 09.2026 · pH 5.5 · GHK-Cu 3.0%</p>
                <a href="/verify?lot=2611-D" className="mt-1 inline-block text-teal-glow underline-offset-4 hover:underline">Verify your serum →</a>
              </div>
            </div>
          </Reveal>

          <RevealGroup className="relative hidden aspect-[4/3] lg:block">
            {stats.map((s) => (
              <RevealItem key={s.label} className={`absolute ${s.pos}`}>
                <div className="relative glass-dark rounded-2xl px-5 py-4">
                  <span className="absolute -left-1 -top-1 h-2.5 w-2.5 animate-twinkle rounded-full bg-teal-glow shadow-[0_0_14px_rgba(92,195,184,1)]" />
                  <p className="font-display text-4xl leading-none"><AnimatedCounter value={s.v} suffix={s.suffix} /></p>
                  <p className="mt-1 text-sm text-white/85">{s.label}</p>
                  <p className="mono-label mono-label-plain mt-1 text-[9px] text-white/50">{s.sub}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <RevealGroup className="grid grid-cols-3 gap-3 lg:hidden">
            {stats.map((s) => (
              <RevealItem key={s.label} className="glass-dark rounded-2xl px-3 py-3">
                <p className="font-display text-2xl leading-none"><AnimatedCounter value={s.v} suffix={s.suffix} /></p>
                <p className="mt-1 text-xs text-white/85">{s.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>

      <LabTicker />

      <div className="shell grid items-center gap-10 py-20 lg:grid-cols-2">
        <Reveal>
          <BeforeAfter beforeLabel="Week 0" afterLabel="Week 4" />
        </Reveal>
        <Reveal>
          <p className="mono-label text-teal-glow">Week 0 → week 4</p>
          <h3 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">Drag the line. Watch the light come back.</h3>
          <p className="mt-4 max-w-md text-white/70">
            Illustrative panel from the 4-week study protocol: one drop of GHK-Cu, nightly, after cleansing. Real
            participant imagery drops in here once the client supplies it.
          </p>
          <div className="mt-6"><MagneticLink href="/products/ghk-cu-topical-cosmetic-1g" variant="primary">Start week one</MagneticLink></div>
          <p className="mt-3 text-[11px] text-white/40">*Illustrative claims for concept pitch.</p>
        </Reveal>
      </div>
    </section>
  );
}
