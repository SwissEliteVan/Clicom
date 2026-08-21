# CLICOM 2026 — Audit de refonte (PHASE 00)

Date de l'audit : 21 août 2026  
Périmètre : `C:\Users\Administrateur\clicom`  
Nature : audit en lecture seule du code applicatif ; ce rapport est le seul fichier créé.

## Résumé exécutif

Le dépôt possède déjà une base solide et cohérente avec la cible 2026 : Astro SSR, composants réutilisables, homepage narrative, quatre piliers, motion GSAP/ScrollTrigger, Lenis, OGL chargé à la demande, fallbacks SVG, responsive et stratégies `prefers-reduced-motion`. La refonte ne doit donc pas reconstruire la homepage : elle doit préserver ses scènes et faire converger le rédactionnel, le CSS et l'infrastructure motion.

Les principaux écarts sont structurels : quatre feuilles CSS homepage sont chargées successivement, auxquelles s'ajoutent quatre feuilles spécialisées ; chaque scène motion réimplémente une partie du lifecycle ; les durées/easings sont dispersés ; `home-premium.ts` anime encore des sélecteurs appartenant à une version antérieure ; la promesse PME est présente mais la narration ne contient pas de vraie section « problème » ni de section dédiée à la spécialisation PME ; les études de cas structurées sont volontairement vides ; et les données structurées restent limitées à la homepage.

## 1. Architecture actuelle

- `astro.config.mjs` verrouille correctement Astro en SSR avec `output: 'server'`, `@astrojs/node` en mode `standalone`, un sitemap et `site: 'https://clicom.ch'`.
- `src/layouts/Layout.astro` fournit le squelette global, les métadonnées, le canonical, Open Graph, Twitter, le skip-link, le header et le footer.
- `src/layouts/BlogPost.astro` porte le gabarit éditorial des articles et leur CTA.
- `src/pages/` contient les routes commerciales, sectorielles, éditoriales, légales et serveur.
- `src/components/CommercialPage.astro` mutualise la majorité des pages de services ; `src/components/SectorPage.astro` mutualise les pages sectorielles.
- `src/components/home/` contient les sept scènes de la homepage et leurs sous-visualisations.
- `src/components/visuals/` contient le langage visuel SVG/WebGL partagé.
- `src/scripts/` contient motion, analytics, formulaires, Calendly et WebGL.
- `src/styles/` contient le design global et les couches homepage.
- `src/content/blog/` et `src/content.config.ts` forment la collection de contenu Astro.
- `src/data/case-studies.ts` définit le modèle des études de cas, sans donnée publiée actuellement.
- `src/middleware.ts` applique des en-têtes de sécurité à toutes les réponses.
- La navigation est aujourd'hui une navigation Astro classique par liens. Aucun `ClientRouter` ou système View Transitions n'est déclaré dans `src/layouts/Layout.astro`. Les listeners `astro:before-swap` des scripts sont donc préventifs et deviendraient utiles si les transitions Astro étaient activées.

Les dossiers `Clicom/` et `clicom-hostinger/` visibles à la racine ont été exclus de l'audit conformément aux règles du projet ; ils ne constituent pas une source de vérité.

## 2. Stack et dépendances

Source : `package.json`.

| Domaine | Dépendance | Observation |
|---|---|---|
| Framework | `astro` `^7.1.6` | SSR, TypeScript strict |
| Runtime | Node `>=22.12.0` | Conforme à l'architecture verrouillée |
| Adaptateur | `@astrojs/node` `^11.0.2` | Mode standalone |
| SEO | `@astrojs/sitemap` `^3.7.3` | Sitemap actif, exclusion de `/404/` |
| Motion | `gsap` `^3.15.0`, ScrollTrigger | Storytelling et reveals |
| Scroll | `lenis` `^1.3.25` | Initialisé dans `src/scripts/hero-motion.ts` |
| WebGL | `ogl` `^1.0.11` | Import dynamique dans `src/scripts/immersive-mesh.ts` et `src/scripts/visuals/ai-field.ts` |
| Typographie | `@fontsource-variable/manrope` | Import local dans `src/layouts/Layout.astro` |
| Serveur | `nodemailer` `^9.0.4` | Endpoint `src/pages/api/contact.ts` |
| Validation | `astro check`, `tsc`, `astro build` | Scripts `check`, `validate`, `build` disponibles ; aucun lint/test déclaré |

