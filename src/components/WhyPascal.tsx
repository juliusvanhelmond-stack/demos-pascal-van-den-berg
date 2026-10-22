import Image from "next/image";

const reasons = [
  {
    title: "Oog voor detail",
    text: "Strakke lijnen, gladde lakken en nette kitnaden. Juist de afwerking maakt het verschil, dus daar neem ik de tijd voor.",
  },
  {
    title: "Persoonlijk contact",
    text: "U spreekt mij, van het eerste bezoek tot de laatste kwast. Geen tussenpersonen, wel korte lijnen.",
  },
  {
    title: "Veelzijdig",
    text: "Schilderwerk, kitwerk, houtrot en montage in één hand. Voor uw kluslijst hoeft u niet drie vaklieden te bellen.",
  },
  {
    title: "Zorgvuldige afwerking",
    text: "Goed voorbereiden, netjes afplakken en opgeruimd achterlaten. Ik werk in uw huis zoals ik dat in mijn eigen huis zou doen.",
  },
];

export function WhyPascal() {
  return (
    <section aria-labelledby="waarom-titel" className="bg-sage text-ink">
      <div className="wrap grid gap-14 py-24 md:py-32 lg:grid-cols-12 lg:gap-8 lg:py-40">
        <div className="lg:col-span-5">
          <h2 id="waarom-titel" data-reveal className="text-display">
            Waarom Pascal
          </h2>
          <div data-reveal="image" style={{ "--i": 1 } as React.CSSProperties} className="relative mt-12 aspect-[4/5] max-w-[30rem] overflow-hidden bg-sage-deep">
            <Image
              src="/projects/wandkastje-fotorooster.jpg"
              alt="Door Pascal gemonteerd houten wandkastje en een zwart fotorooster"
              fill
              sizes="(min-width: 1024px) 34vw, 100vw"
              className="object-cover"
            />
          </div>
          <p className="mt-3 text-[0.9375rem]">Wandkastje en fotorooster monteren</p>
        </div>

        <dl className="grid content-center gap-x-12 gap-y-14 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
          {reasons.map((r, i) => (
            <div key={r.title} data-reveal style={{ "--i": i } as React.CSSProperties}>
              <dt className="font-serif text-[2rem] leading-[1.1]">{r.title}</dt>
              <dd className="mt-4 max-w-[34ch] text-[1.0625rem] leading-[1.6]">{r.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
