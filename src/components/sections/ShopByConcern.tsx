import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import type { Collection, Concern } from "@/lib/commerce/types";

// Vivid, brand-aligned gradient per concern (teal / periwinkle / blush / lavender / gold).
const concernGradient: Record<Concern, string> = {
  dullness: "from-[#F6E0A6] via-[#ECCB86] to-[#E3B34C]",
  aging: "from-[#F4C9C2] via-[#DDB4D2] to-[#B9A3DE]",
  acne: "from-[#BFE8DF] via-[#8FD6CA] to-[#5CC3B8]",
  redness: "from-[#F4D0C8] via-[#E2C3D6] to-[#C9B6E4]",
  pigmentation: "from-[#F6DCA0] via-[#EACF8E] to-[#E3B34C]",
  dryness: "from-[#C9D4F6] via-[#A9BAEF] to-[#8E9FE6]",
  pores: "from-[#BFE8DF] via-[#B9D2EC] to-[#AFC3F2]",
};

export function ShopByConcern({ collections }: { collections: Collection[] }) {
  const concerns = collections.filter((c) => c.concern).slice(0, 6);
  return (
    <section className="mesh-light">
      <div className="shell py-20 lg:py-28">
        <SectionHeading
          title={<>Shop by <span className="italic text-gradient">concern</span></>}
          intro="Tell us what your skin needs and we'll point you to the right actives."
          size="xl"
        />
        <RevealGroup className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
        {concerns.map((c, i) => (
          <RevealItem key={c.handle} className={i === 0 ? "sm:col-span-2" : ""}>
            <TiltCard className="h-full" max={6}>
              <Link
                href={`/collections/${c.handle}`}
                className={`ring-gradient group relative flex h-full min-h-[10rem] flex-col justify-end overflow-hidden rounded-3xl bg-gradient-to-br ${
                  concernGradient[c.concern as Concern]
                } p-6 shadow-soft transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1.5 hover:shadow-glow`}
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
      </div>
    </section>
  );
}
