/**
 * CLICOM Analytics Layer
 * Respects consent before emitting any event.
 * Compatible with GA4 via GTM dataLayer.
 */

interface ConsentData {
  essential: true;
  analytics: boolean;
  marketing: boolean;
}

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer: unknown[];
    clicomConsent?: ConsentData;
  }
}

// ── Consent helpers ──────────────────────────────────────────────────────────

function hasAnalyticsConsent(): boolean {
  try {
    const raw = localStorage.getItem('clicom_consent');
    if (!raw) return false;
    const data: ConsentData = JSON.parse(raw);
    return data?.analytics === true;
  } catch { return false; }
}

function hasMarketingConsent(): boolean {
  try {
    const raw = localStorage.getItem('clicom_consent');
    if (!raw) return false;
    const data: ConsentData = JSON.parse(raw);
    return data?.marketing === true;
  } catch { return false; }
}

// ── DataLayer push ────────────────────────────────────────────────────────────

function pushToDataLayer(event: string, params: EventParams = {}) {
  if (!hasAnalyticsConsent()) return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params, page: window.location.pathname });
}

// ── Public API ────────────────────────────────────────────────────────────────

export function track(event: string, params: EventParams = {}) {
  pushToDataLayer(event, params);
}

export function trackCTA(label: string, destination: string) {
  pushToDataLayer('cta_click', { cta_label: label, destination });
}

export function trackForm(action: 'start' | 'submit' | 'error', formId?: string) {
  const eventMap = { start: 'form_start', submit: 'form_submit', error: 'form_error' } as const;
  pushToDataLayer(eventMap[action], formId ? { form_id: formId } : {});
}

export function trackWhatsApp(page?: string) {
  pushToDataLayer('whatsapp_click', { source_page: page ?? window.location.pathname });
}

export function trackCalendly(action: 'open' | 'scheduled') {
  const eventMap = { open: 'calendly_open', scheduled: 'calendly_scheduled' } as const;
  pushToDataLayer(eventMap[action]);
}

export function trackPopup(type: string, action: 'view' | 'dismiss' | 'convert') {
  const eventMap = { view: 'popup_view', dismiss: 'popup_dismiss', convert: 'popup_convert' } as const;
  pushToDataLayer(eventMap[action], { popup_type: type });
}

export function trackChatbot(action: 'open' | 'path' | 'lead', path?: string) {
  const eventMap = { open: 'chatbot_open', path: 'chatbot_path', lead: 'chatbot_lead' } as const;
  pushToDataLayer(eventMap[action], path ? { chatbot_path: path } : {});
}

// ── Scroll depth tracking ────────────────────────────────────────────────────

export function initScrollDepth() {
  if (!hasAnalyticsConsent()) return;
  const milestones = [25, 50, 75, 90];
  const fired = new Set<number>();

  function onScroll() {
    if (!hasAnalyticsConsent()) return;
    const scrolled = window.scrollY + window.innerHeight;
    const total = document.documentElement.scrollHeight;
    const pct = Math.round((scrolled / total) * 100);
    milestones.forEach(m => {
      if (pct >= m && !fired.has(m)) {
        fired.add(m);
        pushToDataLayer('scroll_depth', { depth_percent: m });
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
}

// ── GTM loader ───────────────────────────────────────────────────────────────

export function loadGTM(gtmId: string) {
  if (!gtmId || document.getElementById('gtm-script')) return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  const s = document.createElement('script');
  s.id = 'gtm-script';
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  document.head.appendChild(s);
}

// ── Auto-init on consent ─────────────────────────────────────────────────────

export function initAnalytics(gtmId?: string) {
  if (hasAnalyticsConsent() && gtmId) {
    loadGTM(gtmId);
    initScrollDepth();
  }

  window.addEventListener('clicom:consent', (e) => {
    const detail = (e as CustomEvent<ConsentData>).detail;
    if (detail.analytics && gtmId) {
      loadGTM(gtmId);
      initScrollDepth();
    }
  });
}
