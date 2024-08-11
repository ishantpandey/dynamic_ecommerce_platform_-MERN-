import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/SearchContext'
import { useNavigate } from 'react-router-dom'


const SearchResult = () => {
    const[search,setsearch]=useSearch()
    const navigate=useNavigate()
  return (
    <Layout>
         <div className="container">
        <div className="row  mt-5">
        
          <div className="col-md-8 mx-auto">
          {search?.result.length}
            <div className="row mx-auto">
              {search.result?.map((val) => {
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

export default SearchResult