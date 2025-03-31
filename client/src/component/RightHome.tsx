import { useQuery } from "@tanstack/react-query";
import { User } from "../slices/userSlice";
import UserImage from "./UserImage";
import { requestChat, requestMessage, requestUser } from "../service/service";
import Spinner from "./Spinner";
import Default from '../assets/default-image.png'
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../selector/userSelector";
import { socket } from "../socket";
import { RootState } from "../store/store";
import { fullMessengerCard, setMessengerCard } from "../slices/messengerSlice";
import moment from "moment";
import { addChat } from "../slices/chatSlice";
import { Chat } from "../pages/Home/Home";
import { useRef } from "react";
type MidHomeProps = {

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
    image: string,
    online?: boolean,
    lastOnline?: number,
    chatId: string
}
export const ConvertDateOnline = (timeDif: number) => {

    const seconds = Math.floor(timeDif / 1000)
    const minutes = Math.floor(timeDif / 60000)
    const hour = Math.floor(timeDif / 3600000)
    const days = Math.floor(timeDif / 86400000)
    if (seconds < 60) {
        return `${seconds} giây trước`
    } else if (minutes < 60) {
        return `${minutes} phút trước`
    } else if (hour < 24) {
        return `${hour} giờ trước`
    } else if (days < 4) {
        return `${days} ngày trước`
    } else return "(Unknown)"

}
const RightHome: React.FC<MidHomeProps> = () => {
    const currentUser = useSelector(selectUserInfo)
    const dispatch = useDispatch()
    const currentChat = useSelector((state: RootState) => state.chats.chats)
    const userOnline = useSelector((state:RootState)=>state.messengerCard.userOnline)
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
        queryKey: ['chat'],
        queryFn: () => FetchUser()
    })
    const OpenNewCardMessenger = async (user: UserQuickChat) => {
        const isExistChat = currentChat.find((chat) => chat.user[0] == user._id || chat.user[1] == user._id)
        let chatId = ""
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
                chatId = (response.data as Chat)._id
                const dateLatestMessage = {
                    chatId: (response.data as Chat)._id,
                    lastMessage: initMessage,
                    senderId: currentUser._id
                }
                socket.emit('sendMessage', {
                    fromUser:currentUser._id,
                    from: socket.id,
                    toSocketId: userOnline[user._id],
                    message: `Xin chào ${user.name}`,
                    createdAt: now,
                    name: user.name,
                    imageUser: user.image,
                    image: "",
                    chatId: chatId
                })
                await requestMessage.post('/createMessage', dataMessage)
                await requestChat.put('/updateLatestMessage', dateLatestMessage)

                dispatch(addChat({
                    ...response.data,
                    lastMessage: initMessage,
                    isSeen: false,
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
        const isCardExist = currentMessengerCard.messengerCard.find((cards) => cards._id == user._id)
        const newCard: UserQuickChatID = {
            _id: user._id,
            name: user.name,
            image: user.image,
            lastOnline: user.lastOnline,
            chatId: chatId
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

    return (
        <div className="right-home">
            {isLoading && <Spinner />}
            <p style={{ marginBottom: '1rem' }}>Người liên hệ</p>
            {data?.map((u, i) => {
                const isOnline = Object.keys(currentMessengerCard.userOnline).includes(u._id)
                let convertDate = ""
                if (!isOnline && u.lastOnline) {
                    const time = new Date().getTime()
                    convertDate = ConvertDateOnline(time - u.lastOnline)
                }
                if (currentUser._id != u._id) {
                    return (
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
                    )
                }
            })}

        </div>
    );
}


export default RightHome;