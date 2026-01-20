
import { useSearch } from "../context/searchContext";

function Searchbar( ) {


  /* Imports useSearch, creates a handleChange to track users typing in input field,
   have used pipe characters in the value field to create a controlled input field,
   onChange triggers each time a character is pressed.
   */

  const { search , setSearch } = useSearch();

  const handleChange = (event) =>{
    setSearch(event.target.value)
  }
  
  return (

      <input 
        name="query" 
        placeholder="Apples, bananas, orange..." 
        className="border mx-2 rounded p-2" 
        value={search || ''}
        onChange={handleChange}
      />

  );
}

export default Searchbar;