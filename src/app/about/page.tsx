import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { TrustBand } from "@/components/commerce/TrustBand";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "About & Authenticity",
  description: "Why Depris Beauty, authentic Korean skincare, sourced from Korea, stocked in the US, cruelty-free.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our promise"
        title="Authentic Korean skincare, without the wait"
        intro={site.description}
      />

      <section className="shell grid gap-10 py-14 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl text-ink">The Depris story</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">
            We started Depris Beauty to bring the cutting edge of Korean skincare to the US, the advanced actives, like
            copper peptides and exosomes, that usually take weeks to import. Everything is fully stocked in Cheyenne,
            Wyoming, so it ships the same day. No long waits, no grey-market guesswork.
          </p>
          <p className="mt-4 leading-relaxed text-ink-soft">
            We&apos;re an authorized retailer sourcing directly from Korea, where cosmetic animal testing is banned, so
            our lines are cruelty-free by design. Clinical where it counts, luxurious to use.
          </p>
        </div>
        <div className="space-y-4">
          <TrustBand />
        </div>
      </section>

      <section id="shipping" className="shell scroll-mt-28 py-6">
        <h2 className="font-display text-2xl text-ink">Shipping</h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">
          Orders ship same-day from Cheyenne, WY. Free US shipping on orders over $50. Tracking is emailed as soon as
          your order leaves our facility.
        </p>
      </section>
      <section id="returns" className="shell scroll-mt-28 py-6">
        <h2 className="font-display text-2xl text-ink">Returns &amp; refunds</h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">
          Unopened items can be returned within 30 days for a full refund. If something arrives damaged, contact us at{" "}
          <a href={`mailto:${site.email}`} className="text-camellia underline">
            {site.email}
          </a>{" "}
          and we&apos;ll make it right.
        </p>
      </section>
    </>
  );
}
