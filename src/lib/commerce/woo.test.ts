import { describe, it, expect } from "vitest";
import { createWooSource, mapWooProduct } from "./wooSource";
import snapshot from "./seed/woo-catalog.json";

describe("woo adapter", () => {
  const src = createWooSource();

  it("exposes one real product per live category", async () => {
    const products = await src.getProducts();
    expect(products.length).toBe(15);
    expect(new Set(products.map((p) => p.category)).size).toBe(15);
  });

  it("maps the signature GHK-Cu with real price, images and inferred taxonomy", async () => {
    const p = await src.getProduct("ghk-cu-topical-cosmetic-1g");
    expect(p).not.toBeNull();
    expect(p!.price).toBe(18);
    expect(p!.images[0].url).toMatch(/^https:\/\/deprisbeauty\.com\//);
    expect(p!.ingredients).toContain("copper-peptides");
    expect(p!.concerns).toContain("aging");
    expect(p!.routineStep).toBe("treat");
  });

  it("derives compare-at pricing for the promo pack", () => {
    const promo = snapshot.products.find((p) => p.slug.startsWith("2-pack-offer"))!;
    const mapped = mapWooProduct(promo);
    expect(mapped.compareAtPrice).toBe(43);
    expect(mapped.price).toBe(37);
  });

  it("keeps gift card variations as variants", async () => {
    const gift = await src.getProduct("depris-beauty-gift-card");
    expect(gift!.variants.length).toBe(5);
  });

  it("serves real categories as collections alongside concern lenses", async () => {
    const cols = await src.getCollections();
    expect(cols.find((c) => c.handle === "mesotherapy-skin-boosters")).toBeTruthy();
    expect(cols.find((c) => c.handle === "concern-aging")).toBeTruthy();
    const peps = await src.getProducts({ collection: "cosmetic-peps" });
    expect(peps.map((p) => p.handle)).toContain("ghk-cu-topical-cosmetic-1g");
  });
});
