import './App.css';
import React from 'react';
import Header from './header/header';
import Footer from './footer/footer';
import Sidebar from './sidebar/sidebar';
import AppRoutes from './routes/routes'; // rename the export too
import { ToastContainer } from 'react-toastify';

function App() {
  const [filter, setFilter] = React.useState(null);

  return (
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
  );
}

export default App;