Aucun framework frontend ou paquet motion concurrent n'est installé. La stack demandée est déjà respectée.

## 3. Routes

### Routes principales

- `/` — `src/pages/index.astro`
- `/services/` — `src/pages/services.astro`
- `/solutions/` — `src/pages/solutions.astro`
- `/realisations/` — `src/pages/realisations.astro`
- `/methode/` — `src/pages/methode.astro`
- `/agence/` — `src/pages/agence.astro`
- `/ressources/` — `src/pages/ressources.astro`
- `/contact/` — `src/pages/contact.astro`
- `/audit-gratuit/` — `src/pages/audit-gratuit.astro`
- `/tarifs/` — `src/pages/tarifs.astro`
- `/faq/` — `src/pages/faq.astro`

### Services et solutions détaillés

- `/creation-site-web/` — `src/pages/creation-site-web.astro`
- `/seo/` — `src/pages/seo.astro`
- `/referencement-ia/` — `src/pages/referencement-ia.astro`
- `/google-ads/` — `src/pages/google-ads.astro`
- `/social-ads/` — `src/pages/social-ads.astro`
- `/reseaux-sociaux/` — `src/pages/reseaux-sociaux.astro`
- `/creation-contenu/` — `src/pages/creation-contenu.astro`
- `/automatisation/` — `src/pages/automatisation.astro`
- `/intelligence-artificielle/` — `src/pages/intelligence-artificielle.astro`
- `/email-marketing-crm/` — `src/pages/email-marketing-crm.astro`
- `/branding/` — `src/pages/branding.astro`

### Secteurs

- `/secteurs/` et six pages ciblées : `src/pages/secteurs/index.astro`, `pme.astro`, `artisans.astro`, `independants.astro`, `immobilier.astro`, `ecommerce.astro`, `services-professionnels.astro`.

### Éditorial et études de cas

- `/blog/` — `src/pages/blog/index.astro`.
- `/blog/[...id]/` — `src/pages/blog/[...id].astro`, pré-rendu depuis cinq fichiers de `src/content/blog/`.
- `/realisations/[slug]/` — `src/pages/realisations/[slug].astro`, alimenté par `src/data/case-studies.ts`. Le tableau étant vide, aucune étude de cas détaillée ne peut actuellement être générée.

### Serveur et légal

- `POST /api/contact` — `src/pages/api/contact.ts` : validation, honeypot, limitation en mémoire, SMTP et réponses JSON.
- `GET /api/health` — `src/pages/api/health.ts` : santé runtime avec `X-Robots-Tag: noindex`.
- `/mentions-legales/`, `/politique-de-confidentialite/`, `/404/` — fichiers homonymes dans `src/pages/`.

La structure de routes possède une valeur SEO réelle. Aucune suppression ou fusion de route n'est justifiée en PHASE 00.

## 4. Composants homepage

Ordre réel dans `src/pages/index.astro` :

1. `src/components/home/HomeHero.astro` — promesse PME, CTA, démonstration du système connecté, mesh OGL/SVG.
2. `src/components/home/HomeSystem.astro` et `HomeSystemVisual.astro` — quatre piliers et narration scrollée.
3. `src/components/home/HomeExpertise.astro` — quatre expertises avec visualisations dédiées.
4. `src/components/home/HomeMethod.astro` — méthode en quatre étapes.
5. Bande sectorielle inline dans `src/pages/index.astro` — segments accompagnés.
6. `src/components/home/HomeWork.astro` — deux réalisations éditorialisées.
7. `src/components/home/HomeFAQ.astro` — accordéon natif `<details>`.
8. `src/components/home/HomeCTA.astro` — conversion finale.

Points forts : composants sémantiques, `aria-labelledby`, CTA accessibles, images via `astro:assets`, visuels décoratifs masqués avec `aria-hidden`, FAQ native et scènes clairement séparées.

Écarts éditoriaux :

