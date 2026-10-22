"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { business } from "@/content/site";

const slides = [
  {
    src: "/projects/woonkamer-schilderwerk.jpg",
    caption: "Schilderwerk gehele woonkamer",
    alt: "Door Pascal geschilderde woonkamer met donkergroene wanden en een witte schouw",
    position: "50% 50%",
  },
  {
    src: "/projects/raamkozijnen-aflakken.jpg",
    caption: "Aflakken raam en raamkozijnen",
    alt: "Glanzend wit gelakt raamkozijn in een bakstenen gevel",
    position: "50% 60%",
  },
  {
    src: "/projects/deur-aflakken.jpg",
    caption: "Aflakken deur",
    alt: "Wit gelakte paneeldeur in een lichte gang",
    position: "50% 40%",
  },
  {
    src: "/projects/trap-trapgat.jpg",
    caption: "Trap en trapgat schilderen",
    alt: "Zwart geschilderde open trap langs een lichte wand",
    position: "50% 50%",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  // Langzame crossfade tussen echte projectfoto's; pauzeert als het tabblad verborgen is.
  useEffect(() => {
    if (reduce) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const start = () => {
      timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    };
    const onVis = () => {
      clearInterval(timer);
      if (!document.hidden) start();
    };
    start();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduce]);

  const slide = slides[index];

  const rise = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay: 0.15 + i * 0.09, ease },
        };

  return (
    <section
      id="top"
      aria-labelledby="hero-titel"
      className="-mt-[4.5rem] grid gap-3 p-3 pt-[calc(4.5rem+0.75rem)] lg:min-h-[100svh] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
    >
      {/* Foto */}
      <div className="relative order-1 h-[46svh] min-h-[20rem] overflow-hidden bg-sand lg:order-2 lg:h-auto lg:min-h-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.src}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute inset-0"
              initial={reduce ? false : { scale: 1.06 }}
              animate={{ scale: 1 }}
              transition={{ duration: 7.5, ease: "linear" }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                style={{ objectPosition: slide.position }}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
        <p className="absolute left-3 top-3 bg-paper lg:bottom-3 lg:top-auto px-3 py-2 text-[0.9375rem] font-medium" aria-live="polite">
          <span className="sr-only">Project in beeld: </span>
          {slide.caption}
        </p>
      </div>

      {/* Kaart */}
      <div className="relative z-10 order-2 mx-1.5 -mt-12 flex flex-col justify-between bg-sand-soft px-5 pb-8 pt-9 sm:px-10 sm:pb-10 lg:order-1 lg:mx-0 lg:mt-0 lg:px-[clamp(2.5rem,4.5vw,5rem)] lg:pb-12 lg:pt-[clamp(3rem,9vh,6rem)]">
        <div>
          <motion.h1
            {...rise(1)}
            id="hero-titel"
            className="text-[clamp(2rem,9vw,4.25rem)] leading-[0.98] tracking-[-0.025em] md:text-[clamp(3.5rem,7.6vw,5.25rem)] lg:text-[clamp(3.25rem,5.5vw,6.5rem)]"
          >
            Goed werk.
            <br />
            Tot in de details.
          </motion.h1>
          <motion.p {...rise(2)} className="mt-7 max-w-[38ch] text-lead leading-[1.45]">
            Persoonlijk vakmanschap uit {business.base}: schilderwerk en klussen in en rondom uw huis,
            zorgvuldig voorbereid en strak afgewerkt.
          </motion.p>
          <motion.div {...rise(3)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#projecten" className="btn btn-ink">
              Bekijk mijn werk
              <ArrowRight size={18} className="btn-arrow" aria-hidden />
            </a>
            <a href="#contact" className="btn btn-paper py-3 text-center leading-snug">
              Vraag vrijblijvend een offerte aan
            </a>
          </motion.div>
        </div>

        <motion.dl
          {...rise(4)}
          className="mt-12 grid gap-x-10 gap-y-4 text-[0.9375rem] sm:grid-cols-[auto_auto] sm:justify-start lg:mt-16"
        >
          <div>
            <dt className="text-muted">Werkgebied</dt>
            <dd className="font-medium">
              {business.base} en de regio Amersfoort tot Nunspeet
            </dd>
          </div>
          <div>
            <dt className="text-muted">Direct contact</dt>
            <dd className="font-medium">
              <a className="link-underline" href={business.whatsapp}>
                WhatsApp {business.phoneDisplay}
              </a>
            </dd>
          </div>
        </motion.dl>
      </div>
    </section>
  );
}
