# CLICOM — Rapport Phase 03 : Motion Refinement Homepage

**Date** : 2026-08-21  
**Statut** : Validé (`npm run check` PASS, `npm run build` PASS)

---

## 1. Objectifs de la phase

Raffiner le motion de la homepage pour renforcer la continuité narrative :
> **SIGNAL → SYSTÈME → RÉSULTAT**

Sans refonte, sans nouvelle dépendance et sans augmenter inutilement la quantité d'animations.

### Hiérarchie cible respectée
* **Hero** : ★★★★★ (Signal & démonstration interactive du système)
* **System** : ★★★★★ (Structure & 4 états connectés)
* **Expertise** : ★★★★ (Capacités & 4 médias de démonstration)
* **Method** : ★★★ (Progression sobre du rail `●──○──○──○` vers `●══●══●══●`)
* **Work** : ★★★★ (Résultat & interactions soignées des réalisations — priorité créative)
* **FAQ** : ★ (Zone calme, accordéon sobre)
* **CTA** : ★★★ (Action, carte sombre & micro-interaction signal)

---

## 2. Fichiers créés & modifiés

### Fichiers créés
* `src/scripts/home-method-motion.ts` — Script autonome de progression continue du rail et gestion des états d'étapes avec `bindAstroMotionCleanup`.
* `CLICOM_PHASE_03_REPORT.md` — Rapport de synthèse de la phase 03.

### Fichiers modifiés
* `src/scripts/hero-motion.ts` — Harmonisation de la durée d'entrée des textes (H1 / intro / CTA : passage de 2.7s à `duration: motion.duration.reveal` / 0.65s pour une lisibilité immédiate), utilisation des tokens `motion.scrub.smooth` et `motion.ease.reveal`.
* `src/scripts/home-system-motion.ts` — Synchronisation du scrub avec `motion.scrub.smooth`, calibration de l'activation des 4 étapes (`progress * 3.99`), adoucissement du rebond mobile (`back.out(1.4)`).
* `src/scripts/home-expertise-motion.ts` — Harmonisation des durées et easings des 4 visualisations (Build, Visibility, Acquisition, Automation), overshoots unifiés à `back.out(1.4)` au lieu de valeurs disparates (1.6..2.0), replay pointer sécurisé.
* `src/components/home/HomeMethod.astro` — Intégration du script `home-method-motion`.
* `src/styles/home/method.css` — États visuels dynamiques des nœuds d'étapes : nœud en attente (`○` anneau discret), nœud passé (`●` plein primary), nœud actif (`●` plein avec halo et élévation).
* `src/scripts/home-work-motion.ts` — Parallaxe adoucie avec `motion.scrub.deliberate`, translation pointer très subtile (`x * 6`, `y * 4`), tokens partagés.
* `src/styles/home/work.css` — Micro-zoom fluide au survol de la frame (`scale(1.12)` sur l'image interne), translation douce de la flèche de lien (`translate(3px, -3px)`), fallback `prefers-reduced-motion` complet.
* `src/styles/home/cta.css` — Micro-interaction signal respirante sur le kicker, élévation subtile du bouton d'action au survol, fallback `prefers-reduced-motion`.
* `src/pages/index.astro` — Suppression de l'import orphelin `home-premium`.
* `src/scripts/home-premium.ts` — Neutralisation du module déprécié et suppression du sélecteur mort `[data-work-media]`.

---

## 3. Effets conservés, raffinés et supprimés

### Effets conservés
* La narration interactive complète du Hero (les 8 scènes connectées et le voyageur).
* L'animation SVG interactive en 4 états du Système et son continuum visuel (`.home-system-section__continuity`).
* Les 4 visualisations techniques d'Expertises (Build, Visibility, Acquisition, Automation).
* L'instance unique de Lenis synchronisée au GSAP ticker.
* L'accordéon sobre natif de la FAQ (zone calme de niveau ★).

### Effets raffinés
* **Hero** : Titre et sous-titre lisibles immédiatement (0.65s) plutôt qu'un fade artificiellement étiré sur 2.7s.
* **System** : Transition d'état scrub plus précise et synchronisée avec les calques SVG.
* **Expertise** : Uniformisation de la sensation d'entrée (durées, easings `power2.inOut` / `power3.out`, rebonds modérés `back.out(1.4)`).
* **Method** : Progression réelle au scroll où le rail s'emplit et active successivement les nœuds :
  ```text
  ●────────○────────○────────○
  ↓
  ●════════●────────○────────○
  ↓
  ●════════●════════●────────○
  ↓
  ●════════●════════●════════●
  ```
* **Work (Priorité créative)** :
  * Hover desktop élégant (micro-zoom `scale(1.12)` de l'image interne, translation subtile du chevron `↗`).
  * Parallaxe douce au scroll sans à-coups ni déchirure.
  * Absence totale de tilt 3D lourd, rotation, curseur custom ou effet magnétique intrusif.
* **CTA** : Micro-interaction cohérente avec le langage de signal (pulsation discrète du point kicker et élévation bouton).

### Effets supprimés / réduits
* Sélecteur mort `[data-work-media]` supprimé de la boucle de motion.
* Script obsolète `home-premium.ts` retiré du flux principal.
* Overshoots excessifs (`back.out(2)`) réduits à des valeurs naturelles (`back.out(1.4)`).
* Déplacement pointer excessif dans Work réduit à des micro-valeurs stables.

---

## 4. Work — Avant / Après

| Critère | Avant | Après |
| :--- | :--- | :--- |
| **Sensation d'entrée** | Clip-path générique | Clip-path fluide avec zoom initial de l'image (1.14 → 1.08) |
| **Survol desktop (pointer fine)** | Aucun effet sur l'image | Micro-zoom progressif (`scale(1.12)`), translation douce du lien |
| **Parallaxe de scroll** | Vitesses disparates | Parallaxe harmonisée (`motion.scrub.deliberate`), micro-décalage de profondeur |
| **Parallaxe pointer** | Valeurs plus fortes (`x*10`, `y*8`) | Micro-translation douce et stable (`x*6`, `y*4`) |
| **Mobile** | Déclenchement standard | Rendu optimisé sans listeners pointer superflus |

---

## 5. Performance & Accessibilité

* **Performance GPU** : Animations limitées à `transform` et `opacity`.
* **Cycle de vie** : Utilisation systématique de `bindAstroMotionCleanup` sur System, Expertise, Method et Work (destruction des ScrollTriggers, listeners et observers lors de `astro:before-swap`).
* **Observers** : IntersectionObservers pour désactiver les tickers/pulses hors viewport.
* **`prefers-reduced-motion`** :
  * Désactivation stricte de tous les keyframes CSS et transformations GSAP.
  * Rendu statique complet et lisible de tous les éléments sans aucune dépendance envers une animation.

---

## 6. Validation technique

* **`npm run check`** : PASS (115 fichiers vérifiés, 0 erreur, 0 warning, 0 hint).
* **`npm run build`** : PASS (Build Astro SSR Node.js complet + génération sitemap).
