"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

/** Minimal accessible lightbox: Escape / backdrop closes, focus on close button. */
export function Lightbox({ open, onClose, children, label = "Preview" }: { open: boolean; onClose: () => void; children: ReactNode; label?: string }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-navy-deep/80 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 8 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} autoFocus aria-label="Close" className="absolute right-3 top-3 z-10 rounded-full bg-white/90 px-3 py-1 text-sm text-ink shadow-soft hover:bg-white">
              Close ✕
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
