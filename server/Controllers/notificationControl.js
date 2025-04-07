const notificationModel = require("../Models/notificationModel")
const userModel = require("../Models/userModel")
const type = {
    request:'',
    cancel:'',
    accept:''
}

const createFriendNotification = async(req,res)=>{
    try{
        const {toUserId,fromUserId} = req.body
        const fromUser = await userModel.exists({_id:fromUserId})
        const toUser = await userModel.exists({_id:toUserId})
        if(!fromUser || !toUser) return res.status(404).json({error:'Không tìm thấy người kết bạn'})
        const newNotificationRequest = new notificationModel({
            toUserId:toUserId,
            owner:fromUserId,
            fromUserId:fromUserId,
            type:'request'
        })
        const newNotificationOpponent = new notificationModel({
            owner:toUserId,
            fromUserId:fromUserId,
            toUserId:toUserId,
            type:'pending',
            linking:newNotificationRequest._id
        })
        await newNotificationRequest.save()
        await newNotificationOpponent.save()
        return res.status(200).json({
            notificationRequest: newNotificationRequest,
            notificationOpponent: newNotificationOpponent
        })
    }catch(e){
        console.log(e)
        return res.status(500).json('Lỗi gửi lời mời kết bạn')
    }
}
const deleteFriendRequest = async(req,res)=>{
    try{
        const {fromUserId,toUserId} = req.params
        const fromUser = await userModel.exists({_id:fromUserId})
        const toUser = await userModel.exists({_id:toUserId})
        if(!fromUser || !toUser) return res.status(404).json({error:'Không tìm thấy người kết bạn'})
         = await notificationModel.findOneAndDelete({
            fromUserId:fromUserId,
            toUserId:toUserId,
            owner:fromUserId
        })
         await notificationModel.findOneAndDelete({
            fromUserId:fromUserId,
            toUserId:toUserId,
            owner:toUserId
        })
        return res.status(200).json({message:'success'})
    }catch(e){
        console.log(e)
        return res.status(500).json('Lỗi gửi lời mời kết bạn')
    }
}
const actionFriendRequest = async(req,res)=>{
    try{
        const {fromUserId,toUserId,type,linking,_id} = req.body
        const fromUser = await userModel.exists({_id:fromUserId})
        const toUser = await userModel.exists({_id:toUserId})
        if(!fromUser || !toUser) return res.status(404).json({error:'Không tìm thấy người kết bạn'})
        const toUserType = type == 'accept' ? 'accept' : 'cancel'
        const fromUserType = type == 'accept' ? 'success' : 'reject'

        const toUserNoti = await notificationModel.findOneAndUpdate(
            {_id:_id},
            {
                type:toUserType
            },
            {
                new:true
            }
        )
        const fromUserNoti = await notificationModel.findOneAndUpdate(
            {_id:linking},
            {
                type:fromUserType
            },
            {
                new:true
            }
        )
        return res.status(200).json({message:'success'})
        
    }catch(e){
        console.log(e)
        return res.status(500).json('Lỗi gửi lời mời kết bạn')
    }
}

const getNotification = async (req,res)=>{
    try{
        const {ownerId} = req.params
        const currentUser = await userModel.exists({_id:ownerId})
        if(!currentUser) return res.status(404).json({message:'Lỗi không thấy user'})
        const notification = await notificationModel.find({
            owner:ownerId
        })
        .sort({
            updatedAt:-1
        })
        return res.status(200).json(notification)
    }catch(e){
        console.log(e)
        return res.status(500).json('Lỗi lấy thông báo')
    }
}

module.exports = {createFriendNotification,actionFriendRequest,deleteFriendRequest,getNotification}