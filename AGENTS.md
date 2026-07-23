# AI Agent Instructions

## Project Context

FlaskCart is a deployed learning and portfolio application with:

- A React public single-page application.
- A Flask JSON API.
- A Flask/Jinja admin interface.
- SQLite persistence.
- Session-based admin authentication.

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

## Priority Rule

Work in this order unless the owner explicitly changes it:

1. Broken or misleading functionality.
2. Performance improvements.
3. Responsive design and visual hierarchy.
4. Accessibility, semantics and SEO.

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
- Never commit secrets, production credentials or real contact enquiries.

## Current High-Risk Areas

- Contact blueprint registration, payload handling and delivery/persistence.
- Admin/public authentication mismatch on pantry controls.
- Inventory optimistic updates receiving an undefined quantity.
- Shopping-list field-name inconsistencies.
- Recipe detail components fetching entire shared datasets per card.
- Hard-coded production API base URL.
- Insecure fallback Flask secret key.

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
- Frontend tests.
- `npm run build` for frontend changes that can affect compilation.
- Manual smoke test of the changed workflow.
- Mobile and keyboard checks for visible UI changes.

Follow `DEFINITION_OF_DONE.md` before closing a task.
