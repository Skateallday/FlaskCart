# Decision Log

## 2026-07-23: Treat FlaskCart as a learning and portfolio project

**Status:** Accepted

### Decision

Optimise for clear full-stack learning, honest documentation and a strong portfolio review rather than commercial-scale complexity.

## 2026-07-23: Target portfolio reviewers

**Status:** Accepted

### Decision

Portfolio reviewers and potential employers are the primary audience.

## 2026-07-23: Preserve the hybrid public/admin architecture

**Status:** Accepted

### Context

The repository contains a React public SPA, Flask JSON API and Flask/Jinja admin area.

### Decision

Keep this architecture while completing the current backlog. Do not rewrite the admin area in React as part of ordinary bug fixes.

### Consequences

- Documentation must describe both application surfaces.
- Authentication state must be communicated clearly to the React UI where protected actions appear.
- Admin and public routes need separate testing.

## 2026-07-23: Use the supplied four-level priority order

**Status:** Accepted

### Decision

1. Fix broken or misleading functionality.
2. Improve performance.
3. Improve responsive design and visual hierarchy.
4. Improve accessibility, semantics and SEO.

### Consequences

Build-tool migrations and major redesigns must not jump ahead of broken workflows.

## 2026-07-23: Keep Flask, React and SQLite

**Status:** Accepted

### Decision

Continue with Flask, React, JavaScript and SQLite for the current project phase.

## 2026-07-23: Treat admin authentication as an existing capability

**Status:** Accepted

### Context

The Flask server includes session login, registration, protected admin pages and a logout route.

### Decision

Documentation must no longer describe authentication as purely future work. Public user accounts remain out of scope, but admin authentication exists and must be completed coherently across protected controls.

## 2026-07-23: Contact delivery and persistence

**Status:** Replaced by the accepted 2026-08-03 decision

### Options

1. Email only.
2. SQLite persistence only.
3. SQLite persistence plus email.

### Historical outcome

Option 3 was subsequently selected and implemented: persist to SQLite and attempt an email notification. See the accepted 2026-08-03 decision below.

## 2026-08-03: Persist contact enquiries and send email notification

**Status:** Accepted

### Decision

Use SQLite persistence plus an email notification attempt. Persist the enquiry first, record delivery status, and return responses that distinguish saved data from email delivery success/failure.

### Consequences

- `ContactEnquiries` contains personal data and needs a retention/deletion policy.
- Email configuration remains environment-specific.
- A failed notification must not pretend the enquiry was unsaved when persistence succeeded.

## 2026-08-28: Use dedicated recipe detail routes

**Status:** Accepted

### Decision

Recipe cards link to `/recipes/:recipeSlug`, where a dedicated React page presents metadata, ingredients and ordered instructions.

### Consequences

- Recipe URLs are shareable and suitable for route-specific metadata/structured data later.
- The old per-card expandable detail pattern is no longer the preferred UI.
- The current detail page still filters full shared API datasets client-side and can be optimised later.

## 2026-08-28: Adopt Playwright for browser E2E testing

**Status:** Accepted

### Decision

Use Playwright for browser-level regression tests of important public workflows. On the current Windows workstation, execute Playwright through a Node 24 Docker container rather than relying on the outdated host Node installation.

### Current state

The generated two-test example suite has been verified in Chromium, Firefox and WebKit (six passing executions), but those tests target `playwright.dev` and are not FlaskCart regression tests.

### Safety constraint

Do not add mutating E2E tests until the local frontend is isolated from the production PythonAnywhere API/database.

## 2026-08-28: Local API configuration for E2E safety

**Status:** Proposed / deferred

### Problem

`app/src/config/config.js` currently sends API calls from `localhost` and `127.0.0.1` to the production PythonAnywhere origin even though `package.json` also defines a local Flask proxy.

### Preferred direction

Use local/same-origin `/api` requests during development so Create React App can proxy to local Flask, while production continues to use the same deployed origin. Confirm the final implementation before changing it.

### Consequences

Until resolved, Playwright work should remain read-only and must not mutate production data.

## Decision Template

## YYYY-MM-DD: Decision title

**Status:** Proposed | Accepted | Replaced

### Context

### Decision

### Alternatives Considered

### Consequences

### Follow-up
