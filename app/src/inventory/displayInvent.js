import Sidebar from "../sidebar/sidebar";
import GetInventory from "./getinventory";
import LoginReq  from "../login/loginReq";

import { useAuth } from "../context/authContext";
import { SearchProvider } from "../context/searchContext";

export default function DisplayInvent() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <p>Checking your account...</p>;
  }

  if (!isAuthenticated) {
    return <LoginReq />;
  }

  return (
    <div className="flex">
      <div className="w-1/6">
        <Sidebar />
      </div>

      <div className="w-5/6">
        <SearchProvider>
          <GetInventory />
        </SearchProvider>
      </div>
    </div>
  );
}