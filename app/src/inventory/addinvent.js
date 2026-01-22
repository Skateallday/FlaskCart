import { toast } from 'react-toastify';
import { addToStock } from '../config/api';

export default function AddButton({ item, onUpdate }) {
  async function handleClick() {
    
    
    console.log(item.stock)
    toast(item.foodName + " has been added");
    await addToStock(item.foodName);  // Pass the foodName string
    onUpdate(item.foodName);

  }

  return (
    <button
      className="bg-teal-600 flex text-black font-bold px-4 py-2 rounded"
      onClick={handleClick}
    >+ <span className="hidden md:block"> Add</span>
      
    </button>
  );
}
