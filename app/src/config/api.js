import { BASE_URL } from "./config";

const csrfToken = document.cookie
  .split("; ")
  .find(row => row.startsWith("csrf_token="))
  ?.split("=")[1];



export async function submitText(text) {
  const res = await fetch(`${BASE_URL}/api/parse`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  return await res.json();
}

export async function addToStock(item) {
  await fetch(`${BASE_URL}/api/pantry/${item}/add`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-CSRFToken": csrfToken
  },
  credentials: "include", // important to send cookies
  body: JSON.stringify({})
});
    }

export async function removeFromStock(item) {
  await fetch(`${BASE_URL}/api/pantry/${item}/remove`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-CSRFToken": csrfToken
  },
  credentials: "include", // important to send cookies
  body: JSON.stringify({})
});
    }
