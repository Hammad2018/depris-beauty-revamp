import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { blogPosts } from "@/lib/content";
import type { Tone } from "@/lib/commerce/types";

const toneClass: Record<Tone, string> = {
  blush: "from-[#F4D7D2] to-[#E7E9FA]",
  bronze: "from-[#C7E9E3] to-[#E3EAFB]",
  sage: "from-[#C9EAE3] to-[#E8F4F6]",
  sand: "from-[#DBE4FB] to-[#EFF2FE]",
  ink: "from-[#2E3C9E] to-[#2FA39A]",
};

export function EditorialTeasers() {
  return (
    <section className="shell py-20">
      <div className="flex items-end justify-between">
        <SectionHeading index="05" eyebrow="The Journal" title="Skincare, decoded" size="xl" />
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
