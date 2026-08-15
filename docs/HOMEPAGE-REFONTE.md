# CLICOM — Refonte homepage

Ce document cadre uniquement la page d'accueil. Il complète le manifest technique global sans élargir le chantier aux autres pages.

## 1. Objectif de la homepage

La homepage doit faire comprendre en quelques secondes :

1. ce que CLICOM fait ;
2. pour qui ;
3. comment les expertises travaillent ensemble ;
4. pourquoi l'approche est différente d'une addition de prestataires ;
5. quelle est la prochaine action à effectuer.

Le parcours cible est :

**Promesse → système → expertises → méthode → preuves → réponses → conversion.**

La page ne doit plus chercher à montrer toutes les capacités de l'agence au même niveau de priorité.

## 2. Positionnement éditorial

Message central : CLICOM ne vend pas une accumulation de canaux. L'agence construit un système qui relie visibilité, acquisition, conversion et suivi.

Ton :

- direct ;
- précis ;
- premium sans jargon creux ;
- orienté résultats sans promesses invérifiables ;
- suisse, sobre et crédible.

La homepage évite :

- les superlatifs non démontrés ;
- les chiffres inventés ;
- les témoignages fictifs ;
- les slogans génériques de type « agence 360° » ;
- les listes exhaustives avant d'avoir posé la proposition de valeur.

## 3. Direction artistique

### Concept

**Swiss growth system** : une esthétique éditoriale suisse, structurée par une grille, enrichie de codes visuels issus des systèmes, signaux et flux numériques.

Le site doit sembler technologique par sa précision, pas par une accumulation d'effets futuristes.

### Palette

La palette existante est conservée :

- bleu nuit : profondeur, sérieux, technologie ;
- bleu électrique : action et acquisition ;
- cyan : signal et accent ;
- blanc cassé / gris très clair : respiration ;
- blanc : surfaces prioritaires.

Les gradients restent ponctuels et fonctionnels.

### Typographie

Manrope est conservée.

Principes :

- grands titres compacts ;
- contraste net entre titres et texte courant ;
- petits labels techniques en capitales avec tracking modéré ;
- pas de multiplication de styles typographiques.

### Formes

- grands panneaux arrondis ;
- bordures fines ;
- grilles et lignes de connexion ;
- badges discrets ;
- cartes composées comme des interfaces plutôt que comme des tuiles génériques.

### Mouvement

Le mouvement est réduit à :

- pulsation de signal ;
- transitions CSS légères ;
- déplacement très limité au hover sur pointeur fin.

Aucun canvas WebGL n'est requis pour le hero.

`prefers-reduced-motion: reduce` désactive toute animation non essentielle.

## 4. Structure cible

### A. Hero

Objectifs :

- proposition de valeur immédiatement lisible ;
- CTA principal « Demander un audit » ;
- CTA secondaire vers les expertises ;
- schéma visuel du système CLICOM.

Le visuel ne doit pas être une image décorative. Il représente le parcours :

**Attirer → Convertir → Suivre**

avec les leviers correspondants.

### B. Positionnement

Message : le problème n'est pas l'absence d'outils mais leur manque de continuité.

Trois blocs :

- attirer la bonne demande ;
- convertir cette attention ;
- suivre les opportunités.

### C. Expertises

Les nombreuses prestations sont regroupées en quatre piliers compréhensibles :

1. Sites web & conversion ;
2. SEO & visibilité IA ;
3. Google Ads & Social Ads ;
4. Automatisation & CRM.

Les routes spécialisées restent accessibles via des liens secondaires.

### D. Méthode

Quatre étapes :

1. diagnostiquer ;
2. construire ;
3. activer ;
4. optimiser.

Chaque étape explique un résultat concret, sans liste de tâches disproportionnée.

### E. Réalisations

Deux projets visuels maximum sur la homepage.

La homepage montre une preuve de capacité, puis renvoie vers `/realisations/` pour le détail.

