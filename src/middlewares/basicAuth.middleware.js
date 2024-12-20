import UserModel from "../features/user/user.model.js";


export const basicAuthorizer = (req, res, next)=>{
    //1. Check if authorization header is empty
    const authHeader = req.headers["authorization"]
    if(!authHeader){
        return res.status(401).send('invalid credentials')
    }
    console.log(typeof(authHeader));
    
    console.log(authHeader);
    //2. Extract credential
    const base64Credentials = authHeader.replace('Basic ', "")
    console.log(base64Credentials);
    //3. Decode credentials
    const decodeCreds = Buffer.from(base64Credentials, 'base64').toString('utf8')
    console.log(decodeCreds);
    const creds = decodeCreds.split(':')
    
    const user = UserModel.getAll().find((u)=> u.email == creds[0] && u.password == creds[1])
    if(user){
        next()
    }else{
        return res.status(401).send('Invalid credentials')
    }
}