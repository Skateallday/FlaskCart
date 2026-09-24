# API Documentation

## Conventions

- API routes use JSON unless noted otherwise.
- State-changing requests are protected by Flask-WTF CSRF handling where applicable.
- Authenticated mutations use the Flask session cookie.
- Client code should check HTTP status before parsing response bodies.
- Error responses should continue moving towards a consistent shape:

```json
{
  "error": {
    "code": "invalid_request",
    "message": "A useful explanation."
  }
}
```

## Confirmed Recipe Endpoints

### List recipes

```http
GET /api/recipes
```

Current implementation returns recipe rows as an array.

### List instructions

```http
GET /api/instructions
```

Current implementation returns `RecipeInstructions` rows as an array.

### List ingredients

```http
GET /api/ingredients
```

Current response fields include:

```json
{
  "rowid": 1,
  "recipe_id": 1,
  "fooditem_id": 2,
  "fooditem_name": "Example",
  "quantity": 2,
  "unit": "cups"
}
```

### Recipe detail client note

`/recipes/:recipeSlug` is a React route, not a dedicated backend endpoint.

The current detail page loads `/api/recipes`, `/api/ingredients` and `/api/instructions` and filters those datasets client-side. A focused recipe-detail endpoint remains a future performance improvement.

## Confirmed Pantry Endpoints

### List pantry items

```http
GET /api/pantry
```

Public in the current implementation.

### Add stock

```http
POST /api/pantry/{foodName}/add/{quantity}
```

Requires an authenticated admin session.

### Remove stock

```http
POST /api/pantry/{foodName}/remove/{quantity}
```

Requires an authenticated admin session.

Remaining repair requirements:

- Validate the item exists.
- Validate the quantity.
- Prevent negative resulting stock.
- Allow a valid reduction to exactly zero.
- Return the updated item or stock value consistently.
- Keep client state aligned with the confirmed server result.

## Confirmed Shopping-List Endpoints

### List items

```http
GET /api/shoppinglist/
```

Current response fields include:

```json
{
  "rowid": 1,
  "fooditem_id": 2,
  "fooditem_name": "Example",
  "quantity": 2,
  "unit": "cups",
  "is_purchased": 0
}
```

### Add or increment one item

```http
POST /api/shoppinglist/post
```

Request:

```json
{
  "fooditem_id": 2,
  "quantity": 2,
  "unit": "cups"
}
```

### Remove one item

```http
POST /api/shoppinglist/remove
```

Request:

```json
{
  "fooditem_id": 2
}
```

### Required additions

- A quantity-update endpoint or clearly defined add-more behaviour.
- A purchased-state endpoint.
- A batch endpoint for adding all recipe ingredients in one transaction.

Proposed batch request:

```http
POST /api/shoppinglist/batch
```

```json
{
  "items": [
    {"fooditem_id": 2, "quantity": 2, "unit": "cups"}
  ]
}
```

## Contact Endpoint

### Submit contact enquiry

```http
POST /api/contact
```

Request:

```json
{
  "name": "Example User",
  "email": "person@example.com",
  "message": "Hello"
}
```

Current implementation:

- The contact blueprint is registered under `/api`.
- Input is trimmed and validated server-side.
- Invalid JSON returns an error.
- Field validation errors return a validation response.
- The enquiry is persisted to `ContactEnquiries` before email notification is attempted.
- Persistence and notification delivery outcomes are distinguished.
- The frontend can tell when a message was saved even if email notification failed and therefore avoid asking the user to resubmit unnecessarily.

## Authentication / Admin

The repository has Flask session-based authentication plus React login/logout surfaces.

Server-rendered admin routes include:

```http
GET|POST /adminlogin
GET|POST /admin-home
GET /logout
```

`/admin-home` requires a Flask session through `login_required`.

The React logout flow currently calls an API auth logout route and refreshes client auth state. Pantry-control integration with that auth state still needs completion/verification.

## Future Query Parameters

As content grows, add support for:

- `category`
- `search`
- `page`
- `limit`
- `featured`

Avoid unrestricted full-table responses indefinitely.
