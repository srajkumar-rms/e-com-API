import CartItemModel from "./cartItems.model.js"
import CartItemsRepository from "./cartItems.repository.js"


export default class CartItemsController{

    constructor(){
        this.cartItemRepository = new CartItemsRepository()
    }
    async add(req, res){

        try {
            const {productID, quantity} = req.body
            const userID = req.userID
            await this.cartItemRepository.add(productID,userID,quantity)
            res.status(201).send('cart is updated')
            
        } catch (error) {
            console.log(error);
            return res.status(500).send("something went wrong ???")
        }
    }
    
    async get(req, res){
        
        try {
            const userID = req.userID
            const result = await this.cartItemRepository.get(userID)
            res.status(200).send(result)
        } catch (error) {
            console.log(error);
            return res.status(500).send("something went wrong ???")
        }
    }

    async delete(req,res){
        try {
            const userID = req.userID
            const cartItemID = req.params.id
            const isDeleted = await this.cartItemRepository.delete(cartItemID, userID)
            if(!isDeleted){
                return res.status(404).send("Item not found")
            }
            return res.status(201).send('deleted items')
            
        } catch (error) {
            console.log(error);
            return res.status(500).send("something went wrong ???")
        }
    }

}