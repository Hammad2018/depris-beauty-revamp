"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart/CartContext";
import { navLinks, shopMenu } from "@/lib/content";

export function Navbar() {
  const cart = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-sand/70 bg-cream/85 backdrop-blur-md">
      <nav className="shell flex items-center justify-between gap-6 py-4">
        {/* Left: mobile toggle + nav */}
        <div className="flex items-center gap-6">
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            <span className="block h-0.5 w-6 bg-ink" />
            <span className="mt-1.5 block h-0.5 w-6 bg-ink" />
            <span className="mt-1.5 block h-0.5 w-4 bg-ink" />
          </button>

          <div
            className="relative hidden lg:flex lg:items-center lg:gap-6"
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}
          >
            <button className="text-sm font-medium text-ink hover:text-camellia" aria-expanded={shopOpen}>
              Shop
            </button>
            {shopOpen && (
              <div className="absolute left-0 top-full w-[42rem] rounded-3xl border border-sand bg-porcelain p-6 shadow-lift">
                <div className="grid grid-cols-3 gap-6">
                  {shopMenu.map((group) => (
                    <div key={group.title}>
                      <p className="eyebrow mb-3 text-camellia">{group.title}</p>
                      <ul className="space-y-2">
                        {group.links.map((l) => (
                          <li key={l.href + l.label}>
                            <Link href={l.href} className="text-sm text-ink-soft hover:text-ink">
                              {l.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {navLinks.slice(1).map((l) => (
              <Link key={l.href} href={l.href} className="text-sm font-medium text-ink hover:text-camellia">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Center: wordmark */}
        <Link href="/" className="font-display text-2xl tracking-tight text-ink">
          Depris<span className="text-camellia">.</span>
        </Link>

        {/* Right: actions */}
        <div className="flex items-center gap-4">
          <Link href="/shop" className="hidden text-sm text-ink-soft hover:text-ink sm:block" aria-label="Search">
            Search
          </Link>
          <Link href="/account" className="hidden text-sm text-ink-soft hover:text-ink sm:block">
            Account
          </Link>
          <button
            onClick={cart.openCart}
            className="relative rounded-full bg-ink px-4 py-2 text-sm font-medium text-porcelain transition hover:bg-camellia"
            aria-label={`Open bag, ${cart.count} items`}
          >
            Bag
            {cart.count > 0 && (
              <span className="ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-porcelain px-1 text-xs font-semibold text-ink">
                {cart.count}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-sand bg-cream lg:hidden">
          <div className="shell flex flex-col gap-1 py-4">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-2.5 text-ink hover:bg-sand"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 border-t border-sand pt-3">
              {shopMenu.flatMap((g) => g.links).slice(0, 10).map((l) => (
                <Link
                  key={l.href + l.label}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-1.5 text-sm text-ink-soft hover:text-ink"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
