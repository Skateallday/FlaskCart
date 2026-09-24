# Technical Stack

## Backend

Confirmed from the repository:

- Python
- Flask 2.2.5
- Flask-Bcrypt 1.0.1
- Flask-Mail 0.9.1
- Flask-WTF 1.2.1
- WTForms 3.1.2
- flask-cors 4.0.0
- python-dotenv 1.0.1
- SQLite through Python's standard `sqlite3` module

The repository uses ordinary Flask blueprints and JSON routes. `Flask-RESTful` is not present in the backend requirements and the routes do not use Flask-RESTful resources.

## Frontend

Confirmed from `app/package.json`:

- React 19.1.1
- React DOM 19.1.1
- React Router DOM 6.30.4
- React Toastify 11.0.5
- Create React App / react-scripts 5.0.1
- JavaScript
- Tailwind CSS utilities
- Testing Library packages
- Playwright 1.62.1 (`@playwright/test`) for browser E2E testing

## Build-Stack Conflict

The frontend currently includes:

- `@tailwindcss/cli` 4.x
- `tailwindcss` 3.4.x
- Create React App 5

Standardise the Tailwind toolchain before doing broader build-system work. A Vite migration is optional and must not displace higher-priority functional fixes.

## Local Development Configuration

`app/src/config/config.js` now uses:

- `http://localhost:5000` for `localhost` / `127.0.0.1`;
- same-origin API requests in production.

This fixes the earlier local-to-production API coupling.

## Browser Testing

- Playwright 1.62.1 is installed.
- Chromium, Firefox and WebKit projects are configured.
- Generated demo tests have been verified through Docker using Node 24: six passing executions.
- The HTML report has been served successfully on port `9323`.
- FlaskCart-specific specs, `baseURL`, controlled server startup and disposable test data are still pending.

## Deployment Stack

- PythonAnywhere hosts the live application.
- Flask serves the React production build.
- GitHub Actions deploys pushes to `production`.
- The deployment build uses Node 24 and `npm ci`.
- GitHub Actions connects to PythonAnywhere over SSH, verifies the deployed commit and calls the PythonAnywhere reload API.

## Current Technical Debt

- Global providers still fetch some route-specific data eagerly.
- Recipe list fetching now checks `response.ok`, but API error handling is not centralised across the frontend.
- The recipe list no longer mounts per-card ingredient/instruction fetchers; the dedicated detail page still downloads the full recipes, ingredients and instructions datasets and filters them client-side.
- Inventory local update and authentication-state behaviour remains incomplete.
- Shopping-list schema/state behaviour remains incomplete.
- Backend requirements include packages that appear unrelated to FlaskCart; verify before removing them.
- The Flask secret key has an insecure fallback value.
- There is no confirmed backend test runner in the requirements.
- `server/app.db` is tracked and is vulnerable to replacement during hard-reset deployment.
- The deployment workflow still commits generated React static assets back to `production`, creating avoidable branch churn.

## Approved Direction

Continue using the existing stack while fixing Priority 1 and Priority 2 work.

Approval is required for:

- Vite migration.
- TypeScript migration.
- Database replacement.
- Query/state library adoption.
- Authentication replacement.
- Paid external services.
