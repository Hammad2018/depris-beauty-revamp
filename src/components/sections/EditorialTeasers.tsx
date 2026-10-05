import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { blogPosts } from "@/lib/content";
import type { Tone } from "@/lib/commerce/types";

const toneClass: Record<Tone, string> = {
  blush: "from-[#F7D9D4] to-[#FBECE6]",
  bronze: "from-[#EAD6B4] to-[#F5EAD7]",
  sage: "from-[#CBDAC9] to-[#E6EEE2]",
  sand: "from-[#EADBC6] to-[#F5ECDD]",
  ink: "from-[#4A4038] to-[#8A6A3E]",
};

export function EditorialTeasers() {
  return (
    <section className="shell py-16">
      <div className="flex items-end justify-between">
        <SectionHeading eyebrow="The Journal" title="Skincare, decoded" />
        <Link href="/blog" className="hidden text-sm font-medium text-camellia hover:underline sm:block">
          All articles →
        </Link>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {blogPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <div className={`aspect-[3/2] rounded-3xl bg-gradient-to-br ${toneClass[post.tone]}`} />
            <p className="eyebrow mt-4">{post.readMins} min read</p>
            <h3 className="mt-1 font-display text-lg leading-snug text-ink group-hover:text-camellia">{post.title}</h3>
            <p className="mt-1.5 text-sm text-ink-soft">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
