import React from 'react'

const FormCategory = ({handleSubmit,names,setNames}) => {
 
  return (
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label" >Add New Category</label>
    <input type="text" className="form-control" value={names}  aria-describedby="" onChange={(e)=> setNames(e.target.value)} required />
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

          
  )
}

export default FormCategory