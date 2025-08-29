import React from 'react';


function DisplayGrid() {
  return (
    <div className="grid grid-cols-3 text-center text-white p-4 gap-4">

        <div className="grid-item bg-blue-500 p-4 gap-4 rounded-lg">Vegetables</div>
        <div className="grid-item bg-blue-500 p-4 gap-4 rounded-lg">Fruits</div>
        <div className="grid-item bg-blue-500 p-4 gap-4 rounded-lg">Dry Store</div>
        <div className="grid-item bg-blue-500 p-4 gap-4 rounded-lg">Condiments and Oils</div>
        <div className="grid-item bg-blue-500 p-4 gap-4 rounded-lg">Bakery</div>
        <div className="grid-item bg-blue-500 p-4 gap-4 rounded-lg">Household</div>
        </div>
  );
}

export default DisplayGrid;