import type { Tone } from "@/lib/commerce/types";

const toneGradient: Record<Tone, string> = {
  blush: "from-[#F7D9D4] to-[#FBF5ED]",
  bronze: "from-[#E7CFA8] to-[#FBF5ED]",
  sage: "from-[#CBDAC9] to-[#FBF5ED]",
  sand: "from-[#EADbC6] to-[#FBF5ED]",
  ink: "from-[#8A6A3E] to-[#E7CFA8]",
};

export function ProductMediaMini({ tone, alt }: { tone: Tone; alt: string }) {
  return (
    <div
      className={`h-16 w-16 shrink-0 rounded-xl bg-gradient-to-br ${toneGradient[tone]}`}
      role="img"
      aria-label={alt}
    />
  );
}
