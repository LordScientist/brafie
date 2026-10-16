---
name: Brafie
description: A private, caring breast health awareness guide for women in Ghana.
colors:
  magenta: "rgb(214 51 132)"
  magenta-deep: "rgb(181 36 110)"
  petal-soft: "rgb(255 240 246)"
  berry-deep: "rgb(74 13 44)"
  calm-teal: "rgb(20 184 166)"
  gold: "rgb(224 164 88)"
  warn-amber: "rgb(217 119 6)"
  attention-red: "rgb(220 38 38)"
  info-blue: "rgb(59 130 246)"
  ink: "rgb(45 31 45)"
  muted: "rgb(122 100 115)"
  canvas: "rgb(255 245 247)"
  card: "rgb(255 255 255)"
  sunken: "rgb(250 241 244)"
  hairline: "rgb(243 220 230)"
  control-line: "rgb(154 127 143)"
typography:
  display:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 1.9rem + 3.4vw, 4.25rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2.125rem, 1.7rem + 1.9vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 800
    lineHeight: 1.4
    letterSpacing: "0.12em"
  numeral:
    fontFamily: "Bitter, Georgia, serif"
    fontSize: "1.375rem"
    fontWeight: 700
    lineHeight: 1.3
rounded:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.25rem"
  xl: "1.5rem"
  "2xl": "2rem"
  "3xl": "2.5rem"
  pill: "999px"
spacing:
  "1": "0.25rem"
  "2": "0.5rem"
  "3": "0.75rem"
  "4": "1rem"
  "6": "1.5rem"
  "8": "2rem"
  "12": "3rem"
  section: "4rem"
  gutter: "1.25rem"
components:
  button-primary:
    backgroundColor: "{colors.magenta}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "0 1.5rem"
    height: "3rem"
  button-primary-hover:
    backgroundColor: "{colors.magenta-deep}"
  button-secondary:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 1.5rem"
    height: "3rem"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.magenta-deep}"
    rounded: "{rounded.pill}"
    padding: "0 1.5rem"
    height: "3rem"
  card:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.3xl}"
    padding: "1.25rem"
  safety-note:
    backgroundColor: "{colors.petal-soft}"
    textColor: "{colors.muted}"
    rounded: "{rounded.xl}"
    padding: "0.875rem 1rem"
---

# Design System: Brafie

## Overview

**Creative North Star: "The Petal Garden"**

Brafie is a rose-tinted world built for one frightened person reading on her phone. Everything is soft and rounded, nothing is sharp, and no surface is ever a cold grey. The palette is a warm magenta on a warm neutral ground, chosen so that a page about breast health feels like care rather than a clinic. Depth is a blush, not a shadow: elevation is tinted rose, never black, so the page stays airy even when it is dense with guidance.

The system refuses alarm. There is no red verdict anywhere: the most urgent state is gold, and escalation is carried by words, icons and timeframes rather than by danger colour. Emphasis comes from weight and size, never from decoration. The interface is deliberately quiet so the content can be trusted.

**Key Characteristics:**
- Warm rose-tinted neutrals; no cold grey anywhere in the system.
- Softness as the brand: generous radii, no sharp corners.
- Calm, never alarm: gold is the ceiling of urgency, red never appears as a verdict.
- One editorial serif, used only for numerals.
- On-device, private, honest: the visual language stays plain and non-diagnostic.

## Colors

A rose-to-magenta brand over a warm, rose-tinted neutral ground, with calm teal, gold and blue carrying semantic meaning.

### Primary
- **Brafie Magenta** (rgb(214 51 132)): the identity. Fills, icons, active states, the CTA gradient. Not legal for body text.
- **Magenta Deep** (rgb(181 36 110)): the AA-safe brand tone for text and for the darkest CTA stop (5.7:1 on canvas).
- **Petal Soft** (rgb(255 240 246)): the tinted brand background for chips, soft fills and safety notes.

### Secondary
- **Calm Teal** (rgb(20 184 166)): trust, confirmation, privacy notes.
- **Gold** (rgb(224 164 88)): the warmth of the highest urgency band and of ornament. Decorative fill only; gold text uses rgb(146 94 24).

### Tertiary
- **Info Blue** (rgb(59 130 246)): informational, non-urgent emphasis.
- **Warn Amber** (rgb(217 119 6)): "see a doctor" nudges, warm and calm.
- **Attention Red** (rgb(220 38 38)): reserved. Never a verdict, never on an awareness result.

### Neutral
- **Ink** (rgb(45 31 45)): primary text (15.6:1, AAA).
- **Muted** (rgb(122 100 115)): secondary text and placeholders (5.0:1, AA).
- **Canvas** (rgb(255 245 247)): the rose-tinted page ground.
- **Card** (rgb(255 255 255)): the default surface.
- **Sunken** (rgb(250 241 244)): wells and inset areas.
- **Hairline** (rgb(243 220 230)): decorative dividers.
- **Control Line** (rgb(154 127 143)): the 3:1 boundary for form fields and controls.

### Named Rules
**The No-Alarm Rule.** Red is never a verdict. The most urgent awareness state is gold; a woman who has just found something must never meet a red card.

**The One Magenta Rule.** The brand fill covers at most a tenth of any screen. Its rarity is what makes the CTA land.

## Typography

