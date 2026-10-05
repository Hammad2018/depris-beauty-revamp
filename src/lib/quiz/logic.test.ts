import { describe, it, expect } from "vitest";
import { recommendRoutine } from "./logic";
import { catalog } from "../commerce/seed/catalog";

describe("recommendRoutine", () => {
  it("returns a valid ordered core routine with no concerns", () => {
    const r = recommendRoutine(catalog, { concerns: [] });
    const steps = r.map((i) => i.step);
    expect(steps).toContain("cleanse");
    expect(steps).toContain("moisturize");
    expect(steps).toContain("spf");
    // canonical order preserved
    const order = ["cleanse", "tone", "treat", "boost", "moisturize", "spf"];
    const idx = steps.map((s) => order.indexOf(s));
    expect(idx).toEqual([...idx].sort((a, b) => a - b));
    expect(r.length).toBeGreaterThanOrEqual(4);
  });

  it("prioritizes products that match the chosen concern", () => {
    const r = recommendRoutine(catalog, { skinType: "combination", concerns: ["aging"] });
    const treat = r.find((i) => i.step === "treat");
    expect(treat).toBeTruthy();
    expect(treat!.product.concerns).toContain("aging");
  });

  it("always returns a non-empty routine for conflicting concerns", () => {
    const r = recommendRoutine(catalog, { skinType: "sensitive", concerns: ["acne", "dryness", "aging"] });
    expect(r.length).toBeGreaterThanOrEqual(4);
    expect(r.every((i) => i.product)).toBe(true);
  });
});
