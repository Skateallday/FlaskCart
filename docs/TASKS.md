# Tasks

## Current Focus

Continue Priority 1 functional work, but first make the browser-test environment safe enough to add regression coverage without touching production data.

## Priority 1: Fix Broken or Misleading Functionality

### Contact form

- [x] Register `contact_bp` in the Flask application under `/api`.
- [x] Send the actual name, email and message.
- [x] Choose SQLite persistence plus email notification.
- [x] Add server-side validation and structured/safe error responses.
- [x] Disable the submit button while sending.
- [x] Show visible success confirmation.
- [x] Show field and request errors.
- [x] Retain field values when the enquiry was not saved; avoid duplicate resubmission when it was saved but email failed.
- [x] Replace the old contact layout/copy during the public UI refresh.
- [ ] Add frontend and backend regression tests.

### Recipe filters

- [x] Read `FilterContext` inside the recipe grid.
- [x] Filter recipes by the selected category.
- [x] Provide Show All / clear-filter behaviour.
- [x] Show the active category and result count.
- [ ] Fully normalise `Snack` versus `Snacks`, `Others`, `Easy`, `Soup` and other category values. (`Snack`/`Snacks` currently has a targeted alias only.)
- [ ] Replace filter `role="tab"` with appropriate button semantics and selected-state accessibility.

### Recipe detail routing

- [x] Add `/recipes/:recipeSlug`.
- [x] Link recipe cards to the dedicated route.
- [x] Display recipe metadata, ingredients and ordered instructions.
- [x] Add recipe-detail loading, error and unknown-slug states.
- [x] Set a recipe-specific document title.
- [ ] Add FlaskCart Playwright regression coverage for the recipe journey.

### Playwright / E2E environment

- [x] Install `@playwright/test` 1.62.1.
- [x] Generate a Playwright config with Chromium, Firefox, WebKit and HTML reporting.
- [x] Verify the generated two-test demo suite in Docker: six passing executions across three browsers.
- [x] Verify HTML report serving through Docker port `9323`.
- [ ] Fix local API configuration so localhost tests do not target the live PythonAnywhere backend.
- [ ] Enable a FlaskCart `baseURL` / controlled test-server workflow after local API isolation is decided.
- [ ] Replace generated `playwright.dev` specs with FlaskCart-specific E2E tests.

### Shopping-list sidebar

- [ ] Decide whether the shopping list should be filterable by pantry category.
- [ ] If yes, connect filter state to shopping-list rows.
- [ ] If no, remove the misleading sidebar from the page.

### Inventory updates

- [ ] Pass both `foodName` and quantity to `addStock` from the action callback.
- [ ] Pass both `foodName` and quantity to `removeStock` from the action callback.
- [ ] Prevent `NaN` from entering local inventory state.
- [ ] Change the client removal check from `<= 0` to `< 0`.
- [ ] Validate current stock and requested reduction on the server.
- [ ] Return an error when an update would produce negative stock.
- [ ] Return an error when the pantry item does not exist.

### Inventory authentication

- [ ] Define how React knows whether an admin session exists.
- [ ] Hide protected add/remove controls from guests or provide a clear admin sign-in mode.
- [ ] Handle `401 Unauthorized` consistently.
- [ ] Ensure protected controls retain visible/accessibly named actions on mobile.

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
- [ ] Build a useful global 404 page with a route back to recipes or home.

Note: recipe detail has its own unknown-slug state, but that does not replace the missing global wildcard route.

### Admin verification

- [ ] Verify recipe editing against the current form field names and SQL columns.
- [ ] Verify recipe deletion; the current delete button has no matching handler in the reviewed source.
- [ ] Define related-record behaviour for recipe instructions, ingredients and tags.

## Priority 2: Largest Performance Improvements

