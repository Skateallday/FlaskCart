# Security

## Scope

FlaskCart is a public portfolio application with an authenticated admin area. It does not process payments, but it handles credentials, sessions, stock mutations, contact personal data and a live SQLite database.

## Authentication

- Admin authentication is session-based.
- Passwords are checked with Flask-Bcrypt.
- Protected admin/pantry behaviour uses authentication checks.
- React now has login/logout surfaces and client auth state, but pantry-control integration still needs completion/verification.

Required improvements:

- Hide or disable admin-only pantry controls for guests.
- Handle `401` responses consistently.
- Verify the intended production registration policy.

## Secret Key

`server/config.py` has historically included a predictable fallback secret when `SECRET_KEY` is missing.

Production must use a securely configured environment value and should fail closed rather than rely on a known fallback.

## CSRF

Flask-WTF CSRF protection is enabled and a token is made available to state-changing requests.

Review:

- Cookie `Secure`, `HttpOnly` and `SameSite` settings.
- Token refresh behaviour.
- Consistent CSRF error responses.
- Coverage of public and authenticated JSON mutations.

## Contact Data

Names, email addresses and messages are personal data.

The contact workflow now persists enquiries in `ContactEnquiries` and attempts email notification.

Requirements:

- Do not print full payloads in production.
- Do not commit real messages or production database contents containing personal data.
- Store only what the workflow requires.
- Define retention and deletion for persisted enquiries.
- Keep mail credentials in environment variables.
- Distinguish persistence from notification delivery honestly.

## Database Safety

- Use parameterised SQL.
- Validate quantities and stock on the server.
- Prevent negative stock with application validation and preferably database constraints.
- Use transactions for multi-record operations.
- Verify related records before recipe deletion.
- Treat production database deployment as a data-integrity concern.

### Open deployment risk

`server/app.db` is tracked by Git and PythonAnywhere deployment uses `git reset --hard origin/production`.

A normal code deployment can therefore replace live SQLite data. This must be resolved before production data is treated as durable.

Backups should never be committed, and restoring a backup must be deliberate when schema changes are involved.

## Deployment Security

- PythonAnywhere credentials and tokens belong in GitHub Secrets/environment configuration, never source control.
- The deployment workflow must fail on Git/SSH errors.
- Do not automatically delete `.git/index.lock`; verify no real Git process is using it first.
- Do not force-push production as a routine deployment fix.
- Verify the deployed SHA before reload.

## Error Handling

- Do not expose stack traces or raw database errors publicly.
- Replace `print`-only exception handling with structured logs and safe API errors.
- Avoid broad exception handling that returns an apparently successful result after failure.

## Frontend Security

- Never put secrets in React environment variables or source files.
- Treat API responses as untrusted data.
- Do not render untrusted HTML.
- Use React Router links for internal navigation.
- Keep localhost connected to local Flask, not production.

## Test Safety

- Never run mutating browser tests against production data.
- Use disposable/test SQLite data for automated mutations.
- Generated Playwright demo-test passes validate tooling only.

## Dependency Security

- Review old Flask and Create React App versions deliberately.
- Remove unused packages after verification.
- Run package audits as supporting evidence, not as the only security review.

## Vulnerability Reporting

Before promoting the repository broadly, add a private contact method for reporting security concerns.
