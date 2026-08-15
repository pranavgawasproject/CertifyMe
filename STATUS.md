# 📋 CertifyMe — Project Status & Future Roadmap

## 📌 Current Project Status
- **Live Vercel Production URL**: [https://certify-me-five.vercel.app](https://certify-me-five.vercel.app)
- **Google Search Console Indexing**: **Active & Verified** (Site Owner).
- **SEO & Metadata**: Upgraded title, high-intent keywords (`free certificate maker`, `online certificate generator`), OpenGraph cards, and `WebApplication` schema.
- **2026-08-15 SEO run**: Sitemap limited to homepage only (removed SPA soft routes `/templates` and `/bulk` that produced GSC sitemap errors). Added `<noscript>` crawlable copy in `index.html` for non-JS crawlers.

---

## 🔮 Recommended Future Features & Growth Ideas (What to Build Next)

### 1. 🎨 Canvas Drag-and-Drop Certificate Editor
- Allow users to drag, resize, and re-position text fields, signatures, and badges visually on the certificate canvas.

### 2. 🔳 QR Code & Verifiable Certificate Badges
- Add auto-generated QR codes on issued certificates linking to a public verification page (`/verify/:certificate_id`).

### 3. 📧 Automated Email Delivery System
- Connect Resend API to automatically email generated PDF certificates directly to course attendees upon CSV upload.

### 4. 🔤 Custom Brand Asset & Font Uploads
- Allow uploading custom TTF/OTF fonts and corporate branding logos.
