import { Routes, Route } from 'react-router-dom';

import Home from '../home/home'; 
import About from '../about/about';
import RecipesPage from '../recipes/recipesdisplay';
import InventoryDisplay from '../inventory/getinventory';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<About   />} />
      <Route path="/recipes" element={<RecipesPage />} />
      <Route path="/inventory" element={<InventoryDisplay />} />
    </Routes>
  );
}
