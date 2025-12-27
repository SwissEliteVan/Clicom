# Budget Performance — Clic COM

## Objectifs Core Web Vitals

| Métrique | Cible | Seuil Acceptable | Critique |
|----------|-------|------------------|----------|
| **LCP** (Largest Contentful Paint) | < 2.0s | < 2.5s | > 4.0s |
| **FID** (First Input Delay) | < 50ms | < 100ms | > 300ms |
| **CLS** (Cumulative Layout Shift) | < 0.05 | < 0.1 | > 0.25 |
| **FCP** (First Contentful Paint) | < 1.2s | < 1.8s | > 3.0s |
| **TTI** (Time to Interactive) | < 3.0s | < 3.8s | > 7.3s |
| **TBT** (Total Blocking Time) | < 150ms | < 200ms | > 600ms |

**Référence** : Google PageSpeed Insights, mesure mobile 4G (75e percentile)

---

## Budget Ressources

### HTML

| Page | Taille HTML | Requêtes HTTP | Poids Total Page |
|------|-------------|---------------|------------------|
| Accueil | < 50KB | < 15 | < 200KB |
| Services | < 60KB | < 15 | < 220KB |
| À propos | < 40KB | < 12 | < 180KB |
| Résultats | < 50KB | < 15 | < 200KB |
| Blog (liste) | < 45KB | < 12 | < 190KB |
| Blog (article) | < 40KB | < 12 | < 180KB |
| Contact | < 35KB | < 15* | < 250KB* |

\* *Contact : +1 iframe Calendly (charge différée, lazy)*

**Stratégie** :
- Includes PHP (header/footer) : optimiser taille
- Minification HTML (production) : optionnelle si < budget
- Compression Gzip/Brotli : obligatoire (.htaccess)

---

### CSS

**Budget Total** : < 60KB (non minifié), < 40KB (minifié)

| Fichier | Taille Max | Priorité |
|---------|------------|----------|
| `styles.css` (principal) | < 55KB | Critique (render-blocking) |
| Inline critical CSS (optionnel) | < 14KB | Si optimisation agressive |

**Stratégie** :
- 1 seul fichier CSS (pas de multiples feuilles)
- Variables CSS (custom properties) : oui (léger)
- Pas de framework CSS (Tailwind, Bootstrap, etc.)
- Pas de CSS inutilisé (audit avec Coverage Chrome DevTools)
- Minification production : recommandée (cssnano, clean-css)

**Contenu CSS** :
- Reset/Normalize : ~5KB
- Tokens (variables) : ~2KB
- Layout (grid, flex) : ~8KB
- Composants (buttons, cards, nav, etc.) : ~25KB
- Utilities : ~10KB
- Media queries : ~5KB

**Optimisations** :
- Grouper media queries (pas de duplication)
- Éviter `!important` (augmente spécificité = poids mental)
- Préférer classes réutilisables
- Purger CSS inutilisé avant mise en prod

---

### JavaScript

**Budget Total** : < 25KB (non minifié), < 15KB (minifié)

| Fichier | Taille Max | Chargement | Priorité |
|---------|------------|------------|----------|
| `main.js` | < 20KB | defer | Non critique |
| Inline JS (si critique) | < 2KB | — | Uniquement si absolument nécessaire |

**Stratégie** :
- 1 seul fichier JS principal
- Attribut `defer` (non bloquant, exécution après DOM ready)
- Pas de jQuery, pas de framework (React, Vue, etc.)
- Vanilla JS moderne (ES6+, supporté tous navigateurs 2020+)

**Contenu JS** :
- Navigation mobile (toggle menu) : ~3KB
- FAQ accordion : ~4KB
- Formulaire (validation front) : ~5KB
- Sticky CTA mobile (scroll detection) : ~3KB
- Smooth scroll (optionnel) : ~2KB
- Analytics (Google tag) : ~1KB (script externe, async)
- Calendly (widget) : externe, lazy chargé

**Optimisations** :
- Minification (Terser, UglifyJS)
- Pas de polyfills (cible navigateurs modernes)
- Event delegation (éviter multiples listeners)
- Debounce/throttle pour scroll events

**Dépendances Externes** (tolérées mais optimisées) :
- Google Analytics 4 : `<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>` (~30KB, async, non bloquant)
- Calendly : chargé uniquement sur /contact/ et au clic (lazy)

---

### Images

