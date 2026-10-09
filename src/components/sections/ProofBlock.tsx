import Image from "next/image";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { RotatingSeal } from "@/components/ui/RotatingSeal";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MagneticLink } from "@/components/ui/MagneticButton";

/** Facts first: what Depris can say today, from the live store, not invented study data. */
const facts: { v?: number; suffix?: string; text?: string; label: string }[] = [
  { v: 145, suffix: "+", label: "products in the live catalog" },
  { v: 15, suffix: "", label: "categories, skincare to clinic" },
  { text: "Same day", label: "dispatch from Cheyenne, Wyoming" },
];

export function ProofBlock() {
  return (
    <section className="relative overflow-hidden bg-navy-deep text-white">
      <div className="relative">
        <Image src="/renders/skin.webp" alt="" fill sizes="100vw" className="liquid object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/70 to-navy-deep/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-navy-deep/40" />

        <div className="shell relative grid items-center gap-12 py-24 lg:grid-cols-[1fr_1fr] lg:py-32">
          <Reveal>
            <h2 className="h-display font-display">
              Sourced in Korea. Stocked in Wyoming. <span className="italic text-metallic text-metallic-dark">Shipped today.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/75">
              Authorized retailer for every brand on the shelf, with the full range held in the US so nothing waits on a boat.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <RotatingSeal light size={132} />
              <MagneticLink href="/pro" variant="light">For clinics</MagneticLink>
            </div>
          </Reveal>

          <RevealGroup className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 lg:pl-12">
            {facts.map((f) => (
              <RevealItem key={f.label} className="border-l border-white/20 pl-5">
                <p className="font-display text-5xl leading-none">
                  {typeof f.v === "number" ? <AnimatedCounter value={f.v} suffix={f.suffix} /> : f.text}
                </p>
                <p className="mt-2 text-sm text-white/75">{f.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>

      <div className="shell grid items-center gap-10 pb-24 lg:grid-cols-2">
        <Reveal className="relative">
          <BeforeAfter beforeLabel="Week 0" afterLabel="Week 4" />
          <span className="absolute bottom-4 left-4 rounded-md bg-ink/80 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-white/80">Sample imagery</span>
        </Reveal>
        <Reveal>
          <h3 className="font-display text-3xl leading-tight sm:text-4xl">Drag the line. Watch the light come back.</h3>
          <p className="mt-4 max-w-md text-white/70">
            The compare slider is wired and waiting for real participant photography from the client. Until then it shows sample panels.
          </p>
          <div className="mt-6"><MagneticLink href="/products/ghk-cu-topical-cosmetic-1g" variant="primary">Shop GHK-Cu</MagneticLink></div>
        </Reveal>
      </div>
    </section>
  );
}
