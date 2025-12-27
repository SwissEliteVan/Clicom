# Architecture de l'Information — Clic COM

## Objectif du Site

**Primaire** : Générer des leads qualifiés (demandes pack découverte + appels Calendly)
**Secondaire** : Établir expertise et confiance (blog, résultats, méthode)

---

## Arborescence & Hiérarchie

```
Clic COM
│
├── 🏠 Accueil (/)
│   ├── Hero : promesse + CTA
│   ├── Problèmes fréquents (4 objections)
│   ├── Solutions (aperçu services)
│   ├── Méthode en 5 étapes
│   ├── Packs (aperçu 3 principaux)
│   ├── FAQ (6-8 questions)
│   └── CTA final (Calendly + formulaire)
│
├── 💼 Services & Offres (/services/)
│   ├── Intro positionnement
│   ├── 5 packs détaillés
│   │   ├── Clic & Clients (490 CHF)
│   │   ├── Acquisition Turbo (990 CHF/mois)
│   │   ├── Prenez le lead ! (CRM)
│   │   ├── Réseaux sans prise de tête
│   │   └── CMO partagé (sur devis)
│   ├── Tableau comparatif
│   ├── FAQ spécifique offres
│   └── CTA (démarrer + appel)
│
├── 👥 À propos (/a-propos/)
│   ├── Positionnement (approche pragmatique)
│   ├── Qui sommes-nous (placeholder équipe)
│   ├── Pourquoi Suisse / PME
│   ├── Valeurs (transparence, mesure, pragmatisme)
│   └── CTA (découvrir méthode)
│
├── 📊 Résultats & Méthode (/resultats/)
│   ├── Process détaillé (5 étapes)
│   ├── KPI & reporting (framework sans inventer)
│   ├── Template étude de cas
│   ├── Témoignages (placeholders si non confirmés)
│   └── CTA (commencer diagnostic)
│
├── 📝 Blog (/blog/)
│   ├── Liste articles (3-6 starters)
│   ├── Post 1 : Pubs qui ne convertissent pas
│   ├── Post 2 : Landing page checklist
│   ├── Post 3 : Suivi leads
│   ├── Post 4 : Budget pub
│   ├── Post 5 : CRM minimum viable
│   └── (+ navigation pagination future)
│
├── 📞 Contact (/contact/)
│   ├── Intro rassurante
│   ├── Formulaire contact (primaire)
│   ├── OU Calendly (lien + embed iframe)
│   ├── Coordonnées (placeholders)
│   └── FAQ contact rapide
│
├── ⚖️ Mentions légales (/mentions-legales/)
│   └── Template CH complet
│
├── 🔒 Confidentialité (/confidentialite/)
│   └── RGPD-friendly, template CH
│
├── ✅ Merci (/merci/)
│   ├── Confirmation envoi
│   ├── Next steps
│   ├── Liens utiles (blog, services)
│   └── CTA secondaire (Calendly si pas déjà fait)
│
└── ❌ 404 (/404.php)
    ├── Message friendly
    ├── Recherche ou nav principale
    └── CTA retour accueil

```

---

## Flux Utilisateur (Parcours Types)

### Parcours 1 : PME recherche agence marketing

```
SERP "agence marketing PME Suisse"
   ↓
Accueil : Hero → lecture promesse
   ↓
Scroll : Problèmes (reconnaissance) → Solutions
   ↓
CTA "Voir les offres" → /services/
   ↓
Compare packs → sélection "Clic & Clients" (entry-level)
   ↓
CTA "Démarrer" → /contact/
   ↓
Hésite → clique "Planifier un appel" (Calendly)
   ↓
CONVERSION : rendez-vous booké
```

**Optimisations**
- Hero doit immédiatement clarifier "pour PME Suisse"
- Section Problèmes = reconnaissance immédiate
- Packs : mettre en avant le "recommandé" (entry point)
- Calendly accessible partout (navbar + sections CTA)

### Parcours 2 : Cherche solution landing pages

