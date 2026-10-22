"use client";

import { useEffect, useState } from "react";

// Jaartal dat bij een statische build toch het huidige jaar toont.
export function Year() {
  const [year, setYear] = useState(() => new Date().getFullYear());
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <span suppressHydrationWarning>{year}</span>;
}
