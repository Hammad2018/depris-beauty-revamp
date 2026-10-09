import { getCommerce } from "@/lib/commerce";
import { Hero } from "@/components/sections/Hero";
import { MarqueeRibbon } from "@/components/ui/MarqueeRibbon";
import { InsideTheDrop } from "@/components/sections/InsideTheDrop";
import { BentoShowcase } from "@/components/sections/BentoShowcase";
import { ShopByConcern } from "@/components/sections/ShopByConcern";
import { ProofBlock } from "@/components/sections/ProofBlock";
import { NightProtocol } from "@/components/sections/NightProtocol";
import { Lookbook } from "@/components/sections/Lookbook";
import { DeprisStandard } from "@/components/sections/DeprisStandard";
import { ProBand } from "@/components/sections/ProBand";
import { PRO_CATEGORIES } from "@/lib/nav";
import { EditorialTeasers } from "@/components/sections/EditorialTeasers";
import { FinaleCTA } from "@/components/sections/FinaleCTA";

export default async function HomePage() {
  const commerce = getCommerce();
  const [bestsellers, collections, featured, all] = await Promise.all([
    commerce.getProducts({ collection: "bestsellers", limit: 4 }),
    commerce.getCollections(),
    commerce.getProduct("ghk-cu-topical-cosmetic-1g"),
    commerce.getProducts(),
  ]);
  const hero = featured ?? bestsellers[0];
  // real product photos for the story sections, keyed by handle
  const pro = ["2xsome-skin-booster", "plenaris-pro-80", "tesoro-collagen", "plenaris-exosome-hgf"]
    .map((h) => all.find((p) => p.handle === h))
    .filter((p): p is NonNullable<typeof p> => Boolean(p) && PRO_CATEGORIES.includes(p!.category));
  const media = Object.fromEntries(all.filter((p) => p.images[0]?.url).map((p) => [p.handle, p.images[0].url as string]));

  // Three acts: dark (the drop, the facts, the night) → light (the shelf, concerns, the ritual,
  // the standard, the journal) → dark (professionals, finale). One deliberate theme switch each way.
  return (
    <>
      <Hero image={hero.images[0]?.url ?? "/renders/sky.webp"} imageAlt={hero.title} />
      <MarqueeRibbon />
      <InsideTheDrop product={hero} />
      <ProofBlock />
      <NightProtocol media={media} />
      <BentoShowcase featured={hero} products={bestsellers} />
      <ShopByConcern collections={collections} />
      <Lookbook media={media} />
      <DeprisStandard />
      <EditorialTeasers />
      <ProBand products={pro} />
      <FinaleCTA />
    </>
  );
}
