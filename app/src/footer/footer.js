import React from 'react';
import Quicklinks from './quicklinks/quicklinks';
import Searchbar from './search/searchbar';


function Footer() {
    
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

export default Footer;