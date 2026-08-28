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
- React calls the PythonAnywhere origin through a hard-coded production `BASE_URL`.
- API routes are registered below `/api`.
- Admin routes are server-rendered and live outside the React router.

## Repository Areas

```text
app/
  src/
    config/          API configuration and helper calls
    context/         filter, inventory and shopping-list state
    recipes/         recipe list, ingredients and instructions
    inventory/       pantry table and stock controls
    shoppingList/    shopping-list table and actions
    routes/          React routes
    header/, footer/, home/, about/, contact/

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
  app.db              SQLite database
```

## Public React Application

React Router currently defines:

- `/`
- `/about`
- `/inventory`
- `/recipes`
- `/shoppinglist`

There is no wildcard React route, so an intentional 404 screen must be added.

The application currently wraps all routes in global filter, inventory and shopping-list providers. Inventory and shopping-list providers fetch immediately, even on pages that do not use their data.

## Flask API

The Flask application registers these API blueprints with `/api`:

- pantry
- shopping list
- recipes

The contact blueprint is imported but is not currently registered. The intended `/api/contact` route therefore needs application registration as part of the contact-form repair.

## Admin Interface

The admin area is server-rendered with Jinja and WTForms.

- `/adminlogin` handles sign-in and registration forms.
- `/admin-home` requires an authenticated Flask session.
- `/logout` clears the session.
- Admin handlers manage food and recipe records.

The React application does not currently expose a coherent admin mode or authentication state. Pantry mutation controls are visible publicly even though the Flask endpoints require an admin session.

## Data Flow

### Recipe list

1. React requests `/api/recipes`.
2. Flask selects all rows from `Recipes`.
3. Each recipe card mounts ingredient, instruction and add-to-shopping-list components.
4. Those child components currently fetch shared datasets independently.

Target state: fetch shared recipe data once at page level or lazily fetch and cache one recipe's details when opened.

### Pantry

1. The global inventory provider requests `/api/pantry` at application startup.
2. The inventory screen filters and searches the provider data.
3. Add/remove controls call authenticated POST endpoints.
4. The local update callback currently omits the quantity, which can produce `NaN`.

### Shopping list

1. The global shopping-list provider requests `/api/shoppinglist/` at application startup.
2. Recipe ingredients are added through direct API calls rather than through context.
3. The context schema uses `foodName` and `stock`, while the API returns `fooditem_name` and `quantity`.
4. The UI may remain stale until refresh.

## Architectural Direction

- Keep API calls behind a central helper that checks `response.ok` and normalises errors.
- Fetch route-specific data only when the route needs it.
- Prefer one source of truth for each dataset.
- Use batch operations for adding a recipe to the shopping list.
- Keep public and admin permissions explicit.
- Add API pagination and filtering before dataset size becomes a problem.
- Route-split larger React pages after Priority 1 behaviour is stable.
