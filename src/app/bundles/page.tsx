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
    handles: ["glutanex-glow-therapy-toner", "ghk-cu-topical-cosmetic-1g", "glutanex-snow-white-cream-50ml", "bellmona-cc-cream-sunscreen-50ml"],
  },
  {
    title: "Firm & Renew Set",
    description: "Copper peptide, glutathione night serum and PDRN eye patches to smooth and restore bounce.",
    tone: "bronze",
    discountPct: 15,
    handles: ["ghk-cu-topical-cosmetic-1g", "glutanex-night-serum-30ml", "puri-eyes-pdrn-eye-patch"],
  },
  {
    title: "Glow Reset Kit",
    description: "Prep, brighten and glow — a gentle weekly reset.",
    tone: "sage",
    discountPct: 12,
    handles: ["glutanex-glow-therapy-toner", "medisco-skin-glow-mask-100ml", "glutanex-snow-white-cream-50ml"],
  },
  {
    title: "Pro Glow Duo",
    description: "HA skin booster + exosome booster for a clinic-level glow-up (professional use).",
    tone: "ink",
    discountPct: 10,
    handles: ["plenaris-pro-80", "2xsome-skin-booster"],
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
