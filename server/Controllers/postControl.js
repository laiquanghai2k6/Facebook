const postModel = require("../Models/postModel")
const userModel = require("../Models/userModel")
const {cloudinary} = require('../Cloud/clounary')
const fs = require('fs')
const sharp = require("sharp")

const createPost = async (req,res)=>{

    const {userId,text,type} = req.body
    const user =await  userModel.findById(userId)
    if(!user) return res.status(400).json('Không thấy người dùng')
    const newPost = await new postModel({
        text:text,
        userId:userId,
        type:type
    }) 
    await newPost.save()
    return res.status(200).json(newPost)
}
const createPostWithImage = async (req,res)=>{
    try{
        const filePath = req.file.path
        const {userId,text,type} = req.body
        const user = await userModel.findById(userId)
        if(!user) return res.status(400).json('Không thấy người dùng')
        if(!filePath) return res.status('400').json('Không thấy ảnh')
        const fileBuffer = await sharp(filePath)
                                .toFormat('jpeg')
                                .toBuffer()
        await cloudinary.uploader.upload_stream({folder:'posts_image'},async(error,result)=>{
            if(error) return res.status('400').json('Lỗi cloudinary')
            fs.unlinkSync(req.file.path)
            const newPost = await new postModel({
                image:result.secure_url,
                text:text,
                userId:userId,
                type:type
            }) 
            await newPost.save()
            return res.status(200).json(newPost)
        }).end(fileBuffer)
    }catch(e){
        console.log(e)
        return res.status(500).json(e)
    }
   
    
}
const createPostWithVideo = async (req,res)=>{
    try{
        const user = await userModel.findById('req.body.userId')
        if(!user) return res.status(400).json("Không thấy người dùng")
        const filePath = req.file.path
        const {userId,text,type} = req.body
        if(!filePath) return res.status(400).json('Không thấy video')
        const response = await cloudinary.uploader.upload(filePath,{
            resource_type:'video',
            folder:'videos',
            transformation:[{width:1280,height:720,crop:'limit'}]
        })
        fs.unlinkSync(filePath)
        const newPost = postModel({
            video:response.secure_url,
            text:text,
            userId:userId,
            type:type
        })
        await newPost.save()
        return res.status(200).json(newPost)
    }catch(e){
        console.log(e)
        return res.status(500).json('Lỗi up video')
    }
}
const getAllPost = async (req,res)=>{
    try{
        const {limit,page} = req.query

        const skip = (page-1)*limit
        const posts = await postModel.find({})
                                     .sort({createdAt:-1})
                                     .skip(skip)
                                     .limit(limit)
                                     .lean()
        const length = await postModel.countDocuments()
        const responsePost = {
            hasMore:page*limit < length,
            page:parseInt(page),
            post:posts
        }
        return res.status(200).json(responsePost)
    }catch(e){
        console.log(e)
        return res.status(500).json('loi:',e)
    }
}
const getPostOfOneUser = async (req,res)=>{
    try{
        const user = await userModel.findById(req.body.userId).lean()
        if(!user) return res.status(400).json('Không tìm thấy user')
        const userPost = await postModel.find({userId:req.body.userId}).lean()
        return res.status(200).json(userPost)
    }catch(e){
        console.log(e)
        return res.status(500).json('loi:',e)
    }
}

module.exports = {createPost,getPostOfOneUser,createPostWithImage,createPostWithVideo,getAllPost}