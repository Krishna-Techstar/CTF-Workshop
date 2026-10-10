# 🚩 CTF Workshop — Interactive Guide

> **3.5-Hour Zero-to-One CTF Workshop Documentation & Simulator**  
> *Teach each demo in three beats: You show it ➔ You do it together ➔ They do it alone.*

---

### ⚡ Quick Start (Copy & Run)

```bash
git clone <repo-url> && cd CTF
npm install
npm run dev
```
> Open **`http://localhost:5173/`** — runs entirely client-side with zero backend dependencies.

---

### 🎮 Interactive Features at a Glance

<details open>
<summary><b>🛠️ Built-in Workshop Tools (Click to expand / collapse)</b></summary>

| Tool | Location | What it does |
| :--- | :--- | :--- |
| **CyberChef Playground** | `#/demo-1` | Live Base64, ROT13, Hex decoder with **Magic ✨** auto-flag detection |
| **DevTools Navigator** | `#/demo-2` | Interactive inspector cheatsheet highlighting Elements, Network & Cookies |
| **Forensics Stepper** | `#/break-and-demo-3` | 6-stage command order walkthrough (`file` ➔ `strings` ➔ `exiftool` ➔ `binwalk` ➔ `xxd` ➔ `steghide`) |
| **Flag Checker & Scoreboard** | `#/mini-ctf` | SHA-256 hashed validation, points tracker & confetti celebrations |
| **Floating Workshop Timer** | Bottom-Right | Schedule interval countdown with low-time visual warnings |

</details>

---

### 🗺️ Workshop Roadmap (0:00 – 3:30)

<details open>
<summary><b>⏱️ Clickable Schedule Matrix</b></summary>

- [ ] **0:00 – 0:20** ➔ [Before You Start & Ethics](/#/before-you-start) *(IT Act 2000, Checklist, Flag formats)*
- [ ] **0:20 – 0:40** ➔ [Setup: picoCTF, CyberChef & WSL](/#/setup) *(OS-specific tabs, BIOS troubleshooting)*
- [ ] **0:40 – 1:10** ➔ [Demo 1: Crypto & Encodings](/#/demo-1) *(Base64, ROT13, Hex, Layered pipeline)*
- [ ] **1:10 – 1:40** ➔ [Demo 2: Web & DevTools](/#/demo-2) *(Comments, Cookies, robots.txt, curl)*
- [ ] **1:40 – 1:50** ➔ *Break & Lossless File Distribution*
- [ ] **1:50 – 2:20** ➔ [Demo 3: Forensics & Stego](/#/break-and-demo-3) *(Magic bytes, Binwalk carving, Steghide)*
- [ ] **2:20 – 2:30** ➔ [Linux Basics & Bandit](/#/linux-basics) *(6 core commands, Guided lab, OverTheWire)*
- [ ] **2:30 – 3:15** ➔ [Mini CTF Competition](/#/mini-ctf) *(Teams of 2–3, picoCTF practice, Live scoreboard)*
- [ ] **3:15 – 3:30** ➔ [Wrap-up & Write-ups](/#/mini-ctf) *(Standardized report template & next milestones)*

</details>

---

### ⌨️ Keyboard Shortcuts

| Key | Action |
| :---: | :--- |
| <kbd>/</kbd> | Open global instant search modal across all 7 units |
| <kbd>→</kbd> | Next workshop unit |
| <kbd>←</kbd> | Previous workshop unit |
| <kbd>Esc</kbd> | Dismiss search modal |

---

### 🚀 1-Command Static Deploy

<details>
<summary><b>📦 Deploy to GitHub Pages or Netlify</b></summary>

```bash
# Production build (outputs to /dist)
npm run build
```

- **GitHub Pages**: Build outputs relative assets (`base: './'`) with `HashRouter` — zero 404s on refresh.
- **Netlify / Vercel**: Set build command `npm run build` and publish directory `dist`.

</details>

---

### 📝 Edit Workshop Content

Edit modular content directly without touching UI components:
* `src/content/schedule.js` — Timeline intervals & navigation metadata
* `src/content/*.js` — Unit texts, commands, and troubleshooting tables
* `src/utils/flags.js` — Register new challenge flags (automatically SHA-256 hashed)
