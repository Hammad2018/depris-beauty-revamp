import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { blogPosts } from "@/lib/content";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);
  return post ? { title: post.title, description: post.excerpt } : { title: "Article" };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <>
      <PageHero eyebrow={`${post.readMins} min read`} title={post.title} intro={post.excerpt} />
      <article className="shell max-w-2xl space-y-5 py-14 text-ink-soft">
        <p className="leading-relaxed">
          At Depris Beauty, we believe great skincare starts with understanding what you&apos;re putting on your skin. In
          this guide, we break it down in plain language — no jargon, just what works and why.
        </p>
        <p className="leading-relaxed">
          Korean skincare has always led on innovation, from gentle double-cleansing to advanced actives like copper
          peptides and exosomes. The key is matching the right ingredient to your skin&apos;s needs, then using it
          consistently.
        </p>
        <h2 className="font-display text-2xl text-ink">Where to start</h2>
        <p className="leading-relaxed">
          If you&apos;re not sure which products are right for you, our 60-second skin quiz builds a personalized routine
          from your skin type and concerns — a simple way to cut through the noise.
        </p>
        <div className="pt-4">
          <ButtonLink href="/quiz" variant="primary">
            Take the skin quiz
          </ButtonLink>
        </div>
        <p className="pt-6 text-sm">
          <Link href="/blog" className="text-camellia underline">
            ← Back to the Journal
          </Link>
        </p>
      </article>
    </>
  );
}
