import React from 'react';


function Searchbar() {
    
    return (
        <input
            type="text"
            placeholder="Search..."
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    onSearch(e.target.value);
                }
            }}
        />
    );
}

export default Searchbar;