// Alle bedrijfsgegevens hieronder komen van de bestaande website
// (sites.google.com/view/pvdb-schilder-klusbedrijf). Zie DEMO_NOTES.md.

export const business = {
  name: "Schilder & Klusbedrijf Pascal van den Berg",
  shortName: "Pascal van den Berg",
  tagline: "Schilder- en klusservice",
  owner: "Pascal van den Berg",
  email: "vandenberg.dienstverlening@outlook.com",
  phoneDisplay: "06 42 08 68 15",
  phoneE164: "+31642086815",
  whatsapp: "https://wa.me/31642086815",
  base: "Ermelo",
  region: ["Amersfoort", "Zeewolde", "Nunspeet", "Barneveld"],
};

export const nav = [
  { href: "#diensten", label: "Diensten" },
  { href: "#projecten", label: "Projecten" },
  { href: "#over-pascal", label: "Over Pascal" },
  { href: "#contact", label: "Contact" },
];

export type Category = "binnen" | "buiten" | "houtrot" | "montage";

export const categories: { id: Category | "alles"; label: string }[] = [
  { id: "alles", label: "Alles" },
  { id: "binnen", label: "Schilderwerk binnen" },
  { id: "buiten", label: "Buiten en kozijnen" },
  { id: "houtrot", label: "Houtrot" },
  { id: "montage", label: "Montage en klussen" },
];

export type Project = {
  src: string;
  title: string;
  category: Category;
  w: number;
  h: number;
  alt: string;
};

// Titels zijn de originele bijschriften van Pascal.
export const projects: Project[] = [
  {
    src: "/projects/woonkamer-schilderwerk.jpg",
    title: "Schilderwerk gehele woonkamer",
    category: "binnen",
    w: 1800,
    h: 1308,
    alt: "Woonkamer met donkergroene wanden, lichte plafonds en een witte schouw na het schilderwerk",
  },
  {
    src: "/projects/raamkozijnen-aflakken.jpg",
    title: "Aflakken raam en raamkozijnen",
    category: "buiten",
    w: 908,
    h: 1244,
    alt: "Glanzend wit gelakt raamkozijn tegen een bakstenen gevel",
  },
  {
    src: "/projects/trap-trapgat.jpg",
    title: "Trap en trapgat schilderen",
    category: "binnen",
    w: 1134,
    h: 1134,
    alt: "Zwart geschilderde open trap langs een lichte wand",
  },
  {
    src: "/projects/ombouwkast-cv-ketel.jpg",
    title: "Ombouwkast cv-ketel, op maat gemaakt rondom afzuiging",
    category: "montage",
    w: 1134,
    h: 1554,
    alt: "Witte ombouwkast met open deur rond een cv-ketel en afvoerbuis",
  },
  {
    src: "/projects/boeidelen-aflakken.jpg",
    title: "Aflakken boeidelen",
    category: "buiten",
    w: 908,
    h: 1244,
    alt: "Wit gelakte boeidelen onder de dakrand van een bakstenen woning",
  },
  {
    src: "/projects/deurpost-aflakken.jpg",
    title: "Aflakken deurpost",
    category: "binnen",
    w: 1313,
    h: 1800,
    alt: "Close-up van een strak donkergroen gelakte deurpost tegen een lichte muur",
  },
  {
    src: "/projects/houtrot-reparatie-kozijn.jpg",
    title: "Houtrot reparatie",
    category: "houtrot",
    w: 1134,
    h: 1554,
    alt: "Hoek van een wit kozijn met plamuur op de plek van het herstelde houtrot",
  },
  {
    src: "/projects/wandkastje-fotorooster.jpg",
    title: "Wandkastje en fotorooster monteren",
    category: "montage",
    w: 1134,
    h: 1554,
    alt: "Gemonteerd houten wandkastje en een zwart fotorooster aan de muur",
  },
  {
    src: "/projects/plafond-sauzen.jpg",
    title: "Plafond sauzen",
    category: "binnen",
    w: 1134,
    h: 1554,
    alt: "Strak wit gesausd plafond tussen donkere houten balken",
  },
  {
    src: "/projects/raamluik-afgelakt.jpg",
    title: "Afgelakt raamluik",
    category: "buiten",
    w: 908,
    h: 1244,
    alt: "Donker gelakt raamluik langs een bakstenen gevel, gezien van onderaf",
  },
  {
    src: "/projects/badkamermeubel.jpg",
    title: "Badkamermeubel plaatsen",
    category: "montage",
    w: 1747,
    h: 1134,
    alt: "Nieuw geplaatst badkamermeubel met witte wastafel en donker houten onderstel",
  },
  {
    src: "/projects/houtrot-reparatie-detail.jpg",
    title: "Houtrot reparatie",
    category: "houtrot",
    w: 1134,
    h: 1554,
    alt: "Gerepareerde houten balk met vulmiddel op de plek van het houtrot",
  },
  {
    src: "/projects/wandplanken-montage.jpg",
    title: "Wandplanken monteren",
    category: "montage",
    w: 1134,
    h: 1131,
    alt: "Twee zwarte wandplanken met servies en voorraadpotten boven een aanrecht",
  },
  {
    src: "/projects/deur-aflakken.jpg",
    title: "Aflakken deur",
    category: "binnen",
    w: 1134,
    h: 1554,
    alt: "Wit gelakte paneeldeur in een lichte gang",
  },
  {
    src: "/projects/raamfolie.jpg",
    title: "Raamfolie plakken",
    category: "montage",
    w: 1134,
    h: 1554,
    alt: "Raam met matte raamfolie in een houten kozijn",
  },
  {
    src: "/projects/badkamermeubel-leidingwerk.jpg",
    title: "Leidingwerk in badkamermeubel",
    category: "montage",
    w: 1134,
    h: 1554,
    alt: "Afvoer en aansluitingen netjes weggewerkt in een badkamermeubel",
  },
];

