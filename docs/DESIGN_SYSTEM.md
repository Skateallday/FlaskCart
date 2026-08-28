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
