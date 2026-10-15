<div align="center">

# 🎀 Brafie · Breast Health Ghana

### *Breast-cancer awareness and a guided self-check, adapted for Ghana*

**A private, caring breast-health awareness companion, localised for women in Ghana.**

Early detection saves lives. Brafie makes it accessible, private, and easy to understand, in clear, everyday English.

> **Ghanaian adaptation and localisation by [LordScientist].** Based on the original open-source **Sahtek** project and distributed under the **MIT License**.

<br/>

[![Adapted for Ghana](https://img.shields.io/badge/Adapted_for-Ghana_🇬🇭-006B3F?style=for-the-badge)](https://github.com/)
&nbsp;
[![License: MIT](https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge)](./LICENSE)

<br/>

![React](https://img.shields.io/badge/React_18-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)
![Groq](https://img.shields.io/badge/Groq_·_Llama_3.3_70B-F55036?style=flat-square&logo=meta&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-Installable-5A0FC8?style=flat-square&logo=pwa&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-22C55E?style=flat-square)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-D63384?style=flat-square)

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
- [Team](#-team)
- [Acknowledgments](#-acknowledgments)
- [License](#-license)

---

## 💡 About the Project

### The Problem

Breast cancer is the **most common cancer among women worldwide**, and too many cases in Ghana and across the region are found late, when treatment is harder and survival drops.

> ⚠️ **Ghana-specific figures are still being verified.** The original project documented Morocco's national figures (~12,000 new cases a year, ~60% diagnosed late, average diagnosis age ~48). Those are **not** Ghanaian statistics and have been removed from the interface. No Ghana-specific numbers are shown until a verified source is confirmed; see [`docs/GHANA_LOCALISATION.md`](./docs/GHANA_LOCALISATION.md).

What is universal: the gap is rarely medicine: it is **awareness, access, and comfort**. Many women lack clear information, feel embarrassed to seek help, or simply do not know how to check themselves.

### Our Solution

**Brafie** turns a smartphone into a private, judgement-free health companion. It teaches women how to perform a monthly self-check, understand their risk, separate myth from fact, find a nearby doctor, and stay consistent, in **clear, everyday English**, with a structure ready for Ghanaian languages.

### Why It Matters

- 🤝 **Culturally sensitive**: a warm, respectful tone, never clinical or shaming.
- 🔒 **Privacy by design**: **no camera, no photos, no accounts, no sensitive data leaves the device.** Everything lives in the browser.
- 📱 **Meets women where they are**: on the phone, in their language, on their terms.

> Brafie isn't a diagnosis tool. It's an **awareness and empowerment** tool, and it always points to a real doctor.

---

## ✨ Key Features

| | Feature | Description |
|:---:|---|---|
| 🌐 | **English-first, Ghana-ready** | Ships in clear, everyday English. The i18n layer is structured so Ghanaian languages (Twi, Ga, Ewe, Dagbani…) can be added one at a time, once each is fully translated and medically reviewed, never machine-translated. |
| 📚 | **Educational Hub** | Overview, symptoms, prevention, and a **30-myth** infinite-scroll flip-card wall that busts misconceptions one tap at a time. |
| 🩺 | **Guided Self-Check** | Interactive **5-step** monthly self-exam with per-step timers and **voice guidance** in every language. |
| 👩 | **Interactive Body Map** | Clickable symptom zones that explain what to look and feel for, visually, without a single photo. |
| 📊 | **AI Risk Assessment** | Weighted local scoring + a **personalized AI summary & recommendations**, exportable as a **branded PDF or JSON** report. |
| 🤖 | **Context-Aware AI Chatbot** | Powered by **Llama 3.3 70B**, and aware of *your* journey (did you finish the self-check? set a reminder? take the risk test?) for genuinely personal answers. |
| 🗺️ | **Worldwide Doctor Finder** | Real-time map with autocomplete location search and live distance calculation: find oncologists & clinics anywhere. |
| 💬 | **Real Reminders** | Monthly **WhatsApp** reminders in the user's language **+** browser push notifications, so a self-check never gets forgotten. |
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
- jsPDF (branded report export)

**🤖 AI**
- Groq API: **Llama 3.3 70B** (`llama-3.3-70b-versatile`)
- Powers the chatbot **and** risk analysis
- Graceful local knowledge-base fallback

</td>
<td valign="top" width="50%">

**🗺️ Maps & Geo** *(100% free / open)*
- MapLibre GL
- OpenStreetMap tiles
- Overpass API (clinic/doctor data)
- Nominatim (geocoding & search)

**🔔 Notifications**
- Browser Push API
- WhatsApp via OpenWA gateway

**🗣️ Voice & Platform**
- Web Speech API (`SpeechSynthesis`)
- PWA: installable & offline
- Deployed on **Vercel**

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
![Groq](https://img.shields.io/badge/Groq-F55036?style=flat-square)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

</div>

---

## 📸 Screenshots

> Replace the placeholders below with real captures in `./screenshots/`.

| Home | Learn & Myths | Self-Check |
|:---:|:---:|:---:|
| ![Home](./screenshots/home.png) | ![Learn](./screenshots/learn.png) | ![Self-Check](./screenshots/self-check.png) |
| **Risk Assessment** | **Doctor Map** | **AI Chat** |
| ![Risk](./screenshots/risk.png) | ![Doctors](./screenshots/doctors.png) | ![Chat](./screenshots/chat.png) |

---

## 🏗 Architecture

Brafie is **client-first**: a fast React PWA that talks directly to free, open, and best-in-class services, keeping the user's data on their device and the stack lightweight.

```mermaid
flowchart TD
    U["👩 User · Browser / PWA"] --> APP["⚛️ Brafie React App<br/>(TypeScript · Vite · Tailwind)"]

    APP --> STATE["🗃️ Local State & Storage<br/>Zustand + localStorage<br/>(chat, risk, self-check, reminders)"]

    APP -->|chat + risk analysis| GROQ["🤖 Groq API<br/>Llama 3.3 70B"]
    APP -->|map + search + places| GEO["🗺️ OpenStreetMap<br/>MapLibre · Overpass · Nominatim"]
    APP -->|monthly reminders| WA["💬 WhatsApp<br/>OpenWA Gateway"]
    APP -->|voice + alerts| BROWSER["🔊 Browser APIs<br/>SpeechSynthesis · Push"]

    APP -.optional backend.-> API["🧩 Backend Service<br/>content · reminders persistence"]

    style APP fill:#D63384,stroke:#D63384,color:#fff
    style GROQ fill:#F55036,stroke:#F55036,color:#fff
    style U fill:#FFF5F7,stroke:#D63384,color:#2D1F2D
```

**Design principles**
- 🔐 Sensitive state (risk answers, chat history, progress) **never leaves the browser**; it lives in `localStorage`.
- 🧠 The AI layer **degrades gracefully**: if Groq is unreachable, a built-in multilingual knowledge base answers instead, the app never breaks.
- 🪶 Heavy dependencies (like the PDF engine) are **lazy-loaded** on demand to keep the initial bundle lean for slow connections.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- A free **Groq API key** → [console.groq.com/keys](https://console.groq.com/keys)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/brafie.git
cd brafie

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
#   → open .env and paste your Groq API key

# 4. Start the dev server
npm run dev
```

Then open **http://localhost:5173** 🎉

### Build for production

```bash
npm run build      # type-check + production bundle → dist/
npm run preview    # preview the production build locally
```

### Environment Variables

| Variable | Required | Description |
|---|:---:|---|
| `VITE_GROQ_API_KEY` | ✅ | Groq API key (starts with `gsk_`), powers the AI chat & risk analysis. |
| `VITE_API_URL` | ⬜ | Optional backend base URL for content/reminder persistence. |
| `VITE_USE_MOCK` | ⬜ | `true` to force the local mock/knowledge-base layer (offline demo). |

> ⚠️ **Production note:** `VITE_`-prefixed variables are inlined into the client bundle. For a real production deployment, proxy the Groq key through a backend so it's never shipped to the browser.

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

### 🔗 Real Integrations
Live **WhatsApp** reminders, real **maps & clinic data**, and a real **LLM**, not mockups.

</td>
<td width="33%" valign="top">

### 🧠 Context-Aware AI
The chatbot knows *your* progress and personalizes its guidance, a small detail that feels genuinely human.

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
- [ ] SMS reminders for users without WhatsApp
- [ ] Native mobile apps (iOS / Android)
- [ ] Expansion to other women's health topics
- [ ] Offline AI (on-device small model) for zero-connectivity regions

See the [open issues](../../issues) for the full list of proposed features and known bugs.

---

## 👤 Author

**Ghanaian adaptation and localisation by LordScientist.**

This release restructures and localises the interface, language and content for
users in Ghana. It is built on the original open-source **Sahtek** project, and
the work is distributed under the **MIT License** (see below). Any remaining
Morocco-specific references in the non-English locale files are retained from the
original project for historical reference and are not shown in the Ghanaian
English interface.

---

## 🙏 Acknowledgments

- 💗 **The original Sahtek project and its contributors**: for the open-source foundation this Ghanaian adaptation builds on.
- 💗 **The open-source community**: Brafie stands on the shoulders of:
  - [React](https://react.dev), [Vite](https://vitejs.dev), [Tailwind CSS](https://tailwindcss.com), [Framer Motion](https://www.framer.com/motion/)
  - [Groq](https://groq.com) & [Meta Llama](https://llama.meta.com)
  - [MapLibre](https://maplibre.org), [OpenStreetMap](https://www.openstreetmap.org), [Overpass API](https://overpass-api.de), [Nominatim](https://nominatim.org)
  - [Lucide Icons](https://lucide.dev), [jsPDF](https://github.com/parallax/jsPDF)

> 🎗️ And to every woman who checks herself this month, **this is for you.**

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for details.

<div align="center">

<br/>

**Your health is a trust** 🎀

*Ghanaian adaptation and localisation by **LordScientist** · MIT License.*

</div>
