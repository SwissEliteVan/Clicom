# Architecture CLICOM

- Astro SSR.
- `output: 'server'`.
- Adapter : `@astrojs/node`.
- Mode : `standalone`.
- Node : `>=22.12.0`.
- Build : `npm run build`.
- Start : `npm run start`.
- Entrée générée : `dist/server/entry.mjs`.
- Dépendances runtime importantes : `astro`, `@astrojs/node`, `nodemailer`.
- Ne jamais passer en `static` pour corriger Hostinger.
- Ne jamais ajouter un wrapper d'entrée Hostinger sans erreur reproductible qui le justifie.
