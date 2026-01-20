import InventoryDisplay from '../inventory/getinventory'

import { SearchProvider } from '../context/searchContext';
import "./index.css"

function Home() {    
    
    return (
        <div>      
            <h1 className="text-4xl py-5 font-bold text-center mt-8 pb-8">Welcome to FlaskCart </h1>
        <SearchProvider>
            <InventoryDisplay/>
        </SearchProvider>
        
        </div>
    );
}

export default Home;