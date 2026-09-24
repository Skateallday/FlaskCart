# Contributing

## Project Context

FlaskCart is a Flask, React and SQLite learning/portfolio project deployed on PythonAnywhere. It includes a public React SPA and a Flask/Jinja admin area.

## Setup

### Backend

```bash
cd server
python -m venv venv
```

Activate the environment:

```bash
# macOS or Linux
source venv/bin/activate
```

```powershell
# Windows PowerShell
.\venv\Scripts\Activate.ps1
```

Install and run:

```bash
pip install -r requirements.txt
python app.py
```

Flask CLI alternative:

```bash
flask --app app run --debug
```

### Frontend

```bash
cd app
npm install
npm start
```

## Local API warning

`app/src/config/config.js` currently sends API requests from `localhost`/`127.0.0.1` to the live PythonAnywhere backend. Do not use the current local frontend configuration for automated mutations. Fix local/test API isolation before writing Playwright tests that add, remove, edit, submit or otherwise change persisted data.

## Playwright E2E testing

Playwright 1.62.1 is installed in `app`. The generated config uses `app/tests`, the HTML reporter and Chromium/Firefox/WebKit projects. Its `baseURL` and `webServer` settings are not yet enabled.

The current Windows workflow runs Playwright through Node 24 in Docker:

```powershell
cd app

docker run --rm -it `
  --ipc=host `
  -v "${PWD}:/app" `
  -v /app/node_modules `
  -w /app `
  node:24-bookworm `
  bash -lc "npm ci && npx playwright install --with-deps && npx playwright test"
```

The anonymous `/app/node_modules` volume is deliberate: it keeps Linux container dependencies separate from Windows `node_modules`.

To serve the HTML report:

```powershell
docker run --rm -it `
  -p 9323:9323 `
  -v "${PWD}:/app" `
  -v /app/node_modules `
  -w /app `
  node:24-bookworm `
  bash -lc "npm ci && npx playwright show-report --host 0.0.0.0 --port 9323"
```

Open `http://localhost:9323`.

As of 2026-08-28, the generated two-test Playwright example suite passed in all three configured browsers (six executions). Those generated tests target `playwright.dev`; replace them with FlaskCart-specific tests before treating E2E coverage as project regression evidence.

## Before Starting

- Read `TASKS.md` and respect the priority order.
- Read `REPO_AUDIT.md` for verified source findings and the 2026-08-28 follow-up verification.
- Confirm current behaviour in the browser and network panel.
- Keep the planned change small.
- Identify whether the change affects public, admin or both surfaces.
- For E2E work, confirm the test cannot mutate production data.

## Branch Names

Examples:

```text
fix/contact-form
fix/recipe-filters
fix/inventory-stock-update
test/recipe-e2e
perf/recipe-data-fetching
a11y/recipe-filters
```

## Commit Messages

Use focused messages:

```text
Add recipe detail route
Connect recipe filters to recipe grid
Add Playwright recipe journey
Prevent negative pantry stock
Batch add recipe ingredients
```

## Pull Requests

Include:

- Problem and user impact.
- Files and architecture areas changed.
- Test commands and results.
- Screenshots for UI changes.
- Network-request comparison for performance work.
- Accessibility checks for interactive UI.
- Known limitations.

## Coding Rules

- Match existing conventions unless the task intentionally improves them.
- Keep API field names consistent.
- Avoid unrelated refactors.
- Remove debugging `print` and console output from completed paths.
- Do not add dependencies without explaining why.
- Use transactions for multi-record writes.

## Documentation

Update the relevant files when changing API routes, database schema, authentication, contact data handling, deployment configuration, testing workflow or user-visible behaviour.
