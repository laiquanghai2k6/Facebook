const postModel = require("../Models/postModel")
const userModel = require("../Models/userModel")
const { cloudinary } = require('../Cloud/clounary')
const fs = require('fs')
const sharp = require("sharp")
const client = require('../redisF/redisClient')
const createPost = async (req, res) => {

    const { userId, text, type } = req.body
    const user = await userModel.exists({ _id: userId })
    if (!user) return res.status(400).json('Không thấy người dùng')
    const newPost = await new postModel({
        text: text,
        userId: userId,
        type: type
    })
    await client.del('post:page1')
    await newPost.save()
    return res.status(200).json(newPost)
}
const createPostWithImage = async (req, res) => {
    try {
        const filePath = req.file.buffer
        const { userId, text, type } = req.body
        const user = await userModel.exists({ _id: userId })
        if (!user) return res.status(400).json('Không thấy người dùng')
        if (!filePath) return res.status(400).json('Không thấy ảnh')
        const fileBuffer = await sharp(filePath)
            .toFormat('jpeg')
            .toBuffer()
        await cloudinary.uploader.upload_stream({ folder: 'posts_image' }, async (error, result) => {
            if (error) return res.status(400).json('Lỗi cloudinary')
            const newPost = await new postModel({
                image: result.secure_url,
                text: text,
                userId: userId,
                type: type
            })
            await client.del('post:page1')

            await newPost.save()
            return res.status(200).json(newPost)
        }).end(fileBuffer)
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }


}
const createPostWithVideo = async (req, res) => {
    try {

        const user = await userModel.exists({ _id: req.body.userId })
        if (!user) return res.status(400).json("Không thấy người dùng")
        const filePath = req.file.buffer
        const { userId, text, type } = req.body
        if (!filePath) return res.status(400).json('Không thấy video')
        await cloudinary.uploader.upload_stream({
            resource_type: 'video',
            folder: 'videos',
            transformation: [{ width: 1280, height: 720, crop: 'limit' }]
        }, async (err, result) => {
            if (err) return res.status(500).json('Tải video không thành công')

            const newPost = postModel({
                video: result.secure_url,
                text: text,
                userId: userId,
                type: type
            })
            await client.del('post:page1')

            await newPost.save()
            return res.status(200).json(newPost)

        }).end(filePath)

    } catch (e) {
        console.log(e)
        return res.status(500).json('Lỗi up video')
    }
}
const getAllPost = async (req, res) => {
    try {

        let { limit, page } = req.query;
        limit = parseInt(limit) || 10;
        page = parseInt(page) || 1;
        const skip = (page - 1) * limit
        // const cacheKey = `post:page${page}`
        // const cache = await client.get(cacheKey)
        // if (cache != null) {
            // console.log('cache page:', page)
            // return res.status(200).json(JSON.parse(cache))
        // }
        const posts = await postModel.find({})
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean()
        const length = await postModel.countDocuments()
        const responsePost = {
            hasMore: page * limit < length,
            page: parseInt(page),
            post: posts
        }
        // await client.set(cacheKey, JSON.stringify(responsePost), { Ex: 180 })

        return res.status(200).json(responsePost)
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
}
const getPostOfOneUser = async (req, res) => {
    try {
        const { userId, page, limit } = req.query
        const user = await userModel.exists({ _id: userId })
        if (!user) return res.status(400).json('Không tìm thấy user')
        const length = await postModel.countDocuments({ userId: userId })
        const userPost = await postModel.find({ userId: userId })
            .sort({ createdAt: -1 })
            .skip((page - 1) * 10)
            .limit(limit)
            .lean()
        console.log(userPost)

        return res.status(200).json({
            hasMore: page * limit < length,
            page: parseInt(page),
            post: userPost
        })
    } catch (e) {
        console.log(e)

        return res.status(500).json('loi:', e)
    }
}
const getVideo = async (req, res) => {
    try {
        const { limit, page } = req.query
        const skip = (page - 1) * 10
        const countDocumentVideos = await postModel.countDocuments({ video: { $ne: "" } })
        const response = await postModel.find({ video: { $ne: "" } })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean()

        return res.status(200).json({
            hasMore: page * limit < countDocumentVideos,
            page: parseInt(page),
            post: response
        })

    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
}
const createPostShare = async (req, res) => {
    try {

        const { type, video, image, text, textShare, createdOrigin, userId, userIdShare } = req.body
        const user = await userModel.exists({ _id: userId })
        const userShare = await userModel.exists({ _id: userIdShare })

        if (!user || !userShare) return res.status(400).json('Không tìm thấy user')
        const newPostShared = new postModel({
            type,
            video,
            image,
            text,
            textShare,
            createdOrigin,
            userId,
            userIdShare,

        })
        await client.del('post:page1')

        await newPostShared.save()
        return res.status(200).json(newPostShared)
    } catch (e) {
        console.log(e)
        return res.status(500).json("Lỗi")
    }
}


const updateEmoji = async (req, res) => {
    try {
        const { postId, emoji, isInc, userId } = req.body
        let updatePost
        if (isInc) {
            const isLiked = await postModel.findOne({
                _id: postId,
                [`${emoji}.userId`]: userId
            })
            if (isLiked) return res.status(500).json('Người dùng đã like')

            updatePost = await postModel.findOneAndUpdate(
                {
                    _id: postId
                }, {
                $inc: { [`${emoji}.${emoji}`]: 1 },
                $addToSet: { [`${emoji}.userId`]: userId }
            },
                {
                    new: true
                }
            )
        } else {
            const isLiked = await postModel.findOne({
                _id: postId,
                [`${emoji}.userId`]: userId
            })
            if (!isLiked) return res.status(500).json('Người dùng chưa like')

            updatePost = await postModel.findOneAndUpdate(
                {
                    _id: postId
                }, {
                $inc: { [`${emoji}.${emoji}`]: -1 },
                $pull: { [`${emoji}.userId`]: userId }
            },
                {
                    new: true
                }
            )

        }

        return res.status(200).json(updatePost)



    } catch (e) {
        console.log("Lỗi emoji")
        return res.status(500).json(e)
    }
}

module.exports = { updateEmoji, getVideo, createPost, createPostShare, getPostOfOneUser, createPostWithImage, createPostWithVideo, getAllPost }