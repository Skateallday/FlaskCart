import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

/*
Creates a global state for the filter of the pantry items. FilterProvider holds the filter state using useState, 
it is then wrapped around the whole app so each child component can access it by calling useFilter()
*/

export function FilterProvider ({ children}){
    const [filter, setFilter] = useState(null);

    return (
        <FilterContext.Provider value={{ filter, setFilter}}>
            { children }
        </FilterContext.Provider>
    );
}

export function useFilter(){
    return useContext(FilterContext)
}