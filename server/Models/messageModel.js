const { default: mongoose, Types } = require("mongoose");


const messageSchema = new mongoose.Schema({
    chatId:{
        type:mongoose.Schema.Types.ObjectId,ref:'Chat'
    },
    senderId:{
        type:String,
        require
    },
    text:{
        type:String,
        default:""
    },
    image:{
        type:String,
        default:""
    },

},{
    timestamps:true
})

const messageModel = mongoose.model("Message",messageSchema)

module.exports = messageModel