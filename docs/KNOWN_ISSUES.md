# Known Issues

## Operational / Deployment Issues

### Tracked production SQLite database can be overwritten during deploy

**Status:** Open / high priority

`server/app.db` is tracked in Git while PythonAnywhere deployment uses `git reset --hard origin/production`. This can replace live production data with the repository copy. A durable production database strategy is still required.

### Deployment Action creates an extra production commit

**Status:** Open

The GitHub Action commits generated React static files back to `production`. This can leave the developer's local `production` branch behind the remote immediately after a successful release and cause the next `git push` to be rejected until the remote commit is pulled/merged.

### Production branch remote tracking is potentially confusing locally

**Status:** Open / local configuration

Recent local output showed `production` tracking `upstream/production` while deployment pushes use `origin production`. Confirm the intended tracking remote and make it consistent.

### Deliberate deployment failure-path test is still pending

**Status:** Open

The hardened workflow now rejects `.git/index.lock` and fails fast, but the failure path has not yet been deliberately exercised after the change. The normal success path has been verified live.

## Priority 1 Open Issues

### Playwright has no FlaskCart-specific regression tests yet

**Status:** Open

Playwright 1.62.1 is installed and the generated two-test demo suite passes in all three configured browser projects. However, `tests/example.spec.js` still tests `playwright.dev`, and `baseURL`/controlled server startup are not yet configured for FlaskCart.

Local API routing is now safe for local development, but mutating E2E tests still need a disposable/local test database.

### Recipe taxonomy and filter semantics are incomplete

**Status:** Open

The recipe grid filters correctly and handles `Snack`/`Snacks` as a targeted alias, but the complete taxonomy is not normalised. The committed recipe sidebar still uses `role="tab"` for ordinary filter buttons.

### Shopping-list filter UI is misleading

**Status:** Open

The page displays filtering controls without applying filter state to shopping-list rows.

### Inventory local updates can become `NaN`

**Status:** Open

The inventory context requires a quantity, but the older `AddButton`/`RemoveButton` callback path still calls the local update callback without the quantity.

### Inventory zero/negative validation is incomplete

**Status:** Open

The client currently blocks removal to exactly zero and the server-side negative-stock rules still need authoritative repair and regression tests.

### Public inventory controls call admin-only endpoints

**Status:** Open

The React UI still needs a coherent authenticated/admin state for pantry mutation controls.

### Shopping-list Add more is incomplete

**Status:** Open

The shopping-list workflow still has schema/action gaps documented in `TASKS.md`.

### Purchased state is raw/incomplete

**Status:** Open

Purchased state still needs an interactive, understandable control and backend mutation route.

### Shopping list can remain stale after recipe addition

**Status:** Open

Recipe-to-shopping-list additions and shopping-list context still need a single consistent state/data contract.

### No global React 404 route

**Status:** Open

Recipe detail has an unknown-slug state, but React Router still has no wildcard application route.

## Repository Findings Requiring Verification

### Admin recipe editing appears inconsistent

The recipe creation fields use names such as `recipe_name` and `total_time_minutes`, while the earlier reviewed edit SQL referred to older-looking names.

### Admin recipe deletion appears unwired

The earlier reviewed template contained a delete button without a confirmed matching handler.

### Food identifier usage may be inconsistent

Recipe ingredient and shopping-list queries have historically used different `ID`/`ROWID` assumptions. Verify before schema or deletion work.

## Resolved / Superseded Findings

### Contact form processing

**Status:** Resolved

The contact blueprint is registered, the frontend sends real field values, the backend validates input, enquiries are persisted, email notification is attempted, and persistence/delivery outcomes are distinguished.

### Recipe filters did not affect recipes

**Status:** Resolved for core filtering

`GetRecipes` now consumes `FilterContext`, applies category filtering/search, exposes clear filters and shows result count/active category. Taxonomy/semantics cleanup remains open separately.

### Recipe detail was embedded in cards

**Status:** Replaced

Recipe cards now link to dedicated `/recipes/:recipeSlug` pages.

### Local frontend targeted production API

**Status:** Resolved 2026-09-24

`app/src/config/config.js` now uses local Flask on `http://localhost:5000` for localhost/127.0.0.1 and same-origin API requests in production.

### Deployment could report green after Git checkout failure

**Status:** Resolved in workflow hardening

The SSH step now uses fail-fast execution, stale-lock detection and deployed-SHA verification. The normal hardened deployment path has been verified live.

### Tracked `node_modules`

**Status:** Resolved

The repository cleanup stopped tracking `node_modules`, removing tens of thousands of generated dependency files from normal branch merges.

## Accepted Limitations

- No real payment flow.
- No shipping or tax.
- No public customer accounts.
- SQLite is retained for the learning scope.
- Create React App remains until a separate migration is approved.
