import './App.css';
import React from 'react';
import Header from './header/header';
import Footer from './footer/footer';
import Sidebar from './sidebar/sidebar';
import AppRoutes from './routes/routes';
import { FilterProvider } from './context/filterContext';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <FilterProvider>
    <div className="app">
      <ToastContainer />

      <Header />

      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-[25%] flex-row md:flex-none">
          <Sidebar/>
        </div>

        <div className="w-full md:w-[75%] flex-auto">
          <AppRoutes />
        </div>
      </div>

      <Footer />
    </div>
    </FilterProvider>
  );
}

export default App;
