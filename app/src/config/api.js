const BASE_URL = "http://localhost:5000";

export async function submitText(text) {
  const res = await fetch(`${BASE_URL}/api/parse`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  return await res.json();
}