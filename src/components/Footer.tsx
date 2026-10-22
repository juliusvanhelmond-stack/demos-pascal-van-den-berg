import { EmailText } from "./EmailText";
import { business, nav } from "@/content/site";
import { Year } from "./Year";

export function Footer() {
  return (
    <footer className="on-dark bg-ink text-paper">
      <div className="wrap pb-10 pt-4">
        <div className="grid gap-12 bg-ink-soft p-6 sm:p-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <span
              role="img"
              aria-label={`Logo ${business.name}`}
              className="block aspect-[978/506] w-56 bg-sand"
              style={{
                WebkitMask: "url(/brand/logo.png) center / contain no-repeat",
                mask: "url(/brand/logo.png) center / contain no-repeat",
              }}
            />
          </div>
          <nav aria-label="Footer" className="lg:col-span-2">
            <p className="text-muted-on-dark">Navigatie</p>
            <ul className="mt-4 space-y-2">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="link-underline decoration-transparent hover:decoration-sage">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="lg:col-span-4">
            <p className="text-muted-on-dark">Contact</p>
            <ul className="mt-4 space-y-2">
              <li>
                <a href={`mailto:${business.email}`} className="link-underline">
                  <EmailText />
                </a>
              </li>
              <li>
                <a href={business.whatsapp} className="link-underline">
                  WhatsApp {business.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-3">
            <p className="text-muted-on-dark">Werkgebied</p>
            <p className="mt-4">
              {business.base}, {business.region.join(", ").replace(/, ([^,]*)$/, " en $1")}
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-2 text-[0.9375rem] text-muted-on-dark sm:flex-row sm:justify-between">
          <p>
            &copy; <Year /> {business.name}
          </p>
          <a href="#top" className="link-underline decoration-transparent hover:decoration-sage">
            Terug naar boven
          </a>
        </div>
      </div>
    </footer>
  );
}
