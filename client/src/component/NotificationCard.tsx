import { useQuery } from "@tanstack/react-query";
import { requestNotification, requestUser } from "../service/service";
import FacebookButton, { BUTTON_TYPE } from "./button/FacebookButton";
// import { Notification } from "./Notification";
import UserImage from "./UserImage";
import { UserInfo } from "../slices/userSlice";
import Default from '../assets/default-image.png'
import { useEffect, useState } from "react";
import { ConvertDateOnline } from "./RightHome";
import { notiType } from "../slices/notiSlice";
import { socket } from "../socket";
type NotificationCardProps = {
    noti: notiType
}

const NotificationCard = ({ noti }: NotificationCardProps) => {
    
    const now = Date.now()
    const notiDate = new Date(noti.updatedAt).getTime()
    const timeDif = now - notiDate
    const [isAction, setIsAction] = useState({
        state: false,
        type: ''
    })
    const convertDate = ConvertDateOnline(timeDif)
    const fetchUser = async () => {
        try {
            const userInfo = await requestUser.get(`/getUser/${noti.fromUserId}`)
            return userInfo.data as UserInfo
        } catch (e) {

        }

    }
    const { data, isLoading } = useQuery({
        queryKey: [`pending${noti._id}`],
        queryFn: () => fetchUser()
    })
    const fetchUserTo = async () => {
        try {
            const userInfo = await requestUser.get(`/getUser/${noti.toUserId}`)
            return userInfo.data as UserInfo
        } catch (e) {

        }

    }
   
    const dataUser= useQuery({
        queryKey: [`pendingsq${noti._id}`],
        queryFn: () => fetchUserTo()
    })

    console.log('cur',noti)
    if (noti.type == 'pending') {
        
  
        const AcceptRequest = async () => {
            try {
                const datas = {
                    fromUserId: noti.fromUserId,
                    toUserId: noti.toUserId,
                    type: 'accept',
                    linking: noti.linking,
                    _id: noti._id
                }
                setIsAction({
                    state: true,
                    type: 'accept'
                })
                const dataAdd = {
                    fromId:noti.fromUserId,
                    toId:noti.toUserId
                }
                const response = await requestNotification.put('/actionFriendRequest', datas)
                // const addFriend = await requestUser.put('/addFriend',dataAdd)
                socket.emit('acceptFriend',{from:noti.fromUserId,to:noti.toUserId})
                const update = {
                    userId:noti.fromUserId,
                    type:'inc'
                }
                requestUser.put('/setNumberNoti',update)
                // console.log('response:', addFriend.data)
            } catch (e) {
                console.log(e)
                alert("Lỗi chấp nhận kết bạn")
            }
        }
        const CancelRequest = async () => {
            try {
                const datas = {
                    fromUserId: noti.fromUserId,
                    toUserId: noti.toUserId,
                    type: 'cancel',
                    linking: noti.linking,
                    _id: noti._id
                }
                console.log('noticancel:',noti)
                setIsAction({
                    state: true,
                    type: 'cancel'
                })
                const response =  await requestNotification.put('/actionFriendRequest', datas)
                console.log('cancelRes',response.data)
                socket.emit('cancelFriend',{from:noti.fromUserId,to:noti.toUserId})
                const update = {
                    userId:noti.fromUserId,
                    type:'inc'
                }
                requestUser.put('/setNumberNoti',update)
            } catch (e) {
                console.log(e)
                alert("Lỗi chấp nhận kết bạn")
            }
        }
         

        return (
            <div className="notification-card">
                <UserImage img={data?.image ? data.image : Default} height={'3rem'} width={'3rem'} minHeight={'3rem'} minWidth={'3rem'} />

                <div style={{ marginLeft: '0.5rem', justifyContent: 'center', display: 'flex', flexDirection: 'column', wordBreak: 'break-word', textWrap: 'wrap', wordWrap: 'break-word' }}>
                    {!isAction.state ? (

                        <p style={{ color: 'white', fontSize: '1rem', textWrap: 'wrap', wordBreak: 'break-word' }}>
                            {data?.name ? data.name : "Unknown"} đã gửi lời mời kết bạn
                        </p>
                    ) : (
                        isAction.type == 'accept' ? (
                            <p style={{ color: 'white', fontSize: '1rem', textWrap: 'wrap', wordBreak: 'break-word' }}>
                                Đã chấp nhận lời mời kết bạn của {data?.name ? data.name : "Unknown"}
                            </p>
                        ) : (
                            <p style={{ color: 'white', fontSize: '1rem', textWrap: 'wrap', wordBreak: 'break-word' }}>
                                Đã từ chối lời mời kết bạn của {data?.name ? data.name : "Unknown"}
                            </p>
                        )
                    )}
                    <p style={{ color: '#aaadb1', fontSize: '0.75rem' }}>
                        {convertDate}
                    </p>
                    {!isAction.state && (
                        <div style={{ display: 'flex', flexDirection: 'row', width: '15rem', justifyContent: 'space-around' }}>
                            <FacebookButton onClick={() => AcceptRequest()} style={{ width: '6rem', height: '2.5rem', fontSize: '1rem', marginTop: '0.5rem' }} ButtonType={BUTTON_TYPE.basic} text={'Chấp nhận'} isLoading={false} />
                            <FacebookButton onClick={() => CancelRequest()} style={{ width: '6rem', height: '2.5rem', fontSize: '1rem', marginTop: '0.5rem' }} ButtonType={BUTTON_TYPE.cancel} text={'Xóa'} isLoading={false} />

                        </div>


                    )}
                </div>
            </div>
        );
    }
    if (noti.type == 'accept' || noti.type == 'cancel') {
        
        return (

            <div className="notification-card">
                <UserImage img={data?.image ? data.image : Default} height={'3rem'} width={'3rem'} minHeight={'3rem'} minWidth={'3rem'} />

                <div style={{ marginLeft: '0.5rem', justifyContent: 'center', display: 'flex', flexDirection: 'column', wordBreak: 'break-word', textWrap: 'wrap', wordWrap: 'break-word' }}>

                    {noti.type == 'accept' ? (
                        <p style={{ color: 'white', fontSize: '1rem', textWrap: 'wrap', wordBreak: 'break-word' }}>
                            Đã chấp nhận lời mời kết bạn của {data?.name ? data.name : "Unknown"}
                        </p>
                    ) : (
                        <p style={{ color: 'white', fontSize: '1rem', textWrap: 'wrap', wordBreak: 'break-word' }}>
                            Đã từ chối lời mời kết bạn của {data?.name ? data.name : "Unknown"}
                        </p>
                    )}

                    <p style={{ color: '#aaadb1', fontSize: '0.75rem' }}>
                        {convertDate}
                    </p>
                </div>
            </div>
        )
    }
    if(noti.type == 'success' || noti.type == 'reject'){
      
        console.log('userN:',dataUser.data)
        return(
            <div className="notification-card">
                <UserImage img={dataUser.data?.image ? dataUser.data.image : Default} height={'3rem'} width={'3rem'} minHeight={'3rem'} minWidth={'3rem'} />

                <div style={{ marginLeft: '0.5rem', justifyContent: 'center', display: 'flex', flexDirection: 'column', wordBreak: 'break-word', textWrap: 'wrap', wordWrap: 'break-word' }}>

                    {noti.type == 'success' ? (
                        <p style={{ color: 'white', fontSize: '1rem', textWrap: 'wrap', wordBreak: 'break-word' }}>
                            {dataUser.data?.name ? dataUser.data.name : "Unknown"} đã chấp nhận lời mời kết bạn
                        </p>
                    ) : (
                        <p style={{ color: 'white', fontSize: '1rem', textWrap: 'wrap', wordBreak: 'break-word' }}>
                            {dataUser.data?.name ? dataUser.data.name : "Unknown"} đã từ chối lời mời kết bạn

                        </p>
                    )}

                    <p style={{ color: '#aaadb1', fontSize: '0.75rem' }}>
                        {convertDate}
                    </p>
                </div>
            </div>
        )
    }

}

export default NotificationCard;