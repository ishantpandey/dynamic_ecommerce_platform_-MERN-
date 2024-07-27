const express=require('express')
const app=express()
require('./db/db')
const cookieparser=require('cookie-parser')
const authRouter=require('./routers/authRoutes')
const categoryRouter=require('./routers/categoryRoutes')
const productRouter=require('./routers/productRoutes')
const cors =require('cors')



app.use(cookieparser())
app.use(express.json())

app.use(cors({
    
    credentials: true,
  
     origin:"http://localhost:3000"
    
 }))
 app.use('/auth/api',authRouter)
 app.use('/auth/api/category',categoryRouter)
 app.use('/auth/api/product',productRouter)
app.use(express.urlencoded({extended:false}))


app.listen(8000,()=>{
    console.log('server started');
})
