import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';
import {
  cleanSingleLine,
  cleanMultiline,
  escapeHtml,
  isValidEmail,
  isValidUrl,
  isAllowedOrigin,
} from '../../lib/contact/validation';

export const prerender = false;

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const requests = new Map<string, number[]>();
let lastSweep = 0;

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

const sweepExpiredRequests = (now: number) => {
  if (now - lastSweep < WINDOW_MS) return;
  lastSweep = now;
  for (const [ip, times] of requests.entries()) {
    const recent = times.filter((time) => now - time < WINDOW_MS);
    if (recent.length) requests.set(ip, recent);
    else requests.delete(ip);
  }
};

const isRateLimited = (ip: string) => {
  const now = Date.now();
  sweepExpiredRequests(now);
  const recent = (requests.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    requests.set(ip, recent);
    return true;
  }
  recent.push(now);
  requests.set(ip, recent);
  return false;
};

const getMailConfig = () => {
  const host = import.meta.env.SMTP_HOST;
  const port = Number(import.meta.env.SMTP_PORT ?? 465);
  const secure = String(import.meta.env.SMTP_SECURE ?? 'true').toLowerCase() === 'true';
  const user = import.meta.env.SMTP_USER;
  const pass = import.meta.env.SMTP_PASSWORD;
  const from = import.meta.env.EMAIL_FROM || 'CLICOM <hello@clicom.ch>';
  const to = import.meta.env.EMAIL_TO || 'hello@clicom.ch';

  if (!host || !Number.isFinite(port) || !user || !pass) return null;
  return { host, port, secure, user, pass, from, to };
};

export const POST: APIRoute = async ({ request, clientAddress, site: siteUrl }) => {
  const origin = request.headers.get('origin');
  if (!isAllowedOrigin(origin, siteUrl, import.meta.env.DEV)) {
    return json({ success: false, message: 'Requête non autorisée.' }, 403);
  }

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

  const nom = cleanSingleLine(payload.nom, limits.nom);
  const entreprise = cleanSingleLine(payload.entreprise, limits.entreprise);
  const site = cleanSingleLine(payload.site, limits.site);
  const email = cleanSingleLine(payload.email, limits.email).toLowerCase();
  const telephone = cleanSingleLine(payload.telephone, limits.telephone);
  const objectif = cleanMultiline(payload.objectif, limits.objectif);
  const website = cleanSingleLine(payload.website, limits.website);

  if (website) return json({ success: false, message: 'Requête invalide.' }, 400);
  if (nom.length < 2 || objectif.length < 10 || !isValidEmail(email)) {
    return json({ success: false, message: 'Veuillez vérifier les champs obligatoires.' }, 400);
  }
  if (site && !isValidUrl(site)) {
    return json({ success: false, message: 'Veuillez saisir une adresse de site valide.' }, 400);
  }

  const mail = getMailConfig();
  if (!mail) {
    console.error('SMTP is not configured.');
    return json({ success: false, message: 'Service temporairement indisponible.' }, 503);
  }

  const fields = [
    ['Nom', nom],
    ['Entreprise', entreprise || 'Non renseignée'],
    ['Site', site || 'Non renseigné'],
    ['Email', email],
    ['Téléphone', telephone || 'Non renseigné'],
    ['Objectif', objectif],
  ];
  const html = `<h1>Nouvelle demande CLICOM</h1>${fields.map(([label, value]) => `<p><strong>${label}</strong><br>${escapeHtml(value)}</p>`).join('')}`;
  const text = fields.map(([label, value]) => `${label}\n${value}`).join('\n\n');

  try {
    const transporter = nodemailer.createTransport({
      host: mail.host,
      port: mail.port,
      secure: mail.secure,
      auth: { user: mail.user, pass: mail.pass },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });

    await transporter.sendMail({
      from: mail.from,
      to: mail.to,
      replyTo: email,
      subject: `Nouvelle demande CLICOM — ${nom}`,
      html,
      text,
    });

    return json({ success: true, message: 'Merci. Votre demande a bien été envoyée.' }, 200);
  } catch (error) {
    console.error('Contact email failed:', error instanceof Error ? error.message : 'Unknown SMTP error');
    return json({ success: false, message: 'Une erreur est survenue lors de l’envoi.' }, 502);
  }
};

export const ALL: APIRoute = () => json({ success: false, message: 'Méthode non autorisée.' }, 405);
