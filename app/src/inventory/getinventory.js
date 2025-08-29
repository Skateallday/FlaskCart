import { useEffect, useState } from "react";
import { BASE_URL } from "../config/config";


function InventoryDisplay({ filter }) {
  const [pantry, setPantry] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/pantry`)
      .then((res) => res.json())
      .then((data) => setPantry(data))
      .catch((err) => console.error("Failed to fetch pantry:", err));
  }, []);

  const handleAddToStock = (item) => {
    fetch(`${BASE_URL}/api/pantry/${item.ROWID}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPantry((prev) =>
          prev.map((i) => (i.ROWID === item.ROWID ? { ...i, stock: i.stock + 1 } : i))
        );
      })
      .catch((err) => console.error("Failed to add to stock:", err));
  }

  const handleTakeawayFromStock = (item) => {
    fetch(`${BASE_URL}/api/pantry/${item.ROWID}/remove`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPantry((prev) =>
          prev.map((i) => (i.ROWID === item.ROWID ? { ...i, stock: i.stock - 1 } : i))
        );
      })
      .catch((err) => console.error("Failed to remove from stock:", err));
  };

  const filteredPantry = filter && filter !== 'null' ? pantry.filter(item => item.foodType === filter) : pantry;

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 className="text-3xl font-bold underline">
Pantry Items</h1>
      <table className="border-collapse border border-gray-300" cellPadding="8" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th className="border border-gray-400 bg-blue-200">Name</th>
            <th className="border border-gray-400 bg-blue-200">Type</th>
            <th className="border border-gray-400 bg-blue-200">Calories</th>
            <th className="border border-gray-400 bg-blue-200">Serving</th>
            <th className="border border-gray-400 bg-blue-200">Stock</th>
            <th className="border border-gray-400 bg-blue-200">Add</th>
            <th className="border border-gray-400 bg-blue-200">Remove</th>
          </tr>
        </thead>
        <tbody>
          {filteredPantry.map((item) => (
            <tr key={item.ROWID}>
              <td className="border border-gray-300">{item.foodName}</td>
              <td className="border border-gray-300">{item.foodType}</td>
              <td className="border border-gray-300">{item.Calories}</td>
              <td className="border border-gray-300">{item.servingSize}</td>
              <td className="border border-gray-300">{item.stock}</td>
              <td className="border border-gray-300">
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleAddToStock(item)}>Add</button>
              </td>
              <td className="border border-gray-300">
                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleTakeawayFromStock(item)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryDisplay;
