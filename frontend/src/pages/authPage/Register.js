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
         if(phone.length>10 || phone.length<10){
             alert('Enter valid Phone Number')
         }
         else if(password.length<6){
            alert('Password should be > 6 digits')
         }
         else if(address.length<10){
            alert('Please Enter Full Address')
         }
         else{
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
       
        
    }
  return (
    <Layout title='Register'>

 <section className="h-100 gradient-form" style={{backgroundColor: '#eee'}}>
  <div className="container py-3 h-100">
    <div className=" d-flex justify-content-center align-items-center h-100">
     
        <div className="  text-black">
          <div className="row g-0  d-flex justify-content-center  ">
            <div className="col-lg-7 col-12  card-product shadow">
              <div className="card-body  mx-md-4">
               
                <form className='p-3' onSubmit={formSubmit}>
                  <p className='fs-5'>Please login to your account</p>
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input type="text" id="form2Example11" className="form-control" placeholder="name" ariaDescribedby = "name"  name='names' value={val.names} onChange={handleEvent} required/>

                  </div>
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input type="email" id="form2Example11" className="form-control" placeholder=" email address" ariaDescribedby = "emailHelp" name='email' value={val.email} onChange={handleEvent} required />
                    
                  </div>
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input type="text" id="form2Example11" className="form-control" placeholder="10-digits phone number" name='phone' value={val.phone} onChange={handleEvent} required/>
                   
                  </div>

                 
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input type="password" id="form2Example22" className="form-control" name='password' value={val.password} onChange={handleEvent} required placeholder='password' />
                   
                  </div>
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input type="text" id="form2Example11" className="form-control" placeholder="  address" name='address' value={val.address} onChange={handleEvent} required/>
                   
                  </div>
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input type="text" id="form2Example11" className="form-control" placeholder="What is your pet name ?"  name='answer' value={val.answer} onChange={handleEvent} required />
                    
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

export default Register