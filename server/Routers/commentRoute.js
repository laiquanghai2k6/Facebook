const express = require('express')
const { upload } = require('../Cloud/clounary')
const { createComment, createCommentWithImage, createCommentWithVideo, getCommentOfPost, getLengthCommentOfPost, getCommentReply } = require('../Controllers/commentControl')
const route = express.Router()


route.post('/createCommentWithImage',upload.single('image'),createCommentWithImage)
route.post('/createCommentWithVideo',upload.single('video'),createCommentWithVideo)
route.post('/createComment',createComment)
route.get('/getCommentOfPost/:userId/:postId',getCommentOfPost)
route.get('/getLengthCommentOfPost/:postId',getLengthCommentOfPost)
route.get('/getReplyComment/:userId/:postId/:commentParentId',getCommentReply)


module.exports = route
