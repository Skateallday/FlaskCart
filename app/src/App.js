import './App.css';
import React from 'react';
import Header from './header/header';
import Footer from './footer/footer';
import Sidebar from './sidebar/sidebar';
import AppRoutes from './routes/routes';
import { FilterProvider } from './context/filterContext';
import { ToastContainer } from 'react-toastify';

function App() {
  const [filter, setFilter] = React.useState(null);

  return (
    <FilterProvider>
    <div className="app">
      <ToastContainer />

      <Header />

      <div className="flex flex-row">
        <div className="w-[25%] flex-none">
          <Sidebar onFilterChange={setFilter} />
        </div>

        <div className="w-[75%] flex-auto">
          <AppRoutes filter={filter} />
        </div>
      </div>

      <Footer />
    </div>
    </FilterProvider>
  );
}

export default App;
