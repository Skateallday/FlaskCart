import GetRecipes from "./getrecipes";
import RecipeSidebar from "../sidebar/recipeSidebar";
import { SearchProvider } from '../context/searchContext';

function RecipesPage() {
  return (
        <div className="flex">
      <div className="w-1/4">
        <RecipeSidebar />
      </div>
      <div className="w-3/4">
        <SearchProvider>
      <GetRecipes />
        </SearchProvider>
      </div>
    </div>
  );
}

export default RecipesPage;