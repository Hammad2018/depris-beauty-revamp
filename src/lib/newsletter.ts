import type { NewsletterPref } from "@/lib/personal";

export interface Issue {
  slug: string;
  month: string;
  title: string;
  standfirst: string;
  sections: string[];
  products: string[];
  image: string;
}

export const prefOptions: { value: NewsletterPref; label: string; blurb: string }[] = [
  { value: "skincare", label: "Skincare rituals", blurb: "Routines, layering, seasonal care" },
  { value: "pro", label: "For clinics", blurb: "Boosters, protocols, pro pricing" },
  { value: "offers", label: "Member offers", blurb: "Early access and bundles" },
];

/** Issue archive. Sample issues for the pitch. */
export const issues: Issue[] = [
  { slug: "2026-10", month: "October 2026", title: "Peptide season", standfirst: "Cooler air, slower skin. Why autumn is the month to start copper peptides, plus the starter guide in print.", sections: ["The GHK-Cu starter guide, condensed", "Three readers' peptide nights", "New on the shelf: Plenaris PRO 80", "Member offer: free toner over $90"], products: ["ghk-cu-topical-cosmetic-1g", "plenaris-pro-80"], image: "/renders/journal-copper.webp" },
  { slug: "2026-09", month: "September 2026", title: "The reset issue", standfirst: "A seven-night rhythm to rebuild a barrier after summer, and a clinic's exosome aftercare sheet.", sections: ["Layering actives without the sting", "Clinic corner: 72 hours after needling", "Mask night, done properly"], products: ["glutanex-glow-therapy-toner", "2xsome-skin-booster", "medisco-skin-glow-mask-100ml"], image: "/renders/journal-exosome.webp" },
  { slug: "2026-08", month: "August 2026", title: "Sun, decoded", standfirst: "Two fingers of SPF, why tint matters for dark spots, and how to reapply over a CC cream.", sections: ["Sunscreen, decoded", "Reader question: SPF over peptides?", "The glass-skin routine, step by step"], products: ["bellmona-cc-cream-sunscreen-50ml"], image: "/renders/sky.webp" },
];
