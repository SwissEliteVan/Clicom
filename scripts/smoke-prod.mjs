// Production smoke: key routes over the built server.
import { chromium } from '@playwright/test';
const BASE = process.env.BASE_URL ?? 'http://localhost:3000';
const routes = ['/', '/services/', '/solutions/', '/contact/', '/creation-site-web/', '/secteurs/pme/', '/realisations/nat-et-patoune/', '/blog/ameliorer-taux-conversion-site/', '/audit-gratuit/'];
const browser = await chromium.launch();
const results = [];
for (const path of routes) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e).slice(0, 140)));
  page.on('console', (m) => { if (m.type() === 'error' && !m.text().includes('404')) errors.push(m.text().slice(0, 140)); });
  try {
    const resp = await page.goto(BASE + path, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(900);
    const info = await page.evaluate(() => ({
      h1: document.querySelectorAll('h1').length,
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    }));
    results.push({ path, status: resp ? resp.status() : null, ...info, errors });
  } catch (e) {
    results.push({ path, error: String(e).slice(0, 160) });
  }
  await page.close();
}
await browser.close();
let bad = 0;
for (const r of results) {
  const flags = [];
  if (r.status !== 200) flags.push(`STATUS=${r.status}`);
  if (r.h1 !== 1) flags.push(`H1=${r.h1}`);
  if (r.overflow) flags.push('OVERFLOW');
  if (r.errors && r.errors.length) flags.push(`ERR:${r.errors[0].slice(0, 60)}`);
  if (flags.length) bad++;
  console.log(`${r.path.padEnd(40)} ${flags.length ? '⚠ ' + flags.join(' | ') : 'ok'}`);
}
console.log(bad === 0 ? 'ALL OK' : `${bad} ROUTES WITH ISSUES`);
