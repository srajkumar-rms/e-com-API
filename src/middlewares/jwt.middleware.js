
import jwt from 'jsonwebtoken'

const jwtAuth = (req, res, next)=>{
    //1. Read the token.    
    const token = req.headers["authorization"]

    //2. if no token return the error.
    if(!token){
        return res.status(401).send('unauthoriation token')
    }
    //3. check if token is valid
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.userID = payload.userID
        
    } catch (error) {
        //4. else return error
        return res.status(401).send('unauthoriation token')
    }
    //5. call next
    next()
    
}

export default jwtAuth