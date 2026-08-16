# 🎓 CertifyMe

> Generate, customize, and download **participation & achievement certificates** in your browser. Built with React, Vite, Tailwind CSS, and DaisyUI.

The previous README was the default Vite template and has been replaced with this project-specific document.

---

## ✨ Features

- 🪪 **Two-screen flow** — a welcoming landing page and a full certificate builder
- ✍️ **Customizable fields** — recipient name, course/event title, date, issuer, etc.
- 🖼️ **Live preview** rendered as a designed certificate image
- ⬇️ **Download as PNG** for sharing on LinkedIn, email, or print
- 🎨 Polished gradient UI with animated background blobs
- 📱 Responsive layout (Tailwind + DaisyUI)

---

## 🧱 Tech Stack

- **Framework:** React 18
- **Bundler:** Vite 5
- **Routing:** React Router v6
- **Styling:** Tailwind CSS 3 + DaisyUI 4
- **Linting:** ESLint (strict — `0 warnings`)

---

## 🚀 Getting Started

### Prerequisites
- Node.js **>= 18**

### Setup

```bash
# 1. Clone
git clone https://github.com/Pranavgawas/CertifyMe.git
cd CertifyMe

# 2. Install
npm install

# 3. Dev server
npm run dev
```

Open the URL Vite prints (default `http://localhost:5173`).

---

## 📜 Available Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Strict ESLint (no warnings allowed) |

---

## 🗂️ Project Structure

```
src/
├── App.jsx                    # Routes & layout
├── main.jsx                   # React entry
├── components/
│   ├── Welcome.jsx            # Landing / input form
│   ├── Certificate.jsx        # Certificate preview / download
│   ├── Navbar.jsx
│   ├── InputField.jsx
│   └── ... (see folder)
├── assets/
│   └── Certificate.png        # Base certificate artwork
└── index.css / App.css
```

---

## 🧭 Routes

| Path | Component |
|---|---|
| `/` | `Welcome` — fill in certificate details |
| `/Certificate` | `Certificate` — preview & download |

---

## 🤝 Contributing

PRs welcome. Please run `npm run lint` before opening a PR — this project enforces **zero warnings**.

---

## 📄 License

[MIT](./LICENSE) — © 2026 Pranav Gawas