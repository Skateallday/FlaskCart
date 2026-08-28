# FlaskCart repository-reviewed documentation updater
# Run from the repository root.
# README.md is not changed.

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupRoot = Join-Path (Get-Location) ".docs-backup\$timestamp"
$docs = [ordered]@{}

$docs['PROJECT.md'] = @'
# FlaskCart Project Definition

## Purpose

FlaskCart is a learning and portfolio project that demonstrates a full-stack recipe, pantry and shopping-list application using Flask, React and SQLite.

The project is intended to show portfolio reviewers practical skills in backend development, frontend development, API design, state management, authentication, database work, accessibility and deployment.

## Live Application

- Repository: `Skateallday/FlaskCart`
- Live demo: `https://skateallday.pythonanywhere.com/`
- Default branch: `master`

## Product Summary

FlaskCart has two connected application surfaces:

1. A public React single-page application for browsing recipes, viewing pantry stock, maintaining a shopping list and submitting contact enquiries.
2. A server-rendered Flask admin area for authenticated management of food and recipe data.

The React build is served by Flask in production and communicates with JSON API routes under `/api`.

## Target Users

### Primary audience

- Portfolio reviewers
- Potential employers
- Developers reviewing the implementation

### Application roles

- Public visitor: can browse recipes, pantry data and the shopping list.
- Admin user: can sign in through the Flask admin interface and manage application data.

The application is not intended for commercial grocery operations or real customer transactions.

## Current Capabilities

- Recipe listing with images, descriptions, servings, calories and cooking times.
- Recipe ingredients and instructions.
- Recipe category filter controls, although the recipe grid is not currently connected to them.
- Pantry inventory listing, filtering and search.
- Shopping-list storage and removal.
- Adding recipe ingredients to the shopping list.
- Flask session-based admin authentication.
- Admin forms for food and recipe management.
- Public deployment on PythonAnywhere.

## Goals

- Demonstrate a coherent full-stack architecture.
- Make every visible control perform the action it promises.
- Keep public and admin capabilities clearly separated.
- Provide reliable loading, error, success and empty states.
- Reduce unnecessary API requests and frontend work.
- Produce a responsive and accessible interface.
- Document API contracts, database structure and architectural decisions.
- Keep the code understandable for a portfolio review.

## Non-Goals

The current project does not aim to:

- Process real payments.
- Handle shipping, tax, refunds or fulfilment.
- Store payment card data.
- Support enterprise traffic or high availability.
- Provide multi-tenant account management.
- Become a production grocery service without a separate scope decision.

## Success Criteria

The project is successful when a reviewer can:

1. Use the live demo without encountering misleading or dead controls.
2. Browse and filter recipes.
3. inspect recipe ingredients and instructions without duplicate request storms.
4. Add recipe ingredients to the shopping list and see the UI update immediately.
5. Manage pantry and shopping-list data with clear permissions and feedback.
6. Submit a contact enquiry and receive an honest success or error result.
7. Use the application on mobile and desktop.
8. Navigate the application using a keyboard and assistive technology landmarks.
9. Understand the public React app, Flask API, admin interface and SQLite data model from the documentation.
10. Run relevant tests and a production frontend build successfully.

## Constraints

- Backend: Flask 2.2.5 and SQLite.
- Frontend: React 19, React Router 6 and JavaScript.
- Build system: Create React App 5 until a deliberate migration is approved.
- Styling: Tailwind utilities and existing CSS; the Tailwind version conflict must be resolved.
- Deployment: PythonAnywhere.
- Package management: `pip` and `npm`.
- The project should remain approachable as a learning project.
'@

$docs['AGENTS.md'] = @'
# AI Agent Instructions

## Project Context

FlaskCart is a deployed learning and portfolio application with:

- A React public single-page application.
- A Flask JSON API.
- A Flask/Jinja admin interface.
- SQLite persistence.
- Session-based admin authentication.

The current work is governed by the ordered backlog in `TASKS.md`.

## Required Reading Order

Before changing code, read:

1. `PROJECT.md`
2. `REPO_AUDIT.md`
3. `TASKS.md`
4. `REQUIREMENTS.md`
5. `ARCHITECTURE.md`
6. `API.md`
7. `DATABASE.md`
8. `GUARDRAILS.md`
9. `DEFINITION_OF_DONE.md`
10. `DECISIONS.md`

## Priority Rule

Work in this order unless the owner explicitly changes it:

1. Broken or misleading functionality.
2. Performance improvements.
3. Responsive design and visual hierarchy.
4. Accessibility, semantics and SEO.

Do not jump to a framework migration, redesign or optimisation while Priority 1 behaviour remains broken.

## Working Rules

- Inspect the existing implementation before editing.
- Prefer small, reviewable changes.
- Do not refactor unrelated code during a bug fix.
- Preserve the public React app plus Flask/Jinja admin architecture unless a decision replaces it.
- Treat API response shapes as contracts.
- Centralise repeated API handling rather than adding more one-off fetch logic.
- Keep frontend state aligned with successful backend responses.
- Validate state-changing operations on the server even when the client also validates.
- Do not expose admin controls to unauthenticated users.
- Do not return a success response for work that was not completed.
- Update documentation and tests with behaviour changes.
- Never claim a test passed unless it was run.
- Never commit secrets, production credentials or real contact enquiries.

## Current High-Risk Areas

- Contact blueprint registration, payload handling and delivery/persistence.
- Admin/public authentication mismatch on pantry controls.
- Inventory optimistic updates receiving an undefined quantity.
- Shopping-list field-name inconsistencies.
- Recipe detail components fetching entire shared datasets per card.
- Hard-coded production API base URL.
- Insecure fallback Flask secret key.

## Approval Required

Obtain explicit approval before:

- Replacing Flask, React or SQLite.
- Migrating from Create React App to Vite.
- Adding a query or state-management library.
- Adding email, analytics or other paid external services.
- Changing authentication architecture.
- Removing or renaming public API routes.
- Performing destructive schema changes.
- Deleting recipe or food data without verified relational cleanup.
- Reorganising the whole repository.

## Required Verification

For each change, run the smallest relevant set of checks and record the result:

- Backend tests or targeted API tests.
- Frontend tests.
- `npm run build` for frontend changes that can affect compilation.
- Manual smoke test of the changed workflow.
- Mobile and keyboard checks for visible UI changes.

Follow `DEFINITION_OF_DONE.md` before closing a task.
'@

$docs['ARCHITECTURE.md'] = @'
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
'@

$docs['TECH_STACK.md'] = @'
# Technical Stack

## Backend

Confirmed from `server/requirements.txt`:

- Python
- Flask 2.2.5
- Flask-Bcrypt 1.0.1
- Flask-Mail 0.9.1
- Flask-WTF 1.2.1
- WTForms 3.1.2
- flask-cors 4.0.0
- python-dotenv 1.0.1
- SQLite through Python's standard `sqlite3` module

