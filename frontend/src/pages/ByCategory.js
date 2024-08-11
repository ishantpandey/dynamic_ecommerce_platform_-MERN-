import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const ByCategory = () => {
  const {slug}=useParams()
  const[products,setProducts]=useState()
    const navigate=useNavigate()
    const byCategory=async()=>{
      const {data} = await axios.get(`http://localhost:8000/auth/api/product/category-product/${slug}`)
     
       setProducts(data)
   
    }
    useEffect(()=>{byCategory()},[slug])
  return (
    <Layout>
         <div className="container">
        <div className="row center mt-5">
        
          <div className="col-md-8 mx-auto">
          {console.log(products?.length)}
            <div className="row mx-auto">
              {products?.map((val) => {
                return (
                  // <Link key={val._id} to={`/dashboard/admin/update-product/${val.slug}`}>
                  <div className="card" style={{ width: '15rem' }}>
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
          </div>
        </div>
      </div>
    </Layout>
  )
}


export default ByCategory