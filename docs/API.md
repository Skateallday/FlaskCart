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

### Intended route

```http
POST /api/contact
```

Current defects:

- The contact blueprint is imported but not registered in `server/app.py`.
- The active React component sends an empty JSON object.
- The backend prints the payload and returns success without sending or saving the enquiry.

Target request:

```json
{
  "name": "Example User",
  "email": "person@example.com",
  "message": "Hello"
}
```

The final success response must reflect actual email delivery, persistence, or both.

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
