import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { blogPosts } from "@/lib/content";

/** Journal teasers: one lead story (photo bleeding past the grid) and two supporting rows. */
export function EditorialTeasers() {
  const [lead, ...rest] = blogPosts;
  if (!lead) return null;
  return (
    <section className="shell py-24 lg:py-32">
      <div className="flex items-end justify-between gap-6">
        <SectionHeading title={<>Skincare, <span className="italic text-gradient">decoded</span></>} size="xl" fill />
        <Link href="/blog" className="hidden items-center gap-1.5 text-sm font-medium text-camellia hover:underline sm:inline-flex">
          All articles <ArrowRight size={14} />
        </Link>
      </div>

      <RevealGroup className="mt-12 grid gap-10 lg:grid-cols-[1.45fr_1fr] lg:gap-14">
        <RevealItem>
          <Link href={`/blog/${lead.slug}`} className="group block">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] shadow-lift">
              <Image
                src={lead.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 92vw, 56vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <span className="absolute left-4 top-4 rounded-full glass-dark px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-white">
                {lead.readMins} min read
              </span>
            </div>
            <h3 className="mt-6 max-w-xl font-display text-3xl leading-tight text-ink transition-colors group-hover:text-camellia sm:text-4xl">
              {lead.title}
            </h3>
            <p className="mt-3 max-w-xl text-ink-soft">{lead.excerpt}</p>
          </Link>
        </RevealItem>

        <div className="grid content-start gap-8 lg:pt-10">
          {rest.slice(0, 2).map((post) => (
            <RevealItem key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group grid grid-cols-[8rem_1fr] items-center gap-6">
                <div className="relative aspect-square overflow-hidden rounded-2xl shadow-soft">
                  <Image src={post.image} alt="" fill sizes="8rem" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]" />
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">{post.readMins} min read</p>
                  <h3 className="mt-1.5 font-display text-xl leading-snug text-ink transition-colors group-hover:text-camellia sm:text-2xl">{post.title}</h3>
                </div>
              </Link>
            </RevealItem>
          ))}
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-camellia sm:hidden">
            All articles <ArrowRight size={14} />
          </Link>
        </div>
      </RevealGroup>
    </section>
  );
}