- [x] Stop each recipe card fetching the ingredient dataset.
- [x] Stop each recipe card fetching the instruction dataset.
- [x] Stop the recipe-grid card tree from mounting the old per-card detail/additional dataset fetch pattern.
- [x] Prevent collapsed per-card recipe details from mounting by replacing that pattern with dedicated recipe routes.
- [x] Limit the homepage to three recipe previews.
- [x] Link the homepage preview to the full recipe library.
- [x] Add recipe-list loading, error and empty states.
- [x] Check `response.ok` before parsing recipe-list JSON.
- [ ] Replace the detail page's three full-dataset downloads with a focused recipe-detail API or equivalent cache strategy.
- [ ] Move inventory data fetching to inventory routes.
- [ ] Move shopping-list data fetching to shopping-list and recipe workflows that need it.
- [ ] Create a batch shopping-list endpoint.
- [ ] Add recipe ingredients in one database transaction.
- [ ] Replace ingredient-level toast spam with one useful summary message.
- [ ] Add complete loading/error states to pantry data fetching, not only filtered empty-state UI.
- [ ] Add loading, error and empty states to shopping list.
- [ ] Add retry actions where useful.
- [ ] Centralise fetch handling and error normalisation across the frontend.
- [ ] Finish image optimisation: explicit dimensions/responsive sources plus WebP/AVIF where practical. Lazy loading and fixed card aspect ratio are already present.
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

- [x] Replace fixed recipe-card widths with a responsive grid.
- [x] Use one column on mobile, two on tablet and three on desktop.
- [x] Make the recipe page layout stack on small screens and use a fixed-width sidebar region from medium viewports upward.
- [x] Redesign pantry data as mobile cards while retaining a desktop/tablet table.
- [ ] Redesign shopping-list tables for mobile or add intentional horizontal scrolling/cards.
- [ ] Keep inventory action labels visible/accessibly named on mobile; the older action button components still hide their text below `md`.
- [ ] Add accessible names to any remaining icon-only controls.
- [x] Improve hero overlay/layout spacing and responsive copy width.
- [x] Add Browse recipes and View pantry calls to action.
- [x] Give recipe card images a consistent aspect ratio with `object-fit: cover`.
- [x] Align recipe actions at the card bottom.
- [x] Replace the old embedded recipe-detail pattern with dedicated recipe routes.
- [x] Show active recipe filters and result counts.
- [ ] Fully normalise recipe taxonomy.
- [x] Remove the duplicate `Easy` colour definition in the current recipe card map.
- [ ] Continue centralising typography, colours, spacing, radius and focus styles.
- [ ] Consolidate Google Font requests.
- [x] Refresh the footer/header/home/contact visual hierarchy in the 2026-08-28 UI overhaul.
- [x] Correct the contact-section layout/copy during the UI overhaul.

## Priority 4: Accessibility, Semantics and SEO

- [~] `main` landmarks now exist on several refreshed primary screens, including recipes, recipe detail and pantry; verify all routed content consistently.
- [x] Remove the old recipe-card accordion interaction by moving details to a dedicated page.
- [ ] Remove inappropriate tab roles from recipe filter buttons.
- [ ] Use `aria-pressed` or equivalent selected-state semantics for recipe filters where appropriate.
- [ ] Verify pantry search labelling and add clear-search semantics where needed.
- [ ] Add `aria-expanded`, `aria-controls` and a descriptive name to the mobile menu button where needed.
- [ ] Close the mobile menu after navigation and verify focus/scroll behaviour.
- [~] New/refreshed recipe and home navigation uses React Router links; audit remaining internal anchors.
- [ ] Verify footer list semantics after the footer refresh.
- [~] Recipe detail now sets a route-specific document title; complete titles/descriptions for all routes.
- [ ] Add Recipe JSON-LD to dedicated recipe URLs.
- [ ] Add canonical URLs and Open Graph metadata.
- [ ] Add a share image.
- [~] Refreshed components include many `focus-visible` styles; audit for consistent coverage.

## Completed Baseline / Historical

- [x] Confirmed the project is a learning and portfolio application.
- [x] Confirmed the live PythonAnywhere deployment.
- [x] Confirmed the React public application and Flask/Jinja admin split.
- [x] Confirmed session-based admin authentication exists.
- [x] Confirmed recipe, pantry, shopping-list and contact API registration/current routes.
- [x] Reviewed the original task list against the repository.

## Task Maintenance Rules

- Keep the priority order unless a blocking dependency requires a small supporting task.
- Record new findings without silently displacing the owner's priorities.
- Move completed work into `CHANGELOG.md` and keep this file current.
- Use `[~]` only for deliberately documented partial completion; do not treat it as done.
