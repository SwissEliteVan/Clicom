# Erreurs de procédure à ne plus répéter

1. Ne pas mélanger `clicom` avec `clicom-hostinger`.
2. Ne pas changer `output: server` en `static` pour contourner un 503.
3. Ne pas créer plusieurs wrappers `entry.mjs`.
4. Ne pas alterner au hasard entre `server/entry.mjs` et `dist/server/entry.mjs`.
5. Ne pas inventer la sémantique `Output directory + Entry file` de Hostinger.
6. Ne pas rediagnostiquer SMTP lorsqu'un 503 frappe toutes les routes avant même un POST.
7. Ne pas demander encore et encore si `dist/server/entry.mjs` existe.
8. Ne pas demander encore et encore si le serveur local répond.
9. Ne pas prendre `Images : {}` de PowerShell comme preuve d'images cassées.
10. Ne pas supprimer `.htaccess` Hostinger sans savoir s'il assure le proxy Node.
11. Ne pas utiliser `Advanced → Git` comme workflow de déploiement de l'app SSR Node.
12. Ne pas modifier des fichiers sans cause reproductible.
13. Ne pas commit/push sans demande explicite.
