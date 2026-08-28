# Contributing

## Project Context

FlaskCart is a Flask, React and SQLite learning project deployed on PythonAnywhere. It includes a public React SPA and a Flask/Jinja admin area.

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
.env\Scripts\Activate.ps1
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

The current frontend source uses a production API URL in `app/src/config/config.js`. Confirm local API configuration before testing mutations.

## Before Starting

- Read `TASKS.md` and respect the priority order.
- Read `REPO_AUDIT.md` for verified source findings.
- Confirm the current behaviour in the browser and network panel.
- Keep the planned change small.
- Identify whether the change affects public, admin or both surfaces.

## Branch Names

Examples:

```text
fix/contact-form
fix/recipe-filters
fix/inventory-stock-update
perf/recipe-data-fetching
a11y/recipe-accordion
```

## Commit Messages

Use focused messages:

```text
Register and validate contact endpoint
Connect recipe filters to recipe grid
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

Update the relevant files when changing:

- API routes or payloads.
- Database schema.
- Authentication.
- Contact data handling.
- Deployment configuration.
- User-visible behaviour.
