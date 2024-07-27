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
    return (
        <Layout title='login'>
         
           <div className='loginpage'>
           <div class="box">
	<form onSubmit={formSubmit}>
		<span class="text-center">login</span>
	<div class="input-container">
		<input type="email"ariaDescribedby = "emailHelp" name='email' value={val.email} onChange={handleEvent} required />
		<label>Email</label>		
	</div>
	<div class="input-container">		
		<input type="password"  name='password' value={val.password} onChange={handleEvent} required/>
		<label>Password</label>
	</div>
    <div className='register-link'>
    <NavLink htmlFor = "exampleInputEmail1" className="text-light" to={'/register'}><label>Create an account ?</label></NavLink>
              
    </div>
    <div className='register-link'>
    <NavLink htmlFor = "exampleInputEmail1" className="text-light" to={'/forgetpassword'}><label>Forget Password ?</label></NavLink>
              
    </div>
		<button type="submit" class="login-btn">submit</button>
</form>	
</div>
</div>
      
         
        </Layout>
    )
}

export default Login