# Repository Audit

## Audit Scope

Repository reviewed: `Skateallday/FlaskCart`

Default branch: `master`

Review date: 2026-07-23

This audit records verified implementation details used to update the project documentation. It is not a replacement for tests.

## Verified Architecture

- React public SPA under `app/`.
- Flask application under `server/`.
- React build served by Flask static routes.
- SQLite database at `server/app.db`.
- Flask/Jinja admin interface.
- Flask session authentication with a two-hour lifetime.
- PythonAnywhere production origin hard-coded in the frontend configuration.

## Verified Public React Routes

From `app/src/routes/routes.js`:

- `/`
- `/about`
- `/inventory`
- `/recipes`
- `/shoppinglist`

No wildcard route is present.

## Verified API Routes

From Flask blueprints:

- `GET /api/recipes`
- `GET /api/instructions`
- `GET /api/ingredients`
- `GET /api/pantry`
- `POST /api/pantry/<item>/add/<value>`
- `POST /api/pantry/<item>/remove/<value>`
- `GET /api/shoppinglist/`
- `POST /api/shoppinglist/post`
- `POST /api/shoppinglist/remove`

The contact route is defined as `POST /contact` inside a blueprint, but the blueprint is not registered in `server/app.py`.

## Verified Admin Routes

- `GET|POST /adminlogin`
- `GET|POST /admin-home`
- `GET /logout`

`/admin-home` and pantry mutation endpoints use `login_required`.

## Verified Priority 1 Findings

### Contact

- The React form sends an empty object.
- The backend prints the payload.
- The backend returns success without sending or storing the enquiry.
- The contact blueprint is not registered.

### Recipe filtering

- Sidebar buttons update `FilterContext`.
- The recipe grid does not consume the filter.

### Inventory

- Context update methods require a quantity.
- Add/remove buttons omit that quantity in `onUpdate`.
- Remove blocks a result of exactly zero.
- Server removal can produce negative stock.
- Mutation routes require admin auth while controls are public.

### Shopping list

- Provider fetches globally at application startup.
- Context uses pantry-style names (`foodName`, `stock`).
- API returns shopping-list names (`fooditem_name`, `quantity`).
- Add more has no action.
- Purchased state is rendered raw.
- Recipe addition bypasses context and sends sequential requests.

## Verified Performance Findings

- `InventoryProvider` and `ShoppingListProvider` wrap the whole app and fetch immediately.
- Every recipe card mounts ingredient, instruction and add-to-shopping-list children.
- Child components fetch shared full datasets independently.
- `GetRecipes` parses JSON without first checking `response.ok`.
- API list routes use unrestricted full-table selects.

## Verified Build Findings

- React 19.1.1.
- React Router 6.30.4.
- react-scripts 5.0.1.
- Tailwind 3.4.17 plus Tailwind CLI 4.1.12.
- Flask 2.2.5.
- No Flask-RESTful dependency in `server/requirements.txt`.

## Additional Findings to Verify

- Recipe edit handler column and form names appear inconsistent with recipe creation.
- A delete recipe button exists but no matching handler was found.
- Food record identifiers are referenced as both `ID` and `ROWID`.
- Backend requirements contain packages that may be unrelated to FlaskCart.

## Source Files Reviewed

- `README.md`
- `app/package.json`
- `app/src/App.js`
- `app/src/routes/routes.js`
- `app/src/contact/contact.js`
- `app/src/config/api.js`
- `app/src/config/config.js`
- `app/src/context/filterContext.js`
- `app/src/context/inventoryContext.jsx`
- `app/src/context/shoppingListContext.jsx`
- `app/src/recipes/getrecipes.js`
- `app/src/sidebar/recipeSidebar.js`
- `app/src/inventory/getinventory.js`
- `app/src/inventory/addinvent.js`
- `app/src/inventory/removeinvent.js`
- `app/src/shoppingList/getShoppingList.js`
- `app/src/shoppingList/addShoppingList.js`
- `server/app.py`
- `server/auth.py`
- `server/config.py`
- `server/db.py`
- `server/handlers.py`
- `server/requirements.txt`
- `server/routes/admin.py`
- `server/routes/contact.py`
- `server/routes/frontend.py`
- `server/routes/pantry.py`
- `server/routes/recipes.py`
- `server/routes/shopping_list.py`
- `server/templates/formTemplates/_editRecipe.html`
