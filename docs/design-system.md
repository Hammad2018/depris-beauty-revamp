# Depris Beauty — Design System "Seoul Soft-Glow" (2026-10-05)

Approachable luxury K-beauty. Cream + blush + bronze, soft/rounded, airy gradients, warm diverse imagery.

## Color tokens
| Token | Hex | Use |
|---|---|---|
| cream | #FBF5ED | Page background (warm) |
| porcelain | #FFFFFF | Surfaces / cards |
| sand | #EFE4D4 | Muted surface, borders, dividers |
| ink | #2E2822 | Primary text (warm charcoal, not pure black) |
| ink-soft | #6B5E52 | Secondary text |
| blush | #E7A3A0 | Primary accent (soft) |
| camellia | #C9736B | Deep rose — primary CTA, links |
| bronze | #B08A5B | Luxe accent, eyebrows, hairlines |
| bronze-deep | #8A6A3E | Bronze text on light |
| sage | #86A08C | Clinical / verified / success / in-stock |
| glow | radial #FCE9E4 → #FBF5ED | Hero/section glow gradient |

Contrast: verify body text (ink on cream) ≥ 4.5:1; never put key text in blush on cream (fails) — use camellia/ink. WCAG 2.2 AA.

## Typography (self-hosted via next/font, Google Fonts)
- Display / headlines: **Fraunces** (soft optical serif — warm, luxurious), 400/500; optical sizing for large.
- UI / body: **Hanken Grotesk** (soft rounded grotesque), 400/500/600.
- Eyebrows / labels: Hanken Grotesk, uppercase, letter-spacing 0.12em.
- (Rounded-sans-only alt if preferred: Epilogue display + Hanken Grotesk.)

### Scale (fluid clamp)
H1 clamp(2.5rem,6vw,4.5rem)/1.05 · H2 clamp(2rem,4vw,2.75rem)/1.1 · H3 1.5rem/1.2 · body 1.0625rem/1.6 · small 0.875rem.

## Shape & depth
- Radius: cards 20–24px, images 20px, buttons pill (9999px), inputs 12px.
- Shadows: soft, warm-tinted, low opacity; e.g. 0 10px 30px rgba(176,138,91,0.12). Hover = slightly larger + glow.
- Generous whitespace: section padding 96–128px desktop / 56–72px mobile; max-width ~1200–1280px.

## Motion (Motion/Framer, gated behind prefers-reduced-motion)
- Scroll reveal: opacity 0→1 + translateY 16px, spring (stiffness ~120, damping ~20), stagger children.
- Card hover: translateY -4px + soft glow shadow + image zoom 1.03.
- Add-to-cart: button label morph → check, cart badge count bump (scale spring).
- Cart drawer: slide from right with backdrop fade.
- Marquee: press logos / "sourced from Korea" trust strip.
- Only animate transform/opacity. No layout-affecting animation (protect CLS). LCP ≤2.5s / INP <200ms / CLS <0.1.

## Imagery direction
Warm natural light, diverse models, macro ingredient textures & swatches (copper peptide droplets, serum textures), soft cream seamless backgrounds. For pitch: use tasteful placeholders / generated imagery; wire real product shots later.

## Signature components
Sticky translucent nav + cart · hero w/ glow + single primary CTA (Skin Quiz) · shop-by-concern bento · bestseller cards w/ rating + quick-add · routine/step strip · ingredient-story blocks · clinical % proof module · skin-type-tagged reviews · bundle "add all to cart" · slide-out cart w/ tiered free-ship+GWP progress bar + sample picker + express checkout · press/UGC marquee · authenticity/cruelty-free trust band · newsletter.
