import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'
import axios from 'axios'
import Prices from '../components/Layout/Prices'
import { useNavigate } from 'react-router-dom'


const HomePage = () => {
  const [auth]=useAuth()
  const navigate=useNavigate()
  const[cat,setcat]=useState()
  const[checked,setchecked]=useState([])
  const [radio,setRadio]=useState([])
  const[products,setproducts]=useState([])
  const[total,setTotal]=useState(0)
  const[page,setpage]=useState(1)
  const[loading,setloading]=useState(false)

  //---------------get total item------------
  const getTotal=async(req,res)=>{
    try {
      const {data}=await axios.get("http://localhost:8000/auth/api/product/product-count")
      if(data.success){
        setTotal(data.total)
      }
    } catch (error) {
      
    }
  }
  const getCategory = async()=>{
    try {
      const {data}=await axios.get("http://localhost:8000/auth/api/category/allcategories")
    if(data.success){
      setcat(data.category)
    }
    } catch (error) {
      console.log(error);
    }
  }
  //------------all product----------
  const getAllProduct=async()=>{
    try {
      setloading(true)
        const {data}= await axios.get(`http://localhost:8000/auth/api/product/product-list/${page}`)
        if(data?.success){
          setloading(false)
            setproducts(data.product)
      
       }
       else{
         console.log('somethig goes wrong');
       }  
    } catch (error) {
      console.log(error);  
    }

}
//--------------------load more product---------------
const loadMore=async()=>{
  try {
    setloading(true)
      const {data}= await axios.get(`http://localhost:8000/auth/api/product/product-list/${page}`)
      if(data?.success){
        setloading(false)
          setproducts([...products,...data.product])
   
     }
     else{
       console.log('somethig goes wrong');
     }  
  } catch (error) {
    console.log(error);  
  }

}
  const handleFilter=(value,id)=>{
  let all=[...checked]
 
  if(value){
    all.push(id)
  }
  else{
    all=all.filter((c)=> c !== id)
  }
  setchecked(all)
  }
  //--------------------filtered product----------
  const filteredProduct=async()=>{
    try {
    
      const {data}= await axios.post("http://localhost:8000/auth/api/product/filter-product",{radio,checked})
      if(data?.success){
          setproducts(data.product)
          console.log(data);
     
     }
     else{
       console.log('somethig goes wrong');
     }  
  } catch (error) {
    console.log(error);  
  }
  }
  useEffect(()=>{
    getCategory()
    getTotal()
  },[])
  useEffect(()=>{
    if(!checked.length || !radio.length)getAllProduct()},[])
  useEffect(()=>{
    if(checked.length || radio.length)filteredProduct()},[checked,radio])
  useEffect(()=>{ loadMore()},[page])
  
  return (
    <Layout title='home'>
      <div className="container">
        <div className="row center mt-5">
        
          <div className="col-md-3 center">
            <div>
              {
                cat?.map((val) => {
                  return (
                    <div className='form-check' key={val._id}>
                      
                      <input type='checkbox' className='form-check-input' onChange={(e) => handleFilter(e.target.checked, val._id)} /> <label>{val.names}</label>
                    </div>
                  )
                })
              }
            </div>
            <div className='mt-2 mb-2'>Filter By Price</div>
        
            <div>
              {

                Prices?.map((val) => {
                  return (<div class="form-check" key={val._id}>
                  
                    <input class="form-check-input" type="radio" name="flexRadioDefault" value={val.array} onChange={(e) => setRadio(e.target.value)} />
                    <label class="form-check-label" for="flexRadioDefault1">
                     {val.name} 
                       
                    </label>
                  </div>)
                })
              }
            </div>
            <div><button className='btn btn-warning' onClick={()=>{window.location.reload()}}>Reset</button></div>
          </div>
          <div className="col-md-8 center">
          {products?.length}
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
             <div>
              {products && products.length<total && !checked.length && !radio.length && (
                <button className='btn btn-secondary' onClick={(e)=>{
                  e.preventDefault()
                  setpage(page+1)
                 
                }}>{loading? "Loading..." : "Load More"}</button>
              )}
             </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage