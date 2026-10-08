"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useCart } from "@/lib/cart/CartContext";
import { announcements } from "@/lib/content";
import type { NavData } from "@/lib/nav";
import { Logo } from "./Logo";
import { MegaMenu } from "./MegaMenu";
import { SearchOverlay } from "./SearchOverlay";

const primary = [
  { label: "Concerns", href: "/shop?view=concern" },
  { label: "Science", href: "/science" },
  { label: "Bundles", href: "/bundles" },
  { label: "Pro", href: "/pro" },
];

/**
 * Global header: announcement strip that folds away on scroll, three-column bar with the
 * real logo centred, Shop mega menu, ⌘K search and a full-screen mobile drawer.
 */
export function Navbar({ data }: { data: NavData }) {
  const cart = useCart();
  const pathname = usePathname();
  const [condensed, setCondensed] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [tick, setTick] = useState(0);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setCondensed(y > 48));

  useEffect(() => { setMobile(false); setShopOpen(false); }, [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setSearch(true); }
    };
    window.addEventListener("keydown", onKey);
    const t = setInterval(() => setTick((n) => (n + 1) % announcements.length), 4500);
    return () => { window.removeEventListener("keydown", onKey); clearInterval(t); };
  }, []);
  useEffect(() => { document.body.style.overflow = mobile ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [mobile]);

  const navLink = "rounded-full px-3 py-1.5 text-sm font-medium text-ink transition hover:bg-sand/70 hover:text-camellia";

  return (
    <header className="sticky top-0 z-50">
      {/* announcement strip */}
      <motion.div animate={{ height: condensed ? 0 : 32, opacity: condensed ? 0 : 1 }} transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }} className="overflow-hidden bg-ink text-porcelain">
        <p className="shell flex h-8 items-center justify-center text-center text-xs font-medium tracking-wide">
          <AnimatePresence mode="wait">
            <motion.span key={tick} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }} transition={{ duration: 0.3 }} aria-live="polite">
              {announcements[tick]}
            </motion.span>
          </AnimatePresence>
        </p>
      </motion.div>

      <div className={`border-b border-white/40 backdrop-blur-xl transition-colors duration-300 ${condensed ? "bg-cream/85 shadow-soft" : "bg-cream/70"}`}>
        <nav className={`shell grid grid-cols-[1fr_auto_1fr] items-center transition-[padding] duration-300 ${condensed ? "py-2" : "py-3.5"}`} aria-label="Primary">
          {/* left */}
          <div className="flex items-center gap-1">
            <button className="mr-2 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full hover:bg-sand/70 lg:hidden" onClick={() => setMobile(true)} aria-label="Open menu" aria-expanded={mobile}>
              <span className="block h-0.5 w-5 bg-ink" /><span className="block h-0.5 w-5 bg-ink" /><span className="block h-0.5 w-3 bg-ink" />
            </button>
            <div className="relative hidden lg:block" onMouseEnter={() => setShopOpen(true)} onMouseLeave={() => setShopOpen(false)}>
              <button className={`${navLink} ${shopOpen ? "bg-sand/70 text-camellia" : ""}`} aria-expanded={shopOpen} aria-haspopup="true" onClick={() => setShopOpen((v) => !v)} onFocus={() => setShopOpen(true)}>
                Shop <span aria-hidden className="ml-1 inline-block text-[10px] transition-transform" style={{ transform: shopOpen ? "rotate(180deg)" : "none" }}>▾</span>
              </button>
              <AnimatePresence>{shopOpen && <MegaMenu data={data} onNavigate={() => setShopOpen(false)} />}</AnimatePresence>
            </div>
            <div className="hidden items-center gap-1 lg:flex">
              {primary.map((l) => (
                <Link key={l.href} href={l.href} className={`${navLink} ${pathname === l.href ? "text-camellia" : ""}`}>{l.label}</Link>
              ))}
            </div>
          </div>

          {/* centre: the real lock-up */}
          <motion.div animate={{ transform: condensed ? "scale(0.82)" : "scale(1)" }} transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }} className="justify-self-center">
            <Logo height={46} priority />
          </motion.div>

          {/* right */}
          <div className="flex items-center justify-end gap-1">
            <button onClick={() => setSearch(true)} className={`${navLink} hidden items-center gap-2 sm:inline-flex`} aria-label="Search (⌘K)">
              <span aria-hidden>⌕</span> Search
              <kbd className="mono-label mono-label-plain hidden rounded border border-ink/15 px-1 text-[9px] text-ink-soft xl:inline">⌘K</kbd>
            </button>
            <button onClick={() => setSearch(true)} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-sand/70 sm:hidden" aria-label="Search">⌕</button>
            <Link href="/account" className={`${navLink} hidden md:inline-flex`}>Account</Link>
            <button
              onClick={cart.openCart}
              className="relative ml-1 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-porcelain transition hover:bg-camellia"
              aria-label={`Open bag, ${cart.count} items`}
            >
              Bag
              <AnimatePresence>
                {cart.count > 0 && (
                  <motion.span key="count" initial={{ opacity: 0, transform: "scale(0.9)" }} animate={{ opacity: 1, transform: "scale(1)" }} exit={{ opacity: 0, transform: "scale(0.95)" }} transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }} className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-teal-glow px-1 text-xs font-semibold text-ink">
                    {cart.count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </div>

      <SearchOverlay open={search} onClose={() => setSearch(false)} index={data.index} />

      {/* mobile drawer */}
      <AnimatePresence>
        {mobile && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.15 } }} transition={{ duration: 0.2 }} className="fixed inset-0 z-[80] bg-navy-deep/60 backdrop-blur-sm lg:hidden" onClick={() => setMobile(false)}>
            <motion.aside
              initial={{ transform: "translateX(-100%)" }} animate={{ transform: "translateX(0%)" }} exit={{ transform: "translateX(-100%)", transition: { duration: 0.25, ease: [0.32, 0.72, 0, 1] } }} transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="h-full w-[88vw] max-w-sm overflow-auto bg-cream p-6" onClick={(e) => e.stopPropagation()} aria-label="Menu"
            >
              <div className="flex items-center justify-between"><Logo height={34} /><button onClick={() => setMobile(false)} className="rounded-full px-3 py-1 text-sm text-ink-soft hover:bg-sand" aria-label="Close menu">Close ✕</button></div>
              <button onClick={() => { setMobile(false); setSearch(true); }} className="mt-5 flex w-full items-center gap-2 rounded-full border border-ink/15 px-4 py-3 text-left text-sm text-ink-soft"><span aria-hidden>⌕</span> Search products…</button>
              <p className="mono-label mt-6 text-camellia">Skincare</p>
              <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1">
                {data.categories.map((c) => (
                  <li key={c.handle}><Link href={`/collections/${c.handle}`} className="block rounded-lg px-2 py-1.5 text-sm text-ink hover:bg-sand">{c.title}</Link></li>
                ))}
              </ul>
              <p className="mono-label mt-6 text-camellia">By concern</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {data.concerns.map((c) => (
                  <Link key={c.handle} href={`/collections/${c.handle}`} className="rounded-full border border-ink/15 px-3 py-1.5 text-sm text-ink">{c.title}</Link>
                ))}
              </div>
              <ul className="mt-6 space-y-1 border-t border-ink/10 pt-4">
                {[...primary, { label: "Account", href: "/account" }].map((l) => (
                  <li key={l.href}><Link href={l.href} className="block rounded-lg px-2 py-2 font-display text-xl text-ink hover:bg-sand">{l.label}</Link></li>
                ))}
              </ul>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
