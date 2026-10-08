import type { Metadata } from "next";
import Image from "next/image";
import { ScienceJourney } from "@/components/science/ScienceJourney";
import { ActivesTriptych } from "@/components/science/ActivesTriptych";
import { LabTicker } from "@/components/ui/LabTicker";
import { RotatingSeal } from "@/components/ui/RotatingSeal";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MagneticLink } from "@/components/ui/MagneticButton";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { scienceIngredients } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Science",
  description: "The advanced actives behind Depris Beauty — copper peptides, exosomes and skin boosters, explained one drop at a time.",
};

const stats = [
  { v: 3, suffix: ".0%", label: "GHK-Cu, the studied dose" },
  { v: 84, suffix: "", label: "participants, 12-week panel" },
  { v: 5, suffix: ".5", label: "pH — barrier-friendly" },
];

export default function SciencePage() {
  return (
    <>
      <section className="relative min-h-[80vh] overflow-hidden bg-navy-deep text-white">
        <Image src="/renders/drop.webp" alt="" fill priority sizes="100vw" className="object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/50 to-transparent" />
        <div className="shell relative flex min-h-[80vh] flex-col justify-center py-24">
          <p className="mono-label text-teal-glow">The science</p>
          <h1 className="h-hero mt-4 max-w-3xl font-display">
            The science of <span className="italic text-metallic text-metallic-dark">one drop.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-white/75">
            We lead with the ingredients that move the needle — and show you the molecule, the signal and the certificate behind every claim.
          </p>
          <RevealGroup className="mt-10 grid max-w-xl grid-cols-3 gap-4">
            {stats.map((s) => (
              <RevealItem key={s.label}>
                <p className="font-display text-4xl"><AnimatedCounter value={s.v} suffix={s.suffix} /></p>
                <p className="mt-1 text-xs text-white/65">{s.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
        <LabTicker />
      </section>

      <ScienceJourney />
      <ActivesTriptych />

      <section className="mesh-light">
        <div className="shell py-20">
          <Reveal>
            <p className="mono-label text-camellia">The dossier index</p>
            <h2 className="h-display mt-3 font-display text-ink">Every active, <span className="italic text-gradient">explained simply.</span></h2>
          </Reveal>
          <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2">
            {scienceIngredients.map((ing, i) => (
              <RevealItem key={ing.name} className="group rounded-3xl border border-ink/10 bg-porcelain/70 p-7 shadow-soft transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-lift">
                <div className="flex items-center gap-3">
                  <span className="index-num font-display italic">{String(i + 1).padStart(2, "0")}</span>
                  <span className="sheen-line w-12" />
                </div>
                <h3 className="mt-4 font-display text-2xl text-ink">{ing.name}</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{ing.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="celestial text-white">
        <div className="shell flex flex-col items-center gap-6 py-20 text-center">
          <RotatingSeal light size={140} />
          <h2 className="h-display font-display">Proof you can <span className="italic text-metallic text-metallic-dark">look up.</span></h2>
          <p className="max-w-md text-white/75">Every carton carries a lot code. Type it in and read the certificate behind your bottle.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <MagneticLink href="/verify" variant="primary">Verify a lot</MagneticLink>
            <MagneticLink href="/quiz" variant="light">Build my ritual</MagneticLink>
          </div>
        </div>
      </section>
    </>
  );
}
