# CLICOM — Rapport Phase 01B : Consolidation CSS Homepage

**Date** : 2026-08-21  
**Statut** : Validé (`npm run check` PASS, `npm run build` PASS)

---

## 1. Objectifs & Périmètre

* Éliminer la stratification de dette CSS historique (`home.css` + `home-v2.css` + `home-v3.css` + styles dispersés).
* Établir une architecture modulaire claire sous `src/styles/home/`.
* Supprimer les sélecteurs morts et les règles dupliquées/écrasées.
* Préserver rigoureusement :
  * Le rendu visuel (identique à l'identique) ;
  * Les sélecteurs ciblés par GSAP/JS (`data-*`, classes d'états `.is-active`, `.is-past`) ;
  * Le comportement responsive (breakpoints 1200px, 1100px, 960px, 820px, 560px) ;
  * Les règles `prefers-reduced-motion: reduce`.

---

## 2. Structure CSS Avant / Après

### Avant
```text
src/styles/
├── global.css
├── hero-premium.css (13.9 Ko)
├── home-expertise-immersive.css (10.0 Ko)
├── home-motion.css (0.9 Ko - orphelin)
├── home-system-immersive.css (8.2 Ko)
├── home-v2.css (10.4 Ko - overrides v2)
├── home-v3.css (6.4 Ko - overrides v3)
├── home-work-editorial.css (9.5 Ko)
└── home.css (24.0 Ko - base historique v1)
```

### Après
```text
src/styles/
├── global.css
└── home/
    ├── index.css       (2.5 Ko — socle shell, section-head, kickers, bandeau sectoriel, imports)
    ├── hero.css        (16.5 Ko — hero interactif & scènes démo unifiées)
    ├── system.css      (11.0 Ko — narration système 4 étapes & visual SVG immersif)
    ├── expertise.css   (11.6 Ko — 4 piliers expertises & médias interactifs)
    ├── method.css      (2.4 Ko — rail 4 étapes & progression)
    ├── work.css        (9.7 Ko — scènes éditoriales réalisations & transitions)
    └── cta.css         (3.3 Ko — carte sombre CTA & halos animés)
```

---

## 3. Fichiers impactés

### Fichiers créés
* `src/styles/home/index.css`
* `src/styles/home/hero.css`
* `src/styles/home/system.css`
* `src/styles/home/expertise.css`
* `src/styles/home/method.css`
* `src/styles/home/work.css`
* `src/styles/home/cta.css`

### Fichiers supprimés
* `src/styles/home.css`
* `src/styles/home-v2.css`
* `src/styles/home-v3.css`
* `src/styles/hero-premium.css`
* `src/styles/home-system-immersive.css`
* `src/styles/home-expertise-immersive.css`
* `src/styles/home-work-editorial.css`
* `src/styles/home-motion.css`

### Fichiers modifiés
* `src/pages/index.astro` : remplacement des 3 imports `home*.css` par `import '../styles/home/index.css';`.
* `src/components/home/HomeHero.astro` : mise à jour de l'import vers `../../styles/home/hero.css`.
* `src/components/home/HomeSystem.astro` : mise à jour de l'import vers `../../styles/home/system.css`.
* `src/components/home/HomeExpertise.astro` : mise à jour de l'import vers `../../styles/home/expertise.css`.
* `src/components/home/HomeMethod.astro` : ajout de l'import autonome `../../styles/home/method.css`.
* `src/components/home/HomeWork.astro` : mise à jour de l'import vers `../../styles/home/work.css`.
* `src/components/home/HomeCTA.astro` : ajout de l'import autonome `../../styles/home/cta.css`.

---

## 4. Duplications & Dette supprimées

1. **Sélecteurs morts de versions antérieures** :
   * Ancienne grille hero v1/v2 (`.home-hero__*`, scanlines, badge, nodes SVG obsolètes) ;
   * Ancien schéma système HTML v1/v2 (`.home-system-map`, `.home-system-orbit`, `.home-system-flow`, `.home-system-channel`) remplacé par le visual SVG immersif ;
   * Ancienne grille cartes expertises v1/v2 (`.home-expertise-grid`, `.home-expertise-card`, `.home-expertise-card--feature`) remplacée par la grille éditoriale ;
   * Ancienne composition réalisations v1/v2 (`.home-work-grid`, `.home-work-project`) remplacée par les scènes éditoriales ;
   * Curseur orphelin (`.home-cursor` de `home-motion.css`).

2. **Cascades et overrides successifs supprimés** :
   * Élimination des écrasements multiples v1 -> v2 -> v3 sur `.home-system-stage-v2`, `.home-method-step`, `.home-cta__panel`.
   * Unification des états `.is-active` et `.is-past` consolidés directement dans leurs modules respectifs.

---

## 5. Règles volontairement conservées

* Tous les sélecteurs d'attributs de motion (`[data-hero]`, `[data-system-story]`, `[data-system-step]`, `[data-expertise-section]`, `[data-home-method]`, `[data-method-progress]`, `[data-work-section]`, `[data-work-frame]`, `[data-work-depth]`, `[data-work-transition-line]`).
* Classes d'états dynamiques manipulées par JS (`is-active`, `is-past`).
* Transitions, keyframes (`cta-breathe`, `cta-light-pass`, `sector-marquee`), mix-blend-modes et filtres graphiques.
* Tous les blocs `@media (prefers-reduced-motion: reduce)` pour l'accessibilité et la conformité.

---

## 6. Risques & Vérifications

* **Risque de régression visuelle** : Nul — chaque règle conservée a été vérifiée contre le DOM produit par les composants Astro actuels.
* **Risque de conflit de nommage** : Nul — chaque section est préfixée selon son domaine (`hero-product`, `system-visual` / `home-system`, `expertise-editorial`, `home-method`, `work-scene`, `home-cta`).

---

## 7. Validation technique

* **`npm run check`** : PASS (0 errors, 0 warnings, 0 hints sur 114 fichiers)
* **`npm run build`** : PASS (Compilation SSR Node.js + pré-rendu statique sans erreur)
