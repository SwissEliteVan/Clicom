AGENTS.md

<!-- BEGIN CLICOM CONTROL -->
# CLICOM — contexte impératif Claude

## Périmètre unique
- Projet local unique : `C:\Users\Administrateur\clicom`
- Dépôt GitHub unique : `SwissEliteVan/clicom`
- Branche de travail par défaut : `main`
- Domaine : `https://clicom.ch`
- Toute commande locale doit cibler explicitement `C:\Users\Administrateur\clicom`.
- Ne jamais utiliser le workspace courant, un dossier parent ou un autre clone comme source de vérité.

## Dépôts interdits
- Ne jamais lire, modifier, comparer, synchroniser, nettoyer ou déployer `clicom-hostinger`.
- Ne jamais chercher un autre clone de CLICOM.
- Ne jamais utiliser `C:\Users\Administrateur` comme racine de recherche globale.

## Architecture verrouillée
- Astro SSR.
- `output: 'server'`.
- `@astrojs/node` en mode `standalone`.
- Node.js `>=22.12.0`.
- Build : `npm run build`.
- Start : `npm run start`.
- Entrée Astro générée : `dist/server/entry.mjs`.
- Ne jamais convertir en site statique pour résoudre un problème Hostinger.
- Ne jamais recréer de wrapper Hostinger autour de `entry.mjs` sans preuve technique explicite et autorisation de l'utilisateur.

## Déploiement Hostinger
- Utiliser une **Node.js Web App / Deploy Web App** Hostinger.
- Déploiement depuis le dépôt `SwissEliteVan/clicom`, branche `main`.
- Ne pas utiliser l'ancien flux `Advanced → Git` comme méthode de déploiement de l'application SSR.
- Node 22.x ou supérieur compatible avec l'exigence du projet.
- `HOST=0.0.0.0`
- `PORT=3000`
- Les variables SMTP restent dans Hostinger, jamais dans Git.
- Ne jamais afficher ni demander à l'utilisateur de coller `SMTP_PASSWORD`.
- Si Hostinger détecte `Astro`, privilégier ses réglages Astro et le script `npm run start`.
- Si l'interface force `Output directory` / `Entry file`, ne jamais deviner la sémantique des chemins : lire les logs/runtime ou la documentation Hostinger actuelle avant de changer la valeur.

## Faits déjà validés — ne pas refaire en boucle
- `npm run build` fonctionne.
- `dist/server/entry.mjs` est généré.
- Le serveur Astro démarre localement.
- Avec `HOST=0.0.0.0` et `PORT=3000`, le serveur est accessible sur le réseau local.
- La homepage a déjà répondu HTTP 200 en runtime local.
- Le port 3000 a déjà été testé avec succès.
- Un 503 public Hostinger ne justifie donc pas à lui seul de modifier Astro.
- Pour un 503 après ces validations, priorité aux **Runtime logs Hostinger**, au type de website Hostinger, au process Node et au routage de la plateforme.

## Git
- Ne jamais faire `git reset --hard`.
- Ne jamais commit/push automatiquement.
- Un commit et un push nécessitent une demande explicite de l'utilisateur pour cette étape.
- Ne jamais toucher à des fichiers non liés à la tâche.
- Avant une modification destructive, préférer une sauvegarde ou une opération ciblée et réversible.

## Modifications de code
- Ne pas modifier design, contenu, SEO, SMTP, images ou composants non concernés par la tâche.
- Ne pas inventer une correction pour produire un diff.
- Si le problème n'est pas reproductible dans le code, conclure qu'aucune modification locale n'est justifiée.
- Préserver les optimisations et le responsive existants.

## Méthode de diagnostic
1. Utiliser les faits déjà validés avant de relancer des tests.
2. Reproduire une erreur avant de corriger.
3. Identifier le message d'erreur exact et le chemin exact concerné.
4. Changer uniquement la cause démontrée.
5. Valider après changement avec les commandes adaptées.
6. Ne pas créer plusieurs variantes contradictoires de configuration.

## Communication
- Réponses courtes et opérationnelles.
- Pas de rapport intermédiaire sauf si demandé.
- Ne pas demander à l'utilisateur de vérifier manuellement un élément que l'agent peut vérifier lui-même.
- Ne pas répéter des diagnostics déjà validés.
- Pour une action hPanel impossible depuis l'environnement local, donner uniquement les clics/valeurs nécessaires et préciser clairement ce qui ne peut pas être exécuté directement.
<!-- END CLICOM CONTROL -->

