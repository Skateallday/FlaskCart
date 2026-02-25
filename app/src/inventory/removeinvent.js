import { toast } from 'react-toastify';
import { removeFromStock } from '../config/api';

export default function RemoveButton({ item, value, onUpdate }) {
  async function handleClick() {

    if (item.stock - value <= 0) {
      toast.error("Cannot remove item. Stock is already zero.");
      return;
    }
    else{
    toast(value + " " + item.foodName + "s have been removed");
    await removeFromStock(item.foodName, value);  // Pass the foodName string
    
    onUpdate(item.foodName);
  }}

  return (
    <button
      className="bg-red-600 flex  text-white font-bold px-4 py-2 rounded"
      onClick={handleClick}
    > <span className="hidden md:block"> Remove</span>
      
    </button>
  );
}
