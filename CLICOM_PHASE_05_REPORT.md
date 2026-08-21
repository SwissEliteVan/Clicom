# CLICOM — Rapport Phase 05 : Refonte éditoriale des Pages Services

**Date** : 2026-08-21  
**Statut** : Validé (`npm run check` PASS, `npm run build` PASS)

---

## 1. Objectifs de la phase

Aligner les 11 pages de services spécialisées sur le nouveau positionnement PME et l'architecture en 4 piliers établie en Phase 04 :
> **Présence → Acquisition → Automatisation → Performance & sécurité**

* Répondre pour chaque service aux 6 questions fondamentales du décideur PME :
  1. Quel problème métier résout ce service ?
  2. Quel résultat concret cherche-t-on ?
  3. Que peut mettre en place CliCom ?
  4. Comment travaille CliCom (processus d'intervention) ?
  5. Comment ce service s'intègre-t-il dans le système global ?
  6. Quelle est la prochaine action recommandée ?
* Mettre en avant les **bénéfices avant les fonctionnalités**.
* Ancrer explicitement le contexte des **PME en Suisse romande**.
* Enrichir le maillage interne contextuel et lier chaque service aux 4 piliers via un bandeau système dédié.
* Intégrer des données structurées Schema.org (`Service` + `BreadcrumbList`) sur chaque page.
* Garantir l'exactitude des claims : **aucun "AI washing"**, maintien du contrôle humain permanent et aucune garantie algorithmique infondée.

---

## 2. Pages modifiées & Répartition par Pilier

| Page | URL | Pilier de rattachement | Rôle métier pour la PME |
| :--- | :--- | :--- | :--- |
| **Création de site web** | `/creation-site-web/` | `Pilier 01 · Présence digitale` | Socle central de conversion mobile/desktop & crédibilité. |
| **Branding** | `/branding/` | `Pilier 01 · Présence digitale` | Positionnement clair, charte graphique & mémorisation. |
| **Création de contenu** | `/creation-contenu/` | `Pilier 01 / 02 · Présence & Acquisition` | Argumentaires de vente, pages d'offres & contenus d'autorité SEO. |
| **Réseaux sociaux** | `/reseaux-sociaux/` | `Pilier 01 / 02 · Présence & Acquisition` | Présence éditoriale régulière & vitrine active sur LinkedIn/Meta. |
| **SEO** | `/seo/` | `Pilier 02 · Acquisition` | Flux continu de prospects qualifiés sur Google en Suisse romande. |
| **Référencement IA** | `/referencement-ia/` | `Pilier 02 · Acquisition` | Structure sémantique & données pour ChatGPT, Gemini, Perplexity. |
| **Google Ads** | `/google-ads/` | `Pilier 02 · Acquisition` | Capture d'intention d'achat immédiate avec mesure rigoureuse du ROI. |
| **Social Ads** | `/social-ads/` | `Pilier 02 · Acquisition` | Création de demande ciblée B2B/B2C & retargeting des visiteurs. |
| **Automatisation** | `/automatisation/` | `Pilier 03 · Automatisation` | Élimination des ressaisies manuelles & alertes instantanées de leads. |
| **E-mail & CRM** | `/email-marketing-crm/` | `Pilier 03 · Automatisation` | Pipeline commercial visuel & relances systématiques de devis. |
| **Intelligence artificielle** | `/intelligence-artificielle/` | `Pilier 03 · Automatisation` | Assistants opérationnels (synthèse, tri, support) sous contrôle humain. |

---

## 3. Changements structurants & Éditoriaux

1. **Intégration du Pilier (`pillarTag`)** :
   Chaque page arbore en en-tête son rattachement clair au système CliCom (ex: `Pilier 01 · Présence digitale · Création de site web`), guidant le visiteur dans la compréhension globale de l'offre.
2. **Guide de décision & Connexion au système (`decisionGuide`)** :
   Chaque page détaille explicitement comment le service s'articule avec les autres piliers (ex: comment le site web alimente le CRM, comment Google Ads et le SEO se complètent, comment l'automatisation soulage les équipes).
