import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions about your routine or order? The Depris Beauty team is here to help.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="We&apos;re here to help" title="Get in touch" intro="Questions about a product, your routine, or an order? We usually reply within one business day." />
      <section className="shell grid gap-10 py-14 lg:grid-cols-[1.2fr_1fr]">
        <ContactForm />
        <div className="space-y-5 rounded-3xl bg-porcelain p-6 shadow-soft">
          <div>
            <p className="eyebrow text-camellia">Email</p>
            <a href={`mailto:${site.email}`} className="text-ink hover:text-camellia">
              {site.email}
            </a>
          </div>
          <div>
            <p className="eyebrow text-camellia">Phone</p>
            <a href={`tel:${site.phone.replace(/[^0-9]/g, "")}`} className="text-ink hover:text-camellia">
              {site.phone}
            </a>
          </div>
          <div>
            <p className="eyebrow text-camellia">Address</p>
            <p className="text-ink">{site.address}</p>
          </div>
          <div>
            <p className="eyebrow text-camellia">Follow</p>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="text-ink hover:text-camellia">
              @deprisbeauty
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
