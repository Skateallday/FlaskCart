import { useFilter } from "../context/filterContext";

function Sidebar() {
  const { setFilter } = useFilter();

  const categories = [
    { id: "Vegetable", emoji: "🥕", label: "Vegetables" },
    { id: "Fruit", emoji: "🍎", label: "Fruits" },
    { id: "Grain", emoji: "🥫", label: "Dry Store" },
    { id: "Oil/Condiment", emoji: "🍜", label: "Condiments and Oils" },
    { id: "Baked Good", emoji: "🥯", label: "Bakery" },
    { id: "Household", emoji: "🧻", label: "Household" },
  ];

  return (
    <aside className="h-full border-r-2 relative">
      <div className="border-right text-center text-black font-bold gap-4 sticky top-0">
        <h2 className="hidden md:block w-full p-4 gap-4 text-left text-black border-b-2">
          Filter items
        </h2>
        {categories.map((cat) => (
          <button
            role="tab"
            key={cat.id}
            id={cat.id}
            className="
              border border-solid rounded-md md:border-0 
              border-gray-300 hover:bg-gray-300 md:rounded-none 
              m-2 md:m-0 md:w-full p-2 md:p-4 gap-4 rounded-lg 
              text-left text-black"
            onClick={() => setFilter(cat.id)}
          >
            <span className="md:mr-2">{cat.emoji}</span>
            <span className="hidden md:block">{cat.label}</span>
          </button>
        ))}
        <button
          role="tab"
          className="
            border border-solid rounded-md md:border-0 
            border-gray-300 hover:bg-gray-300 md:rounded-none 
            m-2 md:m-0 md:w-full p-2 md:p-4 gap-4 rounded-lg 
            text-left text-black"
          onClick={() => setFilter(null)}
        >
          Show All
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
