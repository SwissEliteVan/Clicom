import { access, writeFile } from 'node:fs/promises';

const serverEntry = new URL('../dist/server/entry.mjs', import.meta.url);
const hostingerEntry = new URL('../dist/entry.mjs', import.meta.url);

try {
  await access(serverEntry);
} catch {
  throw new Error('Astro server entry not found: dist/server/entry.mjs');
}

await writeFile(hostingerEntry, `process.env.HOST ||= '0.0.0.0';
process.env.PORT ||= '3000';

await import('./server/entry.mjs');
`, 'utf8');