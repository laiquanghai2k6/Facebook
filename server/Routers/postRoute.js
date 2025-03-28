const express = require('express')
const { createPost,getVideo, createPostWithImage, createPostWithVideo, getAllPost, getPostOfOneUser, createPostShare, updateEmoji } = require('../Controllers/postControl')
const route = express.Router()
const {upload} = require('../Cloud/clounary')

route.post('/createPost',createPost)
route.post('/createPostWithImage',upload.single('image'),createPostWithImage)
route.post('/createPostWithVideo',upload.single('video'),createPostWithVideo)
route.post('/sharePost',createPostShare)
route.get('/getAllPost',getAllPost)
route.get('/getVideo',getVideo)

route.get('/getPostOfOneUser',getPostOfOneUser)
route.put('/updateEmoji',updateEmoji)

module.exports = route
