import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { scienceIngredients } from "@/lib/content";
import type { Tone } from "@/lib/commerce/types";

const dot: Record<Tone, string> = {
  blush: "bg-blush",
  bronze: "bg-bronze",
  sage: "bg-sage",
  sand: "bg-sand",
  ink: "bg-ink",
};

export function ActivesSpotlight() {
  return (
    <section className="bg-ink text-cream">
      <div className="shell py-20">
        <div className="max-w-2xl">
          <p className="eyebrow text-blush">The Depris difference</p>
          <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
            Cosmeceutical actives most brands can&apos;t formulate
          </h2>
          <p className="mt-4 text-cream/70">
            Copper peptides, exosomes and pro-grade skin boosters — clinic-level science, made for your bathroom shelf.
          </p>
        </div>
        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2">
          {scienceIngredients.map((ing) => (
            <RevealItem key={ing.name}>
              <div className="h-full rounded-3xl border border-cream/10 bg-cream/[0.04] p-6">
                <span className={`inline-block h-2.5 w-2.5 rounded-full ${dot[ing.tone]}`} />
                <h3 className="mt-4 font-display text-xl">{ing.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/70">{ing.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
        <div className="mt-10">
          <ButtonLink href="/science" variant="primary">
            Explore the science
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
