# Implementation Plan: Black Beauty Brands

## Context

Target removed Black-owned beauty brands from its shelves in early 2025. This project builds a static affiliate website called **Black Beauty Brands** that catalogs those products with price comparison across multiple retailers. The business model is affiliate revenue. The full design spec is at `docs/superpowers/specs/2026-04-12-black-beauty-brands-design.md`.

## Phase 1: Project Scaffolding

**Goal:** Set up the Eleventy project with basic structure, build tooling, and GitHub Pages deployment.

1. Initialize npm project and install Eleventy + dependencies
2. Create `.eleventy.js` config (input/output dirs, Nunjucks as template engine, passthrough copy for assets)
3. Create directory structure:
   - `src/` — source templates
   - `src/_includes/` — layout templates (base, product-card, price-table, brand-card)
   - `src/_data/` — JSON data files
   - `src/assets/` — CSS, images
   - `scripts/` — scraper scripts (later)
4. Create base layout template (`_includes/base.njk`) with nav, footer, meta tags
5. Create minimal CSS (clean/modern aesthetic, responsive grid, typography)
6. Set up GitHub Actions workflow for build + deploy to GitHub Pages
7. Verify: site builds and deploys with a placeholder homepage

**Files to create:**
- `package.json`
- `.eleventy.js`
- `src/_includes/base.njk`
- `src/assets/css/style.css`
- `src/index.njk` (homepage)
- `.github/workflows/deploy.yml`
- `.gitignore`

## Phase 2: Data Model & Seed Data

**Goal:** Define the JSON data schema and seed it with initial brand/product data.

1. Research Target-removed Black-owned beauty brands (compile list from news sources)
2. Create `src/_data/categories.json` with 6 initial categories (Hair Care, Skin Care, Makeup, Body Care, Nails, Natural/Clean)
3. Create `src/_data/brands.json` with researched brands (name, slug, bio, logo URL, founded year)
4. Create `src/_data/products.json` with key products per brand (name, slug, brand ref, category ref, image URL, description)
5. Create `src/_data/prices.json` with initial price data (product slug → retailer array with price, affiliate URL placeholder, shipping note, timestamp)
6. Verify: Eleventy can access all data in templates via `{{ brands }}`, `{{ products }}`, etc.

**Files to create:**
- `src/_data/categories.json`
- `src/_data/brands.json`
- `src/_data/products.json`
- `src/_data/prices.json`

## Phase 3: Page Templates

**Goal:** Build all page templates that render the data into HTML.

### 3a: Homepage
1. Create homepage template with product-first layout
2. Build product card partial (`_includes/product-card.njk`) — image, brand, name, lowest price, retailer count
3. Build category sidebar partial (`_includes/category-sidebar.njk`)
4. Wire up navigation (Logo | category links | Brands | About)
5. Verify: homepage renders with real data, product cards link to detail pages

### 3b: Category Pages
1. Create category page template using Eleventy pagination to generate one page per category
2. Filter products by category, reuse product card partial
3. Category name + description at top
4. Verify: `/hair-care/`, `/skin-care/`, etc. all render correctly

### 3c: Product Detail Pages
1. Create product detail template using Eleventy pagination (one page per product)
2. Build price comparison table partial (`_includes/price-table.njk`)
   - Sort by price ascending
   - "BEST PRICE" badge on cheapest
   - "Buy direct from brand" highlight on DTC rows
   - "Shop →" affiliate link buttons
3. Side-by-side layout: image left, details + price table right
4. Breadcrumb navigation
5. "Prices updated daily" footer with last-checked date
6. Responsive: stacks on mobile
7. Verify: product pages render with real price data, affiliate links work

### 3d: Brand Pages
1. Create brand page template using Eleventy pagination (one page per brand)
2. Brand logo, name, bio, founded year, product count
3. Grid of brand's products (reuse product card partial)
4. Verify: brand pages render and link correctly

### 3e: About Page
1. Create static about page with the site's story
2. Affiliate link disclaimer
3. Verify: renders and links from nav

**Files to create:**
- `src/_includes/product-card.njk`
- `src/_includes/category-sidebar.njk`
- `src/_includes/price-table.njk`
- `src/_includes/brand-card.njk`
- `src/_includes/nav.njk`
- `src/_includes/footer.njk`
- `src/index.njk` (homepage, update from Phase 1)
- `src/category.njk` (pagination template)
- `src/product.njk` (pagination template)
- `src/brand.njk` (pagination template)
- `src/about.njk`

## Phase 4: Visual Design & CSS

**Goal:** Polish the visual design to match the clean/modern aesthetic.

1. Typography: Inter font (or system font stack fallback)
2. Color palette: light background, clean accent colors, green for "best price"
3. Product card styling: hover states, image sizing, price formatting
4. Price table styling: row highlighting, button styles, responsive behavior
5. Navigation styling: clean, minimal, sticky on scroll
6. Mobile responsiveness: sidebar collapses, grid adapts, price table stacks
7. Verify: looks good on desktop and mobile, all interactive states work

**Files to modify:**
- `src/assets/css/style.css`

## Phase 5: SEO & Meta Tags

**Goal:** Add basic SEO hygiene.

1. Dynamic meta titles per page type ("[Product] - Compare Prices | Black Beauty Brands")
2. Dynamic meta descriptions from product/brand data
3. Open Graph tags (og:title, og:description, og:image)
4. Breadcrumb structured data (JSON-LD)
5. Sitemap generation (eleventy-plugin-sitemap or custom)
6. Verify: meta tags render correctly on all page types, validate with SEO checker

**Files to modify:**
- `src/_includes/base.njk` (meta tags)
- `.eleventy.js` (sitemap plugin)

## Phase 6: Automated Price Scraping Pipeline

**Goal:** Build the GitHub Actions pipeline that updates prices daily.

1. Create `scripts/scrape-prices.js` — main orchestrator script
2. Create `scripts/sources/amazon.js` — Amazon PA-API integration
3. Create `scripts/sources/affiliate-feeds.js` — affiliate network feed parser
4. Create `scripts/sources/scraper.js` — Puppeteer/Playwright fallback scraper for DTC sites
4. Update `.github/workflows/deploy.yml` to add a scheduled scraper job (cron: daily 6am UTC)
5. Workflow: run scrapers → commit updated prices.json if changed → trigger Eleventy build → deploy
6. Error handling: retain stale prices, log failures
7. Verify: pipeline runs, prices update, site rebuilds

**Files to create:**
- `scripts/scrape-prices.js`
- `scripts/sources/amazon.js`
- `scripts/sources/affiliate-feeds.js`
- `scripts/sources/scraper.js`
- Update `.github/workflows/deploy.yml`

## Phase 7: Final Polish & Launch

**Goal:** QA, fix issues, and launch.

1. Cross-browser testing (Chrome, Safari, Firefox, mobile)
2. Lighthouse audit (performance, accessibility, SEO, best practices)
3. Verify all affiliate links use proper tracking parameters
4. Check all pages render with real data (no broken images, missing prices)
5. Add `.superpowers/` to `.gitignore`
6. Final commit and deploy to GitHub Pages
7. Verify: live site works end-to-end

## Verification Plan

After each phase, verify by:
- Running `npx @11ty/eleventy --serve` locally and checking pages in browser
- Checking the GitHub Pages deployment after pushing
- For Phase 6: manually triggering the GitHub Actions workflow and checking the output

End-to-end test: navigate from homepage → category → product → click affiliate link → verify it goes to the correct retailer with affiliate tracking.
