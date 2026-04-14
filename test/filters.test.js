import { describe, it, expect } from "vitest";

// Extract filter functions by capturing what addFilter receives
function extractFilters() {
  const filters = {};
  const fakeConfig = {
    addPassthroughCopy() {},
    addFilter(name, fn) {
      filters[name] = fn;
    },
  };
  require("../.eleventy.js")(fakeConfig);
  return filters;
}

const filters = extractFilters();

describe("formatPrice", () => {
  it("formats a number to 2 decimal places", () => {
    expect(filters.formatPrice(9.99)).toBe("9.99");
    expect(filters.formatPrice(10)).toBe("10.00");
    expect(filters.formatPrice(12.5)).toBe("12.50");
  });

  it("returns empty string for null/undefined", () => {
    expect(filters.formatPrice(null)).toBe("");
    expect(filters.formatPrice(undefined)).toBe("");
  });
});

describe("sortByPrice", () => {
  it("sorts prices ascending", () => {
    const prices = [
      { price: 19.99, retailer: "Amazon" },
      { price: 9.99, retailer: "Walmart" },
      { price: 14.99, retailer: "Ulta" },
    ];
    const sorted = filters.sortByPrice(prices);
    expect(sorted[0].retailer).toBe("Walmart");
    expect(sorted[1].retailer).toBe("Ulta");
    expect(sorted[2].retailer).toBe("Amazon");
  });

  it("does not mutate the original array", () => {
    const prices = [{ price: 20 }, { price: 10 }];
    const sorted = filters.sortByPrice(prices);
    expect(prices[0].price).toBe(20);
    expect(sorted[0].price).toBe(10);
  });

  it("returns empty array for null", () => {
    expect(filters.sortByPrice(null)).toEqual([]);
  });
});

describe("lowestPrice", () => {
  it("finds the lowest price", () => {
    const prices = [{ price: 19.99 }, { price: 9.99 }, { price: 14.99 }];
    expect(filters.lowestPrice(prices)).toBe(9.99);
  });

  it("returns null for empty/null", () => {
    expect(filters.lowestPrice([])).toBeNull();
    expect(filters.lowestPrice(null)).toBeNull();
  });
});

describe("findBrand", () => {
  const brands = [
    { slug: "the-lip-bar", name: "The Lip Bar" },
    { slug: "mielle-organics", name: "Mielle Organics" },
  ];

  it("finds a brand by slug", () => {
    expect(filters.findBrand(brands, "mielle-organics").name).toBe(
      "Mielle Organics",
    );
  });

  it("returns undefined for unknown slug", () => {
    expect(filters.findBrand(brands, "nonexistent")).toBeUndefined();
  });
});

describe("filterByCategory", () => {
  const products = [
    { name: "A", category: "hair-care" },
    { name: "B", category: "skin-care" },
    { name: "C", category: "hair-care" },
  ];

  it("filters products by category", () => {
    const result = filters.filterByCategory(products, "hair-care");
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe("A");
    expect(result[1].name).toBe("C");
  });

  it("returns empty for nonexistent category", () => {
    expect(filters.filterByCategory(products, "nails")).toHaveLength(0);
  });
});
