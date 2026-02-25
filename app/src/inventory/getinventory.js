import { useEffect, useState } from "react";
import { BASE_URL } from "../config/config";
import AddButton from "./addinvent";
import RemoveButton from "./removeinvent.js";
import Searchbar from "../search/searchbar.js";
import { useFilter } from "../context/filterContext.js";
import { useSearch } from "../context/searchContext.js";

function GetInventory() {
  const { filter, setFilter } = useFilter();
  const { search, setSearch } = useSearch();
  const [pantry, setPantry] = useState([]);
  const [inputValue, setInputValue] = useState(1);

  useEffect(() => {
    fetch(`${BASE_URL}/api/pantry`)
      .then((res) => res.json())
      .then((data) => setPantry(data))
      .catch((err) => console.error("Failed to fetch pantry:", err));
  }, []);

  const addStock = (foodName) => {
    const inputQty = inputValue[foodName] || 1; // Default to 1 if no input value is set
    setPantry((prev) =>
      prev.map((i) =>
        i.foodName === foodName
          ? { ...i, stock: Number(i.stock) + Number(inputQty) }
          : i,
      ),
    );
  };

  const removeStock = (foodName) => {
    const inputQty = inputValue[foodName] || 1; // Default to 1 if no input value is set
    setPantry((prev) =>
      prev.map((i) =>
        i.foodName === foodName
          ? { ...i, stock: Number(i.stock) - Number(inputQty) }
          : i,
      ),
    );
  };

  /* Filter and Search 
  If there is a filter, and the filter isn't set to null, then filter the pantry items 
  where the foodtype is the same as the filter, otherwise display everything
  
  We remove any spaces and turn the search query into lower case. The start of the process is the same as the filter,
  but rather than look for a complete match, we're just looking to see if it's close enough. Not a full fuzzy 
  search, but it works for this project
  
  */
  const cleanedSearch = search?.trim().toLowerCase();

  let pantryState = pantry;

  if (cleanedSearch && cleanedSearch !== "null") {
    pantryState = pantry.filter((item) =>
      item.foodName.toLowerCase().includes(cleanedSearch),
    );
  } else if (filter && filter !== "null") {
    pantryState = pantry.filter((item) => item.foodType === filter);
  } else {
    pantryState = pantry;
  }

  const getInputValue = (foodName) => {
    const value = inputValue[foodName];
    return value === undefined || value === null || value === "" ? 1 : Number(value);
  };

  const handleAddChange = (foodName, value) => {
    setInputValue((prev) => ({
      ...prev,
      [foodName]: value,
    }));
  };

  return (
    <div className="p-4 w-full">
      <h2 className="text-3xl py-4 text-left">Pantry Items</h2>
      <div className="bg-white p-4 rounded">
        <Searchbar />

        <button
          className="ml-4 p-2 bg-teal-600 text-black font-bold rounded hover:bg-teal-700 transition"
          onClick={() => {
            setFilter(null);
            setSearch("");
          }}
        >
          Reset
        </button>

        <table
          className="border-collapse my-4 w-full table-auto border-gray-300"
          cellPadding="8"
        >
          <thead>
            <tr className="bg-gray-100 py-4">
              <th className="border-none text-left">Name</th>
              <th className="border-none text-left">Type</th>
              <th className="border-none text-left">Stock</th>
              <th className="border-none text-left">Add</th>
              <th className="border-none text-left">Remove</th>
            </tr>
          </thead>
          <tbody>
            {pantryState.map((item) => {
              const inputQty = getInputValue(item.foodName);
              return (
                <tr
                  key={item.foodName}
                  className="hover:bg-yellow-100 border-b-2"
                >
                  <td className="">{item.foodName}</td>
                  <td className="">{item.foodType}</td>
                  <td className="">{item.stock}</td>
                  <td className="">
                    <div className="inline">
                      <input
                        type="number"
                        onChange={(e) =>
                          handleAddChange(item.foodName, e.target.value)
                        }
                        value={inputQty}
                        name={`${item.foodName}addNumber`}
                        min="1"
                        max="500"
                      />

                      <AddButton
                        item={item}
                        value={inputQty}
                        onUpdate={addStock}
                      />
                    </div>
                  </td>
                  <td className="">
                    <input
                      type="number"
                      onChange={(e) =>
                        handleAddChange(item.foodName, e.target.value)
                      }
                      value={inputQty}
                      name={`${item.foodName}removeNumber`}
                      min="1"
                      max="500"
                    />
                    <RemoveButton
                      item={item}
                      value={inputQty}
                      onUpdate={removeStock}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GetInventory;
