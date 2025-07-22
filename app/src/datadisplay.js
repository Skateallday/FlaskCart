import { useEffect, useState } from "react";

function DataDisplay() {
  const [pantry, setPantry] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/pantry")
      .then((res) => res.json())
      .then((data) => setPantry(data))
      .catch((err) => console.error("Failed to fetch pantry:", err));
  }, []);

  const handleAddToStock = (item) => {
    fetch(`http://localhost:5000/api/pantry/${item.ROWID}/add`, {
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
    fetch(`http://localhost:5000/api/pantry/${item.ROWID}/remove`, {
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

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Pantry Items</h1>
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Calories</th>
            <th>Serving</th>
            <th>Vegan</th>
            <th>Gluten-Free</th>
            <th>Date Added</th>
            <th>Stock</th>
            <th>Add</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {pantry.map((item) => (
            <tr key={item.ROWID}>
              <td>{item.foodName}</td>
              <td>{item.foodType}</td>
              <td>{item.Calories}</td>
              <td>{item.servingSize}</td>
              <td>{item.ifVegan ? "✅" : "❌"}</td>
              <td>{item.isGlutenFree ? "✅" : "❌"}</td>
              <td>{item.dateAdded}</td>
              <td>{item.stock}</td>
              <td>
                <button onClick={() => handleAddToStock(item)}>Add</button>
              </td>
              <td>
                <button onClick={() => handleTakeawayFromStock(item)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataDisplay;
