# CLICOM — Manifest technique de la refonte

> Document de référence pour la branche `refonte-complete`.
>
> Ce manifeste définit les choix techniques, les invariants, les standards de qualité et l'ordre de migration de la refonte complète du site CLICOM. Toute décision d'implémentation doit rester cohérente avec ce document, sauf évolution explicitement documentée.

## 1. Objectif

La refonte ne consiste pas à appliquer un nouveau thème au site existant. Elle doit produire un site commercial plus clair, plus rapide, plus crédible, plus maintenable et plus performant en acquisition.

Le résultat cible doit :

- clarifier immédiatement la proposition de valeur de CLICOM ;
- transformer la navigation en architecture commerciale cohérente ;
- donner une vraie hiérarchie aux offres ;
- améliorer le parcours visiteur → preuve → offre → conversion ;
- réduire le bruit visuel et les effets décoratifs sans fonction ;
- maintenir une excellente base SEO technique ;
- limiter le JavaScript aux interactions qui en ont réellement besoin ;
- garantir une expérience accessible au clavier et avec préférences de mouvement réduit ;
- rendre le tracking explicite, contrôlable et cohérent avec le consentement ;
- rendre le projet testable et déployable de façon reproductible.

## 2. Stack de référence

La refonte conserve la stack principale existante :

- Astro 7 ;
- TypeScript ;
- Node.js 22+ ;
- adaptateur `@astrojs/node` en mode standalone ;
- CSS natif ;
- Astro Content Collections pour le contenu éditorial structuré ;
- `@astrojs/sitemap` pour le sitemap ;
- `nodemailer` pour le formulaire de contact ;
- GSAP uniquement pour les animations à forte valeur visuelle ;
- Lenis uniquement si son apport UX reste mesurable et sans dégrader accessibilité/performance.

### Décision structurante

Aucun framework client supplémentaire (React, Vue, Svelte, etc.) ne sera introduit sans besoin fonctionnel démontré.

Astro reste la couche principale de rendu. Les interactions doivent privilégier :

1. HTML sémantique ;
2. CSS ;
3. JavaScript natif / TypeScript ;
4. bibliothèque d'animation seulement lorsque nécessaire.

## 3. Principes non négociables

### 3.1 Astro-first

Le HTML utile doit être rendu côté serveur ou au build. Aucun contenu commercial ou SEO essentiel ne doit dépendre d'un rendu client.

### 3.2 Progressive enhancement

Une page doit rester lisible, navigable et compréhensible si les animations ou scripts non essentiels ne s'exécutent pas.

### 3.3 Une fonction = une responsabilité

Les composants ne doivent pas devenir des mini-applications génériques pilotées par des dizaines de props.

Les primitives visuelles, composants métier, sections de page et scripts d'interaction doivent rester séparés.

### 3.4 Pas de duplication éditoriale silencieuse

Les mêmes informations de service, CTA, coordonnées, labels, métadonnées ou données structurées ne doivent pas être recopiées arbitrairement dans plusieurs fichiers lorsque ces informations peuvent avoir une source unique.

### 3.5 Performance par défaut

Chaque dépendance, animation, script global et image above-the-fold doit justifier son coût.

### 3.6 Accessibilité par construction

L'accessibilité n'est pas une passe de correction finale. Navigation clavier, focus, contraste, structure des titres, libellés, dialogues et réduction du mouvement font partie de la définition même des composants.

### 3.7 Consentement explicite

Aucun mécanisme de tracking non essentiel ne doit contourner ou ignorer les choix de consentement de l'utilisateur.

### 3.8 Pas de régression SEO par refonte

Une URL existante ayant une valeur d'indexation ne doit jamais disparaître sans décision explicite : conservation, consolidation ou redirection permanente documentée.

## 4. Architecture cible du code

La structure cible doit tendre vers :

