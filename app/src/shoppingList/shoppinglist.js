import Sidebar from "../sidebar/sidebar";
import GetShoppingList from "./getShoppingList";

import { useAuth } from "../context/authContext";
import LoginReq from "../login/loginReq"


function ShoppingList() {

    const {isAuthenticated, loading } = useAuth();
  
    if (loading){
      return <p>Checking your account...</p>
    }
  
    if(!isAuthenticated){
      return (
        <LoginReq />
      )
    }
  return (
    <div className="flex">
      <div className="w-1/6">
        <Sidebar />
      </div>
      <div className="w-5/6">
          <GetShoppingList/>
      </div>
    </div>
  );
}

export default ShoppingList;