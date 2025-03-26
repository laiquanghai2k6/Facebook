const { default: mongoose } = require("mongoose");


const commentSchema = new mongoose.Schema({
    type:{
        type:String,
        require:true
    },
    image:{
        type:String,
        default:""
    },
    video:{
        type:String,
        default:""
    },
    text:{
        type:String,
        default:"",
    },
    userId:{
        type:String,
        require:true
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,ref:"Post"
    },
    parentId:{
        type:String,
        default:"",

    }

},{

    timestamps:true
})
const commentModel = mongoose.model("Comment",commentSchema)
module.exports = commentModel
