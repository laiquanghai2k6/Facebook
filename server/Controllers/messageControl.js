const sharp = require("sharp")
const { cloudinary } = require("../Cloud/clounary")
const chatModel = require("../Models/chatModel")
const messageModel = require("../Models/messageModel")
const userModel = require("../Models/userModel")

const getMessageOfChat = async (req, res) => {
    try {

        const { chatId } = req.query
        const currentChat = await chatModel.findById(chatId).lean()
        if (!currentChat) return res.status(400).json('Lỗi tìm chat')
        const messages = await messageModel.find({ chatId: chatId })
            .sort({ createdAt: -1 })

        return res.status(200).json(messages)
    } catch (e) {
        console.log(e)
        res.status(500).json('Lỗi lấy chat')
    }
}
const createMessage = async (req, res) => {
    try {
        const { chatId, text, senderId } = req.body
        const currentChat = await chatModel.findById(chatId).lean()
        if (!currentChat) return res.status(400).json('Lỗi tìm chat')
        const newMessage = new messageModel({
            chatId: chatId,
            text: text,
            senderId: senderId
        })
        await newMessage.save()

        return res.status(200).json(newMessage)
    } catch (e) {
        console.log(e)
        res.status(500).json('Lỗi tạo tin nhắn')
    }
}
const createMessageImage = async (req, res) => {
    try {
        const filePath = req.file.path
        const { chatId, text, senderId } = req.body
        const currentChat = await chatModel.findById(chatId).lean()
        if (!currentChat) return res.status(400).json('Lỗi tìm chat')
        const fileBuffer = await sharp(filePath)
            .toFormat('jpeg')
            .toBuffer()

        await cloudinary.uploader.upload_stream({ folder: 'message_image' }, async (error, result) => {
            if (error) return res.status('400').json('Lỗi cloudinary')
            const newMessage = new messageModel({
                chatId: chatId,
                text: text,
                senderId: senderId,
                image: result.secure_url
            })
            await newMessage.save()
            return res.status(200).json(newMessage)

        }).end(fileBuffer)

    } catch (e) {
        console.log(e)
        res.status(500).json('Lỗi tạo tin nhắn')
    }
}

module.exports = { getMessageOfChat,createMessageImage,createMessage }
