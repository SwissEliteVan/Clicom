import type { APIRoute } from 'astro';

export const prerender = false;

const startedAt = Date.now();

export const GET: APIRoute = () => {
  const uptime = Math.max(0, Math.round((Date.now() - startedAt) / 1000));

  return new Response(JSON.stringify({
    status: 'ok',
    service: 'clicom',
    runtime: 'astro-node',
    uptime,
    timestamp: new Date().toISOString(),
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex',
    },
  });
};

export const ALL: APIRoute = () => new Response(JSON.stringify({ status: 'method_not_allowed' }), {
  status: 405,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Robots-Tag': 'noindex',
  },
});
