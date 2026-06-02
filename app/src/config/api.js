import { BASE_URL } from "./config";

const csrfToken = document.cookie
  .split("; ")
  .find(row => row.startsWith("csrf_token="))
  ?.split("=")[1];


export async function addToStock(item, value) {
  const res = await fetch(`${BASE_URL}/api/pantry/${item}/add/${value}`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-CSRFToken": csrfToken
  },
  credentials: "include", // important to send cookies
  body: JSON.stringify({})
});
  if (!res.ok) throw new Error("Failed to Add Stock");

    }

export async function removeFromStock(item, value) {
  const res = await fetch(`${BASE_URL}/api/pantry/${item}/remove/${value}`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-CSRFToken": csrfToken
  },
  credentials: "include", // important to send cookies
  body: JSON.stringify({})
});
  if (!res.ok) throw new Error("Failed to Remove Stock");

    }

    export async function addToShoppingList(fooditem_id, quantity, unit) {
  const res = await fetch(`${BASE_URL}/api/shoppinglist/post`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-CSRFToken": csrfToken
  },
  credentials: "include", // important to send cookies
  body: JSON.stringify({fooditem_id: fooditem_id, quantity: quantity, unit: unit})
});
  if (!res.ok) throw new Error("Failed to Add to Shopping List");

    }

export async function removeFromShoppingList(fooditem_id) {
  const res = await fetch(`${BASE_URL}/api/shoppinglist/remove`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-CSRFToken": csrfToken
  },
  credentials: "include", // important to send cookies
  body: JSON.stringify({fooditem_id: fooditem_id})
});
  if (!res.ok) throw new Error("Failed to remove from shopping list");

    }

export async function contactFormSubmit(formData, e){
  e.preventDefault();
  const response = await fetch('api/contact',{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ name: formData.name, email: formData.email, message: formData.message}),

  });
  const data = await response.json();
  console.log(data.status)
}
