import { useEffect, useState } from "react";
import { BASE_URL } from "../config/config";
import GetInstructions from "./getInstructions";
import GetIngredients from "./getingredients";


function GetRecipes() {

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/recipes`)
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error("Failed to fetch setRecipes:", err));
  }, []);


  return (<>
  {recipes.map((recipes) =>(
    <div key={recipes.recipe_id} className="hover:bg-yellow-200 border p-4 mb-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2">{recipes.recipe_name}</h2>
      <h3>Ingredients:</h3>
      <GetIngredients recipe_id={recipes.recipe_id} />
      <h3>Steps:</h3>
      <GetInstructions recipe_id={recipes.recipe_id} />
      <button className="bg-teal-600 flex text-black font-bold px-4 py-2 rounded">Add to list</button>
    </div>
  ))}
  </>
  );
}

export default GetRecipes;
