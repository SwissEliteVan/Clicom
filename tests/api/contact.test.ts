import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { APIContext } from 'astro';

// Setup environment variables before importing contact handler
process.env.SMTP_HOST = 'smtp.hostinger.com';
process.env.SMTP_PORT = '465';
process.env.SMTP_SECURE = 'true';
process.env.SMTP_USER = 'hello@clicom.ch';
process.env.SMTP_PASSWORD = 'mock-password';
process.env.EMAIL_FROM = 'CLICOM <hello@clicom.ch>';
process.env.EMAIL_TO = 'hello@clicom.ch';

const { mockSendMail, mockCreateTransport } = vi.hoisted(() => {
  const mockSendMail = vi.fn();
  const mockCreateTransport = vi.fn(() => ({
    sendMail: mockSendMail,
  }));
  return { mockSendMail, mockCreateTransport };
});

vi.mock('nodemailer', () => ({
  default: {
    createTransport: mockCreateTransport,
  },
}));

// Import the API route handlers
import { POST, ALL } from '../../src/pages/api/contact';

const createMockContext = (options: {
  body?: unknown;
  rawBody?: string;
  contentType?: string;
  origin?: string;
  clientAddress?: string;
  contentLength?: number;
}): APIContext => {
  const headers = new Headers();
  if (options.contentType !== undefined) {
    headers.set('content-type', options.contentType);
  } else {
    headers.set('content-type', 'application/json');
  }

  if (options.origin) {
    headers.set('origin', options.origin);
  }

  let bodyStr = '';
  if (options.rawBody !== undefined) {
    bodyStr = options.rawBody;
  } else if (options.body !== undefined) {
    bodyStr = JSON.stringify(options.body);
  }

  if (options.contentLength !== undefined) {
    headers.set('content-length', String(options.contentLength));
  } else {
    headers.set('content-length', String(Buffer.byteLength(bodyStr, 'utf-8')));
  }

  const request = new Request('https://clicom.ch/api/contact', {
    method: 'POST',
    headers,
    body: bodyStr,
  });

  return {
    request,
    clientAddress: options.clientAddress || '192.168.1.10',
    site: new URL('https://clicom.ch'),
  } as unknown as APIContext;
};

const validPayload = {
  nom: 'Jean Dupont',
  entreprise: 'Entreprise SA',
  site: 'https://entreprise.ch',
  email: 'jean.dupont@entreprise.ch',
  telephone: '+41 78 123 45 67',
  objectif: 'Je souhaite moderniser le site web de notre PME et améliorer notre visibilité locale.',
  website: '',
};

