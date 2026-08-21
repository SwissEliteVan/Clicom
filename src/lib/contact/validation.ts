export const cleanSingleLine = (value: unknown, max: number): string =>
  typeof value === 'string'
    ? value
        .replace(/[\u0000-\u001F\u007F]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, max)
    : '';

export const cleanMultiline = (value: unknown, max: number): string =>
  typeof value === 'string'
    ? value
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
        .trim()
        .slice(0, max)
    : '';

export const escapeHtml = (value: string): string =>
  value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[character] ?? character);

export const isValidEmail = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

export const isValidUrl = (value: string): boolean => {
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol);
  } catch {
    return false;
  }
};

export const isAllowedOrigin = (
  origin: string | null,
  siteUrl?: URL,
  allowLocalOrigins = false
): boolean => {
  if (!origin) return true;
  try {
    const originUrl = new URL(origin);
    if (siteUrl && originUrl.origin === siteUrl.origin) return true;
    if (originUrl.origin === 'https://clicom.ch') return true;
    if (allowLocalOrigins) {
      if (['localhost', '127.0.0.1', '[::1]'].includes(originUrl.hostname)) return true;
    }
  } catch {
    return false;
  }
  return false;
};
