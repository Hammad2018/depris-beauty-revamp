import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/commerce/types";
import { money } from "@/lib/format";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MagneticLink } from "@/components/ui/MagneticButton";

/** "For professionals": the clinic side of Depris, with real pro products. */
export function ProBand({ products }: { products: Product[] }) {
  const lead = products[0];
  const rest = products.slice(1, 4);
  if (!lead) return null;
  return (
    <section className="relative overflow-hidden bg-navy-deep text-white">
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_80%_20%,rgba(78,106,208,0.35),transparent_70%)]" />
      <div className="shell relative grid gap-10 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-28">
        <Reveal>
          <p className="mono-label text-teal-glow">For professionals</p>
          <h2 className="h-display mt-3 font-display">The clinic shelf, <span className="italic text-metallic text-metallic-dark">shipped cold.</span></h2>
          <p className="mt-5 max-w-md text-white/75">
            Mesotherapy, exosome boosters, PLLA, fillers and devices, the Korean lines medspas already trust, stocked in the US and dispatched the same day on ice.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <MagneticLink href="/pro" variant="primary">For clinics</MagneticLink>
            <MagneticLink href="/contact" variant="light">Open a trade account</MagneticLink>
          </div>
        </Reveal>

        <RevealGroup className="grid grid-cols-2 gap-4">
          <RevealItem className="col-span-2">
            <Link href={`/products/${lead.handle}`} className="group relative block aspect-[16/9] overflow-hidden rounded-[2rem] shadow-lift">
              {lead.images[0]?.url && <Image src={lead.images[0].url} alt={lead.title} fill sizes="(max-width:1024px) 100vw, 50vw" className="liquid object-cover transition-transform duration-700 group-hover:scale-105" />}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                <div>
                  <p className="mono-label text-teal-glow">{lead.category.replace(/-/g, " ")}</p>
                  <p className="mt-1 font-display text-2xl">{lead.title}</p>
                </div>
                <span className="rounded-full glass-dark px-4 py-2 text-sm">{money(lead.price, lead.currency)} →</span>
              </div>
            </Link>
          </RevealItem>
          {rest.map((p) => (
            <RevealItem key={p.id}>
              <Link href={`/products/${p.handle}`} className="group flex items-center gap-3 rounded-2xl glass-dark p-3 transition hover:bg-white/10">
                <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white/10">
                  {p.images[0]?.url && <Image src={p.images[0].url} alt="" fill sizes="64px" className="object-cover" />}
                </span>
                <span className="min-w-0">
                  <span className="mono-label mono-label-plain block text-[9px] text-white/55">{p.category.replace(/-/g, " ")}</span>
                  <span className="block truncate text-sm font-medium">{p.title}</span>
                  <span className="text-xs text-white/65">{money(p.price, p.currency)}</span>
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