The repository uses ordinary Flask blueprints and JSON routes. Although the README describes a Flask-RESTful API, `Flask-RESTful` is not present in the backend requirements and the routes do not use Flask-RESTful resources.

## Frontend

Confirmed from `app/package.json`:

- React 19.1.1
- React DOM 19.1.1
- React Router DOM 6.30.4
- React Toastify 11.0.5
- Create React App / react-scripts 5.0.1
- JavaScript
- Tailwind CSS utilities
- Testing Library packages

## Build-Stack Conflict

The frontend currently includes:

- `@tailwindcss/cli` 4.x
- `tailwindcss` 3.4.x
- Create React App 5

Standardise the Tailwind toolchain before doing broader build work. A Vite migration is optional and must not displace higher-priority functional fixes.

## Deployment

- PythonAnywhere hosts the live application.
- Flask serves the React production build.
- The frontend production API origin is hard-coded in `app/src/config/config.js`.

## Current Technical Debt

- Global providers fetch route-specific data eagerly.
- Fetch handling is inconsistent and often parses JSON before checking status.
- Backend requirements include packages that appear unrelated to FlaskCart, including Discord and async networking packages; verify whether they are needed before removing them.
- The Flask secret key has an insecure fallback value.
- There is no confirmed backend test runner in the requirements.

## Approved Direction

Continue using the existing stack while fixing Priority 1 and Priority 2 work.

Approval is required for:

- Vite migration.
- TypeScript migration.
- Database replacement.
- Query/state library adoption.
- Authentication replacement.
- Paid external services.
'@

$docs['REQUIREMENTS.md'] = @'
# Requirements

## User Roles

### Public visitor

A public visitor can:

- View the home and about pages.
- Browse recipes.
- Filter recipes by category.
- View ingredients and instructions.
- View pantry data.
- View and maintain the shopping list where public mutation is intentionally allowed.
- Submit a contact enquiry.

### Admin user

An authenticated admin can:

- Sign in through the Flask admin interface.
- Add and edit food records.
- Add and edit recipe records.
- Perform protected pantry stock changes.
- Sign out.

Recipe deletion must be verified and implemented safely before it is documented as complete.

## Functional Requirements

### Contact form

- Send the entered name, email and message.
- Validate required fields and email format on client and server.
- Disable submission while sending.
- Show a useful success confirmation.
- Show validation and server errors.
- Retain entered values after a failed request.
- Deliver the enquiry by email, save it, or both according to a documented decision.
- Never report success if delivery or persistence failed.

### Recipes

- Display recipe image, name, summary, category, servings, calories and cooking time.
- Filter the visible recipe grid by selected category.
- Show the active filter and result count.
- Use one normalised category taxonomy.
- Display ingredients and instructions accessibly.
- Avoid downloading the same shared datasets for every recipe card.
- Add all recipe ingredients to the shopping list in one user action.
- Update shopping-list state immediately after success.
- Provide loading, error and empty states.

### Pantry inventory

- Display pantry items, categories and stock quantities.
- Support category filtering and name search.
- Show mutation controls only to users authorised to use them, or provide a clear admin mode.
- Pass both item name and quantity to local state updates.
- Allow stock to reach exactly zero.
- Reject stock changes that would produce a negative value on the server.
- Show consistent success and error messages.

### Shopping list

- Display item name, quantity, unit and purchased state.
- Filter items when category controls are shown.
- Add a user-entered quantity through a visible action.
- Use one consistent schema across API, context and components.
- Mark an item purchased or unpurchased.
- Visually distinguish purchased items.
- Remove an item.
- Update the page immediately after each successful change.
- Batch-add recipe ingredients in one request and one transaction.

### Routing

- Unknown React routes must show a designed 404 page.
- Internal navigation must use React Router links.
- Larger routes should be code-split after core behaviour is stable.

### Admin

- Admin routes must require an authenticated session.
- Invalid credentials must fail safely.
- Recipe and food changes must validate submitted data.
- Recipe deletion must remove or preserve related data according to explicit database rules.
- Public UI must not expose controls that only admins can use without explaining the required sign-in.

## Non-Functional Requirements

### Reliability

- Check HTTP status before parsing response bodies.
- Use consistent API error objects.
- Keep UI state aligned with confirmed backend changes.
- Do not rely on page refresh to show successful mutations.

### Performance

- Avoid duplicate recipe, ingredient and instruction downloads.
- Do not fetch pantry or shopping-list data on unrelated routes.
- Lazy-load below-the-fold images and larger route bundles.
- Add cache headers or ETags for mostly static recipe data.
- Add API filtering and pagination as content grows.

### Responsive design

- Recipe cards must use a responsive grid.
- Sidebars must collapse into a mobile-friendly pattern.
- Tables must become cards or intentionally scroll on small screens.
- Action buttons must retain visible or accessible labels on mobile.

### Accessibility

Aim for WCAG 2.2 AA principles:

- Add a `main` landmark.
- Use correct accordion semantics.
- Use normal filter buttons with `aria-pressed` where appropriate.
- Label the pantry search.
- Improve mobile navigation semantics and focus handling.
- Use proper list markup in the footer.
- Provide visible `:focus-visible` styles.

### SEO

- Add route-specific titles and descriptions.
- Add canonical and Open Graph metadata.
- Add Recipe structured data when dedicated recipe URLs exist.

## Out of Scope

- Real payments.
- Shipping and tax.
- Commercial inventory operations.
- Storage of payment card data.
- Enterprise-scale infrastructure.
'@

$docs['ROADMAP.md'] = @'
# Roadmap

## Phase 1: Fix Broken or Misleading Functionality

Goal: every visible control works, permissions are clear and UI state matches the server.

- Repair contact form registration, payload, validation, delivery/persistence and states.
- Connect recipe filters to the recipe grid.
- Repair or remove nonfunctional shopping-list filters.
- Fix inventory `NaN` updates.
- Allow stock to reach zero while preventing negative stock.
- Resolve public/admin mismatch for pantry controls.
- Make shopping-list quantity addition functional.
- Replace raw purchased values with an interactive control.
- Update shopping-list state immediately after adding a recipe.
- Add a React 404 route.
- Verify admin recipe edit and delete behaviour.

Exit criteria:

- Priority 1 workflows have regression coverage.
- No visible control silently does nothing.
- No successful request leaves the current screen stale.
- Unauthorised actions are not presented as ordinary public actions.

## Phase 2: Performance and Data Flow

Goal: reduce duplicate requests, unnecessary startup work and inconsistent API handling.

- Fetch recipe datasets once or lazily per opened recipe.
- Limit the home page to featured recipes.
- Mount pantry and shopping-list data providers only where needed.
- Add a batch shopping-list endpoint and one summary toast.
- Add loading, error and empty states.
- Centralise API status/error handling.
- Optimise recipe images.
- Add client and server caching.
- Add API filtering and pagination.
- Route-split larger React pages.
- Standardise Tailwind and review a later Vite migration.
- Remove unused Create React App boilerplate CSS.

