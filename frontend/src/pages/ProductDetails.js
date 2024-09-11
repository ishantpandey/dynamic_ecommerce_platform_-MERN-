import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import {  toast } from 'react-toastify';
import { useCart } from '../context/cartContext';
import Card from './Card';
import { useAuth } from '../context/auth';


const ProductDetails = () => {
  const navigate = useNavigate()
  const[auth,setauth]=useAuth()
    const [product,setProduct]=useState({})
    const [relatedproduct,setRelatedproduct]=useState([])
    const [cart,setCart]=useCart()
    const param = useParams()
    const productDetails=async()=>{
        const {data} = await axios.get(`http://localhost:8000/auth/api/product/single-product/${param.slug}`)
        setProduct(data?.result)
        console.log(data);
        
        relatedProduct(data?.result.category._id)
    }
    const relatedProduct=async(id)=>{
      const {data} = await axios.get(`http://localhost:8000/auth/api/product/related-product/${id}`)
     setRelatedproduct(data)
     console.log(data);
      
    }
    const addToCart=(val)=>{
      setCart([...cart,val])
      localStorage.setItem('cart',JSON.stringify([...cart,val]))
      toast.success('Item Added')
   }
    useEffect(()=>{ productDetails()},[param?.slug])
    
  return (
    <Layout>
    <div className="container">
   <div className="row center card-product shadow mt-4">
   
     <div className="col-md-6 col-8 ml-3 mt-4 mx-auto">
     <img src={`http://localhost:8000/auth/api/product/productimg/${product._id}`} className=" img-fluid" width='400px' height='550px' alt="..." />
       
        </div>
     
      
    
     <div className='col-md-5 col-10 mb-2 mt-3 mx-auto'>
     <div>
     <h4>{product.names}</h4>
     </div>
     <div className='h6'>Category : 
     {product.category?.names}
     </div>
     <div>
      {
        product.description?.split(',').slice(0,4).map((p,i)=><p><li>{p}</li></p>)
      }
     
     </div>
     <div className="row p-2 "  >
     <div className='col-md-12 col-12' style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
     <div className='fs-5 fw-bold text-success'>Price : <span className='ms-2 '> { product.price}</span>
     
     </div>
     <div className=''>
     <button className='btn btn-warning pt-2' onClick={()=>{addToCart(product)}} >Add to Cart</button>
     </div>
     </div>
     </div>
     
     
     </div>
   </div>
 </div>

  <div className="container-fluid">
  <div className="row  mt-2 card-product  ">
    <div className='p-3'><h3>Looking for more</h3></div>
              {relatedproduct?.map((val,id) => {
                return (
                 
                  <Card key={id} slug={val.slug} pid={val._id} price={val.price} />

                )
              })}
            </div>
  </div>

</Layout>
  )
}

export default ProductDetails