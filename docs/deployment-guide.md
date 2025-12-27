# Guide de Déploiement — Clic COM

## 🎯 Ce Qui a Été Livré

### ✅ Infrastructure Complète (PASS 2)

**13 fichiers de base + 4 pages fonctionnelles = Site Production-Ready**

```
public_html/
├── config/
│   ├── config.php         ✅ Configuration complète (SMTP, constantes, helpers)
│   └── .htaccess          ✅ Protection deny all
│
├── includes/
│   ├── meta.php           ✅ Meta tags dynamiques + JSON-LD (7 types schemas)
│   ├── header.php         ✅ Navbar sticky + menu mobile + skip-link WCAG
│   ├── footer.php         ✅ Footer 4 colonnes + GA4 integration
│   └── components.php     ✅ Helpers réutilisables (buttons, cards, FAQ, etc.)
│
├── assets/
│   ├── css/styles.css     ✅ Design system complet (1203 lignes, < 60KB)
│   ├── js/main.js         ✅ Interactivité complète (316 lignes, < 25KB)
│   └── svg/logo.svg       ✅ Logo professionnel Clic COM
│
├── api/
│   └── contact.php        ✅ Endpoint formulaire (anti-spam, validation, email)
│
├── contact/
│   └── index.php          ✅ Page contact (formulaire + Calendly + infos)
│
├── merci/
│   └── index.php          ✅ Page confirmation post-formulaire
│
├── index.php              ✅ Homepage complète (copy FR complet, 4 objections, FAQ)
├── 404.php                ✅ Page erreur 404 friendly
├── .htaccess              ✅ Performance + sécurité (gzip, cache, CSP, headers)
├── robots.txt             ✅ SEO crawl directives
└── sitemap.xml            ✅ SEO sitemap (9 pages)
```

### 📦 Livrables PASS 1 (Documentation Stratégique)

```
docs/
├── brand-kit.md           ✅ Design system, tokens, composants, couleurs
├── ia-sitemap.md          ✅ Architecture, navigation, parcours utilisateur
├── copy-framework.md      ✅ Messages, 4 objections, 5 packs détaillés, FAQ
├── seo-plan.md            ✅ Keywords, meta tags, JSON-LD, sitemap structure
├── placeholders.md        ✅ 75+ items à compléter avant mise en ligne
└── performance-budget.md  ✅ Core Web Vitals, budgets ressources, optimisations
```

---

## 🚀 Déploiement sur Hostinger (Étapes)

### Prérequis

