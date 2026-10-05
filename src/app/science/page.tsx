import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { scienceIngredients } from "@/lib/content";
import type { Tone } from "@/lib/commerce/types";

const toneClass: Record<Tone, string> = {
  blush: "from-[#F7D9D4] to-[#FBECE6]",
  bronze: "from-[#EAD6B4] to-[#F5EAD7]",
  sage: "from-[#CBDAC9] to-[#E6EEE2]",
  sand: "from-[#EADBC6] to-[#F5ECDD]",
  ink: "from-[#4A4038] to-[#8A6A3E]",
};

export const metadata: Metadata = {
  title: "The Science",
  description: "The advanced actives behind Depris Beauty — copper peptides, exosomes and skin boosters, explained.",
};

export default function SciencePage() {
  return (
    <>
      <PageHero
        eyebrow="The science"
        title="Clinic-grade actives, explained simply"
        intro="We lead with the ingredients that actually move the needle — and tell you exactly what they do."
      />
      <section className="shell space-y-6 py-14">
        {scienceIngredients.map((ing, i) => (
          <Reveal key={ing.name}>
            <div className={`grid items-center gap-6 rounded-3xl p-8 sm:grid-cols-[1fr_1.4fr] ${i % 2 ? "sm:[direction:rtl]" : ""}`}>
              <div className={`aspect-[4/3] rounded-3xl bg-gradient-to-br ${toneClass[ing.tone]} [direction:ltr]`} />
              <div className="[direction:ltr]">
                <h2 className="font-display text-2xl text-ink">{ing.name}</h2>
                <p className="mt-3 leading-relaxed text-ink-soft">{ing.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </section>
      <section className="shell pb-16 text-center">
        <SectionHeading
          align="center"
          eyebrow="Not sure where to start?"
          title="Let the quiz match you to the right actives"
          className="mb-6"
        />
        <ButtonLink href="/quiz" variant="primary">
          Take the skin quiz
        </ButtonLink>
      </section>
    </>
  );
}
