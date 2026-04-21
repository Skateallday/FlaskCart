import Sidebar from "../sidebar/sidebar";
import GetInventory from "./getinventory";

import { SearchProvider } from '../context/searchContext';

export default function DisplayInvent() {
  return (
    <div className="flex">
      <div className="w-1/6">
        <Sidebar />
      </div>
      <div className="w-5/6">
        <SearchProvider>
            <GetInventory/>
        </SearchProvider>
      </div>
    </div>
  );
}