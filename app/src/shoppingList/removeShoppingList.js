import { toast } from "react-toastify";
import { removeFromShoppingList } from "../config/api";

export default function RemoveFromShopping({ item, value, onUpdate }) {
  async function handleClick() {
    try {
      await removeFromShoppingList(item.fooditem_id); // Pass the fooditem_ID 

      toast.success(
        `${value} ${item.fooditem_name}${value === 1 ? "" : "s"} removed`,
      );
      onUpdate(item.fooditem_id);
    } catch (error) {
      toast.error("Failed to remove shopping list item: " + error.message);
    }
  }

  return (
    <button
      className="bg-red-600 flex  text-white font-bold px-4 py-2 rounded"
      onClick={handleClick}
    >
      {" "}
      <span className="hidden md:block"> Remove from shopping list</span>
    </button>
  );
}
