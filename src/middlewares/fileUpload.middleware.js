// import multer 
import multer from 'multer'

// configure storage with filename and location
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'uploads/')
    },
    filename: (req, file, cb)=>{
        const name = Date.now() + '-' + file.originalname;
        cb(null, name)
    }
})

export const upload = multer({storage: storage})


