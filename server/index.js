

const express = require('express')
const userRoute = require('./Routers/userRoute')
const postRoute = require('./Routers/postRoute')
const commentRoute = require('./Routers/commentRoute')
const chatRoute = require('./Routers/chatRoute')
const messageRoute = require('./Routers/messageRoute')
const notificationRoute = require('./Routers/notificationRoute')

const cors = require('cors')
require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose')

const app = express()
const atlasUrl = process.env.MONGO_ATLAS_URI
const port = process.env.PORT || 5000
const clientUrl= process.env.CLIENT_URL
app.use(express.json())
app.use(cors({
    origin: clientUrl, 
    credentials: true,
    methods: ['GET', 'POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type'],               
}));

app.use('/users',userRoute)
app.use('/posts',postRoute)
app.use('/comments',commentRoute)
app.use('/chats',chatRoute)
app.use('/messages',messageRoute)
app.use('/notifications',notificationRoute)
mongoose.connect(atlasUrl).then(async ()=>{
    console.log('successfully mongoose')
}).catch((e)=>{
    console.log('failed mongoose:',e.message)
})
app.listen(port,()=>{
    console.log('connected port:',port)
})

// ------------------------------------------



module.exports = clientUrl 


