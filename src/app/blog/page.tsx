import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { blogPosts } from "@/lib/content";
import type { Tone } from "@/lib/commerce/types";

const toneClass: Record<Tone, string> = {
  blush: "from-[#F7D9D4] to-[#FBECE6]",
  bronze: "from-[#EAD6B4] to-[#F5EAD7]",
  sage: "from-[#CBDAC9] to-[#E6EEE2]",
  sand: "from-[#EADBC6] to-[#F5ECDD]",
  ink: "from-[#4A4038] to-[#8A6A3E]",
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
