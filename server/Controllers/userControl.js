
const userModel = require('../Models/userModel.js')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const sharp = require('sharp')
const clientUrl = require('..')
const { cloudinary } = require('../Cloud/clounary.js')
const fs = require('fs')

const searchUser = async (req, res) => {
    try {
        const user = await userModel.aggregate([
            {
                $search: {
                    index: "userName",
                    autocomplete: {
                        query: req.query.name,
                        path: "name",
                        fuzzy: { maxEdits: 1 }
                    }
                }
            }, {
                $limit: 6
            }, {
                $project: { 
                    _id:1,
                    image:1,
                    name:1,
                 }
            }
        ])
        return res.status(200).json(user)
    } catch (e) {
        console.log(e)
        return res.status(200).json([])
    }
}

const getAllUserRandom = async (req, res) => {
    try {
        const countDocument = await userModel.countDocuments().lean()
        const user = await userModel.aggregate(
            [
                { $sample: { size: countDocument } },
                { $project: { name: 1, image: 1, _id: 1, backgroundImage: 1,lastOnline:1 } }
            ]
        )
        return res.status(200).json(user)
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
}

const getUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.userId)
            .select("name image backgroundImage lastOnline")
            .lean()
        if (!user) return res.status(400).json("Lỗi tìm người dùng")
        return res.status(200).json(user)
    } catch (e) {
        console.log(e)
        return res.status(500).json("Lỗi tìm người dùng")
    }
}
const getUserProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.userId)
            .select("-password -lastOnline")
            .lean()
        if (!user) return res.status(400).json("Lỗi tìm người dùng")
        return res.status(200).json(user)
    } catch (e) {
        console.log(e)
        return res.status(500).json("Lỗi tìm người dùng")
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    const user = await userModel.findOne({ email }).lean()

    if (!user) return res.status(400).json('Người dùng không tồn tại')
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json('Sai mật khẩu')
        
    return res.status(200).json(user)
}

const registerUser = async (req, res) => {
    const { email, password, name, gender, birth } = req.body

    let user = await userModel.exists({ email:email })
    if (user) return res.status(400).json('Đã tồn tại người dùng')
    if (password.length < 6) return res.status(400).json('Mật khẩu 6 chữ cái trở lên')
    if (!validator.isEmail(email)) return res.status(400).json('Email định dạng sai')
    user = new userModel({
        email,
        password,
        name,
        gender,
        birth
    })
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()
    return res.status(200).json(user)
}
const uploadUserImage = async (req, res) => {
    try {

        if (!req.file) return res.status(400).json('Không có file ảnh')
        const filePath = req.file.path
        const currentUser = await userModel.findById(req.body.userId)

        const fileBuffer = await sharp(filePath)
            .toFormat('jpeg')
            .toBuffer();

        await cloudinary.uploader.upload_stream({ folder: 'user_images' }, async (error, result) => {
            fs.unlinkSync(req.file.path);
            currentUser.image = result.secure_url
            await currentUser.save()
            if (error) return res.status(400).json(error);
            return res.status(200).json(result.secure_url);

        }).end(fileBuffer);

    } catch (e) {
        console.log('Lỗi upload ảnh:', e);
        res.status(500).json('Lỗi khi upload ảnh');
    }
}

const uploadUserBackground = async (req, res) => {
    try {

        if (!req.file) return res.status(400).json('Tải ảnh không thành công')
        const filePath = req.file.path
        const currentUser = await userModel.findById(req.body.userId)
        const fileBuffer = await sharp(filePath)
            .toFormat('jpeg')
            .toBuffer()
        await cloudinary.uploader.upload_stream({ folder: 'user_images' }, async (error, result) => {
            if (error) return res.status(400).json('Lỗi api cloudinary')
            fs.unlinkSync(req.file.path);
            currentUser.backgroundImage = result.secure_url

            await currentUser.save()
            return res.status(200).json(result.secure_url)
        }).end(fileBuffer)

    } catch (e) {
        console.log(e)
        return res.status(400).json(e)
    }

}

const setUserBio = async (req, res) => {
    try {
        console.log('in')
        const currentUser = await userModel.findById(req.body.userId)
        if (!currentUser) return res.status(400).json("Error")
        currentUser.bio = req.body.bio
        await currentUser.save()
        return res.status(200).json()
    } catch (e) {
        console.log(e)
        return res.status(400).json()
    }
}
const setUserProfileInfo = async (req, res) => {
    try {

        const currentUser = await userModel.findById(req.body.userId)
        if (!currentUser) return res.status(400).json("Error")
        const { live, from, relationship, birth, gender } = req.body
        currentUser.live = live
        currentUser.from = from
        currentUser.relationship = relationship
        currentUser.birth = birth
        currentUser.gender = gender
        await currentUser.save()
        return res.status(200).json()
    } catch (e) {
        console.log(e)
        return res.status(400).json()
    }
}
const updateLastOnline = async (req, res) => {
    
    try {
        const currentUser = await userModel.exists({_id:req.body.userId})
        
        if (!currentUser) return res.status(400).json("Error")
        await userModel.findOneAndUpdate({
            _id:req.body.userId
        }, {
            lastOnline: req.body.time
        })
        return res.status(200).json('good')
        
    }catch (e){
        console.log(e)
        return res.status(400).json('Lỗi time')
    }
}




module.exports = { getUser,updateLastOnline,getUserProfile, getAllUserRandom, searchUser, setUserBio, setUserProfileInfo, loginUser, registerUser, uploadUserImage, uploadUserBackground }
