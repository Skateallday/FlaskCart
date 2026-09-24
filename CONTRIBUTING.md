# Contributing

## Project Context

FlaskCart is a Flask, React and SQLite learning/portfolio project deployed on PythonAnywhere. It includes a public React SPA, Flask JSON APIs and a Flask/Jinja admin area.

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

Local React requests use the local Flask API at `http://localhost:5000`. Production uses same-origin API requests.

## Before Starting

- Read `TASKS.md` and respect the priority order.
- Read `REPO_AUDIT.md` for verified source findings and follow-up updates.
- Read `KNOWN_ISSUES.md` so resolved issues are not reopened accidentally.
- Confirm the current behaviour in the browser/network panel where relevant.
- Keep the planned change small.
- Identify whether the change affects public, admin, database, deployment or more than one surface.

## Branch Names

Examples:

```text
fix/inventory-stock-update
fix/shopping-list-schema
fix/global-404
perf/recipe-detail-api
a11y/recipe-filters
test/recipe-playwright
deploy/database-safety
```

## Commit Messages

Use focused messages:

```text
Prevent negative pantry stock
Complete shopping list quantity action
Add recipe Playwright journey
Protect production database during deploy
```

## Pull Requests

Include:

- Problem and user impact.
- Files and architecture areas changed.
- Test commands and actual results.
- Screenshots for UI changes where useful.
- Network-request comparison for performance work.
- Accessibility checks for interactive UI.
- Database/rollback notes where data is affected.
- Known limitations.

## Coding Rules

- Match existing conventions unless the task intentionally improves them.
- Keep API field names consistent.
- Avoid unrelated refactors.
- Remove debugging `print` and console output from completed paths.
- Do not add dependencies without explaining why.
- Use transactions for multi-record writes.
- Do not treat generated Playwright demo tests as FlaskCart coverage.

## Testing

Frontend:

```bash
cd app
npm test
npm run build
```

Playwright currently runs reliably through a Node 24 Docker container on the Windows development machine. See `TESTING.md` for the exact commands.

Before adding mutating browser tests, use a disposable/resettable local test database.

A backend test runner still needs to be selected and documented.

## Deployment

Normal production deployment is deliberately simple:

```powershell
git checkout master
git pull origin master

git checkout production
git pull origin production
git merge master
git push origin production

git checkout master
```

Pushing `production` triggers GitHub Actions, which builds the React app, deploys to PythonAnywhere, verifies the deployed commit and reloads the web app.

Normal releases should not require logging into PythonAnywhere.

Before deployment work, read `DEPLOYMENT.md`. Do not force-push production or automatically remove a Git lock as a routine recovery technique.

## Documentation

Update the relevant files when changing:

- API routes or payloads.
- Database schema/data handling.
- Authentication.
- Contact data handling.
- Deployment configuration.
- Testing strategy.
- User-visible behaviour.
- Task completion status.
