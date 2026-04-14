# Testing

100% test coverage is the key to great vibe coding. Tests let you move fast, trust your instincts, and ship with confidence.

## Framework

- **vitest** v4.x
- Config: `vitest.config.js`
- Test directory: `test/`

## Running Tests

```bash
npm test          # run all tests once
npx vitest        # run in watch mode
```

## Test Layers

### Unit Tests (`test/filters.test.js`)
Tests for Eleventy custom filters (formatPrice, sortByPrice, lowestPrice, findBrand, filterByCategory). Run these when modifying `.eleventy.js`.

### Data Integrity Tests (`test/data-integrity.test.js`)
Validates JSON data relationships: every product has a valid brand and category, every product has price data, no duplicate slugs. Run these after modifying any file in `src/_data/`.

## Conventions

- File naming: `test/{feature}.test.js`
- Use `describe`/`it`/`expect` from vitest globals
- Test real behavior with meaningful assertions