Exit criteria:

- Opening the recipe page does not generate per-card duplicate dataset requests.
- Unrelated routes do not fetch pantry or shopping-list data.
- API failures produce consistent user-facing errors.

## Phase 3: Responsive Design and Visual Hierarchy

Goal: make the portfolio experience polished across mobile, tablet and desktop.

- Use responsive recipe-card grids.
- Replace fixed small-screen sidebars.
- Redesign or intentionally scroll data tables on mobile.
- Fix blank mobile action buttons.
- Repair hero overlay positioning.
- Add homepage calls to action.
- Improve hero copy width and spacing.
- Standardise recipe image aspect ratios.
- Consider dedicated recipe pages or a modal.
- Add active filter states and result counts.
- Normalise recipe categories and remove duplicate colour definitions.
- Centralise typography and layout tokens.
- Consolidate font loading.
- Improve the responsive footer.
- Correct contact-section wording and layout.

## Phase 4: Accessibility, Semantics and SEO

Goal: make the application understandable to browsers, assistive technology and search engines.

- Add a `main` landmark.
- Correct accordion semantics and relationships.
- Remove inappropriate tab roles from filters.
- Label pantry search and add clear search.
- Improve mobile navigation accessibility and behaviour.
- Use React links for internal navigation.
- Correct footer list semantics.
- Add route-specific metadata.
- Add Recipe JSON-LD for dedicated recipe URLs.
- Add canonical and social-sharing metadata.
- Add visible keyboard focus styles.

## Deferred Ideas

- Vite migration.
- TypeScript migration.
- Dedicated public user accounts.
- Real payments.
- Database replacement.
'@

$docs['TASKS.md'] = @'
# Tasks

## Current Focus

Work through Priority 1 in the order below. Keep each checkbox as a separate reviewable change where practical.

## Priority 1: Fix Broken or Misleading Functionality

### Contact form

- [ ] Register `contact_bp` in the Flask application under `/api`.
- [ ] Send the actual name, email and message instead of `{}`.
- [ ] Decide whether contact enquiries are emailed, persisted, or both.
- [ ] Add server-side validation and safe error responses.
- [ ] Disable the submit button while sending.
- [ ] Show visible success confirmation.
- [ ] Show field and request errors.
- [ ] Retain field values after failed submission.
- [ ] Replace the incorrect "form on the left" copy or change the layout.
- [ ] Add frontend and backend regression tests.

### Recipe filters

- [ ] Read `FilterContext` inside the recipe grid.
- [ ] Filter recipes by the selected category.
- [ ] Add a Show All state.
- [ ] Show the active category and result count.
- [ ] Normalise `Snack` versus `Snacks`, `Others`, `Easy`, `Soup` and other category values.
- [ ] Replace filter `role="tab"` with appropriate button semantics.

### Shopping-list sidebar

- [ ] Decide whether the shopping list should be filterable by pantry category.
- [ ] If yes, connect filter state to shopping-list rows.
- [ ] If no, remove the misleading sidebar from the page.

### Inventory updates

- [ ] Pass both `foodName` and quantity to `addStock`.
- [ ] Pass both `foodName` and quantity to `removeStock`.
- [ ] Prevent `NaN` from entering local inventory state.
- [ ] Change the client removal check from `<= 0` to `< 0`.
- [ ] Validate current stock and requested reduction on the server.
- [ ] Return an error when an update would produce negative stock.
- [ ] Return an error when the pantry item does not exist.

### Inventory authentication

- [ ] Define how React knows whether an admin session exists.
- [ ] Hide protected add/remove controls from guests or provide a clear admin sign-in mode.
- [ ] Handle `401 Unauthorized` consistently.
- [ ] Ensure protected controls are not blank on mobile.

### Shopping-list controls

- [ ] Standardise on API field names: `fooditem_id`, `fooditem_name`, `quantity`, `unit`, `is_purchased`.
- [ ] Make the Add more input controlled by the correct item key.
- [ ] Add a visible Add button and request handler.
- [ ] Update shopping-list context after a successful quantity change.
- [ ] Replace the raw purchased value with a checkbox or button.
- [ ] Add a backend route to update purchased state.
- [ ] Visually distinguish purchased items.
- [ ] Update the UI immediately after removing an item.

### Add recipe to shopping list

- [ ] Route additions through the shopping-list state layer.
- [ ] Update the current page immediately after success.
- [ ] Reconcile context fields with the API response schema.
- [ ] Avoid one success toast per ingredient.

### Routing

- [ ] Add a wildcard React route.
- [ ] Build a useful 404 page with a route back to recipes or home.

### Admin verification

- [ ] Verify recipe editing against the current form field names and SQL columns.
- [ ] Verify recipe deletion; the current delete button has no matching handler in the reviewed source.
- [ ] Define related-record behaviour for recipe instructions, ingredients and tags.

## Priority 2: Largest Performance Improvements

- [ ] Stop each recipe card fetching the same ingredient dataset.
- [ ] Stop each recipe card fetching the same instruction dataset.
- [ ] Stop the add-to-shopping-list component fetching all ingredients per card.
- [ ] Fetch recipe, ingredient and instruction data once and group by `recipe_id`, or lazy-fetch and cache details on first open.
- [ ] Prevent collapsed recipe details from mounting expensive children before they are opened.
- [ ] Limit the homepage to three featured or recently added recipes.
- [ ] Link the homepage preview to the full recipe library.
- [ ] Move inventory data fetching to inventory routes.
- [ ] Move shopping-list data fetching to shopping-list and recipe workflows that need it.
- [ ] Create a batch shopping-list endpoint.
- [ ] Add recipe ingredients in one database transaction.
- [ ] Replace ingredient-level toast spam with one useful summary message.
- [ ] Add loading, error and empty states to recipes.
- [ ] Add loading, error and empty states to pantry.
- [ ] Add loading, error and empty states to shopping list.
- [ ] Add retry actions where useful.
- [ ] Centralise fetch handling and check `response.ok` before parsing.
- [ ] Normalise unauthorised, validation and server errors.
- [ ] Add image lazy loading, dimensions, responsive sources and fixed aspect ratio.
- [ ] Generate or serve WebP/AVIF recipe images where practical.
- [ ] Add server cache headers or ETags for recipe data.
- [ ] Cache stable recipe data client-side.
- [ ] Add API category, search, limit and page parameters.
- [ ] Replace unrestricted list queries as content grows.
- [ ] Route-split home, recipes, inventory and shopping-list pages.
- [ ] Standardise the Tailwind version.
- [ ] Consider Vite only after functional and performance work is stable.
- [ ] Remove unused Create React App boilerplate CSS.
- [ ] Review unrelated backend dependencies before removing them.

