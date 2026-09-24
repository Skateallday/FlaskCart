# Roadmap

## Status Update — 2026-09-24

The public UI has undergone a major refresh, recipe filtering works, dedicated recipe detail routes exist, the homepage is limited to three recipe previews, contact processing is implemented, Playwright tooling is installed/verified, and the automated PythonAnywhere deployment workflow has been hardened and successfully smoke-tested.

Priority 1 is **not** complete because inventory, shopping-list, auth/permissions, global 404, admin verification and FlaskCart-specific regression coverage remain open. Production SQLite safety is also an operational blocker that must be resolved before production data is treated as durable.

## Operational Reliability Track

Goal: keep releases simple, automated and trustworthy.

Completed:

- Keep the `master` -> `production` deployment model.
- Automatic GitHub Actions deployment to PythonAnywhere.
- Node 24 and `npm ci` deployment build.
- Concurrency protection.
- Fail-fast SSH execution.
- Stale `.git/index.lock` detection.
- Deployed-SHA verification.
- Automatic PythonAnywhere reload.
- Normal hardened deployment smoke test.

Remaining:

- Protect the live SQLite database from hard-reset replacement.
- Remove/redesign the Action-generated static commit that advances `production` after a developer push.
- Normalise local `production` remote tracking.
- Deliberately verify the stale-lock failure path.

## Phase 1: Fix Broken or Misleading Functionality

Goal: every visible control works, permissions are clear and UI state matches the server.

- Maintain the functional contact persistence/email workflow and add regression coverage.
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
- Replace generated Playwright demo tests with FlaskCart regression journeys.

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
- Add complete loading, error and empty states across remaining data surfaces.
- Centralise API status/error handling.
- Optimise recipe images further.
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
- Maintain fixed-aspect-ratio recipe cards.
- Continue improving the dedicated recipe pages.
- Keep active filter states and result counts.
- Normalise recipe categories.
- Centralise typography and layout tokens.
- Consolidate font loading.
- Verify responsive footer behaviour after the UI refresh.

## Phase 4: Accessibility, Semantics and SEO

Goal: make the application understandable to browsers, assistive technology and search engines.

- Verify `main` landmarks on all routed pages.
- Remove inappropriate tab roles from filters.
- Add selected-state semantics to filters.
- Verify pantry search and clear-search accessibility.
- Improve mobile navigation accessibility and behaviour.
- Audit remaining internal anchors and footer list semantics.
- Complete route-specific titles and descriptions.
- Add Recipe JSON-LD for dedicated recipe URLs.
- Add canonical and social-sharing metadata.
- Audit visible keyboard focus styles.

## Deferred Ideas

- Vite migration.
- TypeScript migration.
- Dedicated public user accounts.
- Real payments.
- Database replacement beyond the SQLite learning scope.
