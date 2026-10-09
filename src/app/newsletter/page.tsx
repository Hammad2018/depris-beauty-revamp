import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { NewsletterSignup } from "@/components/personal/NewsletterSignup";
import { issues } from "@/lib/newsletter";
import { getCommerce } from "@/lib/commerce";
import { PetalBullet } from "@/components/petals/Petal";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "The Monthly Drop",
  description: "One letter a month from Depris Beauty: rituals, clinic notes, what landed on the shelf and the member offer. Read the archive.",
};

export default async function NewsletterPage() {
  const all = await getCommerce().getProducts();
  const titles = Object.fromEntries(all.map((p) => [p.handle, p.title]));
  return (
    <>
      <PageHero eyebrow="The Monthly Drop" title="One letter a month, written for your skin" intro="Pick what you care about. The Drop arrives tailored, on the first Thursday." />
      <section className="shell py-12">
        <div className="mx-auto max-w-xl r-petal bg-porcelain p-6 shadow-soft sm:p-8">
          <NewsletterSignup tone="light" id="archive" />
        </div>
      </section>
      <section className="shell py-16">
        <h2 className="font-display text-3xl text-ink sm:text-4xl">The archive</h2>
        <div className="mt-10 space-y-16">
          {issues.map((it, i) => (
            <Reveal key={it.slug} as="article" className="scroll-mt-28">
              <div id={it.slug} className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div className={`relative aspect-[5/4] overflow-hidden shadow-lift ${i % 2 ? "r-petal-alt" : "r-petal"}`}>
                  <Image src={it.image} alt="" fill sizes="(max-width: 1024px) 92vw, 46vw" className="object-cover" />
                </div>
                <div>
                  <p className="mono-label text-camellia">{it.month}</p>
                  <h3 className="mt-2 font-display text-3xl leading-tight text-ink sm:text-4xl">{it.title}</h3>
                  <p className="mt-3 text-lg text-ink-soft">{it.standfirst}</p>
                  <ul className="mt-5 space-y-2 text-ink">
                    {it.sections.map((s) => <li key={s} className="flex gap-2"><PetalBullet tone="blush" />{s}</li>)}
                  </ul>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {it.products.map((h) => (
                      <li key={h}><Link href={`/products/${h}`} className="rounded-full border border-sand px-3 py-1 text-xs text-ink-soft transition-colors hover:border-camellia hover:text-ink">{titles[h] ?? h}</Link></li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
