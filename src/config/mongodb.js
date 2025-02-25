import {MongoClient} from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

const url = process.env.DB_URL

let client;
export const connectToMongoDB = () =>{    
    MongoClient.connect(url)
    .then(clientInstance=> {
        client = clientInstance
        console.log('MongoDB is connected');
        // createCounter(client.db())
        // createIndexes(client.db())
        // createStock(client.db())
        
    })
    .catch(err=>{
        console.log(err);
        
    })
}

export const getClient = () =>{
    return client
}

export const getDB = ()=>{
    return client.db()
}

const createCounter = async (db) => {
    const existingCounter = await db.collection("counters").findOne({_id: 'cartItemId'})
    if(!existingCounter){
        await db.collection("counters").insertOne({_id: 'cartItemId', value: 0})
    }
}

const createIndexes = async(db)=>{
    await db.collection("products").createIndex({price:1})
    await db.collection("products").createIndex({name:1, category:-1})
    await db.collection("products").createIndex({desc:"text"})
}


// This was used to add "stock" field once time to modify the product schema
// const createStock = async(db)=>{
//     await db.collection("products").updateMany({}, {$set:{stock:20}})
// }
