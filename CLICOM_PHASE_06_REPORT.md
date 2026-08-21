# CLICOM — Rapport Phase 06 : Solutions par Problèmes PME

**Date** : 2026-08-21  
**Statut** : Validé (`npm run check` PASS, `npm run build` PASS, audit navigateur Desktop/Mobile validé)

---

## 1. Objectifs de la phase

Repositionner la route `/solutions` comme la porte d’entrée dédiée aux **défis et problèmes métier des PME**, parfaitement complémentaire et distincte de `/services` :
* **Services (`/services`)** = Les capacités et expertises techniques de CliCom organisées en 4 piliers (*« Je sais ce qu'il me faut »*).
* **Solutions (`/solutions`)** = Les problèmes concrets que le dirigeant ou décideur PME souhaite résoudre (*« Je sais ce qui me bloque »*).

---

## 2. Architecture & 5 Solutions Métier

Chaque solution suit rigoureusement la trame logique :
`PROBLÈME CONSTATÉ → IMPACT BUSINESS → APPROCHE CLICOM → LEVIERS TECHNIQUES → PROCHAINE ACTION`

| # | Solution | Problèmes PME traités | Leviers / Services mobilisés | Action recommandée |
| :--- | :--- | :--- | :--- | :--- |
| **01** | **Être trouvé** | Manque de visibilité Google, absence locale, dépendance au bouche-à-oreille. | [SEO](/seo/), [GEO & AEO](/referencement-ia/), [Google Ads](/google-ads/), [Contenu](/creation-contenu/) | Résoudre mon problème de visibilité |
| **02** | **Être choisi** | Site web vieillissant, offre floue, manque de crédibilité, faible conversion mobile. | [Site web](/creation-site-web/), [Branding](/branding/), [Contenu](/creation-contenu/), [Réseaux sociaux](/reseaux-sociaux/) | Améliorer mon taux de conversion |
| **03** | **Ne plus perdre de leads** | Demandes dispersées, suivi aléatoire, devis sans relance structurée. | [CRM & Pipeline](/email-marketing-crm/), [Automatisation devis](/automatisation/), [E-mails](/email-marketing-crm/) | Structurer mon suivi commercial |
| **04** | **Gagner du temps** | Doubles saisies manuelles, outils déconnectés, surcharge administrative. | [Automatisation](/automatisation/), [Synchronisation API](/automatisation/), [IA opérationnelle](/intelligence-artificielle/) | Automatiser mes tâches répétitives |
| **05** | **Mesurer et sécuriser** | Manque de visibilité ROI, crainte des pannes, outils captifs, sécurité. | [Méthode](/methode/), [Diagnostic de performance](/audit-gratuit/), [Architecture web maîtrisée](/creation-site-web/), [Tableaux de bord](/automatisation/) | Évaluer performance & sécurité |

---

## 3. Distinction UX Services vs Solutions

Un bandeau d'aide à la décision (`mental-model-bar`) a été intégré directement sous le Hero de `/solutions` :
* **Carte active (Solutions)** : *« Je sais ce qui me bloque »* → Diagnostic par défis métier (manque de visibilité, devis sans suite, temps administratif).
* **Carte alternative (Services)** : *« Je sais ce qu'il me faut »* → Accès direct au catalogue de compétences structuré en 4 piliers avec lien vers `/services/`.
* **Pills de navigation rapide** : Permet aux décideurs d'accéder instantanément à leur enjeu spécifique d'un simple clic sans défilement fastidieux.

---

## 4. SEO & Données structurées (Anti-cannibalisation)

* **Stratégie sémantique anti-cannibalisation** :
  * `/services` et ses sous-pages ciblent les intentions techniques et de compétences (ex: *Création de site web*, *Campagnes Google Ads*, *SEO*, *Automatisation*).
  * `/solutions` cible les intentions de recherche orientées problèmes et résultats pour dirigeants (ex: *Résoudre manque de visibilité*, *Convertir plus de devis*, *Éliminer ressaisies manuelles*, *Suivre mes prospects PME*).
* **Données structurées Schema.org** :
  * Schéma `WebPage` complet avec `isPartOf` rattaché à l'entité organisationnelle.
  * Schéma `ItemList` déclarant explicitement les 5 solutions métier et leur périmètre.
  * Schéma `BreadcrumbList` (Accueil → Solutions).
* **Descriptions & Balisage** :
  * Title et Meta description uniques dans [Layout.astro](file:///c:/Users/Administrateur/clicom/src/layouts/Layout.astro) et `solutions.astro`.
  * `<h1>` unique : *« Quel problème bloque le développement de votre PME ? »*.

---

## 5. Maillage interne & Passerelle sectorielle

* **Vers les services** : Chaque bloc solution contient des puces interactives (`service-chip`) pointant vers les services concernés sans dupliquer leur contenu.
* **Vers les secteurs** : Bandeau sectoriel dédié (`sectors-panel`) reliant `/solutions` aux 6 pages sectorielles romandes ([/secteurs/pme/](/secteurs/pme/), [/secteurs/artisans/](/secteurs/artisans/), [/secteurs/immobilier/](/secteurs/immobilier/), [/secteurs/services-professionnels/](/secteurs/services-professionnels/), [/secteurs/ecommerce/](/secteurs/ecommerce/), [/secteurs/independants/](/secteurs/independants/)).
* **Bidirectionnel** : `/services` pointe vers `/solutions` (*« Voir les solutions par défi métier »*).

---

## 6. Validation technique

* **`npm run check`** : PASS (115 fichiers vérifiés, 0 erreur, 0 warning, 0 hint).
* **`npm run build`** : PASS (Build Astro SSR Node.js complet généré en 5.80s).
* **Inspection navigateur (Subagent)** :
  * Rendu desktop validé avec affichage des 5 blocs, diagnostic, impact, approche et puces de services.
  * Clic de navigation validé depuis une puce vers la page technique correspondante (`/seo/`).
  * Rendu mobile (390px) validé : wrapping propre, cartes empilées, bandeau mental model responsive, zéro débordement horizontal.
  * 0 erreur console applicative.

---

## 7. Fichiers modifiés

1. `src/pages/solutions.astro`
2. `src/layouts/Layout.astro`
3. `CLICOM_PHASE_06_REPORT.md`
