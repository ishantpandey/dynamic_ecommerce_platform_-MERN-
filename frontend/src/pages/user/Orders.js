import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserPanel from '../../components/Layout/UserPanel'
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
        <div className="row center">   
          <div className="col-md-10 mx-auto center">
            <h3>orders</h3>
            {
              order.map((val) => {
                return (
                  <div className="row bg-light mt-2">
                    <div className="row mx-auto p-2">Order ID : {val.orderid}</div>
                    <div className="row mx-auto">
                      {
                        val.products.map((p)=>{
                          return(
                            <div className="card mb-1 " style={{ "Width": "80%" }}>
                            <div className="row ">
                              <div className="col-md-4 g-0">
                                <img src={`http://localhost:8000/auth/api/product/productimg/${p._id}`} className="img-fluid start" alt="..." />
                              </div>
                              <div className="col-md-8">
                                <div className="card-body">
                                  <h5 className="card-title">{p.names}</h5>
                                  <p className="card-text">{p.description}</p>
                                  <p className="card-text"><small className="text-body-secondary">Price : {p.price}</small></p>
                                </div>
                              </div>
                            </div>
                          </div>
                          )
                        })
                      }
                      {<p>Address : {val.address}</p>}
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