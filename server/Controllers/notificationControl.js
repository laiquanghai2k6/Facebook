const notificationModel = require("../Models/notificationModel")
const userModel = require("../Models/userModel")
const type = {
    request:'',
    cancel:'',
    accept:''
}

const createFriendNotification = async(req,res)=>{
    try{
        const {toUserId,fromUserId,owner} = req.body
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
        return res.status(200).json(newNotificationRequest)
    }catch(e){
        console.log(e)
        return res.status(500).json('Lỗi gửi lời mời kết bạn')
    }
}
const actionFriendRequest = async(req,res)=>{
    try{
        const {fromUserId,toUserId,owner,type,linking,notiId} = req.body
        const fromUser = await userModel.exists({_id:fromUserId})
        const toUser = await userModel.exists({_id:toUserId})
        const actionNotifi = await notificationModel.findById(notiId)
        const linkingNoti = await notificationModel.findById(linking)
        if(!fromUser || !toUser||!linkingNoti ||!actionNotifi) return res.status(404).json({error:'Không tìm thấy người chấp nhận'})
        linkingNoti.type = type
    }catch(e){
        console.log(e)
        return res.status(500).json('Lỗi gửi lời mời kết bạn')
    }
}
module.exports = {createFriendNotification,actionFriendRequest}