```text
src/
├── assets/
│   ├── brand/
│   ├── editorial/
│   └── icons/
├── components/
│   ├── ui/              # primitives : Button, Container, Badge, Icon...
│   ├── layout/          # Header, Footer, navigation, shell...
│   ├── sections/        # Hero, Proof, ServicesGrid, CTA...
│   ├── forms/           # champs et formulaires
│   ├── consent/         # bannière et préférences
│   └── conversion/      # widgets réellement conservés
├── content/
│   ├── blog/
│   └── ...
├── data/
│   ├── navigation.ts
│   ├── services.ts
│   ├── company.ts
│   └── seo.ts
├── layouts/
│   ├── BaseLayout.astro
│   ├── MarketingLayout.astro
│   └── ArticleLayout.astro
├── lib/
│   ├── analytics/
│   ├── seo/
│   ├── security/
│   └── validation/
├── pages/
├── scripts/
├── styles/
│   ├── tokens.css
│   ├── reset.css
│   ├── base.css
│   ├── utilities.css
│   └── motion.css
└── types/
```

Cette arborescence est une cible de responsabilité, pas une obligation de déplacer mécaniquement chaque fichier dès le premier commit.

## 5. Architecture de contenu et navigation

La refonte doit distinguer clairement :

- les pages d'entrée commerciales ;
- les pages de services ;
- les pages de preuve / expertise ;
- les contenus éditoriaux ;
- les pages de conversion ;
- les pages légales.

### Services principaux

Les offres doivent disposer d'une destination explicite et ne plus partager artificiellement une URL lorsque leur intention de recherche et leur promesse diffèrent.

Architecture minimale attendue :

- `/services/` — vue d'ensemble ;
- `/seo/` — référencement naturel ;
- `/referencement-ia/` — visibilité dans les moteurs et assistants IA ;
- `/google-ads/` — acquisition Google Ads ;
- `/social-ads/` — publicité Meta / LinkedIn / TikTok ;
- `/reseaux-sociaux/` — accompagnement organique social.

Les autres routes existantes seront évaluées une à une selon leur valeur commerciale et SEO.

### Règle de maillage

Une page de service importante doit être accessible depuis au moins un élément de navigation ou une page hub pertinente, et bénéficier de liens contextuels depuis les contenus connexes.

Les pages stratégiques ne doivent pas dépendre uniquement du sitemap pour être découvertes.

## 6. Design system

Le design system doit être porté par des tokens CSS et non par une accumulation de valeurs ponctuelles.

### Familles de tokens

```css
:root {
  /* color */
  --color-bg: ...;
  --color-surface: ...;
  --color-text: ...;
  --color-muted: ...;
  --color-border: ...;
  --color-accent: ...;

  /* typography */
  --font-sans: ...;
  --text-xs: ...;
  --text-sm: ...;
  --text-base: ...;
  --text-lg: ...;
  --text-xl: ...;

  /* spacing */
  --space-1: ...;
  --space-2: ...;
  --space-3: ...;

  /* geometry */
  --radius-sm: ...;
  --radius-md: ...;
  --radius-lg: ...;
  --container: ...;

  /* motion */
  --duration-fast: ...;
  --duration-base: ...;
  --ease-standard: ...;
}
```

Les valeurs définitives seront choisies lors de la construction visuelle. Le principe est plus important que les valeurs provisoires.

### Règles

- une seule échelle typographique cohérente ;
- une seule logique de conteneur ;
- espacement basé sur une échelle limitée ;
- rayons, ombres et bordures normalisés ;
- CTA primaires et secondaires clairement distingués ;
- composants interactifs avec états `hover`, `focus-visible`, `active` et `disabled` ;
- pas de couleurs codées en dur répétées dans les composants.

## 7. Responsive

La conception est mobile-first.

Les breakpoints répondent à un besoin de layout, pas à une liste de modèles de téléphones.

Aucun composant ne doit dépendre d'une largeur fixe qui provoque :

- débordement horizontal ;
- texte tronqué ;
- CTA inaccessible ;
- grille illisible ;
- navigation cassée.

Les tailles de texte et espacements peuvent utiliser `clamp()` lorsque cela améliore la continuité entre tailles d'écran.

## 8. JavaScript client

### Règle générale

