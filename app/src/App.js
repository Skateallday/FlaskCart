import './App.css';
import Header from './header/header';
import Footer from './footer/footer';
import AppRoutes from './routes/routes';
import { FilterProvider } from './context/filterContext';
import { ToastContainer } from 'react-toastify';
import { InventoryProvider } from './context/inventoryContext.jsx';
import { ShoppingListProvider } from './context/shoppingListContext.jsx';

function App() {

  return (
    <FilterProvider>
      <InventoryProvider>

    <ShoppingListProvider>
    <div className="app">
      <ToastContainer />

      <Header />

      <div className="flex flex-col md:flex-row">


        <div className="w-full flex-auto">
          <AppRoutes />
        </div>
      </div>

      <Footer />
    </div>

    </ShoppingListProvider>
    </InventoryProvider>
    </FilterProvider>
  );
}

export default App;
