/**
 * Amazon Product Advertising API source.
 *
 * Requires environment variables:
 *   AMAZON_ACCESS_KEY, AMAZON_SECRET_KEY, AMAZON_PARTNER_TAG
 *
 * When credentials are not configured, returns an empty map so the
 * orchestrator can continue with other sources.
 */

async function fetchPrices(products) {
  const results = new Map();

  const accessKey = process.env.AMAZON_ACCESS_KEY;
  const secretKey = process.env.AMAZON_SECRET_KEY;
  const partnerTag = process.env.AMAZON_PARTNER_TAG;

  if (!accessKey || !secretKey || !partnerTag) {
    console.log("  Amazon: credentials not configured, skipping.");
    console.log("  Set AMAZON_ACCESS_KEY, AMAZON_SECRET_KEY, AMAZON_PARTNER_TAG to enable.");
    return results;
  }

  // TODO: Implement Amazon PA-API v5 integration
  // Reference: https://webservices.amazon.com/paapi5/documentation/
  //
  // For each product:
  //   1. Search by product name + brand using SearchItems operation
  //   2. Extract price, availability, and product URL
  //   3. Append partner tag to URL for affiliate tracking
  //   4. Return as PriceEntry: { retailer, price, url, shipping, isDTC, lastChecked }

  console.log("  Amazon: PA-API integration pending setup.");
  return results;
}

module.exports = { fetchPrices };
