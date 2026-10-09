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

/** Journal teasers: one lead story and two supporting, not three equal cards. */
export function EditorialTeasers() {
  const [lead, ...rest] = blogPosts;
  if (!lead) return null;
  return (
    <section className="shell py-20">
      <div className="flex items-end justify-between gap-6">
        <SectionHeading title="Skincare, decoded" size="xl" />
        <Link href="/blog" className="hidden text-sm font-medium text-camellia hover:underline sm:block">All articles →</Link>
      </div>
      <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <Link href={`/blog/${lead.slug}`} className="group">
          <div className={`aspect-[16/10] rounded-3xl bg-gradient-to-br ${toneClass[lead.tone]}`} />
          <p className="mt-4 text-sm text-ink-soft">{lead.readMins} min read</p>
          <h3 className="mt-1 font-display text-3xl leading-tight text-ink group-hover:text-camellia">{lead.title}</h3>
          <p className="mt-2 max-w-xl text-ink-soft">{lead.excerpt}</p>
        </Link>
        <div className="grid gap-6">
          {rest.slice(0, 2).map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group grid grid-cols-[7rem_1fr] items-center gap-5">
              <div className={`aspect-square rounded-2xl bg-gradient-to-br ${toneClass[post.tone]}`} />
              <div>
                <p className="text-sm text-ink-soft">{post.readMins} min read</p>
                <h3 className="mt-1 font-display text-xl leading-snug text-ink group-hover:text-camellia">{post.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
