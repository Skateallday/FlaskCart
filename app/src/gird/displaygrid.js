import React from 'react';

function DisplayGrid() {
  return (
    <div>
      <h1>Display Grid</h1>
      <p>This is a placeholder for the display grid component.</p>

      <div className="grid-container">
        {/* Grid items would go here */}
        <div className="grid-item">Vegetables</div>
        <div className="grid-item">Fruits</div>
        <div className="grid-item">Dry Store</div>
        <div className="grid-item">Condiments and Oils</div>
        <div className="grid-item">Bakery</div>
        <div className="grid-item">Household</div>
        </div>
    </div>
  );
}

export default DisplayGrid;