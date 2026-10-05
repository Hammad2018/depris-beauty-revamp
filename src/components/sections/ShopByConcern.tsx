import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type { Collection, Tone } from "@/lib/commerce/types";

const toneClass: Record<Tone, string> = {
  blush: "from-[#F7D9D4] to-[#FBECE6]",
  bronze: "from-[#EAD6B4] to-[#F5EAD7]",
  sage: "from-[#CBDAC9] to-[#E6EEE2]",
  sand: "from-[#EADBC6] to-[#F5ECDD]",
  ink: "from-[#4A4038] to-[#8A6A3E]",
};

export function ShopByConcern({ collections }: { collections: Collection[] }) {
  const concerns = collections.filter((c) => c.concern).slice(0, 6);
  return (
    <section className="shell py-16">
      <SectionHeading
        eyebrow="Start with your skin"
        title="Shop by concern"
        intro="Tell us what your skin needs and we'll point you to the right actives."
      />
      <RevealGroup className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
        {concerns.map((c, i) => (
          <RevealItem key={c.handle} className={i === 0 ? "sm:col-span-2 sm:row-span-1" : ""}>
            <Link
              href={`/collections/${c.handle}`}
              className={`group flex h-full min-h-[9rem] flex-col justify-end rounded-3xl bg-gradient-to-br ${
                toneClass[c.tone ?? "blush"]
              } p-6 transition-all duration-300 ease-glow hover:-translate-y-1 hover:shadow-glow`}
            >
              <h3 className="font-display text-xl text-ink">{c.title}</h3>
              <p className="mt-1 text-sm text-ink-soft">{c.description}</p>
              <span className="mt-3 text-sm font-medium text-camellia">Shop now →</span>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
