// Capture screenshots of key CLICOM pages at desktop & mobile widths.
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';

const BASE = process.env.BASE_URL ?? 'http://localhost:4321';
const OUT = 'C:/Users/Administrateur/clicom/.captures';
mkdirSync(OUT, { recursive: true });

const routes = [
  ['home', '/'],
  ['services', '/services/'],
  ['solutions', '/solutions/'],
  ['agence', '/agence/'],
  ['methode', '/methode/'],
  ['tarifs', '/tarifs/'],
  ['contact', '/contact/'],
  ['realisations', '/realisations/'],
  ['creation-site-web', '/creation-site-web/'],
  ['seo', '/seo/'],
  ['secteur-pme', '/secteurs/pme/'],
  ['blog-index', '/blog/'],
  ['blog-post', '/blog/ameliorer-taux-conversion-site/'],
  ['page404', '/page-inexistante-404'],
  ['audit', '/audit-gratuit/'],
];

const viewports = [
  ['desktop', { width: 1440, height: 900 }],
  ['tablet', { width: 834, height: 1112 }],
  ['mobile', { width: 390, height: 844 }],
];

const browser = await chromium.launch();
const results = [];
for (const [slug, path] of routes) {
  for (const [vw, viewport] of viewports) {
    const page = await browser.newPage({ viewport });
    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 140)); });
    page.on('pageerror', (e) => errors.push(String(e).slice(0, 140)));
    try {
      const resp = await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 45000 });
      await page.waitForTimeout(1200);
      const file = `${OUT}/${slug}__${vw}.png`;
      await page.screenshot({ path: file, fullPage: true });
      const h1 = await page.evaluate(() => document.querySelectorAll('h1').length);
      results.push({ slug, vw, status: resp?.status(), h1, errors, file });
    } catch (e) {
      results.push({ slug, vw, error: String(e).slice(0, 200) });
    }
    await page.close();
  }
}
await browser.close();
console.log(JSON.stringify(results, null, 2));
