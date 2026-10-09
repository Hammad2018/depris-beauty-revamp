import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { FaqItem } from "@/components/sections/FaqSection";
import { faqGroups, faqs } from "@/lib/faq";
import { LotusFlourish } from "@/components/petals/Petal";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Shipping, authenticity, how to use copper peptides and skin boosters, and professional accounts at Depris Beauty.",
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero eyebrow="FAQ" title="Asked often, answered plainly" intro="Every answer links to the guide or product it is about. Still stuck? Write to us and a person replies." />
      <div className="shell grid gap-12 py-16 lg:grid-cols-[14rem_1fr] lg:gap-20">
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <LotusFlourish size={48} tone="lilac" />
            <ol className="mt-4 space-y-2">
              {faqGroups.map((g) => (
                <li key={g}><a href={`#${g.toLowerCase().replace(/[^a-z]+/g, "-")}`} className="text-sm text-ink-soft hover:text-ink">{g}</a></li>
              ))}
            </ol>
            <Link href="/contact" className="mt-6 inline-block text-sm font-medium text-camellia hover:underline">Ask a person</Link>
          </div>
        </aside>
        <div className="min-w-0">
          {faqGroups.map((g) => (
            <Reveal key={g} className="mb-14 scroll-mt-28" as="section">
              <div id={g.toLowerCase().replace(/[^a-z]+/g, "-")} className="scroll-mt-28">
                <h2 className="font-display text-3xl text-ink sm:text-4xl">{g}</h2>
                <div className="mt-2">{faqs.filter((f) => f.group === g).map((f) => <FaqItem key={f.id} f={f} />)}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
