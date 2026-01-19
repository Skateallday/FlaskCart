import { toast } from 'react-toastify';
import { removeFromStock } from '../config/api';

export default function RemoveButton({ item, onUpdate }) {
  async function handleClick() {

    if (item.stock <= 0) {
      toast.error("Cannot remove item. Stock is already zero.");
      return;
    }
    else{
    toast(item.foodName + " has been removed");
    await removeFromStock(item.foodName);  // Pass the foodName string
    
    onUpdate(item.foodName);
  }}

  return (
    <button
      className="bg-red-600 w-full text-white font-bold px-4 py-2 rounded"
      onClick={handleClick}
    >
        Remove
    </button>
  );
}
