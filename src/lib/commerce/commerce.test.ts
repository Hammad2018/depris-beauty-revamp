import { describe, it, expect } from "vitest";
import { createSeedSource } from "./seedSource";
import { isShopifyConfigured } from "./index";

describe("seed commerce source", () => {
  const src = createSeedSource();

  it("returns tagged products", async () => {
    const products = await src.getProducts();
    expect(products.length).toBeGreaterThan(10);
    for (const p of products) {
      expect(p.handle).toBeTruthy();
      expect(p.price).toBeGreaterThan(0);
      expect(p.routineStep).toBeTruthy();
    }
  });

  it("filters by category collection", async () => {
    const peps = await src.getProducts({ collection: "cosmetic-peps" });
    expect(peps.length).toBeGreaterThan(0);
    expect(peps.every((p) => p.category === "cosmetic-peps")).toBe(true);
  });

  it("maps concern-led collections to products by concern", async () => {
    const aging = await src.getProducts({ collection: "concern-aging" });
    expect(aging.length).toBeGreaterThan(0);
    expect(aging.every((p) => p.concerns.includes("aging"))).toBe(true);
  });

  it("gets a product by handle", async () => {
    const p = await src.getProduct("ghk-cu-copper-peptide-serum");
    expect(p?.title).toContain("Copper Peptide");
  });

  it("search matches ingredient and concern", async () => {
    const results = await src.search("copper");
    expect(results.some((p) => p.ingredients.includes("copper-peptides"))).toBe(true);
    expect(await src.search("")).toEqual([]);
  });

  it("falls back to seed when Shopify is not configured", () => {
    const prev = { d: process.env.SHOPIFY_STORE_DOMAIN, t: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN };
    delete process.env.SHOPIFY_STORE_DOMAIN;
    delete process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
    expect(isShopifyConfigured()).toBe(false);
    if (prev.d) process.env.SHOPIFY_STORE_DOMAIN = prev.d;
    if (prev.t) process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN = prev.t;
  });
});
