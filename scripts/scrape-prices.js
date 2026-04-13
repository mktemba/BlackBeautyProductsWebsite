#!/usr/bin/env node

/**
 * Price scraping orchestrator.
 *
 * Runs each source module, merges results into prices.json, and exits.
 * Designed to be called by GitHub Actions on a daily schedule.
 *
 * Each source module exports: async function fetchPrices(products) => Map<slug, PriceEntry[]>
 *
 * Usage: node scripts/scrape-prices.js
 */

const fs = require("fs");
const path = require("path");

const PRICES_PATH = path.join(__dirname, "..", "src", "_data", "prices.json");
const PRODUCTS_PATH = path.join(__dirname, "..", "src", "_data", "products.json");

// Source modules — add new sources here
const SOURCES = [
  { name: "amazon", module: "./sources/amazon.js" },
  { name: "affiliate-feeds", module: "./sources/affiliate-feeds.js" },
  { name: "scraper", module: "./sources/scraper.js" },
];

async function main() {
  const products = JSON.parse(fs.readFileSync(PRODUCTS_PATH, "utf-8"));
  const currentPrices = JSON.parse(fs.readFileSync(PRICES_PATH, "utf-8"));

  console.log(`Loaded ${products.length} products, checking ${SOURCES.length} sources...`);

  const allResults = new Map();

  for (const source of SOURCES) {
    try {
      console.log(`\n--- Running source: ${source.name} ---`);
      const mod = require(source.module);
      const results = await mod.fetchPrices(products);

      for (const [slug, entries] of results) {
        if (!allResults.has(slug)) {
          allResults.set(slug, []);
        }
        allResults.get(slug).push(...entries);
      }

      console.log(`  ${source.name}: returned prices for ${results.size} products`);
    } catch (err) {
      console.error(`  ${source.name} FAILED: ${err.message}`);
      // Continue with other sources — don't let one failure stop everything
    }
  }

  // Merge new prices with existing, preferring new data
  const updatedPrices = { ...currentPrices };
  let changedCount = 0;

  for (const [slug, newEntries] of allResults) {
    if (newEntries.length > 0) {
      updatedPrices[slug] = newEntries;
      changedCount++;
    }
    // If no new entries, keep the existing (stale) data
  }

  // Write updated prices
  const newJson = JSON.stringify(updatedPrices, null, 2) + "\n";
  const oldJson = fs.readFileSync(PRICES_PATH, "utf-8");

  if (newJson !== oldJson) {
    fs.writeFileSync(PRICES_PATH, newJson);
    console.log(`\nUpdated prices.json (${changedCount} products changed)`);
  } else {
    console.log("\nNo price changes detected.");
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
