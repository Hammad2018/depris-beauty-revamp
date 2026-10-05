# Depris Beauty — Storefront Revamp — Design Spec
**Date:** 2026-10-05 · **Status:** Draft for approval · **Art direction:** Seoul Soft-Glow
**Repo (to create):** `depris-beauty-revamp` (private, github.com/hammad2018)

---

## 1. Purpose & success
Replace deprisbeauty.com's generic WooCommerce storefront with a new, high-engagement, high-conversion storefront that Hammad can **pitch to the client** — and that is a **genuinely functional store** (real cart, checkout, payments, inventory) the client can own long-term.

**Success looks like:**
- A visually striking, on-brand, responsive site that reads as premium "clinical-meets-luxury" K-beauty.
- A measurably better shopping journey: guided discovery (quiz/routine/concern), trust-rich PDPs, and AOV-driving cart.
- Real transactability: products, cart, and checkout work end-to-end on Shopify.
- Launch-ready quality: mobile-first, green Core Web Vitals (LCP ≤2.5s, INP <200ms, CLS <0.1), WCAG 2.2 AA, strong SEO.

**Who it's for:** three shopper personas — The Skintellectual (ingredient researcher), The Routine Seeker (wants guidance), The Pro/Advanced user (mesotherapy/microneedling, fast reorder).

**Brand truth that drives everything:** Depris = *advanced/cosmeceutical* Korean skincare (copper peptides GHK-Cu/AHK-Cu, exosomes, skin boosters, mesotherapy, microneedling) + everyday skincare. Clinical credibility + approachable luxury. No major competitor owns this combination.

---

## 2. Architecture & stack
- **Framework:** Next.js (App Router) + TypeScript. React Server Components for catalog pages (fast, SEO), client components for interactive bits (cart, quiz, filters).
- **Styling:** Tailwind CSS with the Seoul Soft-Glow tokens baked into `tailwind.config.ts`. Self-hosted **Fraunces** (display) + **Hanken Grotesk** (UI/body) via `next/font`.
- **Motion:** Motion (Framer Motion) — spring reveals, hover, add-to-cart, cart drawer — all gated behind `prefers-reduced-motion`.
- **Commerce backend:** **Shopify Storefront API** (GraphQL) — products, variants, collections, cart, and checkout handoff (Shopify-hosted, PCI-compliant; Shop Pay / Apple Pay / Google Pay). We build the entire front end; Shopify owns checkout.
  - **Pitch data:** stand up a Shopify **dev/mock catalog** seeded with Depris's real categories and representative products (from the content inventory) so the demo is transactable. Real credentials/products are dropped in by the client at handover.
  - **Graceful fallback:** if Storefront API env vars are absent (e.g. a pure static preview), the app reads from a local `catalog.ts` seed so the site always renders for the pitch. One data layer, two sources.
- **Data model (Shopify metafields / tags):** shared taxonomy powers quiz, filters, PDP cross-sell, and review filtering:
  - `concern` (dry, dull, acne/blemish, aging/wrinkles, pigmentation, redness/sensitive, pores/sebum)
  - `ingredient` (copper peptides, exosomes, niacinamide, retinol, vitamin C, centella/cica, hyaluronic acid, AHA/BHA, …)
  - `routine_step` (cleanse, tone, treat/serum, boost, moisturize, SPF, pro/device)
  - `skin_type`, `is_bestseller`, `is_new`, `clinical_claim` (e.g. "97% saw…")
- **Deploy:** Vercel (preview + prod). Env vars for Shopify domain + Storefront token.
- **Repo layout (mirrors SportX conventions):** `src/app` (routes), `src/components` (ui / sections / commerce / layout), `src/lib` (shopify client, cart, catalog seed, content, motion), `public`.

---

## 3. Information architecture / sitemap
Primary nav (sticky, translucent): **Shop ▾** · **Shop by Concern** · **The Science** · **Bundles** · **Skin Quiz** · (right) Search · Account · **Cart**
- **Shop ▾** mega-menu: by Category (the 16 real categories), by Concern, by Ingredient, Bestsellers, New, Promos, Brands.

