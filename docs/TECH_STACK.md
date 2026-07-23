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

The repository uses ordinary Flask blueprints and JSON routes. Although the README describes a Flask-RESTful API, `Flask-RESTful` is not present in the backend requirements and the routes do not use Flask-RESTful resources.

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

## Build-Stack Conflict

The frontend currently includes:

- `@tailwindcss/cli` 4.x
- `tailwindcss` 3.4.x
- Create React App 5

Standardise the Tailwind toolchain before doing broader build work. A Vite migration is optional and must not displace higher-priority functional fixes.

## Deployment

- PythonAnywhere hosts the live application.
- Flask serves the React production build.
- The frontend production API origin is hard-coded in `app/src/config/config.js`.

## Current Technical Debt

- Global providers fetch route-specific data eagerly.
- Fetch handling is inconsistent and often parses JSON before checking status.
- Backend requirements include packages that appear unrelated to FlaskCart, including Discord and async networking packages; verify whether they are needed before removing them.
- The Flask secret key has an insecure fallback value.
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
