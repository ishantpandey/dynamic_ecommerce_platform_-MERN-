import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/cartContext'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth'

import axios from 'axios'

const Cart = () => {
const navigate=useNavigate()
const[address,setAddress]=useState('')
const[amount,setamount]=useState()
const [cart,setCart]=useCart()
const[auth]=useAuth()
const[payment,setPayment]=useState()

const deleteFromCart=(index)=>{
    let myCart = [...cart]
  const remainItem=myCart.filter((val,ind)=>index !== ind)
  setCart(remainItem)
  localStorage.setItem('cart',JSON.stringify([...remainItem])) 
}
const totalAmount=()=>{
    let total=0;
   cart?.map((val)=>total=total+val.price)
   setamount(total) 
  }

  //------------------------handle Payment-----------
  const handlePayment=async()=>{
    const {data} = await axios.get("http://localhost:8000/auth/api/order/getkey")
  const {data:{order}} = await axios.post("http://localhost:8000/auth/api/order/checkout",{amount})

  
  const options = {
    "key": data.key, // Enter the Key ID generated from the Dashboard
    "amount": order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Ishant Pandey",
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    // "callback_url": "http://localhost:8000/auth/api/order/payment_varification",
    "handler": async function (response){
    const razorpay_payment_id= await response.razorpay_payment_id
     const razorpay_order_id= await response.razorpay_order_id
     const razorpay_signature= await response.razorpay_signature
     const userid=auth.user.id
    const {data}=   await axios.post("http://localhost:8000/auth/api/order/payment_varification",{razorpay_payment_id,razorpay_order_id,razorpay_signature,userid,cart,address})
     setPayment(data.success)
  },
    "prefill": {
        "name": auth.user.name,
        "email": auth.user.email,
        "contact": auth.user.phone
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
};


 const razor = new window.Razorpay(options);

     razor.open();

  }
  useEffect(()=>{
    if(payment===true){
      localStorage.removeItem('cart')
     setCart([])
     navigate('/dashboard/orders')
    }
    else{
      navigate('/cart') 
    }
  },[payment])
  
 useEffect(()=>{totalAmount()},[cart])
  return (
    <Layout title='cart'>
      
        <div className="container">
           
            <div className="row  mt-3">
                <div className="col-md-7 mb-2  col-12 mx-auto ">
                <div className="row mb-2 card-product shadow" style={{borderRadius:'2px'}}>
                  <div className="cart-add-more p-3">
                  <div className='mx-auto fs-5' >Total {cart.length} Item In  Your Cart</div> 
                  </div>
                
              </div>
                 
                  <div className='row pt-4 card-product shadow' style={{borderRadius:'2px'}}>
                {cart?.map((val,ind) => {
                return (
                  
                 <>
                  <div className="col-md-12 col-11 mx-auto  ">
                   
                    <div className="row">
                      <div className="col-md-3 col-6 mx-auto ">
                      <img src={`http://localhost:8000/auth/api/product/productimg/${val._id}`} style={{width:'170px',height:'130px'}} className="card-img-top img-fluid" alt="..." />
                      </div>
                      <div className="col-md-4 col-6 mx-auto">
                      <div className="" >
                        <div style={{fontWeight:'400',fontSize:'18px'}}>
                        {val.names}
                        </div>
                    
                      <p className=""style={{fontWeight:'400',fontSize:'15px'}}>{val.description.slice(1,38)}...</p>
                      <div className='mb-1' style={{fontWeight:'500',fontSize:'18px'}}>Price {val.price}</div>
                      </div>
                      </div>
                      <div className="col-md-4 col-10 mx-auto gx-1">
                      <div className=' d-flex'>
                      <button className='btn btn-outline-secondary me-2' onClick={()=>{navigate(`/product-details/${val.slug}`)}}>More Details</button>
                      <button className='btn btn-outline-danger ' onClick={()=>{deleteFromCart(ind)}} >Delete</button>
                      
                    </div>
                      </div>
                      
                    </div>
                    <hr></hr>
                    </div>
                   
                 </>
                )
              })} 
              
                </div>
                
                <div className="row shadow card-product" style={{borderRadius:'2px'}}>
                  <div className="cart-add-more p-3">
                  <button onClick={()=>navigate('/')}>Add More</button> 
                  </div>
                
              </div>
                
                </div>
              
                 <div className="col-md-4 col-12 mx-auto mb-5 gx-0">
                 <div className='card-product shadow' style={{borderRadius:'2px'}}>
                 <div className='p-3 pb-1 fs-6'style={{fontWeight:'500',fontSize:'16px'}}>Price Details</div>
                  <hr/>
                  <div className='p-2 ms-3' style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <div>Prices ({cart.length} items)</div>
                    <div className='me-3'> {amount}</div>
                  </div>
                  <div className='p-2 ms-3' style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <div>Platform Fees</div>
                    <div className='me-3'> 5</div>
                  </div>
                  <div className='p-2 ms-3' style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <div>Delivery Charges</div>
                    <div className=''> <del className='me-3'>40 </del> <span className='text-success fs-6 me-3'> Free</span></div>
                  </div>
                  <div className='p-2 ms-3' style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <div>Total Amount</div>
                    <div className='me-3'> {amount}</div>
                  </div>
                  
                  <div className='p-2 pb-1 ms-3'>Address</div>
                  <textarea className='form-control mb-2 pb-3' placeholder='Street/City/State/PinCode' value={address} onChange={(e)=>{setAddress(e.target.value)}} required/>
                  <div className='p-2 ms-3' style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <div className='fs-5'><span className='me-1'>₹</span>{amount+5}</div>
                    <div className='me-3'>
                    {
                auth?.user? ( 
                <div className='mb-1 cart-payment-btn'>
                 
                  <button className='btn btn-primary' disabled={!address|| !amount || address.length<25} onClick={()=>handlePayment()}>Make Payment</button>
                </div>)
                :(<button className='btn btn-outline-primary' onClick={()=>{navigate('/login',{state:'/cart'})}}>Login to Proceed</button>) 
                    }
                    </div>
                  </div>
                 
                 </div>
               
                </div> 
              
                             
            </div>
        </div>
    </Layout>
  )
}
export default Cart