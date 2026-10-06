import { MagneticLink } from "@/components/ui/MagneticButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { scienceIngredients } from "@/lib/content";
import type { Tone } from "@/lib/commerce/types";

const dot: Record<Tone, string> = {
  blush: "bg-rose",
  bronze: "bg-gold",
  sage: "bg-mint",
  sand: "bg-peach",
  ink: "bg-ink",
};

const stats = [
  { value: 145, suffix: "+", label: "Advanced formulas" },
  { value: 92, suffix: "%", label: "See firmer skin*" },
  { value: 24, suffix: "h", label: "Same-day dispatch" },
];

export function ActivesSpotlight() {
  return (
    <section className="relative overflow-hidden bg-ink text-cream">
      <AuroraBackground tone="dark" className="opacity-60" />
      <div className="shell relative py-20">
        <div className="max-w-2xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="index-num font-display italic text-white/70" style={{ WebkitTextStroke: "1.2px rgba(92,195,184,0.7)" }}>
              03
            </span>
            <p className="eyebrow text-teal-glow">The science</p>
          </div>
          <h2 className="h-display font-display">
            Actives most brands <span className="italic text-gradient">can&apos;t formulate</span>
          </h2>
          <p className="mt-5 text-lg text-cream/70">
            Copper peptides, exosomes and pro-grade skin boosters — clinic-level science, made for your bathroom shelf.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-4 sm:max-w-xl">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl glass-dark p-4 text-center">
              <p className="font-display text-3xl text-cream">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-xs text-cream/60">{s.label}</p>
            </div>
          ))}
        </div>

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2">
          {scienceIngredients.map((ing) => (
            <RevealItem key={ing.name}>
              <div className="ring-gradient group h-full rounded-3xl glass-dark p-6 transition-transform duration-300 hover:-translate-y-1">
                <span className={`inline-block h-2.5 w-2.5 rounded-full ${dot[ing.tone]}`} />
                <h3 className="mt-4 font-display text-xl">{ing.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/70">{ing.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-10">
          <MagneticLink href="/science" variant="primary">
            Explore the science
          </MagneticLink>
        </div>
      </div>
    </section>
  );
}
