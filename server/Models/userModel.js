
const mongoose = require('mongoose')





const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        minlength:1,
        maxlength:100
    },
    gender:{
        type:String,
        require:true,
        minlength:1,
        maxlength:100
    },
    email:{
        type:String,
        require:true,
        minlength:3,
        maxlength:100
    },
    password:{
        type:String,
        require:true,
        minlength:6,
        maxlength:100
    },
    live:{
        type:String,
        maxlength:100,
        default:"Chưa có",
    },
    from:{
        type:String,
        maxlength:100,
        default:"Chưa có"

    },
    bio:{
        type:String,
        default:"",
    },
    relationship:{
        type:String,
        maxlength:100,
        default:"Chưa có"

    },
    image:{
        type:String,
        default:""

    },
    backgroundImage:{
        type:String,
        default:""
    },
    friend:{
        type:Array,

    },
    birth:{
        type:String,
        require:true
    },
    post:[{
        type:mongoose.Schema.Types.ObjectId,ref:'Post'
    }],
    lastOnline:{
        type:Number,
        default:0
    },
    chats:{
        type:Array,
        default:[]
    }


})

const userModel = mongoose.model("User",userSchema)

module.exports = userModel


