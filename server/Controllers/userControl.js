
const userModel = require('../Models/userModel.js')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const sharp = require('sharp')
const clientUrl = require('..')
const { cloudinary } = require('../Cloud/clounary.js')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const client = require('../redisF/redisClient.js')
const createAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}

// Tạo refresh token
const createRefreshToken = (userId) => {
    return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}
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
                    _id: 1,
                    image: 1,
                    name: 1,
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
                
                {$sort: { lastOnline: -1 }},
                { $project: { name: 1, image: 1, _id: 1, backgroundImage: 1, lastOnline: 1 } },
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
        
        // const cacheKey = `userInfo:${req.params.userId}`;
        // const cached = await client.get(cacheKey);
        // if (cached != null){
        //     console.log('cachedInfo ',cacheKey)
        //     return res.status(200).json(JSON.parse(cached));
        // }
        // await client.set(cacheKey, JSON.stringify(user), { EX: 180 });
        return res.status(200).json(user)
    } catch (e) {
        console.log(e)
        return res.status(500).json("Lỗi tìm người dùng")
    }
}
const getUserProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.userId)
            .select("-password")
            .lean()
        
        if (!user) return res.status(400).json("Lỗi tìm người dùng")
        // const cacheKey = `userProfile:${req.params.userId}`
        // const cache = await client.get(cacheKey)
      
        // if(cache != null){
            // console.log('cachedProfile ',cacheKey)
            // return res.status(200).json(JSON.parse(cache))
        // }
        
        // await client.set(cacheKey,JSON.stringify(user),{Ex:180})
        return res.status(200).json(user)
    } catch (e) {
        console.log(e)
        return res.status(500).json("Lỗi tìm người dùng")
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    const user = await userModel.findOne({ email }).lean()
    if (!email || !password) return res.status(400).json('Vui lòng điền đầy đủ')
    if (!user) return res.status(400).json('Người dùng không tồn tại')
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json('Sai mật khẩu')
    const accessToken = createAccessToken(user._id)
    const refreshToken = createRefreshToken(user._id)
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 3600 * 1000,
        path: '/'
    })
    return res.status(200).json({ accessToken, user })
    // return res.status(200).json(user)
}
const getUserWithToken = async (req, res) => {
    try {

        const user = await userModel.findById(req.userId).lean()
        return res.status(200).json(user)

    } catch (e) {
        console.log(e)
        return res.status(500).json({ error: 'Lỗi không thể đăng nhập' })
    }
}
const registerUser = async (req, res) => {
    const { email, password, name, gender, birth } = req.body

    let user = await userModel.exists({ email: email })
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
    const accessToken = createAccessToken(user._id)
    const refreshToken = createRefreshToken(user._id)
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 3600 * 1000,
        path: '/'
    })
    return res.status(200).json({ accessToken, user })
}
const uploadUserImage = async (req, res) => {
    try {

        if (!req.file) return res.status(400).json('Không có file ảnh')
        const filePath = req.file.buffer
        const currentUser = await userModel.findById(req.body.userId)

        const fileBuffer = await sharp(filePath)
            .toFormat('jpeg')
            .toBuffer();

        await cloudinary.uploader.upload_stream({ folder: 'user_images' }, async (error, result) => {
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
        const filePath = req.file.buffer
        const currentUser = await userModel.findById(req.body.userId)
        const fileBuffer = await sharp(filePath)
            .toFormat('jpeg')
            .toBuffer()
        await cloudinary.uploader.upload_stream({ folder: 'user_images' }, async (error, result) => {
            if (error) return res.status(400).json('Lỗi api cloudinary')
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
        const currentUser = await userModel.exists({ _id: req.body.userId })

        if (!currentUser) return res.status(400).json("Error")
        console.log('id:',req.body.userId)
        console.log('id:',req.body.time)

        await userModel.findOneAndUpdate({
            _id: req.body.userId
        }, {
            lastOnline: req.body.time
        })
        return res.status(200).json({message:'good'})

    } catch (e) {
        console.log(e)
        return res.status(400).json('Lỗi time')
    }
}


const addFriend = async (req, res) => {
    try {
        const { fromId, toId } = req.body
        const fromUser = await userModel.findById(fromId)
        const toUser = await userModel.findById(toId)
        if (fromId === toId) {
            return res.status(400).json({ error: "Bạn không thể kết bạn với chính mình" });
        }
        if (!fromUser || !toUser)
            return res.status(404).json({ error: 'Lỗi không thấy người kết bạn' })
        if (fromUser.friend.includes(toId) || toUser.friend.includes(fromId)) {
            return res.status(400).json({ error: "Hai người đã là bạn bè" });
        }
        fromUser.friend.push(toId)
        toUser.friend.push(fromId)
        await fromUser.save()
        await toUser.save()
        return res.status(200).json({ message: "Kết bạn thành công" });
    } catch (e) {
        console.log(e)
        return res.status(500).json({ error: 'Lỗi kết bạn' })
    }
}

const setNumberNoti = async (req, res) => {
    try {
        const { userId, numberNoti, type } = req.body
        const currentUser = await userModel.findById(userId)
        if (!currentUser)
            return res.status(404).json({ error: 'Lỗi không thấy người dùng' })
        console.log('type:', type)
        console.log('num:', numberNoti)
        console.log('userId:', userId)
        if (type == 'set')
            currentUser.numberNoti = numberNoti
        if (type == 'inc')
            currentUser.numberNoti = currentUser.numberNoti + 1
        if (type == 'dec')
            currentUser.numberNoti = currentUser.numberNoti - 1

        await currentUser.save()
        return res.status(200).json({ message: "cập nhật thông báo thành công" });
    } catch (e) {
        console.log(e)
        return res.status(500).json({ error: 'Lỗi cập nhật thông báo' })
    }
}
const handlerRefreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.status(401).json({ error: 'chưa có refreshToken ' })
    try {
        const decoded = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        console.log('decode:',decoded.userId)
        const userId = decoded.userId
        const currentUser = await userModel.exists({ _id: userId })
        if (!currentUser) return res.status(404).json({ error: 'Người dùng không tồn tại' })
        const accessToken = jwt.sign(
            { userId },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        )
        return res.status(200).json(accessToken)
    } catch (e) {
        return res.status(403)
    }
}

const LogOutUser = (req, res) => {
    console.log('logOut')
    res.clearCookie('refreshToken', {
        httpOnly: true,
        sameSite: 'None',
        secure: true
    })
    return res.status(200).json({ message: 'Đăng xuất thành công' })
}
const getFriendOfUser = async (req,res)=>{
    const {userId} = req.query
    const isUser = await userModel.exists({_id:userId})
    if(!isUser) return res.status(404).json({error:'Không tìm thấy user'})
    const currentUserFriend = await userModel.findById(userId)
    .select('friend')
    .lean()
    const allUser = await Promise.all(
        currentUserFriend.friend.map(async (friend)=>{
            const response = await userModel.findById(friend)
            .select("name image")
            .lean()
            
            return response
        })
    )
    
    return res.status(200).json(allUser)


}
module.exports = {getFriendOfUser, getUserWithToken, LogOutUser, handlerRefreshToken, setNumberNoti, getUser, addFriend, updateLastOnline, getUserProfile, getAllUserRandom, searchUser, setUserBio, setUserProfileInfo, loginUser, registerUser, uploadUserImage, uploadUserBackground }
