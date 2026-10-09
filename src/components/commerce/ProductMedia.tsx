import Image from "next/image";
import type { Product, Tone } from "@/lib/commerce/types";

const toneGradient: Record<Tone, string> = {
  blush: "from-[#F4D7D2] via-[#EFDCED] to-[#E7E9FA]",
  bronze: "from-[#C7E9E3] via-[#D3ECF1] to-[#E3EAFB]",
  sage: "from-[#C9EAE3] via-[#D8F0EB] to-[#E8F4F6]",
  sand: "from-[#DBE4FB] via-[#E6ECFC] to-[#EFF2FE]",
  ink: "from-[#212B74] via-[#2E3C9E] to-[#2FA39A]",
};

const toneBottle: Record<Tone, string> = {
  blush: "#E79A90",
  bronze: "#157A73",
  sage: "#2E8B7E",
  sand: "#4E6AD0",
  ink: "#CBD6DA",
};

/** A product bottle silhouette, reads as "product" without needing photography. */
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
