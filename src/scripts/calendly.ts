/**
 * CLICOM Calendly Centralized Utility
 *
 * Charge le widget Calendly une seule fois (lazy) et expose
 * les APIs popup / inline à tous les composants du site.
 *
 * Utilise import.meta.env.PUBLIC_CALENDLY_URL.
 * Ne charge rien si cette variable est vide.
 * Tracke calendly_open et calendly_scheduled (via postMessage).
 */

import { trackCalendly } from './analytics';

declare global {
  interface Window {
    Calendly?: { initPopupWidget: (opts: { url: string }) => void; initInlineWidget: (opts: { url: string; parentElement: HTMLElement; prefill?: Record<string, unknown>; utm?: Record<string, unknown> }) => void; };
  }
}

export const CALENDLY_URL = import.meta.env.PUBLIC_CALENDLY_URL ?? '';
const SCRIPT_ID = 'calendly-script';
const CSS_ID = 'calendly-css';
let loader: Promise<void> | null = null;
let trackingBound = false;
let popupOpening = false;

function fallback() { if (CALENDLY_URL) window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer'); else window.location.assign('/contact/'); }
function bindTracking() {
  if (trackingBound) return;
  trackingBound = true;
  window.addEventListener('message', (event: MessageEvent) => {
    if (event.origin !== 'https://calendly.com') return;
    const data = typeof event.data === 'string' ? (() => { try { return JSON.parse(event.data); } catch { return null; } })() : event.data;
    if (data?.event === 'calendly.event_scheduled') { trackCalendly('scheduled'); try { sessionStorage.setItem('clicom_converted', '1'); } catch {} }
  });
}
function loadCalendly(): Promise<void> {
  if (window.Calendly) return Promise.resolve();
  if (loader) return loader;
  loader = new Promise<void>((resolve, reject) => {
    if (!document.getElementById(CSS_ID)) { const link = document.createElement('link'); link.id = CSS_ID; link.rel = 'stylesheet'; link.href = 'https://assets.calendly.com/assets/external/widget.css'; document.head.appendChild(link); }
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    const script = existing ?? document.createElement('script');
    const timeout = window.setTimeout(() => reject(new Error('Calendly timeout')), 10_000);
    script.onload = () => { window.clearTimeout(timeout); bindTracking(); resolve(); };
    script.onerror = () => { window.clearTimeout(timeout); reject(new Error('Calendly failed')); };
    if (!existing) { script.id = SCRIPT_ID; script.src = 'https://assets.calendly.com/assets/external/widget.js'; script.async = true; document.head.appendChild(script); }
  }).catch((error) => { loader = null; throw error; });
  return loader;
}
export async function openCalendlyPopup(): Promise<void> {
  if (popupOpening) return;
  popupOpening = true;
  window.dispatchEvent(new Event('clicom:close-overlays'));
  try { await loadCalendly(); if (!window.Calendly) throw new Error('Calendly unavailable'); trackCalendly('open'); window.Calendly.initPopupWidget({ url: CALENDLY_URL }); }
  catch { fallback(); }
  finally { window.setTimeout(() => { popupOpening = false; }, 400); }
}
export async function initCalendlyInline(container: HTMLElement): Promise<void> {
  if (!CALENDLY_URL) return;
  try { await loadCalendly(); if (!window.Calendly) throw new Error('Calendly unavailable'); container.innerHTML = ''; container.style.minHeight = '700px'; window.Calendly.initInlineWidget({ url: CALENDLY_URL, parentElement: container, prefill: {}, utm: {} }); }
  catch { fallback(); }
}
