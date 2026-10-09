"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { money } from "@/lib/format";
import { PRO_CATEGORIES, type NavData } from "@/lib/nav";

/** Shop mega menu: real categories (consumer / professional), concern lenses, featured product. */
export function MegaMenu({ data, onNavigate }: { data: NavData; onNavigate: () => void }) {
  const consumer = data.categories.filter((c) => !PRO_CATEGORIES.includes(c.handle));
  const pro = data.categories.filter((c) => PRO_CATEGORIES.includes(c.handle));
  const col = "space-y-1.5";
  const link = "block rounded-lg px-2 py-1 text-sm text-ink-soft transition hover:bg-sand/60 hover:text-ink";
  return (
    <motion.div
      initial={{ opacity: 0, transform: "translateY(6px) scale(0.98)" }}
      animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
      exit={{ opacity: 0, transform: "translateY(4px) scale(0.99)", transition: { duration: 0.14, ease: [0.23, 1, 0.32, 1] } }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
      style={{ transformOrigin: "top left" }}
      className="absolute left-0 top-full w-[min(72rem,calc(100vw-2rem))] pt-3"
    >
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1.2fr] gap-6 rounded-3xl border border-white/70 bg-cream/95 p-7 shadow-lift backdrop-blur-2xl">
        <div>
          <p className="mono-label text-camellia">Skincare</p>
          <ul className={`mt-3 ${col}`}>
            {consumer.map((c) => (
              <li key={c.handle}><Link href={`/collections/${c.handle}`} onClick={onNavigate} className={link}>{c.title}</Link></li>
            ))}
            <li><Link href="/shop" onClick={onNavigate} className={`${link} font-medium text-ink`}>Shop all →</Link></li>
          </ul>
        </div>
        <div>
          <p className="mono-label text-camellia">By concern</p>
          <ul className={`mt-3 ${col}`}>
            {data.concerns.map((c) => (
              <li key={c.handle}><Link href={`/collections/${c.handle}`} onClick={onNavigate} className={link}>{c.title}</Link></li>
            ))}
            <li><Link href="/quiz" onClick={onNavigate} className={`${link} font-medium text-ink`}>Not sure? Build my ritual →</Link></li>
          </ul>
        </div>
        <div>
          <p className="mono-label text-indigo">Professional</p>
          <ul className={`mt-3 ${col}`}>
            {pro.map((c) => (
              <li key={c.handle}><Link href={`/collections/${c.handle}`} onClick={onNavigate} className={link}>{c.title}</Link></li>
            ))}
            <li><Link href="/pro" onClick={onNavigate} className={`${link} font-medium text-ink`}>For clinics →</Link></li>
          </ul>
        </div>
        <div>
          <p className="mono-label text-camellia">Learn</p>
          <ul className={`mt-3 ${col}`}>
            <li><Link href="/guides" onClick={onNavigate} className={link}>Guides</Link></li>
            <li><Link href="/science" onClick={onNavigate} className={link}>The Science</Link></li>
            <li><Link href="/faq" onClick={onNavigate} className={link}>FAQ</Link></li>
            <li><Link href="/blog" onClick={onNavigate} className={link}>Journal</Link></li>
            <li><Link href="/community" onClick={onNavigate} className={link}>The Circle</Link></li>
            <li><Link href="/newsletter" onClick={onNavigate} className={link}>The Monthly Drop</Link></li>
            <li><Link href="/bundles" onClick={onNavigate} className={`${link} font-medium text-ink`}>Bundles →</Link></li>
          </ul>
        </div>
        {data.featured && (
          <Link href={`/products/${data.featured.handle}`} onClick={onNavigate} className="group relative overflow-hidden rounded-2xl bg-navy-deep text-white">
            {data.featured.image && (
              <Image src={data.featured.image} alt="" fill sizes="300px" className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/30 to-transparent" />
            <div className="relative flex h-full min-h-[16rem] flex-col justify-end p-5">
              <p className="mono-label text-teal-glow">The signature</p>
              <p className="mt-1 font-display text-xl leading-tight">{data.featured.title}</p>
              <p className="mt-1 text-sm text-white/75">{money(data.featured.price, data.featured.currency)} · Shop now →</p>
            </div>
          </Link>
        )}
      </div>
    </motion.div>
  );
}
