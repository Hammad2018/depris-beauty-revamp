import { describe, it, expect } from "vitest";
import { cartSubtotal, freeShipProgress, giftUnlocked, type ShipTier } from "./totals";

const tiers: ShipTier[] = [
  { threshold: 50, label: "Free US shipping", type: "shipping" },
  { threshold: 120, label: "Free deluxe gift", type: "gift" },
];

describe("cartSubtotal", () => {
  it("sums price * quantity", () => {
    expect(cartSubtotal([{ price: 42, quantity: 2 }, { price: 13, quantity: 1 }])).toBe(97);
  });
  it("is 0 for an empty cart", () => {
    expect(cartSubtotal([])).toBe(0);
  });
});

describe("freeShipProgress", () => {
  it("at $0 targets the first tier", () => {
    const p = freeShipProgress(0, tiers);
    expect(p.unlocked).toHaveLength(0);
    expect(p.nextTier?.threshold).toBe(50);
    expect(p.remaining).toBe(50);
    expect(p.percent).toBe(0);
  });
  it("exactly at a threshold unlocks that tier", () => {
    const p = freeShipProgress(50, tiers);
    expect(p.unlocked.map((t) => t.threshold)).toEqual([50]);
    expect(p.nextTier?.threshold).toBe(120);
    expect(p.remaining).toBe(70);
  });
  it("above the top tier unlocks all and caps at 100%", () => {
    const p = freeShipProgress(200, tiers);
    expect(p.unlocked).toHaveLength(2);
    expect(p.nextTier).toBeNull();
    expect(p.remaining).toBe(0);
    expect(p.percent).toBe(100);
    expect(giftUnlocked(p)).toBe(true);
  });
  it("handles unsorted tiers", () => {
    const p = freeShipProgress(60, [tiers[1], tiers[0]]);
    expect(p.unlocked.map((t) => t.type)).toEqual(["shipping"]);
    expect(giftUnlocked(p)).toBe(false);
  });
});
