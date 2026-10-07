import type { Collection, Product } from "@/lib/commerce/types";

/** Lightweight product index shipped to the header for instant search. */
export interface NavProduct {
  handle: string;
  title: string;
  brand: string;
  price: number;
  currency: string;
  image?: string;
  category: string;
}

export interface NavData {
  categories: { handle: string; title: string }[];
  concerns: { handle: string; title: string }[];
  featured: NavProduct | null;
  index: NavProduct[];
}

export const PRO_CATEGORIES = ["mesotherapy-skin-boosters", "microneedling", "filler-lipolytics", "hair-exosomes", "vitamins-wellness", "devices-supplies"];
const CONSUMER_ORDER = ["cosmetic-peps", "serums", "creams-peels", "cleansers-toners", "sunscreen-bb-cc-cream", "sheetmasks", "eyes-lips", "promos", "gift-cards"];

export function toNavProduct(p: Product): NavProduct {
  return { handle: p.handle, title: p.title, brand: p.brand, price: p.price, currency: p.currency, image: p.images[0]?.url, category: p.category };
}

export function buildNavData(products: Product[], collections: Collection[]): NavData {
  const byHandle = new Map(collections.map((c) => [c.handle, c]));
  const categories = [...CONSUMER_ORDER, ...PRO_CATEGORIES]
    .map((h) => byHandle.get(h))
    .filter((c): c is Collection => Boolean(c))
    .map((c) => ({ handle: c.handle, title: c.title }));
  const concerns = collections.filter((c) => c.concern).map((c) => ({ handle: c.handle, title: c.title }));
  const featured = products.find((p) => p.handle === "ghk-cu-topical-cosmetic-1g") ?? products[0] ?? null;
  return { categories, concerns, featured: featured ? toNavProduct(featured) : null, index: products.map(toNavProduct) };
}

/** Tiny ranked search over the index: title/brand/category tokens, prefix-weighted. */
export function searchIndex(index: NavProduct[], query: string, limit = 6): NavProduct[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);
  return index
    .map((p) => {
      const hay = `${p.title} ${p.brand} ${p.category.replace(/-/g, " ")}`.toLowerCase();
      let score = 0;
      for (const t of terms) {
        if (!hay.includes(t)) return { p, score: -1 };
        score += hay.startsWith(t) || p.title.toLowerCase().startsWith(t) ? 3 : 1;
      }
      return { p, score };
    })
    .filter((r) => r.score >= 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.p);
}
