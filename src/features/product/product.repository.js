import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import mongoose from "mongoose";
import { productSchema } from "./product.schema.js";
import { reviewSchema } from "./review.schema.js";
import { categorySchema } from "./category.schema.js";



const ProductModel = mongoose.model('Product',productSchema)
const ReveiwModel = mongoose.model('Review',reviewSchema)
const CategoryModel = mongoose.model('Category', categorySchema)
export default class ProductRepository{
    constructor(){
        this.collection = "products"
    }
    async add(productData){
        try {
            productData.categories = productData.category.split(',').map(e=> e.trim())
            console.log("Product data",productData);
            
            //1. Add the product
            const newProduct = new ProductModel(productData)
            const savedProduct = await newProduct.save()
            console.log("saved product",savedProduct);
            
            //2. Update the categories 
            await CategoryModel.updateMany({
                _id: {$in: productData.categories}
            },{
                $push: {products: new ObjectId(savedProduct._id)}
            })
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong in products db", 500)
        }
      }

    async getAll(){
        try {
            //1. Get database
            const db = getDB()
            //2. To get the collection
            const collection = db.collection(this.collection)
            //3. get all the document
            const products = await collection.find().toArray()
            console.log(products);
            
            return products;
            
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong in products db", 500)
        }
    }
  
    async get(id){
        try {
            //1. Get database
            const db = getDB()
            //2. To get the collection
            const collection = db.collection(this.collection)
            //3. get  the document
            const product = await collection.findOne({_id:new ObjectId(id)})
            return product;
            
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong in products db", 500)
        }
    }

    async filter(minPrice, maxPrice, category){
        try {
            //1. Get database
            const db = getDB()
            //2. To get the collection
            const collection = db.collection(this.collection)
            let filterExpression={}
            if(minPrice){
                filterExpression.price={$gte: parseFloat(minPrice)}
            }
            if(maxPrice){
                filterExpression.price={...filterExpression.price, $lte: parseFloat(maxPrice)}
            }
            if(category){
                filterExpression.category=category
            }
            console.log(filterExpression);
            
           return await collection.find(filterExpression).toArray()
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong in products db", 500)
        }
    }

    // async rate(userID, productID, rating){

    //     try {
    //         //1. Get database
    //         const db = getDB()
    //         //2. To get the collection
    //         const collection = db.collection(this.collection)
    //         //1. Find the product
    //         const product = await collection.findOne({_id: new ObjectId(productID)})
    //         //2. Find the rating
    //         const userRating = product?.ratings?.find(r=>r.userID==userID)
    //         console.log("user rating",userRating);
            
    //         if (userRating) {
    //             //3. update the rating
    //             await collection.updateOne({
    //                 _id: new ObjectId(productID), "ratings.userID": new ObjectId(userID)
    //             },{
    //                 $set: {
    //                     "ratings.$.rating": rating
    //                 }
    //             })
    //         } else {
    //             await collection.updateOne({
    //                 _id: new ObjectId(productID)
    //             },{
    //                 $push: {ratings: {userID: new ObjectId(userID), rating}}
    //             })
                
    //         }

    //     } catch (error) {
    //         console.log(error);
    //         throw new ApplicationError("Something went wrong in products db", 500)
    //     }
    // }

    // Pull approach to solve race around conditions
    async rate(userID, productID, rating){

        try {
        //check if product exist
        const productToUpdate = await ProductModel.findById(productID)   
        console.log("Product to rate",productToUpdate);
         
        if(!productToUpdate){
            throw new Error('Product not found')
        }
        //2. get the existing review
        const userReview = await ReveiwModel.findOne({product: new ObjectId(productID), user: new ObjectId(userID)})
        console.log('user to provide review',userReview);
        
        if(userReview){
            userReview.rating=rating
            await userReview.save()
        }else{
            const newReview = new ReveiwModel({product: new ObjectId(productID), user: new ObjectId(userID), rating:rating}) 
            await newReview.save()
        }
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong in products db", 500)
        }
    }

    async averageProductPricePerCategory(){
        try {
            const db = getDB()
            return await db.collection(this.collection).aggregate([{
                        //1. get average price per catgory
                        $group: {_id:"$category", averagePrice:{$avg: "$price"}}
                    }]).toArray()
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong in products db", 500)
        }
    }
}