# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: young urban women in Ghana, roughly 20 to 40, English-comfortable and smartphone-first. They use Brafie on their own phone, on their own initiative, usually with no clinician in the room: to understand breast health in plain language, run a guided self-check, and know when and where to seek care. They want something private and quick, not a clinical intake.

## Product Purpose

Brafie is an English-first breast health education and self-awareness web app for Ghana. It teaches breast health basics (overview, symptoms, prevention, common myths), walks a user through a structured breast self-check, gives an on-device awareness score, helps find nearby screening facilities, sets reminder nudges, and answers questions from a local knowledge base. It is an awareness tool, not a diagnostic one.

Success means wider awareness reach: more women in Ghana meet and use reliable breast health basics. Clinical depth is valuable, but reach is the deciding outcome.

## Positioning

Brafie reaches women in Ghana directly, on their own phones, with plain-English breast health basics, a guided self-check, and a local assistant, without accounts and without sending health data off the device. Its advantage is reach with honesty: localized content and a no-signup, on-device experience that also refuses to ship unverified statistics or endorsements. A neighboring app that requires sign-in, uploads personal health data, or leans on unverified numbers cannot truthfully copy that stance.

## Operating Context

- Used on personal smartphones, often briefly and in daily life.
- English is the working language; users are assumed comfortable reading English.
- Connectivity may be intermittent; the app is installable as a PWA and its core flows run on-device.
- No clinician is present during normal use.
- The chat assistant is a local, keyword-matched knowledge base, not an LLM.
- Reminders are delivered in-app and via downloadable calendar (.ics) files; email and WhatsApp reminders are marked as coming soon.
- An optional .NET 8 backend exists in the repository but is not wired to the active UI.

## Capabilities and Constraints

Capabilities:

- Learn hub: overview, symptoms, prevention, and myths content (30 myths).
- Guided breast self-check with 24-hour progress persistence.
- On-device awareness/risk assessment that outputs a score band (low, moderate, high), not a diagnosis.
- Facility finder on a map (MapLibre with Overpass/Nominatim data).
- Reminders: in-app and calendar (.ics) export.
- Local keyword-matched chat assistant.
- Shareable PDF report generation.
- Theme and language settings; installable PWA; SEO route generation.

Technical constraints (current implementation):

- React, TypeScript, Vite, Tailwind CSS.
- One active locale (English); i18n scaffolding exists for other locales, whose types are tied to the English file's shape.
- State and progress persist in the browser via localStorage keys in the `sahtek:*` and `sahtek_*` families; API base and storage keys are treated as stable.
- No authentication and no live backend calls from the active UI; chat and risk scoring run locally.
- Medical-review status and evidence sources are intentionally empty.

Open decisions:

- Concrete reach metrics and launch targets are not yet defined.
- Whether to wire the optional backend into the UI is undecided.
- Expanding beyond English is undecided.

## Brand Commitments

- Product name: Brafie.
- Voice: plain, warm, non-alarming, non-diagnostic; written for Ghana, not translated.
- Lineage: adapted by LordScientist from the open-source project Sahtek by Anas Lahraoui. MIT License. Attribution must be preserved.

## Evidence on Hand

- No Ghana-specific statistics, hospitals, clinicians, phone numbers, testimonials, or endorsements are verified. Do not fabricate any.
- Screenshots live in `screenshots/`; social/OG assets in `public/og/`.
- Medical review is not in place; `MEDICAL_REVIEW` and `EVIDENCE_SOURCES` are intentionally empty and must stay empty until a real reviewer and sources exist.

## Product Principles

1. Reach over depth. Plain English and low friction; a woman can start in seconds on her own phone.
2. Never diagnose. Awareness content and the awareness score are not medical diagnosis.
3. Never invent facts. No fabricated statistics, facilities, clinicians, contacts, testimonials, or endorsements.
4. Privacy by default. Health inputs stay on-device; no account, no upload.
5. Preserve the lineage. Keep the MIT license and Sahtek/LordScientist attribution intact.

## Accessibility & Inclusion

- The reach goal implies the core flows should work on modest smartphones and low-bandwidth connections (installable PWA, on-device processing).
- No formal accessibility standard has been established yet.
