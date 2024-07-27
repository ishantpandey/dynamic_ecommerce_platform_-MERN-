const express=require('express')
const router=express.Router()
const{register,login,forgetPassword}=require('../controller/authController')
const {authUser,isAdmin} = require('../authMiddleware/authentication')

router.post('/register',register)
router.post('/login',login)
// protected route
router.get('/auth-user',authUser,(req,res)=>{
    res.status(200).send({ok:true})
})
router.get('/auth-admin',authUser,isAdmin,(req,res)=>{
    res.status(200).send({ok:true})
})
router.post('/forget-password',forgetPassword)

module.exports=router