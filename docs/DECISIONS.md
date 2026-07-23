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

**Status:** Proposed

### Options

1. Email only.
2. SQLite persistence only.
3. SQLite persistence plus email.

### Decision needed

The project owner must select the required outcome before the contact-form implementation is considered complete.

## Decision Template

## YYYY-MM-DD: Decision title

**Status:** Proposed | Accepted | Replaced

### Context

### Decision

### Alternatives Considered

### Consequences

### Follow-up
