import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const prerender = false;

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const requests = new Map<string, number[]>();
const MAX_TRACKED_IPS = 2_000;

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

const getClientIdentifier = (request: Request, clientAddress?: string) => {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const realIp = request.headers.get('x-real-ip')?.trim();
  const cfIp = request.headers.get('cf-connecting-ip')?.trim();
  return clientAddress || forwardedFor || realIp || cfIp || 'unknown';
};

const trimRateLimitStore = (now: number) => {
  for (const [key, timestamps] of requests) {
    const recent = timestamps.filter((time) => now - time < WINDOW_MS);
    if (recent.length) requests.set(key, recent);
    else requests.delete(key);
  }

  if (requests.size <= MAX_TRACKED_IPS) return;

  const overflow = requests.size - MAX_TRACKED_IPS;
  const keys = Array.from(requests.keys()).slice(0, overflow);
  keys.forEach((key) => requests.delete(key));
};

const isRateLimited = (ip: string) => {
  const now = Date.now();
  if (requests.size > MAX_TRACKED_IPS) trimRateLimitStore(now);

  const recent = (requests.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  requests.set(ip, recent);

  return recent.length > MAX_REQUESTS;
};

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > 16_384) return json({ success: false, message: 'Requête trop volumineuse.' }, 413);

  if (isRateLimited(getClientIdentifier(request, clientAddress))) {
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

  // Read SMTP configuration exclusively from environment variables
  const smtpHost = import.meta.env.SMTP_HOST;
  const smtpPort = import.meta.env.SMTP_PORT;
  const smtpSecure = import.meta.env.SMTP_SECURE;
  const smtpUser = import.meta.env.SMTP_USER;
  const smtpPass = import.meta.env.SMTP_PASSWORD;
  const emailFrom = import.meta.env.EMAIL_FROM;
  const emailTo = import.meta.env.EMAIL_TO;

  if (!smtpHost || !smtpPort || !smtpSecure || !smtpUser || !smtpPass || !emailFrom || !emailTo) {
    console.error('Contact API: missing required SMTP environment variables.');
    return json({ success: false, message: 'Service temporairement indisponible.' }, 503);
  }

  const fields: [string, string][] = [
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
      host: smtpHost,
      port: Number(smtpPort),
      secure: smtpSecure === 'true',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });

    await Promise.race([transporter.sendMail({
      from: emailFrom,
      to: emailTo,
      replyTo: email,
      subject: `Nouvelle demande CLICOM — ${nom}`,
      html,
      text,
    }), new Promise<never>((_, reject) => setTimeout(() => reject(new Error('SMTP timeout')), 20_000))]);

    return json({ success: true, message: 'Merci. Votre demande a bien été envoyée.' }, 200);
  } catch (error) {
    console.error('Contact email failed.');
    return json({ success: false, message: 'Une erreur est survenue lors de l\'envoi.' }, 502);
  }
};

export const ALL: APIRoute = () => json({ success: false, message: 'Méthode non autorisée.' }, 405);