- Le hero de `src/components/home/HomeHero.astro` est déjà centré PME/Suisse romande, mais sa promesse et ses CTA ne correspondent pas encore au texte maître.
- La logique « problème → promesse » n'a pas de section autonome entre le hero et le système dans `src/pages/index.astro`.
- La spécialisation PME n'est qu'une bande de secteurs ; elle ne porte pas encore le message « extension de votre équipe ».
- `src/components/home/HomeExpertise.astro` expose quatre compétences, mais le titre « Quatre savoir-faire. Quatre mouvements distincts. » met encore le dispositif créatif avant le bénéfice.
- `src/components/home/HomeMethod.astro` possède une excellente structure en quatre étapes. Conserver quatre étapes et intégrer « clarifier » dans le diagnostic est l'option la moins risquée.
- `src/components/home/HomeWork.astro` contient des résultats qualitatifs, sans chiffres inventés, mais ses liens pointent vers la liste générale plutôt que vers des études détaillées inexistantes.
- L'IA est présente dans le hero et les services, mais aucune section homepage n'explicite encore le cadre « objectif métier, données, validation humaine, sécurité, mesure ».

## 5. Scripts motion

### Orchestration actuelle

- `src/scripts/home-premium.ts` est importé une fois par `src/pages/index.astro`. Il anime la progression de la méthode et tente une révélation de `[data-work-media]`.
- `src/scripts/hero-motion.ts` gère la timeline narrative du hero, le scrub, les effets pointeur, Lenis et le cleanup.
- `src/scripts/home-system-motion.ts` pilote les quatre états du système et leurs versions desktop/mobile/reduced motion.
- `src/scripts/home-expertise-motion.ts` possède quatre timelines SVG, interactions pointeur et cleanup.
- `src/scripts/home-work-motion.ts` gère reveals, scrub, profondeur et interactions pointeur des réalisations.
- `src/scripts/scroll-motion.ts` expose un helper de reveal, mais aucun import n'a été trouvé.
- `src/scripts/visuals/svg-motion.ts` mutualise les reveals des visualisations génériques.
- `src/scripts/immersive-mesh.ts` et `src/scripts/visuals/ai-field.ts` gèrent OGL avec import dynamique et fallback.

### Lifecycle et reduced motion

Les scripts principaux utilisent `gsap.context()`, `gsap.matchMedia()`, `astro:before-swap`, la destruction des observers/listeners et le kill des ScrollTriggers locaux. `src/scripts/immersive-mesh.ts` détruit aussi RAF, buffers, programme GL et observers. C'est une base à conserver.

Chaque grande scène réimplémente cependant les mêmes primitives : enregistrement ScrollTrigger, `gsap.context`, `matchMedia`, tableau de removers et handler `astro:before-swap`. Cette duplication justifie un petit core progressif, pas une migration big-bang.

Risque concret : `src/scripts/home-premium.ts` cible `[data-work-media]`, absent de `src/components/home/HomeWork.astro`; la timeline est donc probablement un reliquat. Il centralise aussi une partie de la méthode sans lifecycle propre, contrairement aux autres scènes.

Les durées/easings sont nombreuses et dispersées (`.08`, `.22`, `.35`, `.65`, `1.15`, `2.7`, `power2.out`, `power3.out`, `back.out(...)`, etc.). Certaines variations sont narratives, mais l'absence de tokens rend leur intention difficile à maintenir.

## 6. Architecture CSS

### Chargement global

- `src/layouts/Layout.astro` importe `src/styles/global.css`.
- `src/styles/global.css` contient tokens de couleur, espace, rayons, transitions, z-index, typographie, composants génériques et responsive.
- 49 blocs `<style>` locaux sont présents dans les pages, layouts et composants. Ce choix est compatible avec Astro et souvent pertinent pour les composants isolés.

### Homepage

`src/pages/index.astro` charge successivement :

1. `src/styles/home.css` (environ 24 Ko) ;
2. `src/styles/home-v2.css` (environ 10 Ko) ;
3. `src/styles/home-v3.css` (environ 6 Ko).

Les composants ajoutent ensuite :

- `src/styles/hero-premium.css` (environ 14 Ko) ;
- `src/styles/home-system-immersive.css` (environ 8 Ko) ;
- `src/styles/home-expertise-immersive.css` (environ 10 Ko) ;
- `src/styles/home-work-editorial.css` (environ 10 Ko).

`src/styles/home-motion.css` existe mais aucun import n'a été trouvé.

