# Demo-notities: Schilder & Klusbedrijf Pascal van den Berg

Vrijblijvende redesign-demo door JUNEStudio. Onderzocht op 22 oktober 2026.

## Bronnen

| Bron | Resultaat |
| --- | --- |
| Bestaande website: https://sites.google.com/view/pvdb-schilder-klusbedrijf | Bereikbaar. Tekst, logo, 18 projectfoto's met bijschriften, e-mailadres en WhatsApp-link overgenomen. |
| Google Business: https://share.google/OsC2KDrKGlZPktqrR | **Niet uit te lezen.** De link stuurt door naar Google Zoeken, dat geautomatiseerde verzoeken blokkeert. Alleen de profielnaam was zichtbaar in de doorverwijs-URL: "Schilder & Klusbedrijf \| Kluslijstservice \| Pascal van den Berg". |
| Zoeken op het web (reviews, KvK, werkspot e.d.) | Niets gevonden dat aantoonbaar bij dit bedrijf hoort. |

## Bevestigde bedrijfsgegevens (van de bestaande website)

- Naam: Schilder & Klusbedrijf Pascal van den Berg (logo: "P. van den Berg, uw schilder- en klusservice")
- Eigenaar: Pascal van den Berg
- E-mail: vandenberg.dienstverlening@outlook.com (staat zo in de mailto-knop op de huidige site)
- WhatsApp: +31 6 42 08 68 15 (uit de link "Chat on WhatsApp" op de huidige site). Dit nummer wordt ook als `telephone` in de structured data gebruikt. **Laten bevestigen of het ook gewoon gebeld mag worden.**
- Werkgebied, letterlijk: "Ik werk vanuit Ermelo in regio Amersfoort-Zeewolde-Nunspeet-Barneveld."
- Diensten volgens de site: binnen- en buitenschilderwerk, kitwerk in badkamer en keuken, onderhoud, reparaties, fijne afwerking, kluslijsten. Op de foto's verder: kozijnen, deuren, trappen, boeidelen, plafonds, houtrot, montage van planken, kastjes, badkamermeubel, raamfolie, een ombouwkast op maat.

### Niet bevestigd, dus niet gebruikt

- Straat, postcode en huisnummer (in de structured data staat alleen de plaats Ermelo)
- KvK- en btw-nummer
- Openingstijden
- Aantal jaren ervaring, aantallen klanten of projecten, keurmerken
- Reviews en beoordelingen
- Een foto van Pascal zelf

## Fotografie

**Alle foto's op de site zijn echte projectfoto's van Pascal**, gedownload van zijn eigen website. Er zijn **geen AI-gegenereerde of AI-bewerkte afbeeldingen** en **geen stockfoto's** gebruikt. De foto's zijn alleen geschaald, rechtgezet volgens de EXIF-oriëntatie en gecomprimeerd. Ook de voor- en na-foto zijn echt: twee foto's van dezelfde raamhoek, met Pascals eigen bijschriften "Raamkit verwijderen (voor)" en "Nieuwe kit + afgelakt (na)".

| Bestand (`public/projects/`) | Origineel bijschrift | Gebruikt in |
| --- | --- | --- |
| woonkamer-schilderwerk.jpg | Schilderwerk gehele woonkamer | Hero, diensten, projecten, OG-afbeelding |
| raamluik-afgelakt.jpg | Afgelakt raamluik | Projecten |
| boeidelen-aflakken.jpg | Aflakken boeidelen | Projecten |
| raamkozijnen-aflakken.jpg | Aflakken raam en raamkozijnen | Hero, diensten, projecten |
| deurpost-aflakken.jpg | Aflakken deurpost | Over Pascal, projecten |
| raamkit-voor.jpg | Raamkit verwijderen (voor) | Voor/na-slider |
| raamkit-na.jpg | Nieuwe kit + afgelakt (na) | Voor/na-slider, diensten |
| trap-trapgat.jpg | Trap en trapgat schilderen | Hero, projecten |
| plafond-sauzen.jpg | Plafond sauzen | Projecten |
| wandplanken-montage.jpg | Wandplanken monteren | Projecten |
| wandkastje-fotorooster.jpg | Wandkastje en fotorooster monteren | Waarom Pascal, projecten |
| raamfolie.jpg | Raamfolie plakken | Projecten |
| badkamermeubel.jpg | Badkamermeubel plaatsen | Projecten |
| badkamermeubel-leidingwerk.jpg | Leidingwerk in badkamermeubel | Projecten |
| ombouwkast-cv-ketel.jpg | Ombouwkast C.V. ketel op maat gemaakt rondom afzuiging | Diensten, projecten |
| houtrot-reparatie-kozijn.jpg | Houtrot reparatie | Diensten, projecten |
| houtrot-reparatie-detail.jpg | Houtrot reparatie | Projecten |
| deur-aflakken.jpg | Aflakken deur | Hero, projecten |

