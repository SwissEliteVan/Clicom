import { describe, it, expect } from 'vitest';
import {
  cleanSingleLine,
  cleanMultiline,
  escapeHtml,
  isValidEmail,
  isValidUrl,
  isAllowedOrigin,
} from './validation';

describe('cleanSingleLine', () => {
  it('handles standard string and applies trim', () => {
    expect(cleanSingleLine('  Jean Dupont  ', 100)).toBe('Jean Dupont');
  });

  it('compresses multiple consecutive spaces', () => {
    expect(cleanSingleLine('Jean   Paul   Dupont', 100)).toBe('Jean Paul Dupont');
  });

  it('removes CR (\\r), LF (\\n) and Tab (\\t) characters', () => {
    expect(cleanSingleLine("Jean\r\nBcc: evil@example.com\tTest", 100)).toBe(
      'Jean Bcc: evil@example.com Test'
    );
  });

  it('removes other ASCII control characters', () => {
    expect(cleanSingleLine('Test\u0000\u0007\u001FValue', 100)).toBe('Test Value');
  });

  it('returns empty string for non-string values', () => {
    expect(cleanSingleLine(null, 100)).toBe('');
    expect(cleanSingleLine(undefined, 100)).toBe('');
    expect(cleanSingleLine(123, 100)).toBe('');
    expect(cleanSingleLine({ test: true }, 100)).toBe('');
    expect(cleanSingleLine(['array'], 100)).toBe('');
  });

  it('respects maximum length', () => {
    expect(cleanSingleLine('1234567890', 5)).toBe('12345');
  });
});

describe('cleanMultiline', () => {
  it('preserves legitimate newline characters (\\n and \\r\\n)', () => {
    expect(cleanMultiline('Ligne 1\nLigne 2\nLigne 3', 3000)).toBe('Ligne 1\nLigne 2\nLigne 3');
    expect(cleanMultiline("Ligne 1\r\nLigne 2", 3000)).toBe("Ligne 1\r\nLigne 2");
  });

  it('removes dangerous control characters while keeping newlines', () => {
    expect(cleanMultiline("Texte\u0000\u0007 avec\u001F saut\nde ligne", 3000)).toBe(
      'Texte avec saut\nde ligne'
    );
  });

  it('trims leading and trailing whitespace and respects max length', () => {
    expect(cleanMultiline('  Mon projet web  ', 10)).toBe('Mon projet');
  });

  it('returns empty string for non-string values', () => {
    expect(cleanMultiline(null, 3000)).toBe('');
    expect(cleanMultiline(undefined, 3000)).toBe('');
  });
});

describe('escapeHtml', () => {
  it('escapes &, <, >, \', and "', () => {
    expect(escapeHtml('<script>alert("XSS & \'attack\'")</script>')).toBe(
      '&lt;script&gt;alert(&quot;XSS &amp; &#39;attack&#39;&quot;)&lt;/script&gt;'
    );
  });
});

describe('isValidEmail', () => {
  it('accepts standard valid emails', () => {
    expect(isValidEmail('hello@clicom.ch')).toBe(true);
    expect(isValidEmail('prenom.nom@entreprise.com')).toBe(true);
    expect(isValidEmail('contact+tag@domain.co.uk')).toBe(true);
  });

  it('rejects invalid email formats', () => {
    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail('plainaddress')).toBe(false);
    expect(isValidEmail('@missingusername.com')).toBe(false);
    expect(isValidEmail('missingdomain@.com')).toBe(false);
    expect(isValidEmail('missingdot@domain')).toBe(false);
    expect(isValidEmail('with spaces@domain.com')).toBe(false);
  });

  it('rejects flattened CRLF injections containing spaces', () => {
    const flattened = cleanSingleLine('victim@example.com\r\nBcc: evil@example.com', 254);
    expect(isValidEmail(flattened)).toBe(false);
  });
});

describe('isValidUrl', () => {
  it('accepts valid http and https URLs', () => {
    expect(isValidUrl('https://clicom.ch')).toBe(true);
    expect(isValidUrl('http://example.com/page?ref=1')).toBe(true);
    expect(isValidUrl('https://sub.domain.org:8080/path')).toBe(true);
  });

  it('rejects non-http/https protocols', () => {
    expect(isValidUrl('ftp://files.example.com')).toBe(false);
    expect(isValidUrl('javascript:alert(1)')).toBe(false);
    expect(isValidUrl('data:text/html,test')).toBe(false);
    expect(isValidUrl('file:///etc/passwd')).toBe(false);
  });

  it('rejects malformed URLs', () => {
    expect(isValidUrl('not-a-url')).toBe(false);
    expect(isValidUrl('')).toBe(false);
    expect(isValidUrl('://missing-protocol')).toBe(false);
  });
});

describe('isAllowedOrigin', () => {
  const siteUrl = new URL('https://clicom.ch');

  it('allows request when Origin header is absent (same-origin / direct)', () => {
    expect(isAllowedOrigin(null, siteUrl)).toBe(true);
  });

  it('allows request matching official production origin', () => {
    expect(isAllowedOrigin('https://clicom.ch', siteUrl, false)).toBe(true);
  });

  it('allows request matching configured siteUrl', () => {
    const customSiteUrl = new URL('https://staging.clicom.ch');
    expect(isAllowedOrigin('https://staging.clicom.ch', customSiteUrl, false)).toBe(true);
  });

  it('rejects third-party origins in production', () => {
    expect(isAllowedOrigin('https://malicious-site.com', siteUrl, false)).toBe(false);
    expect(isAllowedOrigin('https://clicom.ch.attacker.org', siteUrl, false)).toBe(false);
  });

  it('handles local origins according to allowLocalOrigins flag', () => {
    expect(isAllowedOrigin('http://localhost:4321', siteUrl, true)).toBe(true);
    expect(isAllowedOrigin('http://127.0.0.1:3000', siteUrl, true)).toBe(true);
    expect(isAllowedOrigin('http://localhost:4321', siteUrl, false)).toBe(false);
  });

  it('rejects malformed Origin values', () => {
    expect(isAllowedOrigin('invalid-origin', siteUrl, true)).toBe(false);
  });
});
