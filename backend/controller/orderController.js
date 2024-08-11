const orderModel = require('../models/orderModel')
const instance = require('../service/intance')
require('dotenv').config()

const getkey=async(req,res)=>{
return res.send({key:process.env.RAZORPAY_API_KEY})
}

const checkout=async(req,res)=>{
    const options = {
        amount: Number(req.body.amount*100),  // amount in the smallest currency unit
        currency: "INR",        
      };
      
      const order = await instance.orders.create(options)
     
      
       return res.send({
            order
          })
         
}

const paymentvarification=async(req,res)=>{
 console.log(req.body);
 return res.send({
    success:true
  })
}

module.exports={checkout,paymentvarification,getkey}