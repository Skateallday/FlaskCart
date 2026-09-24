# Architecture

## System Overview

FlaskCart uses a hybrid architecture:

```text
Browser
  |
  +-- React SPA ------------------------------------------------+
  |    public pages, recipes, pantry and shopping list          |
  |                                                             v
  +-- Flask/Jinja admin pages --> Flask application --> SQLite database
                                   |
                                   +-- JSON API blueprints under /api
                                   +-- Session authentication
                                   +-- CSRF protection
                                   +-- Static React build serving
```

## Production Shape

Flask serves the React production build from `server/static`.

- `/` serves `index.html`.
- Unknown server paths fall back to `index.html` for client-side routing.
- API routes are registered below `/api`.
- Admin routes are server-rendered and live outside the React router.
- Production frontend API requests are same-origin.

## Local Development Shape

`app/src/config/config.js` currently uses:

```text
React on localhost/127.0.0.1
        -> http://localhost:5000
        -> local Flask / local SQLite

Production React
        -> same-origin /api
        -> production Flask / production SQLite
```

This replaces the earlier unsafe local configuration that pointed localhost at the production PythonAnywhere API.

Mutating automated tests still need a disposable/test database rather than relying on the ordinary development database.

## Repository Areas

```text
app/
  src/
    config/          API configuration and helper calls
    context/         filter, auth, inventory and shopping-list state
    recipes/         recipe list, slug helper and dedicated detail page
    inventory/       pantry table/cards and stock controls
    shoppingList/    shopping-list table and actions
    login/           React login/logout surfaces
    routes/          React routes
    header/, footer/, home/, about/, contact/
  tests/             Playwright test directory (currently generated demo spec)
  playwright.config.js

server/
  app.py             Flask application and blueprint registration
  auth.py            authentication helpers / protection
  config.py          Flask secret and session settings
  db.py              SQLite connection
  handlers.py        admin form handlers
  routes/            API, auth/admin and frontend routes
  forms/             WTForms definitions
  templates/         Jinja admin templates
  static/            React production build
  app.db             SQLite database
```

## Public React Application

React Router currently defines at least:

- `/`
- `/about`
- `/inventory`
- `/recipes`
- `/recipes/:recipeSlug`
- `/shoppinglist`
- `/login`
- `/logout`

There is still no wildcard React route, so a designed application-level 404 remains required.

## Recipe Data Flow

### Recipe list

1. `GetRecipes` requests `/api/recipes` once.
2. It checks `response.ok` before parsing JSON.
3. Search and `FilterContext` category state are applied client-side.
4. The UI exposes loading, error and empty states plus result count/active category.
5. Cards render in a responsive one/two/three-column grid.
6. Each card links to `/recipes/:recipeSlug`.

This removes the previous per-card ingredient/instruction request storm from the recipe grid.

### Recipe detail

1. `RecipeDetail` reads `recipeSlug` from React Router.
2. It requests `/api/recipes`, `/api/ingredients` and `/api/instructions` in parallel.
3. It finds the matching recipe by slug and filters related ingredients/instructions client-side.
4. It renders recipe-specific loading, error and not-found states.
5. It sets a recipe-specific document title.

Future optimisation can add a focused recipe-detail API so the browser does not need all three full datasets for one recipe.

### Homepage

The home page limits the recipe preview to three items and links to the full `/recipes` library.

## Pantry

The pantry screen provides filtering/search, result counts, a desktop/tablet table and mobile cards.

Remaining issues are behavioural rather than presentation-only:

- add/remove callbacks can still omit quantity and create invalid local state;
- the client currently blocks stock reaching exactly zero;
- authoritative negative-stock validation still needs repair;
- mutation endpoints require admin authentication while React controls need a coherent auth state.

## Shopping List

The shopping-list provider still fetches globally and has schema/state mismatches around `fooditem_name`, quantity and purchased state. Quantity addition, purchased-state mutation, batch recipe additions and immediate state reconciliation remain Priority 1/2 work.

## Contact

The contact blueprint is registered under `/api`.

Current flow:

1. React validates and submits name, email and message.
2. Flask validates the request again.
3. The enquiry is persisted to `ContactEnquiries`.
4. Email notification is attempted.
5. The API distinguishes persistence success from email-delivery failure so the UI can avoid duplicate submissions.

## Playwright

- `@playwright/test` 1.62.1 is installed in the frontend.
- `app/playwright.config.js` uses Chromium, Firefox and WebKit projects plus the HTML reporter.
- The generated two-test demo suite has been verified through a Node 24 Docker container: six passing executions.
- The HTML report has been served successfully on port `9323`.
- `baseURL` and controlled local server startup are not yet configured for FlaskCart.
- `app/tests/example.spec.js` still targets `playwright.dev`.
- FlaskCart-specific E2E coverage remains pending.

## Production Deployment Architecture

```text
master
  |
  | merge
  v
production
  |
  | push
  v
GitHub Actions
  |
  +-- Node 24 + npm ci
  +-- React production build
  +-- copy build -> server/static
  +-- current generated-static commit to production
  +-- SSH -> PythonAnywhere
  |      +-- fail if .git/index.lock exists
  |      +-- fetch/reset origin/production
  |      +-- verify deployed SHA
  |      +-- install Python requirements
  v
PythonAnywhere reload API
  |
  v
Live site
```

The workflow is automated and the normal release path does not require a PythonAnywhere login.

Two deployment design issues remain:

- GitHub Actions creates a generated static commit on `production`, which can leave local `production` behind the remote.
- `server/app.db` is tracked and can be replaced by the hard reset on PythonAnywhere.

## Architectural Direction

- Keep the current Flask + React + SQLite architecture.
- Protect production SQLite data independently of code deployment.
- Remove avoidable production-branch churn from generated build commits.
- Add real FlaskCart Playwright coverage using isolated test data.
- Keep API calls behind central helpers that check status and normalise errors.
- Fetch route-specific data only when the route needs it.
- Prefer one source of truth for each dataset.
- Add a recipe-detail API when performance work reaches that area.
- Use batch operations for adding a recipe to the shopping list.
- Keep public and admin permissions explicit.
- Add API pagination/filtering before dataset size becomes a problem.
