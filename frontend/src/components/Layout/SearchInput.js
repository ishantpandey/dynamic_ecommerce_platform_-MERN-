import React from 'react'
import { useSearch } from '../../context/SearchContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SearchInput = () => {
    const navigate=useNavigate()
    const [search,setsearch]=useSearch("")
    const handleSearch=async(e)=>{
        e.preventDefault()
        const {data} = await axios.get(`http://localhost:8000/auth/api/product/search/${search.keyword}`)
        setsearch({...search,result:data})
        navigate('/search-result')
    }
  return (
    <div>
        <form onSubmit={handleSearch} className='d-flex' role='search'>
            <input className='form-control me-2' placeholder='Search' type="search" aria-label='Search' value={search.keyword} onChange={(e)=>setsearch({...search,keyword:e.target.value})}/>
            <button className='btn btn-outline-success' type='submit'>Search</button>
        </form>
    </div>
  )
}

export default SearchInput