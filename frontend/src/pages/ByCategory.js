import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import {  useParams } from 'react-router-dom'
import Card from './Card'

const ByCategory = () => {
  const {slug}=useParams()
  const[products,setProducts]=useState()
  const[cate,setcate]=useState('')
   
    const byCategory=async()=>{
      const {data} = await axios.get(`http://localhost:8000/auth/api/product/category-product/${slug}`)
     console.log(data);
     
       setProducts(data)
       setcate(data[0]?.category.names)
   
    }
    useEffect(()=>{byCategory()},[slug])
  return (
    <Layout>
         <div className="container-fluid">
        <div className="row center mt-2">
        {<h2>{cate}</h2>}
          <div className="col-md-8 mx-auto mt-2">
          
            <div className="row mx-auto">
              {products?.map((val,id) => {
               
                return (
                
                  
                  <Card key={id} slug={val.slug} pid={val._id} price={val.price}  />
                


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