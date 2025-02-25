// Manage routes/paths to ProductController

// 1. Import express.
import express from 'express';
import ProductController from './product.controller.js';
// import {upload} from '../../middlewares/fileupload.middleware.js';

// 2. Initialize Express router.
const productRouter = express.Router();
const productController = new ProductController();

// All the paths to the controller methods.
// localhost/api/products 
productRouter.get('/filter',(req, res)=>{
    productController.filterProducts(req,res)
});
productRouter.get('/',(req, res)=>{
    productController.getAllProducts(req,res)
});

productRouter.get("/averageprice", (req, res, next)=>{
    productController.averagePrice(req,res,next)
})
productRouter.get('/:id',(req, res)=>{
    productController.getOneProduct(req,res)
});

//Comment out the file upload capability
// productRouter.post('/',upload.single('imageUrl'),(req, res)=>{
//     productController.addProduct(req,res)
// });
productRouter.post('/',(req, res)=>{
    productController.addProduct(req,res)
});
productRouter.post('/rate',(req, res, next)=>{
    productController.rateProduct(req,res, next)
})


export default productRouter;