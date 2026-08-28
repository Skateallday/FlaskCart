# API Documentation

## Conventions

- API routes use JSON unless noted otherwise.
- State-changing requests are protected by Flask-WTF CSRF handling.
- Authenticated pantry mutations use the Flask session cookie.
- Client code must check HTTP status before parsing a response.
- Error responses should move towards a consistent shape:

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

Current implementation returns every row from `Recipes` as an array.

### List instructions

```http
GET /api/instructions
```

Current implementation returns every row from `RecipeInstructions` as an array.

### List ingredients

Client note: `/recipes/:recipeSlug` is a React route, not a new backend endpoint. The current detail page loads `/api/recipes`, `/api/ingredients` and `/api/instructions` in parallel and filters them client-side. A focused detail endpoint remains a possible performance improvement.

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

Required repair:

- Validate the item exists.
- Validate the quantity.
- Prevent negative resulting stock.
- Return the updated item or stock value.
- Correct the remove success message.

## Confirmed Shopping-List Endpoints

### List items

```http
GET /api/shoppinglist/
```

Current response fields:

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
- Invalid JSON returns `400`.
- Field validation errors return `422`.
- The enquiry is persisted to `ContactEnquiries` before email notification is attempted.
- Persistence failure returns `500` with `saved: false`.
- Missing email-recipient configuration or email delivery failure returns `502` with `saved: true` and `email_sent: false`.
- Successful persistence plus email delivery returns `201` with `saved: true` and `email_sent: true`.

The API deliberately distinguishes persistence from notification delivery so the frontend can avoid duplicate submissions when a message was saved but email failed.

## Admin Routes

These are server-rendered routes rather than JSON API endpoints:

```http
GET|POST /adminlogin
GET|POST /admin-home
GET /logout
```

`/admin-home` requires a Flask session through `login_required`.

## Future Query Parameters

As content grows, add support for:

- `category`
- `search`
- `page`
- `limit`
- `featured`

Avoid unrestricted `SELECT *` responses indefinitely.
