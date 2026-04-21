import GetRecipes from "./getrecipes";
import RecipeSidebar from "../sidebar/recipeSidebar";
import { SearchProvider } from '../context/searchContext';

function RecipesPage() {
  return (
        <div className="flex">
      <div className="w-1/6">
        <RecipeSidebar />
      </div>
      <div className="w-5/6">
        <SearchProvider>
      <GetRecipes />
        </SearchProvider>
      </div>
    </div>
  );
}

export default RecipesPage;