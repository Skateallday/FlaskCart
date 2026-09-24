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

The Flask server includes session login, protected admin pages and logout behaviour.

### Decision

Documentation must not describe authentication as purely future work. Public user accounts remain out of scope, but admin authentication exists and must be completed coherently across protected controls.

## 2026-07-23: Contact delivery and persistence

**Status:** Replaced by the accepted 2026-08-03 decision

### Historical outcome

SQLite persistence plus email notification was selected and implemented.

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

Use Playwright for browser-level regression tests of important public workflows. On the current Windows workstation, execute Playwright through a Node 24 Docker container when host tooling is unsuitable.

### Current state

The generated two-test example suite has been verified in Chromium, Firefox and WebKit (six passing executions), and its HTML report has been served successfully. Those tests target `playwright.dev` and are not FlaskCart regression tests.

### Safety constraint

Mutating E2E tests must use isolated local/test data and must never target the production SQLite database.

## 2026-08-28: Local API configuration for E2E safety

**Status:** Replaced by the accepted 2026-09-24 decision

The earlier local configuration pointed localhost at the production PythonAnywhere API. This was later corrected.

## 2026-09-24: Use local Flask during local frontend development

**Status:** Accepted

### Decision

When the React app runs on `localhost` or `127.0.0.1`, use `http://localhost:5000` as the API base. In production, use same-origin API requests.

### Consequences

- Local frontend development no longer targets production by default.
- Playwright can be developed against local Flask once a disposable/test SQLite database is configured.
- Production does not require a hard-coded PythonAnywhere API origin.

## 2026-09-24: Keep the master-to-production automated deployment model

**Status:** Accepted

### Decision

Keep the existing release model:

`master` -> merge to `production` -> push `production` -> GitHub Actions -> PythonAnywhere -> automatic reload.

Normal releases should not require logging into PythonAnywhere.

### Required local release sequence

```powershell
git checkout master
git pull origin master

git checkout production
git pull origin production
git merge master
git push origin production

git checkout master
```

### Consequences

- Deployment automation should be hardened rather than replaced with a new deployment architecture.
- Manual PythonAnywhere intervention is reserved for recovery/troubleshooting.

## 2026-09-24: Fail production deployment visibly on Git/SSH errors

**Status:** Accepted

### Context

A stale PythonAnywhere `.git/index.lock` caused `git reset --hard origin/production` to fail while the SSH script continued and the GitHub Action still appeared green.

### Decision

Use fail-fast SSH execution, refuse deployment while a Git lock exists, verify the deployed SHA matches `origin/production`, and only reload after those checks succeed.

### Consequences

- A checkout failure should now make the Action red instead of silently reloading stale code.
- The workflow must not automatically delete `.git/index.lock`; stale-lock cleanup remains a deliberate recovery action after checking for active Git processes.

## 2026-09-24: Production SQLite persistence strategy

**Status:** Proposed / unresolved

### Problem

`server/app.db` is tracked while deployment uses `git reset --hard origin/production`, which can replace the live database.

### Decision needed

Choose a durable strategy before treating production data as persistent. Options include removing the live DB from Git and managing schema/seed data separately, or explicitly preserving/restoring the live database around deploys with a documented migration process.

## Decision Template

## YYYY-MM-DD: Decision title

**Status:** Proposed | Accepted | Replaced

### Context

### Decision

### Alternatives Considered

### Consequences

### Follow-up
