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

Current implementation note (2026-08-28): the recipe grid now supports search/category filtering and dedicated `/recipes/:recipeSlug` pages. Full taxonomy normalisation, E2E regression coverage and structured data remain outstanding.

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
- Add Recipe structured data to the now-existing dedicated recipe URLs.

## Out of Scope

- Real payments.
- Shipping and tax.
- Commercial inventory operations.
- Storage of payment card data.
- Enterprise-scale infrastructure.
