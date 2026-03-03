import { useEffect, useState } from "react";
import { BASE_URL } from "../config/config";

function GetIngredients({ recipe_id }) {
    
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

  return (
    <>
      <ul>
        {filteredIngredients.map((ingredients) => (
          <li key={ingredients.rowid}>
            {ingredients.fooditem_name}
            {ingredients.quantity ? ` -${ingredients.quantity}` : ""}
            {ingredients.unit ? ` ${ingredients.unit}` : ""}
          </li>
        ))}
      </ul>
    </>
  );
}

export default GetIngredients;
