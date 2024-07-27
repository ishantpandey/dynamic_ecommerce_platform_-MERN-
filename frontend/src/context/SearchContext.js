
import { useState,useContext,createContext } from "react";

const SearchProduct=createContext()

const SearchContext=({children})=>{
    const [search,setsearch]=useState({keyword:'',result:[]})

    return(
    <SearchProduct.Provider value={[search,setsearch]}>
        {children}
    </SearchProduct.Provider>
)}
const useSearch=()=> useContext(SearchProduct)
export{useSearch,SearchContext}