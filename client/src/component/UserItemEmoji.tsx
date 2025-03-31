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
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { requestUser } from "../service/service";
import { UserInfo } from "../slices/userSlice";
type UserItemEmojiProps = {
    userId: string,
    emoji: string
}
const UserItemEmoji = ({ userId, emoji }: UserItemEmojiProps) => {
    const [ref, isVisible] = useLazyLoad()
    const FetchUser = async (id:string)=>{
        try{
            const response = await requestUser(`/getUser/${id}`)
            return response.data as UserInfo
        }catch(e){
            console.log(e)
            alert("Lỗi bài viết")
        }
    }

    const {data,isLoading} = useQuery({
        queryKey:['emoji',userId],
        queryFn:()=>FetchUser(userId)
    })
    console.log(data)

    
    return (
        <div className="user-item-emoji-container">
            <div className="user-item-emoji-left">
                <div className='icon-round-background' style={{ width: '2.5rem', height: '2.5rem' }} >
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
                       {emoji=='like'&& <img src={LikePostEmoji} style={{ width: '1.6rem', height: '1.6rem', position: 'fixed', objectFit: 'cover' }} />}
                       {emoji=='love'&& <img src={Love} style={{ width: '1.6rem', height: '1.6rem', position: 'fixed', objectFit: 'cover' }} />}
                       {emoji=='haha'&& <img src={Haha} style={{ width: '1.6rem', height: '1.6rem', position: 'fixed', objectFit: 'cover' }} />}
                       {emoji=='wow'&& <img src={Wow} style={{ width: '1.6rem', height: '1.6rem', position: 'fixed', objectFit: 'cover' }} />}
                       {emoji=='sad'&& <img src={Sad} style={{ width: '1.6rem', height: '1.6rem', position: 'fixed', objectFit: 'cover' }} />}
                       {emoji=='angry'&& <img src={Angry} style={{ width: '1.6rem', height: '1.6rem', position: 'fixed', objectFit: 'cover' }} />}
                        
                    </div>
                </div>
                <p className="user-item-emoji-text" >{`${data?.name}`}</p>
            </div>
            <FacebookButton style={{ height: '2rem', fontSize: '1rem', width: '10rem' }} ButtonType={BUTTON_TYPE.cancel} text="Thêm bạn bè" />
        </div>
    );
}

export default UserItemEmoji;