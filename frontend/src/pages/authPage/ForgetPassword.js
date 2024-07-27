import React, { useState } from 'react'
import {  NavLink, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';




function ForgetPassword() {
    
    const navigate = useNavigate()
   
    const [val, setval] = useState({
        
        email: '',
        answer:'',
       newpassword: ''
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
        const{email,answer,newpassword}=val
        try {
           const userData= await axios.post("http://localhost:8000/auth/api/forget-password",{email,answer,newpassword});
           
            setval({
              
               email:'',
               answer:'',
               newpassword:'',
              
           })
          
           if(userData.data.success===true){
          
               navigate('/login')
           }
           else{
            navigate('/forgetpassword')
           }
          
        } catch (error) {
           console.log(error);
        }


    }
    return (
        <Layout title='forget paasword'>
         
           <div className='loginpage'>
           <div class="box">
	<form onSubmit={formSubmit}>
		<span class="text-center">Reset Password</span>
	<div class="input-container">
		<input type="email"ariaDescribedby = "emailHelp" name='email' value={val.email} onChange={handleEvent} required />
		<label>Email</label>		
	</div>
    <div class="input-container">		
		<input type="text"  name='answer' value={val.answer} onChange={handleEvent} required/>
		<label>What is your pet name ?</label>
	</div>
	<div class="input-container">		
		<input type="password"  name='newpassword' value={val.newpassword} onChange={handleEvent} required/>
		<label>New Password</label>
	</div>
    <div className='register-link'>
    <NavLink htmlFor = "exampleInputEmail1" className="text-light" to={'/register'}><label>Create an account ?</label></NavLink>
              
    </div>
   
		<button type="submit" class="login-btn">submit</button>
</form>	
</div>
</div>
      
         
        </Layout>
    )
}

export default ForgetPassword