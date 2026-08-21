# CLICOM - PHASE 01A

## Files created

- `src/scripts/motion/core.ts`
- `src/scripts/motion/lifecycle.ts`
- `src/scripts/motion/tokens.ts`
- `CLICOM_PHASE_01A_REPORT.md`

## Files modified

- `src/scripts/hero-motion.ts`
- `src/scripts/home-system-motion.ts`
- `src/scripts/home-expertise-motion.ts`
- `src/scripts/home-work-motion.ts`
- `src/scripts/home-premium.ts`
- `src/scripts/scroll-motion.ts`
- `src/scripts/visuals/svg-motion.ts`
- `src/components/EditorialImage.astro`

`CLICOM_REFACTOR_AUDIT.md` a été relu intégralement et n'a pas été modifié pendant cette phase.

## Core

`src/scripts/motion/core.ts` est l'unique point d'import de GSAP et ScrollTrigger. Il enregistre ScrollTrigger une fois, sans accès à `window` ou `document`. Tous les consommateurs GSAP utilisent désormais ce core.

## Lifecycle

`bindAstroMotionCleanup(root, context, beforeRevert?)` centralise un cleanup idempotent, le revert du contexte, le listener `astro:before-swap` et la destruction des seuls ScrollTriggers rattachés au root.

Le helper est utilisé par System, Expertise et Work. Les listeners/observers spécifiques, les ressources WebGL et le lifecycle Hero lié à Lenis restent locaux pour préserver leur ordre de destruction et éviter une abstraction excessive.

## Tokens

Les tokens reprennent uniquement des valeurs réellement présentes : durées `0.08`, `0.2`, `0.35`, `0.65`, `1` ; easings `power2.out`, `power3.out`, `none` ; distances `8`, `18`, `42` ; scrubs `0.7`, `0.75`, `0.8`.

Les remplacements effectués dans System, Work, Home Premium et Scroll Motion gardent strictement les valeurs précédentes. Les timings narratifs particuliers restent locaux.

## Lenis

Une seule instance existe dans `src/scripts/hero-motion.ts`. Elle est synchronisée avec `gsap.ticker` et ScrollTrigger, puis détruite lors de `astro:before-swap`. Son architecture n'a pas été modifiée afin de préserver la sensation du scroll.

## Hero

Avant : imports GSAP/ScrollTrigger et enregistrement local. Après : import du core commun. Timeline, timings, interactions, profondeur, Lenis, reduced motion et cleanup sont inchangés.

## System

Avant : imports/enregistrement et cleanup locaux. Après : core commun, lifecycle commun limité au root et token de scrub identique à `0.75`. Les quatre états et toutes les variantes restent inchangés.

## Expertise

Avant : imports/enregistrement et cleanup locaux. Après : core et lifecycle communs. Build, Visibility, Acquisition, Automation, interactions pointeur et reduced motion restent inchangés.

## Reduced motion

Toutes les branches `prefers-reduced-motion` existantes sont conservées. Aucun media query, fallback CSS ou état initial de contenu n'a été modifié.

## Build

- `npm run check` : PASS — 114 fichiers, 0 erreur, 0 warning, 0 hint.
- `npm run build` : PASS — build Astro SSR complet et sitemap généré.
- `npm run lint` : NON DISPONIBLE.
- Tests : NON DISPONIBLES.

Le serveur a été lancé avec `astro dev --background`, puis arrêté avec `astro dev stop`. `/`, `/solutions/` et `/contact/` ont répondu HTTP 200 sans exception dans les logs Astro/Vite. Le port 4322 a été utilisé car 4321 était déjà occupé par un autre processus non touché.

L'équivalence visuelle est protégée par l'absence de modification DOM/CSS/contenu et par le maintien exact des valeurs utilisées. Le dépôt ne fournit pas de test visuel automatisé.

## Remaining debt

- Cleanup Hero maintenu local à cause de Lenis.
- Sélecteur probablement dormant `[data-work-media]` conservé jusqu'à une validation visuelle dédiée.
- `src/scripts/scroll-motion.ts` reste sans consommateur connu.
- Listeners propres à Expertise et Work maintenus locaux.
- Valeurs narratives uniques non tokenisées.
- CSS homepage intact, réservé à la PHASE 01B.
