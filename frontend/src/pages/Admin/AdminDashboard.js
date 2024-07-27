import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/auth'
import AdminPanel from '../../components/Layout/AdminPanel'

const AdminDashboard = () => {
    const[auth]=useAuth()
  return (
   <Layout title='dashboard'>
     <div className="container">
        <div className="row center">
            <div className="col-md-4 center">
              <AdminPanel/>
            </div>
            <div className="col-md-6 center">
                <h3>{auth.user.name}</h3>
                <h3>{auth.user.email}</h3>
                <h3>{auth.user.phone}</h3>
                <h3>{auth.user.address}</h3>
            </div>
        </div>
     </div>
   </Layout>
  )
}

export default AdminDashboard