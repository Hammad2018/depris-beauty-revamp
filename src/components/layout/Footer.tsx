import Link from "next/link";
import { footerGroups, site } from "@/lib/content";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-sand bg-porcelain">
      <div className="shell grid gap-10 py-14 lg:grid-cols-[1.3fr_2fr]">
        <div>
          <Link href="/" className="font-display text-3xl text-ink">
            Depris<span className="text-camellia">.</span>
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">{site.description}</p>
          <div className="mt-5">
            <p className="eyebrow mb-2 text-camellia">Join the glow list</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {footerGroups.map((g) => (
            <div key={g.title}>
              <p className="eyebrow mb-3">{g.title}</p>
              <ul className="space-y-2">
                {g.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link href={l.href} className="text-sm text-ink-soft hover:text-ink">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-sand">
        <div className="shell flex flex-col items-center justify-between gap-3 py-5 text-xs text-ink-soft sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. Advanced Korean skincare, stocked in the US.</p>
          <div className="flex items-center gap-4">
            <a href={`mailto:${site.email}`} className="hover:text-ink">{site.email}</a>
            <a href={site.instagram} className="hover:text-ink" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
