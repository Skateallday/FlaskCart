# Requirements

## User Roles

### Public visitor

A public visitor can:

- View the home and about pages.
- Browse recipes.
- Search and filter recipes by category.
- View dedicated recipe detail pages with ingredients and instructions.
- View pantry data.
- View and maintain the shopping list where public mutation is intentionally allowed.
- Submit a contact enquiry.

### Admin user

An authenticated admin can:

- Sign in.
- Access protected administration functionality.
- Add and edit food records.
- Add and edit recipe records.
- Perform protected pantry stock changes.
- Sign out.

Recipe deletion must be verified and implemented safely before it is documented as complete.

## Functional Requirements

### Contact form

Current implementation meets the core behavioural requirements below; regression tests remain outstanding.

- Send the entered name, email and message.
- Validate required fields and email format on client and server.
- Disable submission while sending.
- Show useful success, warning and error outcomes.
- Retain entered values when a request fails before persistence.
- Persist the enquiry to SQLite.
- Attempt email notification.
- Distinguish saved data from notification failure.
- Never report success for work that did not occur.

### Recipes

Current implementation includes search/category filtering and dedicated `/recipes/:recipeSlug` pages. Full taxonomy normalisation, E2E regression coverage and structured data remain outstanding.

- Display recipe image, name, summary, category, servings, calories and cooking time.
- Filter the visible recipe grid by selected category.
- Search recipe names/descriptions.
- Show the active filter and result count.
- Use one normalised category taxonomy.
- Display ingredients and instructions accessibly on a dedicated recipe route.
- Avoid downloading the same shared datasets for every recipe card.
- Add all recipe ingredients to the shopping list in one user action.
- Update shopping-list state immediately after success.
- Provide loading, error and empty states.

### Pantry inventory

- Display pantry items, categories and stock quantities.
- Support category filtering and name search.
- Provide responsive desktop/table and mobile-card presentation.
- Show mutation controls only to users authorised to use them, or provide a clear admin mode.
- Pass both item name and quantity to local state updates.
- Allow stock to reach exactly zero.
- Reject stock changes that would produce a negative value on the server.
- Show consistent success and error messages.

### Shopping list

- Display item name, quantity, unit and purchased state.
- Filter items only when functional filter controls are intentionally present.
- Add a user-entered quantity through a visible action.
- Use one consistent schema across API, context and components.
- Mark an item purchased or unpurchased.
- Visually distinguish purchased items.
- Remove an item.
- Update the page immediately after each successful change.
- Batch-add recipe ingredients in one request and one transaction.

### Routing

- Known React routes must render directly on refresh in production.
- Dedicated recipe slug routes must render recipe detail.
- Unknown React routes must show a designed global 404 page.
- Internal navigation should use React Router links.
- Larger routes can be code-split after core behaviour is stable.

### Admin

- Admin routes must require an authenticated session.
- Invalid credentials must fail safely.
- Recipe and food changes must validate submitted data.
- Recipe deletion must remove or preserve related data according to explicit database rules.
- Public UI must not expose controls that only admins can use without explaining the required sign-in.

## Deployment Requirements

Normal releases must follow:

`master` -> merge to `production` -> push `production` -> GitHub Actions -> PythonAnywhere -> reload.

- Normal releases must not require a manual PythonAnywhere login.
- A failed Git/SSH deployment command must make the Action fail.
- Deployment must refuse to proceed through an unexplained `.git/index.lock`.
- The deployed checkout must match `origin/production` before reload.
- Overlapping production deploy jobs must not run concurrently.
- The live database must not be silently destroyed or replaced by ordinary code deployment.
- Deployment verification must expose the deployed commit SHA and reload result.

The live SQLite preservation requirement is not yet satisfied and is tracked as an open operational issue.

## Non-Functional Requirements

### Reliability

- Check HTTP status before parsing response bodies.
- Use consistent API error objects.
- Keep UI state aligned with confirmed backend changes.
- Do not rely on page refresh to show successful mutations.
- Make deployment failures visible instead of false-green.

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

- Use `main` landmarks consistently.
- Use normal filter buttons with selected-state semantics rather than incomplete tab patterns.
- Label pantry search and clear-search actions.
- Improve mobile navigation semantics and focus handling.
- Use proper list markup in the footer.
- Provide visible `:focus-visible` styles.

### SEO

- Add route-specific titles and descriptions.
- Add canonical and Open Graph metadata.
- Add Recipe structured data to dedicated recipe URLs.

### Testing

- Do not cite generated Playwright demo tests as FlaskCart regression evidence.
- Add real FlaskCart browser tests incrementally.
- Mutating E2E tests must use isolated/local disposable data.
- Select and document a backend test runner.

## Out of Scope

- Real payments.
- Shipping and tax.
- Commercial inventory operations.
- Storage of payment card data.
- Enterprise-scale infrastructure.
