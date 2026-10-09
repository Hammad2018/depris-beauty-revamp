import type { Metadata } from "next";
import "./globals.css";
import { display, hanken, plexMono } from "@/lib/fonts";
import { site } from "@/lib/content";
import { CartProvider } from "@/lib/cart/CartContext";
import { Navbar } from "@/components/layout/Navbar";
import { getCommerce } from "@/lib/commerce";
import { buildNavData } from "@/lib/nav";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/commerce/CartDrawer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { ScrollVelocity } from "@/components/ui/ScrollVelocity";
import { PetalDefs } from "@/components/petals/PetalDefs";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const commerce = getCommerce();
  const [products, collections] = await Promise.all([commerce.getProducts(), commerce.getCollections()]);
  const nav = buildNavData(products, collections);
  const recommendations = nav.index.filter((p) => ["ghk-cu-topical-cosmetic-1g", "glutanex-glow-therapy-toner", "bellmona-cc-cream-sunscreen-50ml", "glutanex-night-serum-30ml"].includes(p.handle));
  return (
    <html lang="en" className={`${display.variable} ${hanken.variable} ${plexMono.variable}`}>
      <body className="grain flex min-h-screen flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-porcelain">
          Skip to content
        </a>
        <PetalDefs />
        <CartProvider>
          <SmoothScroll />
          <ScrollVelocity />
          <ScrollProgress />
          <Navbar data={nav} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer recommendations={recommendations} />
        </CartProvider>
      </body>
    </html>
  );
}
