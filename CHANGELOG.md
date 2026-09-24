# Changelog

All notable FlaskCart changes should be documented here.

## Unreleased

### Added

- Dedicated slug-based recipe routes at `/recipes/:recipeSlug`.
- Recipe search, active category/result count and clear-filter controls.
- Recipe-list loading, error and empty states.
- Contact enquiry persistence in SQLite with email notification outcome handling.
- Playwright 1.62.1 browser-test tooling with Chromium, Firefox and WebKit projects.
- Deployment concurrency protection, stale Git-lock detection and deployed-SHA verification.
- Documentation for the automated `master` -> `production` -> GitHub Actions -> PythonAnywhere release path.

### Changed

- Recipe cards now use a responsive one/two/three-column grid and link to dedicated recipe pages.
- The homepage now shows three recipe previews and links to the full recipe library.
- Pantry presentation now includes desktop/tablet and mobile layouts.
- Public UI areas including home, header, footer, contact and recipes received a visual refresh.
- Local frontend API configuration now uses `http://localhost:5000`; production uses same-origin requests.
- Deployment now uses Node 24 and `npm ci`.
- `node_modules` is no longer tracked in Git.
- Local `venv/` and `server/app.db.backup*` files are ignored.

### Fixed

- Contact no longer sends an empty payload or returns false success without persistence/delivery handling.
- Recipe filters now affect the visible recipe grid.
- Recipe-list fetches check `response.ok` before parsing JSON.
- The recipe grid no longer mounts per-card ingredient/instruction fetchers.
- Deployment no longer silently continues after a failed PythonAnywhere Git checkout.
- The stale `.git/index.lock` incident from 2026-09-24 was recovered, PythonAnywhere was reset to the current production revision, and the correct site version was confirmed live.

### Testing

- Generated Playwright demo suite verified through Docker on 2026-08-28: six passing executions across Chromium, Firefox and WebKit.
- Playwright HTML report serving verified on port `9323`.
- Normal hardened production deployment smoke-tested successfully on 2026-09-24.
- FlaskCart-specific Playwright regression coverage is still pending.
- The deliberate stale-lock deployment failure-path test is still pending.

### Deployment

- Production deploys remain automatic after pushing `production`; normal releases do not require logging into PythonAnywhere.
- The workflow now fails fast with `set -e`, rejects an existing `.git/index.lock`, verifies the deployed SHA and reloads PythonAnywhere only after a successful deployment step.

### Known Issues

- `server/app.db` remains tracked and can be overwritten by `git reset --hard` during deployment.
- GitHub Actions still commits generated React static assets back to `production`, which can leave local `production` behind the remote.
- Local `production` remote tracking should be normalised to avoid `origin`/`upstream` confusion.
- Inventory update/auth issues remain open.
- Shopping-list schema/actions remain incomplete.
- Global React 404 remains missing.
- Admin recipe edit/delete behaviour still requires verification.
- Recipe taxonomy and filter semantics still need cleanup.

### Security

- Contact enquiries are now persisted personal data and require an explicit retention/deletion policy.
- The insecure fallback Flask secret key remains a production risk until removed or made fail-closed.
- Production SQLite deployment safety is now explicitly tracked as an operational/data-integrity risk.

## Release Template

## [Version] - YYYY-MM-DD

### Added

### Changed

### Fixed

### Removed

### Security
