import Image from "next/image";
import type { Product, Tone } from "@/lib/commerce/types";

const toneGradient: Record<Tone, string> = {
  blush: "from-[#F8C9D0] via-[#FBD9C4] to-[#F3E7D0]",
  bronze: "from-[#F0CE97] via-[#F6D9B0] to-[#FBEBD2]",
  sage: "from-[#BEE0CC] via-[#D8EBD4] to-[#EFF1DC]",
  sand: "from-[#ECD7BC] via-[#F3E6D2] to-[#F7EFE0]",
  ink: "from-[#4A4038] via-[#8A6A3E] to-[#E7CFA8]",
};

const toneBottle: Record<Tone, string> = {
  blush: "#C9736B",
  bronze: "#8A6A3E",
  sage: "#6E8A74",
  sand: "#B08A5B",
  ink: "#FBF5ED",
};

/** A product bottle silhouette — reads as "product" without needing photography. */
function Bottle({ color }: { color: string }) {
  return (
    <svg width="84" height="124" viewBox="0 0 84 124" fill="none" aria-hidden className="drop-shadow-[0_12px_24px_rgba(46,40,34,0.12)]">
      <rect x="31" y="2" width="22" height="16" rx="4" fill={color} opacity="0.85" />
      <rect x="27" y="16" width="30" height="10" rx="3" fill={color} opacity="0.55" />
      <rect x="16" y="26" width="52" height="96" rx="18" fill={color} opacity="0.16" stroke={color} strokeOpacity="0.5" strokeWidth="1.5" />
      <rect x="24" y="54" width="36" height="44" rx="10" fill={color} opacity="0.22" />
      <circle cx="42" cy="44" r="4" fill={color} opacity="0.5" />
    </svg>
  );
}

export function ProductMedia({
  product,
  priority = false,
  className = "",
}: {
  product: Product;
  priority?: boolean;
  className?: string;
}) {
  const img = product.images[0];
  if (img?.url) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={img.url}
          alt={img.alt}
          fill
          sizes="(max-width: 768px) 50vw, 300px"
          className="object-cover transition-transform duration-500 ease-glow group-hover:scale-[1.04]"
          priority={priority}
        />
      </div>
    );
  }
  const tone = img?.tone ?? product.tone;
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${toneGradient[tone]} ${className}`}
      role="img"
      aria-label={img?.alt ?? product.title}
    >
      <div className="transition-transform duration-500 ease-glow group-hover:scale-[1.05]">
        <Bottle color={toneBottle[tone]} />
      </div>
      <span className="absolute bottom-3 right-4 font-display text-xs italic text-ink/40">{product.brand}</span>
    </div>
  );
}