La cascade repose donc sur des générations successives et des overrides. `home.css` contient encore les anciennes familles `.home-hero__*`, `.home-system-map*`, `.home-expertise-card*` et `.home-work-project*`, alors que les composants actuels utilisent surtout `.hero-product*`, `.system-visual*`, `.expertise-editorial*` et `.work-scene*`. Une partie reste néanmoins partagée (`.home-section`, `.home-section-head`, `.home-method`, `.home-cta`, bande sectorielle) : le fichier ne peut pas être supprimé en bloc.

Le CSS contient des effets coûteux ciblés (`backdrop-filter`, blur, grandes ombres, masques, clip-path et animations infinies). Les principaux fallbacks reduced motion existent, mais la bande mobile `.home-sector-band .container` animée dans `src/styles/home.css` n'est pas explicitement neutralisée dans le media reduced-motion du même fichier.

## 7. SEO

### Fondations présentes

- `src/layouts/Layout.astro` gère title, description, robots, canonical normalisé avec slash final, Open Graph, Twitter Card, langue `fr-CH` et image sociale.
- `astro.config.mjs` définit le domaine canonique et génère le sitemap.
- `public/robots.txt` autorise le crawl et référence `https://clicom.ch/sitemap-index.xml`.
- Les routes principales possèdent des titles spécifiques ; les pages commerciales injectent leurs propres contenus via `src/components/CommercialPage.astro`.
- Le H1 homepage et son title ciblent déjà « PME » et « Suisse romande » dans `src/components/home/HomeHero.astro` et `src/pages/index.astro`.
- Les routes historiques de services et secteurs créent un maillage sémantique utile à préserver.

### Limites

- Le dictionnaire de descriptions de `src/layouts/Layout.astro` ne couvre que sept routes ; les autres dépendent de props ou du fallback global.
- Le type Open Graph est toujours `website`, y compris pour les articles de `src/layouts/BlogPost.astro`.
- `src/layouts/BlogPost.astro` n'injecte pas `Article`, date de publication, auteur ou breadcrumb structurés.
- Aucun `BreadcrumbList` n'a été trouvé sur les pages profondes.
- Le contenu FAQ existe dans `src/components/home/HomeFAQ.astro` et `src/pages/faq.astro`, sans JSON-LD `FAQPage`. Son ajout ne serait justifié qu'après validation de conformité et stricte correspondance au contenu visible.
- Les routes locales sont sectorielles, pas géographiques. Aucune ferme de pages ville n'existe, ce qui est positif.

## 8. Données structurées

- La homepage définit un graphe dans `src/pages/index.astro` avec `Organization`, `ProfessionalService` et `WebSite`.
- `src/layouts/Layout.astro` accepte un objet ou tableau `structuredData` et l'injecte en JSON-LD.
- Les champs publiés restent sobres : nom, URL, e-mail, téléphone, zone servie et types de services. Aucun résultat client ou avis inventé n'a été trouvé.
- Aucun schéma `Article`, `BreadcrumbList`, `FAQPage` ou `Service` n'a été trouvé ailleurs.

Opportunité : conserver le graphe organisationnel comme source stable, puis enrichir par type de page dans une phase SEO dédiée, sans dupliquer des données divergentes.

## 9. Contenu actuel

### KEEP

- Positionnement PME/Suisse romande déjà visible dans `src/pages/index.astro`, `src/components/home/HomeHero.astro` et `src/pages/secteurs/pme.astro`.
- Logique de système connecté et quatre piliers dans `src/components/home/HomeSystem.astro`.
- Angle « comprendre avant de vendre un canal » dans `src/components/home/HomeMethod.astro`.
- Offre d'entrée existante dans `src/pages/audit-gratuit.astro`, déjà cadrée sans promesse chiffrée excessive.
- Contenus SEO détaillés des routes commerciales dans `src/pages/*.astro` et `src/components/CommercialPage.astro`.
- Cinq articles sources dans `src/content/blog/`, notamment SEO PME, arbitrage SEO/Ads, conversion et visibilité IA.
- Clause d'intégrité des preuves dans `src/data/case-studies.ts` et tableau vide tant que les données ne sont pas validées.

### REWRITE

- Hero dans `src/components/home/HomeHero.astro` : aligner promesse, texte, CTA et réassurance sur le Master Prompt tout en préservant la scène.
- Intro système dans `src/components/home/HomeSystem.astro` : renforcer « un seul partenaire » et les quatre bénéfices.
- Intro expertise dans `src/components/home/HomeExpertise.astro` : passer de la démonstration de savoir-faire à l'activation selon les priorités.
- CTA final dans `src/components/home/HomeCTA.astro` et CTA génériques dans `src/components/CTA.astro`/`src/components/Footer.astro` : converger vers le petit système de formulations demandé.

