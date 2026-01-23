import './App.css';
import Header from './header/header';
import Footer from './footer/footer';
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


        <div className="w-full flex-auto">
          <AppRoutes />
        </div>
      </div>

      <Footer />
    </div>
    </FilterProvider>
  );
}

export default App;
