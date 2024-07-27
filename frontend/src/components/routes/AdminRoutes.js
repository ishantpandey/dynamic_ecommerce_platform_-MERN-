import React,{useState,useEffect} from 'react'
import { useAuth } from '../../context/auth'
import { Outlet } from 'react-router-dom'
import Spinner from '../../pages/Spinner'
import axios from 'axios'

const AdminRoutes = () => {
    const[auth,setauth]=useAuth()
    const[ok,setok]=useState(false)
  
   
    useEffect(()=>{
        const authCheck=async()=>{
            
            const res=await axios.get('http://localhost:8000/auth/api/auth-user')
        if(res.data.ok){  
            setok(true)
        }
        else{
            setok(false)
        }}
        if(auth?.token){authCheck()}
        
    },[auth?.token])
   
  return  ok? <Outlet/> : <Spinner/> 
  
}

export default AdminRoutes