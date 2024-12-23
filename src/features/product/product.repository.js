import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";


export default class ProductRepository{
    constructor(){
        this.collection = "products"
    }
    async add(newProduct){
        try {
            //1. Get database
            const db = getDB()
            //2. To get the collection
            const collection = db.collection(this.collection)
            //3. Insert the document
            return await collection.insertOne(newProduct)
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

    async rate(userID, productID, rating){

        try {
            //1. Get database
            const db = getDB()
            //2. To get the collection
            const collection = db.collection(this.collection)
            collection.updateOne({
                _id: new ObjectId(productID)
            },{
                $push: {ratings: {userID: new ObjectId(userID), rating}}
            })

        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong in products db", 500)
        }
    }
}