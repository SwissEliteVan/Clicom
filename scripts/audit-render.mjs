// Render health audit: overflow, element sizes, contrast, empty sections, h1 count.
import { chromium } from '@playwright/test';

const BASE = process.env.BASE_URL ?? 'http://localhost:4321';

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
  ['audit', '/audit-gratuit/'],
];

const viewports = [
  ['desktop', { width: 1440, height: 900 }],
  ['tablet', { width: 834, height: 1112 }],
  ['mobile', { width: 390, height: 844 }],
];

const browser = await chromium.launch();
const report = [];

for (const [slug, path] of routes) {
  for (const [vw, viewport] of viewports) {
    const page = await browser.newPage({ viewport });
    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)); });
    page.on('pageerror', (e) => errors.push(String(e).slice(0, 200)));
    try {
      const resp = await page.goto(BASE + path, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.waitForTimeout(1200);
      const audit = await page.evaluate(() => {
        const contrast = (hex1, hex2) => {
          const p = (h) => {
            const c = h.replace('#', '');
            const r = parseInt(c.slice(0, 2), 16) / 255, g = parseInt(c.slice(2, 4), 16) / 255, b = parseInt(c.slice(4, 6), 16) / 255;
            const lin = (v) => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
            return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
          };
          const l1 = p(hex1), l2 = p(hex2);
          const hi = Math.max(l1, l2), lo = Math.min(l1, l2);
          return (hi + 0.05) / (lo + 0.05);
        };
        const out = {
          h1: document.querySelectorAll('h1').length,
          h1Texts: [...document.querySelectorAll('h1')].map((h) => h.textContent.trim().slice(0, 70)),
          h2: document.querySelectorAll('h2').length,
          overflowX: false, overflowEls: [], emptySections: [], tinyText: [],
          imagesBroken: [], bodyFont: null, headerPosition: null, lowContrast: [],
        };
        out.overflowX = document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
        if (out.overflowX) {
          const seen = new Set();
          document.querySelectorAll('body *').forEach((el) => {
            const r = el.getBoundingClientRect();
            if (r.width > 0 && (r.right > document.documentElement.clientWidth + 1 || r.left < -1)) {
              const cls = typeof el.className === 'string' ? el.className.split(' ').slice(0, 3).join('.') : el.tagName;
              const key = `${el.tagName}.${cls}`;
              if (seen.size < 24 && !seen.has(key)) { seen.add(key); out.overflowEls.push(`${el.tagName.toLowerCase()}.${cls} right=${Math.round(r.right)} left=${Math.round(r.left)} w=${Math.round(r.width)}`); }
            }
          });
        }
        document.querySelectorAll('section, footer, main > div').forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.height < 24 && r.width > 0) out.emptySections.push(`${el.tagName.toLowerCase()}.${(el.className || '').toString().split(' ')[0]}`);
        });
        const tiny = new Set();
        document.querySelectorAll('p, span, a, li, h1, h2, h3, h4, button, small, b').forEach((el) => {
          const s = getComputedStyle(el);
          const fs = parseFloat(s.fontSize);
          const txt = (el.textContent || '').trim();
          if (fs > 0 && fs < 9 && txt.length > 8 && s.display !== 'none' && tiny.size < 10) {
            tiny.add(`${el.tagName.toLowerCase()}.${(el.className || '').toString().split(' ')[0]} fs=${fs} "${txt.slice(0, 36)}"`);
          }
        });
        out.tinyText = [...tiny];
        document.querySelectorAll('img').forEach((img) => {
          if (img.complete && img.naturalWidth === 0 && img.src) out.imagesBroken.push(img.src.slice(0, 90));
        });
        out.bodyFont = getComputedStyle(document.body).fontSize;
        const header = document.querySelector('header');
        out.headerPosition = header ? getComputedStyle(header).position : 'none';
        const samples = [];
        document.querySelectorAll('h1, h2, h3, p, a').forEach((el) => {
          if (samples.length >= 12) return;
          const s = getComputedStyle(el);
          const c = s.color;
          const txt = (el.textContent || '').trim();
          if (!txt) return;
          if (c.startsWith('rgb(')) {
            const m = c.match(/\d+/g).map(Number);
            const hex = '#' + m.map((v) => v.toString(16).padStart(2, '0')).join('');
            const bgEl = el.closest('.card, .section, section, [style*="background"], body') || document.body;
            const bg = getComputedStyle(bgEl).backgroundColor;
            if (bg.startsWith('rgb(')) {
              const m2 = bg.match(/\d+/g).map(Number);
              const bgHex = '#' + m2.map((v) => v.toString(16).padStart(2, '0')).join('');
              const ratio = contrast(hex, bgHex);
              if (ratio < 4.5 && (el.tagName === 'P' || el.tagName === 'A')) {
                samples.push(`${el.tagName}.${(el.className || '').toString().split(' ')[0]} ${hex} on ${bgHex} = ${ratio.toFixed(2)} "${txt.slice(0, 36)}"`);
              }
            }
          }
        });
        out.lowContrast = samples;
        return out;
      });
      report.push({ slug, vw, status: resp ? resp.status() : null, ...audit, errors });
    } catch (e) {
      report.push({ slug, vw, error: String(e).slice(0, 200) });
    }
    await page.close();
  }
}
await browser.close();
for (const r of report) {
  const flags = [];
  if (r.overflowX) flags.push('OVERFLOW-X');
  if (r.errors && r.errors.length) flags.push(`ERR:${r.errors[0].slice(0, 50)}`);
  if (r.tinyText && r.tinyText.length) flags.push('TINY-TEXT');
  if (r.lowContrast && r.lowContrast.length) flags.push('LOW-CONTRAST');
  if (r.h1 !== 1) flags.push(`H1=${r.h1}`);
  if (r.imagesBroken && r.imagesBroken.length) flags.push('BROKEN-IMG');
  if (r.emptySections && r.emptySections.length) flags.push('EMPTY-SECTIONS');
  console.log(`${String(r.slug).padEnd(18)} ${String(r.vw).padEnd(8)} ${flags.length ? '⚠ ' + flags.join(' | ') : 'ok'}`);
  if (r.overflowX && r.overflowEls && r.overflowEls.length) console.log(`   overflow: ${r.overflowEls.slice(0, 4).join(' ;; ')}`);
  if (r.tinyText && r.tinyText.length) console.log(`   tiny: ${r.tinyText.slice(0, 3).join(' ;; ')}`);
  if (r.lowContrast && r.lowContrast.length) console.log(`   contrast: ${r.lowContrast.slice(0, 3).join(' ;; ')}`);
  if (r.emptySections && r.emptySections.length) console.log(`   empty: ${r.emptySections.slice(0, 3).join(' ;; ')}`);
  if (r.error) console.log(`   ERROR: ${r.error}`);
}
console.log('--- H1 per route (desktop) ---');
for (const r of report.filter((x) => x.vw === 'desktop')) console.log(`${String(r.slug).padEnd(18)} h1=${r.h1} :: ${(r.h1Texts || []).join(' | ')}`);
