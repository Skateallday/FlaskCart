import GetRecipes from "./getrecipes";

function RecipesPage() {
  return (
    <div className="container mx-auto p-4 bg-white">
      <h1>Recipes</h1>
      <GetRecipes />
    </div>
  );
}

export default RecipesPage;