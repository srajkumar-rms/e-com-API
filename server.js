// 1. Import express
import express from 'express';
// import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import productRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';
import { basicAuthorizer } from './src/middlewares/basicAuth.middleware.js';
import jwtMiddleware from './src/middlewares/jwt.middleware.js';
import cartItemRouter from './src/features/cart/cartItems.routes.js';
import swagger from 'swagger-ui-express'
import apiDocs from "./swagger.json" with {type: 'json'}

dotenv.config()
// 2. Create Server
const server = express();

server.use(express.json());
// for all requests related to product, redirect to product routes.
// localhost:3200/api/products

server.use("/api-docs", swagger.serve, swagger.setup(apiDocs))

server.use("/api/products",jwtMiddleware, productRouter);
server.use("/api/users", userRouter)
server.use("/api/cart", jwtMiddleware,cartItemRouter)

// 3. Default request handler
server.get('/', (req, res)=>{
    res.send("Welcome to Ecommerce APIs");
});

// 4. Specify port.
server.listen(3000,()=>{
    console.log("Server is running at 3000");
});

