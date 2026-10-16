# Brafie design system

Calm, trustworthy breast-cancer education. Plain and accessible first; one distinctive rose accent.

**Source of structure:** cssmerch.vercel.app (token naming, type scale, sharp-corner buttons, thin-border cards, numbered steps, stat callouts). Structure and feel only. Do not copy its code, images, wording, humor or ticker strip. Palette, tone and fonts are Brafie's own.

Tokens live in `brafie-tokens.css`. Use the variables; never hard-code colors, sizes or radii.

## Principles
1. Readable over decorative: 16px body, 1.6 line height, high contrast, 44px minimum tap targets.
2. One accent. Rose on a white and near-black base. No pink page backgrounds, no gradients, no pastel text.
3. Calm tone. No jokes, no all-caps headings. Uppercase is for small eyebrow labels only.
4. Show structure: numbered steps (01, 02, 03) and large stat figures carry the content.
5. Thin borders and whitespace instead of shadows and thick accent borders.

## Color rules
| Token | Value | Use | Never use for |
|---|---|---|---|
| `--ink` | #121a33 | text | |
| `--muted` | #5d6680 | secondary text | |
| `--paper` | #faf6f8 | alternate section background | |
| `--line` | #e6dde3 | borders, dividers | |
| `--pink-deep` | #b8337a | buttons, links, eyebrows, small text (5.5:1 on white) | |
| `--pink-ink` | #9c2a68 | hover/pressed, text on pink-soft | |
| `--pink` | #e0569b | big numerals, icons, decoration (3.5:1 on white) | any text under 24px, button fills with white text |
| `--pink-soft` | #fde8f2 | flat highlight bands | gradients |

## Type
- Display (headings, stat figures): `--display`. Sans (everything else): `--sans`. Currently Bitter + Hanken Grotesk; swap the two variables to change the pairing.
- Scale: h1 clamp(2.4rem, 6vw, 4.5rem), h2 clamp(1.8rem, 4vw, 3rem), h3 clamp(1.3rem, 2.4vw, 1.75rem), body 1rem, small .875rem, eyebrow .75rem uppercase .08em.
- Self-host fonts (woff2 subsets); no render-blocking third-party font requests.

## Components
- **Buttons:** primary = filled `--pink-deep`, white text, 2px radius. Secondary = outlined `--line`, ink text. One primary per section.
- **Cards:** white, 1px `--line` border, 6px radius, 24px padding. Hover changes border to `--pink-deep`. No `border-t-4` accent borders on rounded cards.
- **Steps:** large numeral (`--pink`), short title, one-sentence body. Use for "Next steps" and "When to seek help".
- **Stats:** large `--pink` figure with a muted one-line label. Use for risk-factor numbers.
- **Bands:** alternate white and `--paper`; use `--pink-soft` for one key callout per page.

## Page order (home)
Hero (one short headline, one-line tagline, one primary button) → short explainer → key stats → numbered steps → FAQ → footer.

## Do not
- Use gradient text or gradient backgrounds.
- Use pink for body text or white-on-`--pink` buttons.
- Add decorative icons in rounded squares above headings.
- Nest cards inside cards.
- Add bounce/elastic motion; respect `prefers-reduced-motion`.

## Verify before shipping
Run `npx impeccable detect http://localhost:PORT` on the running site and check every page at phone width.
