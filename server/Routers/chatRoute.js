const express = require('express')
const { createChat, updateLatestMessage, getChatOfUser } = require('../Controllers/chatControl')
const route = express.Router()

route.post('/createChat',createChat)
route.put('/updateLatestMessage',updateLatestMessage)
route.get('/getChatOfUser',getChatOfUser)

module.exports = route