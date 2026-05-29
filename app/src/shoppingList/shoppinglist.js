import Sidebar from "../sidebar/sidebar";
import GetShoppingList from "./getShoppingList";

function ShoppingList() {
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