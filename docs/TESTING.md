# Testing Strategy

## Current State

The frontend has two testing layers available:

- Create React App / Testing Library for unit and component tests.
- Playwright 1.62.1 for browser E2E tests.

A dedicated backend test runner is still not confirmed in `server/requirements.txt`. `pytest` remains the recommended direction when that dependency decision is made.

## Playwright Status

`app/playwright.config.js` currently contains the generated Playwright configuration:

- `testDir: './tests'`
- fully parallel local execution
- HTML reporter
- Chromium / Desktop Chrome project
- Firefox / Desktop Firefox project
- WebKit / Desktop Safari project
- `trace: 'on-first-retry'`
- `baseURL` still needs FlaskCart configuration
- automatic controlled local server startup is not yet enabled

`app/tests/example.spec.js` contains the generated Playwright documentation tests. They visit `https://playwright.dev/`; they do not test FlaskCart.

### Verified run — 2026-08-28

The generated two-test suite ran in all three browser projects through Docker:

```text
Running 6 tests using 6 workers
6 passed (5.0s)
```

This validates the Playwright installation and browser setup only.

### HTML report

The HTML report was also served successfully through Docker on port `9323` and viewed from the Windows host.

### Current Windows Docker command

Run from `app`:

```powershell
docker run --rm -it `
  --ipc=host `
  -v "${PWD}:/app" `
  -v /app/node_modules `
  -w /app `
  node:24-bookworm `
  bash -lc "npm ci && npx playwright install --with-deps && npx playwright test"
```

The `/app/node_modules` anonymous volume keeps Linux dependencies separate from the Windows host folder.

### HTML report command

```powershell
docker run --rm -it `
  -p 9323:9323 `
  -v "${PWD}:/app" `
  -v /app/node_modules `
  -w /app `
  node:24-bookworm `
  bash -lc "npm ci && npx playwright show-report --host 0.0.0.0 --port 9323"
```

Open `http://localhost:9323` on Windows.

## E2E Data Safety

The earlier configuration problem where localhost targeted the production PythonAnywhere API is resolved.

`app/src/config/config.js` now sends localhost/127.0.0.1 requests to local Flask at `http://localhost:5000`, while production uses same-origin requests.

However, mutating E2E tests still require deliberate data isolation:

- Do not point automated mutations at the production SQLite database.
- Prefer a disposable test database or resettable local fixture database.
- Keep contact, pantry, shopping-list and admin mutation tests isolated from meaningful development data.

## First FlaskCart Playwright Journey

Replace/augment the generated demo tests with a small read-only recipe journey:

1. Open `/recipes`.
2. Confirm the recipe page renders.
3. Activate a `View recipe` link.
4. Confirm navigation to `/recipes/:recipeSlug`.
5. Confirm the recipe title is visible.
6. Confirm the Ingredients section is visible.
7. Confirm the Instructions section is visible.

Once this passes reliably, remove the generated Playwright documentation specs.

## Priority 1 Regression Matrix

### Contact

- Valid values are sent to the backend.
- Missing name, invalid email and missing message are rejected.
- The button is disabled while sending.
- Persistence and email outcomes are represented honestly.
- A failed unsaved request preserves entered values.
- A saved-but-email-failed response does not encourage duplicate resubmission.
- The server never returns a false success.

### Recipe filters

- Selecting a category changes the recipe grid.
- Show All / clear filters restores all recipes.
- Active state and result count are correct.
- Search and category filters combine correctly.
- Category aliases are normalised.

### Recipe detail

- A recipe card links to a slug URL.
- The slug route renders the matching recipe.
- Ingredients and instructions are visible and ordered.
- Unknown recipe slugs show the recipe-specific not-found state.
- Failed detail requests show a useful error state.

### Inventory

- Add and remove updates use the requested quantity.
- Local stock never becomes `NaN`.
- Stock may reach exactly zero.
- A request that would produce negative stock fails.
- Guests cannot use protected controls.
- Admin sessions can use protected controls.

### Shopping list

- Add more sends the entered quantity.
- Purchased state can be toggled.
- Remove updates the page immediately.
- Adding a recipe updates the current shopping-list state.
- Batch add returns one result and rolls back on failure.

### Routing

- A known route renders its page.
- `/recipes/:recipeSlug` renders a recipe detail page.
- An unknown application route renders the designed 404 page once implemented.

### Admin

- Valid admin login succeeds.
- Invalid login fails safely.
- Add recipe persists recipe, steps, ingredients and tags.
- Edit recipe updates the intended fields.
- Delete recipe safely handles related records.

## Deployment Regression Checks

The hardened deployment workflow adds operational checks that should be treated like regression coverage:

- A normal `production` push completes successfully.
- The Action prints the deployed short SHA.
- The PythonAnywhere checkout matches `origin/production`.
- The reload API returns HTTP 200.
- A stale `.git/index.lock` should make the deploy step fail red before reload.

### Verified deployment run — 2026-09-24

The normal success path was verified after hardening and the updated site was confirmed live.

The deliberate stale-lock failure-path test has not yet been run after the hardening change.

## Frontend Commands

```bash
cd app
npm install
npm test
npm run build
```

For a one-off non-watch unit/component test run:

```bash
CI=true npm test -- --watchAll=false
```

## Backend Commands

```bash
cd server
python -m venv venv
# activate the environment
pip install -r requirements.txt
python app.py
```

Preferred Flask CLI alternative:

```bash
flask --app app run --debug
```

Add the selected backend test command here after the backend runner is configured.

## Manual Smoke Test

1. Open the home page and verify no unrelated data errors appear.
2. Browse, search and filter recipes.
3. Open a recipe detail URL and verify ingredients/instructions.
4. Verify the homepage shows only three recipe previews.
5. View pantry on desktop and mobile layouts.
6. Add a recipe to the shopping list only in an isolated/local data environment.
7. Change shopping-list quantity and purchased state when implemented.
8. Sign in as admin.
9. Add and remove pantry stock, including reducing an item to zero, only against non-production data.
10. Add, edit and delete a recipe in a safe environment.
11. Submit the contact form only when test data handling is deliberate.
12. Visit an unknown route.
13. Repeat key flows at a mobile viewport and with keyboard navigation.

## CI Direction

Once local commands and test data isolation are stable, add GitHub Actions for:

- Backend dependency installation and tests.
- Frontend dependency installation.
- Frontend unit/component tests.
- Frontend Playwright tests.
- Frontend production build.
