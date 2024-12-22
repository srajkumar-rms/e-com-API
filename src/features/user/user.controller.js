import UserModel from "./user.model.js"
import jwt from 'jsonwebtoken'
import UserRepository from './user.repository.js'
import bcrypt from 'bcrypt'


export default class UserController {
    constructor() {
        this.userRepository = new UserRepository()

    }
    async signUp(req, res, next) {

        try {
            console.log(req.body);
            const { name, email, password, type } = req.body
            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new UserModel(name, email, hashedPassword, type)
            await this.userRepository.signUp(user)
            res.status(201).send(user)

        } catch (error) {
            next(error)
        }

    }

    async signIn(req, res, next) {

        try {
            const user = await this.userRepository.findByEmail(req.body.email)
            if (!user) {
                return res.status(400).send('Incorrect credentials')
            } else {
                //compare password 
                const result = await bcrypt.compare(req.body.password, user.password)
                if(result) {
    
                    //1. Create token 
                    const token = jwt.sign({ userID: result.id, email: result.email }, process.env.JWT_SECRET, { expiresIn: "1h" })
    
                    //2. Send token.
                    return res.status(200).send(token)
                } else {
                    return res.status(400).send('Incorrect credentials')
                }
            }

        } catch (error) {
            console.log(error);

            return res.status(500).send("something went wrong ???")
        }
    }
}