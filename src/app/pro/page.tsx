import type { Metadata } from "next";
import Link from "next/link";
import { getCommerce } from "@/lib/commerce";
import { PRO_CATEGORIES } from "@/lib/nav";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { LabTicker } from "@/components/ui/LabTicker";
import { MagneticLink } from "@/components/ui/MagneticButton";

export const metadata: Metadata = {
  title: "For professionals",
  description: "Mesotherapy, skin boosters, microneedling, fillers, exosomes and clinic supplies — Depris Beauty's professional range.",
};

const pillars = [
  { k: "Cold-chain, same-day", v: "Boosters and exosomes ship on ice from Wyoming before the 3pm cutoff." },
  { k: "Lot-traceable", v: "Every vial carries a lot code you can verify online." },
  { k: "Trade pricing", v: "Volume tiers and standing orders for clinics and medspas." },
];

export default async function ProPage() {
  const commerce = getCommerce();
  const [all, collections] = await Promise.all([commerce.getProducts(), commerce.getCollections()]);
  const groups = PRO_CATEGORIES.map((h) => ({
    collection: collections.find((c) => c.handle === h),
    products: all.filter((p) => p.category === h),
  })).filter((g) => g.collection && g.products.length);

  return (
    <>
      <section className="celestial text-white">
        <div className="shell grid gap-10 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:py-24">
          <div>
            <p className="mono-label text-teal-glow">For professionals</p>
            <h1 className="h-hero mt-4 font-display">Clinic-grade, <span className="italic text-metallic text-metallic-dark">clinic-fast.</span></h1>
            <p className="mt-6 max-w-lg text-lg text-white/75">
              The same Korean mesotherapy, booster and device lines you use in-clinic — stocked in the US, shipped cold the same day.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticLink href="/contact" variant="primary">Open a trade account</MagneticLink>
              <MagneticLink href="/collections/mesotherapy-skin-boosters" variant="light">Browse boosters</MagneticLink>
            </div>
          </div>
          <RevealGroup className="grid gap-3">
            {pillars.map((p) => (
              <RevealItem key={p.k} className="glass-dark rounded-2xl px-5 py-4">
                <p className="mono-label text-teal-glow">{p.k}</p>
                <p className="mt-1.5 text-sm text-white/75">{p.v}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
        <LabTicker items={["COLD-CHAIN", "LOT-TRACEABLE", "SAME-DAY DISPATCH", "TRADE PRICING", "KOREAN-SOURCED", "AUTHORIZED RETAILER"]} />
      </section>

      <section className="mesh-light">
        <div className="shell space-y-16 py-16">
          {groups.map((g, i) => (
            <Reveal key={g.collection!.handle}>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3"><span className="index-num font-display italic">{String(i + 1).padStart(2, "0")}</span><span className="sheen-line w-12" /></div>
                  <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">{g.collection!.title}</h2>
                  <p className="mt-2 max-w-xl text-ink-soft">{g.collection!.description}</p>
                </div>
                <Link href={`/collections/${g.collection!.handle}`} className="text-sm text-camellia underline-offset-4 hover:underline">View category →</Link>
              </div>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {g.products.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            </Reveal>
          ))}
          <p className="text-xs text-ink-soft/70">Professional products are intended for trained practitioners. Illustrative pitch build — trade terms to be confirmed by Depris Beauty.</p>
        </div>
      </section>
    </>
  );
}
