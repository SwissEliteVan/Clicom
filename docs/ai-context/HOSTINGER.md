# CLICOM — Hostinger

## Architecture de production
CLICOM est une application Astro SSR Node. Elle doit être déployée comme une **Node.js Web App**, pas comme un simple dépôt Git vers un document root PHP/statique.

## Configuration de base
- Framework : Astro
- Node : 22.x ou supérieur compatible
- Root : `./`
- Package manager : npm
- Build : `npm run build`
- Start : `npm run start`
- Start réel du projet : `node ./dist/server/entry.mjs`

## Variables runtime
- `HOST=0.0.0.0`
- `PORT=3000`

## Déploiement GitHub
- Repository : `SwissEliteVan/clicom`
- Branch : `main`
- Utiliser le flux Hostinger `Deploy Web App / Node.js Web App`.
- Pour un redeploy, utiliser le dashboard Node.js / Deployments / Settings and redeploy.
- Ne pas confondre avec l'ancien `Advanced → Git`.

## Output / Entry
La documentation Hostinger indique que lorsque le framework est détecté comme `Other`, l'interface peut demander `Output directory` et `Entry file`.

Ne pas fixer une règle universelle sur le préfixage de ces deux champs : si l'interface les impose, vérifier le chemin réellement tenté dans les Runtime logs ou la documentation Hostinger actuelle.

## Routage Hostinger
Pour les applications backend Node, Hostinger documente un runtime dans `/home/{username}/domains/{domain}/nodejs` et un `.htaccess` dans `public_html` pour le routage.

Donc :
- ne pas supprimer `.htaccess` à l'aveugle ;
- ne pas nettoyer `public_html` à l'aveugle ;
- utiliser le redeploy Node pour régénérer la configuration gérée par Hostinger si nécessaire.

## Sources officielles
- https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/
- https://www.hostinger.com/support/how-to-redeploy-a-node-js-application/
- https://docs.astro.build/fr/guides/deploy/hostinger/
