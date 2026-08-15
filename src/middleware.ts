import { defineMiddleware } from 'astro:middleware';

const securityHeaders: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=() ',
  'X-Frame-Options': 'SAMEORIGIN',
};

export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next();

  for (const [header, value] of Object.entries(securityHeaders)) {
    if (!response.headers.has(header)) response.headers.set(header, value.trim());
  }

  return response;
});
