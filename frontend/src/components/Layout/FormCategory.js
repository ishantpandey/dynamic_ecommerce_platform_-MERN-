import React from 'react'

const FormCategory = ({handleSubmit,names,setNames,image,setimg}) => {
 
  return (
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label" >Add New Category</label>
    <input type="text" className="form-control" value={names} placeholder='category' aria-describedby="" onChange={(e)=> setNames(e.target.value)} required />
    <input type="text" className="form-control" value={image} placeholder='image-url' aria-describedby="" onChange={(e)=> setimg(e.target.value)} />

  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

          
  )
}

export default FormCategory