Pas de script global si le comportement ne concerne pas l'ensemble du site.

Un script doit être chargé au plus près de son besoin et doit :

- tolérer l'absence du DOM attendu ;
- éviter les listeners dupliqués ;
- nettoyer les effets persistants lorsque nécessaire ;
- respecter `prefers-reduced-motion` pour les mouvements non essentiels ;
- ne pas bloquer le rendu initial.

### Animations

GSAP n'est pas une primitive de mise en page.

Il est réservé aux animations qui nécessitent une timeline, une orchestration ou une interaction que CSS ne traite pas proprement.

Les animations doivent améliorer la compréhension, la hiérarchie ou la perception de qualité. Une animation purement décorative qui dégrade la lecture ou les Core Web Vitals doit être supprimée.

### Scroll

Lenis sera réévalué pendant la refonte. Il n'est conservé que si :

- il n'altère pas le comportement natif attendu ;
- il respecte le mouvement réduit ;
- il ne détériore pas l'accessibilité ;
- son coût JS est justifié par une différence UX réelle.

## 9. Budget de performance

Objectif : produire une interface visuellement premium sans dépendre d'un bundle client lourd.

### Budgets indicatifs

Sur les pages commerciales principales :

- zéro framework client hydraté par défaut ;
- JavaScript initial non essentiel réduit au strict minimum ;
- aucune vidéo lourde en autoplay above-the-fold sans stratégie dédiée ;
- images responsives avec dimensions connues ;
- formats modernes AVIF/WebP via le pipeline Astro quand pertinent ;
- lazy loading hors contenu critique ;
- polices limitées en variantes et chargées sans blocage évitable.

Les chiffres finaux seront validés avec Lighthouse / navigateur après implémentation, pas supposés depuis le code source seul.

## 10. Images

Les images éditoriales doivent passer par les composants images Astro lorsque possible.

Chaque image doit définir :

- texte alternatif utile, ou `alt=""` si réellement décorative ;
- dimensions / ratio connus pour éviter les décalages de mise en page ;
- tailles responsive adaptées au conteneur ;
- priorité explicite uniquement pour les images critiques du premier viewport.

Les fichiers source lourds ne doivent pas conduire automatiquement à livrer des fichiers lourds au navigateur.

## 11. SEO technique

Le layout de base doit centraliser :

- `title` ;
- meta description ;
- canonical ;
- robots ;
- Open Graph ;
- Twitter cards ;
- données structurées ;
- langue et locale.

### Règles de contenu

- un seul `h1` principal par page commerciale ;
- hiérarchie `h2` / `h3` sémantique ;
- liens descriptifs ;
- titres et descriptions spécifiques à l'intention de chaque page ;
- aucune page stratégique laissée sans maillage interne ;
- données structurées uniquement lorsqu'elles correspondent au contenu réellement visible.

### Migration des URL

Avant toute suppression ou fusion de route :

1. inventorier l'URL actuelle ;
2. déterminer sa valeur SEO et ses liens entrants internes ;
3. choisir conserver / fusionner / rediriger ;
4. documenter la destination ;
5. éviter toute chaîne de redirections.

## 12. Tracking et consentement

Le système de consentement doit devenir une couche technique explicite, pas uniquement une bannière UI.

### Catégories

- `essential` : toujours actif ;
- `analytics` : mesure d'audience ;
- `marketing` : publicité / remarketing.

### Comportement attendu

Avant consentement :

- stockage analytics refusé ;
- stockage publicitaire refusé ;
- aucune instrumentation custom analytics non essentielle.

Après choix :

- mise à jour explicite de l'état de consentement ;
- chargement des scripts uniquement selon la stratégie décidée ;
- propagation distincte des consentements analytics et marketing ;
- révocation prise en compte sans rechargement obligatoire de la page.

Si GTM est conservé, son initialisation devra être compatible avec un état par défaut refusé et avec les mises à jour de consentement. Le simple fait de ne plus émettre nos événements custom après révocation n'est pas suffisant comme architecture de consentement.

Le code applicatif ne doit pas supposer que la configuration externe du conteneur GTM corrigera une incohérence locale.

