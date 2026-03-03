import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

/*
Creates a global state for the filter of the pantry items. SearchProvider holds the filter state using useState, 
it is then wrapped around the whole app so each child component can access it by calling useFilter()
*/

export function SearchProvider ({ children}){
    const [search, setSearch] = useState(null);

    return (
        <SearchContext.Provider value={{ search, setSearch}}>
            { children }
        </SearchContext.Provider>
    );
}

export function useSearch(){
    return useContext(SearchContext)
}