**Display Font:** Hanken Grotesk (with system-ui, sans-serif)
**Body Font:** Hanken Grotesk (with system-ui, sans-serif)
**Accent Serif:** Bitter (with Georgia, serif)

**Character:** One warm humanist grotesque does all the work, with a sturdy slab serif held in reserve for numerals. The pairing reads as friendly and unfussy rather than clinical or editorial.

### Hierarchy
- **Display** (800, clamp(2.75rem, 1.9rem + 3.4vw, 4.25rem), 1.05, -0.03em): the hero headline only.
- **Headline** (800, clamp(2.125rem, 1.7rem + 1.9vw, 3rem), 1.1, -0.02em): section headings.
- **Title** (700, 1.375rem, 1.3, -0.01em): card and sub-section titles.
- **Body** (400, 1rem, 1.7): all prose, held to a 68ch measure.
- **Label** (800, 0.6875rem, 1.4, 0.12em, uppercase): eyebrows, overlines and small captions.

### Named Rules
**The Numerals-Only Rule.** Bitter is loaded only for digits: care-card numbers, step counters, the self-check step. It is subset to `0123456789`, so any word set in `font-serif` will fall back to Georgia by design.

## Layout

A single 72rem content column with a 68ch prose measure and a 4px spacing base. Sections breathe at 4rem of vertical rhythm; the horizontal gutter is 1.25rem. Spacing is generous above a heading and tighter below it, so headings anchor to the content they introduce. Density stays low: this is guidance to be read, not a dashboard to be scanned.

## Elevation & Depth

Depth is a blush, not a shadow. Every elevation token is tinted from the brand (rgb(214 51 132)) or the deep berry, never neutral black, so lifted surfaces read warm. Glass is used selectively: navbars, one floating panel, a single hero card, and never glass-on-glass. The dark theme swaps pink haze for true black depth and steps the accent text up to a light pink for contrast.

### Shadow Vocabulary
- **petal** (`0 4px 24px rgb(214 51 132 / 0.08)`): the resting card shadow.
- **petal-lg** (`0 12px 40px rgb(214 51 132 / 0.14)`): hover lift and primary buttons.
- **petal-xl** (`0 24px 60px rgb(214 51 132 / 0.2)`): the strongest hover, reserved.
- **glow-brand** (`0 0 28px -6px rgb(214 51 132 / 0.5)`): a single soft bloom per view, at most.

### Named Rules
**The Warm-Elevation Rule.** Shadows are rose-tinted, never grey. A neutral shadow is a bug, not a neutral.

## Shapes

Nothing sharp; softness is the brand. Cards use a large 2.5rem radius, chips and controls are fully pill-shaped, and inputs and notes sit at 1rem to 1.5rem. Borders are hairline and warm; the only heavier accent is a coloured top edge on category cards. Controls are tall on purpose: the minimum tap target is 44px.

## Components

### Buttons
- **Shape:** fully rounded pill (999px).
- **Primary:** the CTA gradient (rgb(214 51 132) to rgb(168 31 99)) with white text, height 3rem (md), horizontal padding 1.5rem. Gradient, not a flat fill, so every stop clears AA with white text.
- **Hover / Focus:** a 1px lift on hover and a 3% press on tap, both CSS transforms neutralised by reduced-motion. A visible focus ring is drawn from the brand.
- **Secondary / Outline / Ghost:** secondary is a white card surface with an ink label; outline is a transparent surface with a 2px magenta border; ghost is label-only.

### Cards / Containers
- **Corner Style:** 2.5rem radius (rounded-3xl).
- **Background:** white (rgb(255 255 255)) or glass.
- **Shadow Strategy:** petal at rest, petal-lg on hover for interactive cards.
- **Border:** 1px warm hairline; optional coloured top edge for category.
- **Internal Padding:** 1.25rem.

### Safety Note (signature)
The recurring "this is not a diagnosis" / "your answers stay on your device" block. A 1px hairline border, a soft tinted background per variant (petal, calm, gold, amber), an icon, and muted caption text. It carries `role="note"` so a screen reader can jump to it. It appears on every page that educates, scores, guides or answers.

### Inputs / Fields
- **Style:** white surface, 1px Control Line border (3:1), 1rem radius.
- **Focus:** a brand focus ring, never a colour-only change.
- **Placeholder:** Muted, never a browser default grey.

### Navigation
- **Style:** glass, with an opaque ink label. Active items use the Magenta Deep text tone on a Petal Soft chip. Mobile collapses to a drawer with the same tokens.

## Do's and Don'ts

### Do:
- **Do** tint every neutral warm. Cold grey is off-world.
- **Do** keep body copy at 1rem / 16px and within a 68ch measure.
- **Do** carry emphasis with weight and size, not decoration.
- **Do** reserve Bitter for digits, and keep the brand fill to roughly a tenth of a screen.
- **Do** keep the minimum tap target at 44px.

### Don't:
- **Don't** use red as a verdict or on an awareness result. The urgency ceiling is gold.
- **Don't** use gradient text. Emphasis is weight or size.
- **Don't** stack glass on glass.
- **Don't** use a neutral (grey) shadow. Elevation is rose-tinted.
- **Don't** set body text in Bitter; it ships digits only and will fall back.
- **Don't** put the brand fill (4.2:1) on body text. Use Magenta Deep.
