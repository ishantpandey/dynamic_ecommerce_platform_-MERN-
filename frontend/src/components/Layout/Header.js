import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import { toast } from 'react-toastify'
import SearchInput from './SearchInput'
import useCategory from '../Custom hook/useCategory'

const Header = () => {
  const[auth,setauth]=useAuth()
  const category = useCategory()
  const handleLogout=()=>{
    setauth({...auth,user:null,token:''})
    localStorage.removeItem('auth')
    toast.success('Logout successfull')
  }
  return (
    <>
    <nav className="navbar navbar-expand-sm navbar-light shadow ">
  <div className="container-fluid mx-3 ">
   <div className='d-flex left-content '>
   {/* <img src={logo} className='logo-img img img-fluid' alt=''/> */}
<strong><h3>Keep Shop</h3></strong>
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
        <li class="nav-item dropdown">
        <Link class="nav-link dropdown-toggle" to="" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          All Category
        </Link>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          {
            category?.map((val)=>{
              return(
                <Link class="dropdown-item" key={val._id} to={`/category/${val.slug}`}>{val.names}</Link>
              )
            })
          }
          
         </div>
         
      </li>

        <li className="nav-item" >
          <NavLink  style={({isActive})=> isActive ? {borderBottom:"2px solid rgb(114, 233, 122)"}:{}} className="nav-link " aria-current="page" to="/">Home</NavLink>
        </li>
       
        <li className="nav-item" >
          <NavLink style={({isActive})=> isActive ? {borderBottom:"2px solid rgb(114, 233, 122)"}:{}} className="nav-link " aria-current="page" to="/dashboard/orders">Orders</NavLink>
        </li>
        <li  className="nav-item" >
        <NavLink  style={({isActive})=> isActive ? {borderBottom:"2px solid green"}:{}} className="nav-link "  aria-current="page" to={`/cart`}>Cart</NavLink>
      </li>
      
     {auth.token? 
       <>
        <li class="nav-item dropdown">
        <Link class="nav-link dropdown-toggle" to="" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {auth.user.name}
        </Link>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
        <NavLink class="dropdown-item"   className="nav-link "  aria-current="page" to={`/dashboard/${auth?.user?.role===1 ? 'admin':''}`}>{auth.user.name}</NavLink>
                {/* <Link class="dropdown-item"  to={`/category/${val.slug}`}></Link> */}
                <NavLink class="dropdown-item" style={({isActive})=> isActive ? {borderBottom:"2px solid green"}:{}} className="nav-link " onClick={handleLogout} aria-current="page" to="/login">Logout</NavLink>
         </div>
         
      </li>
       
     
       </> :
      <li className="nav-item" >
      <NavLink style={({isActive})=> isActive ? {borderBottom:"2px solid rgb(114, 233, 122)"}:{}} className="nav-link " aria-current="page" to="/login">Login</NavLink>
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