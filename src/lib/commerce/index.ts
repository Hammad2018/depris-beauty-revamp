import type { CommerceSource } from "./types";
import { createSeedSource } from "./seedSource";
import { createShopifySource } from "./shopifySource";
import { createWooSource } from "./wooSource";

export * from "./types";

/** True when live Shopify credentials are configured. */
export function isShopifyConfigured(): boolean {
  return Boolean(process.env.SHOPIFY_STORE_DOMAIN && process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN);
}

let cached: CommerceSource | null = null;

/**
 * The commerce source for the app. Live Shopify when configured; otherwise the
 * WooCommerce snapshot of deprisbeauty.com (real products, prices and photos).
 * COMMERCE_SOURCE=seed switches to the illustrative seed catalog.
 */
export function getCommerce(): CommerceSource {
  if (cached) return cached;
  if (isShopifyConfigured()) {
    cached = createShopifySource({
      domain: process.env.SHOPIFY_STORE_DOMAIN!,
      token: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
    });
  } else {
    cached = process.env.COMMERCE_SOURCE === "seed" ? createSeedSource() : createWooSource();
  }
  return cached;
}
