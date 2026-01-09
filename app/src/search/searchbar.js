import React from 'react';


function Searchbar() {

function search(formData) {
    const query = formData.get("query");
    alert(`You searched for '${query}'`);
  }
  return (
    <form action={search}>
      <input name="query" placeholder="Apples, bananas, orange..." className="border mx-2 rounded p-2" />
      <button type="submit" className="bg-teal-600 text-white  px-4 py-2 rounded">Search</button>
    </form>
  );
}

export default Searchbar;