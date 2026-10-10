import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { guides } from "@/lib/guides";
import { GuideCard } from "@/components/guides/GuideCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { PetalBullet } from "@/components/petals/Petal";

/** Guides on the home page: one lead story with its card overlapping the photo, three rows beside it. */
export function GuidesTeaser() {
  const [lead, ...rest] = guides;
  return (
    <section className="relative overflow-hidden">
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

        <RevealGroup className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-10">
          <RevealItem className="lg:col-span-7">
            <GuideCard guide={lead} layout="lead" />
          </RevealItem>
          <div className="grid content-start gap-9 lg:col-span-5 lg:pt-6">
            {rest.slice(0, 3).map((g) => (
              <RevealItem key={g.slug}><GuideCard guide={g} layout="row" /></RevealItem>
            ))}
            <RevealItem>
              <ul className="flex flex-wrap gap-x-5 gap-y-1.5 border-t border-sand pt-5 text-sm text-ink-soft">
                <li className="flex items-center gap-1.5"><PetalBullet tone="jade" className="mt-0" />Every step links its product</li>
                <li className="flex items-center gap-1.5"><PetalBullet tone="blush" className="mt-0" />Written for first-timers and clinics</li>
                <li className="flex items-center gap-1.5"><PetalBullet tone="lilac" className="mt-0" />Reviewed with you before launch</li>
              </ul>
            </RevealItem>
          </div>
        </RevealGroup>
      </div>
    </section>
  );
}
