
import MessengerTextLeft from "./MessengerTextLeft";
import MessengerTextRight from "./MessengerTextRight";
import MessengerDownInput from "./MessengerDownInput";
import MessengerDownNav from "./MessengerDownNav";
import React, { useEffect, useRef } from "react";
import { UserQuickChatID } from "./RightHome";


import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useQuery } from "@tanstack/react-query";

import { requestChat, requestMessage } from "../service/service";
import { selectUserInfo } from "../selector/userSelector";
import { socket } from "../socket";
import { UserOnline } from "../slices/messengerSlice";
import { selectSeenChatParam } from "../selector/chatSelector";
import { descreaseUnRead, UpdateSeen ,updateSeen} from "../slices/chatSlice";
interface MessengerDownCardProps {
    card: UserQuickChatID,
    userOnline:UserOnline
}
export type Message = {
    text?: string,
    senderId: string,
    image?: string,
    createdAt: string,
    chatId: string
}
const MessengerDownCard: React.FC<MessengerDownCardProps> = ({ card,userOnline }) => {

    const scrollRef = useRef<HTMLDivElement | null>(null)
    const currentUser = useSelector(selectUserInfo)
    const updateMessage = useSelector((state: RootState) => state.message.message)
    const dispatch = useDispatch()
    const selectSeenParam = selectSeenChatParam(card.chatId)
    const currentSeenChat = useSelector(selectSeenParam)

    useEffect(() => {
        const scroll = scrollRef.current
        if (scroll) {
            scroll.scrollTop = scroll.scrollHeight
        }

    }, [])


    const FetchMessage = async () => {
        try {
            const response = await requestMessage.get(`/getMessageOfChat?chatId=${card.chatId}`)
            return response.data as Message[]
        } catch (e) {
            console.log(e)
            alert('Lỗi không thấy đoạn chat')
        }
    }
    const { data, isLoading } = useQuery({
        queryKey: [`message${card._id}`],
        queryFn: () => FetchMessage(),
        refetchOnWindowFocus: false
    })
    useEffect(() => {
        const updateSeens = async () => {
            try {
                const numberCurrentUser = card.user[0] == currentUser._id ? 1 : 2
                const dataUpdate:UpdateSeen = {
                    seenWhatAt: numberCurrentUser,
                    chatId: card.chatId,
                    isSeen:true
                }
                dispatch(updateSeen(dataUpdate))

                const response = await requestChat.put('/updateSeen', dataUpdate)
                socket.emit('seenMessage',{...dataUpdate,fromUser:currentUser._id,toUser:card._id})
              
            } catch (e) {
                console.log(e)
                alert('Lỗi seen')
            }
        }
        dispatch(descreaseUnRead(card._id))
        updateSeens()
    }, [data, updateMessage])

    return (
        <div className="messenger-down-card">

            <MessengerDownNav userOnline={userOnline} card={card} />
            <div ref={scrollRef} className="messenger-down-card-text-container">
                {isLoading ? <></> : (
                    <>
                        {updateMessage?.map((message, i) => {
                            if (message.chatId == card.chatId) {


                                if (message.senderId == currentUser._id) {
                                    return (

                                        <div key={`dsf${i}`}>
                                            <MessengerTextRight time={message.createdAt} image={message.image ? message.image : ""} key={`right${i}`} text={message.text ? message.text : ""} />
                                            
                                        </div>
                                    )
                                } else {
                                    return (
                                        <MessengerTextLeft imageUser={card.image} image={message.image ? message.image : ""} time={message.createdAt} key={`left${i}`} text={message.text ? message.text : ""} />
                                    )
                                }
                            }

                        })}
                        {data?.map((message, i) => {

                            if (message.chatId == card.chatId) {
                                if (message.senderId == currentUser._id) {
                                    return (

                                        <div key={`dsff${i}`}>
                                            <MessengerTextRight image={message.image ? message.image : ""} time={message.createdAt} key={`rights${i}`} text={message.text ? message.text : ""} />

                                        </div>
                                    )
                                } else {
                                    return (
                                        <MessengerTextLeft imageUser={card.image} image={message.image ? message.image : ""} time={message.createdAt} key={`lefts${i}`} text={message.text ? message.text : ""} />
                                    )
                                }
                            }




                        }
                        )}
                    </>
                )}


            </div>
            <MessengerDownInput userOnline={userOnline} card={card} key={card._id} />

        </div>
    );
}

export default MessengerDownCard;