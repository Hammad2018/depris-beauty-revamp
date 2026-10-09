import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Starfield } from "@/components/ui/Starfield";
import { FloatingPetals } from "@/components/ui/FloatingPetals";
import { LotusMark } from "@/components/ui/LotusMark";
import { NewsletterSignup } from "@/components/personal/NewsletterSignup";
import { issues } from "@/lib/newsletter";
import { PetalBullet } from "@/components/petals/Petal";

/** The Monthly Drop: one issue a month, preferences up front, the latest issue previewed beside it. */
export function FinaleCTA() {
  const latest = issues[0];
  return (
    <section className="celestial relative overflow-hidden text-white">
      <Starfield />
      <FloatingPetals />
      <div className="shell relative z-10 grid items-center gap-14 py-24 lg:grid-cols-[1.05fr_0.95fr] lg:py-32">
        <div>
          <LotusMark size={56} className="mb-6 drop-shadow-[0_8px_30px_rgba(92,195,184,0.5)]" />
          <p className="mono-label text-teal-glow">The Monthly Drop</p>
          <h2 className="h-display mt-4 font-display">
            <span className="block text-white">One letter a month,</span>
            <span className="block italic text-metallic text-metallic-dark">written for your skin.</span>
          </h2>
          <p className="mt-5 max-w-lg text-lg text-white/75">
            Tell us what you care about and the Drop arrives tailored: rituals, clinic notes, what landed on the shelf, and the member offer.
          </p>
          <div className="mt-8 max-w-xl">
            <NewsletterSignup tone="dark" />
          </div>
        </div>

        {latest && (
          <Link href={`/newsletter#${latest.slug}`} className="group relative block lg:justify-self-end">
            <span className="sticker-alt absolute -left-4 -top-4 z-10 rounded-full bg-gold px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-ink shadow-soft">Latest issue</span>
            <article className="relative w-full max-w-md overflow-hidden r-petal glass-dark p-2 shadow-lift transition-transform duration-300 ease-out group-hover:-translate-y-1">
              <div className="relative aspect-[5/3] overflow-hidden rounded-[2.4rem_0.6rem_0.6rem_0.6rem]">
                <Image src={latest.image} alt="" fill sizes="(max-width: 1024px) 90vw, 28rem" className="object-cover" />
              </div>
              <div className="p-5">
                <p className="mono-label mono-label-plain text-teal-glow">{latest.month}</p>
                <h3 className="mt-1 font-display text-3xl leading-tight">{latest.title}</h3>
                <p className="mt-2 text-sm text-white/70">{latest.standfirst}</p>
                <ul className="mt-4 space-y-1.5 text-sm text-white/80">
                  {latest.sections.slice(0, 3).map((s) => (
                    <li key={s} className="flex gap-2"><PetalBullet tone="jade" />{s}</li>
                  ))}
                </ul>
                <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-teal-glow">
                  Read the archive <ArrowRight size={14} className="transition-transform duration-200 ease-out group-hover:translate-x-1" />
                </p>
              </div>
            </article>
          </Link>
        )}
      </div>
    </section>
  );
}
