const sharp = require("sharp")
const { cloudinary } = require("../Cloud/clounary")
const commentModel = require("../Models/commentModel")
const postModel = require("../Models/postModel")
const userModel = require("../Models/userModel")
const fs = require('fs')

const getCommentOfPost = async(req,res)=>{
    try{
        const post = await postModel.exists({_id:req.params.postId})
        if(!post) return res.status(400).json("Không thấy bài viết")
        const comments = await commentModel.find({postId:req.params.postId}).sort({createdAt:-1}).lean()
        return res.status(200).json(comments)
    }catch(e){
        console.log(e)
        return res.status(500).json('Lỗi lấy bình luận')
    }
  
}
const getLengthCommentOfPost = async(req,res)=>{
    try{

        const post = await postModel.exists({_id:req.params.postId})
        if(!post) return res.status(400).json("Không thấy bài viết")
            const commentsLength = await commentModel.countDocuments({ postId: req.params.postId });
            return res.status(200).json(commentsLength)
    }catch(e){
        console.log(e)
        return res.status(500).json('Lỗi độ dài lấy bình luận')
    }

}


const createComment = async(req,res)=>{
    try{
        const {text,postId,userId,type,parentId} = req.body
        const user = await  userModel.exists({_id:userId})
        const post = await postModel.exists({_id:postId})
        if(!user) return res.status(400).json("Không thấy người dùng")
        if(!post) return res.status(400).json("Không thấy bài viết")
        
        const newComment = new commentModel({
            text: text,
            postId: postId,
            userId: userId,
            type: type,
            parentId: parentId
        })
        await newComment.save()
        return res.status(200).json(newComment)
    }catch(e){
        console.log(e)
        return res.status(500).json('Lỗi tạo bình luận')
    }
    
}
const createCommentWithImage = async(req,res)=>{
    try{
        const imageFile = req.file.buffer
        if(!imageFile) return res.status(400).json('Không thấy ảnh') 
        const {text,postId,userId,type,parentId} = req.body
        const user = await  userModel.exists({_id:userId})
        const post = await postModel.exists({_id:postId})
        if(!user) return res.status(400).json("Không thấy người dùng")
        if(!post) return res.status(400).json("Không thấy bài viết")
        const fileBuffer = await sharp(imageFile)
                                .toFormat('jpeg')
                                .toBuffer()
        
        await cloudinary.uploader.upload_stream({folder:'comments'},async (error,result)=>{
            if(error) return res.status(500).json('Tải ảnh không thành công')
            // fs.unlinkSync(req.file.path)
            const  newComment =  new commentModel({
            image:result.secure_url,
            text:text,
            postId:postId,
            userId:userId,
            type:type,
            parentId:parentId
        })
        await newComment.save()
        return res.status(200).json(newComment)


        }).end(fileBuffer)
        
    }catch(e){
        console.log(e)
        return res.status(500).json('Lỗi tạo bình luận với ảnh')
    }
}
const createCommentWithVideo =async (req,res)=>{
    try{
        const {text,postId,userId,type,parentId} = req.body
        const videoFile = req.file.buffer
        const user = await  userModel.exists({_id:userId})
        const post = await postModel.exists({_id:postId})
        if(!user) return res.status(400).json("Không thấy người dùng")
        if(!post) return res.status(400).json("Không thấy bài viết")
        await cloudinary.uploader.upload_stream({
            resource_type:'video',
            folder:'comments',
            transformation:[{width:1280,height:720,crop:'limit'}]
    },async (error,result)=>{
        if(error) return res.status(500).json('Tải video không thành công')
        const newComments = await new commentModel({
            video:result.secure_url,
            text:text,
            postId:postId,
            userId:userId,
            type:type,
            parentId:parentId
        })
        await newComments.save()
        return res.status(200).json(newComments)
    }).end(videoFile)
       
    }catch(e){
        console.log(e)
        return res.status(500).json('Lỗi tạo bình luận với video')
    }
}
const updateChildren = async (req,res)=>{
    try{
        const {commentId} =req.body
        const updateComment = await commentModel.findOneAndUpdate({
            _id:commentId
        },{
            $inc:{children:1}
        })
        return res.status(200).json(updateComment)
    }catch(e){
        console.log(e)
        return res.status(500).json('Lỗi update phản hồi')
    }
}


module.exports={getLengthCommentOfPost,updateChildren,createComment,createCommentWithImage,getCommentOfPost,createCommentWithVideo}