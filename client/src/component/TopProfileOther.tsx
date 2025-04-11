import FacebookButton, { BUTTON_TYPE } from "./button/FacebookButton";
import TopLeftProfile from "./TopLeftProfile";
import { UserInfo } from "../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { RootState } from "../store/store";
import { requestChat, requestMessage, requestNotification, requestUser } from "../service/service";
import { socket } from "../socket";
import { selectUserInfo } from "../selector/userSelector";
import { addNoti } from "../slices/notiSlice";
import { UserQuickChatID } from "./RightHome";
import { Chat } from "../pages/Home/Home";
import { addChat } from "../slices/chatSlice";
import { fullMessengerCard, setMessengerCard } from "../slices/messengerSlice";
import { Friend } from "./BodyProfile";
type TopProfileOtherProp = {
    user: UserInfo,
        friends:Friend[],
        isLoadingFriend:boolean
}
const TopProfileOther = ({ user,friends,isLoadingFriend }: TopProfileOtherProp) => {

    const currentNoti = useSelector((state: RootState) => state.notification.notification)
    const isRequestYet = currentNoti.some((noti) => {
        return noti.toUserId == user._id
    })
    const currentUser = useSelector(selectUserInfo)
    const currentChat = useSelector((state: RootState) => state.chats.chats)
    const currentMessengerCard = useSelector((state: RootState) => state.messengerCard)
    
    const isFriend = currentNoti.some((noti) => noti.toUserId == user._id && noti.type == 'success')
    const isReject = currentNoti.some((noti) => noti.toUserId == user._id && noti.type == 'reject')
    const [isAdd, setIsAdd] = useState(!isRequestYet)
    const [lastRequest, setLastRequest] = useState(isRequestYet)
    const dispatch = useDispatch()
    const debounce = (callback:Function,delay:number)=>{
        let timeout:NodeJS.Timeout | undefined = undefined
        return (isAdd:boolean,lastRequest:boolean)=>{
           
                clearTimeout(timeout)
            
            timeout = setTimeout(()=>{
                callback(isAdd,lastRequest)
            },delay)
        }
    }
const OpenNewCardMessenger = async ( ) => {
        const isExistChat = currentChat.find((chat) => chat.user[0] == user._id || chat.user[1] == user._id)
        let chatId = ""
        let userChat = []
        if (!isExistChat) {
            const now = new Date()
            try {
                const data = {
                    user1: currentUser._id,
                    user2: user._id
                }
                const initMessage = `Xin chào ${user.name}`
                const response = await requestChat.post('/createChat', data)
                const dataMessage = {
                    chatId: (response.data as Chat)._id,
                    text: initMessage,
                    senderId: currentUser._id
                }
                userChat = response.data.user
                chatId = (response.data as Chat)._id
                const dateLatestMessage = {
                    chatId: (response.data as Chat)._id,
                    lastMessage: initMessage,
                    senderId: currentUser._id
                }
                // console.log('resposne in Hree',response.data.user)
                socket.emit('sendMessage', {
                    fromUser:currentUser._id,
                    from: socket.id,
                    toSocketId: currentMessengerCard.userOnline[user._id],
                    message: `Xin chào ${user.name}`,
                    createdAt: now,
                    name: user.name,
                    imageUser: user.image,
                    image: "",
                    chatId: chatId,
                    isNew:true,
                    user:response.data.user,
                    seen1:false,
                    seen2:false,
                })
                const isUser1 = response?.data.user[0] == currentUser._id

                requestMessage.post('/createMessage', dataMessage)
                
                    if(isUser1){
                           const lastMessageMongodb = {...dateLatestMessage,seen1:true,seen2:false}
                           await requestChat.put('/updateLatestMessage', lastMessageMongodb)
                       }else{
                           const lastMessageMongodb = {...dateLatestMessage,seen1:false,seen2:true}
                           await requestChat.put('/updateLatestMessage', lastMessageMongodb)
                       }
                dispatch(addChat({
                    ...response.data,
                    lastMessage: initMessage,
                    senderId: currentUser._id
                } as Chat))
            } catch (e) {
                console.log(e)
                alert("Lỗi tạo đoạn chat")
            }
        } else {
            chatId = isExistChat._id
        }
        const width = window.innerWidth;
        const chat = currentChat.find((chats)=>chats._id == chatId )
        const isCardExist = currentMessengerCard.messengerCard.find((cards) => cards._id == user._id)
        const isUser1 = isCardExist?.user[0] == currentUser._id
        if(isUser1) console.log('im 1')
        else console.log('im2')
        const newCard: UserQuickChatID = {
            _id: user._id,
            name: user.name,
            image: user.image,
            lastOnline: user.lastOnline,
            chatId: chatId,
            seen1: isUser1 ? true : false,
            seen2:isUser1 ? false:true,
            user:chat?.user ? chat?.user : userChat,
        }
        const remToPx = 20 * 16
        if (!isCardExist) {
            if (currentMessengerCard.messengerCard.length == 0) {
                dispatch(setMessengerCard(newCard))
            }
            else if ((currentMessengerCard.messengerCard.length + 1) * remToPx <= 70 * (width / 100)) {
                dispatch(setMessengerCard(newCard))
            } else {
                dispatch(fullMessengerCard(newCard))
            }
        }
    }
    const requestApi = async (isAdd: boolean, lastRequest: boolean) => {
        if (isAdd && lastRequest != true) {

            try {
                const data = {
                    toUserId: user._id,
                    fromUserId: currentUser._id,

                }
                setLastRequest(isAdd)
                const response = await requestNotification.post('/createFriendNotification', data)


                dispatch(addNoti(response.data.notificationRequest))

                socket.emit('sendNotiFrom', response.data.notificationOpponent)


                const update = {
                    userId: user._id,
                    type: 'inc'
                }
                requestUser.put('/setNumberNoti', update)


                console.log('request')
                setLastRequest(isAdd)
            } catch (e) {
                console.log(e)
                alert('Lỗi gửi kết bạn')
            }

        }
        if (!isAdd && lastRequest != false) {
            try {
               
                 await requestNotification.delete(`/deleteFriendRequest/${user._id}/${currentUser._id}`)
                socket.emit('cancelNoti', user._id,)
                const update = {
                    userId: user._id,
                    type: 'dec'
                }
                requestUser.put('/setNumberNoti', update)
                console.log('cancel')

                setLastRequest(isAdd)
            } catch (e) {
                console.log(e)
                alert('Lỗi hủy kết bạn')
            }




        }
    }
     const CreateRequest = useMemo(() => {
            return debounce(requestApi, 1000)
        }, [])
    return (
        <div className="top-profile-container">
            <div className='top-profile-direct' >
                <TopLeftProfile friends={friends} isLoadingFriend={isLoadingFriend} user={user} type="other" />
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {!isFriend ? (

                    isAdd || isReject ? (

                    <FacebookButton onClick={() => {
                        setIsAdd((prev) => {
                            CreateRequest(prev, lastRequest)
                            return !prev
                        })

                    }} style={{ padding: '0.5rem', marginTop: '1.5rem', fontSize: '1rem', width: '7.5rem', height: '2.5rem', marginRight: '1rem' }} ButtonType={BUTTON_TYPE.basic} text="Thêm bạn bè" />
                    ) : (
                    <FacebookButton onClick={() => {
                        setIsAdd((prev) => {
                            CreateRequest(prev, lastRequest)
                            return !prev
                        })
                    }} style={{ padding: '0.5rem', marginTop: '1.5rem', fontSize: '1rem', width: '7.5rem', height: '2.5rem', marginRight: '1rem' }} ButtonType={BUTTON_TYPE.cancel} text="Hủy lời mời" />
                    )
                    ) : (
                    <FacebookButton style={{ padding: '0.5rem', marginTop: '1.5rem', fontSize: '1rem', width: '7.5rem', height: '2.5rem', marginRight: '1rem' }} ButtonType={BUTTON_TYPE.basic} text="Bạn bè" />
                    )}
                    {/* <FacebookButton className='btn1' style={{  }} isLoading={false} ButtonType={BUTTON_TYPE.basic} text='Thêm bạn bè' /> */}
                    <FacebookButton onClick={()=>OpenNewCardMessenger()} className='btn2' style={{ padding: '0.5rem', marginTop: '1.5rem', fontSize: '1rem', width: '7.5rem', height: '2.5rem', marginRight: '1rem' }} isLoading={false} ButtonType={BUTTON_TYPE.basic} text='Nhắn tin' />
                </div>
            </div>
        </div>
    );
}

export default TopProfileOther;