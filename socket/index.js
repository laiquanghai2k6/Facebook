
const {Server} = require('socket.io')
const path = require('path')
const axios = require('axios')

require('dotenv').config({ path: './.env' });
const io = new Server({ cors: {
    origin: `${process.env.CLIENT_URL}`, // Link frontend
    methods: ["GET", "POST"]
  }
})
let userOnline = {}
const requestOffline = axios.create({
    baseURL:`${process.env.SERVER_URL}/users`,
    withCredentials:true
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