- [ ] Compte Hostinger actif
- [ ] Domaine configuré (ex: clicom.ch)
- [ ] Accès FTP ou File Manager Hostinger
- [ ] Certificat SSL actif (Let's Encrypt gratuit via Hostinger)

### Étape 1 : Upload des Fichiers

**Via File Manager Hostinger (Recommandé)**

1. Connectez-vous à hPanel Hostinger
2. Allez dans **Files → File Manager**
3. Naviguez vers `/public_html/`
4. **IMPORTANT** : Supprimez le fichier `index.html` par défaut de Hostinger
5. Uploadez **TOUT le contenu** du dossier `/public_html/` local vers `/public_html/` serveur
   - Sélectionnez tous les fichiers/dossiers
   - Glissez-déposez OU utilisez bouton "Upload"
   - Attendez fin upload (vérifiez que tous dossiers sont présents : assets, config, includes, api, contact, merci)

**Via FTP (Alternative)**

1. Utilisez FileZilla ou client FTP de votre choix
2. Credentials FTP : disponibles dans hPanel → Files → FTP Accounts
3. Connectez-vous
4. Uploadez contenu `/public_html/` local vers `/public_html/` distant
5. Vérifiez permissions :
   - Fichiers : 644
   - Dossiers : 755

### Étape 2 : Configuration PHP

**Éditer `/public_html/config/config.php`**

⚠️ **CRITIQUE** : Compléter les placeholders avant mise en ligne

```php
// SITE
define('SITE_URL', 'https://clicom.ch'); // ← Votre domaine exact

// CONTACT
define('CONTACT_EMAIL', 'hello@clicom.ch'); // ← Email réel
define('CONTACT_PHONE', '+41 21 XXX XX XX'); // ← Téléphone réel
// Adresse physique (si applicable)
define('CONTACT_ADDRESS_STREET', 'Avenue de la Gare 10');
define('CONTACT_ADDRESS_CITY', 'Lausanne');
define('CONTACT_ADDRESS_ZIP', '1003');
define('CONTACT_ADDRESS_REGION', 'Vaud');

// SMTP HOSTINGER (Recommandé pour formulaire)
define('SMTP_USERNAME', 'hello@clicom.ch'); // Email créé dans Hostinger
define('SMTP_PASSWORD', 'VOTRE_MOT_DE_PASSE_FORT'); // ⚠️ À compléter
// Note: Créez l'email dans hPanel → Emails → Create

// GOOGLE ANALYTICS
define('GA4_MEASUREMENT_ID', 'G-XXXXXXXXXX'); // ← Créer propriété GA4

// LÉGAL
define('LEGAL_COMPANY_NAME', 'Clic COM Sàrl'); // Raison sociale exacte
define('LEGAL_UID', 'CHE-123.456.789'); // UID Suisse
define('LEGAL_PUBLISHER_NAME', 'Nom Directeur'); // Responsable publication
```

**Sécurité Mot de Passe SMTP**

⚠️ **NE JAMAIS commiter le mot de passe SMTP dans Git**

Option A : Variables d'environnement (avancé)
Option B : Fichier séparé non versionné (créer `/config/smtp-credentials.php`)

### Étape 3 : Configuration Email SMTP Hostinger

1. Allez dans **hPanel → Emails**
2. Cliquez **Create Email Account**
3. Créez : `hello@clicom.ch` (ou votre email)
4. Mot de passe fort (minimum 12 caractères, mixte)
5. Notez les credentials SMTP :
   - **Host** : `smtp.hostinger.com`
   - **Port** : `587` (TLS) ou `465` (SSL)
   - **Username** : `hello@clicom.ch`
   - **Password** : votre mot de passe

6. Complétez dans `/config/config.php` :
```php
define('SMTP_HOST', 'smtp.hostinger.com');
define('SMTP_PORT', 587);
define('SMTP_SECURE', 'tls');
define('SMTP_USERNAME', 'hello@clicom.ch');
define('SMTP_PASSWORD', 'votre_mot_de_passe');
```

### Étape 4 : Google Analytics 4

1. Allez sur https://analytics.google.com/
2. Créez une propriété GA4 pour votre domaine
3. Récupérez le **Measurement ID** (format : `G-XXXXXXXXXX`)
4. Complétez dans `/config/config.php` :
```php
define('GA4_MEASUREMENT_ID', 'G-XXXXXXXXXX');
```

### Étape 5 : Calendly

Votre URL Calendly est déjà configurée dans `/config/config.php` :
```php
define('CALENDLY_URL', 'https://calendly.com/hello-clicom/30min');
```

- [ ] Vérifiez que cette URL fonctionne
- [ ] Si vous voulez changer, modifiez cette constante
- [ ] Pour activer/désactiver l'embed iframe sur /contact/, changez :
```php
define('CALENDLY_EMBED', true); // true = iframe visible, false = lien uniquement
```

### Étape 6 : SSL / HTTPS

**Activer SSL Gratuit (Let's Encrypt)**

1. hPanel → **Advanced → SSL**
2. Installez **Free SSL** pour votre domaine
3. Attendez 5-10 minutes (propagation)
4. Testez : https://votre-domaine.ch

**Forcer HTTPS (Redirection HTTP → HTTPS)**

Le fichier `.htaccess` est déjà configuré avec une ligne commentée :

```apache
# Décommenter après activation SSL :
# <IfModule mod_rewrite.c>
#     RewriteEngine On
#     RewriteCond %{HTTPS} off
#     RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]
# </IfModule>
```

**Après activation SSL** :
1. Éditez `/public_html/.htaccess`
2. Décommentez les lignes ci-dessus (retirez les `#`)
3. Sauvegardez

### Étape 7 : Test Formulaire Contact

1. Allez sur https://votre-domaine.ch/contact/
2. Remplissez le formulaire avec vraies données
3. Soumettez
4. Vérifications :
   - [ ] Redirection vers `/merci/` ?
   - [ ] Email reçu sur `FORM_TO_EMAIL` ?
   - [ ] Email auto-reply reçu par l'expéditeur ?
   - [ ] Pas d'erreurs PHP (vérifier logs si problème)

**Si emails non reçus :**

- Vérifiez credentials SMTP dans `/config/config.php`
- Vérifiez que l'email SMTP existe dans hPanel → Emails
- Vérifiez dossier spam
- Consultez logs PHP : hPanel → Advanced → Error Logs

### Étape 8 : Google Search Console

1. Allez sur https://search.google.com/search-console
2. Ajoutez votre propriété (domaine ou URL)
3. Vérifiez propriété (méthode recommandée : balise HTML ou fichier)
4. Soumettez sitemap : `https://votre-domaine.ch/sitemap.xml`
5. Demandez indexation des pages principales

---

## 🔧 Pages À Créer (Non Livrées en PASS 2)

Le site est fonctionnel mais incomplet. Voici les pages à créer pour finaliser :

### Priorité P0 (Critiques)

**1. /services/index.php** — Page Services & Offres

Contenu à intégrer depuis `/docs/copy-framework.md` :
- 5 packs détaillés (Clic & Clients, Acquisition Turbo, CRM, Réseaux, CMO)
- Pricing cards (utiliser `card_pricing()` helper)
- Tableau comparatif
- FAQ services
- CTA (contact + Calendly)

Pattern à suivre : copier `index.php`, adapter meta + breadcrumb + contenu

**2. /a-propos/index.php** — Page À Propos

Contenu :
- Positionnement (approche pragmatique vs agences classiques)
- Qui sommes-nous (compléter identité depuis `/docs/placeholders.md`)
- Pourquoi PME Suisse
- Valeurs (transparence, mesure, résultats)
- CTA (découvrir méthode)

**3. /resultats/index.php** — Page Résultats & Méthode

Contenu :
- Process en 5 étapes (composant timeline déjà stylé dans CSS)
- KPI & reporting (framework sans inventer chiffres)
- Template étude de cas (avec mention "Exemple à remplacer")
- Témoignages (placeholders si non confirmés)
- CTA (commencer diagnostic)

### Priorité P1 (Importantes)

**4. /blog/** — Structure Blog Complète

Fichiers à créer :
- `/blog/posts.json` : Data articles (5 articles rédigés dans `/docs/copy-framework.md`)
- `/blog/index.php` : Liste articles (loop sur JSON)
- `/blog/post.php` : Template article (lecture JSON via `?slug=xxx`)

Articles à intégrer (copy complet dans `/docs/copy-framework.md` section Blog) :
1. Pourquoi vos pubs ne convertissent pas
2. Landing page checklist
3. Suivi des leads CRM
4. Budget pub PME Suisse
5. CRM minimum viable

**5. /mentions-legales/index.php** — Mentions Légales

Template Suisse :
- Raison sociale + UID (depuis `/config/config.php`)
- Responsable publication
- Hébergeur (Hostinger)
- Propriété intellectuelle
- Liens utiles

**6. /confidentialite/index.php** — Politique de Confidentialité

Template RGPD-friendly Suisse :
- Responsable traitement données
- Données collectées (formulaire, cookies)
- Utilisation (email, analytics)
- Durée conservation
- Droits utilisateur (accès, rectification, suppression)
- Contact RGPD

### Priorité P2 (Optionnelles)

**7. /sitemap-html.php** — Sitemap HTML (UX)

Plan du site navigable pour utilisateurs (complément au sitemap.xml SEO)

---

## 📝 Modèle de Page (Template Réutilisable)

Pour créer une nouvelle page, copiez ce template :

```php
<?php
/**
 * Page [NOM] — Clic COM
 */

// Init
define('APP_ACCESS', true);
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../includes/components.php';

// Meta data
$meta = [
    'title' => 'Titre Page — Clic COM',
    'description' => 'Description 150-160 caractères pour SEO.',
    'canonical' => site_url('nom-page/'),
    'schema' => [
        [
            'type' => 'breadcrumb',
            'items' => [
                ['name' => 'Accueil', 'url' => site_url()],
                ['name' => 'Nom Page', 'url' => site_url('nom-page/')]
            ]
        ]
        // Autres schemas si applicable (faq, article, etc.)
    ]
];

include __DIR__ . '/../includes/meta.php';
include __DIR__ . '/../includes/header.php';

// Breadcrumb
echo breadcrumb([
    ['name' => 'Accueil', 'url' => site_url()],
    ['name' => 'Nom Page']
]);
?>

<!-- Contenu de la page -->
<section class="section">
    <div class="container">
        <h1>Titre Principal</h1>
        <p>Contenu...</p>
    </div>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
```

---

## 🎨 Ressources Visuelles Manquantes

### SVG Icônes (Optionnel mais recommandé)

Le CSS attend des icônes dans `/assets/svg/icons/`. Pour l'instant, les icônes sont inline dans les pages. Pour optimiser :

Créez ces SVG (24x24px, stroke-width: 2) :
- `target.svg` : cible (acquisition)
- `chart-up.svg` : graphique croissant
- `shield-check.svg` : bouclier check
- `clock.svg` : horloge
- `users.svg` : utilisateurs
- `calendar.svg` : calendrier
- `check-circle.svg` : check
- `arrow-right.svg` : flèche
- `phone.svg` : téléphone
- `mail.svg` : email

Puis remplacez les SVG inline par :
```php
<?php echo svg_icon('nom-icon', 24); ?>
```

### Illustrations Abstraites (Optionnel)

Créez dans `/assets/svg/illustrations/` :
- `hero-blob.svg` : forme organique fond hero
- `lines-pattern.svg` : pattern lignes sections
- `gradient-mesh.svg` : dégradé CTA

### Image OpenGraph

Créez une image 1200x630px avec :
- Logo Clic COM
- Tagline "Marketing qui convertit pour PME Suisses"
- Couleurs brand (bleu #0066CC + vert #00A878)

Sauvegardez dans `/assets/images/og-home.png`

Puis dans `/includes/meta.php`, remplacez :
```php
$og_image = $meta['og_image'] ?? asset_url('images/og-home.png');
```

---

## ⚙️ Configuration Avancée (Optionnel)

### PHP 8+ Strict Types

Activer dans `config/config.php` (début fichier) :
```php
declare(strict_types=1);
```

### Logs Personnalisés

Les logs sont dans `/logs/` (créé automatiquement).

Pour consulter :
```bash
tail -f /public_html/logs/app-errors.log
tail -f /public_html/logs/php-errors.log
```

### Cache .htaccess

Le cache est configuré pour 1 mois (CSS/JS) et 1 an (images/SVG).

Pour vider cache après mise à jour CSS/JS :
1. Renommez fichier (ex: `styles.css` → `styles.v2.css`)
2. Mettez à jour référence dans `header.php`

OU utilisez query string :
```php
<link rel="stylesheet" href="<?php echo asset_url('css/styles.css?v=2'); ?>">
```

### Protection Admin (Optionnel)

Si vous créez une zone admin (`/admin/`) :

Créez `/admin/.htaccess` :
```apache
AuthType Basic
AuthName "Zone Réservée"
AuthUserFile /home/votreuser/.htpasswd
Require valid-user
```

Générez `.htpasswd` via hPanel → Advanced → Password Protect Directories

---

## 🆘 Troubleshooting

### Problème : Page blanche (500 Internal Server Error)

**Causes possibles :**
1. Erreur PHP syntax (vérifier logs : hPanel → Error Logs)
2. `.htaccess` incompatible (renommer temporairement en `.htaccess.bak`)
3. Permissions fichiers incorrectes (mettre 644 fichiers, 755 dossiers)

**Solution :**
```bash
# Via SSH ou File Manager
chmod 644 /public_html/index.php
chmod 755 /public_html/
```

### Problème : Formulaire n'envoie pas d'email

**Vérifications :**
1. Credentials SMTP corrects dans `/config/config.php`
2. Email SMTP créé dans hPanel → Emails
3. Port 587 (TLS) ou 465 (SSL) ouvert (généralement OK Hostinger)
4. Tester mail() simple :
```php
<?php
mail('votre@email.com', 'Test', 'Test message');
echo 'Email envoyé (vérifier spam)';
?>
```

### Problème : CSS/JS ne se charge pas

**Causes :**
1. Chemin incorrect (vérifier `asset_url()` dans `config.php`)
2. Cache navigateur (Ctrl+F5 pour refresh)
3. Permissions fichier (chmod 644)

**Solution :**
```bash
chmod 644 /public_html/assets/css/styles.css
chmod 644 /public_html/assets/js/main.js
```

### Problème : Menu mobile ne s'ouvre pas

**Causes :**
1. JavaScript ne se charge pas (vérifier Console navigateur F12)
2. Conflit JS (peu probable, aucune librairie externe)

**Solution :**
1. Ouvrez Console (F12 → Console)
2. Rafraîchissez page
3. Si erreurs JS, vérifiez que `/assets/js/main.js` est bien uploadé et accessible

---

## ✅ Checklist Post-Déploiement

### Configuration
- [ ] `/config/config.php` : Tous placeholders complétés
- [ ] SMTP configuré et testé
- [ ] Google Analytics ID ajouté
- [ ] Calendly URL vérifiée fonctionnelle
- [ ] SSL/HTTPS actif et forcé
- [ ] Domaine exact dans `SITE_URL`

### Fonctionnalités
- [ ] Formulaire contact : envoi email OK
- [ ] Formulaire contact : auto-reply OK
- [ ] Calendly : lien fonctionne
- [ ] Calendly : iframe (si activé) charge correctement
- [ ] Menu mobile : toggle fonctionne
- [ ] FAQ : accordéon fonctionne
- [ ] Navigation : tous liens internes OK

### SEO
- [ ] Sitemap.xml accessible : https://domaine.ch/sitemap.xml
- [ ] Robots.txt accessible : https://domaine.ch/robots.txt
- [ ] Google Search Console : sitemap soumis
- [ ] Meta tags vérifiés (view source)
- [ ] JSON-LD validé : https://validator.schema.org/
- [ ] OpenGraph test : https://www.opengraph.xyz/

### Performance
- [ ] PageSpeed Insights : Score > 85 mobile
- [ ] Images optimisées (TinyPNG si ajoutées)
- [ ] Gzip actif (vérifier Network tab, Content-Encoding: gzip)
- [ ] Cache headers actifs (vérifier Network tab, Cache-Control)

### Sécurité
- [ ] HTTPS forcé (HTTP → HTTPS redirect)
- [ ] `/config/` non accessible (test : https://domaine.ch/config/)
- [ ] Headers sécurité présents (SecurityHeaders.com)
- [ ] Formulaire : honeypot + rate limit testés
- [ ] Mot de passe SMTP fort (min 12 caractères)

### Accessibilité
- [ ] Navigation clavier testée (Tab, Enter, Escape)
- [ ] Skip-link fonctionne (Tab dès arrivée page)
- [ ] Contrastes texte vérifiés (WebAIM Contrast Checker)
- [ ] Lecteur écran testé (NVDA/JAWS si disponible)
- [ ] Formulaire : labels associés aux champs

### Mobile
- [ ] Test iPhone/Android réel
- [ ] Menu mobile fonctionne
- [ ] Formulaire : champs touch-friendly (> 44px height)
- [ ] Sticky CTA apparaît après scroll
- [ ] Sticky CTA : bouton fermeture fonctionne

---

## 📚 Documentation de Référence

- **Design System** : `/docs/brand-kit.md`
- **Architecture** : `/docs/ia-sitemap.md`
- **Copy & Messaging** : `/docs/copy-framework.md`
- **SEO** : `/docs/seo-plan.md`
- **Placeholders** : `/docs/placeholders.md`
- **Performance** : `/docs/performance-budget.md`

---

## 🎉 Prochaines Étapes

1. **Compléter pages manquantes** (Services, À propos, Résultats, Blog, Légales)
2. **Collecter contenu réel** (témoignages, études de cas, photos équipe)
3. **Créer visuels supplémentaires** (icônes SVG, illustrations, image OG)
4. **Tester tous scénarios** (desktop, mobile, différents navigateurs)
5. **Lancer campagnes** (Google Ads, référencement)
6. **Monitorer** (Google Analytics, Search Console, formulaires)

**Le site est prêt pour production sur les pages livrées. Bonne mise en ligne ! 🚀**
