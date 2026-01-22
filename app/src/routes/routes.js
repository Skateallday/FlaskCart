import { Routes, Route } from 'react-router-dom';

import Home from '../home/home'; 
import About from '../about/about';
import RecipesPage from '../recipes/recipesdisplay';
import ShoppingList from '../shoppingList/shoppinglist';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<About   />} />
      <Route path="/recipes" element={<RecipesPage />} />
      <Route path="/shoppinglist" element={<ShoppingList />} />
    </Routes>
  );
}