```
SERP "landing page qui convertit"
   ↓
Blog : Post "Landing page checklist"
   ↓
Lecture article → CTA inline "Besoin d'aide ? Pack Clic & Clients"
   ↓
/services/ → lecture pack
   ↓
CTA "Exemple de résultat" → /resultats/
   ↓
Lit process + template étude de cas → confiance
   ↓
CTA "Commencer" → /contact/
   ↓
CONVERSION : formulaire envoyé
```

**Optimisations**
- Articles blog : CTA inline contextuel (pas juste fin d'article)
- Maillage interne : blog ↔ services ↔ résultats
- Page /resultats/ doit montrer process clair (rassure)

### Parcours 3 : Déjà client autre agence (sceptique)

```
Référence bouche-à-oreille → /accueil/
   ↓
Scroll rapide → section "J'ai déjà une agence"
   ↓
Lit objection traitée → curiosité
   ↓
CTA "Notre approche" → /a-propos/
   ↓
Lecture positionnement → résonne
   ↓
CTA "Voir la méthode" → /resultats/
   ↓
Process détaillé → décision
   ↓
CTA "Planifier un appel" (Calendly, moins engageant que formulaire)
   ↓
CONVERSION : appel booké
```

**Optimisations**
- Section objections sur accueil = critique
- Lien objection → page dédiée (/a-propos/ ou /resultats/)
- Calendly = CTA "doux" pour sceptiques

---

## Navigation Principale

### Header (Navbar Sticky)

**Desktop**
```
[Logo Clic COM]   Accueil | Services | Résultats | Blog | Contact        [Planifier un appel →]
```

**Mobile**
```
[Logo]                                                    [☰ Menu]

Menu ouvert :
- Accueil
- Services & Offres
- Résultats & Méthode
- Blog
- Contact
─────────────
[Planifier un appel] (bouton pleine largeur)
```

### Footer

**Colonnes**
```
┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│ Clic COM        │ Services        │ Ressources      │ Contact         │
├─────────────────┼─────────────────┼─────────────────┼─────────────────┤
│ Tagline courte  │ - Tous les packs│ - Blog          │ Email           │
│ "Marketing qui  │ - Clic & Clients│ - Résultats     │ Téléphone       │
│ fait vendre"    │ - Acq. Turbo    │ - FAQ           │ Adresse (si CH) │
│                 │ - CRM           │ - À propos      │                 │
│ [Réseaux si CH] │ - Réseaux       │                 │ [Planifier appel│
│                 │ - CMO           │                 │  (Calendly)]    │
└─────────────────┴─────────────────┴─────────────────┴─────────────────┘

Mentions légales | Politique de confidentialité

© 2024 Clic COM — À compléter : raison sociale exacte, UID, etc.
```

### Breadcrumb (toutes pages sauf accueil)

Exemple :
```
Accueil > Services & Offres
Accueil > Blog > Landing page checklist
```

**SEO** : JSON-LD BreadcrumbList sur chaque page

---

## Maillage Interne (Liens Stratégiques)

### Accueil → Autres Pages

| Section Accueil | Lien vers | Anchor Text |
|-----------------|-----------|-------------|
| Hero CTA primaire | /contact/ | "Testez notre pack découverte" |
| Hero CTA secondaire | Calendly | "Planifier un appel gratuit" |
| Solutions (aperçu) | /services/ | "Découvrir tous nos packs" |
| Méthode (aperçu) | /resultats/ | "Notre processus en détail" |
| FAQ | /services/ (si question offres) | "Voir les offres" |
| CTA final | /contact/ | "Démarrer maintenant" |

### Services → Autres Pages

| Section | Lien vers | Anchor Text |
|---------|-----------|-------------|
| Intro | /resultats/ | "Comment nous procédons" |
| Chaque pack | /contact/ | "Commander ce pack" |
| FAQ | /a-propos/ | "En savoir plus sur nous" |
| CTA final | Calendly | "Discutons de votre projet" |

### Blog → Autres Pages

| Contexte | Lien vers | Anchor Text |
|----------|-----------|-------------|
| Post pubs | /services/ (Acq. Turbo) | "Pack Acquisition Turbo" |
| Post landing pages | /services/ (Clic & Clients) | "Pack Clic & Clients" |
| Post leads | /services/ (CRM) | "Solution CRM pour PME" |
| Fin article | /contact/ | "Besoin d'aide ? Contactez-nous" |
| Sidebar/footer article | /resultats/ | "Voir nos résultats" |

### Résultats → Autres Pages

| Section | Lien vers | Anchor Text |
|---------|-----------|-------------|
| Après process | /services/ | "Choisir un pack adapté" |
| Template étude de cas | /contact/ | "Obtenir des résultats similaires" |
| CTA final | Calendly | "Commencer votre diagnostic" |

---

## CTA Map (Tous les CTA du Site)

### Hiérarchie CTA

**Primaire** : "Testez notre pack découverte" → /contact/ (formulaire)
**Secondaire** : "Planifier un appel gratuit de 30 min" → Calendly

### Placement CTA par Page

| Page | CTA Primaire | CTA Secondaire | CTA Tertiaire |
|------|--------------|----------------|---------------|
| Accueil | Hero : "Testez pack découverte" | Hero : "Planifier appel" | Section FAQ : "Voir offres" |
| Services | Chaque pack : "Commander" | Top section : "Planifier appel" | Comparatif : "Besoin d'aide ?" |
| À propos | Fin page : "Découvrir nos offres" | Navbar : "Planifier appel" | — |
| Résultats | Après process : "Démarrer diagnostic" | Navbar : "Planifier appel" | Template cas : "Contactez-nous" |
| Blog (liste) | — | Navbar : "Planifier appel" | — |
| Blog (post) | Fin article : "Contactez-nous" | Inline contextuel (pack) | Sidebar : "Planifier appel" |
| Contact | Formulaire (action primaire) | "Ou planifier appel" (Calendly) | — |
| Merci | "Voir nos services" | "Lire le blog" | — |

### Sticky CTA Mobile

**Comportement**
- Apparaît après scroll 50vh
- Texte : "Planifier un appel gratuit" (secondaire, moins intrusif)
- Lien : Calendly
- Désactivable : icône × → sauvegarde préférence localStorage
- N'apparaît PAS sur /contact/ ni /merci/

---

## Métadonnées par Page (SEO)

Voir `/docs/seo-plan.md` pour détails complets.

---

## Structure Données (JSON-LD)

### Toutes Pages
- **Organization** (identité Clic COM)
- **BreadcrumbList** (fil d'ariane)

### Accueil
- **Organization**
- **LocalBusiness** (si adresse confirmée)
- **WebSite** + SearchAction (optionnel)
- **FAQPage**

### Services
- **Service** (chaque pack)
- **FAQPage**

### Blog Posts
- **Article** (author, datePublished, etc.)

### Contact
- **ContactPage** (optionnel)

---

## Accessibilité Navigation

### Skip Links

Première chose dans `<body>` :
```html
<a href="#main-content" class="skip-link">Aller au contenu principal</a>
```

Visible uniquement au focus clavier.

### Landmarks ARIA

```html
<header role="banner">
<nav role="navigation" aria-label="Navigation principale">
<main id="main-content" role="main">
<aside role="complementary" aria-label="Barre latérale">
<footer role="contentinfo">
```

### Navigation Clavier

- Tab : ordre logique (header → main → footer)
- Shift+Tab : retour arrière
- Enter/Space : activation liens/boutons
- Escape : fermer menu mobile
- Flèches : navigation menu (optionnel, amélioration progressive)

---

## Checklist IA

- [ ] Parcours utilisateur mappés (3 personas minimum)
- [ ] CTA primaire/secondaire clairs sur chaque page
- [ ] Maillage interne stratégique (chaque page → 3-5 liens internes)
- [ ] Breadcrumb sur toutes pages (sauf accueil)
- [ ] Skip-link présent et fonctionnel
- [ ] Landmarks ARIA corrects
- [ ] Navigation clavier testée
- [ ] Sitemap.xml généré (toutes pages)
- [ ] Hiérarchie H1-H6 respectée (H1 unique, pas de saut)
