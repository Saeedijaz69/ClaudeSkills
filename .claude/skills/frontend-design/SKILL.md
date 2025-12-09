---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with ultra-premium feel and modern design. Use when building web components, pages, applications, or any UI requiring professional, polished, and well-structured design.
version: 3.0.0
---

# Frontend Design Skill

Create exceptional, production-grade frontend interfaces with an ultra-premium feel. This skill focuses on design principles, best practices, and modern approaches rather than prescriptive choices - empowering exploration while ensuring professional, polished results.

## Design Philosophy

### Core Principles

1. **Intentionality** - Every design decision has purpose
2. **Premium Feel** - Refined details that elevate the experience
3. **User-Centric** - Design serves the user, not the ego
4. **Performance** - Beautiful AND fast
5. **Accessibility** - Inclusive design is good design

### The Premium Design Mindset

Premium design isn't about complexity - it's about **refinement**:
- Precise spacing and alignment
- Thoughtful typography hierarchy
- Smooth, purposeful animations
- Attention to micro-interactions
- Consistent visual language
- Polished edge cases (loading, empty, error states)

## Design Process

### 1. Understand Before Designing

Before writing any code:
- **Who** is the user? What are their expectations?
- **What** problem does this interface solve?
- **Where** will this be used? (Context matters)
- **Why** does this need to exist?
- **How** should users feel when using it?

### 2. Establish Design Direction

Choose an intentional aesthetic approach:
- **Minimal & Clean** - Whitespace-driven, essential elements only
- **Bold & Expressive** - Strong colors, dynamic layouts
- **Soft & Approachable** - Rounded shapes, gentle colors
- **Sharp & Professional** - Precise edges, structured grids
- **Playful & Dynamic** - Motion-rich, interactive elements
- **Luxurious & Refined** - Premium details, sophisticated palette

The key is **commitment** - choose a direction and execute it consistently.

### 3. Design System Thinking

Always think in systems, not one-offs:
- Define a spacing scale
- Establish typography hierarchy
- Create color relationships
- Build reusable component patterns
- Document interaction patterns

## Typography Excellence

### Principles (Not Prescriptions)

**Hierarchy is Everything:**
- Clear distinction between heading levels
- Body text optimized for readability
- Supporting text (captions, labels) appropriately sized

**Font Selection Guidelines:**
- Choose fonts that match the brand personality
- Ensure excellent readability at all sizes
- Consider font loading performance
- Pair fonts intentionally (contrast in style, harmony in feel)
- Explore premium and distinctive typefaces - avoid the overused defaults

**Fluid Typography:**
- Use responsive sizing (clamp, viewport units)
- Scale proportionally across breakpoints
- Maintain readable line lengths (45-75 characters)

**Best Practices:**
- Limit to 2-3 font families maximum
- Use font weights strategically for hierarchy
- Pay attention to letter-spacing and line-height
- Consider text rendering and anti-aliasing

### Resources for Typography
- Google Fonts (extensive free library)
- Adobe Fonts (premium quality)
- Font Squirrel (curated free fonts)
- Fontshare (high-quality free fonts)
- Type foundries for distinctive choices

## Color & Visual Design

### Principles (Not Prescriptions)

**Build Cohesive Palettes:**
- Start with a primary color that reflects the brand
- Build supporting colors with purpose
- Create sufficient contrast for accessibility
- Design for both light and dark contexts

**Color Relationships:**
- Use color to guide attention
- Create visual hierarchy through color weight
- Ensure interactive elements are clearly distinguishable
- Consider color psychology and cultural context

**Best Practices:**
- Test for WCAG accessibility compliance
- Use CSS custom properties for maintainability
- Design semantic color tokens (success, warning, error)
- Consider users with color vision deficiencies

### Visual Depth & Texture
- **Shadows:** Use realistic, layered shadows for depth
- **Gradients:** Subtle gradients add richness and dimension
- **Textures:** Noise, grain, patterns add visual interest
- **Blur effects:** Glassmorphism, frosted effects for modern feel
- **Borders:** Subtle borders define and separate

## Animation & Motion

### Philosophy

Animations should feel **smooth, natural, and purposeful**:
- Guide user attention
- Provide feedback for interactions
- Create continuity between states
- Add delight without distraction
- Enhance perceived performance

### Animation Principles

**Timing & Easing:**
- Fast for small elements (100-200ms)
- Medium for UI transitions (200-400ms)
- Slow for large movements (400-700ms)
- Use appropriate easing (ease-out for entrances, ease-in for exits)

**Performance Rules:**
- Animate only `transform` and `opacity` for 60fps
- Use `will-change` sparingly
- Respect `prefers-reduced-motion`
- Test on lower-end devices

### Animation Types to Explore

**Micro-interactions:**
- Button hover/press states
- Input focus effects
- Toggle switches
- Checkbox animations
- Ripple effects

**Page Transitions:**
- Fade transitions
- Slide animations
- Scale effects
- Shared element transitions

**Scroll Animations:**
- Reveal on scroll
- Parallax effects
- Progress indicators
- Sticky transformations

**Content Animations:**
- Staggered list reveals
- Card hover effects
- Image zoom/pan
- Skeleton loading

**Continuous Animations:**
- Marquee/ticker effects
- Floating elements
- Gradient animations
- Subtle background movement
- Breathing/pulsing effects

