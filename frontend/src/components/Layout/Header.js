import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import { toast } from 'react-toastify'
import SearchInput from './SearchInput'


const Header = () => {
  const[auth,setauth]=useAuth()
  
  const handleLogout=()=>{
    setauth({...auth,user:null,token:''})
    localStorage.removeItem('auth')
    toast.success('Logout successfull')
  }
  return (
    <>
    <nav className="navbar navbar-expand-sm navbar-light  ">
  <div className="container-fluid mx-3 ">
   <div className='d-flex left-content '>
 
<strong><img src='https://cdn-icons-png.flaticon.com/128/14063/14063185.png' width="50px" height="45px"/>KeepShop</strong>
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
       

        <li className="nav-item" >
          <NavLink  style={({isActive})=> isActive ? {borderBottom:"2px solid rgb(114, 233, 122)"}:{}} className="nav-link " aria-current="page" to="/"><h6>Home</h6></NavLink>
        </li>
       
        <li className="nav-item" >
          <NavLink style={({isActive})=> isActive ? {borderBottom:"2px solid rgb(114, 233, 122)"}:{}} className="nav-link " aria-current="page" to="/dashboard/orders"><h6>Orders</h6></NavLink>
        </li>
        <li  className="nav-item" >
        <NavLink  style={({isActive})=> isActive ? {borderBottom:"2px solid green"}:{}} className="nav-link "  aria-current="page" to={`/cart`}><h6>Cart</h6></NavLink>
      </li>
      
     {auth.token? 
       <>
        <li class="nav-item dropdown">
        <Link class="nav-link dropdown-toggle" to="" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {auth.user.name}
        </Link>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
        <NavLink class="dropdown-item"   className="nav-link "  aria-current="page" to={`/dashboard/${auth?.user?.role===1 ? 'admin':''}`}><h6>{auth.user.name}</h6></NavLink>
               
                <NavLink class="dropdown-item" style={({isActive})=> isActive ? {borderBottom:"2px solid green"}:{}} className="nav-link " onClick={handleLogout} aria-current="page" to="/login"><h6>Logout</h6></NavLink>
         </div>
         
      </li>
       
     
       </> :
      <li className="nav-item" >
      <NavLink style={({isActive})=> isActive ? {borderBottom:"2px solid rgb(114, 233, 122)"}:{}} className="nav-link " aria-current="page" to="/login"><h6>Login</h6></NavLink>
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