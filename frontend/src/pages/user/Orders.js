import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserPanel from '../../components/Layout/UserPanel'

const Orders = () => {
  return (
    <Layout title='orders'>
       <div className="container">
        <div className="row center">
            <div className="col-md-4 center">
              <UserPanel/>
            </div>
            <div className="col-md-6 center">
                <h3>orders</h3>
                
            </div>
        </div>
     </div>
    </Layout>
  )
}

export default Orders