import UserImage, { useLazyLoad } from "./UserImage";
import test from '../assets/FacebookIcon.png'
import FacebookButton, { BUTTON_TYPE } from "./button/FacebookButton";
import Default from '../assets/default-image.png'
import LikePostEmoji from '../assets/like-post.png'
import Love from '../assets/love.png'
import Haha from '../assets/haha.png'
import Wow from '../assets/wow.png'
import Sad from '../assets/sad.png'
import Angry from '../assets/angry.png'
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { requestNotification, requestUser } from "../service/service";
import { UserInfo } from "../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../selector/userSelector";
import { useNavigate } from "react-router-dom";
import { navigateHome } from "../slices/homeNavigateSlice";
import { socket } from "../socket";
import { RootState } from "../store/store";
import e from "cors";
import { addNoti } from "../slices/notiSlice";


type UserItemEmojiProps = {
    userId: string,
    emoji: string
}
const UserItemEmoji = ({ userId, emoji }: UserItemEmojiProps) => {
    const [ref, isVisible] = useLazyLoad()
    const currentNoti = useSelector((state:RootState)=>state.notification.notification)
    console.log('currentNoti:',currentNoti)
    
    const isRequestYet = currentNoti.some((noti)=>{
        return noti.toUserId == userId
    })
    const isFriend = currentNoti.some((noti)=>noti.toUserId == userId && noti.type == 'success')
    const isReject = currentNoti.some((noti)=>noti.toUserId == userId && noti.type == 'reject')
    console.log('currentNoti',currentNoti)
    const [isAdd, setIsAdd] = useState(!isRequestYet)
    const [lastRequest, setLastRequest] = useState(isRequestYet)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userOnline = useSelector((state:RootState)=>state.messengerCard.userOnline)
    
    const currentUser = useSelector(selectUserInfo)
    const FetchUser = async (id: string) => {
        try {
            const response = await requestUser(`/getUser/${id}`)
            return response.data as UserInfo
        } catch (e) {
            console.log(e)
            alert("Lỗi bài viết")
        }
    }
    const debounce = (callback: Function, delay: number) => {
        let time: NodeJS.Timeout | undefined = undefined
        return (isAdd: boolean, lastRequest: boolean) => {
            clearTimeout(time)
            time = setTimeout(() => {
                callback(isAdd, lastRequest)
            }, delay)
        }
    }
    const requestApi = async (isAdd: boolean, lastRequest: boolean) => {
        if (isAdd && lastRequest != true) {

            try {
                const data = {
                    toUserId: userId,
                    fromUserId: currentUser._id,
                    
                }
                setLastRequest(isAdd)
                const response = await requestNotification.post('/createFriendNotification', data)
             
                console.log('res:',response.data)
              
                dispatch(addNoti(response.data.notificationRequest))
              
                    socket.emit('sendNotiFrom',response.data.notificationOpponent)

                
                const update = {
                    userId:userId,
                    type:'inc'
                }
                 requestUser.put('/setNumberNoti',update)
                
                
                console.log('request')
                setLastRequest(isAdd)
            } catch (e) {
                console.log(e)
                alert('Lỗi gửi kết bạn')
            }

        }
        if (!isAdd && lastRequest != false) {
            try {
                const data = {
                    toUserId: userId,
                    fromUserId: currentUser._id,

                }
                const res = await requestNotification.delete(`/deleteFriendRequest/${userId}/${currentUser._id}`)
               

                    socket.emit('cancelNoti',userId,)
                
                const update = {
                    userId:userId,
                    type:'dec'
                }
                requestUser.put('/setNumberNoti',update)
                
                
                console.log('cancel',res.data)
                setLastRequest(isAdd)
            } catch (e) {

            }
            // isAdd = false
            // last = true



        }
    }
    const CreateRequest = useMemo(() => {
        return debounce(requestApi, 1000)
    }, [])

    // CLEARALL

    const { data, isLoading } = useQuery({
        queryKey: ['emoji', userId],
        queryFn: () => FetchUser(userId)
    })



    return (
        <div className="user-item-emoji-container">
            <div className="user-item-emoji-left">
                <div
                    onClick={() => {
                        dispatch(navigateHome(""))
                        navigate(`/profileOther?userId=${userId}`)
                    }}
                 className='icon-round-background' style={{ width: '2.5rem', height: '2.5rem' }} >
                    <img
                        ref={ref}
                        src={(isVisible && data?.image) ? data.image : Default}
                        style={{
                            width: '115%',
                            height: '115%',
                            objectFit: 'cover',
                            display: 'block',
                            position: 'absolute',
                            borderRadius: '50%',
                            opacity: isVisible ? '1' : '0.5',
                            transition: "opacity 0.3s"
                        }}
                        alt="Ảnh"


                    />
                    <div style={{ position: 'absolute', right: '0', bottom: '-0.4rem', height: '1.75rem', width: '1.75rem', borderRadius: '0.5rem' }}>
                        {emoji == 'like' && <img src={LikePostEmoji} style={{ width: '1.6rem', height: '1.6rem', position: 'fixed', objectFit: 'cover' }} />}
                        {emoji == 'love' && <img src={Love} style={{ width: '1.6rem', height: '1.6rem', position: 'fixed', objectFit: 'cover' }} />}
                        {emoji == 'haha' && <img src={Haha} style={{ width: '1.6rem', height: '1.6rem', position: 'fixed', objectFit: 'cover' }} />}
                        {emoji == 'wow' && <img src={Wow} style={{ width: '1.6rem', height: '1.6rem', position: 'fixed', objectFit: 'cover' }} />}
                        {emoji == 'sad' && <img src={Sad} style={{ width: '1.6rem', height: '1.6rem', position: 'fixed', objectFit: 'cover' }} />}
                        {emoji == 'angry' && <img src={Angry} style={{ width: '1.6rem', height: '1.6rem', position: 'fixed', objectFit: 'cover' }} />}

                    </div>
                </div>
                <p className="user-item-emoji-text"
                    onClick={() => {

                        dispatch(navigateHome(""))

                        navigate(`/profileOther?userId=${userId}`)
                    }}
                >{`${data?.name}`}</p>
            </div>

            {
                currentUser._id != userId && (
                    !isFriend?(
                        
                        isAdd||isReject ? (
    
                            <FacebookButton onClick={() => {
                                setIsAdd((prev) => {
                                    CreateRequest(prev, lastRequest)
                                    return !prev
                                })
    
                            }} style={{ height: '2rem', fontSize: '1rem', width: '10rem' }} ButtonType={BUTTON_TYPE.basic} text="Thêm bạn bè" />
                        ) : (
                            <FacebookButton onClick={() => {
                                setIsAdd((prev) => {
                                    CreateRequest(prev, lastRequest)
                                    return !prev
                                })
                            }} style={{ height: '2rem', fontSize: '1rem', width: '10rem' }} ButtonType={BUTTON_TYPE.cancel} text="Hủy lời mời" />
                        )
                    ) :(
                        <FacebookButton style={{ height: '2rem', fontSize: '1rem', width: '10rem' }} ButtonType={BUTTON_TYPE.basic} text="Bạn bè" />
                    )
                )
            }

        </div>
    );
}

export default UserItemEmoji;