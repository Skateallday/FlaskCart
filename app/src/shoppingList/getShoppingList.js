import { useState } from "react";
import { useShoppingList } from "../context/shoppingListContext.jsx";
import RemoveFromShopping from "./removeShoppingList.js";

function GetShoppingList() {
  const { shoppingList, removeFromShoppingList } = useShoppingList();
  const [inputValue, setInputValue] = useState({});

  let shoppingListState = shoppingList;
  console.log(shoppingListState)

  const getInputValue = (foodName) => {
    const value = inputValue[foodName];
    return value === undefined || value === null || value === ""
      ? 1
      : Number(value);
  };

  return (
    <div className="p-4 w-full">
      <h2 className="text-3xl py-4 text-left">Shopping List</h2>
      <div className="bg-white p-4 rounded">
        <table
          className="border-collapse my-4 w-full table-auto border-gray-300"
          cellPadding="8"
        >
          <thead>
            <tr className="bg-gray-100 py-4">
              <th className="border-none text-left">Name</th>
              <th className="border-none text-left">Stock</th>
              <th className="border-none text-left">Unit</th>
              <th className="border-none text-left">Purchased?</th>
              <th className="border-none text-left">Remove</th>
            </tr>
          </thead>
          <tbody>
            {shoppingListState.map((item) => {
              const inputQty = getInputValue(item.foodName);
              return (
                <tr
                  key={item.foodName}
                  className="hover:bg-yellow-100 border-b-2"
                >
                  <td className="">{item.fooditem_name}</td>
                  <td className="">{item.quantity}</td>   
                               
                  <td className="">{item.unit}</td>               
                  <td className="">{item.is_purchased}</td>
                  <td className="">
                    <RemoveFromShopping
                      item={item}
                      value={inputQty}
                      onUpdate={removeFromShoppingList}
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
export default GetShoppingList;
