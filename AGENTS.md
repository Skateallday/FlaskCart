# AI Agent Instructions

## Project Context

FlaskCart is a deployed learning and portfolio application with:

- A React public single-page application.
- A Flask JSON API.
- A Flask/Jinja admin interface.
- SQLite persistence.
- Session-based admin authentication.
- Dedicated slug-based recipe detail pages.
- Playwright browser-test tooling under `app`, with FlaskCart-specific E2E coverage still to be written.

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
11. `TESTING.md` for test/environment work

## Priority Rule

Work in this order unless the owner explicitly changes it:

1. Broken or misleading functionality.
2. Performance improvements.
3. Responsive design and visual hierarchy.
4. Accessibility, semantics and SEO.

Do not jump to a framework migration or broad refactor while Priority 1 behaviour remains broken.

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
- Never claim a test passed unless it was actually run.
- Never equate generated Playwright demo-test passes with FlaskCart regression coverage.
- Never commit secrets, production credentials or real contact enquiries.

## Verified 2026-08-28 State

- The public UI received a major responsive visual refresh across home, contact, header, footer, recipes and pantry.
- `/recipes/:recipeSlug` now renders a dedicated recipe page with ingredients and instructions.
- The recipe grid now consumes filter state, supports search, shows active category/result count and provides loading/error/empty states.
- Recipe cards use a responsive one/two/three-column grid and link to the dedicated detail route.
- The homepage shows three recipe previews and links to the full library.
- The pantry view has desktop/tablet table and mobile-card layouts.
- Playwright 1.62.1 is installed locally; the generated two-test demo suite passed in Chromium, Firefox and WebKit through Docker (six executions total).
- `tests/example.spec.js` still targets `playwright.dev`; FlaskCart-specific E2E coverage has not yet been added.

## Current High-Risk Areas

- `app/src/config/config.js` points `localhost`/`127.0.0.1` API requests at the live PythonAnywhere backend. Fix this before mutating E2E tests.
- Admin/public authentication mismatch on pantry controls.
- Inventory optimistic updates still risk receiving an undefined quantity from button callbacks.
- Shopping-list field-name and state-synchronisation inconsistencies.
- Full recipe taxonomy normalisation and recipe-sidebar semantics remain incomplete.
- Recipe detail currently downloads the full recipe, ingredient and instruction datasets and filters client-side; a detail API can be considered later.
- Insecure fallback Flask secret key.

## Playwright Rules

- Current Windows Playwright runs use Node 24 in Docker rather than the outdated host Node installation.
- Preserve the anonymous `/app/node_modules` Docker volume so Linux dependencies do not overwrite Windows dependencies.
- Do not enable or write mutating E2E flows until local/test Flask and SQLite isolation is established.
- Start with read-only FlaskCart coverage: `/recipes` -> View recipe -> slug URL -> ingredients -> instructions.
- Prefer role/label/text locators over brittle implementation-specific selectors.
- Do not add fixed sleeps where Playwright auto-waiting or explicit assertions can be used.
- Use the HTML report and trace/screenshot evidence when debugging failures.

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
- Reorganising the whole repository.

## Required Verification

For each change, run the smallest relevant set of checks and record the result:

- Backend tests or targeted API tests.
- Frontend unit/component tests where relevant.
- FlaskCart-specific Playwright E2E tests once available.
- `npm run build` for frontend changes that can affect compilation.
- Manual smoke test of the changed workflow.
- Mobile and keyboard checks for visible UI changes.

Follow `DEFINITION_OF_DONE.md` before closing a task.
