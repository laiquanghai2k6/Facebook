const express = require('express')
const { createPost, createPostWithImage, createPostWithVideo, getAllPost, getPostOfOneUser } = require('../Controllers/postControl')
const route = express.Router()
const {upload} = require('../Cloud/clounary')

route.post('/createPost',createPost)
route.post('/createPostWithImage',upload.single('image'),createPostWithImage)
route.post('/createPostWithVideo',upload.single('video'),createPostWithVideo)
route.get('/getAllPost',getAllPost)
route.get('/getPostOfOneUser',getPostOfOneUser)

module.exports = route
