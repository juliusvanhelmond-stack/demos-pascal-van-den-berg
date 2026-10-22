// Playwright-controle van de demo: screenshots, console, overflow, beelden en interacties.
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const URL = process.env.URL || "http://localhost:3100";
const OUT = process.argv[2] || path.join(__dirname, "..", ".e2e-shots");
fs.mkdirSync(OUT, { recursive: true });

const results = [];
const ok = (name, pass, info = "") => {
  results.push({ name, pass, info });
  console.log(`${pass ? "PASS" : "FAIL"}  ${name}${info ? "  — " + info : ""}`);
};

async function revealAll(page) {
  // Scroll de hele pagina door zodat alle reveals en lazy images laden.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.6;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await page.waitForTimeout(900);
}

(async () => {
  const browser = await chromium.launch({ args: ["--no-sandbox"] });

  for (const width of [375, 768, 1024, 1440]) {
    const ctx = await browser.newContext({ viewport: { width, height: width < 768 ? 812 : 900 } });
    const page = await ctx.newPage();
    const errors = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(String(e)));
    const failed = [];
    page.on("requestfailed", (r) => failed.push(r.url()));
    page.on("response", (r) => r.status() >= 400 && failed.push(`${r.status()} ${r.url()}`));

    await page.goto(URL, { waitUntil: "networkidle" });
    await page.screenshot({ path: `${OUT}/${width}-fold.png` });
    await revealAll(page);
    await page.screenshot({ path: `${OUT}/${width}-full.png`, fullPage: true });

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    ok(`@${width} geen horizontale overflow`, overflow <= 0, `${overflow}px`);

    const broken = await page.evaluate(() =>
      Array.from(document.images)
        .filter((i) => i.complete && i.naturalWidth === 0)
        .map((i) => i.currentSrc || i.src),
    );
    ok(`@${width} alle afbeeldingen laden`, broken.length === 0, broken.join(", "));

    const hidden = await page.evaluate(
      () => Array.from(document.querySelectorAll("[data-reveal]")).filter((el) => !el.classList.contains("is-in")).length,
    );
    const hiddenList = await page.evaluate(() =>
      Array.from(document.querySelectorAll("[data-reveal]:not(.is-in)")).slice(0, 4).map((el) => el.tagName + ":" + (el.textContent || "").slice(0, 30)),
    );
    ok(`@${width} alle reveals zichtbaar na scrollen`, hidden === 0, `${hidden} verborgen ${hiddenList.join(" | ")}`);

    ok(`@${width} geen console errors`, errors.length === 0, errors.slice(0, 3).join(" | "));
    ok(`@${width} geen mislukte requests`, failed.length === 0, failed.slice(0, 3).join(" | "));

    // Interne ankers verwijzen naar bestaande id's
    const deadAnchors = await page.evaluate(() =>
      Array.from(document.querySelectorAll('a[href^="#"]'))
        .map((a) => a.getAttribute("href"))
        .filter((h) => h.length > 1 && !document.getElementById(h.slice(1))),
    );
    ok(`@${width} geen dode ankerlinks`, deadAnchors.length === 0, deadAnchors.join(", "));

    if (width === 375) {
      // Mobiel menu
      await page.getByRole("button", { name: "Menu openen" }).click();
      await page.waitForTimeout(400);
      const menuVisible = await page.locator("#mobiel-menu").isVisible();
      ok("mobiel menu opent", menuVisible);
      await page.screenshot({ path: `${OUT}/375-menu.png` });
      await page.locator("#mobiel-menu").getByRole("link", { name: "Projecten" }).click();
      await page.waitForTimeout(1200);
      const closed = !(await page.locator("#mobiel-menu").isVisible());
      const top = await page.evaluate(() => document.getElementById("projecten").getBoundingClientRect().top);
      ok("menu sluit en scrollt naar Projecten", closed && Math.abs(top) < 120, `top=${Math.round(top)}`);
      await page.getByRole("button", { name: "Menu openen" }).click();
      await page.keyboard.press("Escape");
      await page.waitForTimeout(400);
      ok("menu sluit met Escape", !(await page.locator("#mobiel-menu").isVisible()));
    }

    if (width === 1440) {
      // Navigatie desktop
      for (const [label, id] of [
        ["Diensten", "diensten"],
        ["Projecten", "projecten"],
        ["Over Pascal", "over-pascal"],
        ["Contact", "contact"],
      ]) {
        await page.getByRole("navigation", { name: "Hoofdmenu" }).getByRole("link", { name: label }).click();
        await page.waitForTimeout(1300);
        const top = await page.evaluate((i) => document.getElementById(i).getBoundingClientRect().top, id);
        ok(`nav "${label}" scrollt naar #${id}`, Math.abs(top) < 120, `top=${Math.round(top)}`);
      }

      // Kluslijst → contact
      await page.goto(URL, { waitUntil: "networkidle" });
      await page.locator("#diensten").scrollIntoViewIfNeeded();
      await page.getByLabel("Raamkit vervangen").check({ force: true });
      await page.getByLabel("Houtrot repareren").check({ force: true });
      const count = await page.locator("#diensten").getByText("2 klussen op uw lijst.").isVisible();
      ok("kluslijst telt aangevinkte klussen", count);
      await page.locator("#diensten").scrollIntoViewIfNeeded();
      await page.getByRole("button", { name: "Stuur mijn kluslijst" }).click();
      await page.waitForTimeout(1500);
      const chips = await page.getByRole("list", { name: "Aangevinkte klussen" }).locator("li").count();
      ok("kluslijst verschijnt in contactformulier", chips === 2, `${chips} items`);
      const focused = await page.evaluate(() => document.activeElement?.id);
      ok("focus springt naar naamveld", focused === "naam", String(focused));

      // Formuliervalidatie
      await page.getByRole("button", { name: "Verstuur via e-mail" }).click();
      await page.waitForTimeout(300);
      const errs = await page.locator('[id$="-fout"]').count();
      ok("validatie toont fouten bij leeg formulier", errs >= 2, `${errs} meldingen`);
      await page.locator("#contact").screenshot({ path: `${OUT}/1440-form-errors.png` });
      await page.fill("#naam", "Test Persoon");
      await page.fill("#email", "geen-email");
      await page.locator("#telefoon").focus();
      ok("e-mail wordt gevalideerd", await page.getByText("Vul een geldig e-mailadres in.").isVisible());
      await page.fill("#email", "test@example.nl");
      await page.fill("#bericht", "Graag een prijsopgave voor de voorkant.");
      let mailto = "";
      page.on("request", (r) => r.url().startsWith("mailto:") && (mailto = r.url()));
      await page.route("mailto:*", (route) => route.abort());
      await page.getByRole("button", { name: "Verstuur via e-mail" }).click();
      await page.waitForTimeout(800);
      const status = await page.getByText("Uw mailprogramma zou nu moeten openen").isVisible();
      ok("verzenden toont eerlijke mailto-bevestiging", status, mailto ? "mailto aangevraagd" : "");

      // Lightbox
      await page.goto(URL, { waitUntil: "networkidle" });
      await page.locator("#projecten").scrollIntoViewIfNeeded();
      await page.getByRole("button", { name: "Buiten en kozijnen" }).click();
      const n = await page.locator("#projecten ul > li").count();
      ok("filter Buiten en kozijnen toont 3 projecten", n === 3, `${n}`);
      await page.getByRole("button", { name: /^Alles/ }).click();
      await page.getByRole("button", { name: /Toon alle 16 projecten/ }).click();
      const all = await page.locator("#projecten ul > li").count();
      ok("Toon alle projecten toont 16", all === 16, `${all}`);
      await page.locator("#projecten ul > li button").first().click();
      await page.waitForTimeout(500);
      ok("lightbox opent", await page.locator("dialog[open]").isVisible());
      await page.keyboard.press("ArrowRight");
      await page.waitForTimeout(300);
      const counter = await page.locator("dialog[open]").getByText(/van 16/).innerText();
      ok("pijltjestoets gaat naar volgend project", counter.startsWith("2 van"), counter);
      await page.screenshot({ path: `${OUT}/1440-lightbox.png` });
      await page.keyboard.press("Escape");
      await page.waitForTimeout(300);
      ok("lightbox sluit met Escape", (await page.locator("dialog[open]").count()) === 0);

      // Voor/na slider
      const slider = page.getByRole("slider", { name: "Vergelijk de situatie voor en na" });
      await slider.focus();
      await page.keyboard.press("ArrowLeft");
      await page.keyboard.press("ArrowLeft");
      ok("slider reageert op toetsenbord", (await slider.inputValue()) === "48", await slider.inputValue());
      await page.getByRole("button", { name: "Na", exact: true }).click();
      ok("knop Na zet slider op 0", (await slider.inputValue()) === "0");
      const frame = page.locator('section[aria-labelledby="voorna-titel"] .aspect-square');
      const box = await frame.boundingBox();
      await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.5);
      await page.mouse.down();
      await page.mouse.move(box.x + box.width * 0.75, box.y + box.height * 0.5, { steps: 6 });
      await page.mouse.up();
      const v = Number(await slider.inputValue());
      ok("slider is versleepbaar met muis", v >= 70 && v <= 80, String(v));
      await page.locator('section[aria-labelledby="voorna-titel"]').screenshot({ path: `${OUT}/1440-voorna.png` });

      // Reduced motion: content direct zichtbaar
      const rm = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
      const rp = await rm.newPage();
      await rp.goto(URL, { waitUntil: "networkidle" });
      const op = await rp.evaluate(() => getComputedStyle(document.querySelector("#projecten h2")).opacity);
      ok("prefers-reduced-motion toont content zonder animatie", op === "1", op);
      await rm.close();
    }
    await ctx.close();
  }

  // Zonder JavaScript blijft content zichtbaar
  const nojs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
  const np = await nojs.newPage();
  await np.goto(URL, { waitUntil: "load" });
  const opNo = await np.evaluate(() => getComputedStyle(document.querySelector("#projecten h2")).opacity);
  ok("zonder JS blijft content zichtbaar", opNo === "1", opNo);
  await nojs.close();

  await browser.close();
  const failedCount = results.filter((r) => !r.pass).length;
  console.log(`\n${results.length - failedCount}/${results.length} geslaagd`);
  process.exit(failedCount ? 1 : 0);
})();