3. **Bandeau de passerelle système (`related-system-banner`)** :
   En bas de chaque page, un encart dédié met en avant :
   *« Ce service s'intègre dans un système à 4 piliers → Explorer les 4 piliers »* vers `/services#piliers`.
4. **Rédactionnel orienté PME romande** :
   * Remplacement des descriptions passives par des réponses concrètes aux freins opérationnels (manque de temps, devis sans suite, clics sans conversion, dispersion d'outils).
   * Bénéfices client clairs, mesurables et réalistes.
   * Clarification des FAQ : réponses transparentes sur les budgets, les délais, la propriété à 100 % et la continuité des domaines/e-mails.

---

## 4. SEO & Données structurées

* **Balisage Hn** :
  * `<h1>` unique et différencié sur chaque page, combinant le service et son bénéfice business.
  * `<h2>` thématiques et `<h3>` structurés pour la lisibilité et l'indexation sémantique.
* **Titles & Descriptions** :
  * Title spécifique et ciblé intégrant la dimension locale suisse romande sur les 11 pages.
  * Meta descriptions incitatives et sans duplication.
* **Données structurées JSON-LD** :
  * Schema `Service` (`name`, `provider`, `areaServed: Suisse romande`, `serviceType`).
  * Schema `BreadcrumbList` (Accueil → Services → [Nom du Service]).
* **Maillage interne contextuel** :
  * Liens croisés logiques entre services complémentaires (ex: Site web ↔ SEO ↔ Branding ↔ Automatisation).
  * Connexion bidirectionnelle systématique avec la page maîtresse `/services`.

---

## 5. Précision des claims & Pas d'AI Washing

* **Ancrage territorial** : Mention naturelle des cantons et du tissu économique romand.
* **IA & Automatisation** : Présentées comme des assistants pragmatiques au service des équipes, avec insistance systématique sur le **contrôle humain permanent** et la confidentialité des données d'entreprise.
* **Absence totale de promesses algorithmiques infondées** : Aucune garantie de "première position Google" ou de "citation magique dans ChatGPT".
* **Garanties et engagements** : Aucun chiffre inventé, aucun faux témoignage, aucun forfait forcé.

---

## 6. Composants mutualisés & Améliorations de code

* **`src/components/CommercialPage.astro`** :
  * Ajout des props `pillarTag` et `structuredData`.
  * Transmission dynamique du balisage JSON-LD au `Layout.astro`.
  * Affichage élégant du pilier dans l'en-tête `PageHero`.
  * Ajout du bandeau de connexion au système global (`.related-system-banner`) et stylisation responsive.
* **Pages services (`src/pages/*.astro`)** :
  * Harmonisation des 11 pages avec les nouvelles props standardisées sans aucune duplication de code CSS superflue.

---

## 7. Validation technique

* **`npm run check`** : PASS (115 fichiers vérifiés, 0 erreur, 0 warning, 0 hint).
* **`npm run build`** : PASS (Build Astro SSR Node.js complet + génération du sitemap).
* **Inspection navigateur (Subagent)** :
  * Rendu validé sur `/creation-site-web/` et `/automatisation/`.
  * Validation du tag de pilier, du guide d'intégration système, des liens associés et des CTAs.
  * 0 erreur console applicative.

---

## 8. Fichiers modifiés

1. `src/components/CommercialPage.astro`
2. `src/pages/creation-site-web.astro`
3. `src/pages/branding.astro`
4. `src/pages/creation-contenu.astro`
5. `src/pages/reseaux-sociaux.astro`
6. `src/pages/seo.astro`
7. `src/pages/referencement-ia.astro`
8. `src/pages/google-ads.astro`
9. `src/pages/social-ads.astro`
10. `src/pages/automatisation.astro`
11. `src/pages/email-marketing-crm.astro`
12. `src/pages/intelligence-artificielle.astro`
13. `CLICOM_PHASE_05_REPORT.md`
