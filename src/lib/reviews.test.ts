import { describe, expect, it } from "vitest";
import { realReviews, reviewsFor, sampleReviews, summarize } from "./reviews";
import { guides, guidesForProduct } from "./guides";
import { faqs, faqById } from "./faq";
import { featuredIn } from "./connections";

describe("reviews", () => {
  it("imports the real store reviews with provenance", () => {
    expect(realReviews.length).toBeGreaterThan(0);
    for (const r of realReviews) {
      expect(r.sample).toBeUndefined();
      expect(r.product.external).toMatch(/^https:\/\/deprisbeauty\.com\//);
    }
  });
  it("tags every sample review and keeps real ones first", () => {
    expect(sampleReviews.every((r) => r.sample)).toBe(true);
    const list = reviewsFor("ghk-cu-topical-cosmetic-1g");
    const firstSample = list.findIndex((r) => r.sample);
    expect(list.slice(0, firstSample).every((r) => !r.sample)).toBe(true);
  });
  it("summarizes distribution and average", () => {
    const s = summarize(reviewsFor("ghk-cu-topical-cosmetic-1g"));
    expect(s.count).toBe(3);
    expect(s.average).toBeCloseTo(4.7, 1);
    expect(s.distribution[5] + s.distribution[4]).toBe(3);
    expect(s.hasSample).toBe(true);
    expect(summarize([]).count).toBe(0);
  });
});

describe("connections", () => {
  it("every guide section product and FAQ guide reference resolves", () => {
    const slugs = new Set(guides.map((g) => g.slug));
    for (const f of faqs) for (const g of f.guides ?? []) expect(slugs.has(g)).toBe(true);
    for (const g of guides) for (const id of g.faqIds) expect(faqById(id)).toBeTruthy();
  });
  it("links the signature product back to its guides, FAQ and rituals", () => {
    const f = featuredIn("ghk-cu-topical-cosmetic-1g");
    expect(f.guides.length).toBeGreaterThan(0);
    expect(f.faqs.length).toBeGreaterThan(0);
    expect(f.rituals.length).toBeGreaterThan(0);
    expect(guidesForProduct("nope")).toEqual([]);
  });
});
