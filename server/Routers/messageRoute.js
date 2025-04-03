const express = require('express')
const { getMessageOfChat, createMessage, createMessageImage } = require('../Controllers/messageControl')
const { upload } = require('../Cloud/clounary')
const route = express.Router()

route.get('/getMessageOfChat',getMessageOfChat)
route.post('/createMessage',createMessage)
route.post('/createMessageImage',upload.single('image'),createMessageImage)

module.exports = route
