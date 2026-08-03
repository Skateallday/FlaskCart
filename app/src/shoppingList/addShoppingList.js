import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { BASE_URL } from "../config/config";
import { addToShoppingList } from "../config/api";

export default function AddToShopping({ recipe_id }) {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/ingredients`)
      .then((res) => res.json())
      .then((data) => setIngredients(data))
      .catch((err) => console.error("Failed to fetch setIngredients:", err));
  }, []);

  let filteredIngredients = ingredients.filter(
    (ingredients) => ingredients.recipe_id === recipe_id,
  );

  async function handleClick() {
    try {
      for (const ingredient of filteredIngredients) {
        await addToShoppingList(
          ingredient.fooditem_id,
          ingredient.quantity,
          ingredient.unit,
        ); // Pass the foodName string

        toast.success(
          `${ingredient.quantity} ${ingredient.unit} ${ingredient.fooditem_name}${ingredient.quantity === 1 ? "" : "s"} added`,
        );
      }
    } catch (error) {
      toast.error("Failed to add stock: " + error.message);
    }
  }

  return (
    <button
      className="bg-teal-600 flex text-black font-bold px-4 py-2 rounded"
      onClick={handleClick}
    >
      {" "}
      <span className="hidden md:block"> Add to shopping list</span>
    </button>
  );
}
