import { useFilter } from '../context/filterContext'

function Sidebar() {

  const { setFilter } = useFilter();

  const categories = [
    { id: 'Vegetable', label: '🥕 Vegetables' },
    { id: 'Fruit', label: '🍎 Fruits' },
    { id: 'Grain', label: '🥫 Dry Store' },
    { id: 'Oil/Condiment', label: '🍜 Condiments and Oils' },
    { id: 'Baked Good', label: '🥯 Bakery' },
    { id: 'Household', label: '🧻 Household' },
  ];



  return (
    <aside className="h-full border-r-2 relative">
    <div className="border-right text-center text-white font-bold gap-4 sticky top-0">
      
      <h2 className="w-full p-4 gap-4 text-left text-black border-b-2">Navigation</h2>
      {categories.map((cat) => (
        
          <button
            key={cat.id}
            id={cat.id}
            className="m-4 w-full p-4 gap-4 rounded-lg text-left text-black"
            onClick={() => setFilter(cat.id)}>{cat.label}
          </button>
        
      ))}
      <button
        className="m-4 w-full p-4 gap-4 rounded-lg text-left text-black"
        onClick={() => setFilter(null)}
      >
        Show All
      </button>
    </div>
    </aside>
  );
}

export default Sidebar;
