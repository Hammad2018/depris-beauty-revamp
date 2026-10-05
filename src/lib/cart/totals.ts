export interface ShipTier {
  threshold: number;
  label: string;
  type: "shipping" | "gift";
}

export interface CartLineLike {
  price: number;
  quantity: number;
}

export function cartSubtotal(items: CartLineLike[]): number {
  return Math.round(items.reduce((sum, i) => sum + i.price * i.quantity, 0) * 100) / 100;
}

export interface ShipProgress {
  unlocked: ShipTier[];
  nextTier: ShipTier | null;
  remaining: number;
  /** 0–100, progress across all tiers (for a single stacked bar). */
  percent: number;
}

/** Progress toward tiered free-shipping / gift goals. Tiers may be unsorted. */
export function freeShipProgress(subtotal: number, tiers: ShipTier[]): ShipProgress {
  const sorted = [...tiers].sort((a, b) => a.threshold - b.threshold);
  const unlocked = sorted.filter((t) => subtotal >= t.threshold);
  const nextTier = sorted.find((t) => subtotal < t.threshold) ?? null;
  const top = sorted.length ? sorted[sorted.length - 1].threshold : 0;
  const percent = top > 0 ? Math.min(100, Math.round((subtotal / top) * 100)) : 100;
  const remaining = nextTier ? Math.round((nextTier.threshold - subtotal) * 100) / 100 : 0;
  return { unlocked, nextTier, remaining, percent };
}

export function giftUnlocked(progress: ShipProgress): boolean {
  return progress.unlocked.some((t) => t.type === "gift");
}
