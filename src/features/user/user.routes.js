// Manage routes/paths to ProductController

// 1. Import express.
import express from 'express';
import UserController from './user.controller.js';

// 2. Initialize Express router.
const userRouter = express.Router();
const userController = new UserController();

// All the paths to the controller methods.
// localhost/api/products 
userRouter.post('/signup',(req,res,next)=>{
    userController.signUp(req,res,next)
});
userRouter.post('/signin',(req,res,next)=>{
    userController.signIn(req,res,next)
});


export default userRouter;