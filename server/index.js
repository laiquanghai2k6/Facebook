

const express = require('express')
const {Server} = require('socket.io')
const userRoute = require('./Routers/userRoute')
const postRoute = require('./Routers/postRoute')
const commentRoute = require('./Routers/commentRoute')
const chatRoute = require('./Routers/chatRoute')
const messageRoute = require('./Routers/messageRoute')
const notificationRoute = require('./Routers/notificationRoute')

const axios = require('axios')
const cors = require('cors')
require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose')
const path = require('path')
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
const requestOffline = axios.create({
    baseURL:`${process.env.CLIENT_URL}/users`,
    withCredentials:true
})
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
let userOnline = {}

const io = new Server({ cors: {
    origin: `${process.env.CLIENT_URL}`, // Link frontend
    methods: ["GET", "POST"]
  }
})
io.on('connection',(socket)=>{
    let currentUserId = ''
    socket.on('uploadCurrentUserId',(userId,socketId)=>{
        if(!userOnline[userId]){
            userOnline[userId] =[]
        }
        userOnline[userId].push(socketId)
        currentUserId = userId
        console.log('online:')
        console.log(userOnline)
        io.emit('getCurrentUserOnline',{userOnline:userOnline,isOffline:false})
    })
    socket.on('requestUserOnline',()=>{
        socket.emit('getUserOnline',userOnline)
    })
    socket.on('sendMessage',({from,seen1At,toUserId,seen2At,user,fromUser,isNew,toSocketId,chatId,image,imageUser,message,createdAt,name})=>{
     
        const receiverSocketIds = userOnline[toUserId] || [];

        receiverSocketIds.forEach(socketId=>{
            
            io.to(socketId).emit('receiveMessage',{
                fromUser:fromUser,
                from:from,
                message:message,
                createdAt:createdAt,
                name:name,
                imageUser:imageUser,
                image:image,
                chatId:chatId,
                user:user,
                seen1:seen1At,
                seen2:seen2At
            })
        })
       
        
    })
    socket.on('seenMessage',({isSeen,seenWhatAt,toUser,chatId,fromUser})=>{
        if(userOnline[toUser] != undefined){
            io.to(userOnline[toUser]).emit('noticeSeenMessage',{
                isSeen:isSeen,
                seenWhatAt:seenWhatAt,
                chatId:chatId,
                fromUser:fromUser
            })
        }
    })
    socket.on('sendNotiFrom',({createdAt,fromUserId,linking,owner,toUserId,type,updatedAt,_id})=>{
        if(userOnline[toUserId]){
            const data = {createdAt,fromUserId,linking,owner,toUserId,type:'pending',updatedAt,_id}
            io.to(userOnline[toUserId]).emit('sendNotiToUser',data)
        }
    })
    socket.on('cancelNoti',(userId)=>{
        io.to(userOnline[userId]).emit('deleteNoti',userId)
    })
    socket.on('acceptFriend',({from,to})=>{
        io.to(userOnline[from]).emit('successFriend',to)
    })
    socket.on('cancelFriend',({from,to})=>{
        io.to(userOnline[from]).emit('rejectFriend',to)
    })
    socket.on('disconnect', async ()=>{
        const time = Date.now()
        const data = {
            userId:currentUserId ,
            time: time
          }
        if(currentUserId != "") delete userOnline[currentUserId]
        console.log('online:')
        console.log(userOnline)
        io.emit("getCurrentUserOnline", {userOnline:userOnline,isOffline:true});
        await requestOffline.put('/updateLastOnline',data)  

    })
})


io.listen(3000)

module.exports = clientUrl 


