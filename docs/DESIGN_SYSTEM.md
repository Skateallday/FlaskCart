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

The recipe library now implements the target responsive grid:

- One column on mobile.
- Two columns on tablet.
- Three columns on larger screens.

Recipe cards link to dedicated `/recipes/:recipeSlug` pages rather than expanding full detail content inside each card.

### Filters

The recipe grid now shows active category/result information and clear-filter behaviour.

Remaining filter design/accessibility work:

- Fully normalise the category taxonomy.
- Replace the remaining incomplete `role="tab"` pattern with ordinary button semantics and selected state.
- Keep the small-screen filter presentation compact and clearly labelled.

### Data tables

For pantry and shopping-list screens:

- Pantry now uses a table on medium+ viewports and cards on mobile.
- Shopping list should follow a similarly intentional responsive pattern.

Do not allow controls to become unreadable or unlabeled.

## Components

Expected reusable UI pieces:

- Page container
- Header and mobile navigation
- Hero with primary actions
- Filter controls
- Recipe card
- Dedicated recipe detail page
- Loading state
- Error state with retry where useful
- Empty state
- Pantry row/card
- Shopping-list row/card
- Quantity control
- Purchased control
- Toast or inline confirmation
- Global 404 page

## Recipe Images

Current recipe cards already use lazy loading and a fixed aspect ratio with `object-fit: cover`.

Remaining improvements:

- Set explicit dimensions where practical.
- Provide responsive image sources.
- Generate/serve WebP or AVIF where useful.
- Keep alternative text accurate.

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

Continue centralising:

- Body and heading font families.
- Type scale.
- Colours.
- Spacing.
- Border radius.
- Shadows.
- Focus-ring style.

Consolidate Google Font requests or self-host only required weights where appropriate.

## Accessibility

- Use semantic headings and landmarks.
- Keep visible focus styles.
- Label search and quantity inputs.
- Use selected-state semantics for filters.
- Do not use tab roles without the complete tab pattern.
- Keep mobile menu state accessible.
- Keep mobile action labels visible or provide equivalent accessible names.

## Content Style

- Use plain, direct labels.
- Prefer action language: Add, Remove, Mark purchased, Browse recipes.
- Do not describe layout position (for example, “on the left”) when responsive layout may change it.
- Use one category taxonomy throughout the app.
- Clearly distinguish saved contact enquiries from notification-delivery problems.
