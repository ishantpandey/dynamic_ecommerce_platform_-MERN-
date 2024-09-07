import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import { toast } from 'react-toastify'
import SearchInput from './SearchInput'


const Header = () => {
  const[auth,setauth]=useAuth()
  

  return (
    <>
    <nav className="navbar navbar-expand-sm navbar-light  ">
  <div className="container-fluid mx-3 ">
   <div className='d-flex left-content '>
 
<strong className='text-success'><img src='https://cdn-icons-png.flaticon.com/128/14063/14063185.png' width="50px" height="45px"/>KeepShop</strong>
   </div>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="mynavbar">
      <div className="navbar-nav me-auto">
       
      </div>
     
      <div className="d-flex ">
        <ul className='navbar-nav'>
        <li className="nav-item me-5" >
         <SearchInput/>
        </li>
       

        <li className="nav-item me-1" >
          <NavLink  style={({isActive})=> isActive ? {borderBottom:"2px solid rgb(114, 233, 122)"}:{}} className="nav-link " aria-current="page" to="/"><span style={{fontWeight:'500'}}>Home</span></NavLink>
        </li>
        <li  className="nav-item me-1" >
        <NavLink  style={({isActive})=> isActive ? {borderBottom:"2px solid green"}:{}} className="nav-link "  aria-current="page" to={`/cart`}><span style={{fontWeight:'500'}}>Cart</span></NavLink>
      </li>
      <li className="nav-item me-1" >
          <NavLink style={({isActive})=> isActive ? {borderBottom:"2px solid rgb(114, 233, 122)"}:{}} className="nav-link " aria-current="page" to="/dashboard/orders"><span style={{fontWeight:'500'}}>Orders</span></NavLink>
        </li>
      
     {auth.token? 
       <>
        <li class="nav-item  font-weight-bold me-1">
       
        <NavLink style={({isActive})=> isActive ? {borderBottom:"2px solid rgb(114, 233, 122)"}:{}}   className="nav-link "  aria-current="page" to={`/dashboard/${auth?.user?.role===1 ? 'admin':'profile'}`}><span style={{fontWeight:'500'}}>{auth.user.name}</span></NavLink>
      </li>
       
     
       </> :
      <li className="nav-item" >
      <NavLink style={({isActive})=> isActive ? {borderBottom:"2px solid rgb(114, 233, 122)"}:{}} className="nav-link " aria-current="page" to="/login"><span>Login</span></NavLink>
    </li> 
}
     
        </ul>
      </div>
    </div>
  </div>
</nav>

    </>
  )
}

export default Header