## Priority 3: Responsive Design and Visual Hierarchy

- [ ] Replace fixed `w-[30%]` recipe cards with a responsive grid.
- [ ] Use one column on mobile, two on tablet and three on desktop.
- [ ] Replace fixed one-sixth sidebars on small screens.
- [ ] Use filter chips, a disclosure or a drawer on mobile.
- [ ] Redesign pantry tables for mobile or add intentional horizontal scrolling.
- [ ] Redesign shopping-list tables for mobile or add intentional horizontal scrolling.
- [ ] Keep concise action labels visible on mobile or add labelled icons.
- [ ] Add accessible names to all icon-only controls.
- [ ] Add `position: relative` to the hero container.
- [ ] Constrain and vertically centre the hero overlay.
- [ ] Add Browse recipes and View pantry calls to action.
- [ ] Replace fixed hero copy width with a responsive max width and padding.
- [ ] Give recipe images a consistent aspect ratio with `object-fit: cover`.
- [ ] Align recipe actions consistently at the card bottom.
- [ ] Evaluate dedicated recipe routes or an accessible modal.
- [ ] Show active filters and result counts.
- [ ] Normalise recipe taxonomy.
- [ ] Remove the duplicate `Easy` colour definition.
- [ ] Centralise typography, colours, spacing, radius and focus styles.
- [ ] Consolidate Google Font requests.
- [ ] Make the footer stack responsively.
- [ ] Replace `width: 100vw` with `width: 100%` where it causes overflow.
- [ ] Correct contact-section copy and layout.

## Priority 4: Accessibility, Semantics and SEO

- [ ] Add a `main` landmark around routed content.
- [ ] Replace recipe accordion tab roles with a normal button.
- [ ] Add `aria-expanded` and a matching `aria-controls` relationship.
- [ ] Give each controlled recipe region a valid accessible relationship.
- [ ] Remove `role="tab"` from filter buttons.
- [ ] Use `aria-pressed` for the selected filter where appropriate.
- [ ] Add a visible label or `aria-label` to pantry search.
- [ ] Add a clear-search control.
- [ ] Add `aria-expanded`, `aria-controls` and a descriptive name to the mobile menu button.
- [ ] Close the mobile menu after navigation.
- [ ] Prevent background scroll while the mobile menu is open.
- [ ] Replace internal anchors with `Link` or `NavLink`.
- [ ] Wrap footer navigation links in list items.
- [ ] Add route-specific page titles and descriptions.
- [ ] Add Recipe JSON-LD for dedicated recipe pages.
- [ ] Add canonical URLs and Open Graph metadata.
- [ ] Add a share image.
- [ ] Add consistent visible `:focus-visible` styles.

## Completed

- [x] Confirmed the project is a learning and portfolio application.
- [x] Confirmed the live PythonAnywhere deployment.
- [x] Confirmed the React public application and Flask/Jinja admin split.
- [x] Confirmed session-based admin authentication exists.
- [x] Confirmed recipe, pantry and shopping-list API routes.
- [x] Reviewed the supplied task list against the repository.

## Task Maintenance Rules

- Keep this order unless a blocking dependency requires a small supporting task.
- Record new findings without silently displacing the owner's priorities.
- Move completed work to `CHANGELOG.md` and keep this file current.
'@

$docs['NEXT_STEPS.md'] = @'
# Next Steps

## Immediate Implementation Sequence

The next work should remain inside Priority 1.

### 1. Establish a regression baseline

- Create a branch for Priority 1 fixes.
- Record current API responses for contact, recipes, pantry and shopping list.
- Add or select a backend test runner.
- Confirm frontend tests and `npm run build` run successfully.
- Capture the current browser console and network behaviour for each broken workflow.

### 2. Repair the contact form end to end

- Register the contact blueprint under `/api`.
- Choose email delivery, database persistence, or both.
- Send actual field values.
- Validate on client and server.
- Add sending, success and failure states.
- Keep user-entered data after failure.
- Test the live deployment configuration without exposing credentials.

### 3. Connect filtering

- Connect recipe filter state to `GetRecipes`.
- Normalise recipe category values.
- Add active state, Show All and result count.
- Either connect the shopping-list filter or remove its sidebar.

### 4. Repair inventory state and permissions

- Pass the quantity into local update callbacks.
- Allow stock to reach zero.
- Reject negative stock on the server.
- Hide protected controls from guests or expose a clear admin session state.
- Add consistent handling for `401` responses.

### 5. Complete shopping-list interactions

- Standardise schema names.
- Add the Add more action.
- Add purchased-state mutation.
- Update context after add, remove and purchase actions.
- Make recipe additions update the current screen.

### 6. Add the React 404 page

- Add a wildcard route.
- Provide useful navigation back into the app.

### 7. Verify the admin recipe workflow

- Test add, edit and delete from the live-like local environment.
- Repair field and endpoint mismatches.
- Add safe relational cleanup for deletion.

## Decision Needed Before Contact Implementation

Choose one contact outcome:

1. Send an email only.
2. Save enquiries to SQLite only.
3. Save to SQLite and send an email.

For a portfolio app, option 3 demonstrates the most, but it also introduces personal-data retention and operational email configuration. Document the choice in `DECISIONS.md` before implementation.
'@

$docs['GUARDRAILS.md'] = @'
# Project Guardrails

## Priority Guardrail

Do not begin broad redesigns or build-tool migrations while Priority 1 controls are broken or misleading.

## Behaviour Rules

- A visible control must work or be removed/disabled with an explanation.
- Never return success for a contact message that was not sent or saved.
- Never require a page refresh to reflect a confirmed successful mutation.
- Never display protected stock controls as ordinary public actions.
- Never allow pantry stock to become negative.
- Never trust client-provided prices, totals, permissions or stock values.

## API Rules

- Check and document HTTP status codes.
- Validate request bodies and route parameters.
- Use consistent JSON error responses.
- Do not silently change response property names.
- Centralise client error handling.
- Add tests when endpoint behaviour changes.

## Authentication Rules

- Admin mutations require a verified authenticated session.
- Public UI must know whether protected actions are available.
- Do not expose production credentials.
- Do not weaken authentication to make the UI appear functional.
- Require a real `SECRET_KEY` in production; do not rely on the fallback value.

## Contact Data Rules

- Treat names, email addresses and messages as personal data.
- Store only what is required.
- Do not commit real enquiries.
- Do not log full contact payloads in production.
- Document retention and deletion if enquiries are stored.
- Keep email credentials in environment variables.

## Database Rules

- Back up `app.db` before destructive local changes.
- Use transactions for multi-row recipe and shopping-list operations.
- Validate stock and quantities on the server.
- Define cascade or cleanup behaviour before deleting recipes.
- Use parameterised SQL.
- Do not rely on inconsistent `ROWID` and `ID` assumptions without confirming the schema.

