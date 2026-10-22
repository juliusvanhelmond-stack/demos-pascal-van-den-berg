"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";

const tabs = [
  { label: "Voor", value: 100 },
  { label: "Vergelijk", value: 50 },
  { label: "Na", value: 0 },
];

// Twee echte foto's van dezelfde raamhoek, voor en na het vervangen van de kit.
export function BeforeAfterSlider() {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const setFromPointer = (clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, Math.round(pct))));
  };

  return (
    <section aria-labelledby="voorna-titel" className="bg-sand">
      <div className="wrap grid gap-10 py-24 md:py-32 lg:min-h-[88svh] lg:grid-cols-2 lg:gap-16 lg:py-28">
        <div className="flex items-center">
          <div data-reveal="image" className="w-full">
            <div
              ref={frameRef}
              className={`relative aspect-square w-full touch-pan-y select-none overflow-hidden bg-ink ${
                dragging ? "cursor-grabbing" : "cursor-ew-resize"
              }`}
              onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                setDragging(true);
                setFromPointer(e.clientX);
                inputRef.current?.focus({ preventScroll: true });
              }}
              onPointerMove={(e) => dragging && setFromPointer(e.clientX)}
              onPointerUp={() => setDragging(false)}
              onPointerCancel={() => setDragging(false)}
            >
              <Image
                src="/projects/raamkit-na.jpg"
                alt="Na: nieuwe, strakke kitnaad langs het glas en een afgelakt kozijn"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="pointer-events-none object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
                aria-hidden={pos === 0}
              >
                <Image
                  src="/projects/raamkit-voor.jpg"
                  alt="Voor: verweerde, groen uitgeslagen raamkit die loslaat van het glas"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="pointer-events-none object-cover"
                />
              </div>

              <span className="pointer-events-none absolute left-3 top-3 bg-paper px-3 py-1.5 text-[0.9375rem] font-semibold">
                Voor
              </span>
              <span className="pointer-events-none absolute right-3 top-3 bg-ink px-3 py-1.5 text-[0.9375rem] font-semibold text-paper">
                Na
              </span>

              <input
                ref={inputRef}
                type="range"
                min={0}
                max={100}
                step={1}
                value={pos}
                onChange={(e) => setPos(Number(e.target.value))}
                aria-label="Vergelijk de situatie voor en na"
                aria-valuetext={`${pos}% voor, ${100 - pos}% na`}
                className="peer sr-only"
              />

              <div
                className="group/handle pointer-events-none absolute inset-y-0 w-[3px] -translate-x-1/2 bg-paper peer-focus-visible:[&>span]:outline-3 peer-focus-visible:[&>span]:outline-offset-4 peer-focus-visible:[&>span]:outline-ink"
                style={{ left: `${pos}%` }}
              >
                <span
                  className={`absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-ink transition-transform duration-200 ${
                    dragging ? "scale-110" : ""
                  }`}
                >
                  <ChevronsLeftRight size={24} strokeWidth={2} aria-hidden />
                </span>
              </div>

            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-10">
          <div role="group" aria-label="Weergave" className="flex gap-6">
            {tabs.map((t) => {
              const active = pos === t.value;
              return (
                <button
                  key={t.label}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setPos(t.value)}
                  className={`min-h-11 text-[1.0625rem] transition-colors ${
                    active ? "font-semibold text-ink underline decoration-2 underline-offset-8" : "text-muted hover:text-ink"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          <div>
            <h2 id="voorna-titel" data-reveal className="text-title">
              Voor en na
            </h2>
            <p data-reveal className="mt-4 font-serif text-[1.75rem] leading-tight">Raamkit vervangen</p>
            <div className="mt-8 max-w-[44ch] space-y-4">
              <p data-reveal style={{ "--i": 1 } as React.CSSProperties}>
                Links de oude raamkit: verweerd, groen uitgeslagen en losgekomen van het glas. Rechts dezelfde
                hoek nadat ik de oude kit heb verwijderd, opnieuw heb gekit en het kozijn heb afgelakt.
              </p>
              <p data-reveal style={{ "--i": 2 } as React.CSSProperties} className="text-muted">
                Sleep over de foto of gebruik de pijltjestoetsen om te vergelijken.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <a href="#projecten" className="btn btn-paper min-h-[4.5rem] justify-between">
              Meer projecten bekijken
              <span aria-hidden className="btn-arrow">&rarr;</span>
            </a>
            <a href="#contact" className="btn btn-ink min-h-[4.5rem] justify-between">
              Vraag een offerte aan
              <span aria-hidden className="btn-arrow">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
