import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({slug,pid,price}) => {
  return (
<div className='col-md-3  col-5 mx-auto product-card '>
  <div className='mx-auto' style={{ display: 'flex',flexDirection:'row', justifyContent: 'center' }}>
    <Link className='product-main' to={`/product-details/${slug}`}>
      <div className="product">
        <img 
          src={`http://localhost:8000/auth/api/product/productimg/${pid}`} 
          className="product-img" 
          alt="Product Image" 
        />
        <div>Price {price}</div>
      </div>
    </Link>
  </div>
</div>

  )
}

export default Card