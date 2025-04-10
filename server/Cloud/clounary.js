const cloudinary = require('cloudinary').v2;
const multer = require('multer')
const path = require('path')
require('dotenv').config('../../server/.env')

// const storage = multer.diskStorage({
//     destination:(req,file,cb)=>{    
//         cb(null,'uploads/')
//     },
//     filename:(req,file,cb)=>{
//         const uniqueName = Date.now() + path.extname(file.originalname)
//         cb(null,uniqueName)
//     }
// })
const storage = multer.memoryStorage()
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
  });
const upload = multer({ storage:storage });
module.exports = {upload,cloudinary}