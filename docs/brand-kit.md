# Brand Kit — Clic COM

## Positionnement

**Promesse centrale**
"Gagnez des clients, pas juste des clics."

**Proposition de valeur**
Marketing orienté conversion pour PME suisses : acquisition, pages de vente, relances. Simple, mesurable, pragmatique.

**Ton de voix**
- Direct, sans jargon
- Orienté résultats business (pas vanité metrics)
- Pragmatique, pas bullshit
- Confiance par la transparence (budget, délais, KPI)
- Français Suisse romande standard
- Zéro emojis

---

## Design Tokens (CSS Variables)

### Couleurs

```css
:root {
  /* Primaires */
  --color-bg: #FAFAFA;
  --color-surface: #FFFFFF;
  --color-text: #1A1A1A;
  --color-text-muted: #5A5A5A;

  /* Accents */
  --color-accent-primary: #0066CC;      /* Bleu confiance */
  --color-accent-primary-hover: #0052A3;
  --color-accent-secondary: #00A878;    /* Vert action/croissance */
  --color-accent-secondary-hover: #008A63;

  /* Feedback */
  --color-success: #00A878;
  --color-error: #D32F2F;
  --color-warning: #F57C00;

  /* Bordures & ombres */
  --color-border: #E0E0E0;
  --color-shadow: rgba(26, 26, 26, 0.08);
  --color-shadow-strong: rgba(26, 26, 26, 0.16);
}
```

