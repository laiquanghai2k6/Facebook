const express  = require('express')
const {upload} = require('../Cloud/clounary.js')
const route = express.Router()
const {loginUser, registerUser,uploadUserImage, uploadUserBackground, setUserBio, setUserProfileInfo, getUser, searchUser, getAllUserRandom, updateLastOnline, getUserProfile} = require('../Controllers/userControl') 

route.post('/login',loginUser)
route.get('/getUser/:userId',getUser)
route.post('/register',registerUser)
route.post('/setUserBio',setUserBio)
route.post('/setUserProfileInfo',setUserProfileInfo)
route.post('/uploadUserImage',upload.single('image'), uploadUserImage)
route.post('/uploadBackgroundImage',upload.single('image'),uploadUserBackground)
route.get('/searchUser',searchUser)
route.get('/getAllUserRandom',getAllUserRandom)
route.put('/updateLastOnline',updateLastOnline)
route.get('/getUserProfile/:userId',getUserProfile)
module.exports = route