Logo: `public/brand/logo.png` is het originele logo, alleen bijgesneden. `public/brand/mark.png` is daaruit uitgesneden (monogram met dakvorm). In de footer wordt het logo met een CSS-mask in zandkleur gezet.

De werkgebiedkaart is een eigen SVG-tekening: de plaatsen staan op hun echte coördinaten, op schaal. Het is geen foto of kaartmateriaal van derden.

**Rechten:** de foto's en het logo zijn van Pascal en staan op zijn eigen openbare site. Voor een demo aan hemzelf is dat gangbaar, maar laat hem voor livegang bevestigen dat ze gebruikt mogen worden.

## Reviews

Er zijn **geen reviews** op de site gezet. De Google-reviews konden niet worden opgehaald of geverifieerd, en verzinnen is uitgesloten. Er is dus ook geen Testimonials-component gebouwd. Voor livegang: echte Google-reviews opvragen (met toestemming van de reviewers), of met een officiële Google Places-koppeling tonen.

## Formulier

Er is geen backend. Het formulier valideert in de browser en zet daarna een e-mail klaar in het mailprogramma van de bezoeker (`mailto:` met onderwerp en ingevulde gegevens). De bevestiging op de pagina zegt precies dat; er wordt nergens beweerd dat een bericht verzonden is. Een aangevinkte kluslijst gaat mee in de e-mail.

## Copy en keuzes om te bevestigen

- Aanspreekvorm "u", net als op Pascals huidige site.
- De ik-teksten (Over Pascal, Waarom Pascal) zijn geschreven op basis van zijn eigen sitetekst ("pas tevreden als de puntjes op de i staan", "denkt graag met u mee", kluslijst). Laat Pascal ze lezen en goedkeuren.
- De indeling van de diensten in vijf groepen en de klussen op de kluslijst volgen de diensten en foto's van de huidige site.
- Projectcategorieën (binnen / buiten en kozijnen / houtrot / montage) zijn door ons ingedeeld op basis van de bijschriften.

## Wat nog ontbreekt voor livegang

1. Domeinnaam; `NEXT_PUBLIC_SITE_URL` instellen (voor canonical-URL, Open Graph en structured data).
2. Toestemming voor het gebruik van foto's en logo, plus eventueel nieuwe of betere foto's, zoals een portret van Pascal.
3. Bevestiging van het telefoonnummer voor bellen, eventueel een vestigingsadres en het KvK-nummer.
4. Echte reviews (zie hierboven).
5. Een formulier-backend (bijvoorbeeld Resend, Formspree of een serverroute) als er een echte verzendbevestiging moet komen.
6. Privacyverklaring en een cookie-check (de site plaatst nu geen cookies en laadt geen trackers; lettertypen worden zelf gehost).
7. Een eigen favicon-set en een OG-afbeelding op maat (nu: de woonkamerfoto).

## Uitgevoerde controles

- `npm run lint`, `npm run typecheck`, `npm run build`: zonder fouten.
- Playwright (`npm run test:e2e`, tegen `next start`): 47 van 47 checks geslaagd op 375, 768, 1024 en 1440 px. Gecontroleerd: geen horizontale overflow, alle afbeeldingen laden, geen console errors of mislukte requests, geen dode ankerlinks, desktopnavigatie, mobiel menu (openen, linken, Escape), kluslijst naar formulier, formuliervalidatie en de mailto-flow, projectfilters, "toon alle", lightbox (openen, pijltjestoetsen, Escape), voor/na-slider (toetsenbord, knoppen, slepen met de muis), prefers-reduced-motion en weergave zonder JavaScript.
- Taste Skill-inspector: 0 FAIL. Drie waarschuwingen bewust laten staan: de crème ondergrond komt uit de briefing (#F7F5F0), er zijn meer dan vijf lettergroottes, en er is geen video (er bestaat geen echte video van Pascals werk, en stockbeeld zou misleidend zijn).
- Niet getest: echte touch-apparaten (iOS/Android), Safari en Firefox, Lighthouse/Core Web Vitals-metingen, schermlezers.

Screenshots staan in `docs/screenshots/`.
