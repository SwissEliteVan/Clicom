// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://clicom.ch',
  integrations: [sitemap({ filter: (page) => page !== 'https://clicom.ch/404/' })],
  output: 'static',
  adapter: node({
    mode: 'standalone',
    bodySizeLimit: 16384,
  }),
});
