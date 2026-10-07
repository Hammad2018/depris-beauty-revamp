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
import { SocialProof } from "@/components/sections/SocialProof";
import { EditorialTeasers } from "@/components/sections/EditorialTeasers";
import { FinaleCTA } from "@/components/sections/FinaleCTA";
import { LotusDivider } from "@/components/ui/LotusDivider";

export default async function HomePage() {
  const commerce = getCommerce();
  const [bestsellers, collections, featured] = await Promise.all([
    commerce.getProducts({ collection: "bestsellers", limit: 4 }),
    commerce.getCollections(),
    commerce.getProduct("ghk-cu-copper-peptide-serum"),
  ]);
  const hero = featured ?? bestsellers[0];

  // Story spine: the drop → what's inside → the edit → proof → the night ritual → the standard.
  return (
    <>
      <Hero />
      <MarqueeRibbon />
      <InsideTheDrop product={hero} />
      <BentoShowcase featured={hero} products={bestsellers} />
      <ShopByConcern collections={collections} />
      <ProofBlock />
      <NightProtocol />
      <Lookbook />
      <DeprisStandard />
      <LotusDivider />
      <SocialProof />
      <EditorialTeasers />
      <FinaleCTA />
    </>
  );
}
