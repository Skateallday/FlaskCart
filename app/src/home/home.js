import InventoryDisplay from '../inventory/getinventory'

function Home({ filter }) {    
    
    return (
        <div>      
            <h1 className="text-4xl py-5 font-bold text-center mt-8 pb-8">Welcome to FlaskCart 🍓</h1>

        <InventoryDisplay filter={filter} />
        </div>
    );
}

export default Home;