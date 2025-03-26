const sharp = require("sharp")
const { cloudinary } = require("../Cloud/clounary")
const commentModel = require("../Models/commentModel")
const postModel = require("../Models/postModel")
const userModel = require("../Models/userModel")
const fs = require('fs')

const getCommentOfPost = async(req,res)=>{
    try{
        const user = await  userModel.findById(req.params.userId).lean()
        const post = await postModel.findById(req.params.postId).lean()
        if(!user) return res.status(400).json("Không thấy người dùng")
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

        const post = await postModel.findById(req.params.postId).lean()
        if(!post) return res.status(400).json("Không thấy bài viết")
            const commentsLength = await commentModel.countDocuments({ postId: req.params.postId });
            return res.status(200).json(commentsLength)
    }catch(e){
        console.log(e)
        return res.status(500).json('Lỗi độ dài lấy bình luận')
    }

}
const getCommentReply = async (req,res)=>{
    try{
        const user = await  userModel.findById(req.params.userId).lean()
        const post = await postModel.findById(req.params.postId).lean()
        const commentParent = await commentModel.findById(req.params.commentId).lean()
        if(!user) return res.status(400).json("Không thấy người dùng")
        if(!post) return res.status(400).json("Không thấy bài viết")
        if(!commentParent) return res.status(400).json("Không thấy bình luận")

         const commentReply = await commentReplyModel.findById({parentCommentId:req.params.commentId});
            return res.status(200).json(commentReply)
    }catch(e){
        console.log(e)
        return res.status(500).json('Lỗi độ dài lấy bình luận')
    }
}

const createComment = async(req,res)=>{
    try{
        const {text,postId,userId,type,parentId} = req.body
        const user = await  userModel.findById(userId).lean()
        const post = await postModel.findById(postId).lean()
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
        const imageFile = req.file.path
        if(!imageFile) return res.status(400).json('Không thấy ảnh') 
        const {text,postId,userId,type,parentId} = req.body
        const user = await  userModel.findById(userId).lean()
        const post = await postModel.findById(postId).lean()
        if(!user) return res.status(400).json("Không thấy người dùng")
        if(!post) return res.status(400).json("Không thấy bài viết")
        const fileBuffer = await sharp(imageFile)
                                .toFormat('jpeg')
                                .toBuffer()
        let newComment
        await cloudinary.uploader.upload_stream({folder:'comments'},async (error,result)=>{
            if(error) return res.status(500).json('Tải ảnh không thành công')
            fs.unlinkSync(req.file.path)
            newComment =  new commentModel({
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
        const videoFile = req.file.path
        const user = await  userModel.findById(userId).lean()
        const post = await postModel.findById(postId).lean()
        if(!user) return res.status(400).json("Không thấy người dùng")
        if(!post) return res.status(400).json("Không thấy bài viết")
        const response = await cloudinary.uploader.upload(videoFile,{
            resource_type:'video',
            folder:'comments',
            transformation:[{width:1280,height:720,crop:'limit'}]
    })
        fs.unlinkSync(req.file.path)
        const newComments = await new commentModel({
            video:response.secure_url,
            text:text,
            postId:postId,
            userId:userId,
            type:type,
            parentId:parentId
        })
        await newComments.save()
        return res.status(200).json(newComments)
    }catch(e){
        console.log(e)
        return res.status(500).json('Lỗi tạo bình luận với video')
    }
}
module.exports={getLengthCommentOfPost,getCommentReply,createComment,createCommentWithImage,getCommentOfPost,createCommentWithVideo}