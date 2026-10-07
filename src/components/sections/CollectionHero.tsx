import Image from "next/image";
import Link from "next/link";
import type { Collection, Product } from "@/lib/commerce/types";
import { LabTicker } from "@/components/ui/LabTicker";

/** Category hero: that line's real product photo, blurb, count and sibling categories. */
export function CollectionHero({ collection, products, siblings, pro = false }: { collection: { title: string; description: string; handle?: string }; products: Product[]; siblings: Collection[]; pro?: boolean }) {
  const image = products.find((p) => p.images[0]?.url)?.images[0]?.url;
  return (
    <section className="relative overflow-hidden bg-navy-deep text-white">
      {image && <Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-70" />}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/75 to-navy-deep/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-navy-deep/30" />
      <div className="shell relative py-20 lg:py-28">
        <p className="mono-label text-teal-glow">{pro ? "Professional line" : "Collection"} · {products.length} {products.length === 1 ? "product" : "products"}</p>
        <h1 className="h-display mt-3 max-w-3xl font-display">{collection.title}</h1>
        {collection.description && <p className="mt-5 max-w-xl text-lg text-white/75">{collection.description}</p>}
        {siblings.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {siblings.map((s) => (
              <Link key={s.handle} href={`/collections/${s.handle}`} className={`rounded-full border px-3.5 py-1.5 text-sm transition ${s.handle === collection.handle ? "border-teal-glow bg-teal-glow/15 text-white" : "border-white/20 text-white/75 hover:border-white/50 hover:text-white"}`}>
                {s.title}
              </Link>
            ))}
          </div>
        )}
      </div>
      <LabTicker items={pro ? ["COLD-CHAIN", "LOT-TRACEABLE", "SAME-DAY DISPATCH", "TRADE PRICING", "FOR TRAINED PRACTITIONERS"] : ["FORMULATED IN KOREA", "AUTHORIZED RETAILER", "SHIPS SAME-DAY FROM WYOMING", "FREE US SHIPPING OVER $50", "CRUELTY-FREE"]} />
    </section>
  );
}
