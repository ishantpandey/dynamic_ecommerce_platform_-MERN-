import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserPanel from '../../components/Layout/UserPanel'
import { useAuth } from '../../context/auth'

const Dashboard = () => {
  const[auth]=useAuth()
  return (
    <Layout title='user Dashboard'>
      <div className="container">
        <div className="row center">
            <div className="col-md-4 center">
              <UserPanel/>
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

export default Dashboard