import React from 'react'
import { useAuth } from '../../context/auth'
import { NavLink } from 'react-router-dom'
const Footer = () => {
  const[auth,setauth]=useAuth()
  return (
   
  <>
  <div className='footer-main'>
  <NavLink  style={({isActive})=> isActive ? {borderBottom:"2px solid rgb(114, 233, 122)"}:{}} className="nav-link " aria-current="page" to="/"><span class="material-symbols-outlined">
other_houses
</span></NavLink>
  <NavLink  style={({isActive})=> isActive ? {borderBottom:"2px solid green"}:{}} className="nav-link "  aria-current="page" to={`/cart`}><span class="material-symbols-outlined">
shopping_cart
</span></NavLink>
    <NavLink style={({isActive})=> isActive ? {borderBottom:"2px solid rgb(114, 233, 122)"}:{}} className="nav-link " aria-current="page" to="/dashboard/orders"><span class="material-symbols-outlined">
inventory_2
</span></NavLink>
    <NavLink    className="nav-link "  aria-current="page" to={`/dashboard/${auth?.user?.role===1 ? 'admin':''}`}><span class="material-symbols-outlined">
account_circle
</span></NavLink>
  </div>
   </>
  )
}

export default Footer