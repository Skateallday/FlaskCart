import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import App from '../App';
import  About  from '../about/about';
import RecipesPage from '../recipes/recipesdisplay';
import InventoryDisplay from '../inventory/getinventory';
import Header from '../header/header';  



function Routers() {
    
    return (
        
            <Router>
                <Header />
               
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/recipes" element={<RecipesPage />} />
                    <Route path="/inventory" element={<InventoryDisplay />} />
                </Routes>
            </Router>
        
    );
}

    

export default Routers;