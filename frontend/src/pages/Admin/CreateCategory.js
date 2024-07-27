import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminPanel from '../../components/Layout/AdminPanel'
import axios from 'axios'
import FormCategory from '../../components/Layout/FormCategory'
import { toast } from 'react-toastify'
import CategoryModal from '../../components/Layout/CategoryModal'

const CreateCategory = () => {
  const[cat,setcat]=useState([])
  const [names,setNames]=useState()
  const [upval,setupval]=useState()
  const [catId,setcatId]=useState()
  const [showModal,setShowModal]=useState(false)
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
  const handleSubmit=async(e)=>{
    e.preventDefault()
     try {
      
      const {data}=await axios.post("http://localhost:8000/auth/api/category/create-category",{names})
      console.log(data);
      if(data?.success){
        getCategory()
        setNames('')
        toast.success('Created')
      }
     } catch (error) {
      console.log(error);
     }
  }
  const deleteCategory=async(pid)=>{
    try {
      
      const {data}=await axios.delete(`http://localhost:8000/auth/api/category/delete-category/${pid}`)
      console.log(data);
      if(data?.success){
        getCategory()
       
        toast.success('Deleted')
      }
     } catch (error) {
      console.log(error);
     }
  }
  //----------------update-----------------
  const updateCategory=(id,name)=>{
   setcatId(id)
   setupval(name)
   setShowModal(true)
  
  }
  const handleUpdate=async(e)=>{
    e.preventDefault()
     try {
      
      const {data}=await axios.put(`http://localhost:8000/auth/api/category/update-category/${catId}`,{names:upval})
      console.log(data);
      if(data?.success){
        getCategory()
        setupval('')
        setcatId('')
        setShowModal(false)
        toast.success('Updated')
      }
     } catch (error) {
      console.log(error);
     }
   
    setShowModal(false)
  }
  useEffect(()=>{getCategory()},[])
  return (
   <Layout title='create category'>
     <div className="container">
        <div className="row center mt-5">
            <div className="col-md-4 col-4 col-sm-4 center">
              <AdminPanel/>
            </div>
            <div className="col-md-6 col-6 col-sm-6 center">
              <FormCategory handleSubmit={handleSubmit} names={names} setNames={setNames}  />
           <div className='w-60'>
           <table class="table">
  <thead>
    <tr>
      
      <th scope="col">Category</th>
      <th scope="col">Actions</th>
    </tr>
       </thead>
          <tbody>
          {
                  cat?.map((val)=>(
                    <tr key={val._id}>
                    <td>{val.names}</td>
                    
                    <td className='mx-auto'><button onClick={()=>{updateCategory(val._id,val.names)}} className='btn btn-warning'>Edit</button>
                    <button className='btn btn-danger' onClick={()=>{deleteCategory(val._id)}}>Delete</button></td>                   
                   
                  </tr>
                   
                    
                  ) )
                }
   
           </tbody>
        </table>
           </div>
         

            </div>
        </div>
     </div>
     <CategoryModal showModal={showModal} names={upval} setNames={setupval} handleSubmit={handleUpdate}/>
   </Layout>
  )
}

export default CreateCategory