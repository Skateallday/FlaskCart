import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { BASE_URL } from "../config/config";
import  getCookie  from "../config/cookie"

export default function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, loading, refreshAuth } = useAuth();

  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSubmitting(true);

    try {
      const csrfToken = getCookie("csrf_token");

      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to log in.");
      }

      await refreshAuth();

      navigate("/inventory");
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  if(loading){
    return<p>Checking your account...</p>
  }

  if(isAuthenticated){
    return<p>You're already logged in</p>
  }

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">
        Login
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="mb-1 block font-semibold"
          >
            Username
          </label>

          <input
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
            required
            className="w-full rounded border p-2"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="mb-1 block font-semibold"
          >
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
            className="w-full rounded border p-2"
          />
        </div>

        {error && (
          <p className="mb-4 text-red-600" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="rounded bg-teal-700 px-4 py-2 text-white disabled:opacity-50"
        >
          {submitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </main>
  );

}