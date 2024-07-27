import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminPanel = () => {
  return (
    <>
    <div className="center">
        <ul className='list-group'>
            <li className='list-group-item'> <NavLink to='/dashboard/admin/create-category'> create category </NavLink></li>
            <li className='list-group-item'> <NavLink to='/dashboard/admin/create-product'> create product</NavLink></li>
            <li className='list-group-item'> <NavLink to='/dashboard/admin/product'> product</NavLink></li>
            <li className='list-group-item'> <NavLink to='/dashboard/admin/update-product'> update product</NavLink></li>
            <li className='list-group-item'> <NavLink to='/dashboard/admin/users'> Users  </NavLink></li>
           
     
  
        </ul>
    </div>
    </>
  )
}

export default AdminPanel