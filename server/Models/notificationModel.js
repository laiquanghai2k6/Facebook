
const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    type:{
        type:String,
        require:true
    },
    owner:{
        type:String,
        require:true
    },
    fromUserId:{
        type:String,
        require:true
    },
    toUserId:{
        type:String,
        require:true
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    },
    linking:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Notification",
        default:""
    }

},{
    timestamps:true
})

const notificationModel = mongoose.model("Notification",notificationSchema)

module.exports = notificationModel