export type Service = {
  id: string;
  title: string;
  text: string;
  image: { src: string; alt: string };
  items: string[];
};

export const services: Service[] = [
  {
    id: "schilderwerk",
    title: "Binnen- en buitenschilderwerk",
    text: "Wanden, plafonds en houtwerk, binnen en buiten. Goed voorbereid en strak afgewerkt.",
    image: {
      src: "/projects/woonkamer-schilderwerk.jpg",
      alt: "Geschilderde woonkamer met donkergroene wanden",
    },
    items: ["Wanden en plafonds sauzen", "Houtwerk binnen aflakken", "Buitenschilderwerk en boeidelen"],
  },
  {
    id: "kozijnen",
    title: "Kozijnen, deuren en trappen",
    text: "Lakwerk waar u dagelijks langs loopt en dat er jaren goed uit moet blijven zien.",
    image: {
      src: "/projects/raamkozijnen-aflakken.jpg",
      alt: "Wit gelakt raamkozijn tegen een bakstenen gevel",
    },
    items: ["Kozijnen en ramen aflakken", "Deuren en deurposten aflakken", "Trap en trapgat schilderen"],
  },
  {
    id: "kitwerk",
    title: "Kitwerk",
    text: "Oude kit eruit, nieuwe kit erin. Netjes, waterdicht en met een strakke naad, in badkamer, keuken of kozijn.",
    image: {
      src: "/projects/raamkit-na.jpg",
      alt: "Nieuwe kitnaad langs een raam, strak afgelakt",
    },
    items: ["Kitwerk in badkamer of keuken", "Raamkit vervangen"],
  },
  {
    id: "houtrot",
    title: "Houtrot en onderhoud",
    text: "Rot hout vakkundig herstellen voordat het erger wordt, en daarna weer beschermen met een goede laklaag.",
    image: {
      src: "/projects/houtrot-reparatie-kozijn.jpg",
      alt: "Herstelde hoek van een wit kozijn",
    },
    items: ["Houtrot repareren", "Schilderonderhoud aan kozijnen en gevel"],
  },
  {
    id: "montage",
    title: "Montage en kleine klussen",
    text: "Planken, kastjes, een badkamermeubel of een ombouw op maat: de klussen die anders blijven liggen.",
    image: {
      src: "/projects/ombouwkast-cv-ketel.jpg",
      alt: "Op maat gemaakte ombouwkast rond een cv-ketel",
    },
    items: [
      "Planken en kastjes monteren",
      "Badkamermeubel plaatsen",
      "Ombouw of kast op maat",
      "Raamfolie plakken",
    ],
  },
];

export const jobTypes = [
  "Binnenschilderwerk",
  "Buitenschilderwerk",
  "Kozijnen, deuren of trappen",
  "Kitwerk",
  "Houtrot en onderhoud",
  "Montage of kleine klus",
  "Meerdere klussen",
  "Iets anders",
];
