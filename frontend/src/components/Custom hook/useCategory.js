import axios from 'axios'
import { useEffect, useState } from 'react'

const useCategory = () => {
    const[category,setCategory]=useState([])
    const getCategory=async()=>{
        try {
            const {data}=await axios.get("http://localhost:8000/auth/api/category/allcategories")
          if(data.success){
            setCategory(data.category)
          }
          } catch (error) {
            console.log(error);
          }
    }
    useEffect(()=>{getCategory()},[])
  return category
}

export default useCategory