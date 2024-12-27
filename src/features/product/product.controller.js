import ProductModel from "./product.model.js";
import mongoose from "mongoose";
import ProductRepository from "./product.repository.js";


export default class ProductController {
    constructor(){
        this.productRepository = new ProductRepository()
    }

    async getAllProducts(req, res) {

        try {
            const products = await this.productRepository.getAll();
            res.status(200).send(products);
            
        } catch (error) {
            console.log(error);
            return res.status(500).send("something went wrong ???")
        }
    }

    async addProduct(req, res) {

        try {
            const { name, price, description, categories,sizes } = req.body;
            const newProduct = new ProductModel(name, description, parseFloat(price), categories, req?.file?.filename , sizes?.split(','),)
           
            const createdRecord = await this.productRepository.add(newProduct);
            console.log(createdRecord);
            
            return res.status(201).send(newProduct);
            
        } catch (error) {
            console.log(error);
            return res.status(500).send("something went wrong ???")
        }
    }

    async getOneProduct(req, res) {

        try {
            const id = req.params.id
            const product = await this.productRepository.get(id)
            if (!product) {
                res.status(404).send('Product not found!')
            } else {
                res.status(200).send(product)
            }
            
        } catch (error) {
            console.log(error);
            return res.status(500).send("something went wrong ???")
        }
    }

    async filterProducts(req, res) {

        try {
            const minPrice = req.query.minPrice;
            const maxPrice = req.query.maxPrice;
            const category = req.query.category;
            
            const result = await this.productRepository.filter(minPrice, maxPrice, category);
            console.log(result);
    
            res.status(200).send(result)
            
        } catch (error) {
            console.log(error);
            return res.status(500).send("something went wrong ???")
        }
    }
    async rateProduct(req, res, next) {
        try {            
            const userID = req.userID
            const productID = req.body.productID
            const rating = req.body.rating


            await this.productRepository.rate(userID, productID, rating)
            return res.status(200).send('Rating added')

        } catch (error) {            
            next(error)
        }

    }
    async averagePrice(req,res,next){
        try {
        const result = await this.productRepository.averageProductPricePerCategory()
        return res.status(200).send(result)

        } catch (error) {
            console.log(error);
            return res.status(500).send("something went wrong ???")
        }
    }

}