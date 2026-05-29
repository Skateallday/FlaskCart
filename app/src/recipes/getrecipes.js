import { useEffect, useState } from "react";
import { BASE_URL } from "../config/config";
import GetInstructions from "./getInstructions";
import GetIngredients from "./getingredients";
import AddToShopping from "../shoppingList/addShoppingList";

function GetRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [openRecipeID, setOpenRecipeId] = useState(null);

  const recipeTypeColours = [
    { 'Dinner': 'bg-yellow-100' },
    { 'Easy': 'bg-green-100' },
    { 'Soup': 'bg-pink-100' },
    { 'Easy': 'bg-blue-100' },
    { 'Snack': 'bg-orange-100' },
    { 'Breakfast': 'bg-purple-100' },
    { 'Beverage': 'bg-teal-100' },
  ]

  useEffect(() => {
    fetch(`${BASE_URL}/api/recipes`)
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error("Failed to fetch setRecipes:", err));
  }, []);

  return (
    <div className="w-full flex flex-wrap m-4">
      {recipes.map((recipes) => {
        const isOpen = openRecipeID === recipes.recipe_id;
        return (
          <div
            key={recipes.recipe_id}
            className="border w-[30%] bg-white  m-4 rounded-lg shadow-xl :hover shadow-3xl"
          >
            <div id="accordion" className="accordion">
              <img
                src={recipes.image_url}
                alt={recipes.image_alt}
                className=" h-auto rounded-tl-lg rounded-tr-lg"
              />
              <div class="p-4">
              <h2 className="accordionItem  mb-2 mt-4">
                {recipes.recipe_name}
              </h2>
              <p className="mb-2">{recipes.short_description}</p>

              <p className={`p-2 rounded mb-4 
                  ${recipeTypeColours.find((r) => r[recipes.recipeType])?.[recipes.recipeType] || 'bg-gray-100'}`
                  }
                >

                <span className="font-bold">{recipes.recipeType}</span>
              </p>
              <div className="inline-flex gap-4">
                <p className="bg-gray-100 p-2 rounded mb-4">
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
                <AddToShopping recipe_id={recipes.recipe_id}/>
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
          </div>
        );
      })}
    </div>
  );
}

export default GetRecipes;
