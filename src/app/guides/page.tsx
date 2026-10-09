import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { GuideCard } from "@/components/guides/GuideCard";
import { guides } from "@/lib/guides";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { PetalSeam } from "@/components/petals/PetalSeam";
import { FaqSection } from "@/components/sections/FaqSection";

export const metadata: Metadata = {
  title: "Guides",
  description: "Step-by-step skincare and clinic guides from Depris Beauty, with the products linked where they belong.",
};

const shapes = ["petal", "lotus", "leaf", "lotus", "leaf", "petal"] as const;

export default function GuidesPage() {
  return (
    <>
      <PageHero eyebrow="Guides" title="Written to be followed" intro="Six guides, from the first GHK-Cu dilution to a clinic's exosome aftercare sheet. Each step links the product it means." />
      <section className="relative">
        <PetalSeam position="top" />
        <RevealGroup className="shell grid gap-x-8 gap-y-16 py-20 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((g, i) => (
            <RevealItem key={g.slug} className={i % 3 === 1 ? "lg:mt-16" : i % 3 === 2 ? "lg:-mt-6" : ""}>
              <GuideCard guide={g} shape={shapes[i % shapes.length]} />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
      <FaqSection ids={["ghk-dilute", "ghk-vitc", "sensitive", "pro-account"]} />
    </>
  );
}
