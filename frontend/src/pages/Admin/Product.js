import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminPanel from '../../components/Layout/AdminPanel'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Product = () => {
    const[products,setproducts]=useState([])
    const getAllProduct=async()=>{
        try {
            const {data}= await axios.get("http://localhost:8000/auth/api/product/allproduct")
            if(data?.success){
                setproducts(data.product)
           
           }
           else{
             console.log('somethig goes wrong');
           }  
        } catch (error) {
          console.log(error);  
        }
  
    }
    useEffect(()=>{getAllProduct()},[])
  return (
    <Layout title='create category'>
     <div className="container">
        <div className="row center mt-5">
            <div className="col-md-3 col-4 col-sm-4 center">
              <AdminPanel/>
            </div>
            <div className="col-md-8 col-6 col-sm-6 center">
             <div className="row d-flex">
             {products?.map((val)=>{
            return(
             <div className='col-md-4 mx-auto'>
               <Link key={val._id} to={`/dashboard/admin/update-product/${val.slug}`}>
               <div className="card" style={{width: '18rem'}}>
  <img src={`http://localhost:8000/auth/api/product/productimg/${val._id}`} className="card-img-top img-fluid" alt="..." />
  <div className="card-body">
  {val.names}
    <p className="card-text">{val.description.slice(1,35)}...</p>
  </div>
</div>
              </Link>
             </div>
           

            )
})}
              </div>  
             
     </div>
     
     </div>
     </div>
   </Layout>
  )
}

export default Product