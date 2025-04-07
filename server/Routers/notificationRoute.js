const express = require('express')
const { createFriendNotification, actionFriendRequest, deleteFriendRequest, getNotification } = require('../Controllers/notificationControl')
const route = express.Router()

route.post('/createFriendNotification',createFriendNotification)
route.put('/actionFriendRequest',actionFriendRequest)
route.delete('/deleteFriendRequest/:toUserId/:fromUserId',deleteFriendRequest)
route.get('/getNotification/:ownerId',getNotification)
module.exports = route