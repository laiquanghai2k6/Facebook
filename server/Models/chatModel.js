

const { default: mongoose } = require("mongoose");


const chatSchema = new mongoose.Schema({
    user:{
        type:Array,
        default:[]
    },
    lastMessage:{
        type:String,
        default:""
    },
    seen1:{
        type:Boolean,
        default:false
    },
    seen2:{
        type:Boolean,
        default:false
    },
    senderId:{
        type:String,
        default:""
    }
},{
    timestamps:true
})

const chatModel = mongoose.model("Chat",chatSchema)

module.exports = chatModel