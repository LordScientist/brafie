# Brafie (Ghana) · adaptation notes, decisions and what still needs verification

This document records the localisation of the open-source **Sahtek** app into
**Brafie**, an English-first breast health education app for users in Ghana, and,
importantly, the content that was **removed or left unverified** rather than
replaced with guesses.

**Ghanaian adaptation and localisation by LordScientist.** Distributed under the
**MIT License**.

---

## 1. Language approach

- **English is the default and only supported UI language.** English is the
  official language of Ghana, so it is the one language that can be supported
  consistently across the whole interface today.
- **No machine translation was used, and no partial translations were added.**
  Ghanaian languages (Twi, Ga, Ewe, Dagbani, …) are *not* offered yet, because a
  half-translated medical interface is worse than an honestly English one.
- The i18n layer is left in place and ready: adding a Ghanaian language means
  creating `src/i18n/<code>.ts` implementing the `Translation` type, registering
  it in `src/i18n/index.ts` (lazy map) and `SUPPORTED_LANGUAGES`
  (`src/config/constants.ts`), and adding it to `INDEXED_LOCALES` in
  `src/seo/routes.ts`. `LanguageSwitch` hides itself while only one language is
  supported and reappears automatically once a second is added.
- The former non-English locale files (`ar`, `fr`, `es`, `de`, `ru`, `pt`) remain
  in `src/i18n/` but are **no longer bundled or offered**. They are retained only
  as reference from the original project.
- A language persisted by the old multilingual build (for example `ar`) is
  **clamped to English at runtime** (`src/hooks/useLanguage.ts`) so a saved
  preference can never flip the English UI into a right-to-left layout.

---

## 2. What still needs verification (do not invent these)

| # | Item | Status | Where it surfaces |
|---|------|--------|-------------------|
| 1 | **Ghana-specific breast-cancer statistics** (incidence, late-stage %, average age at diagnosis) | **Unverified.** Morocco's figures (~12,000/year, ~60% late, age ~48) were removed from the English interface rather than relabelled as Ghana's. | Learn → Overview, homepage stats, chat knowledge |
| 2 | **Named medical reviewer** | **None.** `MEDICAL_REVIEW` / `EVIDENCE_SOURCES` in `src/config/constants.ts` are intentionally empty. No Ghanaian clinical review has occurred. | Home → credibility, About |
| 3 | **Hospitals, clinics, doctors, phone numbers** | **None added.** The Doctors page still reads live public map data (OpenStreetMap/Overpass/Nominatim). No Ghanaian provider is hard-coded. | `/doctors` |
| 4 | **Public contact email** | **Empty on purpose.** `APP.email` is `''`, so the footer hides the Contact link instead of shipping the original Morocco address. Add a monitored address to restore it. | Footer |
| 5 | **Canonical site origin / deployed domain** | **Still the original `https://sahtek.tech`.** Set `VITE_SITE_ORIGIN` (see `src/hooks/useDocumentMeta.ts`) or `SITE_ORIGIN` for the SEO build script, and the `whatsappService` / `calendarReminder` URLs, to the real Brafie origin before launch. | SEO tags, sitemap, WhatsApp + calendar links |
| 6 | **Ghana health-service claims** | The Morocco "free mammography programme" line was **removed**, not replaced. No Ghanaian screening-coverage claim is made. | Learn → Overview facts |
| 7 | **Screenshots with embedded Arabic** | **Resolved.** The Arabic raster captures were deleted and replaced with live English JSX mock screens. See section 4. | Home hero + self-check preview |
| 8 | **Non-English bundled content still Morocco-flavoured** | **Needs localisation review. Do not enable as-is.** The non-`en` blocks in `src/data/content.ts` (overview facts, myths, self-check guide) still name Morocco and its figures; the French block also has broken accents/mojibake (e.g. `l?gumes`, `m?decin`, and `'??'` where emoji were lost). These entries are unreachable while English is the only shipped locale, but each must be properly localised and reviewed before a non-English locale is ever enabled. | `src/data/content.ts` (non-`en` blocks) |
| 9 | **US-derived survival / lifetime-risk figures shown in English** | **Qualified: Africa leads, US/global context retained.** The English UI states `1 in 8` (lifetime risk) and `99%` (5-year survival when found early), plus `+90%`, with **no citation in the app** (`EVIDENCE_SOURCES` is empty). `1 in 8` ≈ US lifetime risk (~13%): ACS *Breast Cancer Facts & Figures 2024–2025*; NCI SEER. `99%` = US 5-year relative survival for **localized** breast cancer (SEER 2016–2022: localized 100.0%, all stages 91.9%). Neither is representative of Ghana. Global/African context (GLOBOCAN 2022): ~2.30M new cases worldwide; Africa ~198k new cases / 91k deaths. **Addressed (2026-10-15):** the Africa figure (~198k new cases, GLOBOCAN 2022) now leads the English stats, while the US/global figures (`1 in 8`, `99%`, `+90%`) are kept as general/global context and qualified ("worldwide"/"global"). Ghana-specific figures still need a verified source before use. | `src/i18n/en.ts` (homepage stats), `src/data/content.ts` (overview facts, myth m6) |

---

## 3. Morocco-specific references intentionally retained (dormant)

These are **not** shown in the English/Ghana interface; they are kept only as
historical/reference material from the original project, or because removing them
would change an API contract or risk data loss:

