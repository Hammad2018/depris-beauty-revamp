# Depris Beauty — Storefront Revamp

A new, high-conversion storefront concept for **Depris Beauty** — advanced Korean skincare
(copper peptides, exosomes, skin boosters) stocked in the US. Built to pitch a dramatically
better shopping experience than the current WooCommerce site.

**Art direction:** *Seoul Soft-Glow* — approachable luxury. Cream + blush + bronze, soft and
airy, with a clinical-meets-luxury edge that reflects Depris's cosmeceutical actives.

## Stack
- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — design tokens in `tailwind.config.ts`
- **Framer Motion** — spring reveals, cart drawer, micro-interactions (all gated behind `prefers-reduced-motion`)
- Self-hosted **Fraunces** (display) + **Hanken Grotesk** (UI) via `next/font`
- **Shopify Storefront API** for real cart / checkout / payments / inventory — with a local
  seed catalog fallback so the site always renders (and demos) without credentials
- **Vitest** for the conversion-critical logic (cart math, quiz→routine, filters)
- Deploy target: **Vercel**

## Getting started
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm test         # run unit tests
npm run lint
```

## Commerce: seed vs. live Shopify
The app reads from one data layer (`src/lib/commerce`) behind a `CommerceSource` interface:

- **No env set →** uses the local seed catalog (`src/lib/commerce/seed/catalog.ts`), drawn from
  Depris's real categories and representative products. The whole site renders and the cart works;
  checkout shows a "connect Shopify" state.
- **With Shopify env →** uses the live Storefront API (products, collections, cart, hosted checkout).

Set these (see `.env.example`) to go live:
```
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=...
NEXT_PUBLIC_SHOPIFY_LIVE=1      # enables the checkout button
```
Concern / ingredient / routine-step live in Shopify product **metafields** (namespace `depris`)
or tags, so the quiz, filters and cross-sell all read one taxonomy.

## Key features
- **Routine/quiz-led discovery** — a 60-second skin quiz builds a personalized cleanse→SPF routine (`/quiz`).
- **Multi-axis shop** — filter by concern × ingredient × price, with sort (`/shop`).
- **Conversion PDP** — variants, one-time vs Subscribe & Save, INCI + plain-language ingredients,
  clinical claims, skin-type-tagged filterable reviews, "pairs well with".
- **AOV cart drawer** — tiered free-shipping/gift progress bar, free-sample picker, express checkout.
- **Bundles / routine builder** — curated sets with explicit savings and add-all-to-cart (`/bundles`).
- **Trust layer** — authenticity (sourced from Korea, authorized retailer), cruelty-free, clinical proof.
- Mobile-first, WCAG 2.2 AA (contrast-checked, keyboard-operable, reduced-motion), SEO (metadata,
  JSON-LD, sitemap, robots, OG image).

## Pages
`/` · `/shop` · `/collections/[handle]` · `/products/[handle]` · `/quiz` · `/bundles` ·
`/science` · `/brands` · `/brands/[handle]` · `/blog` · `/blog/[slug]` · `/about` · `/contact`

## Structure
```
src/
  app/            routes (App Router)
  components/
    layout/       navbar, footer, announcement bar
    sections/     home + page sections
    commerce/     product cards, cart drawer, PDP panels, filters
    quiz/         quiz flow + routine result
    ui/           primitives (button, reveal, rating, badge, …)
  lib/
    commerce/     data layer: types, CommerceSource, seed catalog, Shopify adapter
    cart/         cart context + pure totals logic
    quiz/         recommendRoutine logic
    filter.ts     product filtering/sorting
    content.ts    site-wide copy, nav, trust, shipping tiers
docs/             design spec, implementation plan, research
```

## Notes for handoff
- Product photography, real reviews, and live payment credentials are client-owned and dropped in
  at handover. Placeholder imagery is on-brand CSS gradients; illustrative claims are flagged.
- Migrate the WooCommerce catalog into Shopify, then set the Storefront env vars — no UI changes needed.

---
A concept build for client pitch. See `docs/` for the full design spec and research.
