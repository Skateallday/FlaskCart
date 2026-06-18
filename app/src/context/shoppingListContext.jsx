import { createContext, useContext, useState, useEffect } from "react";
import { BASE_URL } from "../config/config";

const ShoppingListContext = createContext();

export function ShoppingListProvider({ children }) {
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/shoppinglist/`)
      .then((res) => res.json())
      .then((data) => setShoppingList(data))
      .catch((err) => console.error("Failed to fetch shopping list:", err));
  }, []);

  const addToShoppingList = (foodName, inputQty) => {
    setShoppingList((prev) =>
      prev.map((i) =>
        i.foodName === foodName
          ? { ...i, stock: Number(i.stock) + Number(inputQty) }
          : i,
      ),
    );
  };

const removeFromShoppingList = (fooditem_id) =>{
  setShoppingList((prev) =>{
    return prev.filter((item) => item.fooditem_id !== fooditem_id)
  });
};

  return(
    <ShoppingListContext.Provider value={{ shoppingList, addToShoppingList, removeFromShoppingList}}>
        {children}
    </ShoppingListContext.Provider>
  )
}

export function useShoppingList(){
    return useContext(ShoppingListContext)
}
