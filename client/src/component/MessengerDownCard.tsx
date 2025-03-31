
import MessengerTextLeft from "./MessengerTextLeft";
import MessengerTextRight from "./MessengerTextRight";
import MessengerSeen from "./MessengerSeen";
import MessengerDownInput from "./MessengerDownInput";
import MessengerDownNav from "./MessengerDownNav";
import React, { useEffect, useRef, useState } from "react";
import { UserQuickChat, UserQuickChatID } from "./RightHome";
import { socket } from "../socket";
import { UserOnline } from "../slices/messengerSlice";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./Spinner";
import { requestMessage } from "../service/service";
import { selectUserInfo } from "../selector/userSelector";
interface MessengerDownCard{
    keys:number,
    card:UserQuickChatID
}
export type Message = {
    text?:string,
    senderId:string,
    image?:string,
    createdAt:string,
    chatId:string
}
const MessengerDownCard:React.FC<MessengerDownCard> = ({keys,card}) => {
    console.log(card)
    const scrollRef = useRef<HTMLDivElement|null>(null)
    const userOnline = useSelector((state:RootState)=>state.messengerCard.userOnline)
    
    const currentUser = useSelector(selectUserInfo)
    const updateMessage = useSelector((state:RootState)=>state.message.message,shallowEqual)
    useEffect(()=>{
        const scroll = scrollRef.current
        if(scroll){
            scroll.scrollTop = scroll.scrollHeight
        }
      
    },[])

    const FetchMessage = async ()=>{
        try{
            const response = await requestMessage.get(`/getMessageOfChat?chatId=${card.chatId}`)
            return response.data as Message[]
        }catch(e){
            console.log(e)
            alert('Lỗi không thấy đoạn chat')
        }
    }
    const {data,isLoading} = useQuery({
        queryKey:['message'],
        queryFn:()=>FetchMessage()
    })
    return (
        <div className="messenger-down-card">
            {isLoading && <Spinner />}
            <MessengerDownNav userOnline={userOnline} card={card} />
            <div ref={scrollRef} className="messenger-down-card-text-container">
            {updateMessage?.map((message,i)=>{
                    if(message.chatId == card.chatId){
  
                        if(message.senderId == currentUser._id && message.text){
                            
                            return(
                                <MessengerTextRight key={`right${i}`} text={message.text} />
                            )
                        }else{
           
                            return(
                                <MessengerTextLeft key={`left${i}`} text={message.text ? message.text:""} /> 
                            )
                        }
                    }
                    
                 })}
                 {data?.map((message,i)=>{
                    return(

                        message.senderId == currentUser._id && message.text ? (
    
                            <MessengerTextRight key={i} text={message.text} />
                        ) :(
    
                            <MessengerTextLeft key={i} text={message.text ? message.text:""} /> 
                        )                       
                    )
                        
                    }
                 )}
             
                <MessengerSeen />
            </div>
            <MessengerDownInput userOnline={userOnline} card={card} keys={keys} />

        </div>
    );
}

export default MessengerDownCard;