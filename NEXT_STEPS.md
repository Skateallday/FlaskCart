# FlaskCart: Next Best Steps for Site Development

This roadmap is focused on **building the site forward** (user value first), not just technical cleanup.

## 1) Improve the core shopper flow (highest priority)
Goal: make the app feel complete for a normal user session.

- Make "Pantry → Recipes → Shopping List" a guided flow:
  - Pantry updates should immediately influence recipe availability.
  - Recipe cards should clearly show "You can make this" vs "Missing ingredients".
  - One-click "Add missing ingredients to shopping list".
- Add recipe detail UX:
  - Expandable/click-through recipe view with ingredients + instructions.
  - Show ingredient quantities and pantry stock side-by-side.
- Add shopping-list quality-of-life:
  - check/uncheck items
  - remove item
  - clear completed items
  - persist list across refreshes.

## 2) Finish inventory management UX
Goal: make inventory actually usable day-to-day.

- Replace raw add/remove controls with clearer controls:
  - quantity stepper (+/-)
  - optional unit display
  - guardrails against negative stock.
- Add inventory search + category filtering + sort.
- Add low-stock highlighting and optional "restock" shortcuts.

## 3) Strengthen recipe discovery and usefulness
Goal: make recipes the center of value.

- Add recipe filtering:
  - by pantry match %
  - by category (breakfast/lunch/dinner/snack)
  - by prep time (if available in schema).
- Add "recommended recipes" section on home page based on pantry contents.
- Add empty states and helper copy (e.g., "Add tomatoes and pasta to unlock 3 recipes").

## 4) User accounts and persistence (next major milestone)
Goal: let users keep data over time and across devices.

- Implement authentication for normal users (not just admin).
- Associate pantry and shopping-list data with user accounts.
- Add basic profile/settings page.
- Add logout/login state handling in navbar and protected routes.

## 5) Admin/data tooling to support content growth
Goal: make it easy to grow recipe and ingredient data.

- Admin CRUD for:
  - Food items
  - Recipes
  - Recipe ingredients
  - Recipe instructions.
- Validation and duplicate detection (e.g., ingredient naming normalization).
- Simple import/export path (CSV/JSON) for seed data.

## 6) Parallel engineering tasks (do alongside feature work)
These unblock velocity but should run in parallel to product work:

- Fix backend import path issue in `server/app.py` (`app.forms.forms` → server forms path).
- Resolve frontend/backend API mismatch (`/api/parse` is called but missing).
- Add backend API tests for pantry/recipes/ingredients/instructions.
- Remove React key warning in display grid.
- Add repo hygiene updates (`.gitignore` for caches/build/runtime artifacts).

## Suggested delivery order (practical)

### Sprint A (1-2 weeks)
- Core shopper flow polish (Section 1)
- Inventory UX baseline (Section 2)
- Fix import/API mismatch blockers (Section 6 first two bullets)

### Sprint B (1-2 weeks)
- Recipe discovery improvements (Section 3)
- Shopping list persistence + UX completion
- Add initial backend tests

### Sprint C (2+ weeks)
- User auth + per-user data persistence (Section 4)
- Start admin CRUD and content tooling (Section 5)

## Definition of "site ready for broader testing"
- A user can manage pantry items, discover recipes from pantry, and maintain a persistent shopping list without confusion.
- No known broken API paths in frontend.
- Core flows are covered by automated tests (frontend + backend smoke tests).
- UI has no major console warnings in key pages.
