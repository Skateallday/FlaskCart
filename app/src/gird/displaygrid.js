import React from 'react';

function DisplayGrid({ onFilterChange }) {
  const categories = [
    { id: 'Vegetable', label: 'Vegetables' },
    { id: 'Fruit', label: 'Fruits' },
    { id: 'Grain', label: 'Dry Store' },
    { id: 'Oil/Condiment', label: 'Condiments and Oils' },
    { id: 'Baked Goods', label: 'Bakery' },
    { id: 'Household', label: 'Household' },
  ];



  return (
    <div className="grid grid-cols-3 text-center text-white font-bold p-4 gap-4">
      {categories.map((cat) => (
        <div

        >
          <button
            key={cat.id}
            id={cat.id}
            className="grid-item bg-teal-600 w-full p-4 gap-4 rounded-lg hover:bg-teal-700"
            onClick={() => onFilterChange(cat.id)}>{cat.label}
          </button>
        </div>
      ))}
      <button
        className="bg-teal-600 p-4 gap-4 rounded-lg hover:bg-teal-700"
        onClick={() => onFilterChange(null)}
      >
        Show All
      </button>
    </div>
  );
}

export default DisplayGrid;
