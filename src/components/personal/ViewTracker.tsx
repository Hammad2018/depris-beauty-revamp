"use client";

import { useEffect } from "react";
import { rememberViewed } from "@/lib/personal";

/** Records a product view in the visitor's shelf history. Renders nothing. */
export function ViewTracker({ handle }: { handle: string }) {
  useEffect(() => {
    rememberViewed(handle);
  }, [handle]);
  return null;
}
