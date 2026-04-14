# Black Beauty Brands

Your favorite products, in one place.

A static affiliate website that catalogs Black-owned beauty products with price comparison across multiple retailers. Built in response to Target's 2025 removal of Black-owned beauty brands from its shelves.

**Live site:** https://mktemba.github.io/BlackBeautyProductsWebsite/

## Features

- 17 Black-owned beauty brands, 41 products
- Price comparison across Amazon, Walmart, Ulta, Sephora, and brand DTC sites
- Category browsing: Hair Care, Skin Care, Makeup, Body Care, Nails, Natural & Clean
- Brand profile pages with product listings
- Responsive design (mobile + desktop)
- Automated daily price updates via GitHub Actions

## Tech Stack

- **Static site generator:** [Eleventy](https://www.11ty.dev/) v3
- **Templating:** Nunjucks
- **Hosting:** GitHub Pages
- **CI/CD:** GitHub Actions (build + deploy on push, daily price scrape)

## Development

```bash
npm install
npm run serve    # local dev server at http://localhost:8080
npm run build    # build to _site/
```

## Testing

```bash
npm test         # run all tests
```

Tests cover data integrity (valid brand/category refs, no duplicate slugs, price data) and SEO output (OG tags, JSON-LD, sitemap).

## Data

Product and price data lives in `src/_data/`:

| File | Purpose |
|------|---------|
| `brands.json` | Brand profiles (name, bio, founded year, website) |
| `products.json` | Product catalog (name, brand, category, description) |
| `prices.json` | Retailer prices and affiliate URLs per product |
| `categories.json` | Product categories |
| `site.json` | Site-wide config (URL, name, tagline) |

## Price Scraping

The `scripts/scrape-prices.js` orchestrator runs daily via GitHub Actions. It supports three source modules:

1. **Amazon PA-API** (`scripts/sources/amazon.js`) — requires `AMAZON_ACCESS_KEY`, `AMAZON_SECRET_KEY`, `AMAZON_PARTNER_TAG`
2. **Affiliate feeds** (`scripts/sources/affiliate-feeds.js`) — ShareASale, CJ Affiliate, Rakuten
3. **Web scraper** (`scripts/sources/scraper.js`) — fallback for DTC brand sites

Source modules are skeleton implementations pending API credential setup.

## License

All rights reserved.
