import { Marquee } from "@/components/ui/Marquee";

const words = [
  "Copper Peptides", "Exosomes", "Glass Skin", "Skin Boosters",
  "Clinically Loved", "Sourced from Korea", "Cruelty-Free", "Same-Day Shipping",
];

/** Bold full-bleed marquee ribbon used as a kinetic divider between sections. */
export function MarqueeRibbon() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-indigo via-periwinkle to-teal py-5 text-white">
      <Marquee className="mask-fade-x vel-skew">
        {words.map((w) => (
          <span key={w} className="flex items-center gap-5 font-display text-2xl italic sm:text-3xl">
            {w}
            <span className="text-teal-glow">✦</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
