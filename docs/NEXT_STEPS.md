# Next Steps

## Current Checkpoint — 2026-08-28

Completed/verified recently:

- Contact endpoint registration, validation, SQLite persistence and email notification handling are implemented.
- Recipe filtering is connected to the recipe grid.
- Recipe search, result count, active category, clear-filter, loading/error/empty states are implemented.
- Dedicated `/recipes/:recipeSlug` detail pages are implemented.
- Recipe cards use a responsive grid and the homepage is limited to three recipe previews.
- Pantry presentation has desktop/tablet and mobile layouts.
- Playwright 1.62.1 is installed and its generated two-test example suite passes in Chromium, Firefox and WebKit through Docker.

The six Playwright executions are tooling validation only, not FlaskCart regression coverage.

## Immediate Implementation Sequence

### 1. Make the E2E environment safe

- Correct the local API configuration so localhost does not point at the live PythonAnywhere backend.
- Confirm local React -> local Flask -> local/test SQLite behaviour.
- Keep production on same-origin API requests.
- Do not run mutating browser tests until this isolation is verified.

### 2. Add the first FlaskCart Playwright test

Start read-only:

- Open `/recipes`.
- Confirm the recipe page loads.
- Activate `View recipe`.
- Confirm the slug URL.
- Confirm recipe title, Ingredients and Instructions are visible.

Then replace/remove the generated `playwright.dev` example tests once equivalent FlaskCart coverage exists.

### 3. Finish recipe filter cleanup

- Normalise the complete recipe taxonomy rather than only handling `Snack`/`Snacks` as an alias.
- Replace inappropriate `role="tab"` filter semantics with normal button semantics and selected-state accessibility.
- Verify the current uncommitted/local sidebar styling before documenting it as complete.

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

After the environment is isolated:

- Contact success/validation/failure tests.
- Recipe filtering/search tests.
- Inventory auth and quantity tests.
- Shopping-list state tests.
- Global 404 test.
- Admin auth and CRUD tests.

A backend test runner still needs to be selected/documented.
