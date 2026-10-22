"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type Kluslijst = {
  items: string[];
  toggle: (item: string) => void;
  remove: (item: string) => void;
  has: (item: string) => boolean;
};

const KluslijstContext = createContext<Kluslijst | null>(null);

export function KluslijstProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<string[]>([]);

  const toggle = useCallback(
    (item: string) =>
      setItems((cur) => (cur.includes(item) ? cur.filter((i) => i !== item) : [...cur, item])),
    [],
  );
  const remove = useCallback((item: string) => setItems((cur) => cur.filter((i) => i !== item)), []);

  const value = useMemo(
    () => ({ items, toggle, remove, has: (item: string) => items.includes(item) }),
    [items, toggle, remove],
  );

  return <KluslijstContext.Provider value={value}>{children}</KluslijstContext.Provider>;
}

export function useKluslijst() {
  const ctx = useContext(KluslijstContext);
  if (!ctx) throw new Error("useKluslijst moet binnen KluslijstProvider gebruikt worden");
  return ctx;
}
