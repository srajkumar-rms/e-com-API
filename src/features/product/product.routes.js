import express from 'express'
import ProductController from './product.controller.js'


const productRoutes = express.Router()

const productController = new ProductController()

productRoutes.get('/', productController.getAllProduct)
productRoutes.post('/', productController.addProduct)





export default productRoutes