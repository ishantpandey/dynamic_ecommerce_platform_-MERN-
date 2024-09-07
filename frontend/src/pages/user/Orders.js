import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'

import axios from 'axios'

const Orders = () => {
  const [order, setOrder] = useState([])
  const orders = async () => {
    const { data } = await axios.get("http://localhost:8000/auth/api/order/order-page")
    setOrder(data?.order)
   
    
  }
  useEffect(() => {
    orders()
  }, [])
  return (
    <Layout title='orders'>
      <div className="container-fluid">
        <div className="row mt-3 mx-auto"> 
        <div className="col-md-3 col-12 mx-auto mb-5 gx-2 orderpage-filter">
                 <div className='card-product'>
                 <div className='p-3 pb-1 fs-6'style={{fontWeight:'500',fontSize:'16px'}}><h4>Filter</h4></div>
                 <div  style={{display:'flex',flexDirection:'row',justifyContent:'center'}}><h6>ORDER STATUS</h6></div>
                 <hr/>
                  <div className='p-2 ms-3' style={{display:'flex',flexDirection:'row',justifyContent:'start',alignItems:'center'}}>
                    <div><input type="radio" name='radio' /></div>
                    <div className='ms-3'>On The Way</div>
                  </div>
                  <div className='p-2 ms-3' style={{display:'flex',flexDirection:'row',justifyContent:'start',alignItems:'center'}}>
                    <div><input type="radio" name='radio' /></div>
                    <div className='ms-3'>Delivered</div>
                  </div>
                  <div className='p-2 ms-3' style={{display:'flex',flexDirection:'row',justifyContent:'start',alignItems:'center'}}>
                    <div><input type="radio" name='radio' /></div>
                    <div className='ms-3'>Cancelled</div>
                  </div>
                  <div className='p-2 ms-3 pb-3' style={{display:'flex',flexDirection:'row',justifyContent:'start',alignItems:'center'}}>
                    <div><input type="radio" name='radio' /></div>
                    <div className='ms-3 '>Returned</div>
                  </div>
                 
                 </div>
               
                </div>  
          <div className="col-md-8 col-12 mb-5 mx-auto ">
            
            {
              order.map((val) => {
                return (
                  <div className=" ">
                   
                    <div className="row mx-auto">
                      {
                        val.products.map((p)=>{
                          return(
                            <div className="card row card-product mb-1 mx-auto" style={{ "Width": "100%" }}>
                           <div className="container-fluid">
                           <div className="row mx-auto ">
                              <div className="col-md-3 col-4 mx-auto g-0">
                                <img src={`http://localhost:8000/auth/api/product/productimg/${p._id}`}style={{width:'150px',height:'110px'}} className="img-fluid start p-1" alt="..." />
                              </div>
                              <div className="col-md-5 col-8 mx-auto">
                                <div className="card-body"style={{ "Width": "100%" }}>
                                  <h5 className="card-title">{p.names.slice(0,15)}...</h5>
                                  <p className="card-text">{p.description.slice(0,40)}...</p>
                                  <p className="card-text">Address : {val.address.slice(0,30)}...</p>
                                </div>
                              </div>
                              <div className="col-md-2  mt-2 mx-auto"><span className='me-1'>₹</span>{p.price}</div>
                              <div className="col-md-2  mt-2 mx-auto"style={{display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                                <div>Status : <span className='text-success'> Progress</span></div>
                                <div className='m-1 cart-add-more'><button>Cancel</button></div>
                              </div>
                            </div>
                           </div>
                          </div>
                          )
                        })
                      }
                    
                    </div>

                  </div>


                )
              })
            }

          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Orders