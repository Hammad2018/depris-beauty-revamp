import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarBlank } from "@phosphor-icons/react/dist/ssr";
import { getCommerce } from "@/lib/commerce";
import { realReviews } from "@/lib/reviews";
import { events, hashtags, rituals } from "@/lib/community";
import { VoiceCard } from "@/components/community/VoiceCard";
import { RitualCard } from "@/components/community/RitualCard";
import { ShareRitualForm } from "@/components/community/ShareRitualForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem, Reveal } from "@/components/ui/Reveal";
import { Starfield } from "@/components/ui/Starfield";
import { FloatingPetals } from "@/components/ui/FloatingPetals";
import { PetalSeam } from "@/components/petals/PetalSeam";
import { PetalBullet } from "@/components/petals/Petal";
import { PRO_CATEGORIES } from "@/lib/nav";

export const metadata: Metadata = {
  title: "The Depris Circle",
  description: "Customer voices, member rituals, live sessions and the clinic corner. Share your ritual with the Depris Beauty community.",
};

export default async function CommunityPage() {
  const all = await getCommerce().getProducts();
  const titles = Object.fromEntries(all.map((p) => [p.handle, p.title]));
  const consumer = all.filter((p) => !PRO_CATEGORIES.includes(p.category) && p.category !== "gift-cards").map((p) => ({ handle: p.handle, title: p.title }));
  const tilts = [-2, 2.5, -1.5, 2];
  return (
    <>
      <section className="celestial relative overflow-hidden text-white">
        <Starfield />
        <FloatingPetals />
        <div className="shell relative flex min-h-[60vh] flex-col justify-center py-24">
          <p className="mono-label text-teal-glow">The Depris Circle</p>
          <h1 className="h-hero mt-4 max-w-4xl font-display">Skin is personal. <span className="italic text-metallic text-metallic-dark">Rituals are shared.</span></h1>
          <p className="mt-6 max-w-lg text-lg text-white/75">Real voices from the live store, member rituals with the products tagged, monthly lives, and a corner for clinics.</p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {hashtags.map((h) => <li key={h} className="rounded-full glass-dark px-3 py-1 font-mono text-xs text-white/85">{h}</li>)}
          </ul>
        </div>
      </section>

      <section className="relative">
        <PetalSeam position="top" />
        <div className="shell py-20 lg:py-28">
          <SectionHeading title={<>Voices from the <span className="italic text-gradient">store</span></>} intro="Verified reviews on deprisbeauty.com, linked to the product they are about." size="xl" fill />
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {realReviews.map((r, i) => <RevealItem key={r.id} className={i % 2 ? "lg:mt-10" : ""}><VoiceCard r={r} /></RevealItem>)}
          </RevealGroup>
        </div>
      </section>

      <section className="mesh-tint">
        <div className="shell py-20 lg:py-28">
          <SectionHeading title={<>Member <span className="italic text-gradient">rituals</span></>} intro="Morning and night, in members' own words, with every product tagged so you can follow along. Sample stories for now; yours could be next." size="xl" />
          <RevealGroup className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
            {rituals.map((r, i) => <RevealItem key={r.id} className={i % 2 ? "lg:mt-14" : ""}><RitualCard r={r} titles={titles} tilt={tilts[i]} /></RevealItem>)}
          </RevealGroup>
        </div>
      </section>

      <section className="shell grid gap-12 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:py-28">
        <Reveal>
          <p className="mono-label text-camellia">Coming up</p>
          <h2 className="h-display mt-3 font-display text-ink">Lives and <span className="italic text-gradient">clinic hours.</span></h2>
          <ul className="mt-8 space-y-5">
            {events.map((e) => (
              <li key={e.id} className="flex gap-4 border-b border-sand pb-5">
                <span className="inline-flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-2xl bg-ink text-white">
                  <span className="font-mono text-[10px] uppercase">{new Date(e.date).toLocaleString("en-US", { month: "short" })}</span>
                  <span className="font-display text-lg leading-none">{new Date(e.date).getDate()}</span>
                </span>
                <div>
                  <p className="font-display text-xl text-ink">{e.title}</p>
                  <p className="text-sm text-ink-soft">{e.blurb}</p>
                  <p className="mt-1 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-camellia"><CalendarBlank size={12} />{e.kind}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 r-leaf bg-navy-deep p-6 text-white">
            <p className="mono-label mono-label-plain text-teal-glow">Clinic corner</p>
            <p className="mt-2 font-display text-2xl">Professionals get their own line.</p>
            <ul className="mt-3 space-y-1.5 text-sm text-white/75">
              <li className="flex gap-2"><PetalBullet tone="jade" />Protocol Q&amp;A with the team, monthly</li>
              <li className="flex gap-2"><PetalBullet tone="jade" />Volume pricing and priority cold-chain dispatch</li>
              <li className="flex gap-2"><PetalBullet tone="jade" />Early access to new boosters</li>
            </ul>
            <Link href="/pro" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-teal-glow hover:underline">For clinics <ArrowRight size={14} /></Link>
          </div>
        </Reveal>
        <Reveal>
          <div id="share" className="scroll-mt-28" />
          <p className="mono-label text-camellia">Your turn</p>
          <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">Share your ritual</h2>
          <p className="mt-3 max-w-md text-ink-soft">Tell us the order, the products and what changed. We feature a few each month in the Drop.</p>
          <div className="mt-6"><ShareRitualForm productTitles={consumer} /></div>
        </Reveal>
      </section>
    </>
  );
}
