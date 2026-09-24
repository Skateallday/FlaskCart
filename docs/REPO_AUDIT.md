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

## Follow-up Verification — 2026-08-28

The original audit above describes the 2026-07-23 repository state. Later source verification shows these material changes:

- Contact is no longer unregistered: `contact_bp` is registered under `/api`.
- Contact now validates the JSON payload, persists to `ContactEnquiries`, attempts email delivery and distinguishes persistence/delivery outcomes.
- `GetRecipes` now consumes `FilterContext`, supports search, shows result count/active category, checks `response.ok`, and renders loading/error/empty states.
- Recipe cards now use a responsive one/two/three-column grid and link to dedicated slug routes.
- `/recipes/:recipeSlug` and `recipeDetails.js` now exist, with ingredients/instructions and recipe-specific loading/error/not-found states.
- The home page now renders three recipe previews and links to the full recipe library.
- The pantry view has a refreshed desktop table and mobile-card layout, but the older add/remove callback files still omit quantity in `onUpdate`, so the `NaN` risk is not resolved by the visual refresh.
- A 2026-08-28 commit records a major UI overhaul across contact, footer, header, home, pantry and recipe components.
- Local/uncommitted frontend files show Playwright 1.62.1 installed with generated configuration and generated example tests. The demo suite was run successfully through Docker (six executions), but no FlaskCart-specific E2E spec exists yet.
- Local frontend API configuration still points localhost/127.0.0.1 at the production PythonAnywhere API, which blocks safe mutating E2E tests.

Where this follow-up conflicts with an older finding above, use the follow-up as the current state and keep the older section as historical audit evidence.

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
