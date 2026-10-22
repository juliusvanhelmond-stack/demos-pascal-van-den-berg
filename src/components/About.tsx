import Image from "next/image";
import { business } from "@/content/site";

export function About() {
  return (
    <section
      id="over-pascal"
      aria-labelledby="over-titel"
      className="wrap grid gap-10 py-24 md:py-32 lg:grid-cols-12 lg:gap-8 lg:py-44"
    >
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-24">
          <div data-reveal="image" className="relative aspect-[4/5] overflow-hidden bg-sand lg:aspect-auto lg:h-[calc(100svh-8rem)] lg:max-h-[52rem]">
            <Image
              src="/projects/deurpost-aflakken.jpg"
              alt="Close-up van een strak donkergroen gelakte deurpost tegen een lichte muur"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <p className="mt-3 text-[0.9375rem] text-muted">Aflakken deurpost: de lijn tussen lak en muur.</p>
        </div>
      </div>

      <div className="lg:col-span-6 lg:col-start-7 lg:pt-16">
        <h2 id="over-titel" data-reveal className="max-w-[14ch] text-title">
          Over Pascal
        </h2>
        <p data-reveal style={{ "--i": 1 } as React.CSSProperties} className="mt-8 max-w-[28ch] font-serif text-[clamp(1.6rem,1.2rem+1.3vw,2.25rem)] leading-[1.18]">
          Ik ben pas tevreden als de puntjes op de i staan.
        </p>
        <div className="mt-10 max-w-[34rem] space-y-5 text-[1.0625rem] leading-[1.65]">
          <p data-reveal style={{ "--i": 2 } as React.CSSProperties} className="font-medium">
            Ik ben Pascal van den Berg, schilder en allround klusser uit {business.base}. Ik werk in en rondom
            het huis: van binnen- en buitenschilderwerk tot kitwerk in badkamer of keuken, van houtrot
            herstellen tot een kast op maat.
          </p>
          <p data-reveal style={{ "--i": 3 } as React.CSSProperties}>
            U heeft bij mij één aanspreekpunt. Ik kom zelf kijken, denk mee over de beste aanpak en voer het
            werk daarna ook zelf uit. Zo weet u wie er over de vloer komt en wat u kunt verwachten.
          </p>
          <p data-reveal style={{ "--i": 4 } as React.CSSProperties}>
            Heeft u een kluslijst liggen die maar niet afkomt? Dan pak ik die efficiënt met u aan, klus voor
            klus, tot alles is afgevinkt.
          </p>
        </div>
        <div data-reveal style={{ "--i": 5 } as React.CSSProperties} className="mt-12 flex items-center gap-4">
          <Image src="/brand/mark.png" alt="" width={460} height={372} className="h-12 w-auto" />
          <p className="leading-tight">
            <span className="block font-serif text-[1.5rem]">{business.owner}</span>
            <span className="text-[0.9375rem] text-muted">Schilder en klusser, {business.base}</span>
          </p>
        </div>
        <p data-reveal style={{ "--i": 6 } as React.CSSProperties} className="mt-10">
          <a href="#projecten" className="link-underline font-semibold">
            Bekijk wat ik onlangs heb gemaakt
          </a>
        </p>
      </div>
    </section>
  );
}
