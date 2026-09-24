# FlaskCart

A full-stack learning and portfolio application built with Flask, React and SQLite for browsing recipes, tracking pantry stock and maintaining a shopping list.

## Overview

FlaskCart combines a Flask backend with a React public application and a Flask/Jinja admin area. The public application supports recipe browsing, category filtering and search, dedicated recipe detail pages, pantry viewing, shopping-list workflows and contact enquiries.

The project is intentionally kept approachable as a full-stack learning project while still demonstrating API design, state management, authentication, database work, responsive UI and deployment.

## Built With

### Backend
- Python
- Flask 2.2.5
- SQLite
- Flask blueprints and JSON API routes
- Flask-Bcrypt
- Flask-WTF / CSRF protection
- Flask-Mail

### Frontend
- React 19
- React Router 6
- JavaScript
- Tailwind CSS utilities
- React Toastify

### Testing and Development
- Testing Library / Jest through Create React App
- Playwright 1.62.1 for browser E2E testing
- Docker / Docker Compose
- Git and GitHub

## Features

- Recipe library with search and category filtering.
- Dedicated slug-based recipe detail pages with ingredients and instructions.
- Responsive recipe cards and pantry layouts.
- Pantry inventory and shopping-list data backed by Flask/SQLite.
- Contact enquiries persisted to SQLite with email notification handling.
- Session-based Flask admin authentication and admin data-management pages.
- PythonAnywhere deployment.

## Demo

[View the live demo](https://skateallday.pythonanywhere.com/)

## Getting Started

### Backend

```bash
cd server
python -m venv venv
```

Activate the environment, install requirements and run Flask:

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

### Local API configuration warning

The current `app/src/config/config.js` points browser requests from `localhost` or `127.0.0.1` at the live PythonAnywhere API. Production uses same-origin API requests.

This configuration must be corrected before running any automated test that changes data. The preferred direction is local React -> local Flask -> local/test SQLite, while production remains same-origin.

## Testing

### Frontend unit/component tests

```bash
cd app
npm test
```

### Playwright

Playwright is installed under `app` and currently has the generated configuration plus generated example tests. The generated example suite contains two tests and is configured for Chromium, Firefox and WebKit, so a complete run produces six test executions.

On the current Windows development machine, Playwright is run through Node 24 in Docker instead of the outdated host Node installation:

```powershell
docker run --rm -it `
  --ipc=host `
  -v "${PWD}:/app" `
  -v /app/node_modules `
  -w /app `
  node:24-bookworm `
  bash -lc "npm ci && npx playwright install --with-deps && npx playwright test"
```

The generated suite was verified on 2026-08-28 with six passing test executions. This proves the Playwright setup works; it does **not** yet prove FlaskCart behaviour because `tests/example.spec.js` still targets `playwright.dev`.

To view the HTML report from Docker:

```powershell
docker run --rm -it `
  -p 9323:9323 `
  -v "${PWD}:/app" `
  -v /app/node_modules `
  -w /app `
  node:24-bookworm `
  bash -lc "npm ci && npx playwright show-report --host 0.0.0.0 --port 9323"
```

Then open `http://localhost:9323`.

The next E2E milestone is a read-only FlaskCart recipe journey: `/recipes` -> View recipe -> slug URL -> ingredients -> instructions. Mutating E2E tests must wait until local/test API isolation is fixed.

## Project Status

For the ordered implementation backlog, see `TASKS.md` and `NEXT_STEPS.md`.

## Learning Points

- Building a Flask JSON API.
- Connecting React and Flask.
- State management and routing in React.
- Responsive and accessible UI work.
- Browser E2E testing with Playwright.
- Full-stack deployment and debugging.

## Acknowledgements

Thanks to the Flask, React and Playwright communities for their documentation and tooling.
