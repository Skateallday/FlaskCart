# Roadmap

## Status Update — 2026-08-28

The public UI has undergone a major refresh, recipe filtering now works, dedicated recipe detail routes exist, the homepage is limited to three recipe previews, and Playwright tooling has been installed/verified. Priority 1 is **not** complete because inventory, shopping-list, auth/permissions, global 404 and E2E isolation/coverage remain open.

## Phase 1: Fix Broken or Misleading Functionality

Goal: every visible control works, permissions are clear and UI state matches the server.

- Maintain the now-functional contact persistence/email workflow and add regression coverage.
- Finish recipe taxonomy/semantics after the core filter connection was completed.
- Repair or remove nonfunctional shopping-list filters.
- Fix inventory `NaN` updates.
- Allow stock to reach zero while preventing negative stock.
- Resolve public/admin mismatch for pantry controls.
- Make shopping-list quantity addition functional.
- Replace raw purchased values with an interactive control.
- Update shopping-list state immediately after adding a recipe.
- Add a React 404 route.
- Verify admin recipe edit and delete behaviour.

Exit criteria:

- Priority 1 workflows have regression coverage.
- No visible control silently does nothing.
- No successful request leaves the current screen stale.
- Unauthorised actions are not presented as ordinary public actions.

## Phase 2: Performance and Data Flow

Goal: reduce duplicate requests, unnecessary startup work and inconsistent API handling.

- Optimise the dedicated recipe detail page so it does not need all three full shared datasets.
- Keep the completed three-recipe homepage preview.
- Mount pantry and shopping-list data providers only where needed.
- Add a batch shopping-list endpoint and one summary toast.
- Add loading, error and empty states.
- Centralise API status/error handling.
- Optimise recipe images.
- Add client and server caching.
- Add API filtering and pagination.
- Route-split larger React pages.
- Standardise Tailwind and review a later Vite migration.
- Remove unused Create React App boilerplate CSS.

Exit criteria:

- Opening the recipe page does not generate per-card duplicate dataset requests.
- Unrelated routes do not fetch pantry or shopping-list data.
- API failures produce consistent user-facing errors.

## Phase 3: Responsive Design and Visual Hierarchy

Goal: make the portfolio experience polished across mobile, tablet and desktop.

- Maintain the completed responsive recipe-card grid.
- Finish the recipe sidebar/mobile filter treatment and semantics.
- Keep the completed pantry mobile-card layout and redesign the shopping list similarly.
- Fix blank mobile inventory action labels.
- Maintain the refreshed hero positioning, copy width and calls to action.
- Maintain the fixed-aspect-ratio recipe cards.
- Continue improving the now-implemented dedicated recipe pages.
- Add active filter states and result counts.
- Normalise recipe categories and remove duplicate colour definitions.
- Centralise typography and layout tokens.
- Consolidate font loading.
- Improve the responsive footer.
- Correct contact-section wording and layout.

## Phase 4: Accessibility, Semantics and SEO

Goal: make the application understandable to browsers, assistive technology and search engines.

- Add a `main` landmark.
- Correct accordion semantics and relationships.
- Remove inappropriate tab roles from filters.
- Label pantry search and add clear search.
- Improve mobile navigation accessibility and behaviour.
- Use React links for internal navigation.
- Correct footer list semantics.
- Add route-specific metadata.
- Add Recipe JSON-LD for dedicated recipe URLs.
- Add canonical and social-sharing metadata.
- Add visible keyboard focus styles.

## Deferred Ideas

- Vite migration.
- TypeScript migration.
- Dedicated public user accounts.
- Real payments.
- Database replacement.
