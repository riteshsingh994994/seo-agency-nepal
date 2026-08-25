# 🚀 SEO Agency Nepal — Next.js Application

A high-performance, ROI-driven SEO agency web application built with **Next.js 16 (App Router)**, **Vanilla CSS**, and an interactive **Admin Panel**.

---

## 🌟 Key Features

- **SEO Service Structure**:
  - Full 360° SEO Hub (`/seo`) + 8 City Location Tiers (`/seo/kathmandu`, `/seo/pokhara`, etc.).
  - Local SEO (`/services/local-seo`) + 8 City Location Tiers.
  - E-commerce SEO (`/services/ecommerce-seo`) + 8 City Location Tiers.
  - Standalone Link Building (`/services/link-building`).
  - Standalone GEO & AEO AI Search (`/services/geo-aeo`).
- **Interactive Lead Capture & Audit Modal**:
  - Popup audit request form pre-filling URL from any CTA button.
  - Admin Panel audit lead management system (`/admin/audits`).
- **Dynamic Site Base URL**:
  - Admin configurable domain setting (`/admin/settings`) that automatically updates canonicals, XML sitemaps, `robots.txt`, OpenGraph metadata, and JSON-LD schemas.
- **Related Blog Posts**:
  - Topic-focused 3-card blog section with "Read Our Blog" CTAs across main service & landing pages.
- **Admin Panel**:
  - Dashboard & modules for Site Settings, Image Assets, Case Studies, Testimonials, Pricing Packages, Blog Articles, FAQs, Services, and Audit Leads (`/admin`, Password: `admin@123`).

---

## 🛠️ GitHub Push & Deployment Instructions

### 1. Initialize Git & Push to GitHub

Run the following commands in your project root terminal:

```bash
# 1. Initialize Git repository (if not already initialized)
git init

# 2. Add all files to staging
git add .

# 3. Commit your changes
git commit -m "feat: complete SEO Agency Nepal web app with admin panel, dynamic canonicals, and CI/CD workflow"

# 4. Rename main branch
git branch -M main

# 5. Add your remote GitHub repository URL
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git

# 6. Push to GitHub
git push -u origin main
```

---

## 🚀 CI/CD & Deployment Options

### Option A: Vercel (Recommended)
1. Import your GitHub repository into [Vercel](https://vercel.com).
2. Framework Preset: **Next.js**
3. Click **Deploy**. Vercel will automatically build and assign a free HTTPS URL.

### Option B: Docker Container
Build and run using Docker:

```bash
docker build -t seo-agency-nepal .
docker run -p 3000:3000 seo-agency-nepal
```

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production build locally
npm start
```
