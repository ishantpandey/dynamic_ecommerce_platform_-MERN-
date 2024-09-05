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
            <div className="row my-auto mx-auto ">
                <div className='col-md-10 col-10 p-3 '>
                    <div className='mx-auto' >Total {cart.length} item in  your cart</div>
                </div>
            </div>
            <div className="row mx-auto">
                <div className="col-md-8 col-10 mx-auto pb-2">
                  <div className='row'>
                {cart?.map((val,ind) => {
                return (
                  // <Link key={val._id} to={`/dashboard/admin/update-product/${val.slug}`}>
                 <>
                  <div className="col-md-4 col-11 mx-auto ">
                  <div className="card" key={ind} style={{ width: '15rem' }}>
                    <img src={`http://localhost:8000/auth/api/product/productimg/${val._id}`} className="card-img-top img-fluid" alt="..." />
                    <div className="card-body">
                      {val.names}
                      <p className="card-text">{val.description.slice(1,28)}</p>
                      <div>Price {val.price}</div>
                     
                      
                    </div>
                    <div className='card-footer d-flex'>
                      <button className='btn btn-outline-secondary me-2' onClick={()=>{navigate(`/product-details/${val.slug}`)}}>More Details</button>
                      <button className='btn btn-outline-warning ' onClick={()=>{deleteFromCart(ind)}} >Delete</button>
                    </div>
                  </div>
                  </div>
                 </>
                  // </Link>


                )
              })}  
                </div>
                </div>
              {
                 <div className="col-md-4 col-10 mx-auto bg-light pt-3">
                  <div className='pt-1'>Total Amount : {amount}</div>
                  <div className='pt-1 pb-1'>Address</div>
                  <textarea className='form-control mb-2 pb-3' placeholder='Street/City/State/PinCode' value={address} onChange={(e)=>{setAddress(e.target.value)}} required/>
                  {
                auth?.user? ( <div className='mt-3 mb-5'>
                 
                  <button className='btn btn-primary' disabled={!address|| !amount} onClick={()=>handlePayment()}>Make Payment</button>
                </div>)
                :(<button className='btn btn-outline-primary' onClick={()=>{navigate('/login',{state:'/cart'})}}>Login to Proceed</button>) 
                    }
               
                </div> 
              }
                             
            </div>
        </div>
    </Layout>
  )
}
export default Cart