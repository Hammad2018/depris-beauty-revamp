# Depris Beauty Storefront — Implementation Plan

> **For agentic workers:** implement task-by-task. Steps use `- [ ]` tracking. Logic-bearing units are TDD; presentational sections are built then visually verified (screenshot) since their "test" is visual.

**Goal:** Ship a new, high-conversion, responsive Depris Beauty storefront (Next.js + Shopify Storefront API) in private repo `depris-beauty-revamp`, deployed to Vercel for a client pitch.

**Architecture:** Next.js App Router. One commerce data layer (`src/lib/commerce`) behind a `CommerceSource` interface with two implementations — `shopifySource` (Storefront GraphQL) and `seedSource` (local `catalog.ts`); it auto-selects based on env. Cart state in a client context persisted to localStorage; checkout hands off to Shopify when live. Pure logic (cart totals, free-ship tiers, quiz→routine, filter predicate) is isolated and unit-tested.

**Tech Stack:** Next.js (App Router) + TypeScript, Tailwind, Motion (Framer Motion), Vitest + React Testing Library, self-hosted Fraunces + Hanken Grotesk via next/font, Vercel.

**Spec:** scratchpad `2026-10-05-depris-beauty-revamp-design-spec.md` (moves to repo `docs/`).

## Global Constraints
- Brand name "Depris Beauty"; real contact info (info@deprisbeauty.com, (508) 630-6625, 1910 Thomes Ave, Cheyenne WY 82001).
- Seoul Soft-Glow tokens exactly as spec §5 (cream #FBF5ED, ink #2E2822, camellia #C9736B primary CTA, bronze #B08A5B, sage #86A08C, etc.).
- Mobile-first; WCAG 2.2 AA; green CWV; all motion gated behind `prefers-reduced-motion`.
- No secrets in repo; Shopify creds via env only. Site must fully render with no Shopify env (seed source).
- No model identifiers in commits/code/docs.

## Review Focus
- **No Shopify env present** → app must render catalog from seed, cart works, checkout button shows "connect Shopify" state, not crash. (Task 2)
- **Cart totals / free-ship tier math** at boundaries ($0, exactly threshold, above) → correct subtotal, progress %, remaining-to-goal, GWP unlock. (Task 3)
- **Quiz with minimal answers / conflicting concerns** → always returns a valid non-empty routine ordered cleanse→SPF. (Task 7)
- **Filter with no matches / multiple concern+ingredient facets** → empty-state renders; AND across facet groups, OR within a group. (Task 5)
- **Reduced-motion / keyboard-only** across nav, cart drawer, quiz, filters → operable, visible focus, no motion. (Task 4, cross-cutting)

---

### Task 1: Repo + scaffold + design tokens + fonts + layout shell
**Files:** create repo; `package.json`, `next.config.js`, `tailwind.config.ts` (Seoul Soft-Glow tokens), `postcss.config.js`, `tsconfig.json`, `.eslintrc.json`, `.gitignore`, `src/app/layout.tsx` (fonts, metadata), `src/app/globals.css`, `src/lib/fonts.ts`, `src/components/layout/{Navbar,Footer,AnnouncementBar}.tsx`, `src/components/ui/{Button,Eyebrow,SectionHeading,Reveal,Marquee,Badge}.tsx`, `src/lib/motion.ts`, `README.md`, `docs/` (spec).
- [ ] Scaffold Next.js + Tailwind; add tokens + fonts; verify `npm run build` + `npm run dev` render a themed shell with nav/footer. Commit.

### Task 2: Commerce data layer (interface + seed + shopify adapter)
**Files:** `src/lib/commerce/types.ts` (Product, Variant, Collection, Cart, LineItem, metafields: concern[], ingredient[], routineStep, skinType, clinicalClaim), `source.ts` (`CommerceSource` interface: `getProducts/getProduct/getCollections/getCollection/search`), `seed/catalog.ts` (real categories + representative products, tagged), `seedSource.ts`, `shopifySource.ts` (Storefront GraphQL), `index.ts` (env-based selector), `tests/commerce.test.ts`.
- [ ] TDD: seedSource returns tagged products; selector falls back to seed with no env. Commit.

### Task 3: Cart (pure logic + context + drawer)
**Files:** `src/lib/cart/totals.ts` (`cartSubtotal`, `freeShipProgress(subtotal, tiers)`, `giftUnlocked`), `tests/cart-totals.test.ts`, `src/lib/cart/CartContext.tsx` (add/remove/qty, localStorage, optional subscribe flag), `src/components/commerce/CartDrawer.tsx` (line items, tiered free-ship/GWP bar, sample picker, express-checkout buttons, Shopify handoff or connect-state).
- [ ] TDD totals at boundaries; build drawer; verify add-to-cart → drawer updates. Commit.

### Task 4: Core commerce UI components
**Files:** `src/components/commerce/{ProductCard,ProductGrid,PriceBlock,Rating,VariantSelector,SubscribeToggle,AddToCart,Badge,CrossSell,TrustBand,ClinicalClaim}.tsx`. Keyboard + a11y + reduced-motion built in.
- [ ] Build; verify ProductCard quick-add wires to CartContext. Commit.

### Task 5: Shop / PLP + filtering
**Files:** `src/lib/filter.ts` (`filterProducts(products, facets)` — AND across groups, OR within), `tests/filter.test.ts`, `src/app/shop/page.tsx`, `src/app/collections/[handle]/page.tsx`, `src/components/commerce/{FilterRail,MobileFilterDrawer,SortSelect}.tsx`.
- [ ] TDD filter predicate (incl. empty state); build PLP; verify filters + sort. Commit.

### Task 6: PDP
**Files:** `src/app/products/[handle]/page.tsx`, `src/components/commerce/{Gallery,IngredientBenefits,HowToUse,ReviewList,ReviewFilter,PairsWith,ShippingAccordion}.tsx`, JSON-LD Product.
- [ ] Build; verify variant + subscribe toggle + add-to-cart + reviews filter + sticky mobile ATC. Commit.

### Task 7: Skin Quiz → routine
**Files:** `src/lib/quiz/logic.ts` (`recommendRoutine(answers)` → ordered steps from taxonomy), `tests/quiz.test.ts`, `src/app/quiz/page.tsx`, `src/app/quiz/result/page.tsx`, `src/components/quiz/{QuizFlow,QuizQuestion,RoutineResult}.tsx`.
- [ ] TDD recommendRoutine (minimal/conflicting answers → valid ordered routine); build flow; add-routine-to-cart. Commit.

### Task 8: Bundles / routine builder
**Files:** `src/app/bundles/page.tsx`, `src/components/commerce/{BundleCard,BuildYourSet}.tsx` (explicit savings, add-all-to-cart, tiered discount).
- [ ] Build; verify add-all + savings math. Commit.

### Task 9: Home
**Files:** `src/app/page.tsx`, `src/components/sections/{Hero,ShopByConcern,Bestsellers,DifferenceBand,ActivesSpotlight,RoutineStrip,ProofModule,SocialProof,EditorialTeasers,Newsletter}.tsx`.
- [ ] Build all sections per spec §4.1; screenshot-verify responsive. Commit.

### Task 10: The Science / About-Authenticity / Brands / Blog / Contact + SEO
**Files:** `src/app/{science,about,brands,brands/[handle],blog,blog/[slug],contact}/page.tsx`, `src/lib/content.ts`, `src/app/{sitemap.ts,robots.ts,opengraph-image.tsx,not-found.tsx}`, JSON-LD Organization/Breadcrumb.
- [ ] Build; verify metadata/OG/sitemap. Commit.

### Task 11: Polish + deploy
- [ ] Run web-launch-polish (a11y, perf, SEO, responsive, motion). Fix findings.
- [ ] Deploy to Vercel (vercel-deploy). Capture key screens back into Figma. Package pitch notes. Commit + push; open draft PR.

---

## Self-review notes
- Spec coverage: §2 stack→T1/T2; §3 IA→T5/T9/T10; §4 pages→T5–T10; §5 tokens→T1; §6 components→T4/T6; §7 quality→T11 + cross-cutting; §8 data→T2. Covered.
- Testable logic isolated (T2 selector, T3 totals, T5 filter, T7 routine) — the rest is presentational, verified visually. Proportion kept: plan << codebase.
- Type consistency: `CommerceSource`, `Product`/`metafields`, `freeShipProgress`, `filterProducts`, `recommendRoutine` used consistently across tasks.
