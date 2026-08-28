# Security

## Scope

FlaskCart is a public portfolio application with an authenticated admin area. It does not process payments, but it handles credentials, sessions, stock mutations and persisted contact personal data.

## Authentication

- Admin login is session-based.
- Passwords are checked with Flask-Bcrypt.
- `/admin-home` and pantry mutation endpoints use `login_required`.
- The session lifetime is two hours.

Required improvements:

- Provide the React UI with a safe way to know whether protected controls are available.
- Hide or disable admin-only controls for guests.
- Handle `401` responses consistently.
- Verify admin registration should remain publicly reachable in production.

## Secret Key

`server/config.py` currently falls back to a predictable secret value when `SECRET_KEY` is missing.

Production must fail closed or use a securely configured environment value. Do not use the fallback for the live deployment.

## CSRF

Flask-WTF CSRF protection is enabled and a token is placed in a cookie after requests.

Review:

- Cookie `Secure`, `HttpOnly` and `SameSite` settings.
- Token refresh behaviour.
- Whether public JSON mutations require and correctly receive the token.
- Consistent CSRF error responses.

## Contact Data

Names, email addresses and messages are personal data. The current contact workflow persists enquiries to `ContactEnquiries` and attempts an email notification.

- Do not print full payloads in production.
- Do not commit real messages.
- Store only what the contact workflow requires.
- Document and enforce a retention/deletion policy for persisted enquiries.
- Keep mail credentials and `CONTACT_RECIPIENT` configuration out of source control.
- Distinguish saved, email-sent and failure states accurately in API responses.

## Database Safety

- Use parameterised SQL.
- Validate quantities and stock on the server.
- Prevent negative stock with application validation and preferably a database constraint.
- Use transactions for multi-record operations.
- Verify related records before recipe deletion.

## Error Handling

- Do not expose stack traces or raw database errors publicly.
- Replace `print`-only exception handling with structured logs and safe API errors.
- Avoid broad exception handling that returns an apparently successful page after failure.

## Frontend Security

### Browser-test safety

- The current local frontend configuration points API calls at the live PythonAnywhere backend.
- Do not run Playwright tests that submit contact forms, mutate pantry stock, modify shopping lists or use admin actions against that production backend.
- Establish local/test API and database isolation before adding mutating E2E coverage.
- Read-only production smoke checks, if deliberately used, must not be treated as a substitute for isolated regression tests.

- Never put secrets in React environment variables or source files.
- Treat API responses as untrusted data.
- Do not render untrusted HTML.
- Use React Router links for internal navigation rather than forcing full reloads.

## Dependency Security

- Review old Flask and Create React App versions deliberately.
- Remove unused packages after verification.
- Run package audits as supporting evidence, not as the only security review.

## Vulnerability Reporting

Before promoting the repository publicly, add a private contact method for reporting security concerns.
