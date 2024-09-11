import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/auth'

const AdminPanel = () => {
  const navigate=useNavigate()
  const[auth,setauth]=useAuth()
  const handleLogout=()=>{

    setauth({...auth,user:null,token:''})
    localStorage.removeItem('auth')
    toast.success('Logout successfull')
    navigate('/login')
   
  }
  return (
    <>
    <div className="center">
        <ul className='list-group'>
            <li className='list-group-item'> <NavLink to='/dashboard/admin/create-category'> create category </NavLink></li>
            <li className='list-group-item'> <NavLink to='/dashboard/admin/create-product'> create product</NavLink></li>
            <li className='list-group-item'> <NavLink to='/dashboard/admin/product'> product</NavLink></li>
            <li className='list-group-item'> <NavLink to='/dashboard/admin/update-product'> update product</NavLink></li>
            <li className='list-group-item' onClick={handleLogout} style={{cursor:'pointer'}}> logout</li>
            
            

        </ul>
    </div>
    </>
  )
}

export default AdminPanel