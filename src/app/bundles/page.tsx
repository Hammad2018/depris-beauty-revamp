import type { Metadata } from "next";
import { getCommerce } from "@/lib/commerce";
import type { Product, Tone } from "@/lib/commerce/types";
import { PageHero } from "@/components/sections/PageHero";
import { BundleCard } from "@/components/commerce/BundleCard";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Bundles & Routines",
  description: "Curated Korean skincare routines and sets — save when you shop the full ritual.",
};

const bundleSpecs: { title: string; description: string; tone: Tone; discountPct: number; handles: string[] }[] = [
  {
    title: "The Glass-Skin Ritual",
    description: "Our hero routine for dewy, bouncy skin — cleanse to protect.",
    tone: "blush",
    discountPct: 15,
    handles: ["gentle-gel-cleanser", "centella-calming-toner", "ghk-cu-copper-peptide-serum", "glass-skin-moisturizer"],
  },
  {
    title: "Firm & Renew Set",
    description: "Peptides and retinol to smooth fine lines and restore bounce.",
    tone: "bronze",
    discountPct: 15,
    handles: ["ghk-cu-copper-peptide-serum", "retinol-renewal-night-serum", "bellmona-holding-time-tox-cream"],
  },
  {
    title: "Clear & Calm Kit",
    description: "Balance, de-congest and soothe without stripping the barrier.",
    tone: "sage",
    discountPct: 12,
    handles: ["gentle-gel-cleanser", "bellmona-clear-ampoule", "niacinamide-pore-refining-serum"],
  },
  {
    title: "Pro Glow Duo",
    description: "Microneedling device + exosome booster for a clinic-level glow-up.",
    tone: "ink",
    discountPct: 10,
    handles: ["home-microneedling-pen", "2xsome-skin-booster"],
  },
];

export default async function BundlesPage() {
  const commerce = getCommerce();
  const all = await commerce.getProducts();
  const byHandle = new Map(all.map((p) => [p.handle, p]));

  const bundles = bundleSpecs
    .map((b) => ({ ...b, products: b.handles.map((h) => byHandle.get(h)).filter(Boolean) as Product[] }))
    .filter((b) => b.products.length > 0);

  return (
    <>
      <PageHero
        eyebrow="Bundles & routines"
        title="Shop the whole ritual, save on every step"
        intro="Pre-curated routines built by our skin experts — add the full set to your bag in one tap."
      />
      <section className="shell grid gap-6 py-14 lg:grid-cols-2">
        {bundles.map((b) => (
          <BundleCard key={b.title} {...b} />
        ))}
      </section>
      <section className="shell pb-16">
        <div className="rounded-[2.5rem] bg-ink p-10 text-center text-cream">
          <h2 className="font-display text-3xl">Build your own set</h2>
          <p className="mx-auto mt-3 max-w-xl text-cream/70">
            Choose any four full-size products and save 15% automatically. Mix and match for your exact routine.
          </p>
          <div className="mt-6">
            <ButtonLink href="/shop" variant="primary">
              Start building
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
