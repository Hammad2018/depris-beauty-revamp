import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { blogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Journal",
  description: "Skincare, decoded, ingredient guides, routines and K-beauty know-how from Depris Beauty.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero eyebrow="The Journal" title="Skincare, decoded" intro="Ingredient guides, routine-building and K-beauty know-how." />
      <section className="shell grid gap-6 py-14 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <div className="relative aspect-[3/2] overflow-hidden rounded-3xl shadow-soft">
              <Image src={post.image} alt="" fill sizes="(max-width: 640px) 92vw, 33vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
            </div>
            <p className="eyebrow mt-4">{post.readMins} min read</p>
            <h2 className="mt-1 font-display text-lg leading-snug text-ink group-hover:text-camellia">{post.title}</h2>
            <p className="mt-1.5 text-sm text-ink-soft">{post.excerpt}</p>
          </Link>
        ))}
      </section>
    </>
  );
}