## Frontend Rules

- Keep one source of truth for pantry and shopping-list data.
- Use consistent API field names.
- Do not mount expensive detail components solely to hide them with CSS.
- Keep mobile controls visible and accessible.
- Use React Router for internal navigation.

## Dependency Rules

- Do not add a library when a small existing-stack solution is clear.
- Document the reason for each new dependency.
- Standardise Tailwind before adding more styling tooling.
- Treat Vite migration as a separate approved project.

## Git Rules

- Keep commits focused.
- Separate formatting-only changes from behaviour changes.
- Do not commit `.env`, credentials, virtual environments, `node_modules` or real contact data.
- Do not rewrite unrelated code in a bug-fix pull request.

## Approval Required

- Authentication redesign.
- Contact data retention policy.
- External email service or paid service.
- Destructive database migration.
- Recipe deletion implementation that changes relational behaviour.
- Framework, database or build-system replacement.
'@

$docs['DECISIONS.md'] = @'
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
'@

$docs['DEFINITION_OF_DONE.md'] = @'
# Definition of Done

A task is complete only when all applicable items are satisfied.

## Behaviour

- [ ] The visible control performs the promised action.
- [ ] Acceptance criteria in `TASKS.md` are met.
- [ ] Success, loading, empty and failure states are handled.
- [ ] Successful backend changes appear in the UI without refresh.
- [ ] Unauthorised behaviour is hidden or clearly explained.
- [ ] Existing related behaviour still works.

## Validation and Security

- [ ] Client input is validated where useful.
- [ ] Server input is validated authoritatively.
- [ ] Negative stock and invalid quantities are rejected.
- [ ] Protected routes require an authenticated session.
- [ ] No secrets or personal data are committed or logged.
- [ ] Contact success is returned only after the chosen delivery/persistence action succeeds.

## Code Quality

- [ ] The change is focused.
- [ ] Naming matches the API schema.
- [ ] No unrelated refactor is included.
- [ ] Temporary logs and debugging code are removed.
- [ ] Repeated fetch/error logic is not duplicated unnecessarily.

## Testing

- [ ] A regression test covers the repaired bug where practical.
- [ ] Relevant backend tests pass.
- [ ] Relevant frontend tests pass.
- [ ] `npm run build` passes for frontend changes.
- [ ] The changed workflow is manually smoke-tested.
- [ ] Authentication success and failure paths are checked when relevant.

## Responsive and Accessible UI

- [ ] The change works at mobile and desktop widths.
- [ ] Buttons retain visible or accessible names.
- [ ] Keyboard operation is checked.
- [ ] Focus is visible.
- [ ] Correct semantic elements and ARIA relationships are used.

## Documentation

- [ ] `API.md` is updated for API changes.
- [ ] `DATABASE.md` is updated for schema changes.
- [ ] `SECURITY.md` is updated for auth or personal-data changes.
- [ ] `CHANGELOG.md` records notable user-visible changes.
- [ ] `TASKS.md` is updated.
- [ ] Significant choices are recorded in `DECISIONS.md`.

## Review Readiness

- [ ] The commit or pull request explains what changed and why.
- [ ] Screenshots are included for visible changes.
- [ ] Test commands and results are recorded honestly.
- [ ] Known limitations are documented.
'@

$docs['TESTING.md'] = @'
# Testing Strategy

## Current State

The frontend includes Testing Library dependencies and Create React App test scripts. The reviewed backend requirements do not include a dedicated test runner such as `pytest`.

Before substantial bug-fix work, select and document the backend test runner. `pytest` is the recommended option, but adding it requires an intentional dependency change.

## Priority 1 Regression Matrix

### Contact

- Valid values are sent to the backend.
- Missing name, invalid email and missing message are rejected.
- The button is disabled while sending.
- A successful delivery/persistence result shows confirmation.
- A failed request preserves entered values.
- The server does not return success when processing fails.

### Recipe filters

- Selecting a category changes the recipe grid.
- Show All restores all recipes.
- Active state and result count are correct.
- Category aliases are normalised.

### Inventory

- Add and remove updates use the requested quantity.
- Local stock never becomes `NaN`.
- Stock may reach exactly zero.
- A request that would produce negative stock fails.
- Guests cannot use protected controls.
- Admin sessions can use protected controls.

### Shopping list

- Add more sends the entered quantity.
- Purchased state can be toggled.
- Remove updates the page immediately.
- Adding a recipe updates the current shopping list state.
- Batch add returns one result and rolls back on failure.

### Routing

- A known route renders its page.
- An unknown route renders the designed 404 page.

### Admin

- Valid admin login succeeds.
- Invalid login fails safely.
- Add recipe persists recipe, steps, ingredients and tags.
- Edit recipe updates the intended fields.
- Delete recipe safely handles related records.

## Frontend Commands

```bash
cd app
npm install
npm test
npm run build
```

For a one-off non-watch test run in CI:

```bash
CI=true npm test -- --watchAll=false
```

## Backend Commands

Current run commands:

```bash
cd server
python -m venv venv
# activate the environment
pip install -r requirements.txt
python app.py
```

Preferred Flask CLI alternative:

```bash
flask --app app run --debug
```

Add the selected backend test command here after the test runner is configured.

## Manual Smoke Test

1. Open the home page and verify no unrelated data errors appear.
2. Browse and filter recipes.
3. Open recipe details and inspect network request counts.
4. Add a recipe to the shopping list.
5. Change shopping-list quantity and purchased state.
6. Sign in as admin.
7. Add and remove pantry stock, including reducing an item to zero.
8. Add, edit and delete a recipe.
9. Submit the contact form successfully.
10. Simulate a contact failure and verify field retention.
11. Visit an unknown route.
12. Repeat key flows at a mobile viewport and with keyboard navigation.

## CI Direction

Once local commands are stable, add GitHub Actions for:

- Backend dependency installation and tests.
- Frontend dependency installation.
- Frontend tests.
- Frontend production build.
'@

$docs['API.md'] = @'
# API Documentation

## Conventions

- API routes use JSON unless noted otherwise.
- State-changing requests are protected by Flask-WTF CSRF handling.
- Authenticated pantry mutations use the Flask session cookie.
- Client code must check HTTP status before parsing a response.
- Error responses should move towards a consistent shape:

```json
{
  "error": {
    "code": "invalid_request",
    "message": "A useful explanation."
  }
}
```

## Confirmed Recipe Endpoints

### List recipes

```http
GET /api/recipes
```

Current implementation returns every row from `Recipes` as an array.

### List instructions

```http
GET /api/instructions
```

Current implementation returns every row from `RecipeInstructions` as an array.

### List ingredients

```http
GET /api/ingredients
```

Current response fields include:

