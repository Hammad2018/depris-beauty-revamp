import { describe, it, expect } from "vitest";
import { filterProducts, sortProducts } from "./filter";
import { catalog } from "./commerce/seed/catalog";

describe("filterProducts", () => {
  it("returns all when no facets", () => {
    expect(filterProducts(catalog, {}).length).toBe(catalog.length);
  });
  it("ORs within a group (concerns)", () => {
    const res = filterProducts(catalog, { concerns: ["acne", "pores"] });
    expect(res.length).toBeGreaterThan(0);
    expect(res.every((p) => p.concerns.includes("acne") || p.concerns.includes("pores"))).toBe(true);
  });
  it("ANDs across groups (concern + ingredient)", () => {
    const res = filterProducts(catalog, { concerns: ["aging"], ingredients: ["copper-peptides"] });
    expect(res.length).toBeGreaterThan(0);
    expect(res.every((p) => p.concerns.includes("aging") && p.ingredients.includes("copper-peptides"))).toBe(true);
  });
  it("applies a price ceiling", () => {
    const res = filterProducts(catalog, { priceMax: 20 });
    expect(res.every((p) => p.price <= 20)).toBe(true);
  });
  it("returns empty when nothing matches", () => {
    const res = filterProducts(catalog, { ingredients: ["retinol"], concerns: ["redness"] });
    expect(res).toEqual([]);
  });
});

describe("sortProducts", () => {
  it("sorts price ascending", () => {
    const res = sortProducts(catalog, "price-asc");
    for (let i = 1; i < res.length; i++) expect(res[i].price).toBeGreaterThanOrEqual(res[i - 1].price);
  });
  it("puts higher ratings first", () => {
    const res = sortProducts(catalog, "rating");
    expect(res[0].rating).toBeGreaterThanOrEqual(res[res.length - 1].rating);
  });
});
