import CartItemModel from "./cartItems.model.js"


export default class CartItemsController{
    add(req, res){
        const {productID, quantity} = req.query
        const userID = req.userID
        CartItemModel.add(productID,userID,quantity)
        res.status(201).send('cart is updated')
    }

    get(req, res){
        const userID = req.userID
        const result = CartItemModel.get(userID)
        res.status(200).send(result)
    }

}