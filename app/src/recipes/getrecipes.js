import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { BASE_URL } from "../config/config";
import { useFilter } from "../context/filterContext";
import { slugifyRecipeName } from "./recipeSlug";

function GetRecipes({ limit, showControls = true }) {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { filter, setFilter } = useFilter();

  const recipeTypeColours = {
    Dinner: "bg-yellow-100 text-yellow-950",
    Easy: "bg-green-100 text-green-950",
    Soup: "bg-pink-100 text-pink-950",
    Snack: "bg-orange-100 text-orange-950",
    Snacks: "bg-orange-100 text-orange-950",
    Breakfast: "bg-purple-100 text-purple-950",
    Beverage: "bg-teal-100 text-teal-950",
    Lunch: "bg-blue-100 text-blue-950",
    Dessert: "bg-rose-100 text-rose-950",
  };

  useEffect(() => {
    async function fetchRecipes() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${BASE_URL}/api/recipes`);

        if (!response.ok) {
          throw new Error("Unable to load recipes.");
        }

        const data = await response.json();
        setRecipes(data);
      } catch (err) {
        console.error("Failed to fetch recipes:", err);
        setError("We couldn't load the recipes. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecipes();
  }, []);

  const cleanedSearch = search.trim().toLowerCase();

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory =
      !filter ||
      filter === "null" ||
      recipe.recipeType === filter ||
      (filter === "Snacks" && recipe.recipeType === "Snack");

    const matchesSearch =
      !cleanedSearch ||
      recipe.recipe_name.toLowerCase().includes(cleanedSearch) ||
      recipe.short_description?.toLowerCase().includes(cleanedSearch);

    return matchesCategory && matchesSearch;
  });

  const displayedRecipes = limit
    ? filteredRecipes.slice(0, limit)
    : filteredRecipes;

  const clearFilters = () => {
    setFilter(null);
    setSearch("");
  };

  if (isLoading) {
    return (
      <div className="w-full py-16 text-center">
        <p className="font-bold text-slate-700" role="status">
          Loading recipes…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center">
        <h2 className="font-slab text-2xl font-bold text-red-900">
          Something went wrong
        </h2>

        <p className="mt-2 text-red-800">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {showControls && (
        <div className="mb-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="w-full md:max-w-md">
              <label htmlFor="recipe-search" className="mb-2 block text-sm font-bold text-slate-700">
                Search recipes
              </label>

              <input
                id="recipe-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by recipe or ingredient..."
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20"
              />
            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="rounded-lg border-2 border-teal-700 px-5 py-2.5 font-bold text-teal-800 transition hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2"
            >
              Clear filters
            </button>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4">
            <p className="text-sm text-slate-600">
              <span className="font-bold text-slate-900">{filteredRecipes.length}</span>{" "}
              {filteredRecipes.length === 1 ? "recipe" : "recipes"} found
            </p>

            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">
                Category:
              </span>

              <span className="rounded-full bg-teal-100 px-3 py-1 text-sm font-bold text-teal-950">
                {filter || "All recipes"}
              </span>
            </div>
          </div>
        </div>
      )}

      {displayedRecipes.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
          <div className="mb-4 text-4xl" aria-hidden="true">
            🍲
          </div>

          <h2 className="font-slab text-2xl font-bold text-slate-900">
            No recipes found
          </h2>

          <p className="mx-auto mt-2 max-w-md text-slate-600">
            Try another search or clear your current category filter.
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 rounded-lg bg-teal-700 px-5 py-2.5 font-bold text-white transition hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2"
          >
            Show all recipes
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayedRecipes.map((recipe) => (
            <article
              key={recipe.recipe_id}
              className="flex min-h-[520px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md transition duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
              <img
                src={recipe.image_url}
                alt={recipe.image_alt}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />

              <div className="flex flex-1 flex-col p-5">
                <h2 className="font-slab text-2xl font-bold text-slate-900">
                  {recipe.recipe_name}
                </h2>

                <p className="mt-3 text-slate-600">
                  {recipe.short_description}
                </p>

                <div className="mt-4">
                  <span className={`inline-flex rounded-md px-3 py-1 text-sm font-bold ${recipeTypeColours[recipe.recipeType] || "bg-slate-100 text-slate-900"}`}>
                    {recipe.recipeType}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2">
                  <div className="rounded-lg bg-slate-100 px-2 py-3 text-center">
                    <span className="block text-lg" aria-hidden="true">
                      👥
                    </span>

                    <span className="mt-1 block text-sm font-bold text-slate-900">
                      {recipe.servings}
                    </span>

                    <span className="block text-xs text-slate-500">
                      servings
                    </span>
                  </div>

                  <div className="rounded-lg bg-slate-100 px-2 py-3 text-center">
                    <span className="block text-lg" aria-hidden="true">
                      🔥
                    </span>

                    <span className="mt-1 block text-sm font-bold text-slate-900">
                      {recipe.calories}
                    </span>

                    <span className="block text-xs text-slate-500">
                      calories
                    </span>
                  </div>

                  <div className="rounded-lg bg-slate-100 px-2 py-3 text-center">
                    <span className="block text-lg" aria-hidden="true">
                      🕛
                    </span>

                    <span className="mt-1 block text-sm font-bold text-slate-900">
                      {recipe.total_time_minutes}
                    </span>

                    <span className="block text-xs text-slate-500">
                      minutes
                    </span>
                  </div>
                </div>

                <Link
                  to={`/recipes/${slugifyRecipeName(recipe.recipe_name)}`}
                  className="mt-auto inline-flex w-full items-center justify-center rounded-lg bg-teal-700 px-5 py-3 font-bold text-white transition hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2"
                >
                  View recipe
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default GetRecipes;