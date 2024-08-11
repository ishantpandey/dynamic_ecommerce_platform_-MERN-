import React, { createContext, useContext, useEffect, useState } from 'react'

const cartProduct = createContext()

const CartContext = ({children}) => {
    const [cart,setCart]=useState([])
    useEffect(()=>{
        let item = localStorage.getItem('cart')
        if(item){setCart(JSON.parse(item))}
    },[])
  return (
    <cartProduct.Provider value={[cart,setCart]} >
       {children}
    </cartProduct.Provider>
  )
}
const useCart =()=> useContext(cartProduct)

export default CartContext
export {useCart}