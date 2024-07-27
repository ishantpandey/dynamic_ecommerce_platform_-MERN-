import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import { useNavigate,NavLink} from 'react-router-dom'; 
import axios from 'axios'
import { toast } from 'react-toastify';

const Register = () => {
    const navigate =useNavigate()
    const [val,setval]=useState({
        names:'',
        email:'',
        phone:'',
        address:'',
        password:''
    })
    const handleEvent=(e)=>{
        const {name,value}=e.target;
        setval({
            ...val,
            [name]:value
        })
     
    }
    const formSubmit=async(e)=>{
         e.preventDefault()
         const{names,email,phone,password,address,answer}=val
         try {
            const userData= await axios.post("http://localhost:8000/auth/api/register",{names,email,phone,password,address,answer});
            
             setval({
                names:'',
                email:'',
                phone:'',
                password:'',
                address:'',
                answer
            })
            console.log(userData);
            if(userData.msg==="false"){
                navigate('/register') 
            }
            else{
                navigate('/login')
                toast.success('Register Successfull')
            }
           
           
         } catch (error) {
            console.log(error);
         }
       
       
        
    }
  return (
    <Layout title='Register'>
 <div className='loginpage'>
           <div class="box">
	<form onSubmit={formSubmit}>
		<span class="text-center">Sign Up</span>
        <div class="input-container">
		<input type="text"ariaDescribedby = "name"  name='names' value={val.names} onChange={handleEvent} required/>
		<label>Full Name</label>		
	</div>
	<div class="input-container">
		<input type="email"ariaDescribedby = "emailHelp" name='email' value={val.email} onChange={handleEvent} required />
		<label>Email</label>		
	</div>
   
    <div class="input-container">
		<input type="text"  name='phone' value={val.phone} onChange={handleEvent} required />
		<label>Phone No.</label>
        </div>
       
	<div class="input-container">		
		<input type="password"  name='password' value={val.password} onChange={handleEvent} required/>
		<label>Password</label>
	</div>
    <div class="input-container">
		<input type="text"  name='address' value={val.address} onChange={handleEvent} required />
		<label>Address</label>
        </div>
        <div class="input-container">
		<input type="text"  name='answer' value={val.answer} onChange={handleEvent} required />
		<label>What is your pet name ?</label>
        </div>
    <div className='register-link'>
    <NavLink htmlFor = "exampleInputEmail1" className="text-light" to={'/login'}><label>Have an account ?</label></NavLink>
              
    </div>
		<button type="submit" class="login-btn">submit</button>
</form>	
</div>
</div>
    </Layout>
  )
}

export default Register