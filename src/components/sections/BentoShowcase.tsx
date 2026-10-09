import Link from "next/link";
import type { Product } from "@/lib/commerce/types";
import { ProductCard } from "@/components/commerce/ProductCard";
import { ProductMedia } from "@/components/commerce/ProductMedia";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DispatchCountdown } from "@/components/product/DispatchCountdown";
import { Clock, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { StarRating } from "@/components/ui/StarRating";
import { ButtonLink } from "@/components/ui/Button";
import { TiltCard } from "@/components/ui/TiltCard";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { money } from "@/lib/format";

/** Mixed-size bento: one hero product tile, product tiles, a live dispatch tile and a pairing tile. */
export function BentoShowcase({ featured, products }: { featured: Product; products: Product[] }) {
  const others = products.filter((p) => p.handle !== featured.handle);
  const shelf = others[0];
  const pair = others[1] ?? others[0];
  return (
    <section className="mesh-tint">
      <div className="shell py-20 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading title={<>The <span className="italic text-gradient">edit</span></>} size="xl" fill />
          <ButtonLink href="/collections/bestsellers" variant="ghost" className="hidden sm:inline-flex">
            View all bestsellers
          </ButtonLink>
        </div>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-12 lg:grid-rows-[repeat(2,minmax(0,1fr))_minmax(15rem,auto)]">
          {/* Hero tile, dark celestial */}
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
                <div className="relative mx-auto my-6 w-52 sm:w-64">
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

          {/* One shelf product beside the signature, same height */}
          {shelf && (
            <RevealItem className="lg:col-span-5 lg:row-span-2">
              <ProductCard product={shelf} />
            </RevealItem>
          )}

          {/* Live dispatch tile: real cutoff, ticks every 30s */}
          <RevealItem className="lg:col-span-4">
            <div className="ring-gradient group flex h-full min-h-[15rem] flex-col justify-between rounded-3xl bg-ink p-6 text-white shadow-soft">
              <Clock size={22} weight="light" className="text-teal-glow" />
              <p className="mt-6 font-display text-3xl leading-tight">Order by 3pm MT, it ships today.</p>
              <DispatchCountdown className="mt-4 [&_span]:text-white/90 text-white/60" />
            </div>
          </RevealItem>

          {/* Pairing tile: a real second product from the shelf */}
          {pair && (
            <RevealItem className="lg:col-span-4">
              <Link href={`/products/${pair.handle}`} className="group flex h-full min-h-[15rem] flex-col justify-between rounded-3xl glass-strong p-6 shadow-soft transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-glow">
                <p className="eyebrow">Pairs with the signature</p>
                <div className="mt-4 flex items-center gap-4">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-porcelain">
                    <ProductMedia product={pair} className="h-full w-full" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-xl leading-snug text-ink">{pair.title}</h3>
                    <p className="mt-1 text-sm text-ink-soft">{money(pair.price, pair.currency)}</p>
                  </div>
                </div>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-camellia">
                  View <ArrowRight size={14} className="transition-transform duration-200 ease-out group-hover:translate-x-1" />
                </span>
              </Link>
            </RevealItem>
          )}

          {/* Ingredient tile */}
          <RevealItem className="lg:col-span-4">
            <Link
              href="/science"
              className="group flex h-full min-h-[15rem] flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-[#C9EAE3] via-[#D8F0EB] to-[#E8F4F6] p-6 shadow-soft transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-glow"
            >
              <p className="eyebrow">The science</p>
              <p className="font-display text-2xl leading-tight text-ink">Copper peptides, exosomes &amp; skin boosters, explained.</p>
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
