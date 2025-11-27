
import './App.css'; 
import React from 'react';
import InventoryDisplay from './inventory/getinventory';
import DisplayGrid from './gird/displaygrid';


function App() {

  const [filter, setFilter] = React.useState('null');
  return (
    <div>
      <h1 className="text-4xl font-bold text-center pt-8 pb-8">Welcome to FlaskCart 🍓</h1>


    <DisplayGrid onFilterChange={setFilter} />
    <InventoryDisplay filter={filter} />
    </div>
  );
}

export default App;
