import { useEffect, useState } from "react";
import { BASE_URL } from "../config/config";
import AddButton  from './addinvent';
import RemoveButton from './removeinvent.js';
import Searchbar from '../search/searchbar.js'

function InventoryDisplay({ filter }) {

  const [pantry, setPantry] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/pantry`)
      .then((res) => res.json())
      .then((data) => setPantry(data))
      .catch((err) => console.error("Failed to fetch pantry:", err));
  }, []);

const addStock = (foodName) => {
  setPantry(prev =>
    prev.map(i =>
      i.foodName === foodName ? { ...i, stock: Number(i.stock) + 1 } : i
    )
  );
};

const removeStock = (foodName) => {
  setPantry(prev =>
    prev.map(i =>
      i.foodName === foodName ? { ...i, stock: Number(i.stock) - 1 } : i
    )
  );
};

  const filteredPantry = filter && filter !== 'null' ? pantry.filter(item => item.foodType === filter) : pantry;

  return (
    <div className="p-4 w-full">
      <h2 className="text-3xl py-4 text-left">
        Pantry Items
      </h2><div className="bg-white p-4 rounded">
      <Searchbar/>
      <table className="border-collapse my-4 w-full table-auto border-gray-300" cellPadding="8">
        <thead>
          <tr className="bg-gray-100 py-4">
            <th className="border-none text-left">Name</th>
            <th className="border-none text-left">Type</th>
            <th className="border-none text-left">Calories</th>
            <th className="border-none text-left">Serving</th>
            <th className="border-none text-left">Stock</th>
            <th className="border-none text-left">Add</th>
            <th className="border-none text-left">Remove</th>
          </tr>
        </thead>
        <tbody>
          {filteredPantry.map((item) => (
            <tr key={item.foodName} className="hover:bg-yellow-100 border-b-2">
              <td className="">{item.foodName}</td>
              <td className="">{item.foodType}</td>
              <td className="">{item.Calories}</td>
              <td className="">{item.servingSize}</td>
              <td className="">{item.stock}</td>
              <td className="">
                <AddButton item={item} onUpdate={addStock}>Add</AddButton>
              </td>
              <td className="">
                <RemoveButton item={item} onUpdate={removeStock}>Remove</RemoveButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default InventoryDisplay;