

const mongoose = require('mongoose')


const likeSchema = new mongoose.Schema({
    like:{
        type:Number,
        default:0
    },
    userId:{
        type:Array
    }
})
const hahaSchema = new mongoose.Schema({
    haha:{
        type:Number,
        default:0
    },
    userId:{
        type:Array
    }
})
const loveSchema = new mongoose.Schema({
    love:{
        type:Number,
        default:0
    },
    userId:{
        type:Array
    }
})
const sadSchema = new mongoose.Schema({
    sad:{
        type:Number,
        default:0
    },
    userId:{
        type:Array
    }
})
const wowSchema = new mongoose.Schema({
    wow:{
        type:Number,
        default:0
    },
    userId:{
        type:Array
    }
})
const angrySchema = new mongoose.Schema({
    angry:{
        type:Number,
        default:0
    },
    userId:{
        type:Array
    }
})
const postSchema = new mongoose.Schema({
    type:{
        type:String,
        default:"",
        require:true
    },
    textShare:{
        type:String,
        default:"",
    },
    createdOrigin:{
        type:String,
        default:"",
    },
    userIdShare:{
        type:String,
        default:"",
    },
    video:{
        type:String,
        default:"",
    },
    image: {
        type: String,
        default:"",
    },
    text: {
        type: String,
        default:""
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    },
    like:{
        type:likeSchema,
        default:()=>({})
    },
    wow:{
        type:wowSchema,
        default:()=>({})
    },
    haha:{
        type:hahaSchema,
        default:()=>({})
    },
    sad:{
        type:sadSchema,
        default:()=>({})
    },
    love:{
        type:loveSchema,
        default:()=>({})
    },
    angry:{
        type:angrySchema,
        default:()=>({})
    }

},
    {timestamps: true}
)

const postModel = mongoose.model('Post',postSchema)

module.exports = postModel

