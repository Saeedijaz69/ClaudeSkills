# Creative Design Reference Guide

## Animation Libraries Comparison

| Library | Size | Learning Curve | Best For | Performance |
|---------|------|----------------|----------|-------------|
| **CSS Animations** | 0kb | Low | Simple animations | Excellent |
| **Framer Motion** | ~30kb | Medium | React projects | Very Good |
| **GSAP** | ~60kb | Medium-High | Complex timelines | Excellent |
| **Anime.js** | ~17kb | Low | General purpose | Very Good |
| **Lottie** | ~50kb | Low | After Effects animations | Good |
| **Three.js** | ~150kb | High | 3D graphics | Good |
| **PixiJS** | ~100kb | Medium | 2D WebGL | Excellent |

## Easing Functions Cheat Sheet

### CSS Cubic Bezier

```css
/* Ease Out (Deceleration) */
ease-out-sine:   cubic-bezier(0.39, 0.575, 0.565, 1)
ease-out-quad:   cubic-bezier(0.25, 0.46, 0.45, 0.94)
ease-out-cubic:  cubic-bezier(0.215, 0.61, 0.355, 1)
ease-out-quart:  cubic-bezier(0.165, 0.84, 0.44, 1)
ease-out-quint:  cubic-bezier(0.23, 1, 0.32, 1)
ease-out-expo:   cubic-bezier(0.19, 1, 0.22, 1)
ease-out-circ:   cubic-bezier(0.075, 0.82, 0.165, 1)

/* Ease In (Acceleration) */
ease-in-sine:    cubic-bezier(0.47, 0, 0.745, 0.715)
ease-in-quad:    cubic-bezier(0.55, 0.085, 0.68, 0.53)
ease-in-cubic:   cubic-bezier(0.55, 0.055, 0.675, 0.19)
ease-in-quart:   cubic-bezier(0.895, 0.03, 0.685, 0.22)
ease-in-quint:   cubic-bezier(0.755, 0.05, 0.855, 0.06)
ease-in-expo:    cubic-bezier(0.95, 0.05, 0.795, 0.035)

/* Ease In-Out */
ease-in-out-sine:   cubic-bezier(0.445, 0.05, 0.55, 0.95)
ease-in-out-quad:   cubic-bezier(0.455, 0.03, 0.515, 0.955)
ease-in-out-cubic:  cubic-bezier(0.645, 0.045, 0.355, 1)
ease-in-out-quart:  cubic-bezier(0.77, 0, 0.175, 1)
ease-in-out-expo:   cubic-bezier(1, 0, 0, 1)

/* Special Effects */
ease-out-back:   cubic-bezier(0.34, 1.56, 0.64, 1)
ease-in-back:    cubic-bezier(0.6, -0.28, 0.735, 0.045)
bounce:          cubic-bezier(0.68, -0.55, 0.265, 1.55)
```

## Color Theory Quick Reference

### Color Harmonies

| Harmony | Formula | Effect |
|---------|---------|--------|
| Complementary | Base + 180° | High contrast, vibrant |
| Analogous | Base ± 30° | Harmonious, calm |
| Triadic | Base + 120° + 240° | Balanced, colorful |
| Split-Comp | Base + 150° + 210° | Contrast with nuance |
| Tetradic | Base + 90° + 180° + 270° | Rich, complex |

### Color Psychology

| Color | Emotions | Use Cases |
|-------|----------|-----------|
| Red | Energy, passion, urgency | CTAs, sales, food |
| Orange | Creativity, enthusiasm | Kids, sports, tech |
| Yellow | Optimism, clarity, warmth | Caution, happiness |
| Green | Growth, health, nature | Eco, health, money |
| Blue | Trust, calm, professional | Corporate, tech, medical |
| Purple | Luxury, creativity, wisdom | Beauty, premium |
| Pink | Playful, romantic, feminine | Fashion, beauty |
| Black | Elegance, power, mystery | Luxury, fashion |
| White | Clean, simple, pure | Minimal, medical |

## SVG Path Commands

| Command | Parameters | Description |
|---------|------------|-------------|
| M/m | x y | Move to |
| L/l | x y | Line to |
| H/h | x | Horizontal line |
| V/v | y | Vertical line |
| C/c | x1 y1 x2 y2 x y | Cubic bezier |
| S/s | x2 y2 x y | Smooth cubic |
| Q/q | x1 y1 x y | Quadratic bezier |
| T/t | x y | Smooth quadratic |
| A/a | rx ry angle large-arc sweep x y | Arc |
| Z/z | | Close path |

## Canvas Performance Tips

1. **Use `requestAnimationFrame`** for smooth animations
2. **Batch draw calls** - minimize state changes
3. **Use layers** - separate static from dynamic
4. **Optimize with `willReadFrequently`** when reading pixels
5. **Use OffscreenCanvas** for worker rendering
6. **Cache complex shapes** as pre-rendered images
7. **Use integer coordinates** when possible
8. **Avoid `shadowBlur`** for performance

## WebGL Best Practices

1. **Minimize draw calls** - batch geometry
2. **Use texture atlases** - reduce texture switches
3. **Optimize shaders** - avoid branching, use built-ins
4. **Use instancing** for repeated objects
5. **Compress textures** - use proper formats
6. **Manage buffers** - reuse when possible
7. **Use LOD** (Level of Detail) for complex scenes

## Animation Performance Checklist

- [ ] Only animate `transform` and `opacity`
- [ ] Use `will-change` sparingly
- [ ] Avoid layout thrashing
- [ ] Debounce scroll/resize handlers
- [ ] Use CSS animations over JS when possible
- [ ] Test with DevTools Performance tab
- [ ] Profile on low-end devices
- [ ] Respect `prefers-reduced-motion`

## Creative Inspiration Resources

### Design Inspiration
- [Awwwards](https://awwwards.com)
- [Dribbble](https://dribbble.com)
- [Behance](https://behance.net)
- [CodePen](https://codepen.io)

### Generative Art
- [OpenProcessing](https://openprocessing.org)
- [Shadertoy](https://shadertoy.com)
- [Art Blocks](https://artblocks.io)

### Motion Design
- [Motion Design School](https://motiondesign.school)
- [Lottie Files](https://lottiefiles.com)
- [UI Movement](https://uimovement.com)

### Tools
- [Cubic Bezier](https://cubic-bezier.com)
- [Easings.net](https://easings.net)
- [CSS Gradient](https://cssgradient.io)
- [Blobmaker](https://blobmaker.app)

## File Format Guide

| Format | Use Case | Transparency | Animation |
|--------|----------|--------------|-----------|
| SVG | Vector graphics, icons | Yes | Yes (SMIL/CSS) |
| PNG | Raster with transparency | Yes | No |
| WebP | Modern web images | Yes | Yes |
| AVIF | Next-gen images | Yes | Yes |
| GIF | Simple animations | 1-bit | Yes |
| MP4 | Video content | No | Yes |
| Lottie | Complex animations | Yes | Yes |

## Mathematical Functions for Animations

```javascript
// Linear interpolation
const lerp = (start, end, t) => start + (end - start) * t;

// Smooth step
const smoothstep = (edge0, edge1, x) => {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

// Map range
const map = (value, inMin, inMax, outMin, outMax) =>
  ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

// Clamp
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

// Noise (simplex recommended for smooth results)
// Use: import { createNoise2D } from 'simplex-noise';

// Random in range
const random = (min, max) => Math.random() * (max - min) + min;

// Distance
const distance = (x1, y1, x2, y2) =>
  Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

// Angle between points
const angle = (x1, y1, x2, y2) => Math.atan2(y2 - y1, x2 - x1);
```
