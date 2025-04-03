const express = require('express')
const { createFriendNotification, ActionFriendRequest } = require('../Controllers/notificationControl')
const route = express.Router()

route.post('/createFriendNotification',createFriendNotification)
route.put('/createFriendNotification',ActionFriendRequest)