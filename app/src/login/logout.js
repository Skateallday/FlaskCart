import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { BASE_URL } from "../config/config";
import getCookie from "../config/cookie";

export default function Logout() {
  const navigate = useNavigate();
  const { refreshAuth } = useAuth();
  const [error, setError] = useState("");

  useEffect(() => {
    async function logout() {
      try {
        const csrfToken = getCookie("csrf_token");

        const response = await fetch(`${BASE_URL}/api/auth/logout`, {
          method: "POST",
          credentials: "include",
          headers: {
            "X-CSRFToken": csrfToken,
          },
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Unable to log out.");
        }

        await refreshAuth();
        navigate("/");
      } catch (error) {
        setError(error.message);
      }
    }

    logout();
  }, [navigate, refreshAuth]);

  if (error) {
    return <p>{error}</p>;
  }

  return <p>Logging out...</p>;
}