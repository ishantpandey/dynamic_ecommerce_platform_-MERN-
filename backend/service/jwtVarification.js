const jwt=require('jsonwebtoken')
const  secret="ikp1999"
const signUser=async(user)=>{
   return jwt.sign({
    id:user._id,
    name:user.name,
    email:user.email
   },secret)
  
}

const varifyUser=async(token)=>{
    return jwt.verify(token,secret)
}
module.exports={signUser,varifyUser}