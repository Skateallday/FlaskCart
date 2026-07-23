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
