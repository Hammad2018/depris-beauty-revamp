import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCommerce } from "@/lib/commerce";
import { money } from "@/lib/format";
import { site } from "@/lib/content";
import { ProductMedia } from "@/components/commerce/ProductMedia";
import { ProductPurchase } from "@/components/commerce/ProductPurchase";
import { ReviewsPanel } from "@/components/commerce/ReviewsPanel";
import { ClinicalClaim } from "@/components/commerce/ClinicalClaim";
import { CrossSell } from "@/components/commerce/CrossSell";
import { StarRating } from "@/components/ui/StarRating";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Accordion } from "@/components/ui/Accordion";

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    brand: { "@type": "Brand", name: product.brand },
    description: product.description,
    aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviewCount },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency,
      availability: "https://schema.org/InStock",
      url: `${site.url}/products/${product.handle}`,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="shell py-6">
        <nav className="text-sm text-ink-soft">
          <Link href="/shop" className="hover:text-ink">
            Shop
          </Link>{" "}
          / <span className="text-ink">{product.title}</span>
        </nav>
      </div>

      <section className="shell grid gap-10 pb-6 lg:grid-cols-2">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="aspect-square overflow-hidden rounded-3xl">
            <ProductMedia product={product} priority className="h-full w-full" />
          </div>
        </div>

        <div className="flex flex-col">
          <Eyebrow className="text-bronze-deep">{product.brand}</Eyebrow>
          <h1 className="mt-2 font-display text-3xl leading-tight text-ink sm:text-4xl">{product.title}</h1>
          <div className="mt-3">
            <StarRating rating={product.rating} count={product.reviewCount} />
          </div>
          <p className="mt-4 text-lg text-ink-soft">{product.tagline}</p>

          <div className="mt-6">
            <ProductPurchase product={product} />
          </div>

          <p className="mt-4 text-xs text-sage">✓ Authorized retailer · Sourced from Korea · Ships same-day from the US</p>

          {product.heroIngredients.length > 0 && (
            <div className="mt-8">
              <Eyebrow>Key ingredients</Eyebrow>
              <ul className="mt-3 space-y-3">
                {product.heroIngredients.map((ing) => (
                  <li key={ing.name} className="rounded-2xl bg-porcelain/70 p-4">
                    <p className="font-medium text-ink">
                      {ing.name} <span className="font-normal text-ink-soft">— {ing.benefit}</span>
                    </p>
                    <p className="mt-0.5 text-xs text-ink-soft/70">INCI: {ing.inci}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.clinicalClaim && (
            <div className="mt-5">
              <ClinicalClaim claim={product.clinicalClaim} />
              <p className="mt-1.5 text-[11px] text-ink-soft/60">*Illustrative claim for concept pitch.</p>
            </div>
          )}

          <div className="mt-6">
            <Accordion title="How to use" defaultOpen>
              {product.howToUse}
            </Accordion>
            <Accordion title="Description">{product.description}</Accordion>
            <Accordion title="Shipping & returns">
              Ships same-day from Cheyenne, WY. Free US shipping over $50. 30-day returns on unopened items.
            </Accordion>
          </div>
        </div>
      </section>

      {product.reviews && product.reviews.length > 0 && (
        <ReviewsPanel reviews={product.reviews} rating={product.rating} reviewCount={product.reviewCount} />
      )}

      <CrossSell title="Pairs well with" eyebrow="Complete the routine" products={pairs} />
    </>
  );
}
