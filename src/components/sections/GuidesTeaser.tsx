import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { guides } from "@/lib/guides";
import { GuideCard } from "@/components/guides/GuideCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Petal } from "@/components/petals/Petal";

/** Guides on the home page: a staggered trio with petal-cut imagery, not three equal cards. */
export function GuidesTeaser() {
  const [lead, second, third] = guides;
  return (
    <section className="relative overflow-hidden">
      <Petal tone="lilac" size={120} shape="leaf" opacity={0.35} className="absolute -left-10 top-24 rotate-[20deg]" />
      <Petal tone="blush" size={80} shape="lotus" opacity={0.4} className="absolute right-[8%] top-10 -rotate-12" />
      <div className="shell relative py-24 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            title={<>Guides, written to be <span className="italic text-gradient">followed</span></>}
            intro="Step by step, with the products linked where they belong. Start where your skin is."
            size="xl"
          />
          <Link href="/guides" className="inline-flex items-center gap-1.5 text-sm font-medium text-camellia hover:underline">
            All six guides <ArrowRight size={14} />
          </Link>
        </div>
        <RevealGroup className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <RevealItem className="lg:col-span-5">
            <GuideCard guide={lead} shape="petal" size="lg" />
          </RevealItem>
          <RevealItem className="lg:col-span-3 lg:col-start-7 lg:mt-24">
            <GuideCard guide={second} shape="lotus" />
          </RevealItem>
          <RevealItem className="relative lg:col-span-3 lg:-mt-6">
            <span className="sticker absolute -right-2 -top-4 z-10 rounded-full bg-gold px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-ink shadow-soft">
              For clinics
            </span>
            <GuideCard guide={third} shape="leaf" />
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
