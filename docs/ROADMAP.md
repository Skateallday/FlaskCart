# Roadmap

## Phase 1: Fix Broken or Misleading Functionality

Goal: every visible control works, permissions are clear and UI state matches the server.

- Repair contact form registration, payload, validation, delivery/persistence and states.
- Connect recipe filters to the recipe grid.
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

- Fetch recipe datasets once or lazily per opened recipe.
- Limit the home page to featured recipes.
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

- Use responsive recipe-card grids.
- Replace fixed small-screen sidebars.
- Redesign or intentionally scroll data tables on mobile.
- Fix blank mobile action buttons.
- Repair hero overlay positioning.
- Add homepage calls to action.
- Improve hero copy width and spacing.
- Standardise recipe image aspect ratios.
- Consider dedicated recipe pages or a modal.
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
