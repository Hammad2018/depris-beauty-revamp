import { describe, it, expect } from "vitest";
import { buildNavData, searchIndex } from "./nav";
import { createWooSource } from "./commerce/wooSource";

describe("nav data", () => {
  it("builds categories, concerns and a search index from the real catalog", async () => {
    const src = createWooSource();
    const nav = buildNavData(await src.getProducts(), await src.getCollections());
    expect(nav.categories.length).toBe(15);
    expect(nav.concerns.length).toBe(6);
    expect(nav.featured?.handle).toBe("ghk-cu-topical-cosmetic-1g");
    expect(searchIndex(nav.index, "ghk")[0].handle).toBe("ghk-cu-topical-cosmetic-1g");
    expect(searchIndex(nav.index, "glutanex").length).toBe(3);
    expect(searchIndex(nav.index, "zzz")).toEqual([]);
  });
});
