
const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    image:{
        type:String,
    },
    text:{
        type:String
    }
},{
    timestamps:true
})

const userSchema = new mongoose.Schema({
    lastName:{
        type:String,
        require:true,
        minlength:1,
        maxlength:100
    },
    firstName:{
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
        default:"",
    },
    from:{
        type:String,
        maxlength:100,
        default:""

    },
    relationship:{
        type:String,
        maxlength:100,
        default:""

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
    post:{
        type:[postSchema]
    }

})

const userModel = mongoose.model("User",userSchema)

module.exports = userModel

