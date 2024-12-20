
import express from 'express';
import CartItemsController from './cartItems.controller.js';

const cartItemRouter = express.Router();
const cartItemController = new CartItemsController();

// All the paths to the controller methods.
// localhost/api/products 
cartItemRouter.delete('/:id',cartItemController.delete);
cartItemRouter.post('/',cartItemController.add);
cartItemRouter.get('/',cartItemController.get);

export default cartItemRouter;