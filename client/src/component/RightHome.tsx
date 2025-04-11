import { useQuery } from "@tanstack/react-query";
import { UserInfo } from "../slices/userSlice";
import UserImage from "./UserImage";
import { requestChat, requestMessage, requestUser } from "../service/service";
import Default from '../assets/default-image.png'
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../socket";
import { RootState } from "../store/store";
import { fullMessengerCard, setMessengerCard } from "../slices/messengerSlice";
import { addChat } from "../slices/chatSlice";
import { Chat } from "../pages/Home/Home";
import LoadingRightHome from "./LoadingRightHome";
import React, { useRef } from "react";
type RightHomeProps = {
    currentUser: UserInfo
}
export type UserQuickChat = {
    _id: string,
    name: string,
    image: string,
    online?: boolean,
    lastOnline?: number,
}
export type UserQuickChatID = {
    _id: string,
    name: string,
    user: string[],
    image: string,
    online?: boolean,
    lastOnline?: number,
    chatId: string,
    seen1: boolean,
    seen2: boolean

}
export const ConvertDateOnline = (timeDif: number) => {

    const seconds = Math.floor(timeDif / 1000)
    const minutes = Math.floor(timeDif / 60000)
    const hour = Math.floor(timeDif / 3600000)
    const days = Math.floor(timeDif / 86400000)
    if (seconds < 60) {
        if (seconds < 0) {
            return `1 giây trước`
        } else return `${seconds} giây trước`
    } else if (minutes < 60) {
        return `${minutes} phút trước`
    } else if (hour < 24) {
        return `${hour} giờ trước`
    } else {
        return `${days} ngày trước`
    }

}
const RightHome: React.FC<RightHomeProps> = ({ currentUser }) => {
    const dispatch = useDispatch()
    const currentChat = useSelector((state: RootState) => state.chats.chats)
    const currentMessengerCard = useSelector((state: RootState) => state.messengerCard)

    const FetchUser = async () => {
        try {
            const response = await requestUser('/getAllUserRandom')
            return response.data as Array<UserQuickChat>
        } catch (e) {
            console.log(e)
            alert('Lỗi load người dùng')
        }
    }
    const { data, isLoading } = useQuery({
        queryKey: ['chat', currentMessengerCard.userOnline],
        queryFn: () => FetchUser(),
        staleTime: 5000,
        enabled: Object.keys(currentMessengerCard.userOnline).length > 0,
        refetchOnWindowFocus: false

    })
    const openingUserIds = useRef<Set<string>>(new Set())

    const OpenNewCardMessenger = async (user: UserQuickChat) => {
        if (openingUserIds.current.has(user._id)) return
        openingUserIds.current.add(user._id)
        const isCardExist = currentMessengerCard.messengerCard.find((cards) => cards._id == user._id)
        if (isCardExist) {
            openingUserIds.current.delete(user._id)
            return
        }

        let chatId = ""
        let userChat = []
        const isExistChat = currentChat.find((chat) => chat.user[0] == user._id || chat.user[1] == user._id)

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
                    fromUser: currentUser._id,
                    from: socket.id,
                    toSocketId: currentMessengerCard.userOnline[user._id],
                    message: `Xin chào ${user.name}`,
                    createdAt: now,
                    name: user.name,
                    imageUser: user.image,
                    image: "",
                    chatId: chatId,
                    isNew: true,
                    user: response.data.user,
                    seen1: false,
                    seen2: false,
                })
                const isUser1 = response?.data.user[0] == currentUser._id

                requestMessage.post('/createMessage', dataMessage)

                if (isUser1) {
                    const lastMessageMongodb = { ...dateLatestMessage, seen1: true, seen2: false }
                    await requestChat.put('/updateLatestMessage', lastMessageMongodb)
                } else {
                    const lastMessageMongodb = { ...dateLatestMessage, seen1: false, seen2: true }
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
                openingUserIds.current.delete(user._id)
            }
        } else {
            chatId = isExistChat._id
        }
        const width = window.innerWidth;
        const chat = currentChat.find((chats) => chats._id == chatId)
        const isUser1 = chat?.user[0] == currentUser._id

        const newCard: UserQuickChatID = {
            _id: user._id,
            name: user.name,
            image: user.image,
            lastOnline: user.lastOnline,
            chatId: chatId,
            seen1: isUser1 ? true : false,
            seen2: isUser1 ? false : true,
            user: chat?.user ? chat?.user : userChat,
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
        openingUserIds.current.delete(user._id)
    }

    return (
        <div className="right-home">
            {isLoading && <LoadingRightHome />}

            <p style={{ marginBottom: '1rem', marginTop: '1rem' }}>Người liên hệ</p>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '5rem' }}>

                {data?.map((u, i) => {

                    const isOnline = Object.keys(currentMessengerCard.userOnline).includes(u._id)
                    let convertDate = ""
                    if (!isOnline && u.lastOnline) {
                        const time = new Date().getTime()
                        convertDate = ConvertDateOnline(time - u.lastOnline)
                    }
                    if (currentUser._id != u._id) {
                        return (
                            <React.Fragment key={u._id}>
                                <div key={i} onClick={() => {
                                    OpenNewCardMessenger(u)
                                }} className="left-home-items" style={{ justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '70%', flexDirection: 'row', alignItems: 'center' }}>

                                        <UserImage img={u.image ? u.image : Default} height={'2.5rem'} width={'2.5rem'} />
                                        <p className="left-home-text">{u.name}</p>
                                    </div>
                                    {isOnline ? (

                                        <div style={{ width: '0.85rem', marginRight: '2rem', height: '0.85rem', backgroundColor: '#3fbb46', borderRadius: '50%', left: '1.9rem', bottom: '0.1rem' }}></div>
                                    ) : (
                                        <p style={{ color: 'gray' }}>{convertDate}</p>
                                    )}

                                </div>

                            </React.Fragment>
                        )
                    }
                })}
            </div>

        </div>
    );
}


export default RightHome;