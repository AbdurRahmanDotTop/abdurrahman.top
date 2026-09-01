---
name: Technical Precision
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#444748'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#0a0a0a'
  on-primary: '#ffffff'
  primary-container: '#212121'
  on-primary-container: '#898888'
  inverse-primary: '#c8c6c5'
  secondary: '#a83820'
  on-secondary: '#ffffff'
  secondary-container: '#fc7557'
  on-secondary-container: '#6c1000'
  tertiary: '#0b0a09'
  on-tertiary: '#ffffff'
  tertiary-container: '#222120'
  on-tertiary-container: '#8b8886'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1b1c1c'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#ffdad3'
  secondary-fixed-dim: '#ffb4a4'
  on-secondary-fixed: '#3d0600'
  on-secondary-fixed-variant: '#87200a'
  tertiary-fixed: '#e6e2e0'
  tertiary-fixed-dim: '#c9c6c4'
  on-tertiary-fixed: '#1c1b1a'
  on-tertiary-fixed-variant: '#484645'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  code-sm:
    fontFamily: Geist Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.4'
  label-caps:
    fontFamily: Geist Mono
    fontSize: 11px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
  container-max: 1280px
---

## Brand & Style

The design system is engineered for the high-performance context of Generative AI. It projects an image of technical sophistication, absolute clarity, and architectural order. The brand personality is "The Expert Architect"—quietly confident, meticulously organized, and focused on functional beauty.

The visual style is a fusion of **Modern Minimalism** and **Technical Editorial**. It utilizes a strict "ink-on-paper" feel where the interaction between pure black (Graphite) and pure white (Cloud) creates a high-end, gallery-like atmosphere. The Signal Coral accent is used sparingly to signify "active energy" or "output generation." Visual interest is generated not through decoration, but through structural precision: 1px hairlines, micro-dot grids, and disciplined whitespace.

## Colors

The palette is intentionally restricted to maintain focus and premium feel.

- **Cloud Surface (#FAFAFA)**: The primary canvas. It should feel expansive.
- **TF Graphite (#212121)**: Used for all primary typography, structural borders, and iconography. When used for borders, apply 10% opacity to maintain a "blueprint" feel.
- **Signal Coral (#FF7759)**: The singular high-contrast accent. It is reserved exclusively for primary actions, current status indicators, and critical technical feedback.

Do not introduce secondary grays. Use opacity layers of TF Graphite (10%, 40%, 60%) to create hierarchical variance in text and lines.

## Typography

This design system uses a dual-font strategy to balance human-centric design with technical utility.

**Manrope** is the voice of the product. Use it for all narrative content and primary UI labels. Bold weights should be used for display sizes with tight letter spacing to create a distinctive "editorial" punch.

**Geist Mono** is the "metadata layer." It represents the machine's input/output. Use it for data tables, code snippets, timestamps, and secondary labels. Always use the `label-caps` style for small technical identifiers or section headers to reinforce the architectural feel.

## Layout & Spacing

The layout is built on a strict **12-column modular grid** for desktop and a **4-column grid** for mobile.

- **The Micro-Grid**: All spacing (padding, margins, gap) must be a multiple of 4px.
- **Structural Lines**: Use 1px Graphite (10% opacity) lines to separate major sections (Header, Sidebar, Main Content). These lines should extend to the edge of the screen where possible to emphasize the grid.
- **Whitespace**: Content should never feel crowded. If in doubt, double the padding. High-impact areas (like AI generation outputs) should be surrounded by generous "safe zones" of Cloud Surface.

## Elevation & Depth

This design system eschews traditional shadows in favor of **Tonal Layering** and **Structural Outlines**.

- **Depth through Borders**: Depth is communicated by nesting elements within 1px Graphite borders. A "Card" is not elevated by a shadow, but defined by its stroke.
- **Layering**: Higher-level elements (like Modals or Popovers) should use a solid Cloud Surface background with a slightly darker 20% Graphite border to distinguish them from the base layer.
- **Technical Accents**: Use "micro-dots" (1px circles spaced in a 16px grid) as a background pattern for the lowest base layer to provide a sense of technical scale and texture without adding weight.

## Shapes

The shape language is controlled and precise.

- **Standard Elements**: Buttons, inputs, and cards use a consistent `0.5rem` (8px) radius. This provides just enough softness to feel modern while maintaining a geometric rigour.
- **Large Containers**: Hero sections or large modal containers may use `1rem` (16px) to define distinct workspace areas.
- **Interactive States**: Selection indicators (like focus states) should follow the exact radius of the parent element. Never use pill-shapes except for status badges (Chips).

## Components

### Buttons
- **Primary**: Solid TF Graphite background with white Manrope text. No border.
- **Secondary**: Transparent background, 1px TF Graphite border (20% opacity), Graphite text.
- **Action**: For AI triggers, use Signal Coral background with white text.

### Input Fields
Inputs are minimal. Only a bottom border (1px Graphite, 20% opacity) in its default state. Upon focus, the border becomes Signal Coral and a 1px solid Graphite outline appears around the entire field. Use Geist Mono for input text.

### Technical Chips
Small, rectangular with a 2px radius. Light Graphite background (5% opacity) with Geist Mono text. Used for tags, model versions, or parameters.

### AI Output Cards
Defined by 1px Graphite borders. Use the micro-dot background pattern within the card to signify "generated space."

### Progress Indicators
Use thin 2px Signal Coral lines. Avoid circular loaders; use horizontal "scanning" bar animations to reinforce the technical, linear aesthetic.