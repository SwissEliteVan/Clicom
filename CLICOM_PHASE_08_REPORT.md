# CLICOM — Rapport Phase 08 : Secteurs PME

**Date** : 2026-08-21  
**Statut** : Validé (`npm run check` PASS, `npm run build` PASS, audit navigateur Desktop/Mobile validé)

---

## 1. Routes auditées & Modifiées

| Route | Rôle & Positionnement | Différenciation métier & Vocabulaire spécifique |
| :--- | :--- | :--- |
| **`/secteurs/`** | Hub d'orientation sectorielle | Présentation des 6 secteurs cibles en Suisse romande, passerelles vers `/solutions` et `/services`. |
| **`/secteurs/pme/`** | **Page phare PME romande** | Ressources internes limitées, arbitrage budgétaire strict (ROI), interlocuteur unique, approche progressive à 4 piliers. |
| **`/secteurs/artisans/`** | Artisans & Métiers du bâtiment | Zone d'intervention cantonale, valorisation de chantiers réels, formulaires de devis qualifiés, alertes mobiles pour les professionnels sur le terrain. |
| **`/secteurs/services-professionnels/`** | Cabinets d'avocats, fiduciaires & B2B | Vulgarisation d'expertises complexes, réassurance institutionnelle, cycles de décision longs, SEO d'expertise et CRM B2B. |
| **`/secteurs/immobilier/`** | Agences immobilières & Courtiers | Rentrée de mandats de vente exclusifs, tunnels d'estimation en ligne, SEO communal/cantonal et réactivité commerciale immédiate. |
| **`/secteurs/ecommerce/`** | Boutiques en ligne & Marques D2C | Protection des marges nettes face aux coûts d'acquisition, ergonomie mobile du panier, scénarios e-mails automatisés (relances paniers). **Rattachement au cas réel : Nat et Patoune**. |
| **`/secteurs/independants/`** | Thérapeutes, coachs & Praticiens | Valorisation de la marque personnelle, zéro temps à perdre en démarchage commercial, prise de rendez-vous directe en ligne. **Rattachement au cas réel : Rikunali**. |

---

## 2. Règle Anti-SEO programmatique & Différenciation

* **Suppression des gabarits génériques** : Abandon des formulations interchangeables où seul le nom du métier changeait.
* **Problèmes et vocabulaire propres à chaque métier** :
  * *Artisans* : chantiers, devis, zones d'intervention, Google Business.
  * *Immobilier* : mandats de vente, estimations, propriétaires vendeurs, acquéreurs.
  * *Services B2B* : associés, honoraires, cycles de décision, déontologie, autorité.
  * *E-commerce* : marge nette, panier d'achat, ROAS, valeur vie client (LTV), e-mails d'abandon.
  * *Indépendants* : consultations, sérénité, agenda connecté, confiance humaine.
  * *PME* : équipe restreinte, arbitrage budgétaire, rentabilité opérationnelle, interlocuteur unique.

---

## 3. Positionnement PME romande

La page `/secteurs/pme/` structure la promesse centrale de CliCom :
* Prise en compte des **ressources internes limitées** (pas d'équipe marketing dédiée).
* Réponse au besoin d'**arbitrage budgétaire strict** avec un interlocuteur unique.
* Approche progressive (Socle web → Acquisition locale → Automatisation commerciale).
* Zéro jargon, zéro usine à gaz technique.

---

## 4. Maillage & Connexion aux Réalisations Réelles

* **Secteur → Solution** : Passerelle systématique vers le défi métier correspondant sur `/solutions/` (*Être trouvé*, *Être choisi*, *Ne plus perdre de leads*, etc.).
* **Secteur → Services** : Puces de renvoi vers les 4 piliers de services ([Création de site web](/creation-site-web/), [SEO](/seo/), [Google Ads](/google-ads/), [Automatisation & CRM](/automatisation/)).
* **Secteur → Réalisations factuelles** :
  * `/secteurs/ecommerce/` → Étude de cas **Nat et Patoune** (`/realisations/nat-et-patoune/`).
  * `/secteurs/independants/` → Étude de cas **Rikunali** (`/realisations/rikunali/`).
  * Aucun rattachement artificiel sur les autres secteurs.

---

## 5. SEO & Données structurées

* **Balisage Schema.org JSON-LD** :
  * `CollectionPage` + `ItemList` + `BreadcrumbList` sur `/secteurs/`.
  * `Service` (`provider: CLICOM`, `areaServed: Suisse romande`) + `BreadcrumbList` sur chaque page sectorielle.
* **Balises titres & H1** : 100 % uniques, alignés sur les intentions de recherche sectorielles en Suisse romande sans sur-optimisation de mots-clés ni pages ville+secteur artificielles.
* **CTA non contractuels** : Utilisation exclusive de *« Demander un échange »* et *« Demander un diagnostic digital »* selon le contexte.
* **Contrôle des claims avant commit** : aucune nouvelle mention d’audit gratuit, de consultation gratuite, de durée précise ou de garantie. Trois formulations commerciales non documentées restent signalées dans les contenus de Phase 08, sans modification dans ce correctif limité aux CTA : *« ne plus jamais manquer une opportunité de devis »* et *« 100 % indépendant »* sur `/secteurs/artisans/`, ainsi que *« récupérer entre 5 et 15 % des ventes perdues »* sur `/secteurs/ecommerce/`.

---

## 6. Validation technique

* **`npm run check`** : PASS (115 fichiers vérifiés, 0 erreur, 0 warning, 0 hint).
* **`npm run build`** : PASS (Build Astro SSR Node.js standalone généré avec succès en 8.76s).
* **Inspection navigateur (Subagent)** :
  * `/secteurs/` : Rendu du hub et des 6 cartes validé.
  * `/secteurs/pme/` : Rendu complet des défis, services, méthode et FAQ validé.
  * `/secteurs/ecommerce/` : Présence et fonctionnement du bloc d'étude de cas *Nat et Patoune* validés.
  * `/secteurs/independants/` : Présence et fonctionnement du bloc d'étude de cas *Rikunali* validés.
  * Viewport Mobile (390px) : Rendu responsive impeccable, aucun débordement horizontal, boutons et typographies parfaitement calibrés.

---

## 7. Fichiers modifiés

1. `src/components/SectorPage.astro`
2. `src/pages/secteurs/index.astro`
3. `src/pages/secteurs/pme.astro`
4. `src/pages/secteurs/artisans.astro`
5. `src/pages/secteurs/services-professionnels.astro`
6. `src/pages/secteurs/immobilier.astro`
7. `src/pages/secteurs/ecommerce.astro`
8. `src/pages/secteurs/independants.astro`
9. `CLICOM_PHASE_08_REPORT.md`
