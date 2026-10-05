# Research Synthesis: Depris Beauty Storefront Revamp
**Method:** Competitor teardown (6 brands) + K-beauty DTC conversion/UX desk research + headless stack landscape
**Date:** 2026-10-05 | Note: desk research, not live-user interviews (see limitations)

### Executive Summary
Depris Beauty sells advanced/cosmeceutical Korean skincare (peptides like GHK-Cu/AHK-Cu, exosomes, skin boosters, mesotherapy, microneedling) plus everyday skincare — a clinical-meets-luxury niche no mainstream competitor owns. The current WooCommerce site is a flat tile-grid of 16 categories and 145 SKUs with no guided discovery, weak trust signals, and no routine/concern framing. Every premium K-beauty leader converts through the same levers: routine/step-based discovery, a short skin quiz, bundles with explicit savings, rich filterable reviews, inline subscribe-&-save, tiered free-shipping/GWP, and ingredient-led storytelling — all on a restraint-driven luxury visual system. The redesign should adopt these as a custom Next.js storefront on Shopify's Storefront API (real cart/checkout/payments, client can own it).

### Key Themes
#### Theme 1: Discovery is broken — shoppers face a wall of SKUs
Current site = 16 category tiles + "1–145 results" with only basic sort. Every competitor reframes the catalog as a *routine or journey* (Soko Glam 10-step, Then I Met You "Shop by Step", BOJ/Tatcha quizzes & finders). **Implication:** lead with a short skin quiz + "shop by concern/routine"; this is the #1 K-beauty conversion lever (+20–35% CVR; quiz-to-purchase up to 2.4–3.1x).

#### Theme 2: Trust is under-served, and it's acute for K-beauty imports
Authenticity/counterfeit anxiety is category-specific; clinical claims need substantiation. Depris's advanced actives *demand* proof. Competitors stack press logos + rich reviews + UGC + clinical % claims. **Implication:** make authenticity ("authorized retailer, sourced from Korea"), cruelty-free, clinical/efficacy %, and skin-type-tagged reviews a first-class trust layer on home, PDP, cart.

#### Theme 3: AOV levers are absent today
No bundles, no free-shipping progress, no GWP, no subscribe-&-save, no loyalty. These are universal among leaders and drive the biggest AOV/CVR gains (free-shipping bar +17–30% AOV). **Implication:** slide-out cart with tiered free-shipping/GWP bar + sample picker + express checkout; bundle/routine builder with explicit savings; inline subscribe-&-save on PDP.

#### Theme 4: The brand has a premium story it isn't telling
"Cutting edge of Korean skincare, stocked in the US, immediate shipping" is a strong hook buried in plain text. Advanced ingredients (peptides, exosomes) are a genuine differentiator. **Implication:** ingredient-led, clinical-luxe art direction; education ("The Science") elevated into primary nav like Tatcha.

### Insights → Opportunities
| Insight | Opportunity | Impact | Effort |
|---|---|---|---|
| No guided discovery | Short skin quiz → routine builder, shared concern/ingredient taxonomy | High | Med |
| Flat category grid | Multi-axis shop: type × concern × ingredient | High | Med |
| No AOV mechanics | Slide-out cart w/ tiered shipping+GWP bar, bundles, subscribe & save | High | Med |
| Weak trust signals | Authenticity + clinical % + filterable reviews layer | High | Med |
| Generic visuals | Clinical-luxe custom design system + tasteful motion | High | Med |
| WooCommerce, not transactable as pitch | Next.js + Shopify Storefront API (real checkout) | High | Med |
| Mobile/perf unknown | Mobile-first, green Core Web Vitals (+10–25% CVR) | Med | Low |

### User Segments (personas)
| Segment | Characteristics | Key needs | Rough size |
|---|---|---|---|
| **The Skintellectual** | 25–45, researches ingredients 8+ hrs before buying, knows actives | Ingredient transparency, clinical proof, routine fit, "pairs well with" | ~40% |
| **The Routine Seeker** | New-to-K-beauty, overwhelmed, wants to be guided | Skin quiz, step-by-step routine, starter bundles, reassurance | ~35% |
| **The Pro / Advanced user** | Uses mesotherapy, microneedling, skin boosters, exosomes (aesthetics-adjacent) | Fast reorder, authenticity, devices & supplies, bulk/pro info | ~25% |

### Jobs To Be Done
- When my skin has a concern, I want to find the *right product/routine* without expertise, so I feel confident it'll work.
- When buying advanced/expensive actives, I want proof they're authentic and effective, so I don't waste money or risk my skin.
- When I've found products, I want to buy the *complete routine* easily and know I'm getting a deal, so I maximize value.
- As a repeat/pro buyer, I want to reorder fast and trust stock/authenticity, so it's frictionless.

### Current-site journey pain points
1. Land → generic hero text, no CTA hierarchy, no quiz.
2. Browse → 16 tiles, then paginated 145-result wall, sort-only.
3. PDP → (WooCommerce default) thin ingredient/proof, no routine context, weak reviews.
4. Cart/checkout → no AOV nudges, no samples, no express pay.
5. Trust → authenticity/clinical story not surfaced.

### Recommendations (prioritized)
1. **Routine/step + quiz-led discovery** on a shared concern/ingredient taxonomy. (Highest K-beauty lever.)
2. **Clinical-luxe design system + custom PDP** built on proof (before/after, INCI + plain-language, clinical %, filterable reviews).
3. **AOV cart**: tiered free-shipping/GWP bar, sample picker, express checkout, bundles, inline subscribe & save.
4. **Trust layer**: authenticity, cruelty-free, clinical claims, press/UGC.
5. **Stack**: Next.js + Shopify Storefront API; mobile-first; WCAG 2.2 AA; green CWV; tasteful Motion animation gated behind prefers-reduced-motion.

### Questions for further research
- Real analytics (current CVR/AOV/traffic mix) — unavailable.
- Does client have/accept a Shopify account? Supplier authenticity assets (seals/QR)? Review corpus to import?

### Methodology notes / limitations
Desk research + competitor teardown, not primary user interviews. Personas/JTBD are evidence-informed hypotheses to validate with the client and live data. Benchmarks cited from research agents (SplitBase, HTTP Archive 2025, brand sites).
