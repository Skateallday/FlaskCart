import { useEffect, useState } from "react";
import { BASE_URL } from "../config/config";
import GetInstructions from "./getInstructions";
import GetIngredients from "./getingredients";

function GetRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [openRecipeID, setOpenRecipeId] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/recipes`)
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error("Failed to fetch setRecipes:", err));
  }, []);

  return (
    <div className="flex flex-wrap justify-center m-4">
      {recipes.map((recipes) => {
        const isOpen = openRecipeID === recipes.recipe_id;
        return (
          <div
            key={recipes.recipe_id}
            className="border w-[33%] bg-white p-4 m-4 rounded-xl shadow-2xl"
          >
            <div id="accordion" className="accordion">
              <img
                src={recipes.image_url}
                alt={recipes.image_alt}
                className=" h-auto mt-4 rounded"
              />
              <h2 className="accordionItem text-xl font-bold mb-2 mt-4">
                {recipes.recipe_name}
              </h2>
              <h3 className="text-lg mb-2">{recipes.short_description}</h3>

              <span className="bg-gray-100 p-2 rounded mb-4">
                <h4 className="font-bold">{recipes.recipeType}</h4>
              </span>
              <div className="inline-flex gap-4">
                <p class="bg-gray-100 p-2 rounded mb-4">
                  <span className="font-bold">👥 </span>
                  {recipes.servings}
                </p>
                <p class="bg-gray-100 p-2 rounded mb-4">
                  <span className="font-bold">🔥</span>
                  {recipes.calories} calories
                </p>
                <p class="bg-gray-100 p-2 rounded mb-4">
                  <span className="font-bold">🕛</span>
                  {recipes.total_time_minutes} minutes
                </p>
              </div>
              <div
                aria-labelledby={`accordion${recipes.recipe_id}`}
                role="region"
                className={`mb-4 overflow-hidden transition-all duration-300 ease-in-out will-change-transform
    ${
      isOpen
        ? "max-h-[1000px] opacity-100 translate-y-0"
        : "max-h-0 opacity-0 translate-y-2"
    }`}
              >
                <h3 className="mt-2 font-bold">Ingredients:</h3>
                <GetIngredients recipe_id={recipes.recipe_id} />
                <h3 className="mt-2 font-bold">Steps:</h3>
                <GetInstructions recipe_id={recipes.recipe_id} />
                <button className="bg-teal-600 flex text-black font-bold px-4 py-2 rounded">
                  Add to list
                </button>
              </div>
              <button
                aria-controls={`accordion${recipes.recipe_id}`}
                aria-selected={isOpen}
                role="tab"
                className="bg-teal-600 flex text-black font-bold px-4 py-2 rounded mt-4"
                onClick={() =>
                  setOpenRecipeId(isOpen ? null : recipes.recipe_id)
                }
              >
                {isOpen ? "Close" : "View Recipe"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default GetRecipes;
