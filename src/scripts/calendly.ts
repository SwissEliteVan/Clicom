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
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void;
      initInlineWidget: (opts: {
        url: string;
        parentElement: HTMLElement;
        prefill?: Record<string, unknown>;
        utm?: Record<string, unknown>;
      }) => void;
    };
  }
}

export const CALENDLY_URL: string =
  (import.meta as Record<string, any>).env?.PUBLIC_CALENDLY_URL ?? '';

let initialized = false;
let initPromise: Promise<void> | null = null;

function loadScript(): Promise<void> {
  return new Promise((resolve) => {
    if (document.getElementById('calendly-script')) {
      resolve();
      return;
    }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    document.head.appendChild(link);
    const script = document.createElement('script');
    script.id = 'calendly-script';
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
}

function initTracking(): void {
  window.addEventListener('message', (e: MessageEvent) => {
    if (e.origin !== 'https://calendly.com') return;
    try {
      const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
      if (data?.event === 'calendly.event_scheduled') {
        trackCalendly('scheduled');
        try { sessionStorage.setItem('clicom_converted', '1'); } catch {}
      }
    } catch {}
  });
}

async function ensureCalendly(): Promise<void> {
  if (!CALENDLY_URL) return;
  if (initialized) return;
  if (initPromise) return initPromise;
  initPromise = (async () => {
    await loadScript();
    initTracking();
    initialized = true;
  })();
  return initPromise;
}

export async function openCalendlyPopup(): Promise<void> {
  if (!CALENDLY_URL) {
    window.location.href = '/contact/';
    return;
  }
  trackCalendly('open');
  await ensureCalendly();
  if (window.Calendly) {
    window.Calendly.initPopupWidget({ url: CALENDLY_URL });
  }
}

export async function initCalendlyInline(container: HTMLElement): Promise<void> {
  if (!CALENDLY_URL) return;
  trackCalendly('open');
  await ensureCalendly();
  container.innerHTML = '';
  container.style.minHeight = '700px';
  if (window.Calendly) {
    window.Calendly.initInlineWidget({
      url: CALENDLY_URL,
      parentElement: container,
      prefill: {},
      utm: {},
    });
  }
}