- The non-English locale files under `src/i18n/` (`ar`, `fr`, `es`, `de`, `ru`, `pt`).
- **Per-page local language maps** that are separate from `src/i18n/` and still
  carry `ar`/`fr`/… alongside `en`: `src/pages/DoctorsPage.tsx`,
  `src/pages/ReminderPage.tsx`, `src/pages/RiskAssessmentPage.tsx`,
  `src/hooks/useChat.ts`, `src/services/whatsappService.ts`,
  `src/utils/reportGenerator.ts`, `src/utils/calendarReminder.ts`,
  `src/utils/notificationScheduler.ts`, `src/data/chatKnowledge.ts`. Only the
  `en` entries are reachable now.
- The `morocco` key in the `Statistics` type (`src/types/api.ts`) and the
  `statistics` mock data (`src/data/content.ts`): this mirrors the original
  backend API contract, which was **not** changed. Its English `awareness_note`
  was made country-neutral; its numeric fields are still the original Morocco
  figures and are unused by the interface.
- `LANGUAGE_META.ar` in `src/config/constants.ts` (required by the `Language`
  union type, unused while English is the only supported language).
- Storage keys and the API base URL keep their original identifiers
  (`sahtek:*`, `sahtek-tech.onrender.com`) on purpose, they are not user-facing,
  and renaming them would risk losing saved data or breaking the API contract.
- Code comments referring to the original Darija-first authoring approach.

---

## 4. Images and decorative visuals with original-brand content

Per the brief, images are **not** edited to paint over embedded text. Instead:

- **Phone screenshots: replaced by live English JSX.**
  The Arabic raster captures (`public/assets/screens/self-check-intro.*`,
  `self-check-step.*`, `reminder.*`, which showed the header «صحّتك»,
  «الخطوة 1 من 5», Arabic step copy and Arabic bottom nav) have been **deleted**.
  The home hero and self-check preview now render
  `src/components/home/PreviewScreen.tsx`: an English mini-UI drawn from the
  app's own design tokens, inside the existing `PhoneMockup` (which was always
  documented to accept live JSX). This avoids shipping screenshots in the wrong
  language and cannot drift the way a bitmap does; the mock is decorative and
  `aria-hidden`. The obsolete `AppScreenshot` helper was removed from
  `src/components/ui/BrandImage.tsx`. A future capture pipeline (Puppeteer/
  Playwright) could restore real captures, but none is required for correctness.
- **The `ZelligeAccent` motif** (`src/components/ui/ZelligeAccent.tsx`): the
  eight-point Moroccan *khatam* tile, used as ambient decoration on the home,
  about, footer, FAQ, companion and design-system surfaces. It contains **no
  text**, but it is a Morocco-specific visual motif. Left in place to preserve the
  existing visual design; a design decision is needed on whether Ghana should have
  its own motif.
- **Generated SVG illustrations** (`step-*.svg`, `sign-*.svg`, `how-*.svg`,
  `method-flow.svg`, etc.) contain only Latin text and numerals (e.g. "01",
  "changes worth knowing"). No Arabic. No change needed.
- **Logo mark** (`src/components/ui/RibbonMark.tsx`) is a plain pink-ribbon
  geometry, no embedded Arabic. `favicon.svg` and `pwa-icon.svg` likewise
  contain no text.
- `public/assets/body-map-*.{avif,webp,png}` is a text-free illustration (a
  `HIGGSFIELD AI` watermark is visible), safe to keep.

---

## 5. Files changed for this adaptation

- `src/config/constants.ts`: app identity (`Brafie`), empty contact, English-only languages.
- `src/i18n/index.ts`: loads English only; documents how to add Ghanaian locales.
- `src/i18n/en.ts`: app name + Morocco/Darija references rewritten for Ghana; self-check title.
- `src/data/chatKnowledge.ts`, `src/data/content.ts`: English copy localised.
- `src/components/ui/LanguageSwitch.tsx`: hidden while one language is supported.
- `src/hooks/useLanguage.ts`: clamps a legacy persisted language to English (no stray RTL).
- `src/seo/routes.ts`, `scripts/generate-seo.mjs`: English/`en-GH` indexing.
- `src/hooks/useDocumentMeta.ts`: configurable site origin; `en_GH` locale.
- `index.html`, `vite.config.ts`: English `Brafie` metadata and PWA manifest.
- `src/pages/SelfCheckPage.tsx`: breast self-check title + hierarchy.
- `src/components/layout/BottomNav.tsx`: compact mobile labels.
- `src/pages/ReminderPage.tsx`, `src/services/whatsappService.ts`: Ghana `+233`
  phone formatting and Brafie branding.
- `src/utils/formatters.ts`: `en-GH` date/number formatting.
- `src/components/home/PreviewScreen.tsx`: new: English live mock phone screens.
- `src/components/home/SelfCheckPreview.tsx`, `src/pages/HomePage.tsx`: use the
  live mock instead of Arabic screenshots; removed `public/assets/screens/`.
- `src/components/ui/BrandImage.tsx`: removed the obsolete `AppScreenshot`.
- `src/pages/AboutPage.tsx`, `src/components/layout/Footer.tsx`: LordScientist
  attribution and a restrained Ghana accent.
- `src/utils/reportGenerator.ts`, `src/components/learn/PreventionTracker.tsx`:
  Brafie branding; removed the `sahtek.tech` domain from shared/exported content.
- `README.md`, this document.

---

## 6. Attribution

**Ghanaian adaptation and localisation by LordScientist.** Appears on the About
page (Credits section) and in the site footer. Brafie is built on the original
open-source **Sahtek** project; distributed under the **MIT License**.
