# Shaka CSS — Twig Component Library

Système de styles pour la librairie de templates Twig privée.
Zéro dépendance. Zéro framework. Pure CSS moderne avec custom properties.

---

## Installation

Copier le dossier `assets/shaka/` dans votre projet et inclure l'entrée principale dans votre `base.html.twig` :

```twig
{# layout/base.html.twig #}
{% block head_styles %}
  <link rel="stylesheet" href="{{ asset('assets/shaka/shaka.css') }}">
{% endblock %}
```

---

## Architecture

```
assets/
└── shaka/
    ├── shaka.css       ← Point d'entrée unique (importe tout)
    ├── base.css        ← Tokens · Reset · Typographie · Utilitaires
    ├── layout.css      ← Container · Grille · Navbar · Footer · Partials
    ├── components.css  ← Button · Badge · Card · Modal · Dropdown · etc.
    └── sections.css    ← Hero · Features · CTA · Pricing · FAQ · Pages
```

---

## Principe de couplage Twig ↔ CSS

Les styles sont liés au HTML **exclusivement via des `data-attributes`**, jamais via des classes.
Cela préserve la séparation des responsabilités et évite la pollution du markup.

| Template Twig | Sélecteur CSS |
|---|---|
| `_button.html.twig` | `[data-variant][data-size]` |
| `_card.html.twig` | `[data-card]`, `[data-card-body]`, `[data-card-title]` |
| `_badge.html.twig` | `[data-badge][data-variant]` |
| `_alert.html.twig` | `[data-alert][data-type]` |
| `_hero.html.twig` | `[data-section="hero"]`, `[data-hero-inner]` |
| `_navbar.html.twig` | `nav[id$="-nav"]` |
| `_footer.html.twig` | `footer` |
| `_modal.html.twig` | `[data-modal]`, `[data-modal-backdrop]` |
| `_dropdown.html.twig` | `[data-dropdown]`, `[data-dropdown-menu]` |
| `pages/404.html.twig` | `[data-page="error-404"]` |
| `pages/500.html.twig` | `[data-page="error-500"]` |
| `pages/content.html.twig` | `[data-page="content"]`, `[data-article-body]` |

---

## Design Tokens

Tous les tokens sont des custom properties CSS définies dans `:root` (fichier `base.css`).

### Couleurs

```css
/* Brand (indigo) */
--color-brand-50  → --color-brand-950

/* Accent (amber) */
--color-accent-50 → --color-accent-900

/* Sémantiques */
--color-success | --color-warning | --color-danger | --color-info

/* Surfaces (s'adaptent au mode sombre) */
--surface-page | --surface-raised | --surface-overlay | --surface-subtle

/* Texte */
--text-primary | --text-secondary | --text-tertiary | --text-brand
```

### Typographie

```css
/* Familles */
--font-display  → 'Syne' (titres)
--font-body     → 'DM Sans' (corps)
--font-mono     → 'JetBrains Mono' (code)

/* Tailles (rem) */
--text-xs → --text-7xl

/* Graisse */
--weight-light → --weight-black
```

### Espacement (8pt grid)

```css
--space-1 (4px) → --space-48 (192px)
--section-py    → padding vertical des sections (fluid clamp)
--gutter        → padding horizontal global (fluid clamp)
```

### Autres tokens

```css
--radius-xs → --radius-full   /* Border radius */
--shadow-xs → --shadow-2xl    /* Box shadows */
--z-base → --z-top            /* Z-index scale */
--duration-fast → --duration-slower  /* Animations */
--ease-default | --ease-spring | --ease-bounce
--container-sm → --container-2xl     /* Breakpoints */
```

---

## Thème sombre

Le thème sombre est **automatique** via `prefers-color-scheme: dark`.

Forcer manuellement :

```html
<html data-theme="dark">   <!-- force dark -->
<html data-theme="light">  <!-- force light -->
```

---

## Personnalisation

Surcharger les tokens **après** l'import de `shaka.css` :

```css
/* mon-theme.css */
:root {
  /* Changer la couleur brand */
  --color-brand-600: #0ea5e9;    /* sky-500 */
  --color-brand-700: #0284c7;

  /* Changer la police */
  --font-display: 'Playfair Display', serif;
  --font-body:    'Source Sans 3', sans-serif;

  /* Ajuster l'arrondi global */
  --radius-md: 0.25rem;   /* style plus carré */
  --radius-xl: 0.5rem;
  --radius-2xl: 0.75rem;
}
```

---

## Composants — Props → CSS

### Button `_button.html.twig`

| Prop `variant` | Rendu |
|---|---|
| `primary` | Fond brand, texte blanc |
| `secondary` | Fond blanc, bordure grise |
| `ghost` | Fond transparent, hover subtle |
| `danger` | Fond rouge |
| `link` | Texte souligné, pas de fond |

| Prop `size` | Hauteur |
|---|---|
| `sm` | 32px |
| `md` | 40px (défaut) |
| `lg` | 48px |

### Badge `_badge.html.twig`

Variants : `default` · `primary` · `success` · `warning` · `danger` · `info` · `outline`

### Alert `_alert.html.twig`

Types : `info` · `success` · `warning` · `danger`

### Card `_card.html.twig`

Variants : `default` · `bordered` · `elevated` · `flat`

### Section Hero `_hero.html.twig`

Layouts : `split` (défaut) · `centered` · `fullwidth`
Aligns : `left` (défaut) · `center` · `right`

### Section Pricing `_pricing.html.twig`

La carte avec `featured: true` reçoit `data-featured` → fond brand, mise en avant visuelle.

---

## Accessibilité

- Tous les composants interactifs supportent `:focus-visible` avec un focus ring visible.
- Les icônes décoratives reçoivent `aria-hidden="true"`.
- Les modales utilisent `role="dialog"` + `aria-modal="true"` + `aria-labelledby`.
- Les dropdowns utilisent `role="menu"` + `aria-haspopup` + `aria-expanded`.
- Le skip-link est visible uniquement au focus clavier.
- Les FAQs utilisent `<details>/<summary>` natif — aucun JS requis pour l'expand/collapse.
- Toutes les animations respectent `prefers-reduced-motion`.

---

## Responsive

| Breakpoint | Largeur |
|---|---|
| Mobile | < 640px |
| Tablet | 640px – 1023px |
| Desktop | ≥ 1024px |
| Wide | ≥ 1280px |

Les grilles multi-colonnes se replient automatiquement sur mobile.
Les tailles de texte utilisent `clamp()` pour un scaling fluide.

---

## JavaScript requis

Ces composants nécessitent du JS pour leur comportement dynamique (la structure ARIA est déjà en place) :

- **`_dropdown.html.twig`** — toggle `aria-expanded`, fermeture au clic extérieur / `Escape`, navigation clavier
- **`_modal.html.twig`** — ouverture/fermeture, piège focus, retour focus sur le déclencheur
- **`_navbar.html.twig`** — toggle menu mobile (`data-open` sur `#nav-menu`)
- **`_pricing.html.twig`** — switch mensuel/annuel (toggle `hidden` sur `[data-price-yearly]`)

---

## Polices

Le système utilise [Google Fonts](https://fonts.google.com) par défaut (import dans `base.css`) :

- **Syne** — titres (`--font-display`)
- **DM Sans** — corps de texte (`--font-body`)
- **JetBrains Mono** — code (`--font-mono`)

Pour auto-héberger, supprimez la ligne `@import` dans `base.css` et servez les fichiers localement.

---

## Licence

Usage privé — librairie interne.
