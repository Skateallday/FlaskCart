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
- In production, the current frontend config uses same-origin API paths.

## Local Configuration Caveat

`app/src/config/config.js` currently behaves differently on localhost:

```text
React on localhost/127.0.0.1
        -> explicit https://skateallday.pythonanywhere.com API origin
        -> production Flask/SQLite
```

This bypasses the local Flask service despite `package.json` defining a localhost proxy and Docker Compose providing local `app` + `server` services. Fix this before any automated test mutates data.

## Repository Areas

```text
app/
  src/
    config/          API configuration and helper calls
    context/         filter, inventory and shopping-list state
    recipes/         recipe list, slug helper and dedicated detail page
    inventory/       pantry table/cards and stock controls
    shoppingList/    shopping-list table and actions
    routes/          React routes
    header/, footer/, home/, about/, contact/
  tests/             Playwright test directory (currently generated demo spec)
  playwright.config.js

server/
  app.py             Flask application and blueprint registration
  auth.py            login_required decorator
  config.py          Flask secret and session settings
  db.py              SQLite connection
  handlers.py        admin form handlers
  routes/            API, admin and frontend routes
  forms/             WTForms definitions
  templates/         Jinja admin templates
  static/            React production build
  app.db             SQLite database
```

## Public React Application

React Router currently defines:

- `/`
- `/about`
- `/inventory`
- `/recipes`
- `/recipes/:recipeSlug`
- `/shoppinglist`

There is still no wildcard React route, so a designed application-level 404 remains required.

## Recipe Data Flow

### Recipe list

1. `GetRecipes` requests `/api/recipes` once.
2. It checks `response.ok` before parsing JSON.
3. Search and `FilterContext` category state are applied client-side.
4. The UI exposes loading, error and empty states plus result count/active category.
5. Cards render in a responsive one/two/three-column grid.
6. Each card links to `/recipes/:recipeSlug`.

This removes the previous per-card mounting of ingredient/instruction detail fetchers and therefore removes that request storm from the recipe grid.

### Recipe detail

1. `RecipeDetail` reads `recipeSlug` from React Router.
2. It requests `/api/recipes`, `/api/ingredients` and `/api/instructions` once in parallel.
3. It finds the matching recipe by slug and filters related ingredients/instructions client-side.
4. It renders recipe-specific loading, error and not-found states.
5. It sets a recipe-specific document title.

Future optimisation can add a recipe-detail API so the browser does not need all three full datasets for one detail page.

### Homepage

The home page calls `GetRecipes` with `limit={3}` and `showControls={false}`, then links to the full `/recipes` library.

## Pantry

The pantry screen currently provides filtering/search, result counts, a desktop/tablet table and mobile cards. The existing stock-mutation/authentication issues remain: mutation controls call protected endpoints and callback quantity/state handling still needs Priority 1 repair.

## Contact

The contact blueprint is registered under `/api`. Valid enquiries are persisted to `ContactEnquiries`, and the server attempts an email notification while returning distinct persistence/delivery outcomes.

## Playwright

- `@playwright/test` 1.62.1 is installed in the frontend.
- `app/playwright.config.js` currently uses the generated Chromium, Firefox and WebKit projects plus the HTML reporter.
- `baseURL` and automatic React `webServer` startup are not yet enabled.
- `app/tests/example.spec.js` still targets `playwright.dev`.
- The generated suite has been verified through a Node 24 Docker container, but FlaskCart-specific E2E coverage is still pending.

## Architectural Direction

- Fix local/test API isolation before mutating E2E coverage.
- Keep API calls behind a central helper that checks `response.ok` and normalises errors.
- Fetch route-specific data only when the route needs it.
- Prefer one source of truth for each dataset.
- Add a recipe-detail API when performance work reaches that area.
- Use batch operations for adding a recipe to the shopping list.
- Keep public and admin permissions explicit.
- Add API pagination/filtering before dataset size becomes a problem.
- Route-split larger React pages after Priority 1 behaviour is stable.
