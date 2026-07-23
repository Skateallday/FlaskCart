# Project Guardrails

## Priority Guardrail

Do not begin broad redesigns or build-tool migrations while Priority 1 controls are broken or misleading.

## Behaviour Rules

- A visible control must work or be removed/disabled with an explanation.
- Never return success for a contact message that was not sent or saved.
- Never require a page refresh to reflect a confirmed successful mutation.
- Never display protected stock controls as ordinary public actions.
- Never allow pantry stock to become negative.
- Never trust client-provided prices, totals, permissions or stock values.

## API Rules

- Check and document HTTP status codes.
- Validate request bodies and route parameters.
- Use consistent JSON error responses.
- Do not silently change response property names.
- Centralise client error handling.
- Add tests when endpoint behaviour changes.

## Authentication Rules

- Admin mutations require a verified authenticated session.
- Public UI must know whether protected actions are available.
- Do not expose production credentials.
- Do not weaken authentication to make the UI appear functional.
- Require a real `SECRET_KEY` in production; do not rely on the fallback value.

## Contact Data Rules

- Treat names, email addresses and messages as personal data.
- Store only what is required.
- Do not commit real enquiries.
- Do not log full contact payloads in production.
- Document retention and deletion if enquiries are stored.
- Keep email credentials in environment variables.

## Database Rules

- Back up `app.db` before destructive local changes.
- Use transactions for multi-row recipe and shopping-list operations.
- Validate stock and quantities on the server.
- Define cascade or cleanup behaviour before deleting recipes.
- Use parameterised SQL.
- Do not rely on inconsistent `ROWID` and `ID` assumptions without confirming the schema.

## Frontend Rules

- Keep one source of truth for pantry and shopping-list data.
- Use consistent API field names.
- Do not mount expensive detail components solely to hide them with CSS.
- Keep mobile controls visible and accessible.
- Use React Router for internal navigation.

## Dependency Rules

- Do not add a library when a small existing-stack solution is clear.
- Document the reason for each new dependency.
- Standardise Tailwind before adding more styling tooling.
- Treat Vite migration as a separate approved project.

## Git Rules

- Keep commits focused.
- Separate formatting-only changes from behaviour changes.
- Do not commit `.env`, credentials, virtual environments, `node_modules` or real contact data.
- Do not rewrite unrelated code in a bug-fix pull request.

## Approval Required

- Authentication redesign.
- Contact data retention policy.
- External email service or paid service.
- Destructive database migration.
- Recipe deletion implementation that changes relational behaviour.
- Framework, database or build-system replacement.