```json
{
  "rowid": 1,
  "recipe_id": 1,
  "fooditem_id": 2,
  "fooditem_name": "Example",
  "quantity": 2,
  "unit": "cups"
}
```

## Confirmed Pantry Endpoints

### List pantry items

```http
GET /api/pantry
```

Public in the current implementation.

### Add stock

```http
POST /api/pantry/{foodName}/add/{quantity}
```

Requires an authenticated admin session.

### Remove stock

```http
POST /api/pantry/{foodName}/remove/{quantity}
```

Requires an authenticated admin session.

Required repair:

- Validate the item exists.
- Validate the quantity.
- Prevent negative resulting stock.
- Return the updated item or stock value.
- Correct the remove success message.

## Confirmed Shopping-List Endpoints

### List items

```http
GET /api/shoppinglist/
```

Current response fields:

```json
{
  "rowid": 1,
  "fooditem_id": 2,
  "fooditem_name": "Example",
  "quantity": 2,
  "unit": "cups",
  "is_purchased": 0
}
```

### Add or increment one item

```http
POST /api/shoppinglist/post
```

Request:

```json
{
  "fooditem_id": 2,
  "quantity": 2,
  "unit": "cups"
}
```

### Remove one item

```http
POST /api/shoppinglist/remove
```

Request:

```json
{
  "fooditem_id": 2
}
```

### Required additions

- A quantity-update endpoint or clearly defined add-more behaviour.
- A purchased-state endpoint.
- A batch endpoint for adding all recipe ingredients in one transaction.

Proposed batch request:

```http
POST /api/shoppinglist/batch
```

```json
{
  "items": [
    {"fooditem_id": 2, "quantity": 2, "unit": "cups"}
  ]
}
```

## Contact Endpoint

### Intended route

```http
POST /api/contact
```

Current defects:

- The contact blueprint is imported but not registered in `server/app.py`.
- The active React component sends an empty JSON object.
- The backend prints the payload and returns success without sending or saving the enquiry.

Target request:

```json
{
  "name": "Example User",
  "email": "person@example.com",
  "message": "Hello"
}
```

The final success response must reflect actual email delivery, persistence, or both.

## Admin Routes

These are server-rendered routes rather than JSON API endpoints:

```http
GET|POST /adminlogin
GET|POST /admin-home
GET /logout
```

`/admin-home` requires a Flask session through `login_required`.

## Future Query Parameters

As content grows, add support for:

- `category`
- `search`
- `page`
- `limit`
- `featured`

Avoid unrestricted `SELECT *` responses indefinitely.
'@

$docs['DATABASE.md'] = @'
# Database

## Technology

FlaskCart uses SQLite through `server/app.db` and Python's standard `sqlite3` module.

## Confirmed Tables and Usage

### `users`

Used by admin login and registration.

Observed fields include:

- username
- email
- password hash

Passwords are hashed with Flask-Bcrypt.

### `FoodItems`

Observed fields:

- `foodName`
- `foodType`
- `calories`
- `servingSize`
- `isVegan`
- `isGlutenFree`
- `stock`

Rows are frequently addressed through SQLite `ROWID`.

### `Recipes`

Observed fields:

- `recipe_name`
- `servings`
- `date_added`
- `image_url`
- `image_alt`
- `short_description`
- `prep_time_minutes`
- `cook_time_minutes`
- `total_time_minutes`
- `recipeType`
- `calories`

### `RecipeInstructions`

Observed fields:

- `recipe_id`
- `step_number`
- `step_text`

### `RecipeIngredients`

Observed fields:

- `recipe_id`
- `fooditem_id`
- `quantity`
- `unit`
- `optional`

### `Tags`

Observed fields:

- `tag_id`
- `tag_name`

### `RecipeTags`

Observed fields:

- `recipe_id`
- `tag_id`

### `ShoppingList`

Observed fields:

- `FoodItemID`
- `Quantity`
- `Unit`
- `IsPurchased`

## Integrity Concerns to Verify

- Recipe and food code mixes explicit IDs and SQLite `ROWID`.
- The shopping-list join uses `FoodItems.ID`, while recipe ingredients join using `FoodItems.ROWID`.
- Recipe editing SQL refers to older-looking columns such as `recipeName`, `method` and `prepTime`, while recipe creation uses the current field names above.
- Recipe deletion behaviour and related-record cleanup are not implemented in the reviewed route/handler code.

These should be confirmed against the actual schema before migrations or deletion work.

## Required Constraints

- Pantry stock must be non-negative.
- Shopping-list quantities must be positive.
- Recipe ingredients must reference existing recipes and food items.
- Instruction step numbers should be ordered per recipe.
- Usernames should be unique.
- Email format should be validated where stored.

Where SQLite schema changes are made, consider constraints such as:

```sql
CHECK (stock >= 0)
CHECK (Quantity > 0)
```

## Transaction Rules

Use a transaction for:

- Creating a recipe plus instructions, ingredients and tags.
- Editing a recipe and its related records.
- Deleting a recipe and related records.
- Adding a complete recipe to the shopping list.

On any failure, roll back the whole operation.

## Contact Enquiries

If contact enquiries are persisted, add a dedicated table with fields such as:

- `enquiry_id`
- `name`
- `email`
- `message`
- `created_at`
- `status`

Document retention and deletion. Do not place real enquiry data in seed files.

## Backups and Migrations

- Back up `app.db` before destructive work.
- Prefer reproducible schema and seed scripts over a manually edited database file.
- Document every schema change in `CHANGELOG.md` and this file.
'@

$docs['SECURITY.md'] = @'
# Security

## Scope

FlaskCart is a public portfolio application with an authenticated admin area. It does not process payments, but it handles credentials, sessions, stock mutations and potentially contact personal data.

## Authentication

- Admin login is session-based.
- Passwords are checked with Flask-Bcrypt.
- `/admin-home` and pantry mutation endpoints use `login_required`.
- The session lifetime is two hours.

Required improvements:

- Provide the React UI with a safe way to know whether protected controls are available.
- Hide or disable admin-only controls for guests.
- Handle `401` responses consistently.
- Verify admin registration should remain publicly reachable in production.

## Secret Key

`server/config.py` currently falls back to a predictable secret value when `SECRET_KEY` is missing.

Production must fail closed or use a securely configured environment value. Do not use the fallback for the live deployment.

## CSRF

Flask-WTF CSRF protection is enabled and a token is placed in a cookie after requests.

Review:

- Cookie `Secure`, `HttpOnly` and `SameSite` settings.
- Token refresh behaviour.
- Whether public JSON mutations require and correctly receive the token.
- Consistent CSRF error responses.

## Contact Data

Names, email addresses and messages are personal data.

- Do not print full payloads in production.
- Do not commit real messages.
- Store only what the chosen contact workflow requires.
- Document retention if messages are persisted.
- Keep mail credentials in environment variables.
- Return success only after the chosen operation succeeds.

