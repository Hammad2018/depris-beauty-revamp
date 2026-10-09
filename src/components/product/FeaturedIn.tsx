import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Question, Users } from "@phosphor-icons/react/dist/ssr";
import { featuredIn } from "@/lib/connections";
import { Petal } from "@/components/petals/Petal";

/** Where this product appears across the site: guides, FAQ answers and member rituals. */
export function FeaturedIn({ handle }: { handle: string }) {
  const { guides, faqs, rituals } = featuredIn(handle);
  if (guides.length + faqs.length + rituals.length === 0) return null;
  return (
    <section className="relative overflow-hidden mesh-tint">
      <Petal tone="blush" size={110} shape="lotus" opacity={0.35} className="absolute -left-8 bottom-6 rotate-12" />
      <div className="shell relative py-16">
        <p className="mono-label text-camellia">Featured in</p>
        <h2 className="mt-2 font-display text-3xl text-ink sm:text-4xl">Read it in context</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {guides.slice(0, 2).map((g) => (
            <Link key={g.slug} href={`/guides/${g.slug}`} className="group flex gap-4 r-petal bg-porcelain p-4 shadow-soft transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-lift">
              <span className="relative h-20 w-20 shrink-0 overflow-hidden petal-mask"><Image src={g.image} alt="" fill sizes="80px" className="object-cover" /></span>
              <span>
                <span className="font-mono text-[10px] uppercase tracking-wide text-ink-soft">Guide · {g.readMins} min</span>
                <span className="mt-1 block font-display text-lg leading-snug text-ink group-hover:text-camellia">{g.title}</span>
              </span>
            </Link>
          ))}
          {faqs.slice(0, 1).map((f) => (
            <Link key={f.id} href={`/faq#${f.id}`} className="group flex gap-4 r-petal-alt bg-porcelain p-4 shadow-soft transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-lift">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-lilac/60 text-indigo"><Question size={22} /></span>
              <span>
                <span className="font-mono text-[10px] uppercase tracking-wide text-ink-soft">FAQ</span>
                <span className="mt-1 block font-display text-lg leading-snug text-ink group-hover:text-camellia">{f.q}</span>
              </span>
            </Link>
          ))}
          {rituals.slice(0, 1).map((r) => (
            <Link key={r.id} href="/community" className="group flex gap-4 r-petal bg-porcelain p-4 shadow-soft transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-lift">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-glow/25 text-bronze-deep"><Users size={22} /></span>
              <span>
                <span className="font-mono text-[10px] uppercase tracking-wide text-ink-soft">In the Circle · Sample</span>
                <span className="mt-1 block font-display text-lg leading-snug text-ink group-hover:text-camellia">{r.name}&apos;s {r.when} ritual</span>
                <span className="mt-1 inline-flex items-center gap-1 text-xs text-camellia">Read <ArrowRight size={12} /></span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
