const express=require('express')
const router=express.Router()
const { authUser, isAdmin } = require('../authMiddleware/authentication')
const{checkout,paymentvarification,getkey}=require('../controller/orderController')

router.post('/checkout',checkout)
router.post('/payment_varification',paymentvarification)
router.get('/getkey',getkey)

module.exports = router