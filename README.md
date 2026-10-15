<div align="center">

# 🎀 Brafie · Breast Health Ghana

### *Breast-cancer awareness and a guided self-check, adapted for Ghana*

**A private, caring breast-health awareness companion, localised for women in Ghana.**

Early detection saves lives. Brafie makes it accessible, private, and easy to understand, in clear, everyday English.

> **Ghanaian adaptation and localisation by [LordScientist].** Based on the original open-source **Sahtek** project by **Anas Lahraoui**, and distributed under the **MIT License**.

<br/>

[![Adapted for Ghana](https://img.shields.io/badge/Adapted_for-Ghana_🇬🇭-006B3F?style=for-the-badge)](https://github.com/LordScientist/breast-cancer-project)
&nbsp;
[![License: MIT](https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge)](./LICENSE)

<br/>

![React](https://img.shields.io/badge/React_18-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)
![MapLibre](https://img.shields.io/badge/MapLibre_GL-396CB2?style=flat-square&logo=maplibre&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-Installable-5A0FC8?style=flat-square&logo=pwa&logoColor=white)
![Privacy first](https://img.shields.io/badge/Privacy-on--device-D63384?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-22C55E?style=flat-square)

<br/>

**[🐛 Report Bug](../../issues)** · **[✨ Request Feature](../../issues)**

<br/>

*Ghanaian adaptation of the open-source Sahtek project · Made with 💗 for women in Ghana*

</div>

---

## 📑 Table of Contents

- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [What Makes Brafie Different](#-what-makes-brafie-different)
- [Roadmap](#-roadmap)
- [Author](#-author)
- [Acknowledgments](#-acknowledgments)
- [License](#-license)

---

## 💡 About the Project

### The Problem

Breast cancer is the **most common cancer among women worldwide**, and too many cases in Ghana and across the region are found late, when treatment is harder and survival drops.

> ⚠️ **Ghana-specific figures are still being verified.** The original project documented Morocco's national figures (~12,000 new cases a year, ~60% diagnosed late, average diagnosis age ~48). Those are **not** Ghanaian statistics and have been removed from the interface. The English stats lead with a **regional (Africa) figure** and keep the `1 in 8` / `99%` figures clearly labelled as **global** context. No Ghana-specific numbers are shown until a verified source is confirmed; see [`docs/GHANA_LOCALISATION.md`](./docs/GHANA_LOCALISATION.md).

What is universal: the gap is rarely medicine: it is **awareness, access, and comfort**. Many women lack clear information, feel embarrassed to seek help, or simply do not know how to check themselves.

### Our Solution

**Brafie** turns a smartphone into a private, judgement-free health companion. It teaches women how to perform a monthly self-check, understand their risk, separate myth from fact, find a nearby doctor, and stay consistent, in **clear, everyday English**, with a structure ready for Ghanaian languages.

### Why It Matters

- 🤝 **Culturally sensitive**: a warm, respectful tone, never clinical or shaming.
- 🔒 **Privacy by design**: **no camera, no photos, no accounts, no sensitive data leaves the device.** The chat assistant, risk scoring, self-check progress and reminders all run in the browser.
- 📱 **Meets women where they are**: on the phone, in their language, on their terms.

> Brafie isn't a diagnosis tool. It's an **awareness and empowerment** tool, and it always points to a real doctor.

---

## ✨ Key Features

| | Feature | Description |
|:---:|---|---|
| 🌐 | **English-first, Ghana-ready** | Ships in clear, everyday English. The i18n layer is structured so Ghanaian languages (Twi, Ga, Ewe, Dagbani…) can be added one at a time, once each is fully translated and medically reviewed, never machine-translated. |
| 📚 | **Educational Hub** | Overview, symptoms, prevention, and a **30-myth** infinite-scroll flip-card wall that busts misconceptions one tap at a time. |
| 🩺 | **Guided Self-Check** | Interactive **5-step** monthly self-exam with per-step timers and **voice guidance** (`SpeechSynthesis`). Progress resumes within 24 hours if she leaves and returns. |
| 👩 | **Interactive Body Map** | Clickable symptom zones that explain what to look and feel for, visually, without a single photo. |
| 📊 | **Risk Assessment** | A **10-question, weighted, on-device** awareness score with tailored recommendations, exportable as a **branded PDF or JSON** report. It is an awareness score, **not** a probability of disease. |
| 🤖 | **Private On-Device Assistant** | A keyword-matched breast-health assistant that answers from a **bundled knowledge base**. No API key, no LLM, and **nothing she types leaves the device**. Voice input is consent-gated and explained before the mic ever opens. |
| 🗺️ | **Worldwide Doctor Finder** | Live **OpenStreetMap** map with autocomplete location search and real distance calculation: find hospitals, clinics and pharmacies nearby. |
| 💬 | **Reminders** | A monthly **calendar reminder** (`.ics`, the one method that fires when the app is closed) plus **in-app browser notifications** while Brafie is open. Email and WhatsApp are shown as *coming soon*, not promised. |
| 📱 | **Progressive Web App** | Installable to the home screen and works **offline**, no app store required. |
| 🎗️ | **Prevention Tracker** | Habit checklist with an animated progress ring, a protection score, and a monthly challenge to build lasting habits. |

---

## 🛠 Tech Stack

<table>
<tr>
<td valign="top" width="50%">

**🖥️ Frontend**
- React 18 + TypeScript
- Vite (build & dev server)
- Tailwind CSS (design system)
- Framer Motion (animations)
- Zustand (state management)
- React Router (navigation)
- jsPDF (branded report export, lazy-loaded)

**🧠 On-device intelligence**
- Keyword-matched knowledge base (chat)
- Weighted local scoring (risk)
- No external AI provider in the shipped build

</td>
<td valign="top" width="50%">

**🗺️ Maps & Geo** *(100% free / open)*
- MapLibre GL
- OpenStreetMap tiles
- Overpass API (clinic/doctor data)
- Nominatim (geocoding & search)

**🔔 Notifications**
- Calendar (`.ics` download)
- Browser Notification API (in-app only)

**🗣️ Voice & Platform**
- Web Speech API (`SpeechSynthesis` + `SpeechRecognition`)
- PWA: installable & offline
- Static build, deployable to any static host

</td>
</tr>
</table>

<div align="center">

![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-443E38?style=flat-square)
![MapLibre](https://img.shields.io/badge/MapLibre_GL-396CB2?style=flat-square&logo=maplibre&logoColor=white)
![OpenStreetMap](https://img.shields.io/badge/OpenStreetMap-7EBC6F?style=flat-square&logo=openstreetmap&logoColor=white)
![jsPDF](https://img.shields.io/badge/jsPDF-F7DF1E?style=flat-square)

</div>

---

## 📸 Screenshots

> Replace the placeholders below with real captures in `./screenshots/`.

| Home | Learn & Myths | Self-Check |
|:---:|:---:|:---:|
| ![Home](./screenshots/home.png) | ![Learn](./screenshots/learn.png) | ![Self-Check](./screenshots/self-check.png) |
| **Risk Assessment** | **Doctor Map** | **Assistant** |
| ![Risk](./screenshots/risk.png) | ![Doctors](./screenshots/doctors.png) | ![Chat](./screenshots/chat.png) |

---

## 🏗 Architecture

Brafie is **client-first**: a fast React PWA whose intelligence runs **on the device**, keeping the user's data on her phone and the stack lightweight.

```mermaid
flowchart TD
    U["👩 User · Browser / PWA"] --> APP["⚛️ Brafie React App<br/>(TypeScript · Vite · Tailwind)"]

    APP --> STATE["🗃️ Local State & Storage<br/>Zustand + localStorage<br/>(chat, risk, self-check, reminders)"]

    APP -->|chat, answered on-device| KB["🧠 Bundled Knowledge Base<br/>keyword-matched · no network"]
    APP -->|weighted scoring, on-device| SCORE["📊 Local Risk Scoring<br/>no network"]
    APP -->|map + search + places| GEO["🗺️ OpenStreetMap<br/>MapLibre · Overpass · Nominatim"]
    APP -->|voice + alerts| BROWSER["🔊 Browser APIs<br/>SpeechSynthesis · SpeechRecognition · Notification"]

    APP -. not wired in the shipped build .-> API["🧩 Optional .NET 8 Backend<br/>content · reminders · risk · chat proxy"]

    style APP fill:#D63384,stroke:#D63384,color:#fff
    style KB fill:#22C55E,stroke:#22C55E,color:#fff
    style SCORE fill:#22C55E,stroke:#22C55E,color:#fff
    style U fill:#FFF5F7,stroke:#D63384,color:#2D1F2D
```

**Design principles**
- 🔐 Sensitive state (risk answers, chat history, progress, reminders) **never leaves the browser**; it lives in `localStorage`.
- 🧠 The intelligence layer is **local**: chat answers come from a bundled knowledge base and risk is scored by a deterministic weighted algorithm. No message, answer or API key is shipped to a third party.
- 🪶 Heavy dependencies (like the PDF engine and the map) are **lazy-loaded** on demand to keep the initial bundle lean for slow connections.
- 🧩 An optional **.NET 8 backend** (`backend/`) exists for content, reminders, risk and a chat proxy. It is **not called by the shipped frontend**; the app is fully functional without it.

> A full, evidence-based walkthrough of the codebase (routes, data flows, diagrams, limitations) lives in [`docs/architecture/BRAFIE_COMPLETE_PROJECT_GUIDE.md`](./docs/architecture/BRAFIE_COMPLETE_PROJECT_GUIDE.md).

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

No API key is required: the shipped app has no external AI or backend dependency.

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/LordScientist/breast-cancer-project.git
cd breast-cancer-project

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Then open **http://localhost:5173** 🎉

### Build for production

```bash
npm run build      # type-check + production bundle + SEO shells -> dist/
npm run preview    # preview the production build locally
npm run lint       # eslint, zero warnings allowed
```

### Environment Variables

All are optional; the app runs correctly with none set.

| Variable | Required | Description |
|---|:---:|---|
| `VITE_SITE_ORIGIN` | ⬜ | Canonical/OG/JSON-LD origin at runtime. Defaults to the original `https://sahtek.tech`; **set this to the real domain before launch.** |
| `SITE_ORIGIN` | ⬜ | The same origin for the post-build SEO script (`scripts/generate-seo.mjs`). Set both. |
| `VITE_API_URL` | ⬜ | Optional backend base URL. Not used by the shipped UI. |

### Deploying

`npm run build` produces a static `dist/` plus one real HTML file per route for link previews. Serve it from any static host (Netlify, Vercel, Cloudflare Pages, nginx `try_files`) so exact files are served before the SPA fallback.

---

## 🌟 What Makes Brafie Different

<table>
<tr>
<td width="33%" valign="top">

### 🔒 Privacy-First
No camera. No photos. No accounts. No personal data ever leaves the device: a deliberate, respectful design choice for a deeply personal topic.

</td>
<td width="33%" valign="top">

### 🇬🇭 Adapted for Ghana
Warm and non-judgmental, in **clear, everyday English**, written for the Ghanaian context, not translated into it.

</td>
<td width="33%" valign="top">

### 🌐 Ready for Local Languages
Ships in English today, with an i18n layer structured to add reviewed **Ghanaian languages** (Twi, Ga, Ewe, Dagbani…), not a language switcher bolted on as an afterthought.

</td>
</tr>
<tr>
<td width="33%" valign="top">

### 📱 Works Offline
A full **PWA**: installable to the home screen and functional without a connection.

</td>
<td width="33%" valign="top">

### 🗺️ Real, Open Data
Live **OpenStreetMap** map with nearby facilities and distance, no mock-ups and no hard-coded providers.

</td>
<td width="33%" valign="top">

### 🧠 Honest by Design
The assistant says what it is not, the risk score is framed as awareness (not a diagnosis), and unreviewed or unverified claims are left out rather than invented.

</td>
</tr>
</table>

---

## 🗺 Roadmap

- [ ] User accounts with encrypted cloud sync (opt-in)
- [ ] Verified partnerships with Ghanaian hospitals & NGOs
- [ ] Ghanaian-language translations (Twi, Ga, Ewe, Dagbani…), each fully translated and medically reviewed
- [ ] Mammography centre directory with appointment booking
- [ ] Survivor stories & anonymous community support
- [ ] Email and WhatsApp reminders (server-side proxy)
- [ ] Native mobile apps (iOS / Android)
- [ ] Expansion to other women's health topics
- [ ] Offline AI (on-device small model) for zero-connectivity regions

See the [open issues](../../issues) for the full list of proposed features and known bugs.

---

## 👤 Author

**Ghanaian adaptation and localisation by LordScientist.**

This release restructures and localises the interface, language and content for
users in Ghana. It is built on the original open-source **Sahtek** project by
**Anas Lahraoui**, and the work is distributed under the **MIT License** (see
below). Any remaining Morocco-specific references in the non-English locale files
are retained from the original project for historical reference and are not shown
in the Ghanaian English interface.

---

## 🙏 Acknowledgments

- 💗 **The original Sahtek project and its author, Anas Lahraoui**: for the open-source foundation this Ghanaian adaptation builds on.
- 💗 **The open-source community**: Brafie stands on the shoulders of:
  - [React](https://react.dev), [Vite](https://vitejs.dev), [Tailwind CSS](https://tailwindcss.com), [Framer Motion](https://www.framer.com/motion/)
  - [MapLibre](https://maplibre.org), [OpenStreetMap](https://www.openstreetmap.org), [Overpass API](https://overpass-api.de), [Nominatim](https://nominatim.org)
  - [Lucide Icons](https://lucide.dev), [jsPDF](https://github.com/parallax/jsPDF)

> 🎗️ And to every woman who checks herself this month, **this is for you.**

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for details.

<div align="center">

<br/>

**Your health is a trust** 🎀

*Ghanaian adaptation and localisation by **LordScientist** · Original Sahtek project by **Anas Lahraoui** · MIT License.*

</div>
