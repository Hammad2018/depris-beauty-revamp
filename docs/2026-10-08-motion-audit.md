# Motion audit — Emil Kowalski standards (2026-10-08)

Reviewed the storefront's motion against the `emil-design-eng` / `review-animations` /
`improve-animations` skills from github.com/emilkowalski/skills (STANDARDS.md and AUDIT.md),
then applied the fixes in the same pass. Marketing/scroll-driven sections (hero, inside-the-drop,
night protocol, science journey, lookbook) are explanatory motion and exempt from the 300 ms UI
budget; functional UI is not.

| Before | After | Why |
| --- | --- | --- |
| ⌘K search overlay animated open/close (spring) | Opens and closes instantly | Keyboard-initiated, 100+/day — never animate |
| `.btn { transition-all 300ms }`, no `:active` | `transform 160ms var(--ease-out)` + explicit colour/shadow props; `:active { scale(0.97) }` | Specify properties; pressables must feel pressed |
| No press feedback on chips, icon buttons, summaries | Global `button/[role=button]/summary:active { scale(0.97) }` | Feedback on every pressable |
| Bag badge `scale: 0 → 1` | `opacity 0 + scale(0.9) → 1`, 160 ms | Nothing appears from nothing |
| Cart/mobile drawers: springs, symmetric exit | `cubic-bezier(0.32,0.72,0,1)` 420 ms in / 260 ms out | Drawer curve; system response snaps |
| Mega menu `y: 8`, 220 ms both ways, origin center | `translateY(6px) scale(0.98)`, origin top-left, 200 ms in / 140 ms out, strong ease-out | Scale from the trigger; asymmetric timing |
| Lightbox spring, symmetric | 220 ms in / 140 ms out, strong ease-out | Under budget, asymmetric |
| Route transition 550 ms, `y: 14` | 220 ms, `translateY(6px)` | Navigation is frequent; keep it subtle |
| PDP view switch 450 ms plain crossfade | 220 ms with `blur(2px)` mask, 140 ms exit | Blur bridges two states into one morph |
| Accordion 400 ms open, 400 ms close | 260 ms open / 180 ms close, strong ease-out | Within budget; faster close |
| Reveal variants use framer `y` shorthand (main thread) | Full `transform: translateY()` strings | Hardware-accelerated under page load |
| Stagger 80 ms | 60 ms | Keep cascades inside 30–80 ms, lean fast |
| Progress meters animate `width` | `transform: scaleX()` with left origin | GPU-only properties |
| Card hovers `transition-all` | `transition-[transform,box-shadow] 200ms ease-out` | No unbounded property animation |
| Hover motion ungated | Tailwind `future.hoverOnlyWhenSupported` → `@media (hover:hover)` | Touch fires false hovers on tap |
| Reduced motion zeroed every transition | Keeps opacity/colour at 160 ms, drops transforms and loops | Gentler, not zero |
| `<details>` snapped open | 200 ms settle (`opacity`, `translateY(-4px)`) | Occasional state change deserves a bridge |
| "Add to bag" label never changed | "Added ✓" morph via 2 px blur crossfade, reverts after 1.4 s | State indication + feedback |
| Cart line items teleport in/out | `layout` + 220 ms opacity/scale enter, 160 ms exit | Prevent jarring change (occasional) |
| One easing token (`ease-glow`) | `--ease-out / --ease-in-out / --ease-drawer` tokens + Tailwind `ease-out/in-out/drawer` | Shared vocabulary, no hand-typed near-duplicates |

Left as-is (by design): Science-journey signal dots use `easeIn` while travelling into the cell —
explanatory illustration, not UI; marquees stay `linear`; springs remain on pointer-tracking
parallax (decorative) and the PDP drop-in (first-time moment).

Feel-checks to do with fresh eyes: slow-motion the mega menu and cart drawer; confirm the
blur-masked view switch on the PDP reads as one object; test drawers on a real phone.

## Atelier pass (2026-10-09)

Design read: redesign (preserve) of a luxury K-beauty + pro-aesthetics storefront; dials 8 / 8 / 4.
Pre-flight items fixed: Cormorant Garamond display (echoes the engraved wordmark; Fraunces retired),
eyebrows cut from 28 to 4 across the home page and decorative label dots removed, section numbering
and scroll cue removed, zero em-dashes in our copy, one marquee per page, three-act dark → light → dark
home rhythm (two theme switches), hero reduced to four elements with a two-line headline, invented
study stats and sample reviews replaced by verifiable facts (sample imagery tagged), CTA intents
unified (Build my ritual / Shop GHK-Cu / Verify your serum / For clinics), italic descender clearance,
real lotus mark replaces the hand-drawn SVG, Phosphor icons replace unicode glyphs, loading skeletons
and a tidier 404, pinned stages on 100dvh, scroll listeners replaced with Motion useScroll/useVelocity.
Kept deliberately: step numerals inside the ritual sections (content order, not section labels).
