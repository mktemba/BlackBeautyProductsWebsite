import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { execFileSync } from "child_process";

const SITE_DIR = join(__dirname, "../_site");

// Build the site before running SEO tests
beforeAll(() => {
  execFileSync("npx", ["@11ty/eleventy"], { cwd: join(__dirname, "..") });
});

function readBuilt(path) {
  return readFileSync(join(SITE_DIR, path), "utf-8");
}

describe("meta tags", () => {
  it("homepage has canonical URL", () => {
    const html = readBuilt("index.html");
    expect(html).toContain('<link rel="canonical"');
    expect(html).toContain("https://mktemba.github.io/BlackBeautyProductsWebsite/");
  });

  it("homepage has og:type website", () => {
    const html = readBuilt("index.html");
    expect(html).toContain('og:type" content="website"');
  });

  it("product page has og:type product", () => {
    const html = readBuilt("products/lip-bar-just-a-tint/index.html");
    expect(html).toContain('og:type" content="product"');
  });

  it("all pages have og:url with correct prefix", () => {
    const html = readBuilt("hair-care/index.html");
    expect(html).toContain('og:url" content="https://mktemba.github.io/BlackBeautyProductsWebsite/hair-care/"');
  });

  it("pages have Twitter card tags", () => {
    const html = readBuilt("index.html");
    expect(html).toContain('twitter:card" content="summary"');
    expect(html).toContain('twitter:title"');
    expect(html).toContain('twitter:description"');
  });
});

describe("JSON-LD structured data", () => {
  it("product page has Product schema", () => {
    const html = readBuilt("products/mielle-rosemary-mint-oil/index.html");
    expect(html).toContain('"@type": "Product"');
    expect(html).toContain('"@type": "AggregateOffer"');
    expect(html).toContain('"priceCurrency": "USD"');
  });

  it("product page has BreadcrumbList schema", () => {
    const html = readBuilt("products/mielle-rosemary-mint-oil/index.html");
    expect(html).toContain('"@type": "BreadcrumbList"');
    expect(html).toContain('"@type": "ListItem"');
  });

  it("brand page has BreadcrumbList schema", () => {
    const html = readBuilt("brands/mielle-organics/index.html");
    expect(html).toContain('"@type": "BreadcrumbList"');
  });

  it("Product schema has brand info", () => {
    const html = readBuilt("products/mielle-rosemary-mint-oil/index.html");
    expect(html).toContain('"@type": "Brand"');
    expect(html).toContain("Mielle Organics");
  });
});

describe("sitemap", () => {
  it("sitemap.xml exists", () => {
    expect(existsSync(join(SITE_DIR, "sitemap.xml"))).toBe(true);
  });

  it("sitemap contains all page types", () => {
    const sitemap = readBuilt("sitemap.xml");
    expect(sitemap).toContain("/BlackBeautyProductsWebsite/"); // homepage
    expect(sitemap).toContain("/BlackBeautyProductsWebsite/brands/"); // brands index
    expect(sitemap).toContain("/BlackBeautyProductsWebsite/hair-care/"); // category
    expect(sitemap).toContain("/BlackBeautyProductsWebsite/brands/mielle-organics/"); // brand page
    expect(sitemap).toContain("/BlackBeautyProductsWebsite/products/mielle-rosemary-mint-oil/"); // product
  });

  it("sitemap has correct XML structure", () => {
    const sitemap = readBuilt("sitemap.xml");
    expect(sitemap).toContain('<?xml version="1.0"');
    expect(sitemap).toContain("<urlset");
    expect(sitemap).toContain("<loc>");
    expect(sitemap).toContain("<priority>");
  });
});

describe("robots.txt", () => {
  it("robots.txt exists and points to sitemap", () => {
    const robots = readBuilt("robots.txt");
    expect(robots).toContain("User-agent: *");
    expect(robots).toContain("Sitemap:");
    expect(robots).toContain("/BlackBeautyProductsWebsite/sitemap.xml");
  });
});
