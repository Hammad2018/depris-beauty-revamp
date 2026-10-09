import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { realReviews } from "@/lib/reviews";
import { rituals } from "@/lib/community";
import { VoiceCard } from "./VoiceCard";
import { RitualCard } from "./RitualCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Petal } from "@/components/petals/Petal";

/** Home teaser for the Depris Circle: real store voices, two member rituals, an invitation. */
export function CircleSection({ titles }: { titles: Record<string, string> }) {
  const voices = realReviews.slice(0, 3);
  const [a, b] = rituals;
  return (
    <section className="relative overflow-hidden mesh-tint">
      <Petal tone="periwinkle" size={160} shape="drop" opacity={0.25} className="absolute -right-12 bottom-10 rotate-[30deg]" />
      <div className="shell relative py-24 lg:py-32">
        <SectionHeading
          title={<>The Depris <span className="italic text-gradient">Circle</span></>}
          intro="Real customers, real clinics, their rituals in their words. Join in, share yours, and read the voices on the live store."
          size="xl"
          fill
        />
        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <RevealGroup className="grid gap-5 lg:col-span-5">
            {voices.map((r) => (
              <RevealItem key={r.id}><VoiceCard r={r} /></RevealItem>
            ))}
            <RevealItem>
              <Link href="/community" className="inline-flex items-center gap-1.5 text-sm font-medium text-camellia hover:underline">
                Enter the Circle <ArrowRight size={14} />
              </Link>
            </RevealItem>
          </RevealGroup>
          <RevealGroup className="grid grid-cols-2 gap-6 lg:col-span-7 lg:gap-8 lg:pl-8">
            {a && <RevealItem className="lg:mt-12"><RitualCard r={a} titles={titles} tilt={-2} /></RevealItem>}
            {b && <RevealItem><RitualCard r={b} titles={titles} tilt={2.5} /></RevealItem>}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
