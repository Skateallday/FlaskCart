import { toast } from 'react-toastify';
import { addToStock } from '../config/api';

export default function AddButton({ item, value, onUpdate }) {
  async function handleClick() {
    
    try{
    await addToStock(item.foodName, value);  // Pass the foodName string
    
    toast.success(`${value} ${item.foodName}${value == 1 ? '' : 's'} added`);
    onUpdate(item.foodName);

  } catch(error){
    toast.error("Failed to add stock: " + error.message);
  }
}

  return (
    <button
      className="bg-teal-600 flex text-black font-bold px-4 py-2 rounded"
      onClick={handleClick}
    > <span className="hidden md:block"> Add</span>
      
    </button>
  );
}
