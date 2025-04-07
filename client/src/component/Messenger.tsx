import React, { MouseEventHandler, useEffect, useRef } from "react";
import Input from "./Input";
import MessengerCard from "./MessengerCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { selectUserInfo } from "../selector/userSelector";
import { useQuery } from "@tanstack/react-query";
import { requestUser } from "../service/service";
import { UserInfo } from "../slices/userSlice";
import { Chat } from "../pages/Home/Home";
import { UserQuickChat, UserQuickChatID } from "./RightHome";
import { fullMessengerCard, setMessengerCard } from "../slices/messengerSlice";
import { descreaseUnRead } from "../slices/chatSlice";


interface MessengerProps {
    closeMessenger: Function
}

const Messenger: React.FC<MessengerProps> = ({ closeMessenger }) => {
    const messengerRef = useRef<HTMLDivElement | null>(null)
    const currentChat = useSelector((state:RootState)=>state.chats.chats)
    const currentUser = useSelector(selectUserInfo)
    const dispatch = useDispatch()
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const svgElement = (event.target as Element).closest("svg")
            if (messengerRef.current) {
                console.log()
                if (!messengerRef.current.contains(event.target as Node) &&(event.target as HTMLElement).className !='icon-round-background' && (event.target as HTMLElement).className!="home-icon-right-mes"&&svgElement?.classList[0]!="home-icon-right-mes2") {
                    closeMessenger();

                }

            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [closeMessenger]);
    const recipientUser = currentChat.map((chat)=>{
        return chat.user[0] == currentUser._id ? chat.user[1] : chat.user[0]
    })
    
    const FetchMessengerUser = async ()=>{
       const response = await Promise.all(
        recipientUser.map(async (userId)=>{
            const user = await requestUser.get(`/getUser/${userId}`)
            return user.data
        })
       )
       return response as UserInfo[]
    }
    const {data,isLoading} = useQuery({
        queryKey:['messenger-user'],
        queryFn:()=>FetchMessengerUser(),
        refetchOnWindowFocus: false
    })
    const currentMessengerCard = useSelector((state:RootState)=>state.messengerCard)
    const OpenCard = (chat:Chat,index:number,unRead:boolean)=>{
        const width = window.innerWidth;
        const isCardExist = currentMessengerCard.messengerCard.find((cards)=>cards.chatId == chat._id)
        let newCard:UserQuickChatID|null = null
        if(data){
             newCard = {
                _id:recipientUser[index],
                name:data[index].name,
                image:data[index].image,
                lastOnline:data[index].lastOnline,
                chatId:chat._id,
                seen1:chat.seen1,
                seen2:chat.seen2,
                user:chat.user
            }
        }
        const remToPx = 20*16
        if(newCard == null) return alert("Lỗi chọn thẻ nhắn")
        if(!isCardExist){

            if(currentMessengerCard.messengerCard.length == 0){
               dispatch(setMessengerCard(newCard))
            }
            else if((currentMessengerCard.messengerCard.length+1) *remToPx <= 70*(width/100) ){
               dispatch(setMessengerCard(newCard))
            }else{
               dispatch(fullMessengerCard(newCard))
            }
        }
      
        closeMessenger()
    }
    console.log('currentChat:',currentChat)
    return (


        <div className="messenger" ref={messengerRef}>
            <p style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5rem' }}>Đoạn chat</p>
            <Input className={'home-input'} type="text" style={{ width: '22.5rem', margin: '1rem 1.25rem 1rem 1.25rem', fontSize: '1rem' }} placeholder="Tìm kiếm trên messenger" />
            <div className="messenger-card-container">
                {currentChat.map((chat,i)=>{
                    if(data?.[i] && data){

                        return(
                            <MessengerCard CLick={(unRead:boolean)=>{
                                
                                OpenCard(chat,i,unRead)
                            }} key={i} user={data[i]} chat={chat} />
                        )
                    }else return<div key={i}></div>
                })}
               


            </div>
        </div>

    );
}

export default Messenger;