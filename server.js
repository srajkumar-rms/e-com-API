// 1. Import express
import express from 'express';
// import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import productRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';
import { basicAuthorizer } from './src/middlewares/basicAuth.middleware.js';
import jwtMiddleware from './src/middlewares/jwt.middleware.js';

dotenv.config()
// 2. Create Server
const server = express();

server.use(express.json());
// for all requests related to product, redirect to product routes.
// localhost:3200/api/products
server.use("/api/products",jwtMiddleware, productRouter);
server.use("/api/users", userRouter)

// 3. Default request handler
server.get('/', (req, res)=>{
    res.send("Welcome to Ecommerce APIs");
});

// 4. Specify port.
server.listen(3000,()=>{
    console.log("Server is running at 3000");
});