**Justification couleurs**
- Fond clair (#FAFAFA) : réduit fatigue visuelle, moderne
- Texte très foncé (#1A1A1A) : contraste 15.8:1 (AAA)
- Bleu primaire : confiance, expertise (évite le rouge agressif)
- Vert secondaire : croissance, résultats (positif sans être flashy)

### Typographie

```css
:root {
  /* Famille */
  --font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;

  /* Échelle */
  --font-size-xs: 0.875rem;    /* 14px */
  --font-size-sm: 1rem;        /* 16px */
  --font-size-base: 1.125rem;  /* 18px */
  --font-size-lg: 1.25rem;     /* 20px */
  --font-size-xl: 1.5rem;      /* 24px */
  --font-size-2xl: 2rem;       /* 32px */
  --font-size-3xl: 2.5rem;     /* 40px */
  --font-size-4xl: 3rem;       /* 48px */

  /* Line-height */
  --line-height-tight: 1.25;
  --line-height-base: 1.6;
  --line-height-relaxed: 1.8;

  /* Poids */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}
```

**Justification typo**
- system-ui : performance, lisibilité native, zéro latence
- Taille base 18px : lisibilité optimale (WCAG recommande 16px min)
- Line-height 1.6 : confort lecture longue
- Échelle modulaire : hiérarchie claire

### Spacing

```css
:root {
  --space-xs: 0.25rem;   /* 4px */
  --space-sm: 0.5rem;    /* 8px */
  --space-md: 0.75rem;   /* 12px */
  --space-base: 1rem;    /* 16px */
  --space-lg: 1.5rem;    /* 24px */
  --space-xl: 2rem;      /* 32px */
  --space-2xl: 3rem;     /* 48px */
  --space-3xl: 4rem;     /* 64px */
  --space-4xl: 6rem;     /* 96px */

  /* Sections */
  --section-padding-y: var(--space-3xl);
  --section-padding-y-mobile: var(--space-2xl);

  /* Container */
  --container-max-width: 1200px;
  --container-padding-x: var(--space-lg);
}
```

### Border & Shadows

```css
:root {
  /* Border radius */
  --radius-sm: 8px;
  --radius-base: 14px;
  --radius-lg: 18px;
  --radius-full: 9999px;

  /* Bordures */
  --border-width: 1px;
  --border-style: solid;
  --border: var(--border-width) var(--border-style) var(--color-border);

  /* Ombres */
  --shadow-sm: 0 1px 3px var(--color-shadow);
  --shadow-base: 0 4px 12px var(--color-shadow);
  --shadow-lg: 0 8px 24px var(--color-shadow-strong);
  --shadow-focus: 0 0 0 3px rgba(0, 102, 204, 0.2);
}
```

### Transitions

```css
:root {
  --transition-fast: 150ms ease-in-out;
  --transition-base: 250ms ease-in-out;
  --transition-slow: 400ms ease-in-out;
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --transition-fast: 0ms;
    --transition-base: 0ms;
    --transition-slow: 0ms;
  }
}
```

---

## Composants Visuels

### 1. Navbar (Sticky)

**Specs**
- Hauteur : 72px desktop, 64px mobile
- Fond blanc opacité 95% + blur(12px)
- Shadow subtile au scroll
- Logo gauche (SVG, height 32px)
- Navigation centrale (desktop) / burger (mobile)
- CTA "Planifier un appel" (bouton secondaire)

**États**
- Sticky : shadow-sm + backdrop-filter
- Focus : outline 3px bleu (--shadow-focus)
- Mobile : menu slide-in depuis droite

### 2. Hero Section

**Structure**
- Badge au-dessus H1 ("Agence marketing Suisse" ou similaire)
- H1 : font-size-4xl (48px), line-height-tight
- Sous-titre : font-size-lg (20px), color-text-muted
- 3-5 bullets bénéfices (icônes SVG + texte)
- CTA primaire (bouton accent-primary) + secondaire (lien souligné)
- Élément visuel : SVG abstraction légère (blob/gradient) en fond

**Layout**
- Desktop : texte 60% / visuel 40% (flex)
- Mobile : stack vertical, visuel réduit ou caché

### 3. Card Service

**Specs**
- Padding : 32px
- Border : 1px solid var(--color-border)
- Radius : var(--radius-base)
- Hover : shadow-base + translate(-2px, -4px)
- Icône SVG en haut (48x48px, accent-primary)
- Titre H3
- Description courte (2-3 lignes)
- Lien "En savoir plus →"

### 4. Pricing Card

**Specs**
- Mise en avant du pack "recommandé" : border accent-primary (2px) + badge
- Header : nom pack + prix + "CHF/mois" (ou one-time)
- Liste livrables (icônes check SVG)
- Footer : CTA "Démarrer" (bouton pleine largeur)
- Mention "Prix indicatif (à confirmer)" si applicable

**Variantes**
- Standard : border gris
- Recommandé : border bleu + shadow-lg
- Sur devis : prix remplacé par "Sur devis" + bouton "Discutons-en"

### 5. FAQ Accordion

**Specs**
- Bouton question : full width, texte left, icône chevron right
- Expanded : chevron rotate(90deg)
- Réponse : padding-left 24px, slide-down animation
- ARIA : aria-expanded, aria-controls, role="region"

### 6. Testimonial Card

**Specs**
- Citation en italique, font-size-lg
- Avatar placeholder (SVG initiales) ou icône entreprise
- Nom + poste + entreprise (text-muted)
- Si non confirmé : mention "Exemple (à remplacer)" en petit sous la card

### 7. Process Timeline (Steps)

**Specs**
- 5 étapes : Diagnostic → Offre → Mise en place → Optimisation → Reporting
- Desktop : horizontal avec lignes connectrices
- Mobile : vertical avec ligne gauche
- Icônes SVG numérotées (cercle + chiffre)
- Titre étape + description courte

### 8. Sticky CTA Mobile

**Specs**
- Position : fixed bottom, full width
- Padding : 16px
- Shadow-lg
- Bouton CTA primaire full width
- Apparaît après scroll 50vh
- Désactivable : data-attribute + localStorage preference

---

## SVG Assets à Créer

### Icônes (24x24px, stroke-width: 2)

**Obligatoires**
- `target.svg` : cible (acquisition)
- `chart-up.svg` : graphique croissant (résultats)
- `shield-check.svg` : bouclier check (sécurité/garantie)
- `clock.svg` : horloge (rapidité)
- `users.svg` : utilisateurs (équipe/clients)
- `calendar.svg` : calendrier (planification)
- `check-circle.svg` : check cercle (validation)
- `arrow-right.svg` : flèche droite (CTA)
- `phone.svg` : téléphone (contact)
- `mail.svg` : email (contact)
- `menu.svg` : burger menu
- `close.svg` : croix (fermeture)
- `chevron-right.svg` : chevron (accordéon)
- `chevron-down.svg` : chevron bas (scroll hint)

**Optionnels**
- `search.svg` : recherche
- `settings.svg` : paramètres
- `globe.svg` : web
- `megaphone.svg` : publicité

### Illustrations abstraites

**hero-blob.svg**
- Forme organique (blob) en accent-primary opacité 10%
- Utilisé en fond hero + sections clés
- Viewbox 800x600

**lines-pattern.svg**
- Lignes diagonales subtiles
- Fond sections alternées
- Opacité 5%

**gradient-mesh.svg**
- Dégradé radial accent-primary → accent-secondary
- Opacité 8%
- Backdrop optionnel pour sections CTA

---

## Règles d'Usage

### Contrastes (WCAG AAA)

- Texte normal (#1A1A1A sur #FAFAFA) : 15.8:1 ✓
- Texte muted (#5A5A5A sur #FAFAFA) : 7.2:1 ✓
- Accent primaire (#0066CC) : utiliser uniquement sur fond clair
- Boutons : texte blanc sur accent-primary = 4.8:1 (AA large text) ✓

### Focus States

Toujours visible, jamais `outline: none` sans remplacement.

```css
:focus-visible {
  outline: 3px solid var(--color-accent-primary);
  outline-offset: 2px;
}
```

### Animations

Toutes les animations doivent respecter `prefers-reduced-motion`.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Responsive Breakpoints

```css
/* Mobile first */
--breakpoint-sm: 640px;   /* Tablets portrait */
--breakpoint-md: 768px;   /* Tablets landscape */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Large desktop */
```

---

## Checklist Qualité Design

- [ ] Contraste texte/fond ≥ 7:1 (AAA)
- [ ] Focus visible sur tous éléments interactifs
- [ ] Touch targets ≥ 44x44px (mobile)
- [ ] Spacing cohérent (multiples de 4px)
- [ ] Animations désactivables (prefers-reduced-motion)
- [ ] SVG avec width/height fixes (éviter CLS)
- [ ] Pas de texte en images (sauf logos)
- [ ] Hiérarchie typographique claire (H1 unique, H2-H6 structurés)
