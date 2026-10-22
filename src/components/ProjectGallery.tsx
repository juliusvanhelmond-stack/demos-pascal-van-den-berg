"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { categories, projects, type Category } from "@/content/site";

const INITIAL = 9;

const categoryLabel = (id: Category) => categories.find((c) => c.id === id)?.label ?? "";

export function ProjectGallery() {
  const [filter, setFilter] = useState<Category | "alles">("alles");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const touchX = useRef<number | null>(null);

  const [showAll, setShowAll] = useState(false);
  const filtered = filter === "alles" ? projects : projects.filter((p) => p.category === filter);
  const visible = filter === "alles" && !showAll ? filtered.slice(0, INITIAL) : filtered;

  const open = (i: number, trigger: HTMLButtonElement) => {
    lastTrigger.current = trigger;
    setOpenIndex(i);
  };
  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setOpenIndex((i) => (i === null ? i : (i + dir + filtered.length) % filtered.length)),
    [filtered.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (openIndex !== null && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    }
    if (openIndex === null && dialog.open) dialog.close();
  }, [openIndex]);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, step]);

  const current = openIndex !== null ? filtered[openIndex] : null;

  return (
    <section id="projecten" aria-labelledby="projecten-titel" className="wrap py-24 md:py-32 lg:py-44">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-8">
        <h2 id="projecten-titel" data-reveal className="text-display lg:col-span-7">
          Recent werk
        </h2>
        <p data-reveal style={{ "--i": 1 } as React.CSSProperties} className="max-w-[40ch] text-lead leading-[1.45] lg:col-span-5 lg:pb-3">
          Een greep uit klussen die ik onlangs heb afgerond. Alle foto&apos;s op deze pagina zijn van mijn
          eigen werk.
        </p>
      </div>

      <div
        role="group"
        aria-label="Filter projecten"
        className="mt-12 flex flex-wrap gap-2"
      >
        {categories.map((c) => {
          const active = filter === c.id;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(c.id)}
              className={`min-h-11 shrink-0 px-4 text-[0.9375rem] font-medium transition-colors duration-200 ${
                active ? "bg-ink text-paper" : "bg-sand-soft text-ink hover:bg-sand"
              }`}
            >
              {c.label}
              <span className={`ml-2 tabular-nums ${active ? "text-muted-on-dark" : "text-muted"}`}>
                {c.id === "alles" ? projects.length : projects.filter((p) => p.category === c.id).length}
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} projecten zichtbaar
      </p>

      <ul key={filter} className="mt-8 columns-1 gap-3 sm:columns-2 lg:columns-3 [&>li]:mb-3">
        {visible.map((p, i) => (
          <li key={p.src} className="break-inside-avoid" data-reveal style={{ "--i": i % 3 } as React.CSSProperties}>
            <button
              type="button"
              onClick={(e) => open(i, e.currentTarget)}
              className="group block w-full text-left"
              aria-label={`${p.title}, open grotere weergave`}
            >
              <span className="relative block overflow-hidden bg-sand" style={{ aspectRatio: `${p.w} / ${p.h}` }}>
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
                  className="zoom-img object-cover"
                />
              </span>
              <span className="flex items-baseline justify-between gap-4 pb-3 pt-3">
                <span className="font-medium">{p.title}</span>
                <span className="shrink-0 text-[0.9375rem] text-muted">{categoryLabel(p.category)}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {filter === "alles" && !showAll && (
        <div className="mt-6 flex justify-start">
          <button type="button" onClick={() => setShowAll(true)} className="btn btn-sand">
            Toon alle {projects.length} projecten
          </button>
        </div>
      )}

      <dialog
        ref={dialogRef}
        onClose={() => {
          document.body.style.overflow = "";
          setOpenIndex(null);
          lastTrigger.current?.focus();
        }}
        onClick={(e) => e.target === e.currentTarget && close()}
        aria-label={current ? current.title : "Project"}
        className="m-0 h-[100dvh] max-h-none w-screen max-w-none bg-ink p-0 text-paper backdrop:bg-ink/90"
      >
        {current && (
          <div
            className="on-dark flex h-full flex-col"
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-8">
              <p className="tabular-nums text-muted-on-dark">
                {openIndex! + 1} van {filtered.length}
              </p>
              <button
                type="button"
                onClick={close}
                className="inline-flex h-11 items-center gap-2 px-2 font-medium"
                autoFocus
              >
                Sluiten <X size={22} aria-hidden />
              </button>
            </div>
            <div className="relative min-h-0 flex-1" onClick={(e) => e.target === e.currentTarget && close()}>
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className="animate-[fadeIn_400ms_ease-out] object-contain"
              />
            </div>
            <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8 md:py-6">
              <button
                type="button"
                onClick={() => step(-1)}
                className="inline-flex h-12 w-12 items-center justify-center bg-ink-soft transition-colors hover:bg-sage-deep"
                aria-label="Vorig project"
              >
                <ArrowLeft size={22} />
              </button>
              <div className="min-w-0 text-center">
                <p className="font-serif text-[1.5rem] leading-tight md:text-[1.875rem]">{current.title}</p>
                <p className="mt-1 text-[0.9375rem] text-muted-on-dark">{categoryLabel(current.category)}</p>
              </div>
              <button
                type="button"
                onClick={() => step(1)}
                className="inline-flex h-12 w-12 items-center justify-center bg-ink-soft transition-colors hover:bg-sage-deep"
                aria-label="Volgend project"
              >
                <ArrowRight size={22} />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
