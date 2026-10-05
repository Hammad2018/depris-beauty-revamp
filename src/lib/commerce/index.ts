import type { CommerceSource } from "./types";
import { createSeedSource } from "./seedSource";
import { createShopifySource } from "./shopifySource";

export * from "./types";

/** True when live Shopify credentials are configured. */
export function isShopifyConfigured(): boolean {
  return Boolean(process.env.SHOPIFY_STORE_DOMAIN && process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN);
}

let cached: CommerceSource | null = null;

/**
 * The commerce source for the app. Uses live Shopify when configured,
 * otherwise the local seed catalog — so the site always renders.
 */
export function getCommerce(): CommerceSource {
  if (cached) return cached;
  cached = isShopifyConfigured()
    ? createShopifySource({
        domain: process.env.SHOPIFY_STORE_DOMAIN!,
        token: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
      })
    : createSeedSource();
  return cached;
}
