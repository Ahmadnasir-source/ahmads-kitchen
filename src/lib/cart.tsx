import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { MENU_BY_ID, BUSINESS } from "@/lib/menu";

type CartLine = { id: string; qty: number };

type CartContextValue = {
  lines: CartLine[];
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "ahmads-kitchen-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines]);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = lines.reduce(
      (sum, l) => sum + (MENU_BY_ID[l.id]?.price ?? 0) * l.qty,
      0,
    );
    const deliveryFee = subtotal > 0 ? BUSINESS.deliveryFee : 0;
    return {
      lines,
      add: (id, qty = 1) =>
        setLines((prev) => {
          const found = prev.find((l) => l.id === id);
          if (found) return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l));
          return [...prev, { id, qty }];
        }),
      setQty: (id, qty) =>
        setLines((prev) =>
          qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty } : l)),
        ),
      remove: (id) => setLines((prev) => prev.filter((l) => l.id !== id)),
      clear: () => setLines([]),
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
    };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
