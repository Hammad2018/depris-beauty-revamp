import type { Concern } from "@/lib/commerce/types";

/**
 * Campaign faces for the hero and the concern tiles. Six women, 33 to 42, different
 * heritages, hair and skin. Generated for the concept and labelled as campaign
 * preview imagery in the UI; the client's own campaign photography replaces them.
 */
export interface Face {
  id: string;
  name: string;
  age: number;
  concern: Concern;
  /** one line in her voice */
  line: string;
  image: string;
  thumb: string;
  alt: string;
  /** which side of the frame her face sits, for cropping on small screens */
  focus: "center" | "left" | "right";
}

export const faces: Face[] = [
  { id: "mira", name: "Mira", age: 38, concern: "aging", line: "Peptide nights, three times a week. The rest is sleep.", image: "/faces/mira.webp", thumb: "/faces/mira-thumb.webp", alt: "Portrait of Mira, 38, smiling with glowing skin", focus: "center" },
  { id: "leila", name: "Leila", age: 36, concern: "dullness", line: "A low-pH toner first. Everything after it works harder.", image: "/faces/leila.webp", thumb: "/faces/leila-thumb.webp", alt: "Portrait of Leila, 36, with warm olive skin and dark waves", focus: "center" },
  { id: "camila", name: "Camila", age: 40, concern: "pigmentation", line: "Tinted SPF every morning. My dark spots finally stopped arguing.", image: "/faces/camila.webp", thumb: "/faces/camila-thumb.webp", alt: "Portrait of Camila, 40, laughing, with long dark curls", focus: "center" },
  { id: "fiona", name: "Fiona", age: 42, concern: "redness", line: "Reactive skin. Barrier first, actives second, patience always.", image: "/faces/fiona.webp", thumb: "/faces/fiona-thumb.webp", alt: "Portrait of Fiona, 42, with copper hair and a soft smile", focus: "center" },
  { id: "amara", name: "Amara", age: 35, concern: "dryness", line: "Exosome booster after my clinic visits. Bounce came back.", image: "/faces/amara.webp", thumb: "/faces/amara-thumb.webp", alt: "Portrait of Amara, 35, with luminous deep brown skin", focus: "center" },
  { id: "ingrid", name: "Ingrid", age: 33, concern: "acne", line: "Low-pH toner, one active at a time, and I stopped picking. Clear at last.", image: "/faces/ingrid.webp", thumb: "/faces/ingrid-thumb.webp", alt: "Portrait of Ingrid, 33, with long platinum hair", focus: "center" },
];

export const faceByConcern = (c: Concern) => faces.find((f) => f.concern === c) ?? faces[0];
