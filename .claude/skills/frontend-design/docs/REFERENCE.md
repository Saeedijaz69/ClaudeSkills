# Frontend Design Reference Guide

## Table of Contents
1. [Font Resources](#font-resources)
2. [Color Tools](#color-tools)
3. [Animation Libraries](#animation-libraries)
4. [CSS Frameworks](#css-frameworks)
5. [Icon Libraries](#icon-libraries)
6. [Design Inspiration](#design-inspiration)

---

## Font Resources

### Google Fonts Recommendations

| Category | Font Name | Use Case |
|----------|-----------|----------|
| **Display** | Playfair Display | Luxury, editorial |
| **Display** | Fraunces | Playful, warm |
| **Display** | Cormorant | Elegant, serif |
| **Display** | Syne | Bold, modern |
| **Sans** | Plus Jakarta Sans | Clean, versatile |
| **Sans** | General Sans | Geometric, professional |
| **Sans** | DM Sans | Rounded, friendly |
| **Sans** | Outfit | Modern, tech |
| **Mono** | JetBrains Mono | Code, technical |
| **Mono** | Fira Code | Ligatures, dev |

### Premium Font Sources
- [Pangram Pangram](https://pangrampangram.com/) - High-quality display fonts
- [Colophon Foundry](https://www.colophon-foundry.org/) - Distinctive typefaces
- [Klim Type](https://klim.co.nz/) - Professional fonts
- [Font Share](https://www.fontshare.com/) - Free quality fonts

### Font Loading Best Practices

```html
<!-- Preconnect for faster loading -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Font-display: swap for performance -->
<link href="https://fonts.googleapis.com/css2?family=Font+Name&display=swap" rel="stylesheet">
```

```css
/* Font-face with fallbacks */
@font-face {
  font-family: 'Custom Font';
  src: url('font.woff2') format('woff2');
  font-display: swap;
  font-weight: 100 900;
}

/* System font stack fallback */
font-family: 'Custom Font', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

---

## Color Tools

### Online Tools
- [Coolors](https://coolors.co/) - Palette generator
- [Adobe Color](https://color.adobe.com/) - Color wheel & harmony
- [Realtime Colors](https://www.realtimecolors.com/) - Preview in context
- [Contrast Checker](https://webaim.org/resources/contrastchecker/) - WCAG compliance
- [Who Can Use](https://www.whocanuse.com/) - Color blindness simulation

### Color Harmony Rules

| Type | Formula | Effect |
|------|---------|--------|
| **Complementary** | Base + 180° | High contrast |
| **Analogous** | Base ± 30° | Harmonious |
| **Triadic** | Base + 120° + 240° | Balanced |
| **Split-Complementary** | Base + 150° + 210° | Vibrant |
| **Square** | Base + 90° + 180° + 270° | Rich |

### Semantic Color Conventions

```css
:root {
  /* Status Colors */
  --success: hsl(142, 76%, 36%);  /* Green */
  --warning: hsl(38, 92%, 50%);   /* Orange/Yellow */
  --error: hsl(0, 84%, 60%);      /* Red */
  --info: hsl(199, 89%, 48%);     /* Blue */
  
  /* Interactive States */
  --hover: /* 10% darker than base */
  --active: /* 15% darker than base */
  --focus: /* Ring color at 15% opacity */
  --disabled: /* 50% opacity */
}
```

---

## Animation Libraries

### CSS-Only Solutions

**Animate.css**
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
<div class="animate__animated animate__fadeInUp">Content</div>
```

### JavaScript Libraries

**Framer Motion (React)**
```jsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

**GSAP**
```javascript
import gsap from 'gsap';

gsap.from('.element', {
  duration: 1,
  y: 50,
  opacity: 0,
  stagger: 0.2,
  ease: 'power3.out'
});
```

**Auto Animate**
```jsx
import { useAutoAnimate } from '@formkit/auto-animate/react';

const [parent] = useAutoAnimate();
<ul ref={parent}>{items.map(item => <li key={item}>{item}</li>)}</ul>
```

### Animation Performance Tips

1. **Only animate `transform` and `opacity`** - GPU accelerated
2. **Use `will-change` sparingly** - `will-change: transform`
3. **Avoid animating `width`, `height`, `top`, `left`** - Triggers layout
4. **Use `requestAnimationFrame`** for JS animations
5. **Test with DevTools Performance tab**

---

## CSS Frameworks

### Utility-First

**Tailwind CSS**
```bash
npm install -D tailwindcss
npx tailwindcss init
```

### Component Libraries

| Library | Framework | Style |
|---------|-----------|-------|
| **shadcn/ui** | React | Customizable |
| **Radix UI** | React | Unstyled, accessible |
| **Headless UI** | React/Vue | Unstyled, accessible |
| **DaisyUI** | Tailwind | Pre-styled |
| **Mantine** | React | Full-featured |

### CSS-in-JS

**Styled Components**
```jsx
import styled from 'styled-components';

const Button = styled.button`
  background: ${props => props.primary ? 'blue' : 'white'};
  color: ${props => props.primary ? 'white' : 'blue'};
  padding: 0.75em 1.5em;
`;
```

---

## Icon Libraries

### SVG Icon Sets

| Library | Icons | Style |
|---------|-------|-------|
| **Lucide** | 1000+ | Clean, consistent |
| **Heroicons** | 450+ | Tailwind-aligned |
| **Phosphor** | 6000+ | Multiple weights |
| **Tabler** | 4000+ | Stroke-based |
| **Feather** | 280+ | Minimal |

### Usage Examples

**React (Lucide)**
```jsx
import { Home, Settings, User } from 'lucide-react';

<Home className="w-6 h-6" />
```

**Inline SVG**
```html
<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
</svg>
```

### Icon Best Practices

1. **Use SVG over icon fonts** - Better accessibility, smaller size
2. **Set `aria-hidden="true"`** for decorative icons
3. **Add `role="img"` and `aria-label`** for meaningful icons
4. **Use `currentColor`** for easy color inheritance
5. **Optimize SVGs** with SVGO

---

## Design Inspiration

### Websites
- [Awwwards](https://www.awwwards.com/) - Award-winning designs
- [Dribbble](https://dribbble.com/) - UI/UX shots
- [Behance](https://www.behance.net/) - Full projects
- [Land-book](https://land-book.com/) - Landing pages
- [Mobbin](https://mobbin.com/) - Mobile patterns

### UI Patterns
- [UI Patterns](https://ui-patterns.com/) - Design patterns
- [Checklist Design](https://www.checklist.design/) - UX checklists
- [Laws of UX](https://lawsofux.com/) - Psychology principles

### Code Examples
- [CodePen](https://codepen.io/) - Frontend experiments
- [CSS-Tricks](https://css-tricks.com/) - Tutorials & techniques
- [Codrops](https://tympanus.net/codrops/) - Creative effects

---

## Quick Reference Commands

### Generate Color Palette
```bash
node scripts/generate-color-palette.js 220
```

### Generate Typography Scale
```bash
node scripts/generate-typography-scale.js 16 perfect-fourth
```

### Check Accessibility
```bash
node scripts/accessibility-checker.js contrast #333333 #ffffff
```

---

## Useful CSS Snippets

### Smooth Scrolling with Reduced Motion Respect
```css
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}
```

### Container Query
```css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    flex-direction: row;
  }
}
```

### Fluid Clamp Calculator
```
clamp(MIN, PREFERRED, MAX)
PREFERRED = (yAxisIntersection / 16)rem + (slope * 100)vw
```

### Custom Scrollbar
```css
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: var(--color-neutral-100);
}
::-webkit-scrollbar-thumb {
  background: var(--color-neutral-400);
  border-radius: 4px;
}
```

---

*This reference is maintained as part of the frontend-design skill.*
