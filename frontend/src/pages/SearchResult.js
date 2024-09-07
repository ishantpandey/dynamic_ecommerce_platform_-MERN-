import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/SearchContext'
import { useNavigate } from 'react-router-dom'
import Card from './Card'


const SearchResult = () => {
    const[search,setsearch]=useSearch()
    const navigate=useNavigate()
  return (
    <Layout>
         <div className="container-fluid">
        <div className="row  mt-5">
        
          <div className="col-md-11 mx-auto">
          {search?.result.length}
            <div className="row card-product mx-auto">
              {search.result?.map((val,id) => {
                return (
                  <Card key={id} slug={val.slug} pid={val._id} price={val.price} />


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