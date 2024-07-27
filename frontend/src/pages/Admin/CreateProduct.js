import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminPanel from '../../components/Layout/AdminPanel'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const CreateProduct = () => {
  const navigate=useNavigate()
  const[categories,setcategories]=useState()
  const[names,setnames]=useState('')
  const[description,setdescription]=useState('')
  const[price,setprice]=useState()
  const[category,setcategory]=useState('')
  const[quantity,setquantity]=useState()
  const[shipping,setshipping]=useState(true)
  const[photo,setphoto]=useState("")
  const getCategory = async()=>{
    try {
      const {data}=await axios.get("http://localhost:8000/auth/api/category/allcategories")
    if(data.success){
      setcategories(data.category)
    }
    } catch (error) {
      console.log(error);
    }
  }
  //----------------------Add product------------
  const handleSubmit=async(e)=>{
    e.preventDefault()
     try {
      const productData=new FormData()
       productData.append("names",names)
       productData.append("description",description)
       productData.append("price",price)
       productData.append("category",category)
       productData.append("quantity",quantity)
       productData.append("shipping",shipping)
       productData.append("photo",photo)

      console.log('jbhudbf');
      const {data}=await axios.post("http://localhost:8000/auth/api/product/create-product",productData,{headers: {
        "Content-Type": "multipart/form-data",
        
      }})
      console.log(data);
      if(data?.success){
        getCategory()
       
        toast.success('Created')
        setnames("")
        setdescription("")
        setprice("")
        setcategory("")
        setprice("")
        setquantity("")
        setphoto("")
        navigate('/dashboard/admin/product')
      }
      else{
        console.log('somethig goes wrong');
      }
     } catch (error) {
      console.log(error);
     }
  }
  useEffect(()=>{getCategory()},[])
  return (
    <Layout title='create product'>
         <div className="container">
        <div className="row center mt-5">
            <div className="col-md-4 center">
              <AdminPanel/>
            </div>
            <div className="col-md-6 center">
            
               <div className="row ">
                <div className="col-md-6 mx-auto">
                  
               
             <select className="form-select" aria-label="Default select example" onChange={(e)=>setcategory(e.target.value)}>
  <option selected>Select Category</option>
   {
    categories?.map((val,index)=>{
      return  <option key={index} id='option' value={val._id}>{val.names}</option>
      
    })
   }
 
</select>
                </div>
                <div className="col-md-6 mx-auto">
              <div>
 
  <input type="file" className="form-control"  name='photo'  accept='image/*' onChange={(e)=>setphoto(e.target.files[0])} />
</div>

  </div>
 </div>

 
<div className="mx-auto">
    <label for="inputEmail4" class="form-label mt-3">Product Name</label>
    <input type="text" class="form-control" name='names' value={names} onChange={(e)=>setnames(e.target.value)}/>
  </div>
<div>
  
  <label htmlFor="input" className="form-label mt-2">Price</label>
  <input type="number" className="form-control" name='price' value={price} onChange={(e)=>setprice(e.target.value)} />
  <label htmlFor="" className="form-label mt-2">Quantity</label>
  <input type="number" className="form-control" name='quantity' value={quantity} onChange={(e)=>setquantity(e.target.value)} />
  <label htmlFor="" className="form-label mt-2">Shipping</label>
  <select className="form-select" name='shipping' value={shipping} onChange={(e)=>setshipping(e.target.value)} >
    <option value={1}>Yes</option>
    <option value={0}>No</option>
  </select>
  
  <label htmlFor="" className="form-label mt-2">Description</label>
  <textarea type="text" className="form-control" name='textarea' value={description} onChange={(e)=>setdescription(e.target.value)} />
  <label htmlFor="" className="form-label mt-2"></label>
  <input type="submit" onClick={handleSubmit} className="form-control bg-primary text-light" value='Add' />
  
</div>


            </div>
        </div>
     </div>
    </Layout>
  )
}

export default CreateProduct