### MOVE / MERGE

- Transformer la bande sectorielle inline de `src/pages/index.astro` en vraie section de spécialisation PME ou la rattacher à une section dédiée, sans perdre les liens sectoriels.
- Fusionner « clarifier » dans la première étape de `src/components/home/HomeMethod.astro` plutôt que d'ajouter une cinquième scène.
- Réutiliser le fond éditorial de `src/pages/audit-gratuit.astro` pour présenter le Diagnostic CliCom, après validation commerciale du nom et sans figer durée/livrables.

### DELETE

Aucune suppression de contenu n'est justifiée avant inventaire SEO page par page et mesure des imports/sélecteurs réellement utilisés. Les candidats techniques figurent en section 16.

## 10. Problèmes détectés

1. Cascade homepage difficile à raisonner entre `src/styles/home.css`, `home-v2.css`, `home-v3.css` et les feuilles spécialisées.
2. Absence de section « problème » et de section de spécialisation PME dans `src/pages/index.astro` malgré une narration déjà forte.
3. Infrastructure motion répliquée dans `src/scripts/hero-motion.ts`, `home-system-motion.ts`, `home-expertise-motion.ts` et `home-work-motion.ts`.
4. Sélecteur probablement mort `[data-work-media]` dans `src/scripts/home-premium.ts`.
5. `src/scripts/scroll-motion.ts` et `src/styles/home-motion.css` sans consommateur trouvé.
6. Animation mobile continue de la bande sectorielle dans `src/styles/home.css` sans fallback reduced-motion explicite.
7. Lenis est lié au hero dans `src/scripts/hero-motion.ts` plutôt qu'à une infrastructure de page, ce qui couple le smooth scroll à un composant éditorial.
8. Les études de cas détaillées ne peuvent pas soutenir la preuve commerciale car `src/data/case-studies.ts` est vide ; la prudence actuelle reste préférable à des données inventées.
9. Données structurées limitées à la homepage dans `src/pages/index.astro`.
10. Une grande partie du CSS/pages est fortement compactée sur une ligne, notamment plusieurs pages et `src/styles/home.css`, ce qui complique revue, blame et consolidation ciblée.
11. Les composants de conversion `src/components/conversion/ConversionHub.astro`, `CookieBanner.astro`, `WhatsAppButton.astro`, `ChatbotWidget.astro`, `ExitPopup.astro` et `ScrollPopup.astro` ne sont pas montés depuis le layout ou les pages selon la recherche d'imports ; ils forment un sous-système dormant distinct de `CalendlyButton.astro`.

## 11. Duplications

- Lifecycle GSAP/ScrollTrigger et nettoyage répétés dans quatre scripts `src/scripts/home-*-motion.ts`/`hero-motion.ts`.
- Helpers locaux de listeners/removers répétés dans `src/scripts/hero-motion.ts`, `home-expertise-motion.ts` et `home-work-motion.ts`.
- Breakpoints 960/961 px et requêtes reduced-motion répétés sans constantes partagées.
- Durées/easings codés en dur dans scripts et CSS, sans tokens motion communs.
- Styles de sections homepage anciens et nouveaux cohabitent dans `src/styles/home.css` et les feuilles `*-immersive.css`/`*-editorial.css`.
- CTA similaires répartis entre `src/components/Button.astro`, `CTA.astro`, `HomeCTA.astro`, `PageHero.astro`, `Footer.astro` et `CalendlyButton.astro`.
- Données de contact et formulations d'audit répétées entre `src/pages/contact.astro`, `src/pages/audit-gratuit.astro`, `src/components/Footer.astro` et certaines métadonnées.
- Les animations SVG génériques sont partiellement mutualisées dans `src/scripts/visuals/svg-motion.ts`, tandis que les scènes homepage recréent des patterns proches. Cette duplication est parfois légitime car la narration diffère.

## 12. Risques de régression

