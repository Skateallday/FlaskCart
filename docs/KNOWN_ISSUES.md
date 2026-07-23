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