**Formats Autorisés** :
- **SVG** : prioritaire (icônes, illustrations, logo)
- **WebP** : photos/visuels complexes (fallback PNG)
- **PNG** : fallback ou images simples (< 50KB)
- **JPG** : photos (si WebP non supporté, qualité 80%)

**Budget par Image** :

| Type | Taille Max | Dimensions Max | Lazy Loading |
|------|------------|----------------|--------------|
| Logo | 10KB | — | Non (above fold) |
| Icônes SVG | 2KB/icône | 24x24 à 48x48 | Non (inline) |
| Illustrations SVG | 20KB | 800x600 | Oui (si below fold) |
| Hero image (si utilisée) | 50KB | 1200x800 | Non |
| Photos contenu | 40KB | 800x600 | Oui |
| Thumbnails blog | 20KB | 400x300 | Oui |
| Image OG (social) | 80KB | 1200x630 | Non (meta tag) |

**Total Images par Page** : < 150KB

**Optimisations** :
- Compression (TinyPNG, ImageOptim, Squoosh)
- Attributs `width` et `height` (éviter CLS)
- `loading="lazy"` sur toutes images below fold
- `alt` text obligatoire (SEO + a11y)
- Responsive images (srcset) : optionnel si images < 50KB

**SVG** :
- Optimiser avec SVGO
- Inline pour icônes critiques (éviter requête HTTP)
- External file pour illustrations réutilisables
- Pas de base64 inline (augmente HTML, pas cacheable)

---

### Fonts

**Stratégie** : **Zéro webfont externe**

- Police principale : `system-ui` (fallback stack complet)
- Pas de Google Fonts
- Pas de Font Awesome (SVG custom à la place)

**Fallback Stack** :
```css
font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

**Avantages** :
- 0KB chargement
- 0ms latence
- Rendu natif (meilleure lisibilité)
- Pas de FOUT/FOIT (Flash Of Unstyled/Invisible Text)

---

### Tiers (Third-Party)

| Service | Taille | Impact | Stratégie |
|---------|--------|--------|-----------|
| Google Analytics 4 | ~30KB | FID +20ms | `async`, non bloquant |
| Calendly (embed iframe) | ~200KB | Isolé | `loading="lazy"`, conditionnel |
| Calendly (widget popup) | ~150KB | Chargé au clic | Event-driven |

**Règles Tiers** :
- Maximum 2 services externes (GA4 + Calendly)
- Async/defer obligatoire
- Lazy load si possible
- DNS prefetch : `<link rel="dns-prefetch" href="//www.googletagmanager.com">`
- Preconnect (si critique) : `<link rel="preconnect" href="https://calendly.com">`

---

## Budgets par Page (Détaillé)

### Accueil (/)

| Ressource | Quantité | Poids | Notes |
|-----------|----------|-------|-------|
| HTML | 1 | 45KB | Includes header/footer |
| CSS | 1 | 40KB | styles.css minifié |
| JS | 1 | 15KB | main.js defer |
| Logo SVG | 1 | 8KB | Inline ou cached |
| Icônes SVG | 10 | 15KB | Inline (hero, bénéfices, features) |
| Illustration SVG | 1 | 18KB | Hero background |
| Google Analytics | 1 | 30KB | Async |
| **TOTAL** | — | **171KB** | ✅ < 200KB |

**LCP Target** : Hero H1 + sous-titre (text, pas image) → < 1.8s
**CLS** : Réserver espace SVG avec width/height → < 0.05

---

### Services (/services/)

| Ressource | Quantité | Poids | Notes |
|-----------|----------|-------|-------|
| HTML | 1 | 55KB | 5 packs détaillés + FAQ |
| CSS | 1 | 40KB | Cached |
| JS | 1 | 15KB | Cached |
| Logo SVG | 1 | 8KB | Cached |
| Icônes SVG | 8 | 12KB | Packs, features |
| Illustration SVG | 1 | 15KB | Section background |
| Google Analytics | 1 | 30KB | Cached |
| **TOTAL** | — | **175KB** | ✅ < 220KB |

---

### Contact (/contact/)

| Ressource | Quantité | Poids | Notes |
|-----------|----------|-------|-------|
| HTML | 1 | 30KB | Formulaire + intro |
| CSS | 1 | 40KB | Cached |
| JS | 1 | 15KB | Cached + validation form |
| Logo SVG | 1 | 8KB | Cached |
| Icônes SVG | 4 | 6KB | Contact methods |
| **Calendly iframe** | 1 | ~200KB | `loading="lazy"` → charge seulement si scrollé |
| Google Analytics | 1 | 30KB | Cached |
| **TOTAL (sans iframe)** | — | **129KB** | ✅ |
| **TOTAL (avec iframe)** | — | **329KB** | ⚠️ Acceptable (iframe lazy) |

**Optimisation Calendly** :
- Lien direct : priorité (0KB supplémentaire)
- Iframe : lazy + fallback si bloqué
- Charger iframe uniquement si visible (IntersectionObserver)

---

### Blog Article

| Ressource | Quantité | Poids | Notes |
|-----------|----------|-------|-------|
| HTML | 1 | 35KB | 600-900 mots article |
| CSS | 1 | 40KB | Cached |
| JS | 1 | 15KB | Cached |
| Logo SVG | 1 | 8KB | Cached |
| Icônes SVG | 3 | 5KB | Share, etc. |
| Illustration article | 0-1 | 0-30KB | Optionnel, lazy |
| Google Analytics | 1 | 30KB | Cached |
| **TOTAL** | — | **133-163KB** | ✅ < 180KB |

**LCP** : Premier paragraphe texte (pas image) → < 1.5s

---

## Optimisations Serveur (.htaccess)

### Compression

```apache
# Activer compression Gzip/Brotli
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json image/svg+xml
</IfModule>
```

**Gain** : -60 à -80% taille HTML/CSS/JS

---

### Cache Navigateur

```apache
<IfModule mod_expires.c>
  ExpiresActive On

  # Images
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"

  # CSS/JS
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"

  # HTML (pas de cache long, contenu peut changer)
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>

