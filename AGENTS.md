# AI Agent Instructions

## Project Context

FlaskCart is a deployed learning and portfolio application with:

- A React public single-page application.
- A Flask JSON API.
- A Flask/Jinja admin interface.
- SQLite persistence.
- Session-based admin authentication.
- Automated GitHub Actions deployment to PythonAnywhere.
- Playwright browser-test tooling.

The current work is governed by the ordered backlog in `TASKS.md`.

## Required Reading Order

Before changing code, read:

1. `PROJECT.md`
2. `REPO_AUDIT.md`
3. `TASKS.md`
4. `REQUIREMENTS.md`
5. `ARCHITECTURE.md`
6. `API.md`
7. `DATABASE.md`
8. `GUARDRAILS.md`
9. `DEFINITION_OF_DONE.md`
10. `DECISIONS.md`

For deployment work, also read `DEPLOYMENT.md` before changing the workflow.

## Priority Rule

Work in this order unless the owner explicitly changes it:

1. Broken or misleading functionality.
2. Performance improvements.
3. Responsive design and visual hierarchy.
4. Accessibility, semantics and SEO.

Operational issues that can corrupt production data or make deployments misleading may be fixed ahead of ordinary feature work.

Do not jump to a framework migration, redesign or optimisation while Priority 1 behaviour remains broken.

## Working Rules

- Inspect the existing implementation before editing.
- Prefer small, reviewable changes.
- Do not refactor unrelated code during a bug fix.
- Preserve the public React app plus Flask/Jinja admin architecture unless a decision replaces it.
- Treat API response shapes as contracts.
- Centralise repeated API handling rather than adding more one-off fetch logic.
- Keep frontend state aligned with successful backend responses.
- Validate state-changing operations on the server even when the client also validates.
- Do not expose admin controls to unauthenticated users.
- Do not return a success response for work that was not completed.
- Update documentation and tests with behaviour changes.
- Never claim a test passed unless it was run.
- Never commit secrets, production credentials, real contact enquiries, virtual environments, `node_modules` or database backups.
- Do not cite generated Playwright demo tests as proof of FlaskCart behaviour.

## Current Completed Baseline

Do not re-open these as if they were untouched work unless regression evidence says otherwise:

- Contact blueprint registration and real contact payload handling.
- Contact server validation, SQLite persistence and email-notification outcome handling.
- Core recipe filtering/search/result count/clear-filter behaviour.
- Dedicated `/recipes/:recipeSlug` pages.
- Responsive recipe-card grid.
- Three-recipe homepage preview.
- Recipe-list loading/error/empty states.
- Playwright installation and generated demo-suite tooling verification.
- Local frontend API routing to local Flask on port 5000.
- Removal of tracked `node_modules`.
- Hardened automated production deployment success path.

## Current High-Risk Areas

- Production `server/app.db` is tracked and can be overwritten by hard-reset deployment.
- Deployment still creates a generated static-file commit on `production`, causing branch churn.
- Inventory callback quantity/state handling and negative-stock validation.
- Admin/public authentication mismatch on pantry controls.
- Shopping-list field-name inconsistencies and incomplete quantity/purchased actions.
- Missing global React 404 route.
- Admin recipe edit/delete behaviour still requires verification.
- FlaskCart-specific Playwright regression coverage does not yet exist.
- Insecure fallback Flask secret key.

## Deployment Rules

Normal deployment is:

```powershell
git checkout master
git pull origin master

git checkout production
git pull origin production
git merge master
git push origin production

git checkout master
```

Then GitHub Actions handles PythonAnywhere deployment and reload.

Rules:

- Do not redesign deployment unless explicitly requested.
- Do not tell the owner to manually copy files to PythonAnywhere for normal releases.
- Do not force-push `production` as a routine fix.
- Do not automatically delete `.git/index.lock`; check for an active Git process first.
- Preserve/backup live SQLite data before any operation that could overwrite it.
- Treat a green deployment as valid only when the deploy step and reload step both succeed.

## Browser Test Rules

- Localhost now uses local Flask at `http://localhost:5000`.
- Mutating browser tests must still use disposable/local test data.
- Never run automated contact, pantry, shopping-list or admin mutations against production.
- Prefer accessible locators and deterministic assertions.

## Approval Required

Obtain explicit approval before:

- Replacing Flask, React or SQLite.
- Migrating from Create React App to Vite.
- Adding a query or state-management library.
- Adding email, analytics or other paid external services.
- Changing authentication architecture.
- Removing or renaming public API routes.
- Performing destructive schema changes.
- Deleting recipe or food data without verified relational cleanup.
- Changing the production database persistence strategy.
- Reorganising the whole repository.

## Required Verification

For each change, run the smallest relevant set of checks and record the result:

- Backend tests or targeted API tests when available.
- Frontend unit/component tests where relevant.
- FlaskCart Playwright tests where coverage exists.
- `npm run build` for frontend changes that can affect compilation.
- Manual smoke test of the changed workflow.
- Mobile and keyboard checks for visible UI changes.
- For deployment changes, verify deployed SHA and reload result.

Follow `DEFINITION_OF_DONE.md` before closing a task.
