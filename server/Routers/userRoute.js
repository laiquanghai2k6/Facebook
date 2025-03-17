const express  = require('express')
const {upload} = require('../Cloud/clounary.js')
const route = express.Router()
const {loginUser, registerUser,uploadUserImage, uploadUserBackground} = require('../Controllers/userControl') 

route.post('/login',loginUser)
route.post('/register',registerUser)
route.post('/uploadUserImage',upload.single('image'), uploadUserImage)
route.post('/uploadBackgroundImage',upload.single('image'),uploadUserBackground)
module.exports = route

