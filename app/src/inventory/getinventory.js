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
    <div className="p-4 w-full">
      <h2 className="text-3xl py-4 text-center">
        Pantry Items
      </h2>
      <table className="border-collapse border w-full table-auto border-gray-300" cellPadding="8">
        <thead>
          <tr>
            <th className="border text-white border-white bg-teal-600">Name</th>
            <th className="border text-white border-white bg-teal-600">Type</th>
            <th className="border text-white border-white bg-teal-600">Calories</th>
            <th className="border text-white border-white bg-teal-600">Serving</th>
            <th className="border text-white border-white bg-teal-600">Stock</th>
            <th className="border text-white border-white bg-teal-600">Add</th>
            <th className="border text-white border-white bg-teal-600">Remove</th>
          </tr>
        </thead>
        <tbody>
          {filteredPantry.map((item) => (
            <tr key={item.ROWID} className="odd:bg-white even:bg-gray-100 hover:bg-yellow-100">
              <td className="border border-gray-300">{item.foodName}</td>
              <td className="border border-gray-300">{item.foodType}</td>
              <td className="border border-gray-300">{item.Calories}</td>
              <td className="border border-gray-300">{item.servingSize}</td>
              <td className="border border-gray-300">{item.stock}</td>
              <td className="border border-gray-300">
                <button className="bg-teal-600 w-full text-white font-bold px-4 py-2 rounded" onClick={() => handleAddToStock(item)}>Add</button>
              </td>
              <td className="border border-gray-300">
                <button className="bg-red-500 w-full font-bold text-white px-4 py-2 rounded" onClick={() => handleTakeawayFromStock(item)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryDisplay;
