import { ObjectId } from "mongodb"
import { getDB } from "../../config/mongodb.js"
import { ApplicationError } from "../../error-handler/applicationError.js"


export default class CartItemsRepository{

    constructor(){
        this.collection = "cartItems"
    }

    async add(productID, userID, quantity){

        try {
            //1. get database
            const db = getDB()
            const collection = db.collection(this.collection)
            //find the document
            // either insert or update
            // Insersion 
            await collection.updateOne({productID: new ObjectId(productID), userID:new ObjectId(userID)},
            {
                $inc: {
                    quantity: quantity
                }
            },{upsert: true})
            
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong in products db", 500) 
            
        }
    }

    async get(userID){
        try {
            //1. get database
            const db = getDB()
            const collection = db.collection(this.collection)
            return await collection.find({userID: new ObjectId(userID)}).toArray()
            
            
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong in products db", 500) 
            
        }
    }

    async delete(cartItemID,userID){

        try {
            //1. get database
            const db = getDB()
            const collection = db.collection(this.collection)
            const result =  await collection.deleteOne({_id: new ObjectId(cartItemID), userID: new ObjectId(userID)}) 
            return result.deletedCount>0         
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong in products db", 500) 
            
        }
    }
}