- Supprimer `src/styles/home.css` casserait les primitives partagées, la méthode, le CTA et la bande sectorielle, même si de nombreux sélecteurs semblent anciens.
- Réordonner les imports de `src/pages/index.astro` modifierait la cascade et pourrait révéler des styles legacy.
- Refactorer simultanément CSS, DOM et timelines casserait les sélecteurs `data-*` utilisés par GSAP.
- Déplacer Lenis sans vérifier le comportement de toutes les routes pourrait changer le scroll global et ScrollTrigger.
- Activer des View Transitions Astro modifierait le lifecycle effectif de tous les scripts ; aujourd'hui les pages semblent rechargées classiquement.
- Passer la méthode à cinq étapes augmenterait la densité mobile et obligerait à recalibrer la progression de `src/scripts/home-premium.ts`.
- Ajouter des pages locales génériques diluerait le contenu et créerait un risque SEO de duplication.
- Peupler `src/data/case-studies.ts` sans source vérifiable violerait la règle de preuve et exposerait des claims non défendables.
- Modifier routes/canonical sans plan de redirections ferait perdre le capital SEO existant.
- Une consolidation WebGL mal conduite pourrait supprimer les fallbacks SVG accessibles de `src/components/visuals/ImmersiveMesh.astro` et `AIField.astro`.

## 13. Opportunités

- Ajouter la section problème et la spécialisation PME en réutilisant les primitives de layout et le vocabulaire visuel existants.
- Conserver quatre étapes de méthode et reformuler la première en « Comprendre et clarifier ».
- Extraire un core motion minimal : enregistrement GSAP, contexte local, media queries, listeners et cleanup Astro.
- Créer des tokens motion issus des valeurs réellement dominantes avant toute normalisation.
- Consolider le CSS scène par scène avec vérification visuelle, en commençant par isoler les sélecteurs effectivement utilisés.
- Faire du Diagnostic CliCom une porte d'entrée à partir de `src/pages/audit-gratuit.astro`, sous réserve de validation commerciale.
- Enrichir progressivement les métadonnées `Article`, breadcrumbs et services à partir de données existantes.
- Transformer les deux réalisations homepage en études de cas uniquement lorsque problème, approche, solution et résultat sont documentés.
- Préserver OGL comme signature subtile du hero ; son import dynamique, ses limites DPR et son arrêt hors viewport sont déjà bien conçus.
- Monter ou retirer proprement le sous-système de conversion dormant après décision produit et audit consentement, plutôt que de le laisser dériver.

## 14. Fichiers à conserver

- `astro.config.mjs` — architecture SSR conforme.
- `src/layouts/Layout.astro` — socle SEO/accessibilité global.
- `src/middleware.ts` — sécurité HTTP.
- `src/pages/api/contact.ts` et `src/pages/api/health.ts` — fonctions serveur utiles.
- `src/components/home/HomeHero.astro`, `HomeSystem.astro`, `HomeSystemVisual.astro`, `HomeExpertise.astro`, `HomeMethod.astro`, `HomeWork.astro`, `HomeFAQ.astro`, `HomeCTA.astro` — architecture narrative à faire évoluer, pas à reconstruire.
- `src/scripts/hero-motion.ts`, `home-system-motion.ts`, `home-expertise-motion.ts`, `home-work-motion.ts` — motion métier à préserver puis consolider.
- `src/scripts/immersive-mesh.ts` et `src/components/visuals/ImmersiveMesh.astro` — signature WebGL avec fallback.
- `src/scripts/visuals/svg-motion.ts` et `src/components/visuals/` — langage SVG partagé.
- `src/styles/global.css` — design system existant.
- `src/content.config.ts` et `src/content/blog/` — socle éditorial.
- `src/data/case-studies.ts` — contrat de données prudent et bien structuré.
- Toutes les routes commerciales et sectorielles de `src/pages/` tant qu'un audit SEO n'établit pas une migration sûre.

## 15. Fichiers à consolider

- `src/styles/home.css`, `src/styles/home-v2.css`, `src/styles/home-v3.css` — établir d'abord une matrice sélecteur/composant, puis migrer sans créer `home-v4.css`.
- `src/styles/hero-premium.css`, `home-system-immersive.css`, `home-expertise-immersive.css`, `home-work-editorial.css` — devenir progressivement les propriétaires explicites de leurs scènes.
- `src/scripts/hero-motion.ts`, `home-system-motion.ts`, `home-expertise-motion.ts`, `home-work-motion.ts` — partager uniquement l'infrastructure, garder les timelines narratives locales.
- `src/scripts/home-premium.ts` — séparer la méthode du reliquat work et lui ajouter un lifecycle cohérent.
- `src/components/CTA.astro`, `src/components/home/HomeCTA.astro`, `src/components/PageHero.astro`, `src/components/Footer.astro` — harmoniser les libellés sans imposer un composant unique trop abstrait.
- `src/layouts/Layout.astro` et les pages profondes — centraliser les helpers SEO/structured data seulement si cela évite des divergences.