## 13. Conversion

La conversion doit être intégrée au parcours plutôt qu'empilée sous forme de widgets simultanés.

Chaque mécanisme sera réévalué :

- CTA principal ;
- formulaire ;
- Calendly ;
- WhatsApp ;
- chatbot ;
- exit popup ;
- autres popups éventuels.

### Principe

À un instant donné, l'interface ne doit pas mettre plusieurs appels à l'action concurrents au même niveau de priorité.

Les widgets globaux seront supprimés, différés ou contextualisés s'ils :

- masquent du contenu ;
- se concurrencent ;
- augmentent la charge cognitive ;
- dégradent l'expérience mobile ;
- n'apportent pas de valeur mesurable.

## 14. Formulaires et API

Le formulaire de contact conserve une validation serveur stricte.

### Invariants sécurité

- taille maximale de requête ;
- `Content-Type` attendu ;
- normalisation / validation des champs ;
- échappement dans les emails HTML ;
- honeypot ou mécanisme équivalent ;
- aucune variable SMTP exposée au client ;
- réponses d'erreur ne révélant pas de secret technique.

### Rate limiting

Le rate limiter en mémoire peut être utilisé comme protection locale minimale, mais ne doit pas être présenté comme une protection distribuée.

La cible production doit prévoir une stratégie compatible avec plusieurs processus / instances lorsque l'infrastructure le nécessite.

Même en mémoire, la structure locale doit disposer d'une politique de nettoyage et d'une borne réelle afin d'éviter une croissance incontrôlée.

## 15. Sécurité frontend

### `set:html`

`set:html` est considéré comme une frontière de confiance.

Il n'est acceptable que pour :

- données statiques contrôlées dans le repository ;
- contenu explicitement assaini ;
- sérialisation structurée conçue pour cet usage.

Aucune donnée utilisateur, CMS non assainie ou donnée distante non fiable ne doit y être injectée directement.

### CSP

Une Content Security Policy sera étudiée pendant la refonte en fonction des ressources réellement conservées : GTM, Calendly, polices, images et éventuels scripts tiers.

La CSP ne doit pas être ajoutée sous forme de politique théorique qui casse silencieusement les intégrations ; elle devra être testée sur le build réel.

## 16. Accessibilité

Cible minimale : WCAG 2.2 AA sur les parcours essentiels.

### Exigences composants

- navigation entièrement au clavier ;
- focus visible ;
- ordre de focus cohérent ;
- labels de formulaire explicites ;
- erreurs reliées aux champs concernés ;
- contrastes suffisants ;
- contrôles avec zone tactile suffisante ;
- menus mobiles avec état accessible ;
- aucune information transmise uniquement par la couleur ;
- pas de mouvement essentiel imposé aux utilisateurs ayant demandé sa réduction.

### Dialogues

Un composant annoncé comme modal doit réellement se comporter comme modal :

- focus déplacé à l'ouverture ;
- focus contenu dans le dialogue pendant son ouverture ;
- `Escape` ferme lorsque pertinent ;
- focus restauré à la fermeture ;
- arrière-plan non annoncé comme interactif si la modale le bloque.

Une bannière de consentement qui laisse la page utilisable ne doit pas prétendre être une modale.

## 17. Données et configuration

Les données stables partagées doivent être sorties des composants lorsque cela réduit la duplication :

- navigation ;
- services ;
- informations de société ;
- réseaux sociaux ;
- CTA standards ;
- configuration SEO partagée.

Les secrets restent exclusivement dans les variables d'environnement serveur.

Les variables publiques doivent être explicitement préfixées et traitées comme visibles par tous.

## 18. Qualité TypeScript

Le TypeScript doit servir de garde-fou et non de documentation décorative.

### Règles

- éviter `any` ;
- préférer des unions littérales pour les variantes ;
- typer les objets partagés ;
- centraliser les types réellement transversaux ;
- ne pas créer d'abstractions génériques sans usage réel ;
- supprimer le code mort pendant la migration.

## 19. CI

