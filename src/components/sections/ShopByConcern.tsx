import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import type { Collection, Concern } from "@/lib/commerce/types";

// Vivid, iridescent gradient per concern.
const concernGradient: Record<Concern, string> = {
  dullness: "from-[#FBD38D] via-[#F6A97C] to-[#F4785C]",
  aging: "from-[#F7B2C4] via-[#EE8E9E] to-[#C7B5E6]",
  acne: "from-[#BFE3D0] via-[#9FD8C4] to-[#7FC8B6]",
  redness: "from-[#F6C9A6] via-[#F3B99C] to-[#EE9E9E]",
  pigmentation: "from-[#F8D39A] via-[#E8B36A] to-[#E0A93B]",
  dryness: "from-[#C7B5E6] via-[#DCC8EE] to-[#F7D9D4]",
  pores: "from-[#BFE3D0] via-[#CFE5DA] to-[#E7DBF3]",
};

export function ShopByConcern({ collections }: { collections: Collection[] }) {
  const concerns = collections.filter((c) => c.concern).slice(0, 6);
  return (
    <section className="shell py-16">
      <SectionHeading
        eyebrow="Start with your skin"
        title={<>Shop by <span className="text-gradient">concern</span></>}
        intro="Tell us what your skin needs and we'll point you to the right actives."
      />
      <RevealGroup className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
        {concerns.map((c, i) => (
          <RevealItem key={c.handle} className={i === 0 ? "sm:col-span-2" : ""}>
            <TiltCard className="h-full" max={6}>
              <Link
                href={`/collections/${c.handle}`}
                className={`ring-gradient group relative flex h-full min-h-[10rem] flex-col justify-end overflow-hidden rounded-3xl bg-gradient-to-br ${
                  concernGradient[c.concern as Concern]
                } p-6 shadow-soft transition-all duration-300 ease-glow hover:-translate-y-1.5 hover:shadow-glow`}
              >
                <span className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/30 blur-2xl transition-transform duration-500 group-hover:scale-150" />
                <h3 className="relative font-display text-xl text-ink">{c.title}</h3>
                <p className="relative mt-1 text-sm text-ink/70">{c.description}</p>
                <span className="relative mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                  Shop now
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </span>
              </Link>
            </TiltCard>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