describe('POST /api/contact API Handler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSendMail.mockResolvedValue({ messageId: 'test-msg-id' });
    process.env.SMTP_HOST = 'smtp.hostinger.com';
    process.env.SMTP_PASSWORD = 'mock-password';
  });

  it('handles valid nominal payload and sends email successfully (200)', async () => {
    const context = createMockContext({ body: validPayload, clientAddress: '10.0.0.1' });
    const response = await POST(context);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.message).toBe('Merci. Votre demande a bien été envoyée.');
    expect(mockCreateTransport).toHaveBeenCalled();
    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'CLICOM <hello@clicom.ch>',
        to: 'hello@clicom.ch',
        replyTo: 'jean.dupont@entreprise.ch',
        subject: 'Nouvelle demande CLICOM — Jean Dupont',
      })
    );
  });

  it('rejects invalid content-type (400)', async () => {
    const context = createMockContext({
      body: validPayload,
      contentType: 'text/plain',
      clientAddress: '10.0.0.2',
    });
    const response = await POST(context);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.message).toBe('Requête invalide.');
  });

  it('rejects body larger than 16 KiB (413)', async () => {
    const largeText = 'A'.repeat(17_000);
    const context = createMockContext({
      rawBody: JSON.stringify({ ...validPayload, objectif: largeText }),
      clientAddress: '10.0.0.3',
    });
    const response = await POST(context);
    const data = await response.json();

    expect(response.status).toBe(413);
    expect(data.success).toBe(false);
    expect(data.message).toBe('Requête trop volumineuse.');
  });

  it('rejects malformed JSON (400)', async () => {
    const context = createMockContext({
      rawBody: '{"nom": "Jean", incomplete',
      clientAddress: '10.0.0.4',
    });
    const response = await POST(context);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.message).toBe('Requête invalide.');
  });

  it('rejects bot when honeypot field is filled (400)', async () => {
    const context = createMockContext({
      body: { ...validPayload, website: 'https://spam-bot.com' },
      clientAddress: '10.0.0.5',
    });
    const response = await POST(context);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.message).toBe('Requête invalide.');
    expect(mockSendMail).not.toHaveBeenCalled();
  });

  it('rejects missing or too short mandatory fields (400)', async () => {
    const context = createMockContext({
      body: { ...validPayload, nom: 'J' },
      clientAddress: '10.0.0.6',
    });
    const response = await POST(context);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.message).toBe('Veuillez vérifier les champs obligatoires.');
  });

  it('rejects invalid email format (400)', async () => {
    const context = createMockContext({
      body: { ...validPayload, email: 'invalid-email' },
      clientAddress: '10.0.0.7',
    });
    const response = await POST(context);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });

  it('rejects non-web URL format (400)', async () => {
    const context = createMockContext({
      body: { ...validPayload, site: 'ftp://files.example.com' },
      clientAddress: '10.0.0.8',
    });
    const response = await POST(context);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.message).toBe('Veuillez saisir une adresse de site valide.');
  });

  it('rejects unauthorized third-party Origin (403)', async () => {
    const context = createMockContext({
      body: validPayload,
      origin: 'https://malicious-site.com',
      clientAddress: '10.0.0.9',
    });
    const response = await POST(context);
    const data = await response.json();

    expect(response.status).toBe(403);
    expect(data.success).toBe(false);
    expect(data.message).toBe('Requête non autorisée.');
    expect(mockSendMail).not.toHaveBeenCalled();
  });

  it('sanitizes CRLF characters from nom in email subject', async () => {
    const context = createMockContext({
      body: { ...validPayload, nom: 'Jean Dupont\r\nBcc: evil@example.com' },
      clientAddress: '10.0.0.10',
    });
    const response = await POST(context);
    expect(response.status).toBe(200);
    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        subject: 'Nouvelle demande CLICOM — Jean Dupont Bcc: evil@example.com',
      })
    );
  });

  it('returns 502 when Nodemailer fails to send email', async () => {
    mockSendMail.mockRejectedValueOnce(new Error('SMTP connection timeout'));
    const context = createMockContext({ body: validPayload, clientAddress: '10.0.0.11' });
    const response = await POST(context);
    const data = await response.json();

    expect(response.status).toBe(502);
    expect(data.success).toBe(false);
    expect(data.message).toBe('Une erreur est survenue lors de l’envoi.');
  });

  it('triggers rate limiting after max allowed requests from same IP (429)', async () => {
    const ip = '198.51.100.42';
    // Perform 5 allowed requests
    for (let i = 0; i < 5; i++) {
      const ctx = createMockContext({ body: validPayload, clientAddress: ip });
      const res = await POST(ctx);
      expect(res.status).toBe(200);
    }

    // 6th request must be rate limited
    const limitedCtx = createMockContext({ body: validPayload, clientAddress: ip });
    const limitedRes = await POST(limitedCtx);
    const data = await limitedRes.json();

    expect(limitedRes.status).toBe(429);
    expect(data.success).toBe(false);
    expect(data.message).toBe('Trop de demandes. Veuillez réessayer plus tard.');
  });
});

describe('ALL /api/contact handler', () => {
  it('returns 405 Method Not Allowed for non-POST requests', async () => {
    const context = createMockContext({ body: {} });
    const response = await ALL(context);
    expect(response.status).toBe(405);
  });
});
