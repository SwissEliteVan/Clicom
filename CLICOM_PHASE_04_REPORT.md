# CLICOM — Rapport Phase 04 : Architecture Services PME

**Date** : 2026-08-21  
**Statut** : Validé (`npm run check` PASS, `npm run build` PASS)

---

## 1. Objectifs de la phase

Faire évoluer l'offre CliCom d'un catalogue de prestations vers un système unifié et lisible pour une PME en Suisse romande :
> **Présence → Acquisition → Automatisation → Performance & sécurité**

* Positionner `/services` comme la vue d'ensemble du **système CliCom**, plutôt qu'un catalogue d'outils disparates.
* Répondre aux besoins métier réels d'une PME (plus de demandes qualifiées, meilleure organisation commerciale, temps gagné).
* Préserver l'intégralité des URLs à forte intention SEO et commerciale.
* Aligner la navigation (Desktop Mega-Menu, Mobile Menu, Footer) et les métadonnées SEO / JSON-LD.

---

## 2. Audit des routes & Décisions d'architecture

| Route | Rôle & Intention SEO | Décision | Justification |
| :--- | :--- | :--- | :--- |
| `/services` | Vue d'ensemble de l'offre | **REWRITE** | Refonte complète : passage d'un catalogue statique de 11 cartes à une narration continue en 4 piliers interconnectés. |
| `/creation-site-web/` | Pilier 1 : Sites web orientés conversion | **KEEP** | Forte valeur SEO et commerciale (UX, design Astro, conversion, mobile). |
| `/branding/` | Pilier 1 : Positionnement & identité visuelle | **KEEP** | Socle d'identité, de réassurance et de cohérence de marque. |
| `/creation-contenu/` | Pilier 1 / 2 : Argumentation & contenus utiles | **KEEP** | Contenus orientés décision, articles SEO et pages d'offres. |
| `/reseaux-sociaux/` | Pilier 1 / 2 : Présence éditoriale pérenne | **KEEP** | Présence sociale régulière et intentionnelle sur les canaux adaptés. |
| `/seo/` | Pilier 2 : Référencement naturel & local | **KEEP** | Trafic organique durable et requêtes locales en Suisse romande. |
| `/referencement-ia/` | Pilier 2 : GEO / AEO & moteurs conversationnels | **KEEP** | Visibilité structurée dans ChatGPT/Gemini/Perplexity, sans fausses promesses. |
| `/google-ads/` | Pilier 2 : Campagnes d'intention de recherche | **KEEP** | Capter une intention commerciale immédiate avec suivi des conversions. |
| `/social-ads/` | Pilier 2 : Publicité ciblée Meta / LinkedIn | **KEEP** | Créer la demande et réactiver les audiences qualifiées. |
| `/automatisation/` | Pilier 3 : Flux opérationnels & suppression des ressaisies | **KEEP** | Gain de temps concret et fiabilisation des données de leads. |
| `/email-marketing-crm/` | Pilier 3 : Pipelines commerciaux & suivi | **KEEP** | Continuité commerciale et scénarios relationnels post-conversion. |
| `/intelligence-artificielle/` | Pilier 3 : IA pragmatique & assistance encadrée | **KEEP** | Outils opérationnels au service des équipes, sous contrôle humain. |
| `/solutions/` | Entrée par défi métier pour la PME | **KEEP** | Complément direct de `/services` sous l'angle « Problème → Solution ». |

**Bilan de l'audit** : 1 REWRITE, 12 KEEP, 0 MERGE, 0 REDIRECT, 0 OBSOLETE.  
Aucune route n'a été dépréciée ni supprimée afin de préserver l'historique et l'indexation SEO.

---

## 3. Nouvelle architecture de la page `/services`

La page `/services` est désormais construite autour d'une narration progressive :

