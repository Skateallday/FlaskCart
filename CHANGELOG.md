# Changelog

All notable FlaskCart changes should be documented here.

## Unreleased

### Added

- Dedicated slug-based React recipe detail routes at `/recipes/:recipeSlug`.
- A dedicated recipe detail page with recipe metadata, ingredients, ordered instructions, loading/error/not-found states and a per-recipe document title.
- Recipe search, category filtering, result count, active-category display, clear-filter controls and an empty state.
- Responsive recipe cards using a one/two/three-column grid and lazy-loaded fixed-aspect-ratio images.
- Homepage recipe preview limited to three recipes with links into the full recipe library.
- Responsive pantry presentation with a desktop/tablet table and mobile cards.
- Major visual refresh across the public header, footer, home, contact, recipe and pantry surfaces.
- Playwright 1.62.1 browser-test tooling in the frontend development dependencies.
- Generated Playwright configuration for Chromium, Firefox and WebKit with the HTML reporter.

### Changed

- Recipe cards now link to dedicated recipe pages instead of mounting recipe detail content inside every card.
- Recipe list fetching now checks `response.ok` and exposes useful loading and error UI.
- Recipe detail data is fetched once per opened detail page in parallel rather than once per recipe card.
- The current Windows Playwright workflow uses a Node 24 Docker container so the outdated host Node installation is not involved.

### Fixed

- Recipe category selection now affects the visible recipe grid.
- The recipe page now shows the active category and current result count.
- The homepage no longer renders the full recipe library.

### Verified

- On 2026-08-28, the generated Playwright demo suite ran successfully in Docker: two generated tests across three configured browsers, for six passing test executions.
- The Playwright HTML report was successfully served from Docker and viewed from Windows through port `9323`.
- These six passes validate the Playwright installation only; the generated tests still target `playwright.dev` and are not FlaskCart regression coverage.

### Known Issues

- `app/src/config/config.js` sends API requests from `localhost` and `127.0.0.1` to the live PythonAnywhere backend. Do not run mutating Playwright tests until local/test API isolation is fixed.
- Playwright `baseURL` and `webServer` remain commented in the generated configuration, so FlaskCart-specific E2E setup is not complete.
- Full recipe taxonomy normalisation and recipe-sidebar semantics still need work.
- Inventory, shopping-list, authentication and React 404 issues remain in the Priority 1 backlog.

### Security

- Mutating browser tests must never run against the production PythonAnywhere database.
- Contact enquiries are now persisted and email delivery is attempted; personal-data handling and retention requirements remain applicable.

## Release Template

## 0.0.5 - 2026/08/28

### Added

### Changed

### Fixed

### Removed

### Security
