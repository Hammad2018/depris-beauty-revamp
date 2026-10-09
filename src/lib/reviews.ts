import type { Concern, Review, SkinType } from "@/lib/commerce/types";
import wooReviews from "@/lib/commerce/seed/woo-reviews.json";

/** A review with provenance. Real ones come from the deprisbeauty.com store API snapshot. */
export interface SourcedReview extends Review {
  id: string;
  sample?: boolean;
  product: { handle: string; title: string; image?: string; external?: string };
}

type Raw = (typeof wooReviews)["reviews"][number];

function fromWoo(r: Raw): SourcedReview {
  return {
    id: `woo-${r.id}`,
    author: r.author.replace(/\d{2,}$/, "").replace(/^\w/, (c) => c.toUpperCase()) || r.author,
    rating: r.rating,
    skinType: "normal",
    title: r.body.split(/[.!?]/)[0].slice(0, 60),
    body: r.body,
    verified: Boolean(r.verified),
    date: r.date,
    product: { handle: r.productSlug, title: r.productName, image: r.productImage, external: r.productUrl },
  };
}

/** Real customer reviews, newest first. */
export const realReviews: SourcedReview[] = wooReviews.reviews.map(fromWoo).sort((a, b) => (a.date < b.date ? 1 : -1));

const S = (
  handle: string,
  title: string,
  author: string,
  rating: number,
  skinType: SkinType,
  concern: Concern,
  head: string,
  body: string,
  date: string,
): SourcedReview => ({
  id: `sample-${handle}-${author}`,
  sample: true,
  author,
  rating,
  skinType,
  concern,
  title: head,
  body,
  verified: true,
  date,
  product: { handle, title },
});

/**
 * Sample reviews for the curated catalog. Visibly tagged "Sample" wherever they render;
 * they show how the review system reads and should be replaced by live store reviews.
 */
export const sampleReviews: SourcedReview[] = [
  S("ghk-cu-topical-cosmetic-1g", "GHK-Cu Topical Cosmetic (1g)", "Priya", 5, "combination", "aging", "Softer lines in a month", "Mixed a tiny amount into my night serum. Four weeks in, the lines at my eyes look softer and my skin has a quiet glow in the morning.", "2026-09-21"),
  S("ghk-cu-topical-cosmetic-1g", "GHK-Cu Topical Cosmetic (1g)", "Daniel", 4, "dry", "aging", "Potent, a little goes far", "The 1 g jar lasts for ages. The blue tint fades on the skin fast. Would love a pre-mixed version for travel.", "2026-08-30"),
  S("ghk-cu-topical-cosmetic-1g", "GHK-Cu Topical Cosmetic (1g)", "Mei", 5, "sensitive", "redness", "No stinging, which is rare for me", "Reactive skin, so I patch-tested for a week. Zero redness, and the texture of my cheeks is smoother.", "2026-08-12"),
  S("glutanex-night-serum-30ml", "Glutanex Night Serum (30mL)", "Hannah", 5, "dry", "dullness", "Wake up brighter", "I use two pumps after toner. Skin is noticeably more even by morning and it layers well under cream.", "2026-09-10"),
  S("glutanex-night-serum-30ml", "Glutanex Night Serum (30mL)", "Tomas", 4, "normal", "dullness", "Light texture, slow and steady", "Not an overnight miracle but my tone looks more even after three weeks. Pleasant, no scent.", "2026-07-28"),
  S("glutanex-glow-therapy-toner", "Glutanex Glow Therapy Toner", "Ava", 5, "combination", "pores", "The prep step I was missing", "Low pH, a little watery, soaks straight in. My actives seem to work better after it.", "2026-09-02"),
  S("bellmona-cc-cream-sunscreen-50ml", "Bellmona CC Cream Sunscreen (50mL)", "Sofia", 5, "oily", "pigmentation", "Finally a tinted SPF that doesn't slide", "Light coverage, evens my redness, no white cast on my olive skin. Reapplying over it is fine.", "2026-09-15"),
  S("2xsome-skin-booster", "2XSOME Skin Booster", "Clinic Aurelia", 5, "normal", "aging", "Our go-to after microneedling", "Patients report faster calming and a smoother finish at day three. Cold chain arrived intact.", "2026-08-25"),
  S("medisco-skin-glow-mask-100ml", "Medisco Skin Glow Mask (100mL)", "Jules", 4, "dry", "dryness", "Sunday night staple", "Twenty minutes and my skin feels bouncy. Rinses clean, no residue.", "2026-07-19"),
  S("puri-eyes-pdrn-eye-patch", "Puri Eyes PDRN Eye Patch", "Nadia", 5, "combination", "aging", "De-puffs before a long day", "Keep them in the fridge. Ten minutes in the morning and the under-eye area looks rested.", "2026-09-05"),
];

export function reviewsFor(handle: string): SourcedReview[] {
  return [...realReviews.filter((r) => r.product.handle === handle), ...sampleReviews.filter((r) => r.product.handle === handle)];
}

export interface RatingSummary {
  average: number;
  count: number;
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
  hasSample: boolean;
}

export function summarize(reviews: SourcedReview[]): RatingSummary {
  const distribution: RatingSummary["distribution"] = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const r of reviews) distribution[Math.min(5, Math.max(1, Math.round(r.rating))) as 1 | 2 | 3 | 4 | 5]++;
  const count = reviews.length;
  const average = count ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / count) * 10) / 10 : 0;
  return { average, count, distribution, hasSample: reviews.some((r) => r.sample) };
}
