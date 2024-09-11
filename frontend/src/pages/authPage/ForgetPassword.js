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
         
           {/* <div className='loginpage'>
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
</div> */}

<section className="h-100 gradient-form" >
  <div className="container py-5 h-100">
    <div className=" d-flex justify-content-center align-items-center h-100">
     
        <div className="  text-black">
          <div className="row g-0  d-flex justify-content-center  ">
            <div className="col-lg-7 col-12  card-product shadow">
              <div className="card-body  mx-md-4">
               
                <form className='p-3' onSubmit={formSubmit}>
                  <p className='fs-5'>Set New Password</p>
                
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input type="email" id="form2Example11" className="form-control" placeholder=" email address" ariaDescribedby = "emailHelp"  name='email' value={val.email} onChange={handleEvent} required />
                    
                  </div>
                 
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input type="text" id="form2Example11" className="form-control" placeholder="What is your pet name ?" name='answer' value={val.answer} onChange={handleEvent} required/>
                    
                  </div>
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input type="password" id="form2Example22" className="form-control" placeholder='new password' name='newpassword' value={val.newpassword} onChange={handleEvent} required />
                   
                  </div>
                  <div className="text-center pt-1 mb-3 pb-1">
                    <button type='submit' data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-2" >Sign
                      up</button>
                   
                  </div>
                  <div className="d-flex align-items-center justify-content-center pb-2">
                    <p className="mb-0 me-2"> Have an account?</p>
                    <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-danger" onClick={()=>navigate('/login')}>Login</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-4 col-12   d-flex align-items-center gradient-custom-2">
              <div className="text-white px-3 py-4 p-md-5 mx-md-4 mx-auto">
                <h4 className="mb-4">Looks like you're new here! Sign up with your email address to get started
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

export default ForgetPassword