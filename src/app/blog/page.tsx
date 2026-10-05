import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { blogPosts } from "@/lib/content";
import type { Tone } from "@/lib/commerce/types";

const toneClass: Record<Tone, string> = {
  blush: "from-[#F4D7D2] to-[#E7E9FA]",
  bronze: "from-[#C7E9E3] to-[#E3EAFB]",
  sage: "from-[#C9EAE3] to-[#E8F4F6]",
  sand: "from-[#DBE4FB] to-[#EFF2FE]",
  ink: "from-[#2E3C9E] to-[#2FA39A]",
};

export const metadata: Metadata = {
  title: "The Journal",
  description: "Skincare, decoded — ingredient guides, routines and K-beauty know-how from Depris Beauty.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero eyebrow="The Journal" title="Skincare, decoded" intro="Ingredient guides, routine-building and K-beauty know-how." />
      <section className="shell grid gap-6 py-14 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <div className={`aspect-[3/2] rounded-3xl bg-gradient-to-br ${toneClass[post.tone]}`} />
            <p className="eyebrow mt-4">{post.readMins} min read</p>
            <h2 className="mt-1 font-display text-lg leading-snug text-ink group-hover:text-camellia">{post.title}</h2>
            <p className="mt-1.5 text-sm text-ink-soft">{post.excerpt}</p>
          </Link>
        ))}
      </section>
    </>
  );
}
