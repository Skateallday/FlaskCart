# Database

## Technology

FlaskCart uses SQLite through `server/app.db` and Python's standard `sqlite3` module.

## Confirmed Tables and Usage

### `users`

Used by admin login and registration/authentication.

Observed fields include:

- username
- email
- password hash

Passwords are hashed with Flask-Bcrypt.

### `FoodItems`

Observed fields:

- `foodName`
- `foodType`
- `calories`
- `servingSize`
- `isVegan`
- `isGlutenFree`
- `stock`

Rows are frequently addressed through SQLite `ROWID`.

### `Recipes`

Observed fields:

- `recipe_name`
- `servings`
- `date_added`
- `image_url`
- `image_alt`
- `short_description`
- `prep_time_minutes`
- `cook_time_minutes`
- `total_time_minutes`
- `recipeType`
- `calories`

### `RecipeInstructions`

Observed fields:

- `recipe_id`
- `step_number`
- `step_text`

### `RecipeIngredients`

Observed fields:

- `recipe_id`
- `fooditem_id`
- `quantity`
- `unit`
- `optional`

### `Tags`

Observed fields:

- `tag_id`
- `tag_name`

### `RecipeTags`

Observed fields:

- `recipe_id`
- `tag_id`

### `ShoppingList`

Observed fields:

- `FoodItemID`
- `Quantity`
- `Unit`
- `IsPurchased`

### `ContactEnquiries`

Contact enquiries are now persisted before email notification is attempted.

Current server code uses fields including:

- `enquiry_id`
- `name`
- `email`
- `message`
- `email_status`
- `email_attempted_at`
- `email_sent_at`

These rows contain personal data and therefore need an explicit retention/deletion policy.

## Integrity Concerns to Verify

- Recipe and food code mixes explicit IDs and SQLite `ROWID`.
- Shopping-list and recipe-ingredient code has historically used different `ID`/`ROWID` assumptions.
- Recipe editing SQL/form names previously appeared inconsistent with recipe creation fields.
- Recipe deletion behaviour and related-record cleanup still need verification.

Confirm the actual schema before migrations or deletion work.

## Required Constraints

- Pantry stock must be non-negative.
- Shopping-list quantities must be positive.
- Recipe ingredients must reference existing recipes and food items.
- Instruction step numbers should be ordered per recipe.
- Usernames should be unique.
- Email format should be validated where stored.

Where SQLite schema changes are made, consider constraints such as:

```sql
CHECK (stock >= 0)
CHECK (Quantity > 0)
```

## Transaction Rules

Use a transaction for:

- Creating a recipe plus instructions, ingredients and tags.
- Editing a recipe and its related records.
- Deleting a recipe and related records.
- Adding a complete recipe to the shopping list.

On any failure, roll back the whole operation.

## Production Deployment Risk — Open

`server/app.db` is currently tracked by Git.

PythonAnywhere deployment uses:

```bash
git fetch origin production
git reset --hard origin/production
```

That means a normal code deployment can replace the live database file with the copy stored in Git.

A manual timestamped backup was created during the 2026-09-24 deployment recovery, but this is not a durable production strategy.

Before production data is treated as persistent, choose and document one approach, for example:

- stop tracking the live database and maintain schema/seed/migration scripts separately; or
- explicitly preserve the live database around code deployments with a tested migration/rollback process.

Do not implement an automatic blind restore if a schema migration may legitimately change the database.

## Backups and Migrations

- Back up `app.db` before destructive work.
- Verify backup bytes and location before a risky deploy/migration.
- Prefer reproducible schema and seed scripts over a manually edited database file.
- Document every schema change in `CHANGELOG.md` and this file.
- Never commit real contact enquiries or other private production data.
