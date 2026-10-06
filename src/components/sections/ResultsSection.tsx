import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

const stats = [
  { value: 92, suffix: "%", label: "saw firmer-looking skin" },
  { value: 88, suffix: "%", label: "saw brighter skin in 2 weeks" },
  { value: 4, suffix: " wks", label: "to visible results" },
];

/** Warm gold-champagne "real results" band with a draggable before/after. */
export function ResultsSection() {
  return (
    <section
      style={{
        background:
          "radial-gradient(50% 60% at 90% 0%, rgba(227,179,76,0.22) 0%, rgba(251,246,236,0) 60%), radial-gradient(45% 60% at 5% 100%, rgba(231,154,144,0.18) 0%, rgba(251,246,236,0) 60%), #FBF6EC",
      }}
    >
      <div className="shell grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <SectionHeading
            index="04"
            eyebrow="Real results"
            title={<>Skin that looks like it <span className="italic text-gradient">turned back time</span></>}
            intro="Drag the slider. Clinically-backed actives, measured over four weeks of use."
            size="xl"
          />
          <div className="mt-10 grid grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl glass-strong p-4">
                <p className="font-display text-3xl text-ink sm:text-4xl">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-xs text-ink-soft">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[11px] text-ink-soft/60">*Illustrative figures for concept pitch.</p>
          <div className="mt-8">
            <ButtonLink href="/products/ghk-cu-copper-peptide-serum" variant="primary">Shop the signature serum</ButtonLink>
          </div>
        </div>
        <Reveal>
          <BeforeAfter beforeLabel="Week 0" afterLabel="Week 4" />
        </Reveal>
      </div>
    </section>
  );
}
