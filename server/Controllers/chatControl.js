const chatModel = require("../Models/chatModel")
const messageModel = require("../Models/messageModel")
const userModel = require("../Models/userModel")

const createChat = async (req,res)=>{
    try{

        const {user1,user2} = req.body
        const currentUser1 = await userModel.findById(user1)
        const currentUser2 = await userModel.findById(user2)
        if(!currentUser1 | !currentUser2) return res.status(400).json('Lỗi tìm user')
        const newChat = new chatModel({
            user:[user1,user2]
        })
        await newChat.save()
        return res.status(200).json(newChat)
    }catch(e){
        console.log(e)
        res.status(500).json('Lỗi tạo chat')
    }
}
const updateLatestMessage = async(req,res)=>{
    try{

        const {chatId,lastMessage,senderId} = req.body
        const update = await chatModel.findOneAndUpdate({
            _id:chatId,

        },{
            isSeen:false,
            lastMessage:lastMessage,
            senderId:senderId
        },{
            new:true
        }) 
        await update.save()
        return res.status(200).json(update)
    }catch(e){
        console.log(e)
        res.status(500).json('Lỗi lấy chat')
    }
}
const getChatOfUser = async (req,res)=>{
    try{
        const {userId} = req.query
        const currentUser = await userModel.findById(userId)
        if(!currentUser) return res.status(400).json('Lỗi tìm user')
        const userChat = await chatModel.find({
            user:{$in:[userId]}
        }).sort({updatedAt:-1})
        .lean()
        return res.status(200).json(userChat)
    }catch(e){
        console.log(e)
        return res.status(500).json('Lỗi gửi chat')

    }
}

module.exports = {createChat,getChatOfUser,updateLatestMessage}
