import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCommerce } from "@/lib/commerce";
import { site } from "@/lib/content";
import { lots } from "@/lib/renders";
import { ProductPurchase } from "@/components/commerce/ProductPurchase";
import { ReviewsPanel } from "@/components/commerce/ReviewsPanel";
import { ClinicalClaim } from "@/components/commerce/ClinicalClaim";
import { CrossSell } from "@/components/commerce/CrossSell";
import { StarRating } from "@/components/ui/StarRating";
import { Accordion } from "@/components/ui/Accordion";
import { LabTicker } from "@/components/ui/LabTicker";
import { RotatingSeal } from "@/components/ui/RotatingSeal";
import { Reveal } from "@/components/ui/Reveal";
import { ProductStage } from "@/components/product/ProductStage";
import { IngredientDossier } from "@/components/product/IngredientDossier";
import { DispatchCountdown } from "@/components/product/DispatchCountdown";
import { StickyBuyBar } from "@/components/product/StickyBuyBar";
import { PotencyCertificate } from "@/components/product/PotencyCertificate";
import { FeaturedIn } from "@/components/product/FeaturedIn";
import { IngredientChips } from "@/components/product/IngredientChips";
import { WishlistButton } from "@/components/personal/WishlistButton";
import { ViewTracker } from "@/components/personal/ViewTracker";
import { PersonalShelf } from "@/components/personal/PersonalShelf";
import { PetalSeam } from "@/components/petals/PetalSeam";
import { reviewsFor, summarize } from "@/lib/reviews";

export async function generateStaticParams() {
  const products = await getCommerce().getProducts();
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: { params: { handle: string } }): Promise<Metadata> {
  const product = await getCommerce().getProduct(params.handle);
  if (!product) return { title: "Product" };
  return {
    title: product.title,
    description: product.tagline || product.description,
    openGraph: { title: product.title, description: product.tagline },
  };
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const commerce = getCommerce();
  const product = await commerce.getProduct(params.handle);
  if (!product) notFound();

  const pairs = (
    await Promise.all((product.pairsWith ?? []).map((h) => commerce.getProduct(h)))
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  const reviews = reviewsFor(product.handle);
  const summary = summarize(reviews);
  const realOnly = reviews.filter((r) => !r.sample);
  const all = await commerce.getProducts();

  const lotEntry = Object.values(lots).find((l) => l.handle === product.handle);
  const lotId = lotEntry?.lot ?? "2611-D";
  const lot = lots[lotId];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    brand: { "@type": "Brand", name: product.brand },
    description: product.description,
    ...(realOnly.length > 0
      ? { aggregateRating: { "@type": "AggregateRating", ratingValue: summarize(realOnly).average, reviewCount: realOnly.length } }
      : {}),
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency,
      availability: "https://schema.org/InStock",
      url: `${site.url}/products/${product.handle}`,
    },
  };

  const ticker = [
    `LOT ${lot.lot}`, `pH ${lot.ph}`, lot.assay.toUpperCase(), `BOTTLED ${lot.bottled.slice(0, 7)}`,
    "DERM-TESTED", "FRAGRANCE-FREE", product.routineStep.toUpperCase() + " STEP", "FORMULATED IN KOREA",
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ViewTracker handle={product.handle} />

      {/* Stage */}
      <section className="celestial relative overflow-hidden text-white">
        <div className="shell pt-5">
          <nav className="text-xs text-white/60">
            <Link href="/shop" className="inline-block py-2 pr-1 hover:text-white">Shop</Link> / <span className="text-white/90">{product.title}</span>
          </nav>
        </div>
        <div className="shell grid items-start gap-10 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-12">
          <ProductStage product={product} lotId={lotId} />

          <div className="lg:sticky lg:top-24">
            <p className="mono-label text-teal-glow">{product.brand} · {product.category.replace(/-/g, " ")}</p>
            <h1 className="mt-3 font-display text-4xl leading-[1.02] sm:text-5xl">{product.title}</h1>
            <div className="mt-3 flex items-center gap-4 text-white/80">
              <a href="#reviews" className="hover:text-white"><StarRating rating={summary.average} count={summary.count} /></a>
              {summary.hasSample && <span className="font-mono text-[10px] uppercase tracking-wide text-white/50">includes sample reviews</span>}
            </div>
            <p className="mt-4 text-lg text-white/75">{product.tagline}</p>
            <div className="mt-4"><IngredientChips ingredients={product.ingredients} /></div>

            <div id="buy-box" className="glass-strong mt-6 rounded-3xl p-5 text-ink sm:p-6">
              <div className="flex items-start gap-3">
                <div className="min-w-0 flex-1"><ProductPurchase product={product} /></div>
                <WishlistButton handle={product.handle} className="mt-0.5 shrink-0" />
              </div>
              <DispatchCountdown className="mt-4" />
            </div>

            <div className="mt-5 flex items-center gap-4 text-sm text-white/70">
              <RotatingSeal light size={92} />
              <div>
                <p className="mono-label mono-label-plain text-white">Lot {lot.lot} · verified</p>
                <p>Authorized retailer · Sourced from Korea · Ships same-day from the US</p>
                <Link href={`/verify?lot=${lot.lot}`} className="text-teal-glow underline-offset-4 hover:underline">Verify your serum →</Link>
              </div>
            </div>
          </div>
        </div>
        <LabTicker items={ticker} />
      </section>

      {/* Dossier + proof */}
      <section className="mesh-light relative">
        <PetalSeam position="top" />
        <div className="shell grid gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <h2 className="sr-only">Ingredients and how to use</h2>
            <IngredientDossier ingredients={product.heroIngredients} />
            <div className="mt-8">
              <Accordion title="How to use" defaultOpen>{product.howToUse}</Accordion>
              <Accordion title="Description">{product.description}</Accordion>
              <Accordion title="Shipping & returns">
                Ships same-day from Cheyenne, WY in an insulated mailer. Free US shipping over $50. 30-day returns on unopened items.
              </Accordion>
            </div>
          </Reveal>
          <Reveal>
            {product.clinicalClaim && (
              <div className="mb-6">
                <ClinicalClaim claim={product.clinicalClaim} />
                <p className="mt-1.5 text-[11px] text-ink-soft/60">*Illustrative claim for concept pitch.</p>
              </div>
            )}
            <PotencyCertificate lot={lot} compact />
          </Reveal>
        </div>
      </section>

      <ReviewsPanel reviews={reviews} productTitle={product.title} />
      <FeaturedIn handle={product.handle} />
      <CrossSell title="Pairs well with" eyebrow="Complete the ritual" products={pairs} />
      <PersonalShelf products={all} exclude={product.handle} compact />
      <StickyBuyBar product={product} />
    </>
  );
}
