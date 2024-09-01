import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'
// import {  toast } from 'react-toastify';
import axios from 'axios'
import Prices from '../components/Layout/Prices'
import { Link } from 'react-router-dom'
// import { useCart } from '../context/cartContext'
import Carousel from './Carousel'
import Card from './Card'
import useCategory from '../components/Custom hook/useCategory'




const HomePage = () => {
  const [auth]=useAuth()

  const[cat,setcat]=useState()
  const[checked,setchecked]=useState([])
  const [radio,setRadio]=useState([])
  const[products,setproducts]=useState([])
  const[total,setTotal]=useState(0)
  const[page,setpage]=useState(1)
  const[loading,setloading]=useState(false)
  const category = useCategory()


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
  //-----------------add to cart--------
 

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
    <Layout title='home' className='layout'>
      <div className="row">
        <Carousel/>
      </div>
     

<div className="row ">
          <div className="col-md-1 col-2 my-auto mx-auto">
              
            
<div className='select-box'>
<select  onChange={(e) => setRadio(e.target.value)}>
  <option selected>Price</option>
 {
Prices?.map((val) => {
  return (
  <option value={val.array}>{val.name}</option>
  )
  
})
}
<option onClick={()=>{window.location.reload()}}>Reset</option>
 </select>
</div>
 
      
          </div>
          <div className="col-md-11 col-10">
          <div class="horizontal-scroll">
          <div class="horizontal-bar">
          {
            category?.map((val)=>{
              return(
               <div class="item"><Link class="dropdown-item " key={val._id} to={`/category/${val.slug}`}>
                <img src={val.img} className='img img-fluid' alt="" />
                <div>{val.names}</div>
                </Link></div>
                
              )
            })
          }
   
   
</div>

</div>

          {/* {
                cat?.map((val) => {
                  return (
                    <div className='form-check' key={val._id}>
                      
                      <input type='checkbox' className='form-check-input' onChange={(e) => handleFilter(e.target.checked, val._id)} /> <label>{val.names}</label>
                    </div>
                  )
                })
              } */}
          </div>
        </div>

       
          
            
        <div className="container-fluid">
  <div className="row justify-content-center shadow   product-card" style={{ paddingLeft: '0', paddingRight: '0' }}>
    {products?.map((val, id) => (
      <Card key={id} slug={val.slug} pid={val._id} price={val.price} />
    ))}
  </div>
</div>


            
             <div className='loadMore'>
              {products && products.length<total && !checked.length && !radio.length && (
                <button className='btn btn-secondary' onClick={(e)=>{
                  e.preventDefault()
                  setpage(page+1)
                 
                }}>{loading? "Loading..." : <span class="material-symbols-outlined">
                  refresh
                  </span>}</button>
              )}
             </div>
          
     
    </Layout>
  )
}

export default HomePage