# Known Issues

## Priority 1 Open Issues

### Local frontend can target production API during development

**Status:** Open / blocks mutating E2E tests

`app/src/config/config.js` sends API requests from `localhost` and `127.0.0.1` to `https://skateallday.pythonanywhere.com`. This bypasses the intended local Flask service/proxy and means an automated mutation could alter production data.

### Playwright has no FlaskCart-specific regression tests yet

**Status:** Open

Playwright 1.62.1 is installed and the generated two-test demo suite passes in all three configured browser projects. However, `tests/example.spec.js` still tests `playwright.dev`, and `baseURL`/`webServer` are still commented in the generated configuration.

### Recipe taxonomy and filter semantics are incomplete

**Status:** Open

The recipe grid now filters correctly and handles `Snack`/`Snacks` as a targeted alias, but the complete taxonomy is not normalised. The committed recipe sidebar still uses `role="tab"` for ordinary filter buttons.

### Shopping-list filter UI is misleading

**Status:** Open

The page displays filtering controls without applying filter state to shopping-list rows.

### Inventory local updates can become `NaN`

**Status:** Open

The refreshed inventory screen passes `value` into the action components, but the older `AddButton`/`RemoveButton` callback path still calls the local update callback without the quantity. The state bug therefore remains.

### Inventory cannot safely be reduced to zero/negative constraints are incomplete

**Status:** Open

Client/server stock validation still needs authoritative repair and regression tests.

### Public inventory controls call admin-only endpoints

**Status:** Open

The React UI displays stock controls to visitors while Flask protects mutation endpoints with session authentication.

### Shopping-list Add more is incomplete

**Status:** Open

The shopping-list workflow still has schema/action gaps documented in `TASKS.md`.

### Purchased state is raw/incomplete

**Status:** Open

Purchased state still needs an interactive, understandable control and backend mutation route.

### Shopping list can remain stale after recipe addition

**Status:** Open

Recipe-to-shopping-list additions and shopping-list context still need a single consistent state/data contract.

### No global React 404 route

**Status:** Open

Recipe detail has an unknown-slug state, but React Router still has no wildcard application route.

## Repository Findings Requiring Verification

### Admin recipe editing appears inconsistent

The recipe creation fields use names such as `recipe_name` and `total_time_minutes`, while the reviewed edit SQL refers to older-looking names.

### Admin recipe deletion appears unwired

The reviewed template contains a delete button, but no matching handler was found in the earlier audit.

### Food identifier usage may be inconsistent

Recipe ingredient queries and shopping-list queries have historically used different `ID`/`ROWID` assumptions. Verify before schema or deletion work.

## Resolved / Superseded Findings

### Contact form processing

**Status:** Resolved in current repository state

The contact blueprint is registered, the frontend sends real field values, the backend validates input, enquiries are persisted, email notification is attempted, and persistence/delivery outcomes are distinguished.

### Recipe filters did not affect recipes

**Status:** Resolved for core filtering

`GetRecipes` now consumes `FilterContext`, applies category filtering/search, exposes clear filters and shows result count/active category. Taxonomy/semantics cleanup remains open separately.

### Recipe detail was embedded in cards

**Status:** Replaced

Recipe cards now link to dedicated `/recipes/:recipeSlug` pages.

## Accepted Limitations

- No real payment flow.
- No shipping or tax.
- No public customer accounts.
- SQLite is retained for the learning scope.
- Create React App remains until a separate migration is approved.
