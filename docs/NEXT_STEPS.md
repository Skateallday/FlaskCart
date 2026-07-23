# Next Steps

## Immediate Implementation Sequence

The next work should remain inside Priority 1.

### 1. Establish a regression baseline

- Create a branch for Priority 1 fixes.
- Record current API responses for contact, recipes, pantry and shopping list.
- Add or select a backend test runner.
- Confirm frontend tests and `npm run build` run successfully.
- Capture the current browser console and network behaviour for each broken workflow.

### 2. Repair the contact form end to end

- Register the contact blueprint under `/api`.
- Choose email delivery, database persistence, or both.
- Send actual field values.
- Validate on client and server.
- Add sending, success and failure states.
- Keep user-entered data after failure.
- Test the live deployment configuration without exposing credentials.

### 3. Connect filtering

- Connect recipe filter state to `GetRecipes`.
- Normalise recipe category values.
- Add active state, Show All and result count.
- Either connect the shopping-list filter or remove its sidebar.

### 4. Repair inventory state and permissions

- Pass the quantity into local update callbacks.
- Allow stock to reach zero.
- Reject negative stock on the server.
- Hide protected controls from guests or expose a clear admin session state.
- Add consistent handling for `401` responses.

### 5. Complete shopping-list interactions

- Standardise schema names.
- Add the Add more action.
- Add purchased-state mutation.
- Update context after add, remove and purchase actions.
- Make recipe additions update the current screen.

### 6. Add the React 404 page

- Add a wildcard route.
- Provide useful navigation back into the app.

### 7. Verify the admin recipe workflow

- Test add, edit and delete from the live-like local environment.
- Repair field and endpoint mismatches.
- Add safe relational cleanup for deletion.

## Decision Needed Before Contact Implementation

Choose one contact outcome:

1. Send an email only.
2. Save enquiries to SQLite only.
3. Save to SQLite and send an email.

For a portfolio app, option 3 demonstrates the most, but it also introduces personal-data retention and operational email configuration. Document the choice in `DECISIONS.md` before implementation.
