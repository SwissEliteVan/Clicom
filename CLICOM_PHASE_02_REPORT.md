# CLICOM — Rapport Phase 02 : Homepage PME 2026

**Date** : 2026-08-21  
**Statut** : Validé (`npm run check` PASS, `npm run build` PASS)

---

## 1. Objectifs de la phase

Intégration du positionnement cible CliCom sur la homepage :
> **CliCom construit le système digital qui aide les PME romandes à être trouvées, choisies et mieux organisées.**

Périmètre : **Éditorial & UX de contenu**, sans refonte motion ni régression structurelle.

---

## 2. Fichiers modifiés

1. `src/pages/index.astro` — Métadonnées, balise description et graphe JSON-LD `Organization` / `ProfessionalService`.
2. `src/layouts/Layout.astro` — Description par défaut pour la route racine `/`.
3. `src/components/home/HomeHero.astro` — H1 unifié, surtitre, texte d'introduction, CTA principal (« Parlons de votre projet »), CTA secondaire (« Découvrir notre méthode »), réassurance et ajustement typographique.
4. `src/components/home/HomeSystem.astro` — Positionnement « Un seul partenaire pour construire un digital cohérent », bénéfices des 4 piliers connectés.
5. `src/components/home/HomeExpertise.astro` — Positionnement « Les bonnes compétences, activées au bon moment », articulation selon les priorités du client.
6. `src/components/home/HomeMethod.astro` — Positionnement PME « Pensé pour les entreprises qui n'ont pas une équipe digitale de vingt personnes », démarche en 4 étapes « Comprendre → Construire → Activer → Améliorer ».
7. `src/components/home/HomeWork.astro` — Positionnement « Des projets conçus pour être utilisés, pas seulement présentés », valorisation des cas vérifiés Nat et Patoune & Rikunali sans métriques inventées.
8. `src/components/home/HomeFAQ.astro` — Clarté, délais, automatisation concrète, ancrage PME romandes sans jargon.
9. `src/components/home/HomeCTA.astro` — Intitulé « Vous avez un projet, un problème ou simplement besoin d'y voir plus clair ? », CTA « Demander un échange », badges pratiques.

---

## 3. Narration Avant / Après

```text
AVANT :
Visibilité générique suisse
→ 4 piliers abstraits
→ Démonstration de savoir-faire créatif
→ Méthode orientée diagnostic/canal
→ Réalisations générales
→ CTA générique

APRÈS (Cible PME Romande 2026) :
PROBLÈME / PROMÈSE (Hero : un digital qui travaille vraiment pour votre entreprise)
→ SYSTÈME (Un seul partenaire pour relier site, visibilité, acquisition, CRM, automatisation et sécurité)
→ EXPERTISE (Les bonnes compétences activées au bon moment, sans catalogue rigide)
→ MÉTHODE (Comprendre → Construire → Activer → Améliorer ; extension de l'équipe pour les PME sans équipe de 20 personnes)
→ PREUVES (Réalisations réelles Nat et Patoune & Rikunali conçues pour être utilisées)
→ ACTION (Échange direct de 30 min / audit gratuit sans engagement)
```

---

## 4. SEO & Données structurées

* **Balise `<title>`** : `CLICOM | Agence digitale pour PME en Suisse romande` (naturel, ciblé, sans suroptimisation).
* **Meta description** : `CliCom construit le système digital qui aide les PME romandes à être trouvées, choisies et mieux organisées : site web, visibilité, acquisition et automatisation.`
* **Hiérarchie sémantique** : 1 seul `<h1>` (`#home-title` dans le Hero), `<h2>` clairs par section avec IDs d'ancres dédiés (`#systeme`, `#expertises`, `#methode`, `#realisations`, `#faq`, `#home-cta`), `<h3>` pour les blocs internes.
* **JSON-LD** : Synchronisation du graphe `Organization` / `ProfessionalService` et `WebSite` avec description et liste des services réels.

---

## 5. Décisions de conservation & Intégrité technique

* **Hooks motion 100% préservés** : Tous les attributs `data-hero*`, `data-scene*`, `data-flow`, `data-system*`, `data-expertise*`, `data-home-method`, `data-method-progress`, `data-work*`, `data-reveal` et classes d'état `.is-active` / `.is-past` sont strictement intacts.
* **Scripts motion intacts** : Aucun script GSAP/ScrollTrigger/Lenis/WebGL n'a été modifié.
* **Architecture CSS intacte** : Préservation totale de l'organisation modulaire `src/styles/home/` issue de la Phase 01B.
* **Intégrité des preuves** : Aucun chiffre, statistique, testimonial ou client inventé. Utilisation exclusive des données et assets existants du repository.

---

## 6. Validation technique

* **`npm run check`** : PASS (0 errors, 0 warnings, 0 hints sur 114 fichiers)
* **`npm run build`** : PASS (Astro SSR Node.js + pré-rendu statique en 11.33s, sitemap généré)
