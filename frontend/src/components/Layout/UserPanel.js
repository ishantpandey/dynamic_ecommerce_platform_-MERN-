import React from 'react'
import { NavLink } from 'react-router-dom'

const UserPanel = () => {
  return (
    <>
    <div className="center">
        <ul>
            <li> <NavLink to='/dashboard'> DashBoard</NavLink></li>
            <li> <NavLink to='/dashboard/orders'> orders </NavLink></li>
            <li> <NavLink to='/dashboard/profile'> profile</NavLink></li>
           
           
            
        </ul>
    </div>
    </>
  )
}

export default UserPanel