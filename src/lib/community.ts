export interface Ritual {
  id: string;
  name: string;
  place: string;
  skin: string;
  when: "morning" | "night";
  quote: string;
  products: string[]; // handles
  image: string;
  sample: true;
}

/** Member rituals. Sample content for the pitch, tagged as such wherever it renders. */
export const rituals: Ritual[] = [
  { id: "r1", name: "Leah", place: "Denver, CO", skin: "Combination, 34", when: "night", quote: "Toner, two pumps of night serum, then my GHK-Cu mix on peptide nights. The order never changes, the glow does.", products: ["glutanex-glow-therapy-toner", "glutanex-night-serum-30ml", "ghk-cu-topical-cosmetic-1g"], image: "/renders/journal-routine.webp", sample: true },
  { id: "r2", name: "Marcus", place: "Austin, TX", skin: "Oily, 29", when: "morning", quote: "I was a sunscreen skipper. The CC cream fixed that because it also fixed my redness.", products: ["bellmona-cc-cream-sunscreen-50ml"], image: "/renders/sky.webp", sample: true },
  { id: "r3", name: "Dr. Imani Cole", place: "Chicago, IL", skin: "Clinic owner", when: "night", quote: "We moved our post-needling protocol to 2XSOME. Patients notice day three calm, and so do we.", products: ["2xsome-skin-booster"], image: "/renders/journal-exosome.webp", sample: true },
  { id: "r4", name: "Sora", place: "Seattle, WA", skin: "Dry, 41", when: "night", quote: "Sunday is mask night. Twenty minutes, phone down, then eye patches in the fridge for Monday.", products: ["medisco-skin-glow-mask-100ml", "puri-eyes-pdrn-eye-patch"], image: "/renders/unbox.webp", sample: true },
];

export const events = [
  { id: "e1", date: "2026-10-23", title: "Live: mixing your first GHK-Cu serum", kind: "Instagram Live", blurb: "Twenty minutes with our team and a scale. Bring your jar." },
  { id: "e2", date: "2026-11-06", title: "Clinic hour: exosome aftercare Q&A", kind: "Zoom, pro accounts", blurb: "Open questions on protocols, cold chain and ordering for lists." },
  { id: "e3", date: "2026-11-20", title: "The Monthly Drop: November issue", kind: "Newsletter", blurb: "Winter barrier care, a new booster on the shelf, member offer." },
];

export const hashtags = ["#deprisglow", "#onedropatatime", "#peptidenight"];
