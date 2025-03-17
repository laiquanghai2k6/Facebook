const userModel = require('../Models/userModel')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const sharp = require('sharp')
const clientUrl = require('..')
const { cloudinary } = require('../Cloud/clounary.js')
const fs = require('fs')
const { default: mongoose } = require('mongoose')
const loginUser = async (req, res) => {
    const { email, password } = req.body
    let user = await userModel.findOne({ email })
    if (!user) return res.status(400).json('Người dùng không tồn tại')
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json('Sai mật khẩu')

    return res.status(200).json(user)
}

const registerUser = async (req, res) => {
    const { email, password, lastName, firstName, gender, birth } = req.body
    console.log(lastName)
    let user = await userModel.findOne({ email })
    if (user) return res.status(400).json('Đã tồn tại người dùng')
    if (password.length < 6) return res.status(400).json('Mật khẩu 6 chữ cái trở lên')
    if (!validator.isEmail(email)) return res.status(400).json('Email định dạng sai')
    user = new userModel({
        email,
        password,
        lastName,
        firstName,
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
            .resize(500, 500)
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
            .resize(500, 500)
            .toFormat('jpeg')
            .toBuffer()
        await cloudinary.uploader.upload_stream({ folder: 'user_images' }, async (error, result) => {
            if(error) return res.status(400).json('Lỗi api cloudinary')
            fs.unlinkSync(req.file.path);
            currentUser.backgroundImage = result.secure_url
            await currentUser.save()
            return res.status(200).json(result.secure_url)
        }).end(fileBuffer)

    } catch(e){
        console.log(e)
        return res.status(400).json(e)
    }

}




module.exports = { loginUser, registerUser, uploadUserImage,uploadUserBackground }
