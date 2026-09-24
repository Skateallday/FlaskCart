# Next Steps

## Current Checkpoint — 2026-09-24

Completed/verified recently:

- Contact endpoint registration, validation, SQLite persistence and email notification handling are implemented.
- Recipe filtering is connected to the recipe grid.
- Recipe search, result count, active category, clear-filter, loading/error/empty states are implemented.
- Dedicated `/recipes/:recipeSlug` detail pages are implemented.
- Recipe cards use a responsive grid and the homepage is limited to three recipe previews.
- Pantry presentation has desktop/tablet and mobile layouts.
- Playwright 1.62.1 is installed; its generated two-test example suite passes in Chromium, Firefox and WebKit through Docker, and the HTML report has been viewed successfully.
- Local frontend API configuration now uses `http://localhost:5000`; production uses same-origin API requests.
- `node_modules` is no longer tracked as deployment content.
- The production deployment workflow now uses Node 24, `npm ci`, concurrency protection, fail-fast SSH execution, stale-lock detection, deployed-SHA verification and automatic PythonAnywhere reload.
- A normal hardened deployment was completed successfully and the correct version was confirmed live on 2026-09-24.

The six Playwright executions remain tooling validation only, not FlaskCart regression coverage.

## Immediate Implementation Sequence

### 1. Finish deployment reliability

- Decide how the live SQLite database should persist independently of `git reset --hard` deployments.
- Stop or redesign the GitHub Actions commit of generated React static assets back to `production`, because it can leave the local `production` branch behind the remote after every deploy.
- Confirm the local `production` branch tracks the intended remote.
- Deliberately test the `.git/index.lock` failure path once and confirm the Action fails red before reload.

### 2. Add the first FlaskCart Playwright test

Start read-only:

- Open `/recipes`.
- Confirm the recipe page loads.
- Activate `View recipe`.
- Confirm the slug URL.
- Confirm recipe title, Ingredients and Instructions are visible.

Then replace/remove the generated `playwright.dev` example tests once equivalent FlaskCart coverage exists.

Before mutating E2E tests, point them at a disposable/local test database rather than the development or production database.

### 3. Finish recipe filter cleanup

- Normalise the complete recipe taxonomy rather than only handling `Snack`/`Snacks` as an alias.
- Replace inappropriate `role="tab"` filter semantics with normal button semantics and selected-state accessibility.

### 4. Repair inventory state and permissions

- Pass quantity through add/remove local update callbacks.
- Prevent `NaN` state.
- Allow stock to reach exactly zero.
- Reject negative stock on the server.
- Hide protected controls from guests or expose clear admin session state.
- Handle `401` consistently.

### 5. Complete shopping-list interactions

- Standardise schema names.
- Add the Add more action.
- Add purchased-state mutation.
- Update context after add/remove/purchase actions.
- Make recipe additions update the current screen.
- Add a batch recipe-to-shopping-list endpoint/transaction.

### 6. Add the React 404 page

- Add a wildcard route.
- Provide useful navigation back into the app.
- Keep the recipe-specific unknown-slug state separate from the global application 404.

### 7. Verify the admin recipe workflow

- Test add, edit and delete in a local/live-like safe environment.
- Repair field and endpoint mismatches.
- Add safe related-record cleanup for deletion.

### 8. Expand regression coverage

After test data isolation is in place:

- Contact success/validation/failure tests.
- Recipe filtering/search tests.
- Inventory auth and quantity tests.
- Shopping-list state tests.
- Global 404 test.
- Admin auth and CRUD tests.

A backend test runner still needs to be selected/documented.