### 3.1 Hero
* **Titre** : *Un digital cohérent plutôt qu'une accumulation d'outils.*
* **Intro** : CliCom sélectionne, structure et relie les compétences numériques utiles aux objectifs concrets de la PME.
* **CTAs** : `Explorer les 4 piliers →` (#piliers) + `Voir les solutions par défi métier` (/solutions/).

### 3.2 Le constat PME
* **Message clé** : *Vous ne cherchez pas du SEO ou un CRM. Vous cherchez des résultats concrets.*
* **Comparaison** :
  * *Approche classique* : prestataires dispersés, ruptures d'information, coûts cachés.
  * *Approche système CliCom* : écosystème interconnecté où chaque composant renforce les autres.
* **Rail de continuité visuel** :
  `01 Présence (Fondations) → 02 Acquisition (Visibilité) → 03 Automatisation (Fluidité) → 04 Performance & Sécurité (Contrôle)`

### 3.3 Les 4 Piliers détaillés
Pour chaque pilier, un bloc structuré présente :
1. **Pilier 01 : Présence digitale** (*Fondations & Crédibilité*)
   * *Problème métier* : Site vieillissant, inadapté au mobile, message flou faisant fuir les visiteurs.
   * *Résultat recherché* : Image rassurante, proposition de valeur limpide en quelques secondes, navigation fluide.
   * *Capacités & Liens* : [Création de site web](/creation-site-web/), [Branding](/branding/), [Création de contenu](/creation-contenu/), [Réseaux sociaux](/reseaux-sociaux/).
2. **Pilier 02 : Acquisition** (*Visibilité & Demandes qualifiées*)
   * *Problème métier* : Dépendance au bouche-à-oreille, flux irrégulier ou budget publicitaire gaspillé sur des clics sans lendemain.
   * *Résultat recherché* : Prospects qualifiés découvrant vos services au moment précis où ils formulent un besoin commercial.
   * *Capacités & Liens* : [SEO naturel & local](/seo/), [Référencement IA](/referencement-ia/), [Google Ads](/google-ads/), [Social Ads](/social-ads/).
3. **Pilier 03 : Automatisation** (*Fluidité & Temps gagné*)
   * *Problème métier* : Formulaires traités en retard, ressaisies manuelles Excel, relances oubliées, temps administratif excessif.
   * *Résultat recherché* : Prise en charge immédiate, transmission instantanée au bon interlocuteur, zéro friction.
   * *Capacités & Liens* : [Automatisation des flux](/automatisation/), [E-mail marketing & CRM](/email-marketing-crm/), [Intelligence artificielle](/intelligence-artificielle/).
4. **Pilier 04 : Performance & sécurité** (*Continuité & Contrôle*)
   * *Problème métier* : Absence de visibilité sur le ROI digital, sites non maintenus, risque de pannes.
   * *Résultat recherché* : Écosystème rapide, sécurisé, hébergé en Suisse et piloté avec des indicateurs clairs.
   * *Capacités & Liens* : Tableaux de bord analytics, maintenance proactive, sauvegardes, [Notre méthode](/methode/), [Audit gratuit](/audit-gratuit/).

### 3.4 Démarche & Différenciation
* **Démarche** : *Nous partons du besoin métier, pas de la technologie* (Diagnostic & Priorisation → Activation progressive → Mesure & Optimisation).
* **Différenciation** : 6 repères clés (Ancrage en Suisse romande, Métier avant technologie, Conseil + Réalisation intégrés, Approche progressive, Visibilité reliée à la conversion, Automatisation utile & encadrée).

### 3.5 Bloc de conversion
* **Titre** : *Faire le point sur votre digital.*
* **Actions** : `Réserver un échange de 30 min →` (Calendly) + `Demander un audit gratuit` (/audit-gratuit/).
* **Garanties** : 30 minutes concrètes · Sans engagement · Spécialiste PME Suisse romande.

---

## 4. Fichiers modifiés

* **`src/pages/services.astro`** : Réécriture complète de la page (narration 4 piliers, diagnostics, capacités avec cartes cliquables, rail de continuité, données structurées JSON-LD).
* **`src/components/Header.astro`** : Restructuration du mega-menu en 3 colonnes de piliers (*Présence digitale*, *Acquisition*, *Automatisation & Suivi*), mise à jour du kicker (*Système digital PME*) et du menu mobile.
* **`src/components/Footer.astro`** : Harmonisation des liens de navigation (*Solutions* inclus) et des services principaux (*Présence & Sites web*, *Référencement & visibilité IA*, *Acquisition Google & Social Ads*, *Automatisation & CRM*, *Système complet PME*).
* **`src/layouts/Layout.astro`** : Mise à jour de la meta description par défaut de `/services`.
* **`CLICOM_PHASE_04_REPORT.md`** : Rapport de synthèse de la phase 04.

---

## 5. SEO & Données structurées

* **Balisage Hn** :
  * Unique `<h1>` : *Un digital cohérent plutôt qu'une accumulation d'outils.*
  * `<h2>` thématiques clairs pour chaque section : *Le constat PME*, *4 piliers interconnectés*, *Notre démarche*, *Ce qui nous distingue*, *Faire le point sur votre digital*.
  * `<h3>` et `<h4>` structurant les piliers et capacités.
* **Meta Tags** :
  * `title` : `Services digitaux pour PME en Suisse romande | CLICOM`
  * `description` : `Découvrez le système digital CliCom : Présence digitale, Acquisition, Automatisation et Performance & sécurité. Un digital cohérent et rentable pour PME.`
* **Données structurées (JSON-LD)** :
  * Schema `Service` avec `hasOfferCatalog` détaillant les 4 piliers et leurs URLs associées.
  * Schema `BreadcrumbList` (Accueil → Services).
* **Maillage interne** :
  * Liens croisés vers les 11 pages de services spécialisées.
  * Liens vers `/solutions/`, `/methode/`, `/audit-gratuit/`, `/contact/`.

---

## 6. Précision des claims & Différenciation

* **PME suisse romande** : Ancrage géographique explicite (cantons romands), approche pragmatique sans promesses irréalistes.
* **Intelligence artificielle & Automatisation** : Présentées comme des capacités opérationnelles pour éliminer les tâches répétitives et assister les équipes, avec insistance sur le **contrôle humain permanent**.
* **Zéro jargon creux** : Exclusion totale de termes comme « agence 360° », « solution magique », « première position garantie ».

---

## 7. Validation technique

* **`npm run check`** : PASS (115 fichiers vérifiés, 0 erreur, 0 warning, 0 hint).
* **`npm run build`** : PASS (Build Astro SSR Node.js complet + génération sitemap).
* **Inspection navigateur** : Validation visuelle de la page `/services`, test des liens vers les sous-services, contrôle responsive et console sans erreur.
