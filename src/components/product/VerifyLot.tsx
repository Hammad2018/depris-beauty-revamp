"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { lots } from "@/lib/renders";
import { potencyWindow, type Storage } from "@/lib/potency";
import { PotencyCertificate } from "./PotencyCertificate";
import { LotusMark } from "@/components/ui/LotusMark";

/** Lot checker: code → certificate + a potency-window meter (opened / storage aware). */
export function VerifyLot({ initial = "" }: { initial?: string }) {
  const [code, setCode] = useState(initial.toUpperCase());
  const [query, setQuery] = useState(initial.toUpperCase());
  const [opened, setOpened] = useState<string>("");
  const [storage, setStorage] = useState<Storage>("fridge");
  const lot = lots[query];
  const win = useMemo(() => (lot ? potencyWindow({ bottled: lot.bottled, expires: lot.expires, opened: opened || null, storage, now: new Date() }) : null), [lot, opened, storage]);
  const pct = win ? Math.round(win.fraction * 100) : 0;

  return (
    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <form onSubmit={(e) => { e.preventDefault(); setQuery(code.trim().toUpperCase()); }} className="glass-strong rounded-3xl p-6">
          <label htmlFor="lot" className="mono-label text-camellia">Lot code</label>
          <p className="mt-1 text-sm text-ink-soft">Printed on the carton base and the bottle shoulder, e.g. <button type="button" onClick={() => { setCode("2611-D"); setQuery("2611-D"); }} className="font-mono text-ink underline-offset-4 hover:underline">2611-D</button>.</p>
          <div className="mt-4 flex gap-2">
            <input id="lot" value={code} onChange={(e) => setCode(e.target.value)} placeholder="2611-D" className="min-w-0 flex-1 rounded-full border border-ink/15 bg-white px-5 py-3 font-mono uppercase tracking-widest text-ink outline-none focus:border-camellia" />
            <button className="btn-primary">Verify</button>
          </div>
        </form>

        <AnimatePresence>
          {lot && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6 rounded-3xl border border-ink/10 bg-porcelain/80 p-6">
              <p className="mono-label text-camellia">Potency window</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <label className="text-sm text-ink-soft">
                  Opened on
                  <input type="date" value={opened} onChange={(e) => setOpened(e.target.value)} className="mt-1 w-full rounded-xl border border-ink/15 bg-white px-3 py-2 text-ink" />
                </label>
                <fieldset className="text-sm text-ink-soft">
                  <legend>Stored</legend>
                  <div className="mt-1 flex gap-2">
                    {(["fridge", "room"] as Storage[]).map((s) => (
                      <button type="button" key={s} onClick={() => setStorage(s)} aria-pressed={storage === s} className={`rounded-full border px-4 py-2 ${storage === s ? "border-camellia bg-camellia/10 text-ink" : "border-ink/15 text-ink-soft"}`}>
                        {s === "fridge" ? "Fridge 2–8 °C" : "Room 21 °C"}
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>
              <div className="mt-5">
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-3xl text-ink">{pct}%</span>
                  <span className="mono-label mono-label-plain text-ink-soft">best by {win?.bestBy} · {win?.daysLeft} days</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/10">
                  <motion.div initial={{ transform: "scaleX(0)" }} animate={{ transform: `scaleX(${pct / 100})` }} transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }} style={{ transformOrigin: "left" }} className="h-full w-full rounded-full bg-gradient-to-r from-camellia via-teal-glow to-periwinkle" />
                </div>
                <p className="mt-2 text-xs text-ink-soft">Peptides and exosomes keep their potency longest sealed and cold. Opened serums: use within 6 months refrigerated, 3 at room temperature.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div>
        <AnimatePresence mode="wait">
          {lot ? (
            <motion.div key={lot.lot} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              <div className="mb-4 flex items-center gap-3 rounded-full bg-camellia/10 px-4 py-2 text-sm text-camellia">
                <span className="h-2 w-2 rounded-full bg-camellia shadow-[0_0_10px_rgba(21,122,115,0.8)]" /> Genuine product — lot matched the Depris database.
              </div>
              <PotencyCertificate lot={lot} />
              <Link href={`/products/${lot.handle}`} className="mt-4 inline-block text-sm text-camellia underline-offset-4 hover:underline">Reorder {lot.product} →</Link>
            </motion.div>
          ) : query ? (
            <motion.div key="none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-3xl border border-rose/40 bg-rose/10 p-6 text-ink">
              <p className="font-display text-xl">We couldn&apos;t find lot {query}.</p>
              <p className="mt-2 text-sm text-ink-soft">Check for a letter/number mix-up (0 vs O), or <Link href="/contact" className="underline">send us a photo of the carton</Link> and we&apos;ll verify it by hand.</p>
            </motion.div>
          ) : (
            <motion.div key="empty" className="flex h-full min-h-[18rem] flex-col items-center justify-center rounded-3xl border border-dashed border-ink/15 text-center text-ink-soft">
              <LotusMark size={40} />
              <p className="mt-3 text-sm">Your certificate will appear here.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
