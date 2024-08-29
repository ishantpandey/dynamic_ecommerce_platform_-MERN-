const express=require('express')
const router=express.Router()
const { authUser, isAdmin } = require('../authMiddleware/authentication')
const{checkout,paymentvarification,getkey,userOrder}=require('../controller/orderController')

router.post('/checkout',authUser,checkout)
router.post('/payment_varification',authUser,paymentvarification)
router.get('/getkey',authUser,getkey)
router.get('/order-page',authUser,userOrder)

module.exports = router