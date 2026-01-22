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
    <div key={recipes.recipe_id} className="border p-4 mb-4 rounded shadow">
      <div id="accordion" className="accordion">
        <h2 className="accordionItem text-xl font-bold mb-2">{recipes.recipe_name}</h2>
      <div className="accordionContent mb-4 hidden" >
      <h3>Ingredients:</h3>
      <GetIngredients recipe_id={recipes.recipe_id} />
      <h3>Steps:</h3>
      <GetInstructions recipe_id={recipes.recipe_id} />
      <button className="bg-teal-600 flex text-black font-bold px-4 py-2 rounded">Add to list</button>
    </div>
    <img src={recipes.image_url} alt={recipes.image_alt} className="w-[33%] h-auto mt-4 rounded" />
    <p>{recipes.short_description}</p>
    <p>Prep time: {recipes.prep_time_minutes} minutes</p>
        <p>Cook time: {recipes.cook_time_minutes} minutes</p>
    <p>Total time: {recipes.total_time_minutes} minutes</p>

    </div>
    </div>
  ))}
  </>
  );
}

export default GetRecipes;