## 16. Fichiers éventuellement obsolètes

Ces fichiers sont des candidats à confirmer par mesure et tests ; aucune suppression n'est autorisée sur le seul fondement de cet audit.

- `src/styles/home-motion.css` — aucun import trouvé.
- `src/scripts/scroll-motion.ts` — aucun import trouvé.
- Partie `[data-work-media]` de `src/scripts/home-premium.ts` — cible absente du composant work actuel.
- Blocs legacy `.home-hero__*`, `.home-system-map*`, `.home-expertise-card*`, `.home-work-project*` dans `src/styles/home.css` — plusieurs semblent remplacés par les variantes premium/immersive/editorial, mais le fichier contient aussi des styles actifs.
- `src/components/conversion/ConversionHub.astro` et ses widgets exclusifs (`CookieBanner.astro`, `WhatsAppButton.astro`, `ChatbotWidget.astro`, `ExitPopup.astro`, `ScrollPopup.astro`) — aucun montage trouvé. Ne pas confondre avec `CalendlyButton.astro`, activement utilisé.

## 17. Plan de migration

### Phase 01 — fondation technique, incrémentale

1. Établir une baseline visuelle desktop/mobile/reduced-motion et un inventaire des sélecteurs homepage réellement utilisés.
2. Créer `src/scripts/motion/tokens.ts` à partir des valeurs récurrentes constatées, sans réécrire les timelines.
3. Créer un helper lifecycle minimal pour `gsap.context`, `gsap.matchMedia`, listeners et `astro:before-swap`.
4. Migrer une seule scène pilote, recommandée : `src/scripts/home-system-motion.ts`, puis valider.
5. Nettoyer `src/scripts/home-premium.ts` après preuve que `[data-work-media]` est mort.
6. Neutraliser explicitement les mouvements continus oubliés en reduced motion, notamment la bande sectorielle mobile.
7. Commencer la consolidation CSS par cartographie, puis déplacer uniquement les règles actives de chaque scène vers sa feuille propriétaire.

### Phase 02 — homepage rédactionnelle

1. Réécrire le hero sans modifier sa structure motion.
2. Ajouter une section problème légère entre hero et système.
3. Repositionner le système, l'expertise et le CTA avec le vocabulaire « trouvé, choisi, recontacté, gagner du temps ».
4. Transformer la bande sectorielle en section PME différenciante ou l'intégrer à une nouvelle section dédiée.
5. Conserver quatre étapes de méthode avec « clarifier » intégré à l'étape 1.
6. Ajouter le cadre IA responsable dans la section la plus cohérente, sans scène spectaculaire supplémentaire.

### Phases suivantes

- Raffinement motion scène par scène, puis services, études de cas, secteurs, SEO, performance et accessibilité selon le Prompt 00.
- Chaque phase doit conserver les routes, comparer desktop/mobile/reduced-motion et exécuter les scripts réellement disponibles (`npm run check`, `npm run validate` ou `npm run build` selon le périmètre).

## 18. Ordre recommandé des prochaines étapes

1. Valider cet audit et le périmètre exact de la PHASE 01.
2. Capturer une baseline de la homepage actuelle sans modifier le design.
3. Introduire motion tokens et lifecycle minimal.
4. Corriger les reliquats démontrés (`[data-work-media]`, imports sans consommateur) un par un.
5. Consolider le CSS du système, puis expertise, work et hero ; ne pas toucher simultanément toutes les scènes.
6. Traiter la homepage éditoriale seulement après stabilisation technique.
7. Reporter routes, études de cas et données structurées à leurs phases dédiées.

## Validation de la PHASE 00

- Aucun fichier applicatif modifié.
- Aucun package ajouté ou supprimé.
- Aucune route, donnée, animation ou configuration modifiée.
- Aucun build relancé : les faits déjà validés du projet ont été respectés et le livrable est exclusivement documentaire.
