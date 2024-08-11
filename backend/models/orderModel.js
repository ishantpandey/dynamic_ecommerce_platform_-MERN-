const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products:{
        type:mongoose.ObjectId,
        ref:"Product"
    },
    payment:{},
    buyer:{
        type:mongoose.ObjectId,
        ref:"users"
    },
    status:{
        type: String,
        default:"Not Process",
        enum:["Not Prosess","Processing","Shipped","Deliverd","Cancel"]
    },
    address:{
        type:String,
        require:true
    }
},{timestamps:true})

const OrderModel = new mongoose.model('orders',orderSchema)
module.exports=OrderModel