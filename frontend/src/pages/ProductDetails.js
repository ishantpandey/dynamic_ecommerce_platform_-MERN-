import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import {  toast } from 'react-toastify';
import { useCart } from '../context/cartContext';
import Card from './Card';


const ProductDetails = () => {
  const navigate = useNavigate()
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
    <div className="container-fluid">
   <div className="row center  mt-4">
   
     <div className="col-md-6 col-6 ml-3">
     <img src={`http://localhost:8000/auth/api/product/productimg/${product._id}`} className=" img-fluid" width='400px' height='550px' alt="..." />
       
        </div>
     
      
    
     <div className='col-md-5 col-10 mb-2 mt-3 '>
     <div>
     <h4>{product.names}</h4>
     </div>
     <div>
     {product.category?.names}
     </div>
     <div>
     <p>{product.description}</p>
     </div>
     <div>Price : 
      { product.price}
     </div>
     <div className='pt-2'>
     <button className='btn btn-outline-warning pt-2' onClick={()=>{addToCart(product)}} >Add to Cart</button>
     </div>
     
     </div>
   </div>
 </div>

  <div className="container-fluid">
  <div className="row  mt-2 card-product ">
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