Aucune métrique client n'est inventée.

### F. FAQ

La FAQ répond aux objections principales :

- services ;
- combinaison SEO / Ads ;
- durée des résultats ;
- rôle de l'audit ;
- accompagnement PME ;
- démarrage du projet.

### G. CTA final

Un seul message et un seul CTA principal.

Coordonnées disponibles sans entrer en concurrence avec l'action principale.

## 5. Décisions techniques spécifiques à l'accueil

### Hero sans WebGL

Le nouveau `HomeHero.astro` ne charge plus :

- `ImmersiveMesh` ;
- OGL ;
- la timeline `hero-motion` ;
- Lenis pour le seul besoin de la homepage.

L'ancien code peut rester temporairement dans le repository tant que sa suppression n'est pas validée par une recherche d'usages complète.

### CSS dédié

Les styles de la homepage sont déplacés vers :

`src/styles/home.css`

La page `src/pages/index.astro` importe ce fichier. Les composants autonomes conservent leurs styles scoped lorsqu'ils ont une vraie responsabilité indépendante.

### JavaScript

Objectif : zéro JavaScript spécifique à la structure commerciale de la homepage.

Le JavaScript présent doit venir uniquement des composants globaux réellement nécessaires ou d'interactions explicitement conservées.

### Images

La homepage utilise directement le pipeline `astro:assets` pour les réalisations, sans imposer le script d'animation de `EditorialImage.astro`.

Formats modernes et tailles responsives restent obligatoires.

### SEO

La homepage conserve :

- canonical `/` ;
- données structurées Organization / ProfessionalService / WebSite ;
- `fr-CH` ;
- une meta description spécifique ;
- des liens internes vers les services stratégiques.

Le H1 doit rester unique.

## 6. Responsive

### Desktop

- hero en deux colonnes ;
- visuel système à droite ;
- expertises en grille 2 × 2 ;
- méthode en quatre colonnes ;
- réalisations en deux colonnes.

### Tablette

- hero encore en deux colonnes si l'espace le permet ;
- expertises 2 × 2 ;
- méthode 2 × 2.

### Mobile

- hero empilé ;
- CTA principal pleine largeur ;
- schéma système simplifié mais conservé ;
- toutes les grilles deviennent une colonne ;
- aucun texte essentiel masqué ;
- pas de horizontal scroll.

## 7. Accessibilité

La homepage doit respecter :

- un seul H1 ;
- landmarks et sections identifiées ;
- focus visible ;
- liens explicites ;
- contrastes suffisants ;
- animations désactivables ;
- images de réalisation avec alternatives utiles ;
- FAQ basée sur `details` / `summary` natifs ;
- aucun texte essentiel uniquement dans un élément `aria-hidden`.

## 8. Budget technique

Pour la homepage refondue :

- aucun framework client ;
- aucun WebGL dans le hero ;
- aucun smooth scroll requis ;
- images hors premier écran lazy-loaded ;
- CSS de page isolé ;
- composants réutilisés uniquement lorsqu'ils apportent une vraie valeur ;
- `npm run validate` doit rester la validation de référence dès qu'un environnement d'exécution est disponible.

## 9. Définition of Done — homepage

La première version de la homepage est considérée prête pour revue lorsque :

- la nouvelle hiérarchie commerciale est en place ;
- le hero fonctionne sans WebGL ;
- les quatre piliers d'expertise sont correctement liés ;
- `/social-ads/` n'est plus relié par erreur à `/google-ads/` ;
- desktop, tablette et mobile ont une composition dédiée ;
- le focus clavier reste visible ;
- `prefers-reduced-motion` est pris en compte ;
- les images passent par `astro:assets` ;
- aucune donnée client non vérifiée n'est affichée ;
- l'ancien CSS massif de `index.astro` est supprimé ;
- aucune autre page n'est refondue dans ce lot.
