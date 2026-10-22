import type { Metadata, Viewport } from "next";
import "@fontsource/dm-serif-display/400.css";
import "@fontsource-variable/manrope";
import "./globals.css";
import { business } from "@/content/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const description =
  "Schilder en allround klusser uit Ermelo. Binnen- en buitenschilderwerk, kozijnen, deuren en trappen, kitwerk, houtrotreparatie en montage in de regio Amersfoort, Zeewolde, Nunspeet en Barneveld.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Pascal van den Berg | Schilder & Klusbedrijf in Ermelo",
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: business.name,
    title: "Goed werk. Tot in de details. | Pascal van den Berg",
    description,
    images: [
      {
        url: "/projects/woonkamer-schilderwerk.jpg",
        width: 1800,
        height: 1308,
        alt: "Door Pascal van den Berg geschilderde woonkamer",
      },
    ],
  },
  icons: { icon: "/brand/mark.png", apple: "/brand/mark.png" },
};

export const viewport: Viewport = {
  themeColor: "#f7f5f0",
};

// Uitsluitend gegevens die op de bestaande website staan.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HousePainter",
  name: business.name,
  founder: { "@type": "Person", name: business.owner },
  email: business.email,
  telephone: business.phoneE164,
  image: `${siteUrl}/projects/woonkamer-schilderwerk.jpg`,
  logo: `${siteUrl}/brand/logo.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: business.base,
    addressCountry: "NL",
  },
  areaServed: [business.base, ...business.region].map((name) => ({ "@type": "City", name })),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
