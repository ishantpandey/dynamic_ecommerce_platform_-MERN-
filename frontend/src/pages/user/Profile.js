import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const Profile = () => {
  const[auth,setauth]=useAuth()
  const [submitBtn,setSubmitBtn]=useState(false)
  const[update,setUpdate]=useState({
    name:auth.user.name,
    email:auth.user.email,
    address:auth.user.address,
    phone:auth.user.phone
  })
  const updateUserData=(e)=>{
 const{name,value}=e.target;
 setUpdate((prev)=>{
 return  {...prev,[name]:value}
 })
  }
  const submitUserUpdateData=async()=>{
    const{name,email,address,phone}=update
    const {data}=await axios.post("http://localhost:8000/auth/api/update-user-data",{name,email,address,phone})
    console.log(data);
    localStorage.setItem('auth',JSON.stringify({...auth,user:data.user}))
    setauth({...auth,user:data.user})
    setSubmitBtn(false)
  }
  useEffect(()=>{
    const data= localStorage.getItem('auth')
   if(data){
      const parseData=JSON.parse(data)
      setauth({...auth,user:parseData.user,token:parseData.token})
      
   }
   
  },[])
  
  const navigate=useNavigate()
  const handleLogout=()=>{
    setauth({...auth,user:null,token:''})
    localStorage.removeItem('auth')
    toast.success('Logout successfull')
    navigate('/login')
   
  }
  return (
    <Layout title='profile'>
      <div className="container-fluid">
           
           <div className="row  mt-3 profile-page-reverse-order">
               <div className="col-md-3 mb-2  col-12 mx-auto ">
               <div className="row mb-2 card-product shadow" style={{borderRadius:'2px'}}>
                
                 <div className=' p-3'style={{display:'flex',flexDirection:'row',justifyContent:"start",alignItems:'center'}} >
                  <div><img src="https://cdn-icons-png.flaticon.com/128/17246/17246491.png" alt="" height="60px" width='60px' /></div>
                  <div className='ms-3 fs-4'>{auth.user.name}</div>
                  </div> 

             </div>
                 <div className='row pt-4 card-product shadow' style={{borderRadius:'2px'}}>
                
                 <div className="col-md-12 col-11 mx-auto profile-page  "style={{cursor:'pointer'}}>
                  <h6 onClick={()=>navigate('/dashboard/orders')}>My Orders</h6>
  
                   <hr></hr>
                   </div>
                   <div className="col-md-12 col-11 mx-auto  profile-page " style={{cursor:'pointer'}}>
                  <h6 onClick={()=>navigate('/cart')}>My Cart</h6>
  
                   <hr></hr>
                   </div>
                   <div className="col-md-12 col-11 mx-auto profile-page  "style={{cursor:'pointer'}}>
                  <h6>My Wishlist</h6>
  
                   <hr></hr>
                   </div>
                 
                   <div className="col-md-12 col-11 mx-auto profile-page  "style={{cursor:'pointer'}}>
                  <h6 onClick={()=>navigate('/forgetpassword')}>Change Password</h6>
  
                   <hr></hr>
                   </div>
                   <div className="col-md-12 col-11 mx-auto profile-page  "style={{cursor:'pointer'}}>
                  <h6 onClick={handleLogout}>Logout</h6>
  
                   <hr></hr>
                   </div>
             
               </div>
               
               <div className="row shadow card-product" style={{borderRadius:'2px'}}>
                 <div className="cart-add-more p-3">
                 <button onClick={()=>navigate('/')} >Home</button> 
                 </div>
               
             </div>
               
               </div>
             
                <div className="col-md-8 col-12 card-product shadow mx-auto mb-5 gx-2">
                <div className=' ' style={{borderRadius:'2px'}}>
                <div className='p-3 pb-1 'style={{fontWeight:'500',fontSize:'22px'}}>Personal Information</div>
                 <hr/>
                 <div className='p-2 pt-1 ms-3' style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                   <div>Name</div>
                   <div className='me-3'>{submitBtn ? <input type='text' name='name' value={update.name} onChange={updateUserData}/>:auth.user.name}</div>
                 </div>
                 <div className='p-2 ms-3' style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                   <div>Email</div>
                   <div className='me-3'>{submitBtn ? <input type='text' name='email' value={update.email} onChange={updateUserData}/>:auth.user.email}</div>
                 </div>
                 <div className='p-2 ms-3' style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                   <div>Address</div>
                   <div className='me-3'>{submitBtn ? <input type='text' name='address' value={update.address} onChange={updateUserData}/>:auth.user.address}</div>
                 </div>
                 <div className='p-2 ms-3' style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                   <div>Phone Number</div>
                   <div className='me-3'>{submitBtn ? <input type='text' name='phone' value={update.phone} onChange={updateUserData}/>:auth.user.phone}</div>
                 </div>
                 
                 
                 <div className='p-2 ms-3' style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                   <div className='fs-5'></div>
                   <div className='me-3'>
                   
          
               <div className='mb-1 cart-payment-btn'>
                {
                  submitBtn? <button className='btn btn-primary' onClick={submitUserUpdateData}>Submit</button>: <button className='btn btn-primary'onClick={()=>setSubmitBtn(true)}  >Edit Profile</button>
                }
                
               </div>
              
                   </div>
                 </div>
                 <p className='p-4'>
                   <div style={{fontWeight:'500',fontSize:'18px'}}>FAQs</div>
<div className='mb-2 mt-3' style={{fontWeight:'500',fontSize:'16px'}}>What happens when I update my email address (or mobile number)?</div>
Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).


<div className='mb-2 mt-3' style={{fontWeight:'500',fontSize:'16px'}}>When will my KeepShop account be updated with the new email address (or mobile number)?</div>
It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.

<div className='mb-2 mt-3' style={{fontWeight:'500',fontSize:'16px'}}>What happens to my existing KeepShop account when I update my email address (or mobile number)?</div>

Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.

<div className='mb-2 mt-3' style={{fontWeight:'500',fontSize:'16px'}}>Does my Seller account get affected when I update my email address?</div>

KeepShop has a 'single sign-on' policy. Any changes will reflect in your Seller account also.
                   </p>
                </div>
              
               </div> 
             
                            
           </div>
       </div>
    </Layout>
  )
}

export default Profile