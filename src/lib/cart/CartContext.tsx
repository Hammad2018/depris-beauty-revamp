"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";
import type { ReactNode } from "react";
import type { Tone } from "@/lib/commerce/types";
import { cartSubtotal } from "./totals";

export interface CartItem {
  id: string; // productHandle::variantId
  productHandle: string;
  title: string;
  brand: string;
  variantId: string;
  variantTitle: string;
  price: number;
  quantity: number;
  subscribe: boolean;
  tone: Tone;
  image?: string;
}

type Action =
  | { type: "add"; item: Omit<CartItem, "quantity">; quantity?: number }
  | { type: "remove"; id: string }
  | { type: "setQty"; id: string; quantity: number }
  | { type: "toggleSubscribe"; id: string }
  | { type: "hydrate"; items: CartItem[] }
  | { type: "clear" };

function reducer(state: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case "add": {
      const existing = state.find((i) => i.id === action.item.id);
      const qty = action.quantity ?? 1;
      if (existing) {
        return state.map((i) => (i.id === action.item.id ? { ...i, quantity: i.quantity + qty } : i));
      }
      return [...state, { ...action.item, quantity: qty }];
    }
    case "remove":
      return state.filter((i) => i.id !== action.id);
    case "setQty":
      return state
        .map((i) => (i.id === action.id ? { ...i, quantity: Math.max(0, action.quantity) } : i))
        .filter((i) => i.quantity > 0);
    case "toggleSubscribe":
      return state.map((i) => (i.id === action.id ? { ...i, subscribe: !i.subscribe } : i));
    case "hydrate":
      return action.items;
    case "clear":
      return [];
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  sampleId: string | null;
  add: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, quantity: number) => void;
  toggleSubscribe: (id: string) => void;
  setSample: (id: string | null) => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartCtx = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "depris-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(reducer, []);
  const [isOpen, setOpen] = useState(false);
  const [sampleId, setSampleId] = useState<string | null>(null);

  // hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { items: CartItem[]; sampleId: string | null };
        if (Array.isArray(parsed.items)) dispatch({ type: "hydrate", items: parsed.items });
        if (parsed.sampleId) setSampleId(parsed.sampleId);
      }
    } catch {
      /* ignore */
    }
  }, []);

  // persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, sampleId }));
    } catch {
      /* ignore */
    }
  }, [items, sampleId]);

  const add = useCallback((item: Omit<CartItem, "quantity">, quantity = 1) => {
    dispatch({ type: "add", item, quantity });
    setOpen(true);
  }, []);
  const remove = useCallback((id: string) => dispatch({ type: "remove", id }), []);
  const setQty = useCallback((id: string, quantity: number) => dispatch({ type: "setQty", id, quantity }), []);
  const toggleSubscribe = useCallback((id: string) => dispatch({ type: "toggleSubscribe", id }), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((n, i) => n + i.quantity, 0);
    return {
      items,
      count,
      subtotal: cartSubtotal(items),
      isOpen,
      sampleId,
      add,
      remove,
      setQty,
      toggleSubscribe,
      setSample: setSampleId,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
    };
  }, [items, isOpen, sampleId, add, remove, setQty, toggleSubscribe]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