### Animation Libraries

**CSS-First (Lightweight):**
- Native CSS animations and transitions
- CSS scroll-driven animations (modern browsers)

**JavaScript Libraries:**
- **Framer Motion** (React) - Declarative, powerful
- **GSAP** - Industry standard, highly capable
- **Anime.js** - Lightweight, versatile
- **Motion One** - Modern, performant
- **AutoAnimate** - Simple automatic animations
- **Lottie** - After Effects animations for web

**Specialized:**
- **React Spring** - Physics-based animations
- **Popmotion** - Functional animation library
- **Velocity.js** - High-performance animations

## Layout & Composition

### Modern Layout Approaches

**CSS Grid:**
- Complex, two-dimensional layouts
- Responsive without media queries
- Overlapping and layering
- Masonry-style layouts

**Flexbox:**
- One-dimensional alignment
- Dynamic spacing and distribution
- Responsive component layouts

**Container Queries:**
- Component-based responsiveness
- Context-aware layouts

### Layout Patterns

**Premium Patterns:**
- Asymmetric grids for visual interest
- Generous whitespace for breathing room
- Strategic negative space
- Overlapping elements for depth
- Full-bleed sections for impact

**Card Patterns:**
- Elevated cards with layered shadows
- Glass-effect cards
- Interactive hover states
- Image treatments (zoom, overlay, parallax)
- Stacked/overlapping card layouts

**Section Patterns:**
- Hero sections with impact
- Bento grid layouts
- Magazine-style layouts
- Split-screen compositions
- Scrollytelling sections

### Spacing Philosophy

- Use a consistent spacing scale
- Be generous with whitespace - it's premium
- Create rhythm through repetition
- Use spacing to group related elements
- Let content breathe

## Component Design

### Premium Component Characteristics

**Buttons:**
- Clear visual hierarchy (primary, secondary, ghost)
- Satisfying hover and active states
- Loading states with smooth transitions
- Proper focus indicators
- Icon integration

**Cards:**
- Thoughtful shadow and elevation
- Smooth hover transformations
- Content hierarchy within
- Edge case handling (long text, missing images)
- Interactive states

**Forms:**
- Clear input states (default, focus, error, success)
- Helpful inline validation
- Accessible labels and hints
- Smooth error transitions
- Auto-complete styling

**Navigation:**
- Clear active states
- Smooth transitions between states
- Mobile-first responsive patterns
- Mega menus done right
- Scroll-aware headers

**Modals & Overlays:**
- Smooth entry/exit animations
- Proper focus trapping
- Backdrop blur effects
- Escape and click-outside handling

## Best Practices Checklist

### Visual Design
- [ ] Consistent spacing throughout
- [ ] Clear typography hierarchy
- [ ] Cohesive color palette
- [ ] Intentional visual weight distribution
- [ ] Polish on all UI states

### Interaction Design
- [ ] All interactive elements have feedback
- [ ] Animations are smooth (60fps)
- [ ] Loading states are handled
- [ ] Error states are helpful
- [ ] Empty states are designed

### Accessibility
- [ ] Color contrast meets WCAG AA
- [ ] Keyboard navigation works
- [ ] Focus states are visible
- [ ] Screen reader compatible
- [ ] Respects motion preferences

### Performance
- [ ] Animations use transform/opacity
- [ ] Images are optimized
- [ ] Fonts load efficiently
- [ ] No layout shifts
- [ ] Smooth scrolling

### Responsiveness
- [ ] Works on all screen sizes
- [ ] Touch-friendly on mobile
- [ ] Readable text at all sizes
- [ ] Appropriate tap targets
- [ ] Considered landscape/portrait

## Recommended Libraries & Tools

### UI Component Libraries
- **shadcn/ui** - Beautiful, customizable components
- **Radix UI** - Unstyled, accessible primitives
- **Headless UI** - Unstyled, accessible components
- **Ark UI** - Headless component library

### CSS Frameworks
- **Tailwind CSS** - Utility-first, highly customizable
- **Open Props** - CSS custom properties library
- **Panda CSS** - CSS-in-JS with build-time extraction

### Animation
- **Framer Motion** - Best for React
- **GSAP** - Most powerful, framework-agnostic
- **Motion One** - Modern, performant

### Icons
- **Lucide** - Clean, consistent icons
- **Phosphor** - Flexible, beautiful icons
- **Heroicons** - Tailwind-aligned icons

### Design Resources
- **Figma** - Design and prototype
- **Realtime Colors** - Color palette visualization
- **Type Scale** - Typography scale generator
- **Easing Functions** - Animation easing reference

## Execution Excellence

### Before Starting
1. Understand the requirements fully
2. Identify the target aesthetic
3. Plan the component structure
4. Consider responsive behavior
5. Think through all states

### While Building
1. Start with structure, then style
2. Build mobile-first
3. Test interactions continuously
4. Check accessibility as you go
5. Refine the details

### Before Delivering
1. Test all interactive states
2. Verify responsive behavior
3. Check accessibility compliance
4. Optimize performance
5. Polish the micro-details

---

**Remember:** Premium design is in the details. Take time to refine spacing, smooth animations, and polish interactions. The difference between good and great is in the execution. Explore libraries, experiment with techniques, and always prioritize the user experience.