Pages:
1. **Home** `/`
2. **Shop / Collection (PLP)** `/shop`, `/collections/[handle]` — filters (concern × ingredient × type × price), sort, quick-add.
3. **Product (PDP)** `/products/[handle]`
4. **Skin Quiz** `/quiz` → **Routine result** `/quiz/result`
5. **Bundles / Routine builder** `/bundles` (incl. "build your own set", add-all-to-cart)
6. **The Science** `/science` (ingredient education: peptides, exosomes, etc.)
7. **Brands** `/brands`, `/brands/[handle]` (Bellmona featured)
8. **About / Authenticity** `/about` (sourced-from-Korea, authorized retailer, cruelty-free, US stock/fast shipping)
9. **Blog** `/blog`, `/blog/[slug]` (editorial index; stubs for pitch)
10. **Contact** `/contact`
11. **Cart** — slide-out drawer (global) + `/cart` page fallback
12. Supporting: Search results, Account (stub), policy pages, 404, sitemap.xml, robots.txt, OG images.

---

## 4. Page designs (key sections)

### 4.1 Home — "a router, not a brochure"
1. **Announcement bar** — tiered value ladder ("Free US shipping over $X · Free gift over $Y · Ships same-day from the US").
2. **Hero** — soft glow gradient, warm editorial image, one headline ("Glass-skin, backed by science"), **one primary CTA = Take the Skin Quiz** + secondary "Shop bestsellers".
3. **Shop by Concern** — bento grid of concern tiles (dullness, aging, acne, sensitivity, pores, pigmentation).
4. **Bestsellers** — product cards w/ rating + quick-add (from real catalog).
5. **The Depris difference / authenticity band** — sourced-from-Korea, authorized retailer, cruelty-free, fast US shipping; trust marquee.
6. **Advanced actives spotlight** — copper peptides / exosomes / skin boosters (the differentiator), link to The Science.
7. **Routine strip** — "Build your routine in 4 steps" → quiz/bundles.
8. **Clinical proof module** — quantified claims ("97% …").
9. **Social proof** — press logos + skin-type-tagged reviews + @deprisbeauty UGC marquee.
10. **Editorial/blog teasers.**
11. **Newsletter** — "Join the glow list" (replaces "Join 509 subscribers").
12. **Footer** — full nav, policies, contact, socials.

### 4.2 Collection / PLP
Sticky filter rail (concern, ingredient, type, skin type, price) + sort (bestselling, rating, newest, price). Responsive product grid, quick-add, rating + badges (Bestseller/New/Sale), result count, empty-state, pagination/infinite. Mobile: filter drawer.

### 4.3 PDP (engineered around proof)
Above fold: gallery (texture/before-after slots) · brand eyebrow · title · rating+count · price · **variant selector** · **one-time vs Subscribe & Save** toggle · **Add to bag** (sticky on mobile). Below: hero-ingredient benefits (INCI + plain language) · how-to-use / routine step · **clinical claims** · **"Pairs well with" / complete-the-routine** cross-sell · **skin-type-tagged reviews** w/ filters · authenticity note · shipping/returns accordion.

### 4.4 Skin Quiz → Routine
Short (1–2 core Qs: skin type? main concern? + optional depth). Keyboard-operable. Outputs a 3–5 step routine (cleanse→treat→boost→moisturize→SPF) from the concern/ingredient taxonomy, with "add routine to cart" and save/share.

### 4.5 Bundles / Routine builder
Curated sets with explicit savings + "add all to cart"; "build your own set" tiered discount.

### 4.6 Cart drawer (AOV engine)
Slide-out: line items, **tiered free-shipping/GWP progress bar**, **free-sample picker**, upsell ("pairs well with"), subtotal, **express checkout** buttons → Shopify checkout. Honors reduced-motion.

### 4.7 The Science / About-Authenticity / Brands / Blog / Contact
Editorial, ingredient-led storytelling; authenticity + cruelty-free + US-stock trust; Bellmona brand page; blog index + article template (stub content for pitch); contact with real info (info@deprisbeauty.com, (508) 630-6625, Cheyenne WY).

---

