import Link from "next/link";
import type { Product } from "@/lib/commerce/types";
import { ProductCard } from "@/components/commerce/ProductCard";
import { ProductMedia } from "@/components/commerce/ProductMedia";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { StarRating } from "@/components/ui/StarRating";
import { ButtonLink } from "@/components/ui/Button";
import { TiltCard } from "@/components/ui/TiltCard";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { money } from "@/lib/format";

/** Mixed-size bento: one hero product tile, product tiles, a stat tile and a review tile. */
export function BentoShowcase({ featured, products }: { featured: Product; products: Product[] }) {
  const small = products.filter((p) => p.handle !== featured.handle).slice(0, 2);
  return (
    <section className="mesh-tint">
      <div className="shell py-20 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading index="02" eyebrow="Reach for these first" title={<>The <span className="italic text-gradient">edit</span></>} size="xl" />
          <ButtonLink href="/collections/bestsellers" variant="ghost" className="hidden sm:inline-flex">
            View all bestsellers
          </ButtonLink>
        </div>

        <RevealGroup className="mt-12 grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-12 lg:grid-rows-[repeat(2,minmax(0,1fr))]">
          {/* Hero tile — dark celestial */}
          <RevealItem className="lg:col-span-7 lg:row-span-2">
            <TiltCard className="h-full" max={4}>
              <Link
                href={`/products/${featured.handle}`}
                className="celestial group ring-gradient relative flex h-full min-h-[26rem] flex-col justify-between overflow-hidden rounded-[2rem] p-7 text-white shadow-lift sm:p-9"
              >
                <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-teal-glow/25 blur-3xl transition-transform duration-700 group-hover:scale-125" />
                <div className="relative flex items-center justify-between">
                  <span className="rounded-full glass-dark px-3 py-1 text-xs font-semibold uppercase tracking-wide">The signature</span>
                  <StarRating rating={featured.rating} count={featured.reviewCount} className="text-white/80" />
                </div>
                <div className="relative mx-auto my-6 w-44 sm:w-56">
                  <div className="aspect-square overflow-hidden rounded-3xl shadow-lift">
                    <ProductMedia product={featured} className="h-full w-full" />
                  </div>
                </div>
                <div className="relative">
                  <p className="eyebrow text-teal-glow">{featured.brand}</p>
                  <h3 className="mt-1 font-display text-3xl leading-tight sm:text-4xl">{featured.title}</h3>
                  <p className="mt-2 max-w-md text-white/75">{featured.tagline}</p>
                  <div className="mt-5 flex items-center gap-4">
                    <span className="font-display text-2xl">{money(featured.price, featured.currency)}</span>
                    <span className="btn-primary">Shop now</span>
                  </div>
                </div>
              </Link>
            </TiltCard>
          </RevealItem>

          {/* Product tiles */}
          {small.map((p) => (
            <RevealItem key={p.id} className="lg:col-span-5">
              <ProductCard product={p} />
            </RevealItem>
          ))}

          {/* Stat tile */}
          <RevealItem className="lg:col-span-4">
            <div className="ring-gradient group flex h-full flex-col justify-between rounded-3xl bg-ink p-6 text-white shadow-soft">
              <p className="eyebrow text-teal-glow">Clinically loved</p>
              <p className="font-display text-6xl leading-none">
                <AnimatedCounter value={92} suffix="%" />
              </p>
              <p className="text-sm text-white/70">saw firmer-looking skin in 4 weeks*</p>
            </div>
          </RevealItem>

          {/* Review tile */}
          <RevealItem className="lg:col-span-4">
            <figure className="flex h-full flex-col justify-between rounded-3xl glass-strong p-6 shadow-soft">
              <StarRating rating={5} showValue={false} />
              <blockquote className="mt-3 font-display text-lg leading-snug text-ink">
                “Four weeks in and my skin looks plumper and smoother. The copper tint feels luxe.”
              </blockquote>
              <figcaption className="mt-4 text-sm text-ink-soft">Mina K. · Combination · Firmness</figcaption>
            </figure>
          </RevealItem>

          {/* Ingredient tile */}
          <RevealItem className="lg:col-span-4">
            <Link
              href="/science"
              className="group flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-[#C9EAE3] via-[#D8F0EB] to-[#E8F4F6] p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow"
            >
              <p className="eyebrow">The science</p>
              <p className="font-display text-2xl leading-tight text-ink">Copper peptides, exosomes &amp; skin boosters — explained.</p>
              <span className="text-sm font-semibold text-camellia">
                Explore <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