Une GitHub Action de validation devra être ajoutée sur les changements de code.

Pipeline minimal :

```text
checkout
→ Node 22
→ npm ci
→ npm run validate
```

Le pipeline pourra ensuite intégrer des contrôles supplémentaires si leur rapport signal/bruit est bon :

- tests ciblés ;
- audit de liens internes ;
- tests de navigation Playwright ;
- contrôle Lighthouse sur pages critiques ;
- dépendances vulnérables selon politique définie.

Un changement qui ne passe pas `npm run validate` ne doit pas être considéré comme terminé.

## 20. Tests de la refonte

La validation ne se limite pas au build.

Pour chaque parcours critique, vérifier au minimum :

- desktop ;
- mobile ;
- navigation clavier ;
- réduction des mouvements ;
- liens internes ;
- formulaire succès / erreur ;
- consentement accepter / refuser / personnaliser / révoquer ;
- navigation principale ;
- CTA vers contact / Calendly ;
- absence d'erreur console bloquante.

## 21. Stratégie de migration

La refonte sera menée par couches cohérentes, dans cet ordre général :

### Phase 0 — Fondations

- manifeste technique ;
- inventaire des routes ;
- définition des tokens ;
- primitives UI ;
- layouts ;
- navigation / footer ;
- CI.

### Phase 1 — Architecture commerciale

- nouvelle homepage ;
- hub services ;
- navigation ;
- CTA ;
- structure de preuve et réassurance.

### Phase 2 — Pages services

- SEO ;
- référencement IA ;
- Google Ads ;
- Social Ads ;
- réseaux sociaux ;
- autres services retenus.

### Phase 3 — Conversion

- formulaire ;
- Calendly ;
- WhatsApp ;
- chatbot ;
- rationalisation des popups ;
- tracking de conversion.

### Phase 4 — Contenu et SEO

- maillage interne ;
- métadonnées ;
- structured data ;
- contenus éditoriaux ;
- gestion des anciennes routes et redirections.

### Phase 5 — Hardening

- accessibilité ;
- performance ;
- consentement ;
- sécurité ;
- tests responsive ;
- nettoyage du code mort ;
- documentation finale.

Les phases ne sont pas des silos : une page livrée pendant une phase doit déjà respecter les fondations de performance, accessibilité et SEO.

## 22. Définition of Done

Une partie de la refonte est considérée terminée uniquement si :

- le rendu correspond au système visuel commun ;
- desktop et mobile sont traités ;
- les interactions clavier fonctionnent ;
- les liens sont corrects ;
- les titres / métadonnées sont cohérents ;
- le JavaScript ajouté est justifié ;
- aucune donnée non fiable n'est injectée dans une frontière HTML dangereuse ;
- le consentement est respecté pour toute instrumentation ajoutée ;
- `npm run validate` passe ;
- aucun ancien composant équivalent devenu inutile n'est laissé actif par défaut ;
- le code mort évident lié à la partie migrée est supprimé.

## 23. Ce que la refonte doit éviter

- refaire visuellement les pages sans revoir leur rôle commercial ;
- multiplier les composants « universels » illisibles ;
- ajouter une dépendance pour un comportement réalisable proprement en CSS ou quelques lignes de TypeScript ;
- charger toutes les animations sur toutes les pages ;
- transformer le site marketing en SPA ;
- masquer des problèmes SEO derrière le sitemap ;
- laisser plusieurs CTA flottants se battre pour l'attention ;
- rendre le consentement dépendant d'hypothèses sur une configuration externe ;
- conserver du code mort « au cas où » ;
- optimiser sur la base d'intuitions sans mesure lorsque la mesure est possible.

## 24. Critère directeur

À chaque arbitrage, privilégier dans cet ordre :

1. compréhension de l'offre ;
2. conversion sans friction ;
3. accessibilité et robustesse ;
4. performance ;
5. SEO ;
6. maintenabilité ;
7. sophistication visuelle.

La sophistication visuelle n'est pas supprimée : elle doit être construite sur une base solide et ne jamais détériorer les six critères précédents.
