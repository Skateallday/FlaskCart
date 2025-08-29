import React from 'react';

function DisplayGrid({ onFilterChange }) {
  const categories = [
    { id: 'Vegetable', label: 'Vegetables' },
    { id: 'Fruit', label: 'Fruits' },
    { id: 'Grain' , label: 'Dry Store' },
    { id: 'Oil/Condiment	', label: 'Condiments and Oils' },
    { id: 'Baked Good', label: 'Bakery' },
    { id: 'Household', label: 'Household' },
  ];

  

  return (
    <div className="grid grid-cols-3 text-center text-white p-4 gap-4">
      {categories.map((cat) => (
        <div
          key={cat.id}
          id={cat.id}
          className="grid-item bg-blue-500 p-4 gap-4 rounded-lg"
        >
          <button onClick={() => onFilterChange(cat.id)}>{cat.label}</button>
        </div>
      ))}
      <button
  className="bg-blue-500 p-4 gap-4 rounded-lg"
  onClick={() => onFilterChange(null)}
>
  Show All
</button>
    </div>
  );
}

export default DisplayGrid;
