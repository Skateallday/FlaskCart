import { Routes, Route } from "react-router-dom";

import Home from "../home/home";
import About from "../about/about";
import RecipesPage from "../recipes/recipesdisplay";
import DisplayInvent from "../inventory/displayInvent";
import ShoppingList from "../shoppingList/shoppinglist";
import RecipeDetail from "../recipes/recipeDetails";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/inventory" element={<DisplayInvent />} />
      <Route path="/recipes" element={<RecipesPage />} />
      <Route path="/recipes/:recipeSlug" element={<RecipeDetail />} />
      <Route path="/shoppinglist" element={<ShoppingList />} />
    </Routes>
  );
}
