export interface Faq {
  id: string;
  group: "Orders & shipping" | "Authenticity" | "Using the products" | "For professionals";
  q: string;
  a: string;
  products?: string[];
  guides?: string[];
}

export const faqs: Faq[] = [
  { id: "shipping", group: "Orders & shipping", q: "How fast does my order ship?", a: "Weekday orders placed before 3pm Mountain Time leave our Cheyenne, Wyoming warehouse the same day. Temperature-sensitive items travel in an insulated mailer. US shipping is free over $50." , guides: ["glass-skin-routine"] },
  { id: "cold-chain", group: "Orders & shipping", q: "Do skin boosters and exosomes ship cold?", a: "Yes. Boosters, exosome products and other temperature-sensitive items ship in a cold mailer with an ice pack, same day, so they spend as little time in transit as possible. Refrigerate on arrival.", products: ["2xsome-skin-booster", "plenaris-exosome-hgf"], guides: ["exosome-aftercare"] },
  { id: "returns", group: "Orders & shipping", q: "What is your returns policy?", a: "Unopened, sealed items can be returned within 30 days. Cold-chain professional products are final sale once shipped, for safety. If anything arrives damaged, email us within 48 hours and we make it right." },
  { id: "authentic", group: "Authenticity", q: "Are your products genuine Korean imports?", a: "Yes. Depris Beauty is an authorized retailer. We source directly from Korean manufacturers and distributors, hold stock in the US, and never buy from grey-market resellers." },
  { id: "verify", group: "Authenticity", q: "How do I verify a lot code?", a: "Every carton carries a lot code. Enter it on the Verify page to read the batch record behind your bottle. If a code does not resolve, contact us before using the product.", guides: ["choosing-a-skin-booster"] },
  { id: "ghk-dilute", group: "Using the products", q: "How do I use the 1 g GHK-Cu jar?", a: "It is a concentrate, not a finished serum. Dilute a small amount into a fragrance-free carrier serum, around one percent to start, and use that on clean, damp skin at night. Our starter guide walks through the maths.", products: ["ghk-cu-topical-cosmetic-1g"], guides: ["ghk-cu-starter"] },
  { id: "ghk-vitc", group: "Using the products", q: "Can I use copper peptides with vitamin C or acids?", a: "Keep them on separate nights to begin with. Copper peptides prefer a calm, low-acid environment. Niacinamide, hyaluronic acid and PDRN are happy companions.", guides: ["layering-actives", "ghk-cu-starter"] },
  { id: "sensitive", group: "Using the products", q: "I have sensitive skin. Where do I start?", a: "Start with the toner and a cream for two weeks, then introduce one active at a time, every other night. Patch-test behind the ear first. The skin quiz builds a gentle sequence for you.", products: ["glutanex-glow-therapy-toner", "glutanex-snow-white-cream-50ml"], guides: ["layering-actives", "sunscreen-decoded"] },
  { id: "pro-account", group: "For professionals", q: "Do you offer clinic or wholesale pricing?", a: "Yes. Licensed professionals can open a pro account for volume pricing, priority cold-chain dispatch and a dedicated line for protocol questions. Apply from the For Clinics page.", guides: ["exosome-aftercare", "choosing-a-skin-booster"] },
  { id: "pro-training", group: "For professionals", q: "Do you provide protocols or training?", a: "Each professional product ships with the manufacturer's protocol sheet. Our guides add aftercare and selection notes, and pro-account holders can book a call with our team." },
];

export const faqGroups = ["Orders & shipping", "Authenticity", "Using the products", "For professionals"] as const;

export function faqsForProduct(handle: string) {
  return faqs.filter((f) => f.products?.includes(handle));
}
export function faqById(id: string) {
  return faqs.find((f) => f.id === id);
}
