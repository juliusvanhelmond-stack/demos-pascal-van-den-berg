"use client";

import { useRef, useState } from "react";
import { ArrowRight, Mail, MapPin, MessageCircle, X } from "lucide-react";
import { EmailText } from "./EmailText";
import { business, jobTypes } from "@/content/site";
import { useKluslijst } from "@/lib/kluslijst";

type Fields = { naam: string; email: string; telefoon: string; type: string; bericht: string };
type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = { naam: "", email: "", telefoon: "", type: "", bericht: "" };

function validate(f: Fields, listCount: number): Errors {
  const e: Errors = {};
  if (f.naam.trim().length < 2) e.naam = "Vul uw naam in.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "Vul een geldig e-mailadres in.";
  if (f.telefoon.trim() && !/^[+()\d\s-]{8,}$/.test(f.telefoon.trim()))
    e.telefoon = "Dit telefoonnummer lijkt niet te kloppen.";
  if (!f.type && listCount === 0) e.type = "Kies het type klus.";
  if (f.bericht.trim().length < 10 && listCount === 0)
    e.bericht = "Beschrijf kort wat er moet gebeuren (minimaal 10 tekens).";
  return e;
}

export function Contact() {
  const { items, remove } = useKluslijst();
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const next = { ...fields, [k]: e.target.value };
    setFields(next);
    if (touched[k]) setErrors(validate(next, items.length));
  };
  // Lege velden pas bij verzenden afkeuren: een foutmelding die bij blur verschijnt
  // verschuift de layout precies op het moment dat iemand op de verzendknop klikt.
  const blur = (k: keyof Fields) => () => {
    if (!fields[k].trim() && !touched[k]) return;
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(fields, items.length));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(fields, items.length);
    setErrors(errs);
    setTouched({ naam: true, email: true, telefoon: true, type: true, bericht: true });
    const first = Object.keys(errs)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`#${first}`)?.focus();
      return;
    }
    // Er is (nog) geen backend: de aanvraag wordt als e-mail klaargezet in het mailprogramma van de bezoeker.
    const type = fields.type || (items.length > 1 ? "Meerdere klussen" : "Kluslijst");
    const lines = [
      `Hallo Pascal,`,
      ``,
      fields.bericht.trim(),
      ...(items.length ? [``, `Mijn kluslijst:`, ...items.map((i) => `- ${i}`)] : []),
      ``,
      `Type klus: ${type}`,
      `Naam: ${fields.naam.trim()}`,
      `E-mail: ${fields.email.trim()}`,
      ...(fields.telefoon.trim() ? [`Telefoon: ${fields.telefoon.trim()}`] : []),
      ``,
      `Met vriendelijke groet,`,
      fields.naam.trim(),
    ];
    const subject = `Offerteaanvraag: ${type}`;
    const href = `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      lines.join("\n").replace(/\n{3,}/g, "\n\n").trim(),
    )}`;
    window.location.href = href;
    setSent(true);
  };

  const fieldClass = (k: keyof Fields) =>
    `mt-2 block w-full border-2 bg-paper px-4 py-3 text-[1.0625rem] text-ink transition-colors duration-200 placeholder:text-muted/70 focus:border-ink focus:outline-none ${
      errors[k] && touched[k] ? "border-[#9b2c1f]" : "border-sand hover:border-sage"
    }`;

  const err = (k: keyof Fields) =>
    errors[k] && touched[k] ? (
      <p id={`${k}-fout`} className="mt-2 text-[0.9375rem] font-medium text-[#9b2c1f]">
        {errors[k]}
      </p>
    ) : null;

  return (
    <section id="contact" aria-labelledby="contact-titel" className="on-dark bg-ink text-paper">
      <div className="wrap grid gap-14 py-24 md:py-32 lg:grid-cols-12 lg:gap-8 lg:py-40">
        <div className="lg:col-span-5">
          <h2 id="contact-titel" data-reveal className="text-title">
            Een klus in gedachten?
          </h2>
          <p data-reveal style={{ "--i": 1 } as React.CSSProperties} className="mt-4 max-w-[22ch] font-serif text-[clamp(1.6rem,1.2rem+1.3vw,2.25rem)] leading-[1.15] text-sand">
            Laten we er iets moois van maken.
          </p>
          <p data-reveal style={{ "--i": 2 } as React.CSSProperties} className="mt-8 max-w-[38ch] text-lead leading-[1.45] text-muted-on-dark">
            Vertel kort wat er moet gebeuren. Ik neem contact met u op voor een vrijblijvende prijsopgave.
          </p>

          <ul className="mt-12 space-y-5 text-[1.0625rem]">
            <li data-reveal style={{ "--i": 2 } as React.CSSProperties} className="flex items-start gap-4">
              <Mail size={22} strokeWidth={1.75} className="mt-0.5 shrink-0 text-sage" aria-hidden />
              <span>
                <span className="block text-[0.9375rem] text-muted-on-dark">E-mail</span>
                <a className="link-underline" href={`mailto:${business.email}`}>
                  <EmailText />
                </a>
              </span>
            </li>
            <li data-reveal style={{ "--i": 3 } as React.CSSProperties} className="flex items-start gap-4">
              <MessageCircle size={22} strokeWidth={1.75} className="mt-0.5 shrink-0 text-sage" aria-hidden />
              <span>
                <span className="block text-[0.9375rem] text-muted-on-dark">WhatsApp</span>
                <a className="link-underline" href={business.whatsapp}>
                  {business.phoneDisplay}
                </a>
              </span>
            </li>
            <li data-reveal style={{ "--i": 4 } as React.CSSProperties} className="flex items-start gap-4">
              <MapPin size={22} strokeWidth={1.75} className="mt-0.5 shrink-0 text-sage" aria-hidden />
              <span>
                <span className="block text-[0.9375rem] text-muted-on-dark">Vanuit</span>
                {business.base}, regio {business.region.join(", ").replace(/, ([^,]*)$/, " en $1")}
              </span>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <form
            ref={formRef}
            noValidate
            onSubmit={onSubmit}
            data-reveal
            style={{ "--i": 2 } as React.CSSProperties}
            className="bg-paper p-5 text-ink sm:p-10"
            aria-describedby="form-uitleg"
          >
            <p id="form-uitleg" className="text-muted">
              Velden met * zijn verplicht.
            </p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="naam" className="font-semibold">
                  Naam *
                </label>
                <input
                  id="naam"
                  name="naam"
                  autoComplete="name"
                  value={fields.naam}
                  onChange={set("naam")}
                  onBlur={blur("naam")}
                  aria-invalid={!!(errors.naam && touched.naam)}
                  aria-describedby={errors.naam && touched.naam ? "naam-fout" : undefined}
                  className={fieldClass("naam")}
                />
                {err("naam")}
              </div>
              <div>
                <label htmlFor="email" className="font-semibold">
                  E-mail *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={fields.email}
                  onChange={set("email")}
                  onBlur={blur("email")}
                  aria-invalid={!!(errors.email && touched.email)}
                  aria-describedby={errors.email && touched.email ? "email-fout" : undefined}
                  className={fieldClass("email")}
                />
                {err("email")}
              </div>
              <div>
                <label htmlFor="telefoon" className="font-semibold">
                  Telefoon <span className="font-normal text-muted">(optioneel)</span>
                </label>
                <input
                  id="telefoon"
                  name="telefoon"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={fields.telefoon}
                  onChange={set("telefoon")}
                  onBlur={blur("telefoon")}
                  aria-invalid={!!(errors.telefoon && touched.telefoon)}
                  aria-describedby={errors.telefoon && touched.telefoon ? "telefoon-fout" : undefined}
                  className={fieldClass("telefoon")}
                />
                {err("telefoon")}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="type" className="font-semibold">
                  Type klus {items.length === 0 && "*"}
                </label>
                <select
                  id="type"
                  name="type"
                  value={fields.type}
                  onChange={set("type")}
                  onBlur={blur("type")}
                  aria-invalid={!!(errors.type && touched.type)}
                  aria-describedby={errors.type && touched.type ? "type-fout" : undefined}
                  className={`${fieldClass("type")} appearance-none bg-[length:20px] bg-[right_1rem_center] bg-no-repeat pr-12`}
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23252923' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
                  }}
                >
                  <option value="">{items.length ? "Zie mijn kluslijst" : "Kies een type klus"}</option>
                  {jobTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {err("type")}
              </div>

              {items.length > 0 && (
                <div className="sm:col-span-2">
                  <p className="font-semibold">Mijn kluslijst</p>
                  <ul className="mt-3 flex flex-wrap gap-2" aria-label="Aangevinkte klussen">
                    {items.map((item) => (
                      <li key={item} className="flex items-center bg-sand-soft pl-3 text-[0.9375rem] font-medium">
                        {item}
                        <button
                          type="button"
                          onClick={() => remove(item)}
                          className="ml-1 inline-flex h-10 w-10 items-center justify-center transition-colors hover:bg-sand"
                          aria-label={`${item} van de lijst halen`}
                        >
                          <X size={16} aria-hidden />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="sm:col-span-2">
                <label htmlFor="bericht" className="font-semibold">
                  Bericht {items.length === 0 && "*"}
                </label>
                <textarea
                  id="bericht"
                  name="bericht"
                  rows={5}
                  value={fields.bericht}
                  onChange={set("bericht")}
                  onBlur={blur("bericht")}
                  placeholder="Bijvoorbeeld: de kozijnen aan de voorkant moeten opnieuw gelakt worden."
                  aria-invalid={!!(errors.bericht && touched.bericht)}
                  aria-describedby={errors.bericht && touched.bericht ? "bericht-fout" : undefined}
                  className={`${fieldClass("bericht")} resize-y`}
                />
                {err("bericht")}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <button type="submit" className="btn btn-ink w-full sm:w-auto sm:self-start">
                Verstuur via e-mail
                <ArrowRight size={18} className="btn-arrow" aria-hidden />
              </button>
              <p className="text-[0.9375rem] text-muted">
                Uw aanvraag wordt als e-mail klaargezet in uw eigen mailprogramma. U verstuurt hem daar zelf.
              </p>
              <div aria-live="polite">
                {sent && (
                  <p className="bg-sand-soft p-4 text-[0.9375rem]">
                    Uw mailprogramma zou nu moeten openen met uw aanvraag. Verstuur de e-mail daar om de aanvraag af
                    te ronden. Opent er niets? Mail dan naar{" "}
                    <a className="link-underline font-semibold" href={`mailto:${business.email}`}>
                      <EmailText />
                    </a>{" "}
                    of stuur een{" "}
                    <a className="link-underline font-semibold" href={business.whatsapp}>
                      WhatsApp-bericht
                    </a>
                    .
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