<IfModule mod_headers.c>
  # Cache-Control headers
  <FilesMatch "\.(css|js|svg|png|jpg|webp)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>

  <FilesMatch "\.(html|php)$">
    Header set Cache-Control "no-cache, must-revalidate"
  </FilesMatch>
</IfModule>
```

**Gain** : Visites répétées → chargement quasi instantané (cache)

---

### Preload/Prefetch (Optionnel)

```html
<!-- Preload CSS critique -->
<link rel="preload" href="/assets/css/styles.css" as="style">

<!-- DNS Prefetch pour services externes -->
<link rel="dns-prefetch" href="//www.googletagmanager.com">
<link rel="dns-prefetch" href="//calendly.com">
```

**Gain** : -50 à -200ms temps connexion tiers

---

## Checklist Performance

### Avant Mise en Ligne

- [ ] **CSS < 60KB** (non minifié)
- [ ] **JS < 25KB** (non minifié)
- [ ] **Toutes images optimisées** (TinyPNG, SVGO)
- [ ] **Width/height sur toutes images/SVG** (éviter CLS)
- [ ] **Lazy loading activé** (images below fold + iframe Calendly)
- [ ] **Pas de webfonts externes** (system-ui uniquement)
- [ ] **1 fichier CSS + 1 fichier JS** (pas de multiples)
- [ ] **JS en defer** (non bloquant)
- [ ] **.htaccess configuré** (compression + cache)
- [ ] **Google Analytics en async**
- [ ] **Prefers-reduced-motion respecté** (animations)

### Tests à Effectuer

#### Google PageSpeed Insights

**URL** : https://pagespeed.web.dev/

**Cibles** :
- [ ] Mobile Performance : > 85 (idéal > 90)
- [ ] Desktop Performance : > 95
- [ ] Accessibility : 100
- [ ] Best Practices : > 95
- [ ] SEO : 100

**Pages à Tester** :
- [ ] Accueil
- [ ] Services
- [ ] Contact
- [ ] Blog (1 article)

#### WebPageTest

**URL** : https://www.webpagetest.org/

**Profil** : Mobile 4G (Moto G4), Location : Europe

**Cibles** :
- [ ] First Byte : < 0.6s
- [ ] Start Render : < 1.5s
- [ ] LCP : < 2.0s
- [ ] CLS : < 0.05
- [ ] Speed Index : < 3.0s

#### Chrome DevTools

**Coverage** (CSS/JS inutilisé) :
- [ ] CSS utilisé : > 80%
- [ ] JS utilisé : > 75%
- [ ] Supprimer code mort si < 70%

**Network** :
- [ ] Total requests : < 20
- [ ] Total size : < 250KB (first load)
- [ ] Gzip activé (vérifier headers)

**Lighthouse** (DevTools > Lighthouse) :
- [ ] Performance : > 90
- [ ] Accessibility : 100
- [ ] Best Practices : > 95
- [ ] SEO : 100

---

## Monitoring Continue (Post-Launch)

### Outils Gratuits

1. **Google Search Console** (Core Web Vitals)
   - URL : https://search.google.com/search-console
   - Rapport "Core Web Vitals" → mobile + desktop
   - Objectif : 100% URLs "Good" (vert)

2. **Google Analytics 4** (Web Vitals)
   - Custom events pour LCP/FID/CLS
   - Tableau de bord mensuel

3. **PageSpeed Insights API**
   - Test mensuel automatisé (optionnel)

### Alertes

**Déclencher action si** :
- PageSpeed < 80 (mobile)
- LCP > 2.5s (75e percentile)
- CLS > 0.1
- Taille page > budget +20%

**Actions** :
- Audit images (nouvelles ajoutées non optimisées ?)
- Audit JS (nouveaux scripts tiers ?)
- Purge CSS/JS inutilisé

---

## Optimisations Futures (Phase 2, Optionnel)

### Si Budget Perf Non Atteint

**Critical CSS Inline** :
- Extraire CSS above-the-fold
- Inline dans `<head>`
- Charger CSS complet en différé
- Gain : FCP -200 à -500ms
- Complexité : moyenne (tools : Critical, Critters)

**Service Worker (Cache Avancé)** :
- PWA léger
- Cache assets CSS/JS/SVG
- Offline fallback (optionnel)
- Gain : visites répétées quasi instantanées
- Complexité : élevée

**HTTP/2 Server Push** :
- Push CSS/JS avant requête HTML terminée
- Gain : -50 à -150ms
- Support Hostinger : à vérifier

**Image Responsive (srcset)** :
- Multiples tailles images
- Gain : -30 à -50% poids images mobile
- Complexité : moyenne (génération multi-tailles)

---

## Budget Évolution (12 Mois)

| Mois | Actions | Impact Perf |
|------|---------|-------------|
| **M1** | Lancement, monitoring | Baseline établie |
| **M2-3** | Ajout 2-3 articles blog/mois | +10-15KB/page blog |
| **M4-6** | Ajout études de cas (images) | +20-40KB/page résultats |
| **M7-9** | Potentiel chatbot/widget | ⚠️ +100-200KB si non lazy |
| **M10-12** | Refonte section (A/B test) | Neutre si optimisé |

**Règle d'Or** : Chaque ajout de contenu/fonctionnalité → tester impact perf AVANT mise en prod.

---

## Ressources & Outils

### Test Performance

- **Google PageSpeed Insights** : https://pagespeed.web.dev/
- **WebPageTest** : https://www.webpagetest.org/
- **GTmetrix** : https://gtmetrix.com/
- **Lighthouse CI** : https://github.com/GoogleChrome/lighthouse-ci

### Optimisation Images

- **TinyPNG** : https://tinypng.com/
- **Squoosh** : https://squoosh.app/
- **SVGOMG** : https://jakearchibald.github.io/svgomg/

### Minification

- **CSS** : cssnano, clean-css
- **JS** : Terser, UglifyJS
- **HTML** : html-minifier (optionnel)

### Analyse

- **Chrome DevTools** (Coverage, Network, Lighthouse)
- **Web Vitals Extension** : https://github.com/GoogleChrome/web-vitals-extension

---

## Tableau de Bord Perf (Template Mensuel)

| Métrique | Cible | M1 | M2 | M3 | Trend |
|----------|-------|----|----|----|----|
| PageSpeed Mobile | > 85 | — | — | — | — |
| PageSpeed Desktop | > 95 | — | — | — | — |
| LCP (mobile) | < 2.0s | — | — | — | — |
| FID (mobile) | < 50ms | — | — | — | — |
| CLS (mobile) | < 0.05 | — | — | — | — |
| Taille Accueil | < 200KB | — | — | — | — |
| Requests Accueil | < 15 | — | — | — | — |
| % URLs "Good" (GSC) | 100% | — | — | — | — |

**Remplir après chaque mise à jour majeure ou mensuellement.**

---

**FIN DU DOCUMENT PERFORMANCE**

Ce budget doit être respecté comme une contrainte critique. Performance = conversion + SEO + accessibilité.
