# Black Beauty Brands — Design Spec

**Site Name:** Black Beauty Brands
**Tagline:** Your favorite products, in one place.
**Date:** 2026-04-12

## Purpose

After Target removed Black-owned beauty brands from its shelves, consumers lost easy access to products they loved. Black Beauty Brands is a static affiliate website that organizes these products in one place with price comparison across multiple retailers. The primary business model is affiliate revenue, with a broad beauty-enthusiast audience.

## Architecture

**Stack:** Eleventy (11ty) static site generator + JSON data files + GitHub Pages hosting

**Data Layer:**
- `_data/brands.json` — Brand name, slug, bio, logo URL, founded year
- `_data/products.json` — Product name, slug, brand (ref), category (ref), image URL, description, size/variant info
- `_data/prices.json` — Product slug → array of { retailer, price, affiliate URL, shipping note, last checked timestamp }
- `_data/categories.json` — Category name, slug, description, icon/emoji

**Initial Categories:**
- Hair Care (shampoo, conditioner, treatments, styling)
- Skin Care (cleansers, moisturizers, serums, masks)
- Makeup (face, lips, eyes, tools)
- Body Care (lotions, oils, body wash)
- Nails (polish, treatments, tools)
- Natural / Clean (products marketed as natural or clean beauty)

**Build Pipeline:**
1. GitHub Actions scheduled workflow runs daily (6am UTC)
2. Scraper/API scripts (Node.js) fetch latest prices from retailers
3. Updated `_data/prices.json` is committed if changes detected
4. Eleventy builds static HTML from Nunjucks templates + JSON data
5. Deploys to GitHub Pages

**Data Sources (priority order):**
1. Amazon Product Advertising API — prices, availability, images
2. Affiliate network feeds (ShareASale, CJ Affiliate, Rakuten) — Ulta, Sephora, Walmart
3. Web scrapers (Puppeteer/Playwright) — brand DTC sites and retailers without APIs

**Error Handling:**
- If a source fails, retain last known price (never blank out data)
- Flag prices older than 7 days with "price may be outdated" indicator
- Log all failures for monitoring

## Pages

### Homepage (`/`)
- **Layout:** Product-first
- Top navigation: Logo | Hair Care | Skin Care | Makeup | Brands | About
- Hero banner with site name, tagline
- Category sidebar (left) with product grid (main area)
- Product cards show: image, brand name, product name, "from $X.XX", retailer count
- Products link to individual product detail pages

### Category Pages (`/hair-care/`, `/skin-care/`, `/makeup/`, etc.)
- Same layout as homepage but filtered to one category
- Category name and description at top
- Product grid with all products in that category

### Product Detail Page (`/products/[slug]/`)
- **Layout:** Side-by-side — product image left, price comparison table right
- Breadcrumb navigation (Category > Subcategory > Product)
- Left column: product image, brand name (linked to brand page)
- Right column: product name, description, size/variant info
- Price comparison table sorted by price (lowest first):
  - Best price highlighted with green "BEST PRICE" badge
  - Each row: retailer name, price, shipping note, "Shop →" affiliate link button
  - Brand DTC row highlighted with "Buy direct from brand" note
- "Prices updated daily. Last checked: [date]" footer
- Responsive: stacks vertically on mobile

### Brand Pages (`/brands/[slug]/`)
- Brand logo + name
- 1-2 paragraph bio (founder, mission, what they're known for)
- Founded year, product count
- Grid of all brand's products (same card format as homepage)

### About Page (`/about/`)
- Why this site exists — the Target removal context
- How the site works (price comparison, affiliate model transparency)
- Disclaimer about affiliate links

## Visual Design

- **Aesthetic:** Clean and modern (Glossier/The Ordinary style)
- Minimalist, generous white space
- Crisp typography (system font stack or a clean sans-serif like Inter)
- Light color palette with strategic accent colors
- Product images are the visual focus
- No audience building features (no newsletter, no social integrations)

## SEO

- Semantic HTML with proper heading hierarchy
- Meta titles: "[Product Name] - Compare Prices | Black Beauty Brands"
- Meta descriptions auto-generated from product data
- Open Graph tags for social sharing
- Clean URL structure (`/brands/mielle-organics/`, `/hair-care/`)
- Breadcrumb navigation with structured data

## Product Data Research

The initial brand/product list needs to be compiled from scratch:
1. Research which brands Target removed (news articles, brand social media, press releases)
2. For each brand, catalog their key products (product lines, hero products)
3. Identify which retailers currently carry each product
4. Seed initial JSON data files
5. Set up API keys and scraper scripts for ongoing price updates

## Scope

**V1 (Launch):**
- Brands removed from Target only
- Category-based browsing (no search)
- Price comparison across available retailers
- Brief brand profiles
- Basic SEO
- Daily automated price updates via GitHub Actions
- GitHub Pages hosting (default URL)

**Future (V2+):**
- Expand to all Black-owned beauty brands
- Add search/filtering
- Custom domain
- Additional product categories
- User reviews or ratings
- Newsletter/audience building if desired

## Affiliate Strategy

Research and join affiliate programs in this order:
1. Amazon Associates (broadest inventory, easiest to start)
2. ShareASale / CJ Affiliate / Rakuten (Ulta, Sephora, Walmart access)
3. Individual brand DTC affiliate/ambassador programs (highest commissions, 10-20%)
4. Walmart Affiliate Program (direct)

The site architecture supports multiple affiliate links per product from day one.

## Hosting & Deployment

- **Host:** GitHub Pages (free)
- **Domain:** GitHub Pages default URL initially
- **CI/CD:** GitHub Actions for daily scraper runs + Eleventy builds
- **No server required** — fully static site