## 5. Design system (Seoul Soft-Glow)
Full tokens live in Figma (file `bzAEG13rGg2ytWmTPDZxbb`) and will be mirrored in `tailwind.config.ts`.
- **Color:** cream `#FBF5ED`, porcelain `#FFFFFF`, sand `#EFE4D4`, ink `#2E2822`, ink-soft `#6B5E52`, blush `#E7A3A0`, camellia `#C9736B` (primary CTA), bronze `#B08A5B`, bronze-deep `#8A6A3E`, sage `#86A08C` (verified/clinical). Contrast checked for AA; key text uses ink/camellia, never blush-on-cream.
- **Type:** Fraunces (display/headings), Hanken Grotesk (UI/body), fluid clamp scale. Eyebrows uppercase tracked.
- **Shape:** rounded (cards 20–24px, pill buttons), soft warm shadows, generous whitespace.
- **Motion:** spring reveals (opacity+translateY), card hover lift+zoom, add-to-cart morph + badge bump, cart drawer slide; transform/opacity only; reduced-motion safe.
- **Imagery:** warm natural light, diverse models, macro ingredient textures; tasteful placeholders/generated for pitch, real shots at handover.

---

## 6. Component inventory (reusable, isolated)
Layout: Navbar (+ mega-menu), Footer, AnnouncementBar, CartDrawer, MobileFilterDrawer.
UI: Button (primary/ink/ghost), Eyebrow, SectionHeading, Reveal, Marquee, Badge, Rating, Accordion, Input, QuantityStepper, Tag/Chip, GlowBackdrop.
Commerce: ProductCard, ProductGrid, PriceBlock, VariantSelector, SubscribeToggle, AddToCart, FreeShipProgress, SamplePicker, CrossSell, ReviewList/ReviewCard/ReviewFilter, BundleCard, RoutineStep, ConcernTile, TrustBand, ClinicalClaim.
Quiz: QuizFlow, QuizQuestion, RoutineResult.
Each has one purpose, typed props, independently testable.

---

## 7. Quality bars
- **Responsive:** mobile-first; verified at 360 / 768 / 1024 / 1440.
- **Performance:** green CWV; next/image, font preloading, code-split client islands, lazy below-the-fold.
- **Accessibility:** WCAG 2.2 AA — semantic HTML, full keyboard (quiz/filters/cart/carousels), visible focus, ≥4.5:1 contrast, labeled forms, descriptive alt, reduced-motion.
- **SEO:** per-page metadata, OG images, JSON-LD (Product, Breadcrumb, Organization), sitemap, robots, canonicals.
- **Testing:** component/unit tests for cart math, quiz→routine logic, free-ship thresholds, filter logic; build + lint clean before each push.

---

## 8. Content & data for the pitch
- Seed `catalog.ts` from the real content inventory (16 categories; representative products incl. copper-peptide packs, Bellmona line; $13–$95). Tagged with concern/ingredient/routine_step.
- Copy: elevate the real brand story; keep real contact info. Placeholder reviews/claims clearly flagged as illustrative for the pitch.
- Optional: mirror the seed into a Shopify dev store for live checkout in the demo.

---

## 9. Out of scope (pitch phase)
Real payment credentials, full product photography, full WooCommerce data migration, live reviews/loyalty app integrations, multi-language. (All have a clear post-pitch path; Shopify's app ecosystem covers reviews/subscriptions/loyalty.)

---

## 10. Risks & mitigations
- **Shopify dev store/token not available during this session** → build against `catalog.ts` seed with a Shopify adapter interface; swap to live token later with no UI change.
- **Imagery quality for pitch** → tasteful gradient/placeholder system + optional AI-generated hero/textures; never blank.
- **Scope creep** → build the full page set but keep each page's v1 focused on the conversion-critical sections above.

---

## 11. Milestones (post-approval)
1. Scaffold repo + design tokens + fonts + layout shell (nav/footer/cart drawer) + Shopify adapter/seed.
2. Home.
3. Shop/PLP + filters; PDP.
4. Skin Quiz → routine; Bundles.
5. The Science / About-Authenticity / Brands / Blog / Contact.
6. Polish: a11y, perf, SEO, responsive QA (web-launch-polish skill).
7. Deploy to Vercel; capture key screens back into Figma; package the pitch.
