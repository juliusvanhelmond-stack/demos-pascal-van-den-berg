import { business } from "@/content/site";

// Posities berekend uit de werkelijke coördinaten (lengte- en breedtegraad),
// geprojecteerd op een vlak van 0–100 zodat de onderlinge afstanden kloppen.
const places = [
  { name: "Ermelo", x: 55.9, y: 37.9, base: true },
  { name: "Zeewolde", x: 40.6, y: 28.1 },
  { name: "Nunspeet", x: 87.6, y: 13.8 },
  { name: "Amersfoort", x: 11.1, y: 82.5 },
  { name: "Barneveld", x: 49.0, y: 87.6 },
];

export function ServiceArea() {
  return (
    <section id="werkgebied" aria-labelledby="werkgebied-titel" className="wrap py-24 md:py-32 lg:py-44">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h2 id="werkgebied-titel" data-reveal className="text-title">
            Werkgebied
          </h2>
          <p data-reveal style={{ "--i": 1 } as React.CSSProperties} className="mt-6 max-w-[36ch] text-lead leading-[1.45]">
            Ik werk vanuit {business.base}, in de regio tussen Amersfoort, Zeewolde, Nunspeet en Barneveld.
          </p>

          <ul className="mt-12 max-w-[30rem]">
            {places.map((p, i) => (
              <li
                key={p.name}
                data-reveal
                style={{ "--i": i + 2 } as React.CSSProperties}
                className={`flex min-h-12 items-center justify-between gap-6 ${i > 0 ? "" : "mb-4"}`}
              >
                <span className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className={`inline-block rounded-full ${p.base ? "h-4 w-4 bg-ink" : "h-3 w-3 bg-sage-deep"}`}
                  />
                  <span className={p.base ? "font-serif text-[1.75rem] leading-none" : "text-[1.0625rem] font-medium"}>
                    {p.name}
                  </span>
                </span>
                <span className="text-[0.9375rem] text-muted">{p.base ? "Thuisbasis" : "In de regio"}</span>
              </li>
            ))}
          </ul>

          <p data-reveal className="mt-10 max-w-[40ch] text-muted">
            Twijfelt u of uw adres binnen mijn werkgebied valt?{" "}
            <a href="#contact" className="link-underline font-medium text-ink">
              Stuur gerust een bericht
            </a>
            .
          </p>
        </div>

        <figure data-reveal="image" className="lg:col-span-6 lg:col-start-7">
          <div className="relative aspect-square w-full bg-sand-soft">
            <svg
              viewBox="-8 -8 116 116"
              role="img"
              aria-labelledby="kaart-titel"
              className="absolute inset-0 h-full w-full"
            >
              <title id="kaart-titel">
                Schematische kaart: Ermelo met daaromheen Zeewolde, Nunspeet, Amersfoort en Barneveld
              </title>
              {places
                .filter((p) => !p.base)
                .map((p) => (
                  <line
                    key={p.name}
                    x1={55.9}
                    y1={37.9}
                    x2={p.x}
                    y2={p.y}
                    stroke="#879482"
                    strokeWidth={0.5}
                    strokeDasharray="1.2 1.6"
                  />
                ))}
              {places.map((p) => (
                <g key={p.name}>
                  {p.base && <circle cx={p.x} cy={p.y} r={5.5} fill="#879482" opacity={0.35} />}
                  <circle cx={p.x} cy={p.y} r={p.base ? 2.6 : 1.7} fill={p.base ? "#252923" : "#5f6b5a"} />
                  <text
                    x={p.base ? p.x + 4.5 : p.x + (p.x > 75 ? -3.4 : 3.4)}
                    y={p.base ? p.y + 9 : p.y + 1.3}
                    textAnchor={p.x > 75 ? "end" : "start"}
                    fontFamily={p.base ? "DM Serif Display, Georgia, serif" : "Manrope Variable, Manrope, sans-serif"}
                    fontSize={p.base ? 6 : 3.9}
                    fontWeight={p.base ? 400 : 600}
                    fill="#252923"
                  >
                    {p.name}
                  </text>
                </g>
              ))}
              <g transform="translate(4 100)">
                <rect x={0} y={0} width={28.2} height={1.2} fill="#252923" />
                <text x={0} y={-2.2} fontSize={3.4} fontFamily="Manrope Variable, Manrope, sans-serif" fill="#555c51">
                  10 km
                </text>
              </g>
            </svg>
          </div>
          <figcaption className="mt-3 text-[0.9375rem] text-muted">
            Plaatsen in mijn werkgebied, op ware afstand ten opzichte van elkaar.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
