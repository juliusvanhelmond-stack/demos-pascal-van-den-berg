# Pascal van den Berg: redesign-demo

Demo-website voor Schilder & Klusbedrijf Pascal van den Berg (Ermelo), gemaakt door JUNEStudio.

## Starten

```bash
npm install
npm run dev        # http://localhost:3000
```

Productie-build:

```bash
npm run build
npm run start
```

Controles:

```bash
npm run lint
npm run typecheck
URL=http://localhost:3000 npm run test:e2e   # Playwright; draait tegen een lopende server
```

Optioneel: `NEXT_PUBLIC_SITE_URL=https://…` voor canonical-URL, Open Graph en structured data.

## Online zetten (Vercel)

Importeer deze repository op vercel.com/new. Next.js wordt automatisch herkend; er zijn geen extra build-instellingen nodig. Zet `NEXT_PUBLIC_SITE_URL` op de uiteindelijke URL en deploy daarna nog één keer.

## Stack

Next.js 15 (App Router), TypeScript, Tailwind CSS 4, Motion, Lucide. Lettertypen DM Serif Display en Manrope, zelf gehost via Fontsource.

## Opbouw

- `src/content/site.ts`: alle bedrijfsgegevens, diensten en projecten op één plek
- `src/components/`: Header, Hero, About, Services (met de interactieve kluslijst), ProjectGallery (filters en lightbox), BeforeAfterSlider, WhyPascal, ServiceArea, Contact, Footer
- `src/lib/kluslijst.tsx`: gedeelde state tussen de kluslijst en het contactformulier
- `public/projects/`: Pascals eigen projectfoto's

Zie `DEMO_NOTES.md` voor bronnen, bevestigde gegevens, beeldherkomst en wat er nog moet gebeuren voor livegang.
