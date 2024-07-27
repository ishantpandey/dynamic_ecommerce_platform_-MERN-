import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminPanel from '../../components/Layout/AdminPanel'

const Users = () => {
  return (
   <Layout title='users list'>
     <div className="container">
        <div className="row center">
            <div className="col-md-4 center">
              <AdminPanel/>
            </div>
            <div className="col-md-6 center">
               <h3>Users</h3>
            </div>
        </div>
     </div>
   </Layout>
  )
}

export default Users