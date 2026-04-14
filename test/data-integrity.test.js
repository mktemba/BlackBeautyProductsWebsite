import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";

function loadJSON(filename) {
  return JSON.parse(
    readFileSync(join(__dirname, "../src/_data", filename), "utf-8"),
  );
}

const brands = loadJSON("brands.json");
const products = loadJSON("products.json");
const categories = loadJSON("categories.json");
const prices = loadJSON("prices.json");

describe("data integrity", () => {
  it("every product references a valid brand", () => {
    const brandSlugs = new Set(brands.map((b) => b.slug));
    for (const product of products) {
      expect(brandSlugs.has(product.brand)).toBe(true);
    }
  });

  it("every product references a valid category", () => {
    const categorySlugs = new Set(categories.map((c) => c.slug));
    for (const product of products) {
      expect(categorySlugs.has(product.category)).toBe(true);
    }
  });

  it("every product has price data", () => {
    for (const product of products) {
      expect(prices[product.slug]).toBeDefined();
      expect(prices[product.slug].length).toBeGreaterThan(0);
    }
  });

  it("all prices are positive numbers", () => {
    for (const [slug, entries] of Object.entries(prices)) {
      for (const entry of entries) {
        expect(entry.price).toBeGreaterThan(0);
      }
    }
  });

  it("all brands have required fields", () => {
    for (const brand of brands) {
      expect(brand.name).toBeTruthy();
      expect(brand.slug).toBeTruthy();
      expect(brand.bio).toBeTruthy();
      expect(brand.founded).toBeGreaterThan(1900);
    }
  });

  it("no duplicate slugs", () => {
    const brandSlugs = brands.map((b) => b.slug);
    expect(new Set(brandSlugs).size).toBe(brandSlugs.length);

    const productSlugs = products.map((p) => p.slug);
    expect(new Set(productSlugs).size).toBe(productSlugs.length);
  });
});
