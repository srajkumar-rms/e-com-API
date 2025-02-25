import winston from 'winston'

// import fs from 'fs'
// const fsPromise = fs.promises
// async function log(logData) {
//     try {
//         logData = `\n ${new Date().toString()} - ${logData}`
//         await fsPromise.appendFile("log.txt", logData)
//     } catch (error) {
//         console.log(error);

        
//     }
// }
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {service: 'request-logging'},
    transports: [
        new winston.transports.File({filename: 'log.txt'})
    ]
})

const loggerMiddleware = async (req, res, next)=>{
    //1. Log request body
    if(!req.url.includes('signin')){
        const logData = `${req.url} - ${JSON.stringify(req.body)}`
        logger.info(logData)
    }
    next()
}

export default loggerMiddleware