import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { faqs, type Faq } from "@/lib/faq";
import { guideBySlug } from "@/lib/guides";
import { PetalBullet, LotusFlourish } from "@/components/petals/Petal";
import { Reveal } from "@/components/ui/Reveal";

export function FaqItem({ f, open = false }: { f: Faq; open?: boolean }) {
  const links = [
    ...(f.guides ?? []).map((s) => guideBySlug(s)).filter(Boolean).map((g) => ({ href: `/guides/${g!.slug}`, label: g!.title })),
    ...(f.products ?? []).map((h) => ({ href: `/products/${h}`, label: h.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) })),
  ];
  return (
    <details id={f.id} className="group border-b border-ink/10 py-5" open={open}>
      <summary className="flex cursor-pointer list-none items-start gap-4 marker:content-['']">
        <span className="mt-1 h-2.5 w-2.5 shrink-0 rotate-45 rounded-[2px] bg-camellia/70 transition-transform duration-200 ease-out group-open:rotate-[135deg]" />
        <span className="flex-1 font-display text-xl leading-snug text-ink sm:text-2xl">{f.q}</span>
      </summary>
      <div className="mt-3 pl-7">
        <p className="max-w-2xl leading-relaxed text-ink-soft">{f.a}</p>
        {links.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
            {links.map((l) => (
              <li key={l.href} className="flex items-start gap-1.5 text-sm">
                <PetalBullet tone="jade" />
                <Link href={l.href} className="text-camellia underline-offset-4 hover:underline">{l.label}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </details>
  );
}

/** Home FAQ: a sticky question-mark lotus on the left, five answers on the right. */
export function FaqSection({ ids = ["shipping", "ghk-dilute", "authentic", "cold-chain", "sensitive"] }: { ids?: string[] }) {
  const picked = ids.map((id) => faqs.find((f) => f.id === id)).filter((f): f is Faq => Boolean(f));
  return (
    <section className="shell grid gap-10 py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:py-32">
      <Reveal className="lg:sticky lg:top-28 lg:self-start">
        <LotusFlourish size={72} tone="jade" />
        <h2 className="h-display mt-4 font-display text-ink">Asked <span className="italic text-gradient">often.</span></h2>
        <p className="mt-5 max-w-sm text-lg text-ink-soft">Straight answers on shipping, authenticity and how to use the strong stuff. Every answer links to the guide or product it is about.</p>
        <Link href="/faq" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-camellia hover:underline">
          All questions <ArrowRight size={14} />
        </Link>
      </Reveal>
      <Reveal>
        {picked.map((f, i) => (
          <FaqItem key={f.id} f={f} open={i === 0} />
        ))}
      </Reveal>
    </section>
  );
}
