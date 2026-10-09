import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Lightbulb } from "@phosphor-icons/react/dist/ssr";
import { getCommerce } from "@/lib/commerce";
import { guideBySlug, guides } from "@/lib/guides";
import { faqById } from "@/lib/faq";
import { concernLabels } from "@/lib/taxonomy";
import { GuideBody } from "@/components/guides/GuideBody";
import { GuideCard } from "@/components/guides/GuideCard";
import { FaqItem } from "@/components/sections/FaqSection";
import { ProductCard } from "@/components/commerce/ProductCard";
import { PetalBullet, LotusFlourish } from "@/components/petals/Petal";
import { PetalSeam } from "@/components/petals/PetalSeam";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const g = guideBySlug(params.slug);
  return g ? { title: g.title, description: g.deck } : { title: "Guide" };
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default async function GuidePage({ params }: { params: { slug: string } }) {
  const g = guideBySlug(params.slug);
  if (!g) notFound();
  const commerce = getCommerce();
  const all = await commerce.getProducts();
  const byHandle = new Map(all.map((p) => [p.handle, p]));
  const toc = g.sections.map((s) => ({ id: slug(s.heading), label: s.heading }));
  const related = guides.filter((x) => x.slug !== g.slug && x.concerns.some((c) => g.concerns.includes(c))).slice(0, 2);
  const faqs = g.faqIds.map(faqById).filter((f): f is NonNullable<typeof f> => Boolean(f));

  return (
    <>
      <section className="relative overflow-hidden bg-navy-deep text-white">
        <Image src={g.image} alt="" fill priority sizes="100vw" className="object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/70 to-navy-deep/20" />
        <div className="shell relative flex min-h-[62vh] flex-col justify-end py-16">
          <nav className="text-xs text-white/60"><Link href="/guides" className="hover:text-white">Guides</Link> / <span className="text-white/90">{g.title}</span></nav>
          <p className="mono-label mt-6 text-teal-glow">{g.audience === "clinics" ? "For clinics" : g.audience === "beginners" ? "Start here" : "Everyone"} · {g.readMins} min</p>
          <h1 className="h-display mt-3 max-w-3xl font-display">{g.title}</h1>
          <p className="mt-4 max-w-xl text-lg text-white/75">{g.deck}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {g.concerns.map((c) => (
              <li key={c}><Link href={`/collections/${c}`} className="rounded-full border border-white/25 px-3 py-1 text-xs text-white/85 hover:border-teal-glow">{concernLabels[c]}</Link></li>
            ))}
          </ul>
        </div>
      </section>

      <div className="relative">
        <PetalSeam position="top" />
        <GuideBody toc={toc}>
          {g.sections.map((s, i) => {
            const products = (s.products ?? []).map((h) => byHandle.get(h)).filter((p): p is NonNullable<typeof p> => Boolean(p));
            return (
              <section key={s.heading} id={slug(s.heading)} className="scroll-mt-28 border-b border-sand py-10 first:pt-0 last:border-b-0">
                <div className="flex items-start gap-4">
                  <span className="index-num font-display italic">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">{s.heading}</h2>
                </div>
                <div className="mt-5 max-w-2xl space-y-4 text-lg leading-relaxed text-ink-soft">
                  {s.body.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
                </div>
                {s.tip && (
                  <p className="mt-6 flex max-w-2xl gap-3 r-leaf bg-gold/15 p-5 text-ink">
                    <Lightbulb size={20} weight="fill" className="mt-0.5 shrink-0 text-[#b58a1e]" />
                    <span>{s.tip}</span>
                  </p>
                )}
                {products.length > 0 && (
                  <div className="mt-8">
                    <p className="mono-label text-camellia">In this step</p>
                    <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-3">
                      {products.map((p, j) => (
                        <div key={p.id} className={j % 2 === 1 ? "sm:translate-y-6" : ""}><ProductCard product={p} /></div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            );
          })}

          {faqs.length > 0 && (
            <section className="mt-6">
              <div className="flex items-center gap-3"><LotusFlourish size={40} tone="jade" /><h2 className="font-display text-3xl text-ink">Questions this guide answers</h2></div>
              <div className="mt-4">{faqs.map((f) => <FaqItem key={f.id} f={f} />)}</div>
            </section>
          )}
        </GuideBody>
      </div>

      {related.length > 0 && (
        <section className="mesh-light">
          <div className="shell py-20">
            <h2 className="font-display text-3xl text-ink sm:text-4xl">Keep reading</h2>
            <ul className="mt-2 flex items-center gap-2 text-sm text-ink-soft"><PetalBullet tone="blush" />Chosen for the same concerns.</ul>
            <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:w-2/3">
              {related.map((r, i) => <GuideCard key={r.slug} guide={r} shape={i ? "leaf" : "lotus"} />)}
            </div>
            <Link href="/guides" className="mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-camellia hover:underline">All guides <ArrowRight size={14} /></Link>
          </div>
        </section>
      )}
    </>
  );
}
