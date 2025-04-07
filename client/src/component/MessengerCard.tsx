import React from "react";
import { Chat } from "../pages/Home/Home";
import { UserInfo } from "../slices/userSlice";
import { ConvertDateOnline } from "./RightHome";
import UserImage from "./UserImage";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../selector/userSelector";

interface MessengerCardProps {
    chat: Chat,
    user: UserInfo,
    CLick: Function
}

const MessengerCard = ({ chat, user, CLick }: MessengerCardProps) => {
    const now = Date.now()

    const chatTime = new Date(chat.updatedAt).getTime()
    // console.log(chat.createdAt.getTime())
    const convertDate = ConvertDateOnline(now - chatTime)
    const unRead = chat.senderId == user._id && (!chat.seen1 || !chat.seen2)
    return (
        <div className="messenger-card" onClick={() => CLick(unRead)}>
            <UserImage img={user.image} height={'3.25rem'} width={'3.25rem'} />
            <div className="messenger-card-text">
                <p style={{ color: 'white', fontSize: '1rem', fontWeight: 'bold' }}>{user.name}</p>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {chat.senderId == user._id && (!chat.seen1 || !chat.seen2) ? (
                    <p style={{ color: 'white', fontSize: '0.85rem' ,fontWeight:'bold'}}>{chat.lastMessage}</p>
                    ):(
                        <p style={{ color: '#b0b3b8', fontSize: '0.85rem' }}>{chat.lastMessage}</p>

                    )}
                    <p style={{ color: '#7d8083', marginLeft: '0.25rem', fontSize: '0.85rem' }}>‧{convertDate}</p>
                    {chat.senderId == user._id && (!chat.seen1 || !chat.seen2) && (

                        <div style={{ width: '1rem', height: '1rem', backgroundColor: '#5aa7ff', marginLeft: 'auto', borderRadius: '50%' }}></div>
                    )}

                </div>

            </div>
        </div>
    );
}

export default MessengerCard;