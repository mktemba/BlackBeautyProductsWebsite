/**
 * Web scraper fallback for brand DTC sites and retailers without APIs.
 *
 * Uses fetch (Node 18+ built-in) to check product pages. Falls back to
 * Puppeteer for JavaScript-rendered pages if needed.
 *
 * This is the last-resort source — prefer API-based sources when available.
 */

async function fetchPrices(products) {
  const results = new Map();

  // TODO: Implement web scraping for DTC brand sites
  //
  // Strategy per brand:
  //   1. Load the brand's product page URL
  //   2. Extract current price from the page
  //   3. Build affiliate URL (if brand has an affiliate program)
  //      or use direct URL with UTM tracking
  //   4. Return as PriceEntry
  //
  // Important considerations:
  //   - Respect robots.txt
  //   - Add delays between requests (1-2 seconds)
  //   - Handle rate limiting gracefully
  //   - Cache results to avoid unnecessary requests
  //   - Use User-Agent that identifies your bot

  console.log("  Scraper: DTC site scraping pending implementation.");
  return results;
}

module.exports = { fetchPrices };
