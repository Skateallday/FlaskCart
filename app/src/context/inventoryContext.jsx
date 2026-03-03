import { createContext, useContext, useState, useEffect } from "react";
import { BASE_URL } from "../config/config";

const InventoryContext = createContext();

export function InventoryProvider({ children }) {
  const [pantry, setPantry] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/pantry`)
      .then((res) => res.json())
      .then((data) => setPantry(data))
      .catch((err) => console.error("Failed to fetch pantry:", err));
  }, []);

  const addStock = (foodName, inputQty) => {
    setPantry((prev) =>
      prev.map((i) =>
        i.foodName === foodName
          ? { ...i, stock: Number(i.stock) + Number(inputQty) }
          : i,
      ),
    );
  };

  const removeStock = (foodName, inputQty) => {
    setPantry((prev) =>
      prev.map((i) =>
        i.foodName === foodName
          ? { ...i, stock: Number(i.stock) - Number(inputQty) }
          : i,
      ),
    );
  };

  return(
    <InventoryContext.Provider value={{ pantry, addStock, removeStock}}>
        {children}
    </InventoryContext.Provider>
  )
}

export function useInventory(){
    return useContext(InventoryContext)
}
