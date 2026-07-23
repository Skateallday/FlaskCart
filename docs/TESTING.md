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
