# Repository Audit

## Audit Scope

Repository reviewed: `Skateallday/FlaskCart`

Default branch: `master`

Original review date: 2026-07-23

Follow-up verification dates: 2026-08-28 and 2026-09-24

This audit records verified implementation details used to update the project documentation. It is not a replacement for tests.

## Original Verified Architecture — 2026-07-23

- React public SPA under `app/`.
- Flask application under `server/`.
- React build served by Flask static routes.
- SQLite database at `server/app.db`.
- Flask/Jinja admin interface.
- Flask session authentication.
- PythonAnywhere deployment.

## Original Public React Routes — 2026-07-23

The original audit found:

- `/`
- `/about`
- `/inventory`
- `/recipes`
- `/shoppinglist`

No wildcard route was present.

## Original API Findings — 2026-07-23

Confirmed routes included:

- `GET /api/recipes`
- `GET /api/instructions`
- `GET /api/ingredients`
- `GET /api/pantry`
- pantry add/remove mutation routes
- shopping-list list/post/remove routes

At that time the contact blueprint was defined but not registered.

## Original Priority 1 Findings — 2026-07-23

### Contact

- React sent an empty object.
- Backend printed the payload.
- Backend returned success without sending/storing the enquiry.
- Contact blueprint was not registered.

### Recipe filtering

- Sidebar buttons updated `FilterContext`.
- Recipe grid did not consume the filter.

### Inventory

- Context update methods required a quantity.
- Add/remove buttons omitted that quantity in the callback.
- Removal blocked a result of exactly zero.
- Server removal could produce negative stock.
- Mutation routes required admin auth while controls were public.

### Shopping list

- Provider fetched globally.
- Context/API field names did not line up.
- Add more had no action.
- Purchased state was rendered raw.
- Recipe addition bypassed shopping-list context.

## Original Performance Findings — 2026-07-23

- Inventory and shopping-list providers fetched globally.
- Every recipe card mounted detail children that fetched shared datasets repeatedly.
- Recipe-list fetch handling was inconsistent.
- API list routes used unrestricted full-table selects.

## Original Build Findings — 2026-07-23

- React 19.1.1.
- React Router 6.30.4.
- react-scripts 5.0.1.
- Tailwind 3.4.17 plus Tailwind CLI 4.1.12.
- Flask 2.2.5.
- No Flask-RESTful dependency in `server/requirements.txt`.

## Follow-up Verification — 2026-08-28

Later source verification materially changed the project state:

- Contact is registered under `/api`.
- Contact validates real payload data, persists to `ContactEnquiries`, attempts email delivery and distinguishes persistence/delivery outcomes.
- `GetRecipes` consumes `FilterContext`, supports search, shows result count/active category, checks `response.ok`, and renders loading/error/empty states.
- Recipe cards use a responsive one/two/three-column grid and link to dedicated slug routes.
- `/recipes/:recipeSlug` exists with ingredients/instructions plus recipe-specific loading/error/not-found handling.
- The home page renders three recipe previews and links to the full recipe library.
- Pantry presentation has a refreshed desktop table and mobile-card layout.
- Inventory state/auth issues remain despite the visual refresh.
- Playwright 1.62.1 was installed with Chromium, Firefox and WebKit projects.
- The generated two-test Playwright demo suite ran successfully through Docker: six passing executions.
- The Playwright HTML report was successfully served/viewed.

## Follow-up Verification — 2026-09-24

### Local API configuration

Verified current `app/src/config/config.js`:

- localhost / `127.0.0.1` -> `http://localhost:5000`;
- production -> same-origin requests.

The earlier local-to-production API coupling is resolved.

### Current React routing

Current routing includes:

- `/`
- `/about`
- `/inventory`
- `/recipes`
- `/recipes/:recipeSlug`
- `/shoppinglist`
- `/login`
- `/logout`

A wildcard global 404 route is still absent.

### Current inventory/shopping-list issues remain

Source verification still shows:

- inventory add/remove callbacks omit the quantity when updating local context;
- remove uses the `<= 0` client check;
- shopping-list context uses pantry-style fields in part of its update logic;
- shopping-list Add more/purchased-state behaviour remains incomplete.

### Repository cleanup

Tracked `node_modules` was removed from version control. This resolved the earlier enormous merge noise caused by generated dependency files.

### Deployment incident and recovery

A production Action built and pushed the new React static bundle, but the PythonAnywhere checkout failed because `.git/index.lock` existed. The SSH script continued, so the Action appeared green and reloaded stale code.

Manual recovery on PythonAnywhere:

- confirmed there was no active Git process;
- removed the stale lock;
- fetched `origin/production`;
- reset the checkout to the current production revision;
- verified the new React bundle;
- reloaded the application;
- confirmed the correct site version live.

### Deployment hardening

Verified current workflow now includes:

- a concurrency group with `cancel-in-progress: false`;
- Node 24;
- `npm ci`;
- `set -e` in the PythonAnywhere SSH script;
- explicit refusal when `.git/index.lock` exists;
- deployed SHA versus `origin/production` verification;
- automatic PythonAnywhere reload.

The normal hardened deployment path was run successfully and the live site update was confirmed.

The deliberate stale-lock failure-path test remains pending.

### Deployment risks discovered

- The workflow still commits generated React static files back to `production`, which can leave local `production` behind the remote after each deploy.
- `server/app.db` is tracked while deployment uses `git reset --hard origin/production`, so live SQLite data can be replaced during deploy.
- Recent local output showed `production` tracking `upstream/production` while pushes use `origin`; local branch tracking should be normalised.

## Current Verified Build/Test Findings

- React 19.1.1.
- React Router 6.30.4.
- react-scripts 5.0.1.
- Playwright 1.62.1.
- Deployment build uses Node 24.
- Generated Playwright demo suite: six passing browser executions.
- FlaskCart-specific E2E specs are not yet present.
- Backend test runner is still not confirmed.

## Current Findings to Verify / Complete

- Inventory quantity/state and negative-stock behaviour.
- Public/admin pantry-control auth integration.
- Shopping-list schema/actions and batch add.
- Global React 404 route.
- Admin recipe edit/delete and related-record cleanup.
- Production SQLite persistence design.
- Removal/redesign of generated static commits on `production`.
- Full recipe taxonomy and filter semantics.
- Real FlaskCart Playwright coverage with isolated test data.
