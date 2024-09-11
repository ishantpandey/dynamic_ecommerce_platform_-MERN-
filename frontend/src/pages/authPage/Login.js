import React, { useState } from 'react'
import {  NavLink, useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useAuth } from '../../context/auth';

function Login() {
    
    const navigate = useNavigate()
    const [auth,setauth]=useAuth()
    const [val, setval] = useState({
        
        email: '',
       password: ''
    })
    const handleEvent = (e) => {
        const { name, value } = e.target;
        setval({
            ...val,
            [name]: value
        })

    }
    const formSubmit = async (e) => {
        e.preventDefault()
        const{email,password}=val
        if(password.length>2){
            try {
                const userData= await axios.post("http://localhost:8000/auth/api/login",{email,password});
                
                 setval({
                   
                    email:'',
                    password:'',
                   
                })
               
                if(userData.data.success===true){
                 setauth({...auth,user:userData.data.user,
                     token:userData.data.token
                 })
                 localStorage.setItem('auth',JSON.stringify(userData.data))
                 toast.success('Login succesfull')
                    navigate('/')
                }
                else{
                 navigate('/login')
                }
               
             } catch (error) {
                console.log(error);
             }
        }
        else{
            alert('Password length should be greater then 6 digits')
        }
       


    }
    return (
        <Layout title='login'>
        
    <section className="h-100 gradient-form" style={{backgroundColor: '#eee'}}>
  <div className="container py-3 h-100">
    <div className=" d-flex justify-content-center align-items-center h-100">
     
        <div className="  text-black">
          <div className="row g-0  d-flex justify-content-center  ">
            <div className="col-lg-7 col-12  card-product shadow">
              <div className="card-body  mx-md-4">
                <div className="text-center p-3">
                  <img src="https://cdn-icons-png.flaticon.com/128/16470/16470836.png" style={{width: 165}} alt="logo" />
                  <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                </div>
                <form className='p-3' onSubmit={formSubmit}>
                  <p>Please login to your account</p>
                  <div data-mdb-input-init className="form-outline mb-2">
                    <input type="email" id="form2Example11" className="form-control" placeholder=" email address" ariaDescribedby = "emailHelp" name='email' value={val.email} onChange={handleEvent} required />
                    <label className="form-label" htmlFor="form2Example11">Username</label>
                  </div>
                  <div data-mdb-input-init className="form-outline mb-2">
                    <input type="password" id="form2Example22" className="form-control" name='password' value={val.password} onChange={handleEvent} required placeholder='password' />
                    <label className="form-label" htmlFor="form2Example22">Password</label>
                  </div>
                  <div className="text-center pt-1 mb-3 pb-1">
                    <button type='submit' data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" >Log
                      in</button>
                    <NavLink className="text-muted" to={'/forgetpassword'}>Forgot password?</NavLink>
                  </div>
                  <div className="d-flex align-items-center justify-content-center pb-2">
                    <p className="mb-0 me-2">Don't have an account?</p>
                    <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-danger" onClick={()=>navigate('/register')}>Create new</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-4 col-12   d-flex align-items-center gradient-custom-2">
              <div className="text-white px-3 py-4 p-md-5 mx-md-4 mx-auto">
                <h4 className="mb-4">Looks like you're new here! Sign in with your email address to get started
               </h4>
                <p className="small mb-0"><img src="https://cdn-icons-png.flaticon.com/128/5035/5035247.png" alt="" /></p>
              </div>
            </div>
          </div>
       
      </div>
    </div>
  </div>
</section>

         
        </Layout>
    )
}

export default Login