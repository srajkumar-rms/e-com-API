// 1. Import express
import express from 'express';
import cors from 'cors'
// import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import productRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';
import { basicAuthorizer } from './src/middlewares/basicAuth.middleware.js';
import jwtMiddleware from './src/middlewares/jwt.middleware.js';
import cartItemRouter from './src/features/cart/cartItems.routes.js';
import swagger from 'swagger-ui-express'
import apiDocs from "./swagger.json" with {type: 'json'}
import loggerMiddleware from './src/middlewares/logger.middleware.js';
import { ApplicationError } from './src/error-handler/applicationError.js';
import {connectToMongoDB} from './src/config/mongodb.js';
import orderRouter from './src/features/order/order.routes.js';
import { connectUsingMongoose } from './src/config/mongooseConfig.js';

// 2. Create Server
const server = express();

//Load all the env variables in application
dotenv.config()


// CORS policy configuration
// server.use((req,res,next)=>{
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Headers', '*')
//     res.header('Access-Control-Allow-Methods', '*')
//     //return ok for preflight request 
//     if(req.method=="OPTIONS"){
//         return send.sendStatus(200)
//     }
//     next()
// })

var corsOption = {
    origin: "*"
}

server.use(cors(corsOption))

server.use(express.json());
// for all requests related to product, redirect to product routes.
// localhost:3200/api/products

server.use("/api-docs", swagger.serve, swagger.setup(apiDocs))
server.use(loggerMiddleware)
server.use("/api/orders", jwtMiddleware, orderRouter)

server.use("/api/products", jwtMiddleware, productRouter);
server.use("/api/users", userRouter)
server.use("/api/cart", jwtMiddleware, cartItemRouter)

// 3. Default request handler
server.get('/', (req, res) => {
    res.send("Welcome to Ecommerce APIs");
});

// Error handler middleware
server.use((err, req, res, next) => {
    //Application Error handler
    if (err instanceof ApplicationError) {
        res.status(err.code).send(err.message)
    } else {

        res.status(500).send('Something went wrong')
    }

})


// 4. Middle ware to handle 404 request
server.use((req, res) => {
    res.status(404).send("API not found")
})
// 5. Specify port.
server.listen(3000, () => {
    console.log("Server is running at 3000");
    connectUsingMongoose()
    // connectToMongoDB()
});

