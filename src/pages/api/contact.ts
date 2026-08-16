import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const EMAIL_TO = 'hello@clicom.ch';
const EMAIL_FROM = 'CLICOM <formulaire@clicom.ch>';
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const requests = new Map<string, number[]>();

const limits = {
  nom: 100,
  entreprise: 120,
  site: 300,
  email: 254,
  telephone: 40,
  objectif: 3000,
  website: 200,
} as const;

const json = (body: Record<string, unknown>, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });

const clean = (value: unknown, max: number) =>
  typeof value === 'string' ? value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, max) : '';

const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
})[character] ?? character);

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

const isRateLimited = (ip: string) => {
  const now = Date.now();
  const recent = (requests.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  requests.set(ip, recent);
  return recent.length > MAX_REQUESTS;
};

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > 16_384) return json({ success: false, message: 'Requête trop volumineuse.' }, 413);

  if (isRateLimited(clientAddress || 'unknown')) {
    return json({ success: false, message: 'Trop de demandes. Veuillez réessayer plus tard.' }, 429);
  }

  let payload: Record<string, unknown>;
  try {
    if (!request.headers.get('content-type')?.includes('application/json')) throw new Error('Invalid content type');
    const raw = await request.text();
    if (raw.length > 16_384) return json({ success: false, message: 'Requête trop volumineuse.' }, 413);
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('Invalid payload');
    payload = parsed as Record<string, unknown>;
  } catch {
    return json({ success: false, message: 'Requête invalide.' }, 400);
  }

  const nom = clean(payload.nom, limits.nom);
  const entreprise = clean(payload.entreprise, limits.entreprise);
  const site = clean(payload.site, limits.site);
  const email = clean(payload.email, limits.email).toLowerCase();
  const telephone = clean(payload.telephone, limits.telephone);
  const objectif = clean(payload.objectif, limits.objectif);
  const website = clean(payload.website, limits.website);

  if (website) return json({ success: false, message: 'Requête invalide.' }, 400);
  if (nom.length < 2 || objectif.length < 10 || !isValidEmail(email)) {
    return json({ success: false, message: 'Veuillez vérifier les champs obligatoires.' }, 400);
  }
  if (site) {
    try {
      const url = new URL(site);
      if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Invalid protocol');
    } catch {
      return json({ success: false, message: 'Veuillez saisir une adresse de site valide.' }, 400);
    }
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured.');
    return json({ success: false, message: 'Service temporairement indisponible.' }, 503);
  }

  const fields = [
    ['Nom', nom], ['Entreprise', entreprise || 'Non renseignée'], ['Site', site || 'Non renseigné'],
    ['Email', email], ['Téléphone', telephone || 'Non renseigné'], ['Objectif', objectif],
  ];
  const html = `<h1>Nouvelle demande CLICOM</h1>${fields.map(([label, value]) => `<p><strong>${label}</strong><br>${escapeHtml(value)}</p>`).join('')}`;
  const text = fields.map(([label, value]) => `${label}\n${value}`).join('\n\n');

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      replyTo: email,
      subject: `Nouvelle demande CLICOM — ${nom}`,
      html,
      text,
    });
    if (error) throw error;
    return json({ success: true, message: 'Merci. Votre demande a bien été envoyée.' }, 200);
  } catch (error) {
    console.error('Contact email failed:', error instanceof Error ? error.message : 'Unknown provider error');
    return json({ success: false, message: 'Une erreur est survenue lors de l’envoi.' }, 502);
  }
};

export const ALL: APIRoute = () => json({ success: false, message: 'Méthode non autorisée.' }, 405);
