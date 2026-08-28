import GetRecipes from "./getrecipes";
import RecipeSidebar from "../sidebar/recipeSidebar";

function RecipesPage() {
  return (
    <main className="w-full bg-slate-50">
      <div className="flex min-h-screen flex-col md:flex-row">
        <div className="w-full shrink-0 bg-white md:w-64 lg:w-72">
          <RecipeSidebar />
        </div>

        <div className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider text-teal-800">
                Find something delicious
              </p>

              <h1 className="font-slab text-3xl font-bold text-slate-900 sm:text-4xl">
                Recipes
              </h1>

              <p className="mt-3 max-w-2xl text-slate-600">
                Browse our recipes, search for something specific, or filter by category.
              </p>
            </div>

            <GetRecipes />
          </div>
        </div>
      </div>
    </main>
  );
}

export default RecipesPage;
