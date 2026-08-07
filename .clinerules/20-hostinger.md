# Déploiement Hostinger — règles CLICOM

## Chaîne autorisée
Utiliser Hostinger **Node.js Web App / Deploy Web App**, avec le dépôt `SwissEliteVan/clicom` et la branche `main`.

Ne pas utiliser l'ancien flux `Advanced → Git` comme chaîne de déploiement du SSR Node.

## Runtime
- Node : 22.x ou version supérieure compatible.
- Build : `npm run build`.
- Start : `npm run start`.
- Le script start du projet lance `node ./dist/server/entry.mjs`.
- `HOST=0.0.0.0`
- `PORT=3000`

## Chemins Hostinger
- Si Hostinger détecte Astro : utiliser le preset Astro et les scripts du projet.
- Les champs `Output directory` et `Entry file` sont surtout pertinents lorsque l'application est détectée comme `Other`.
- Si ces champs sont imposés par l'interface, ne jamais inventer la façon dont Hostinger combine leurs chemins. Vérifier les logs/runtime ou la documentation Hostinger actuelle avant toute modification.

## Routage
- Pour une app backend Node Hostinger, le build runtime peut être stocké hors de `public_html` dans le répertoire `nodejs`.
- Hostinger peut générer `public_html/.htaccess` pour le routage vers l'app Node.
- Ne jamais supprimer/renommer `.htaccess` à l'aveugle.
- Ne jamais supprimer `index.php` à l'aveugle.
- Un redeploy Node peut régénérer le routage Hostinger.

## Débogage
Si build + start local + HTTP 200 sont déjà validés, un 503 public doit être traité d'abord comme :
1. mauvais type de website Hostinger ;
2. process Node non démarré ;
3. mauvais démarrage/runtime ;
4. routage Hostinger/CDN ;
5. erreur des Runtime logs.

Ne pas modifier Astro sans preuve runtime.
