"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { services } from "@/content/site";
import { useKluslijst } from "@/lib/kluslijst";

export function Services() {
  const { items, toggle, has } = useKluslijst();
  const [active, setActive] = useState(services[0].id);
  const groupRefs = useRef<(HTMLElement | null)[]>([]);

  // Het vaste beeld links volgt de dienst die midden in beeld staat.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive((hit.target as HTMLElement).dataset.service ?? services[0].id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    groupRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const activeService = services.find((s) => s.id === active) ?? services[0];

  const sendList = () => {
    const target = document.getElementById("contact");
    target?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    window.setTimeout(() => document.getElementById("naam")?.focus({ preventScroll: true }), 600);
  };

  return (
    <section id="diensten" aria-labelledby="diensten-titel" className="on-dark bg-ink text-paper">
      <div className="wrap grid gap-12 py-24 md:py-32 lg:grid-cols-12 lg:gap-8 lg:py-40">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <h2 id="diensten-titel" data-reveal className="text-title">
              Wat ik voor u doe
            </h2>
            <p data-reveal style={{ "--i": 1 } as React.CSSProperties} className="mt-6 max-w-[36ch] text-lead leading-[1.45] text-muted-on-dark">
              Stel uw eigen kluslijst samen. Vink aan wat er bij u moet gebeuren en stuur de lijst in één keer
              naar mij.
            </p>
            <div className="relative mt-10 hidden aspect-[4/5] max-h-[calc(100svh-22rem)] w-full overflow-hidden bg-ink-soft lg:block">
              <AnimatePresence initial={false}>
                <motion.div
                  key={activeService.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={activeService.image.src}
                    alt={activeService.image.alt}
                    fill
                    sizes="40vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 lg:pl-6">
          <div data-reveal style={{ "--i": 2 } as React.CSSProperties} className="sheet-edge bg-paper px-5 pb-0 pt-12 text-ink sm:px-10 lg:px-14 lg:pt-16">
            <p className="font-serif text-[2.25rem] leading-none sm:text-[2.75rem]">Kluslijst</p>

            <div className="mt-10 space-y-14 pb-12">
              {services.map((service, si) => (
                <article
                  key={service.id}
                  ref={(el) => {
                    groupRefs.current[si] = el;
                  }}
                  data-service={service.id}
                  aria-labelledby={`dienst-${service.id}`}
                  onMouseEnter={() => setActive(service.id)}
                  onFocusCapture={() => setActive(service.id)}
                >
                  <div className="relative mb-6 aspect-[16/10] overflow-hidden bg-sand lg:hidden">
                    <Image
                      src={service.image.src}
                      alt={service.image.alt}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                  <h3 id={`dienst-${service.id}`} className="text-[1.75rem] leading-[1.1] sm:text-[2rem]">
                    {service.title}
                  </h3>
                  <p className="mt-2 max-w-[46ch] text-muted">{service.text}</p>
                  <ul className="mt-5 space-y-1">
                    {service.items.map((item) => {
                      const checked = has(item);
                      const id = `klus-${item.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
                      return (
                        <li key={item}>
                          <label
                            htmlFor={id}
                            className="group flex min-h-11 cursor-pointer items-end py-1.5 text-[1.0625rem]"
                          >
                            <span className={`transition-colors ${checked ? "font-semibold" : ""}`}>{item}</span>
                            <span className="leader" aria-hidden />
                            <input
                              id={id}
                              type="checkbox"
                              className="peer sr-only"
                              checked={checked}
                              onChange={() => toggle(item)}
                            />
                            <span
                              aria-hidden
                              className={`mb-0.5 flex h-7 w-7 shrink-0 items-center justify-center border-2 transition-[background-color,border-color,transform] duration-200 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink ${
                                checked
                                  ? "scale-100 border-ink bg-ink text-paper"
                                  : "border-ink/50 bg-paper group-hover:border-ink"
                              }`}
                            >
                              <Check
                                size={18}
                                strokeWidth={3}
                                className={`transition-[opacity,transform] duration-200 ${checked ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
                              />
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </article>
              ))}
            </div>

            <div className="-mx-5 flex flex-col gap-4 bg-sand px-5 py-6 sm:-mx-10 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:-mx-14 lg:px-14">
              <p aria-live="polite" className="font-medium">
                {items.length === 0
                  ? "Nog niets aangevinkt."
                  : `${items.length} ${items.length === 1 ? "klus" : "klussen"} op uw lijst.`}
              </p>
              <button type="button" onClick={sendList} className="btn btn-ink">
                {items.length === 0 ? "Vraag een offerte aan" : "Stuur mijn kluslijst"}
                <ArrowRight size={18} className="btn-arrow" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
