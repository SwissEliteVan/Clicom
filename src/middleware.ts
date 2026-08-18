import { defineMiddleware } from 'astro:middleware';

const securityHeaders: Record<string, string> = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'self'",
    "form-action 'self'",
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://assets.calendly.com",
    "style-src 'self' 'unsafe-inline' https://assets.calendly.com",
    "font-src 'self' data:",
    "img-src 'self' data: https:",
    "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com https://calendly.com",
    "frame-src https://calendly.com",
    "upgrade-insecure-requests",
  ].join('; '),
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'X-Frame-Options': 'SAMEORIGIN',
};

export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next();

  for (const [header, value] of Object.entries(securityHeaders)) {
    if (!response.headers.has(header)) response.headers.set(header, value);
  }

  return response;
});
