#!/usr/bin/env node
/**
 * Import products from deprisbeauty.com's public WooCommerce Store API into a
 * committed JSON snapshot. Usage:
 *   node scripts/import-woo.mjs            # the curated pitch set (one per category)
 *   node scripts/import-woo.mjs --all      # every published product
 * Writes src/lib/commerce/seed/woo-catalog.json
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const BASE = "https://deprisbeauty.com/wp-json/wc/store/v1";
const UA = { "User-Agent": "Mozilla/5.0 (depris-beauty-revamp importer)" };
const OUT = resolve(dirname(fileURLToPath(import.meta.url)), "../src/lib/commerce/seed/woo-catalog.json");

// One representative product per live category (ids from the Store API).
const CURATED = {
  "cosmetic-peps": 1071,            // GHK-Cu – Topical Cosmetic (1g)
  "serums": 4551,                   // Glutanex Night Serum (30mL)
  "mesotherapy-skin-boosters": 4194,// 2XSOME Skin Booster
  "sunscreen-bb-cc-cream": 38,      // Bellmona CC Cream Sunscreen (50mL)
  "cleansers-toners": 2518,         // Glutanex Glow Therapy Toner (150mL)
  "creams-peels": 4554,             // Glutanex Snow White Cream (50mL)
  "sheetmasks": 1587,               // Medisco Skin Glow Mask (100mL)
  "eyes-lips": 3762,                // Puri Eyes PDRN Eye Patch
  "hair-exosomes": 5018,            // Plenaris Exosome HGF
  "microneedling": 5085,            // Plenaris Pro 80
  "filler-lipolytics": 2419,        // Tesoro Collagen
  "vitamins-wellness": 2339,        // MULTIVITA Korean Multivitamin
  "devices-supplies": 2878,         // Red Light Therapy Hair Brush
  "promos": 2647,                   // 2 Pack Offer – GHK-Cu + AHK-Cu
  "gift-cards": 2677,               // Depris Beauty Gift Card
};

async function get(path) {
  const res = await fetch(`${BASE}${path}`, { headers: UA });
  if (!res.ok) throw new Error(`${res.status} ${path}`);
  return res.json();
}

const strip = (html = "") =>
  html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|li|h\d|div)>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&#8211;/g, "–").replace(/&#8217;/g, "’").replace(/&#8220;|&#8221;/g, '"')
    .replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/&#8230;/g, "…")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

const cents = (s) => (s == null || s === "" ? null : Number(s) / 100);

async function main() {
  const all = process.argv.includes("--all");
  const categories = await get("/products/categories?per_page=100");
  let products = [];
  for (let page = 1; ; page++) {
    const batch = await get(`/products?per_page=100&page=${page}`);
    products.push(...batch);
    if (batch.length < 100) break;
  }
  const wanted = all ? products : Object.values(CURATED).map((id) => products.find((p) => p.id === id)).filter(Boolean);
  const pitchCategory = Object.fromEntries(Object.entries(CURATED).map(([slug, id]) => [id, slug]));

  const out = [];
  for (const p of wanted) {
    const variations = [];
    for (const v of p.variations ?? []) {
      try {
        const d = await get(`/products/${v.id}`);
        variations.push({
          id: v.id,
          title: (v.attributes ?? []).map((a) => a.value).join(" / ") || d.name,
          price: cents(d.prices.price),
          regularPrice: cents(d.prices.regular_price),
          inStock: d.is_in_stock,
        });
      } catch (e) {
        console.warn("variation failed", v.id, e.message);
      }
    }
    out.push({
      id: p.id,
      slug: p.slug,
      sku: p.sku,
      name: strip(p.name),
      permalink: p.permalink,
      price: cents(p.prices.price),
      regularPrice: cents(p.prices.regular_price),
      salePrice: cents(p.prices.sale_price),
      onSale: p.on_sale,
      currency: p.prices.currency_code,
      inStock: p.is_in_stock,
      averageRating: Number(p.average_rating) || 0,
      reviewCount: p.review_count || 0,
      categories: p.categories.map((c) => ({ slug: c.slug, name: strip(c.name) })),
      pitchCategory: pitchCategory[p.id] ?? null,
      tags: (p.tags ?? []).map((t) => t.slug),
      images: p.images.map((i) => ({ src: i.src, alt: i.alt || strip(p.name) })),
      shortDescription: strip(p.short_description),
      description: strip(p.description),
      attributes: (p.attributes ?? []).map((a) => ({ name: a.name, terms: a.terms.map((t) => t.name) })),
      variations,
    });
    console.log("✓", p.id, strip(p.name), `(${variations.length} variations)`);
  }

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(
    OUT,
    JSON.stringify(
      {
        importedAt: new Date().toISOString(),
        source: BASE,
        categories: categories.map((c) => ({ slug: c.slug, name: strip(c.name), count: c.count })),
        products: out,
      },
      null,
      2,
    ),
  );
  console.log(`\nWrote ${out.length} products, ${categories.length} categories → ${OUT}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
