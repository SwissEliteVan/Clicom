# Diagnostic — ne pas refaire perdre du temps

Faits déjà démontrés :
- `npm run build` réussit.
- `dist/server/entry.mjs` existe après build.
- Le serveur Astro standalone démarre localement.
- `HOST=0.0.0.0` et `PORT=3000` ont été testés.
- Le serveur a répondu HTTP 200 localement et sur l'adresse réseau.
- Le port 3000 est joignable localement.

Conséquence :
- Ne pas relancer une série de modifications Astro simplement parce que le domaine Hostinger retourne 503.
- Chercher d'abord l'erreur exacte des Runtime logs et l'état de la Node.js Web App.
- `Images : {}` dans `Invoke-WebRequest -UseBasicParsing` n'est pas une preuve que les images sont absentes.
- Des caractères mal affichés dans PowerShell ne prouvent pas un problème d'encodage du site.
- Les messages d'extensions navigateur ne doivent pas être attribués au site sans preuve.
