
import express from 'express';
import CartItemsController from './cartItems.controller.js';

const cartItemRouter = express.Router();
const cartItemController = new CartItemsController();

// All the paths to the controller methods.
// localhost/api/products 
cartItemRouter.delete('/:id',(req,res)=>{
    cartItemController.delete(req,res)
});
cartItemRouter.post('/',(req,res)=>{
    cartItemController.add(req,res)
});
cartItemRouter.get('/',(req,res)=>{
    cartItemController.get(req,res)
});

export default cartItemRouter;