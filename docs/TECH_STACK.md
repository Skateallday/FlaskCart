# Technical Stack

## Backend

Confirmed from `server/requirements.txt`:

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

Standardise the Tailwind toolchain before doing broader build work. A Vite migration is optional and must not displace higher-priority functional fixes.

## Deployment

- PythonAnywhere hosts the live application.
- Flask serves the React production build.
- `app/src/config/config.js` currently uses the production PythonAnywhere origin when the browser hostname is `localhost` or `127.0.0.1`, while production falls back to same-origin requests. This local-to-production coupling must be corrected before mutating E2E tests.

## Current Technical Debt

- Global providers still fetch some route-specific data eagerly.
- Recipe list fetching now checks `response.ok`, but API error handling is not yet centralised across the frontend.
- The recipe list no longer mounts per-card ingredient/instruction fetchers; the dedicated recipe detail page currently downloads the full recipes, ingredients and instructions datasets once and filters them client-side.
- Backend requirements include packages that appear unrelated to FlaskCart, including Discord and async networking packages; verify whether they are needed before removing them.
- The Flask secret key has an insecure fallback value.
- Playwright is configured for frontend browser tests, but FlaskCart-specific E2E specs are not yet present.
- There is no confirmed backend test runner in the requirements.

## Approved Direction

Continue using the existing stack while fixing Priority 1 and Priority 2 work.

Approval is required for:

- Vite migration.
- TypeScript migration.
- Database replacement.
- Query/state library adoption.
- Authentication replacement.
- Paid external services.
