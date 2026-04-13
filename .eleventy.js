module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addFilter("year", function () {
    return new Date().getFullYear();
  });

  eleventyConfig.addFilter("formatPrice", function (value) {
    if (value == null) return "";
    return Number(value).toFixed(2);
  });

  eleventyConfig.addFilter("attr", function (obj, key) {
    if (!obj) return "";
    return obj[key] || "";
  });

  eleventyConfig.addFilter("sortByPrice", function (prices) {
    if (!prices) return [];
    return [...prices].sort((a, b) => a.price - b.price);
  });

  eleventyConfig.addFilter("lowestPrice", function (prices) {
    if (!prices || prices.length === 0) return null;
    return Math.min(...prices.map((p) => p.price));
  });

  eleventyConfig.addFilter("retailerCount", function (prices) {
    if (!prices) return 0;
    return prices.length;
  });

  eleventyConfig.addFilter("findBrand", function (brands, slug) {
    return brands.find((b) => b.slug === slug);
  });

  eleventyConfig.addFilter("findCategory", function (categories, slug) {
    return categories.find((c) => c.slug === slug);
  });

  eleventyConfig.addFilter("filterByBrand", function (products, brandSlug) {
    return products.filter((p) => p.brand === brandSlug);
  });

  eleventyConfig.addFilter("filterByCategory", function (products, categorySlug) {
    return products.filter((p) => p.category === categorySlug);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "html", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
