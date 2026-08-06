# Clicom

Site vitrine de Clicom, agence digitale suisse orientée croissance et acquisition.

## Stack

- Astro 7 avec adaptateur Node en mode standalone : pages pré-rendues quand possible et endpoint serveur `/api/contact`
- composants Astro sans framework client
- CSS global et styles scoppés par composant
- police variable Manrope

## Commandes

```sh
npm install
npm run dev
npm run check
npm run validate
npm run build
npm run start
```

Pour lancer le serveur de développement en arrière-plan :

```sh
npm run astro -- dev --background
```

Gestion du serveur : `npm run astro -- dev status`, `npm run astro -- dev logs` et `npm run astro -- dev stop`.

`npm run validate` exécute Astro Check, TypeScript et le build de production. Configurez les variables SMTP sur l’hébergement ; ne placez aucun secret dans le dépôt.

## Routes

- `/` : accueil
- `/services` : expertises
- `/solutions` : systèmes de croissance
- `/realisations` : périmètres d’intervention
- `/agence` : positionnement et méthode
- `/ressources` : repères pratiques
- `/contact` : coordonnées et demande d’audit
