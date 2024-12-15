import express from "express";
import productRoutes from "./src/features/product/product.routes.js";

const server = express()

//api/users
//api/products
//For all request related to product , redirect to product routes
server.use('/api/products',productRoutes )




server.get('/',(req,res)=>{
    res.send('Welcome to Ecomm APIs')
})




server.listen(3000,()=>{
    console.log('Server listening on port 3000');
    
})