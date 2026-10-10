import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type { Collection, Concern } from "@/lib/commerce/types";
import { faceByConcern } from "@/lib/faces";

// Brand tint per concern, laid over the lower half of each portrait.
const concernTint: Record<Concern, string> = {
  dullness: "from-[#E3B34C]/90 via-[#E3B34C]/40",
  aging: "from-[#4E6AD0]/90 via-[#4E6AD0]/40",
  acne: "from-[#157A73]/90 via-[#157A73]/40",
  redness: "from-[#B9A3DE]/90 via-[#B9A3DE]/40",
  pigmentation: "from-[#B0544C]/90 via-[#B0544C]/40",
  dryness: "from-[#2E3C9E]/90 via-[#2E3C9E]/40",
  pores: "from-[#2FA39A]/90 via-[#2FA39A]/40",
};

/** Shop by concern: six concerns, six women, one line each. The photo does the explaining. */
export function ShopByConcern({ collections }: { collections: Collection[] }) {
  const concerns = collections.filter((c) => c.concern).slice(0, 6);
  return (
    <section className="mesh-light">
      <div className="shell py-20 lg:py-28">
        <SectionHeading
          title={<>Shop by <span className="italic text-gradient">concern</span></>}
          intro="Tell us what your skin needs and we'll point you to the right actives. Every face here has a ritual you can follow."
          size="xl"
          fill
        />
        <RevealGroup className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
          {concerns.map((c, i) => {
            const concern = c.concern as Concern;
            const face = faceByConcern(concern);
            const big = i === 0;
            return (
              <RevealItem key={c.handle} className={big ? "col-span-2 row-span-2" : ""}>
                <Link
                  href={`/collections/${c.handle}`}
                  className={`group relative flex h-full min-h-[16rem] cursor-pointer flex-col justify-end overflow-hidden rounded-[1.75rem] shadow-soft transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1.5 hover:shadow-glow ${big ? "aspect-[4/5] lg:aspect-auto lg:min-h-full" : "aspect-[4/5]"}`}
                >
                  <Image
                    src={face.image}
                    alt={face.alt}
                    fill
                    sizes={big ? "(max-width: 1024px) 92vw, 62vw" : "(max-width: 1024px) 46vw, 31vw"}
                    className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] ${big ? "object-[center_18%]" : "object-top"}`}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${concernTint[concern]} to-transparent`} />
                  <span className="absolute left-4 top-4 rounded-md bg-ink/50 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-white/80 backdrop-blur">
                    {face.name}, {face.age}
                  </span>
                  <div className={`relative p-5 text-white ${big ? "sm:p-8" : ""}`}>
                    <h3 className={`font-display leading-tight ${big ? "text-3xl sm:text-4xl" : "text-2xl"}`}>{c.title}</h3>
                    <p className={`mt-1.5 text-white/85 ${big ? "max-w-sm text-base" : "text-sm"}`}>{c.description}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold">
                      Shop now <ArrowRight size={14} className="transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-wide text-ink-soft/70">Campaign preview imagery</p>
      </div>
    </section>
  );
}