## Database Safety

- Use parameterised SQL.
- Validate quantities and stock on the server.
- Prevent negative stock with application validation and preferably a database constraint.
- Use transactions for multi-record operations.
- Verify related records before recipe deletion.

## Error Handling

- Do not expose stack traces or raw database errors publicly.
- Replace `print`-only exception handling with structured logs and safe API errors.
- Avoid broad exception handling that returns an apparently successful page after failure.

## Frontend Security

- Never put secrets in React environment variables or source files.
- Treat API responses as untrusted data.
- Do not render untrusted HTML.
- Use React Router links for internal navigation rather than forcing full reloads.

## Dependency Security

- Review old Flask and Create React App versions deliberately.
- Remove unused packages after verification.
- Run package audits as supporting evidence, not as the only security review.

## Vulnerability Reporting

Before promoting the repository publicly, add a private contact method for reporting security concerns.
'@

$docs['DESIGN_SYSTEM.md'] = @'
# Design System

## Purpose

FlaskCart should look deliberate and remain usable across mobile, tablet and desktop without turning the project into a design-system exercise.

## Principles

- Make the next action obvious.
- Keep recipe, pantry and shopping-list terminology consistent.
- Never hide all visible text from a control on mobile.
- Use clear loading, empty, success and error states.
- Preserve keyboard and screen-reader usability.
- Prefer reusable layout and typography tokens over scattered one-off rules.

## Layout

### Recipe pages

Use a responsive grid:

- One column on mobile.
- Two columns on tablet.
- Three columns on larger screens.

Do not use a fixed `w-[30%]` card width.

### Filters

On small screens, replace fixed sidebars with one of:

- Horizontal filter chips.
- A disclosure above results.
- An accessible filter drawer.

Show the active category and result count.

### Data tables

For pantry and shopping-list screens:

- Prefer responsive cards below a chosen breakpoint, or
- Use an intentionally styled horizontal-scroll container.

Do not allow controls to become unreadable or unlabeled.

## Components

Expected reusable UI pieces:

- Page container
- Header and mobile navigation
- Hero with primary actions
- Filter controls
- Recipe card
- Recipe details disclosure
- Loading skeleton
- Error state with retry
- Empty state
- Pantry row/card
- Shopping-list row/card
- Quantity control
- Purchased control
- Toast or inline confirmation
- 404 page

## Recipe Images

- Use a fixed aspect ratio.
- Use `object-fit: cover`.
- Set explicit dimensions.
- Lazy-load below-the-fold images.
- Provide responsive image sources where practical.
- Use accurate alternative text.

## Interaction States

Every interactive control should define:

- Default
- Hover
- Focus-visible
- Active or pressed
- Disabled
- Loading
- Error, where relevant

## Typography and Tokens

Centralise:

- Body and heading font families.
- Type scale.
- Colours.
- Spacing.
- Border radius.
- Shadows.
- Focus-ring style.

Consolidate Google Font requests or self-host only required weights.

## Accessibility

- Use semantic headings and landmarks.
- Keep visible focus styles.
- Label search and quantity inputs.
- Use `aria-expanded` for disclosures.
- Use `aria-pressed` for selected filters when appropriate.
- Do not use tab roles without the complete tab pattern.
- Keep mobile menu state accessible.

## Content Style

- Use plain, direct labels.
- Prefer action language: Add, Remove, Mark purchased, Browse recipes.
- Do not tell users a form is "on the left" unless the layout always supports that statement.
- Use one category taxonomy throughout the app.
'@

$docs['CONTRIBUTING.md'] = @'
# Contributing

## Project Context

FlaskCart is a Flask, React and SQLite learning project deployed on PythonAnywhere. It includes a public React SPA and a Flask/Jinja admin area.

## Setup

### Backend

```bash
cd server
python -m venv venv
```

Activate the environment:

```bash
# macOS or Linux
source venv/bin/activate
```

```powershell
# Windows PowerShell
.env\Scripts\Activate.ps1
```

Install and run:

```bash
pip install -r requirements.txt
python app.py
```

Flask CLI alternative:

```bash
flask --app app run --debug
```

### Frontend

```bash
cd app
npm install
npm start
```

The current frontend source uses a production API URL in `app/src/config/config.js`. Confirm local API configuration before testing mutations.

## Before Starting

- Read `TASKS.md` and respect the priority order.
- Read `REPO_AUDIT.md` for verified source findings.
- Confirm the current behaviour in the browser and network panel.
- Keep the planned change small.
- Identify whether the change affects public, admin or both surfaces.

## Branch Names

Examples:

```text
fix/contact-form
fix/recipe-filters
fix/inventory-stock-update
perf/recipe-data-fetching
a11y/recipe-accordion
```

## Commit Messages

Use focused messages:

```text
Register and validate contact endpoint
Connect recipe filters to recipe grid
Prevent negative pantry stock
Batch add recipe ingredients
```

## Pull Requests

Include:

- Problem and user impact.
- Files and architecture areas changed.
- Test commands and results.
- Screenshots for UI changes.
- Network-request comparison for performance work.
- Accessibility checks for interactive UI.
- Known limitations.

## Coding Rules

- Match existing conventions unless the task intentionally improves them.
- Keep API field names consistent.
- Avoid unrelated refactors.
- Remove debugging `print` and console output from completed paths.
- Do not add dependencies without explaining why.
- Use transactions for multi-record writes.

## Documentation

Update the relevant files when changing:

- API routes or payloads.
- Database schema.
- Authentication.
- Contact data handling.
- Deployment configuration.
- User-visible behaviour.
'@

$docs['DEPLOYMENT.md'] = @'
# Deployment

## Current Deployment

FlaskCart is live at:

`https://skateallday.pythonanywhere.com/`

The deployment is hosted on PythonAnywhere.

## Production Architecture

- Flask is the production web application.
- Flask serves the React build from its static directory.
- Server paths that are not static files fall back to React's `index.html`.
- React uses the PythonAnywhere origin as its API base URL.
- SQLite data is stored with the Flask application.

## Build Process

### Frontend

```bash
cd app
npm install
npm run build
```

Copy or deploy the resulting build into the Flask static arrangement used by the repository.

### Backend

```bash
cd server
pip install -r requirements.txt
```

The exact PythonAnywhere WSGI configuration should be documented from the live account.

## Required Environment Variables

- `SECRET_KEY`
- `MAIL_USERNAME`, if contact email is used
- `MAIL_PASSWORD`, if contact email is used

Do not rely on the fallback Flask secret key in production.

## Configuration Risks

### Hard-coded API origin

`app/src/config/config.js` exports the production PythonAnywhere URL directly. Replace this with build-time or same-origin configuration so local and production builds do not require source edits.

### Contact email

Flask-Mail is configured for Gmail SMTP. Confirm:

