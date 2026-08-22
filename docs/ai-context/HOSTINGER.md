# CLICOM — Hostinger

## Architecture de production

CLICOM est une application **Astro SSR Node**. Elle doit être déployée comme une **Node.js Web App**, pas comme un simple dépôt Git vers un document root PHP/statique.

Le projet utilise :

- `output: 'server'` ;
- `@astrojs/node` ;
- `mode: 'standalone'` ;
- serveur compilé : `dist/server/entry.mjs`.

## Configuration hPanel recommandée

- Type : Node.js Web App / Deploy Web App
- Framework : Astro, ou `Other` si Hostinger ne détecte pas Astro correctement
- Repository : `SwissEliteVan/clicom`
- Branch de test : `refonte-complete`
- Branch de production après validation : `main`
- Root / Application root : `./`
- Package manager : `npm`
- Node.js : `22.x` ou supérieur
- Build command : `npm run build`
- Start command : `npm run start`
- Start réel : `HOST=0.0.0.0 node ./dist/server/entry.mjs`

## Pourquoi `HOST=0.0.0.0`

Astro Node standalone accepte les variables runtime `HOST` et `PORT`. Sur un hébergement avec proxy, l'application doit écouter sur toutes les interfaces disponibles afin que le proxy Hostinger puisse la joindre.

Le script `start` du projet définit donc `HOST=0.0.0.0`. Le port peut être fourni par Hostinger via la variable `PORT`.

## Variables d'environnement hPanel

À configurer dans hPanel, jamais dans le repository :

```env
NODE_ENV=production
HOST=0.0.0.0
PORT=3000
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=hello@clicom.ch
SMTP_PASSWORD=<mot-de-passe-mailbox-ou-app-password>
EMAIL_FROM=CLICOM <hello@clicom.ch>
EMAIL_TO=hello@clicom.ch
PUBLIC_CALENDLY_URL=https://calendly.com/saber-moha/30min
PUBLIC_WHATSAPP_NUMBER=41788238950
PUBLIC_GTM_ID=
```

Notes :

- `PUBLIC_*` est visible côté client ; ne jamais y mettre de secret.
- `SMTP_PASSWORD` doit rester uniquement dans hPanel.
- `PUBLIC_GTM_ID` doit rester vide tant que le consentement et le conteneur GTM ne sont pas validés.

## Vérification après déploiement

1. Ouvrir le domaine principal.
2. Vérifier le health check : `/api/health`.
3. Vérifier le sitemap : `/sitemap-index.xml`.
4. Vérifier `robots.txt`.
5. Tester le formulaire de contact.
6. Vérifier les logs Hostinger si l'API contact retourne `503` ou `502`.

## Commandes locales avant push

```bash
npm ci
npm run validate
npm run dev -- --host 0.0.0.0 --port 4322
```

Test du build serveur :

```bash
npm run build
PORT=3000 npm run start
```

Puis ouvrir :

```text
http://localhost:3000/api/health
```

## Déploiement GitHub

Flux recommandé :

1. Développer sur `refonte-complete`.
2. Valider localement avec `npm run validate`.
3. Déployer `refonte-complete` sur un environnement Hostinger de test si disponible.
4. Fusionner vers `main` uniquement après validation.
5. Déployer `main` en production.

## Output / Entry

Selon l'interface Hostinger, si le framework est détecté comme `Other`, elle peut demander `Output directory` ou `Entry file`.

Valeurs à essayer dans cet ordre :

- Build command : `npm run build`
- Start command : `npm run start`
- Application root : `./`
- Entry file si exigé : `dist/server/entry.mjs`
- Output directory si exigé pour le build : `dist`

Si le déploiement échoue, lire d'abord les Runtime logs et les Build logs. Ne pas deviner un chemin avant d'avoir vu le chemin réellement tenté par Hostinger.

## Routage Hostinger

Pour les applications backend Node, Hostinger peut générer ou gérer une configuration de routage côté hPanel. Donc :

- ne pas supprimer `.htaccess` à l'aveugle ;
- ne pas nettoyer `public_html` à l'aveugle ;
- utiliser le redeploy Node pour régénérer la configuration gérée par Hostinger si nécessaire.

## Sources officielles

- https://docs.astro.build/fr/guides/deploy/hostinger/
- https://docs.astro.build/fr/guides/integrations-guide/node/
- https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/
- https://www.hostinger.com/support/node-js-hosting-options-at-hostinger/
