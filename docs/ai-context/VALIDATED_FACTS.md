# Faits validés — CLICOM

Ces faits ont déjà été testés. Ne pas refaire tout le diagnostic à chaque nouvelle conversation.

- Le projet utilisé est `C:\Users\Administrateur\clicom`.
- Le remote attendu est `SwissEliteVan/clicom`.
- `package.json` exige Node `>=22.12.0`.
- `package.json` utilise `build: astro build`.
- `package.json` utilise `start: node ./dist/server/entry.mjs`.
- `astro.config.mjs` utilise `output: 'server'`.
- L'adapter Node est en `mode: 'standalone'`.
- `npm run build` réussit.
- `dist/server/entry.mjs` est généré.
- Le serveur Node a déjà démarré localement sans exception.
- Avec port 3000, la homepage a déjà répondu HTTP 200.
- Le serveur a déjà été accessible via l'adresse réseau locale.
- `Test-NetConnection` sur le port 3000 a déjà réussi.
- Un 503 Hostinger uniforme ne prouve donc pas un défaut du code Astro.
- `clicom-hostinger` est un ancien dépôt à ignorer totalement.
- Un ancien wrapper Hostinger a été supprimé ; ne pas le recréer sans preuve.
