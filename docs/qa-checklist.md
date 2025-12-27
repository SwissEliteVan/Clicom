# Checklist QA — Clic COM

Checklist exhaustive pour tester le site avant mise en production.

---

## 🖥️ DESKTOP (Chrome, Firefox, Safari, Edge)

### Navigation & Structure

- [ ] **Logo cliquable** : Retourne à l'accueil depuis toutes pages
- [ ] **Menu navigation** : Tous liens fonctionnels (Accueil, Services, Résultats, Blog, Contact)
- [ ] **Footer** : Tous liens fonctionnels (colonnes Services, Ressources, Contact, Légales)
- [ ] **Breadcrumb** : Affiché sur pages internes, cliquable, dernière entrée non cliquable
- [ ] **404** : URL inexistante redirige vers `/404.php` avec message friendly
- [ ] **URLs propres** : Pas de `/index.php` visible (si URLs rewriting activé)

### Page Accueil (/)

- [ ] **H1** : "Gagnez des clients, pas juste des clics." visible
- [ ] **Hero CTA** : 2 boutons visibles (Pack découverte + Calendly)
- [ ] **Objections** : 4 cards affichées (J'ai déjà agence, Petit budget, Pas le temps, Résultats mesurables)
- [ ] **Solutions** : 3 services aperçu (Acquisition, Pages, Relances)
- [ ] **FAQ** : 8 questions présentes, accordéon fonctionne (clic ouvre/ferme)
- [ ] **CTA final** : Section gradient avec 2 boutons
- [ ] **Sticky CTA mobile** : N'apparaît PAS sur desktop (hidden > 1024px)

### Page Contact (/contact/)

- [ ] **Formulaire** : Tous champs visibles (Nom, Email, Téléphone, Message)
- [ ] **Labels** : Associés aux champs (clic label = focus champ)
- [ ] **Validation client** : Soumission champ vide affiche erreurs inline
- [ ] **Honeypot** : Champ `website` invisible (position absolute left -9999px)
- [ ] **Timestamp** : Champ hidden `form_timestamp` présent avec valeur
- [ ] **Soumission** : Formulaire valide redirige vers `/merci/`
- [ ] **Calendly lien** : Bouton "Réserver mon créneau" ouvre Calendly nouvelle fenêtre
- [ ] **Calendly iframe** : Si `CALENDLY_EMBED=true`, iframe visible et charge (lazy)
- [ ] **Coordonnées** : Email, téléphone, adresse (si complétés) affichés

### Page Merci (/merci/)

- [ ] **Icône success** : SVG check vert visible
- [ ] **Message** : "Merci pour votre message !" affiché
- [ ] **Next steps** : 3 étapes expliquées (Email, Réponse 24h, Calendly option)
- [ ] **CTA Calendly** : Bouton "Planifier un appel maintenant" fonctionnel
- [ ] **Cards découverte** : 3 liens (Services, Méthode, Blog) cliquables
- [ ] **Retour accueil** : Bouton bleu fonctionne

### Page 404

- [ ] **404 Illustration** : SVG "404" + loupe visible
- [ ] **Message** : "Page non trouvée" affiché
- [ ] **Suggestions** : 4 points d'aide affichés
- [ ] **CTA** : 2 boutons (Accueil + Contact) fonctionnels
- [ ] **Pages populaires** : 3 cards (Services, Méthode, Blog) cliquables
- [ ] **HTTP Status** : Vérifier via DevTools Network = 404 (pas 200)

---

## 📱 MOBILE (iPhone, Android, Responsive)

### Responsive Design

- [ ] **Viewport** : `<meta name="viewport">` présent dans source
- [ ] **Breakpoints** : Tester 320px, 375px, 414px, 768px, 1024px
- [ ] **Overflow** : Pas de scroll horizontal (toutes largeurs)
- [ ] **Images** : Responsive, ne dépassent pas (max-width: 100%)
- [ ] **Touch targets** : Boutons/liens ≥ 44x44px (règle WCAG mobile)

### Navigation Mobile

- [ ] **Menu burger** : Icône ☰ visible < 1024px
- [ ] **Menu toggle** : Clic burger ouvre menu (slide-in depuis droite)
- [ ] **Icône changement** : Burger → X quand menu ouvert
- [ ] **Menu actif** : Fond blanc, shadow, liens verticaux
- [ ] **Fermeture clic outside** : Clic hors menu ferme menu
- [ ] **Fermeture Escape** : Touche Escape ferme menu
- [ ] **CTA Calendly** : Visible dans menu mobile (pleine largeur)
- [ ] **Navigation clavier** : Tab traverse menu (testé sur Android Chrome accessibility)

### Sticky CTA Mobile

- [ ] **Apparition** : CTA apparaît après scroll > 50vh (tester)
- [ ] **Position** : Fixed bottom, pleine largeur
- [ ] **Shadow** : Ombre vers haut visible
- [ ] **Bouton** : Texte "Planifier un appel gratuit" + pleine largeur
- [ ] **Fermeture** : Icône × fonctionne (clic = disparition)
- [ ] **Persistence** : Après fermeture, ne réapparaît pas (localStorage)
- [ ] **Pages exclues** : N'apparaît PAS sur /contact/ ni /merci/

### Formulaire Mobile

- [ ] **Champs** : Hauteur confortable (min 48px)
- [ ] **Clavier virtuel** : Email = clavier @, Tel = clavier numérique
- [ ] **Zoom désactivé** : Pas de zoom auto au focus (font-size ≥ 16px)
- [ ] **Validation** : Erreurs visibles sous champs
- [ ] **Soumission** : Bouton pleine largeur, facilement tapable

---

## ♿ ACCESSIBILITÉ (WCAG 2.1 AA minimum)

### Navigation Clavier

- [ ] **Skip link** : Tab dès arrivée page affiche "Aller au contenu principal"
- [ ] **Skip link action** : Enter sur skip-link scroll vers `#main-content`
- [ ] **Ordre Tab** : Logique (logo → menu → contenu → footer)
- [ ] **Focus visible** : Outline bleu 3px sur tous éléments interactifs
- [ ] **Navbar** : Tab traverse tous liens menu
- [ ] **Menu mobile** : Enter/Space ouvre menu, Escape ferme
- [ ] **Boutons** : Enter et Space activent boutons
- [ ] **Liens** : Enter active liens
- [ ] **FAQ** : Tab vers question, Enter ouvre/ferme réponse
- [ ] **Formulaire** : Tab traverse champs, labels, bouton soumission

### Landmarks ARIA

- [ ] **`<header role="banner">`** : Header a role banner
- [ ] **`<nav role="navigation">`** : Nav a role navigation + aria-label
- [ ] **`<main id="main-content" role="main">`** : Main content a role main + id
- [ ] **`<footer role="contentinfo">`** : Footer a role contentinfo

### Labels & ARIA

- [ ] **Formulaire labels** : Tous champs ont `<label for="id">` associé
- [ ] **Boutons** : Texte explicite ou aria-label (ex: burger "Ouvrir le menu")
- [ ] **Liens** : Texte significatif (pas "cliquez ici")
- [ ] **Images/SVG** : `alt` text si informatif, `aria-hidden="true"` si décoratif
- [ ] **FAQ** : `aria-expanded`, `aria-controls`, `role="region"` sur réponses
- [ ] **Menu mobile** : `aria-expanded` sur bouton burger
- [ ] **Erreurs formulaire** : `role="alert"` sur messages erreur

### Contrastes (WCAG AAA = 7:1)

- [ ] **Texte principal** : #1A1A1A sur #FAFAFA = 15.8:1 ✓
- [ ] **Texte muted** : #5A5A5A sur #FAFAFA = 7.2:1 ✓
- [ ] **Liens** : #0066CC sur #FAFAFA > 7:1 ✓
- [ ] **Boutons primaire** : Blanc sur #0066CC = 4.8:1 (AA large text ✓)
- [ ] **Boutons hover** : Contraste maintenu
- [ ] **Focus outline** : Bleu #0066CC sur fond clair visible

**Outil** : WebAIM Contrast Checker (https://webaim.org/resources/contrastchecker/)

### Lecteur d'Écran (NVDA/JAWS/VoiceOver)

- [ ] **H1 annoncé** : "Gagnez des clients..." lu en premier
- [ ] **Navigation** : Liste de liens annoncée
- [ ] **Formulaire** : Labels lus avant champs
- [ ] **Erreurs** : Messages erreur annoncés (role alert)
- [ ] **Landmarks** : "Banner", "Navigation", "Main", "Contentinfo" détectés
- [ ] **Skip link** : Annoncé et fonctionnel

**Test rapide** : Tab + Enter seul (sans souris) permet navigation complète

---

## 🎨 DESIGN & VISUEL

### Typographie

- [ ] **Police** : system-ui chargée (pas de FOUT/FOIT)
- [ ] **Tailles** : Lisibles (base 18px minimum)
- [ ] **Line-height** : Confortable (1.6 sur paragraphes)
- [ ] **Hiérarchie** : H1 > H2 > H3 claire visuellement

### Couleurs & Cohérence

- [ ] **Brand colors** : Bleu #0066CC + Vert #00A878 utilisés
- [ ] **Hover states** : Tous boutons/liens ont hover distinct
- [ ] **Boutons primaire** : Bleu, hover + lift (translateY -2px)
- [ ] **Boutons secondaire** : Outline vert, hover remplissage vert
- [ ] **Cards** : Hover lift (translateY -4px) + shadow

### Spacing & Layout

- [ ] **Sections** : Padding vertical cohérent (64px desktop, 48px mobile)
- [ ] **Container** : Max-width 1200px, centré
- [ ] **Grids** : Responsive (3 cols → 2 → 1 selon viewport)
- [ ] **White space** : Généreux, pas d'éléments collés

### Animations

- [ ] **Transitions** : Fluides (250ms ease-in-out)
- [ ] **Reduced motion** : `prefers-reduced-motion: reduce` désactive animations
- [ ] **Hover** : Smooth sans lag
- [ ] **FAQ accordion** : Slide down/up smooth
- [ ] **Menu mobile** : Slide-in smooth

**Test reduced motion** :
1. macOS : Préférences Système → Accessibilité → Affichage → Réduire les animations
2. Windows : Paramètres → Ergonomie → Affichage → Afficher les animations
3. Vérifier que hover, accordion, sticky CTA = instantanés (pas d'animation)

---

## ⚡ PERFORMANCE

### Core Web Vitals (cibles)

- [ ] **LCP (Largest Contentful Paint)** : < 2.0s (idéal < 1.5s)
- [ ] **FID (First Input Delay)** : < 50ms (idéal < 10ms)
- [ ] **CLS (Cumulative Layout Shift)** : < 0.05 (idéal 0)

**Outil** : Google PageSpeed Insights (https://pagespeed.web.dev/)

- [ ] **Mobile score** : > 85 (idéal > 90)
- [ ] **Desktop score** : > 95

### Budgets Ressources

- [ ] **CSS** : styles.css < 60KB non minifié (vérifier via DevTools Network)
- [ ] **JS** : main.js < 25KB non minifié
- [ ] **Logo SVG** : < 10KB
- [ ] **Total page Accueil** : < 200KB (first load, sans cache)
- [ ] **Requêtes HTTP** : < 20 (Accueil)

### Optimisations

- [ ] **Gzip** : Actif (vérifier Response Headers `Content-Encoding: gzip`)
- [ ] **Cache** : Headers `Cache-Control` présents sur CSS/JS/SVG
- [ ] **Images** : `loading="lazy"` sur images below fold
- [ ] **Calendly iframe** : `loading="lazy"` attribut présent
- [ ] **Defer JS** : `<script defer src="main.js">` dans footer
- [ ] **DNS Prefetch** : `<link rel="dns-prefetch">` pour Google Analytics + Calendly

### Lighthouse Audit

Ouvrir DevTools → Lighthouse → Generate Report (Mobile + Desktop)

- [ ] **Performance** : > 90
- [ ] **Accessibility** : 100
- [ ] **Best Practices** : > 95
- [ ] **SEO** : 100

**Actions si score < cible** :
- Performance : Vérifier images, minifier CSS/JS, activer cache
- Accessibility : Vérifier contrastes, labels, aria-*
- Best Practices : Vérifier HTTPS, CSP, console errors
- SEO : Vérifier meta tags, sitemap, robots.txt

---

## 🔍 SEO

### Meta Tags (view-source sur chaque page)

- [ ] **Title** : Unique par page, 55-60 caractères
- [ ] **Description** : Unique par page, 150-160 caractères
- [ ] **Canonical** : Présent sur toutes pages
- [ ] **Robots** : `index, follow` (sauf /merci/ et /404.php = `noindex, follow`)
- [ ] **Viewport** : Présent
- [ ] **Lang** : `<html lang="fr-CH">`

### OpenGraph & Twitter

- [ ] **og:title** : Présent
- [ ] **og:description** : Présent
- [ ] **og:type** : `website` (Accueil), adapté (Article pour blog si créé)
- [ ] **og:url** : URL canonique
- [ ] **og:image** : Présent (logo ou image OG custom)
- [ ] **twitter:card** : `summary_large_image`

**Test** : https://www.opengraph.xyz/ (paste URL)

### JSON-LD Structured Data

- [ ] **Organization** : Présent sur toutes pages
- [ ] **LocalBusiness** : Présent sur Accueil (si adresse complétée)
- [ ] **BreadcrumbList** : Présent sur pages internes
- [ ] **FAQPage** : Présent sur Accueil (8 questions)
- [ ] **Validation** : https://validator.schema.org/ (paste source HTML)
- [ ] **Google Rich Results** : https://search.google.com/test/rich-results

### Hiérarchie & Sémantique

- [ ] **H1** : Unique par page
- [ ] **H2-H6** : Hiérarchie respectée (pas de saut H2 → H4)
- [ ] **Alt text** : Présent sur toutes images/SVG informatifs
- [ ] **Internal links** : 3-5 liens internes par page (maillage)

### Fichiers SEO

- [ ] **sitemap.xml** : Accessible https://domaine.ch/sitemap.xml
- [ ] **robots.txt** : Accessible https://domaine.ch/robots.txt
- [ ] **Sitemap valide** : https://www.xml-sitemaps.com/validate-xml-sitemap.html
- [ ] **Search Console** : Sitemap soumis + aucune erreur indexation

---

## 🔒 SÉCURITÉ

### HTTPS & Certificats

- [ ] **SSL actif** : https:// fonctionne
- [ ] **HTTP → HTTPS** : Redirection 301 automatique
- [ ] **Mixed content** : Aucune ressource HTTP sur page HTTPS (vérifier Console)
- [ ] **Certificat valide** : Pas d'avertissement navigateur
- [ ] **HSTS** : Header `Strict-Transport-Security` présent (optionnel, décommenter .htaccess après SSL stable)

### Headers Sécurité

Vérifier via DevTools → Network → Response Headers :

- [ ] **X-Content-Type-Options** : `nosniff`
- [ ] **X-Frame-Options** : `SAMEORIGIN`
- [ ] **X-XSS-Protection** : `1; mode=block`
- [ ] **Referrer-Policy** : `strict-origin-when-cross-origin`
- [ ] **Content-Security-Policy** : Présent (adapté pour Calendly)

**Test** : https://securityheaders.com/ (score A ou B acceptable)

### Protection Fichiers

- [ ] **/config/** : Non accessible (tester https://domaine.ch/config/config.php → 403 Forbidden)
- [ ] **/api/** : Accessible uniquement via POST (GET retourne 405)
- [ ] **.htaccess** : Non téléchargeable (404 si tenté)
- [ ] **Directory listing** : Désactivé (https://domaine.ch/assets/ → 403, pas de liste)

### Formulaire Anti-Spam

- [ ] **Honeypot** : Champ `website` vide = soumission OK, rempli = refus
- [ ] **Time trap** : Soumission < 3s après chargement = refus
- [ ] **Rate limit** : 4ème soumission en 1h = erreur 429
- [ ] **Validation serveur** : Contourner validation client (DevTools) = erreur serveur
- [ ] **Injection SQL** : N/A (pas de DB, mais tester `'; DROP TABLE--` dans champ = pas d'erreur PHP)
- [ ] **XSS** : Tester `<script>alert('XSS')</script>` dans message = échappé (pas exécuté)

**Test honeypot** :
1. Inspecter formulaire
2. Remplir champ `<input name="website">` (normalement invisible)
3. Soumettre → Devrait refuser silencieusement ou erreur 400

---

## 📧 EMAIL & FORMULAIRE

### Envoi Email

- [ ] **Formulaire valid submit** : Redirection `/merci/` après soumission
- [ ] **Email reçu** : Admin reçoit email sur `FORM_TO_EMAIL`
- [ ] **Format email** : Nom, Email, Téléphone, Message présents
- [ ] **Sujet** : "[Clic COM] Nouveau contact : [Nom]"
- [ ] **From** : Email SMTP configuré
- [ ] **Reply-To** : Email du prospect
- [ ] **Timestamp** : Date/heure + IP en footer email

### Auto-Reply

- [ ] **User reçoit** : Email auto-confirmation
- [ ] **Sujet** : "Merci pour votre message — Clic COM"
- [ ] **Contenu** : Message rassurant + lien Calendly
- [ ] **From** : Email entreprise
- [ ] **Pas de spam** : Email arrive dans boîte principale (pas spam)

### Validation

- [ ] **Nom vide** : Erreur affichée
- [ ] **Email invalide** : Erreur "email valide"
- [ ] **Message < 10 char** : Erreur affichée
- [ ] **Téléphone invalide** : Erreur si format incorrect (optionnel mais validé)
- [ ] **HTML injection** : Tentative `<b>test</b>` dans nom = échappé

---

## 🌐 NAVIGATEURS (Cross-Browser)

### Desktop

- [ ] **Chrome** (dernière version) : Site fonctionne
- [ ] **Firefox** (dernière version) : Site fonctionne
- [ ] **Safari** (macOS) : Site fonctionne
- [ ] **Edge** (dernière version) : Site fonctionne

### Mobile

- [ ] **Safari iOS** (iPhone) : Site fonctionne
- [ ] **Chrome Android** : Site fonctionne
- [ ] **Samsung Internet** : Site fonctionne (si disponible)

### Compatibilité JS/CSS

- [ ] **Flexbox** : Supporté (tous navigateurs modernes)
- [ ] **Grid CSS** : Supporté
- [ ] **CSS Variables** : Supportées
- [ ] **Arrow functions JS** : Supportées (ES6)
- [ ] **Fetch API** : Si utilisée, supportée (ou polyfill)

**Note** : Site cible navigateurs modernes (2020+). Pas de support IE11.

---

## 🧪 TESTS EDGE CASES

### Formulaire

- [ ] **Soumissions multiples rapides** : Rate limit bloque après 3
- [ ] **Champs très longs** : Texte 10000 caractères = accepté ou tronqué proprement
- [ ] **Caractères spéciaux** : é, è, à, ç, œ dans message = affichés correctement email
- [ ] **Email avec +** : `user+test@domain.com` = valide
- [ ] **Téléphone formats** : `+41 21 123 45 67`, `021 123 45 67`, `0041211234567` = tous valides

### Navigation

- [ ] **URL trailing slash** : `/contact` et `/contact/` = même page (redirection ou fonctionnel)
- [ ] **URL case sensitive** : `/Contact/` = fonctionne (ou 404 si serveur case-sensitive)
- [ ] **Ancre hash** : `/services/#clic-clients` = scroll vers section (si JS smooth scroll actif)
- [ ] **Back button** : Navigation → retour arrière fonctionne
- [ ] **Refresh F5** : Page se recharge sans erreur

### Contenu

- [ ] **Texte très long** : H1 de 200 caractères = responsive, pas de débordement
- [ ] **Pas d'image** : Si SVG non chargé, alt text ou fallback visible
- [ ] **JS désactivé** : Navigation fonctionne, formulaire soumettable (pas de validation client mais serveur OK)

---

## ✅ CHECKLIST FINALE PRÉ-PRODUCTION

### Configuration

- [ ] Tous placeholders `/config/config.php` complétés
- [ ] SMTP testé et fonctionnel
- [ ] Google Analytics ID configuré
- [ ] Calendly URL testée
- [ ] SSL/HTTPS actif et forcé
- [ ] Domaine exact dans constantes

### Contenu

- [ ] Aucun "Lorem ipsum"
- [ ] Aucun "À compléter" visible publiquement
- [ ] Téléphone réel (ou retiré si pas prêt)
- [ ] Email réel
- [ ] Adresse réelle (ou retirée si 100% remote)

### Pages Critiques

- [ ] Accueil : Copy complet FR, aucune erreur
- [ ] Contact : Formulaire fonctionnel
- [ ] Merci : Confirmation claire
- [ ] 404 : Message friendly

### Tests Finaux

- [ ] Test formulaire production (vraie soumission)
- [ ] Test mobile réel (iPhone + Android si possible)
- [ ] Test navigation clavier complète
- [ ] PageSpeed score vérifié
- [ ] Schema.org validé
- [ ] Search Console sitemap soumis

---

## 🚨 CRITÈRES BLOQUANTS (Ne PAS lancer si non OK)

- ❌ **SSL non actif** → Bloquant (sécurité + SEO)
- ❌ **Formulaire n'envoie pas email** → Bloquant (conversion)
- ❌ **Erreurs JavaScript console** → Bloquant (UX)
- ❌ **Score PageSpeed < 50** → Bloquant (SEO + UX)
- ❌ **Email/Téléphone placeholder visible** → Bloquant (crédibilité)
- ❌ **Menu mobile ne fonctionne pas** → Bloquant (60% trafic mobile)

---

## 📊 OUTILS DE TEST

| Test | Outil | URL |
|------|-------|-----|
| Performance | PageSpeed Insights | https://pagespeed.web.dev/ |
| Performance | WebPageTest | https://www.webpagetest.org/ |
| Accessibilité | WAVE | https://wave.webaim.org/ |
| Contrastes | WebAIM Contrast Checker | https://webaim.org/resources/contrastchecker/ |
| SEO | Lighthouse (DevTools) | Chrome DevTools > Lighthouse |
| Schema.org | Validator | https://validator.schema.org/ |
| Rich Results | Google Test | https://search.google.com/test/rich-results |
| OpenGraph | OG Debugger | https://www.opengraph.xyz/ |
| Sécurité | Security Headers | https://securityheaders.com/ |
| SSL | SSL Labs | https://www.ssllabs.com/ssltest/ |
| Mobile | Google Mobile Test | https://search.google.com/test/mobile-friendly |
| HTML Validation | W3C Validator | https://validator.w3.org/ |

---

**Checklist complétée à** : ______ / ______ critères ✅

**Prêt pour production** : ☐ OUI | ☐ NON (corrections nécessaires)

**Responsable QA** : ________________
**Date** : ____ / ____ / ____

---

**🎉 Bon lancement !**
