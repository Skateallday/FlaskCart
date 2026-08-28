import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { BASE_URL } from "../config/config";
import { slugifyRecipeName } from "./recipeSlug";

function RecipeDetail() {
  const { recipeSlug } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let isCurrent = true;

    async function fetchRecipeDetails() {
      try {
        setIsLoading(true);
        setError(null);
        setNotFound(false);

        const [recipesResponse, ingredientsResponse, instructionsResponse] =
          await Promise.all([
            fetch(`${BASE_URL}/api/recipes`),
            fetch(`${BASE_URL}/api/ingredients`),
            fetch(`${BASE_URL}/api/instructions`),
          ]);

        if (
          !recipesResponse.ok ||
          !ingredientsResponse.ok ||
          !instructionsResponse.ok
        ) {
          throw new Error("Unable to load this recipe.");
        }

        const [recipesData, ingredientsData, instructionsData] =
          await Promise.all([
            recipesResponse.json(),
            ingredientsResponse.json(),
            instructionsResponse.json(),
          ]);

        if (!isCurrent) {
          return;
        }

        const matchedRecipe = recipesData.find(
          (item) => slugifyRecipeName(item.recipe_name) === recipeSlug,
        );

        if (!matchedRecipe) {
          setRecipe(null);
          setIngredients([]);
          setInstructions([]);
          setNotFound(true);
          return;
        }

        const matchedIngredients = ingredientsData.filter(
          (item) => String(item.recipe_id) === String(matchedRecipe.recipe_id),
        );

        const matchedInstructions = instructionsData
          .filter(
            (item) =>
              String(item.recipe_id) === String(matchedRecipe.recipe_id),
          )
          .sort(
            (a, b) =>
              Number(a.step_number ?? a.instruction_id ?? 0) -
              Number(b.step_number ?? b.instruction_id ?? 0),
          );

        setRecipe(matchedRecipe);
        setIngredients(matchedIngredients);
        setInstructions(matchedInstructions);
      } catch (err) {
        console.error("Failed to fetch recipe details:", err);

        if (isCurrent) {
          setError("We couldn't load this recipe. Please try again.");
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    }

    fetchRecipeDetails();

    return () => {
      isCurrent = false;
    };
  }, [recipeSlug]);

  useEffect(() => {
    if (!recipe) {
      return undefined;
    }

    const previousTitle = document.title;
    document.title = `${recipe.recipe_name} | FlaskCart`;

    return () => {
      document.title = previousTitle;
    };
  }, [recipe]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-center font-bold text-slate-700" role="status">
          Loading recipe…
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center">
          <h1 className="font-slab text-3xl font-bold text-red-900">
            Something went wrong
          </h1>
          <p className="mt-3 text-red-800">{error}</p>
          <Link
            to="/recipes"
            className="mt-6 inline-flex rounded-lg bg-teal-700 px-5 py-3 font-bold text-white transition hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2"
          >
            Back to recipes
          </Link>
        </div>
      </main>
    );
  }

  if (notFound || !recipe) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
          <p className="text-4xl" aria-hidden="true">
            🍲
          </p>
          <h1 className="mt-4 font-slab text-3xl font-bold text-slate-900">
            Recipe not found
          </h1>
          <p className="mt-3 text-slate-600">
            That recipe may have moved or no longer exists.
          </p>
          <Link
            to="/recipes"
            className="mt-6 inline-flex rounded-lg bg-teal-700 px-5 py-3 font-bold text-white transition hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2"
          >
            Browse all recipes
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-6xl">
        <Link
          to="/recipes"
          className="inline-flex items-center gap-2 font-bold text-teal-800 transition hover:text-teal-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2"
        >
          <span aria-hidden="true">←</span>
          Back to recipes
        </Link>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-2">
            <img
              src={recipe.image_url}
              alt={recipe.image_alt || recipe.recipe_name}
              className="h-full min-h-[300px] w-full object-cover lg:min-h-[460px]"
            />

            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <p className="text-sm font-bold uppercase tracking-wider text-teal-800">
                {recipe.recipeType}
              </p>

              <h1 className="mt-2 font-slab text-4xl font-bold text-slate-900 sm:text-5xl">
                {recipe.recipe_name}
              </h1>

              {recipe.short_description && (
                <p className="mt-5 text-lg leading-8 text-slate-600">
                  {recipe.short_description}
                </p>
              )}

              <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-xl bg-slate-100 p-4">
                  <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Servings
                  </dt>
                  <dd className="mt-1 text-lg font-bold text-slate-900">
                    {recipe.servings}
                  </dd>
                </div>

                <div className="rounded-xl bg-slate-100 p-4">
                  <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Calories
                  </dt>
                  <dd className="mt-1 text-lg font-bold text-slate-900">
                    {recipe.calories}
                  </dd>
                </div>

                <div className="rounded-xl bg-slate-100 p-4">
                  <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Prep
                  </dt>
                  <dd className="mt-1 text-lg font-bold text-slate-900">
                    {recipe.prep_time_minutes} min
                  </dd>
                </div>

                <div className="rounded-xl bg-slate-100 p-4">
                  <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Total
                  </dt>
                  <dd className="mt-1 text-lg font-bold text-slate-900">
                    {recipe.total_time_minutes} min
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-bold uppercase tracking-wider text-teal-800">
              What you'll need
            </p>
            <h2 className="mt-2 font-slab text-3xl font-bold text-slate-900">
              Ingredients
            </h2>

            {ingredients.length === 0 ? (
              <p className="mt-5 text-slate-600">
                No ingredients have been added to this recipe yet.
              </p>
            ) : (
              <ul className="mt-6 divide-y divide-slate-200">
                {ingredients.map((ingredient, index) => (
                  <li
                    key={ingredient.rowid ?? `${ingredient.fooditem_id}-${index}`}
                    className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <span className="font-bold text-slate-900">
                      {ingredient.fooditem_name}
                      {ingredient.optional ? (
                        <span className="ml-2 text-sm font-normal text-slate-500">
                          optional
                        </span>
                      ) : null}
                    </span>

                    <span className="shrink-0 text-right text-slate-600">
                      {ingredient.quantity ?? ""}
                      {ingredient.quantity && ingredient.unit ? " " : ""}
                      {ingredient.unit ?? ""}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-bold uppercase tracking-wider text-teal-800">
              Step by step
            </p>
            <h2 className="mt-2 font-slab text-3xl font-bold text-slate-900">
              Instructions
            </h2>

            {instructions.length === 0 ? (
              <p className="mt-5 text-slate-600">
                No instructions have been added to this recipe yet.
              </p>
            ) : (
              <ol className="mt-6 space-y-6">
                {instructions.map((instruction, index) => (
                  <li
                    key={instruction.instruction_id ?? `${recipe.recipe_id}-${index}`}
                    className="grid grid-cols-[auto_1fr] gap-4"
                  >
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-100 font-bold text-teal-950"
                      aria-hidden="true"
                    >
                      {instruction.step_number ?? index + 1}
                    </span>
                    <p className="pt-1 leading-7 text-slate-700">
                      {instruction.step_text}
                    </p>
                  </li>
                ))}
              </ol>
            )}
          </section>
        </div>
      </article>
    </main>
  );
}

export default RecipeDetail;
