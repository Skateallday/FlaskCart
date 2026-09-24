# Database

## Technology

FlaskCart uses SQLite through `server/app.db` and Python's standard `sqlite3` module.

## Confirmed Tables and Usage

### `users`

Used by admin login and registration.

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

## Integrity Concerns to Verify

- Recipe and food code mixes explicit IDs and SQLite `ROWID`.
- The shopping-list join uses `FoodItems.ID`, while recipe ingredients join using `FoodItems.ROWID`.
- Recipe editing SQL refers to older-looking columns such as `recipeName`, `method` and `prepTime`, while recipe creation uses the current field names above.
- Recipe deletion behaviour and related-record cleanup are not implemented in the reviewed route/handler code.

These should be confirmed against the actual schema before migrations or deletion work.

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

## `ContactEnquiries`

Contact enquiries are now persisted before email notification is attempted. Current server code uses fields including:

- `enquiry_id`
- `name`
- `email`
- `message`
- `email_status`
- `email_attempted_at`
- `email_sent_at`

The exact table definition should remain documented alongside future schema/migration work. Define and document retention/deletion because these rows contain personal data. Do not place real enquiry data in seed files or test fixtures committed to Git.

## Backups and Migrations

- Back up `app.db` before destructive work.
- Prefer reproducible schema and seed scripts over a manually edited database file.
- Document every schema change in `CHANGELOG.md` and this file.
