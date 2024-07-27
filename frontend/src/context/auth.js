import axios from "axios";
import { useState,useContext,createContext,useEffect } from "react";

const AuthUser=createContext()

const AuthContext=({children})=>{
    const [auth,setauth]=useState({user:'',token:''})
    axios.defaults.headers.common['Authorization']=auth?.token
    useEffect(()=>{
      const data= localStorage.getItem('auth')
     if(data){
        const parseData=JSON.parse(data)
        setauth({...auth,user:parseData.user,token:parseData.token})
     }
     //eslint-disable-next-line
    },[])
    return(
    <AuthUser.Provider value={[auth,setauth]}>
        {children}
    </AuthUser.Provider>
)}
const useAuth=()=> useContext(AuthUser)
export{useAuth,AuthContext}