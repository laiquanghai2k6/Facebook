
const {Server} = require('socket.io')
const axios = require('axios')
const express = require('express')
const http = require('http')
const cors = require('cors')
const app = express()
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}))
const server = http.createServer(app)
require('dotenv').config({ path: './.env' });
console.log(process.env.SERVER_URL)
const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
      credentials: true
    }
  })
let userOnline = {}
const requestOffline = axios.create({
    baseURL:`${process.env.SERVER_URL}/users`,
    withCredentials:true
})

io.on('connection',(socket)=>{
    let currentUserId = ''
    socket.on('uploadCurrentUserId',async (userId,socketId)=>{
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
        console.log('update offline')
        try {
          const a = await requestOffline.put('/updateLastOnline', data)
          console.log('a:',a)
      } catch (err) {
          console.error("Lỗi khi update lastOnline:", err.message)
      }

    })
})
const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(` Socket server running on port ${PORT}`);
  });