import mongoose, { mongo } from "mongoose";
import { userSchema } from "./user.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";


//Creating model from schema
const UserModel = mongoose.model('User', userSchema)

export default class UserRepository{


    async resetPassword(userID, hashedPassword){
        try {
            let user = await UserModel.findById(userID)
            if(user){
                user.password = hashedPassword
                user.save()
            }else{
                throw new Error("No user found")
            }
            
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong in database", 500)
        }
    }

    async signUp(user){
        try {
            
            // create instance of model
            const newUser = new UserModel(user)
            await newUser.save()
            return
        } catch (error) {
            if(error instanceof mongoose.Error.ValidationError){
                throw error
            }else{
                console.log(error);
                throw new ApplicationError("Something went wrong in database", 500)

            }
        }

    }

    async signIn(email,password){
        try {
            return await UserModel.findOne({email,password})
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong in database", 500)
        }
    }

    async findByEmail(email){
                try {
                return await UserModel.findOne({email})
                    
                } catch (error) {
                    console.log(error);
                    throw new ApplicationError("Something went wrong in database", 500)
                }
            }
}
