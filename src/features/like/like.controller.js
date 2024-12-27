import { LikeRepository } from "./like.repository.js";

export class LikeController{
    constructor(){
        this.likeRepository = new LikeRepository()
    }
    async likeItem(req,res,next){
        try {
            const {id, type}= req.body
            const userId = req.userID
            if(type!='Product' && type!== 'Category'){
                return res.status(400).send('Invalid type')
            }
            if(type=='Product'){
                this.likeRepository.likeProduct(userId, id)
            }else{
                this.likeRepository.likeCategory(userId,id)
            }
            res.status(200).send()
        } catch (error) {
            console.log(error);
            return res.status(500).send("something went wrong ???")
        }
    }

    async getLikes(req,res,next){
        try {
            const {id, type} = req.query
            const likes = await this.likeRepository.getLikes(type,id)
            res.status(200).send(likes)
        } catch (error) {
            console.log(error);
            return res.status(500).send("something went wrong ???")
        }
    }
}