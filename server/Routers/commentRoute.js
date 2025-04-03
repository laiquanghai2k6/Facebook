const express = require('express')
const { upload } = require('../Cloud/clounary')
const { createComment, createCommentWithImage, createCommentWithVideo, getCommentOfPost, getLengthCommentOfPost, updateChildren } = require('../Controllers/commentControl')
const route = express.Router()


route.post('/createCommentWithImage',upload.single('image'),createCommentWithImage)
route.post('/createCommentWithVideo',upload.single('video'),createCommentWithVideo)
route.post('/createComment',createComment)
route.get('/getCommentOfPost/:postId',getCommentOfPost)
route.get('/getLengthCommentOfPost/:postId',getLengthCommentOfPost)
route.put('/updateChildren',updateChildren)
module.exports = route
