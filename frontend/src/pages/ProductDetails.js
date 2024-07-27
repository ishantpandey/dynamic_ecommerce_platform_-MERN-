import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout/Layout'

const ProductDetails = () => {
  const navigate = useNavigate()
    const [product,setProduct]=useState({})
    const [relatedproduct,setRelatedproduct]=useState([])
    const param = useParams()
    const productDetails=async()=>{
        const {data} = await axios.get(`http://localhost:8000/auth/api/product/single-product/${param.slug}`)
        setProduct(data?.result)
        
        relatedProduct(data?.result.category._id)
    }
    const relatedProduct=async(id)=>{
      const {data} = await axios.get(`http://localhost:8000/auth/api/product/related-product/${id}`)
     setRelatedproduct(data)
     console.log(data);
      
    }
    useEffect(()=>{ productDetails()},[param?.slug])
    
  return (
    <Layout>
    <div className="container">
   <div className="row center mt-5">
   
     <div className="col-md-6 col-6 mx-auto">
     <img src={`http://localhost:8000/auth/api/product/productimg/${product._id}`} className=" img-fluid" width='400px' height='500px' alt="..." />
       
        </div>
     
      
    
     <div className='col-md-6 col-6'>
     <div>
     {product.names}
     </div>
     <div>
     {product.category?.names}
     </div>
     <div>
     {product.description}
     </div>
     <div>
     {product.price}
     </div>
     <div>
     {product.shipping}
     </div>
     <button className='btn btn-outline-warning '>Add to Cart</button>
     </div>
   </div>
 </div>

  <div className="row mx-auto mt-3 ">
              {relatedproduct?.map((val) => {
                return (
                  // <Link key={val._id} to={`/dashboard/admin/update-product/${val.slug}`}>
                  <div className="card mx-auto" style={{ width: '15rem' }}>
                    <img src={`http://localhost:8000/auth/api/product/productimg/${val._id}`} className="card-img-top img-fluid" alt="..." />
                    <div className="card-body">
                      {val.names}
                      <p className="card-text">{val.description}</p>
                      <div>Price {val.price}</div>
                      <div>Price {val.category.names}</div>
                      
                    </div>
                    <div className='card-footer d-flex'>
                      <button className='btn btn-outline-secondary me-2' onClick={()=>{navigate(`/product-details/${val.slug}`)}}>More Details</button>
                      <button className='btn btn-outline-warning '>Add to Cart</button>
                    </div>
                  </div>
                  // </Link>


                )
              })}
            </div>

</Layout>
  )
}

export default ProductDetails