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
    <NavLink    className="nav-link "  aria-current="page" to={`/dashboard/${auth?.user?.role===1 ? 'admin':'profile'}`}><span class="material-symbols-outlined">
account_circle
</span></NavLink>
  </div>
  <div className='footer-main-lgscreen'>
 
 <div className="row bg-dark text-light mx-auto center p-3">
  <div className="col-md-3 mx-auto text-justify ">
    <img src='https://cdn-icons-png.flaticon.com/128/14063/14063185.png' width="100px" height="90px"/>
  </div>
  <div className="col-md-3 mx-auto text-justify">
  <div class="footer-section quick-links">
      <h4>Quick Links</h4>
      <ul>
        <div className="row">
          <div className="col-md-6" >
          
            <li  ><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/about">About Us</NavLink></li>
            <li><NavLink to="/services">Services</NavLink></li>
            <li><NavLink to="/products">Products</NavLink></li>
            <li><NavLink to="/blog">Blog</NavLink></li>
          </div>
          <div className="col-md-6">
          <li><NavLink to="/contact">Contact Us</NavLink></li>
            <li><NavLink to="/faq">FAQ</NavLink></li>
            <li><NavLink to="/privacy-policy">Privacy Policy</NavLink></li>
            <li><NavLink to="/terms-conditions">Terms & Conditions</NavLink></li>
          </div>
        </div>
        
       
      </ul>
    </div>
  
  </div>
  <div className="col-md-3 mx-auto text-justify">
  <div className="footer-section contact-info">
          <h4>Contact Us</h4>
          <p><strong>KeepShop</strong></p>
          <p>Address: Noida Sector 15</p>
          <p>Phone: <NavLink to="tel:[Your Contact Number]">9695532201</NavLink></p>
          <p>Email: <NavLink to="mailto:[Your Support Email]">ishantpandey2000@gmail.com</NavLink></p>
          <p>Working Hours: Mon-Fri 9:00 AM - 6:00 PM</p>
        </div>
  </div>
 </div>
 </div>
  
   </>
  )
}

export default Footer