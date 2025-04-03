const express = require('express')
const { createChat, updateLatestMessage, getChatOfUser, updateSeen } = require('../Controllers/chatControl')
const route = express.Router()

route.post('/createChat',createChat)
route.put('/updateLatestMessage',updateLatestMessage)
route.get('/getChatOfUser',getChatOfUser)
route.put('/updateSeen',updateSeen)

module.exports = route