- App-password or provider requirements.
- Sender address.
- Recipient address.
- Error handling.
- No credentials in source control.

### SQLite

Confirm:

- Database path and file permissions.
- Backup process.
- Behaviour during deployments.
- Whether admin changes persist across reloads and deployments.

## Deployment Checklist

- [ ] Frontend tests pass.
- [ ] Frontend production build passes.
- [ ] Backend tests pass.
- [ ] `SECRET_KEY` is set securely.
- [ ] Debug mode is off.
- [ ] Contact credentials are configured if required.
- [ ] Contact failure does not return false success.
- [ ] Admin login works.
- [ ] Protected pantry endpoints reject guests.
- [ ] Static assets and React routes load directly.
- [ ] Unknown React routes show the designed 404 page.
- [ ] Database is backed up before schema changes.

## Rollback

- Keep the previous known-good code revision available.
- Back up the SQLite database before deployment.
- Revert the faulty code revision.
- Restore the database only when a migration or data change requires it.
- Smoke-test public and admin surfaces after rollback.
'@

$docs['KNOWN_ISSUES.md'] = @'
# Known Issues

## Priority 1 Confirmed Issues

### Contact form does not process enquiries

**Status:** Open

- `app/src/contact/contact.js` sends `{}`.
- `server/routes/contact.py` only prints the payload and returns success.
- `server/app.py` imports but does not register `contact_bp`.
- No visible sending, success or error state exists.

### Recipe filters do not affect recipes

**Status:** Open

- `RecipeSidebar` updates global filter state.
- `GetRecipes` does not read that state.
- Taxonomy values are inconsistent.

### Shopping-list filter UI is misleading

**Status:** Open

The page displays filtering controls without applying filter state to shopping-list rows.

### Inventory local updates can become `NaN`

**Status:** Open

The inventory context requires a quantity, but add/remove buttons call the update callback with only the food name.

### Inventory cannot be reduced exactly to zero

**Status:** Open

The client blocks any removal where the result is zero or lower. The server also lacks negative-stock validation.

### Public inventory controls call admin-only endpoints

**Status:** Open

The React UI displays stock controls to all visitors, but Flask protects the mutation endpoints with session authentication.

### Shopping-list Add more is incomplete

**Status:** Open

The table contains an input but no action. It also mixes `foodname`, `foodName` and `fooditem_name`.

### Purchased state is raw data

**Status:** Open

`is_purchased` is printed directly instead of using an interactive and understandable control.

### Shopping list can remain stale after recipe addition

**Status:** Open

Recipe ingredients are posted directly through API helpers and do not update shopping-list context. The context also expects a different schema.

### No React 404 route

**Status:** Open

Unknown client paths have no designed not-found screen.

## Repository Findings Requiring Verification

### Admin recipe editing appears inconsistent

The recipe creation fields use names such as `recipe_name` and `total_time_minutes`, while the reviewed edit SQL refers to `recipeName`, `method` and `prepTime`.

### Admin recipe deletion appears unwired

The reviewed template contains a delete button, but no matching handler was found.

### Food identifier usage may be inconsistent

Recipe ingredient queries join food records by `ROWID`, while the shopping-list query joins on `FoodItems.ID`.

## Accepted Limitations

- No real payment flow.
- No shipping or tax.
- No public customer accounts.
- SQLite is retained for the learning scope.
- Create React App remains until a separate migration is approved.
'@

$docs['CHANGELOG.md'] = @'
# Changelog

All notable FlaskCart changes should be documented here.

## Unreleased

### Added

- Repository-reviewed project documentation.
- Detailed four-level task backlog.
- Documentation of the React public app and Flask/Jinja admin area.
- Actual API route inventory.
- Database table and integrity notes.
- Priority 1 regression test matrix.
- PythonAnywhere deployment documentation.
- `REPO_AUDIT.md` with verified source findings.

### Changed

- Authentication is now documented as an existing admin capability rather than only a future idea.
- The project scope now includes recipes, pantry inventory, shopping lists, contact enquiries and admin data management.
- Technical stack documentation now reflects ordinary Flask blueprints rather than an unverified Flask-RESTful dependency.
- Roadmap now follows the owner's supplied priority order.

### Known Issues

- Contact form is not functional end to end.
- Filtering, inventory updates, shopping-list controls and React not-found behaviour require repair.
- Admin recipe edit/delete behaviour requires verification.

### Security

- Documented the insecure fallback Flask secret key.
- Documented personal-data handling requirements for contact enquiries.
- Documented the public/admin mismatch for pantry controls.

## Release Template

## [Version] - YYYY-MM-DD

### Added

### Changed

### Fixed

### Removed

### Security
'@

$docs['GLOSSARY.md'] = @'
# Glossary

## Admin area

The server-rendered Flask/Jinja interface used by authenticated administrators to manage food and recipe data.

## API

The JSON routes exposed by Flask, primarily under `/api`, and consumed by the React application.

## Batch endpoint

An API route that accepts several related items in one request and processes them in one database transaction.

## CSRF

Cross-Site Request Forgery protection. Flask-WTF provides a token that state-changing requests must send.

## Pantry

The stored list of food items and their current stock quantities.

## Public application

The React single-page application used by ordinary visitors.

## Recipe

A record containing recipe metadata plus related ingredients, instructions and tags.

## Recipe taxonomy

The controlled set of recipe categories such as Breakfast, Lunch and Dinner. These values must be normalised across database, API and UI.

## Shopping list

A persisted list of food items, quantities, units and purchased status.

## Source of truth

The authoritative state for a dataset. FlaskCart should avoid separate frontend state that no longer matches the backend.

## Optimistic update

Updating the UI before or immediately after a request. Optimistic changes must be rolled back or reconciled when a request fails.

## PythonAnywhere

The current hosting platform for the live FlaskCart application.

## React route

A client-side path handled by React Router.

## Server route

A path handled directly by Flask, including API and admin routes.
'@

$docs['REPO_AUDIT.md'] = @'
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
'@

foreach ($entry in $docs.GetEnumerator()) {
    $path = Join-Path (Get-Location) $entry.Key
    if (Test-Path -LiteralPath $path) {
        if (-not (Test-Path -LiteralPath $backupRoot)) {
            New-Item -ItemType Directory -Path $backupRoot -Force | Out-Null
        }
        Copy-Item -LiteralPath $path -Destination (Join-Path $backupRoot $entry.Key) -Force
        Write-Host "Backed up: $($entry.Key)" -ForegroundColor Yellow
    }
    Set-Content -LiteralPath $path -Value $entry.Value -Encoding utf8
    Write-Host "Updated: $($entry.Key)" -ForegroundColor Green
}

Write-Host "Documentation update complete." -ForegroundColor Cyan
if (Test-Path -LiteralPath $backupRoot) {
    Write-Host "Backups: $backupRoot" -ForegroundColor Cyan
}
