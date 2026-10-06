import { getCommerce } from "@/lib/commerce";
import { Hero } from "@/components/sections/Hero";
import { ShopByConcern } from "@/components/sections/ShopByConcern";
import { BentoShowcase } from "@/components/sections/BentoShowcase";
import { FeatureBand } from "@/components/sections/FeatureBand";
import { Lookbook } from "@/components/sections/Lookbook";
import { StickySteps } from "@/components/sections/StickySteps";
import { ActivesSpotlight } from "@/components/sections/ActivesSpotlight";
import { ResultsSection } from "@/components/sections/ResultsSection";
import { SocialProof } from "@/components/sections/SocialProof";
import { EditorialTeasers } from "@/components/sections/EditorialTeasers";
import { FinaleCTA } from "@/components/sections/FinaleCTA";
import { TrustBand } from "@/components/commerce/TrustBand";
import { MarqueeRibbon } from "@/components/ui/MarqueeRibbon";
import { LotusDivider } from "@/components/ui/LotusDivider";

export default async function HomePage() {
  const commerce = getCommerce();
  const [bestsellers, collections, featured] = await Promise.all([
    commerce.getProducts({ collection: "bestsellers", limit: 4 }),
    commerce.getCollections(),
    commerce.getProduct("ghk-cu-copper-peptide-serum"),
  ]);
  const hero = featured ?? bestsellers[0];

  return (
    <>
      <Hero />
      <MarqueeRibbon />

      {/* 01 — light mesh */}
      <ShopByConcern collections={collections} />

      {/* 02 — bento edit (tint) */}
      <BentoShowcase featured={hero} products={bestsellers} />

      {/* pinned promise — dark celestial */}
      <FeatureBand />

      {/* horizontal lookbook (tint, duotone) */}
      <Lookbook />

      {/* how it works — sticky steps (light mesh) */}
      <StickySteps />

      {/* 03 — the science (dark) */}
      <ActivesSpotlight />

      {/* 04 — real results (warm) */}
      <ResultsSection />

      <LotusDivider />

      {/* trust strip (light) */}
      <section className="shell pb-6">
        <TrustBand />
      </section>

      {/* 05 — social proof */}
      <SocialProof />

      {/* 06 — editorial */}
      <EditorialTeasers />

      <FinaleCTA />
    </>
  );
}
