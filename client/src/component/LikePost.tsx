import EmojiPost from "./EmojiPost";
import HomeItem from "./HomeItem";
import Love from '../assets/love.png'
import Haha from '../assets/haha.png'
import Wow from '../assets/wow.png'
import Sad from '../assets/sad.png'
import Angry from '../assets/angry.png'
import LikePostEmoji from '../assets/like-post.png'
import React, { ButtonHTMLAttributes, MouseEventHandler } from "react";

const EmojiArray = [
    LikePostEmoji,
    Love,
    Haha,
    Wow,
    Sad,
    Angry
]
interface LikePostProps extends ButtonHTMLAttributes<HTMLDivElement>{
    emojiHandler:Function
    image:string,
    text:string
}
const LikePost:React.FC<LikePostProps> = ({emojiHandler,image,text,color,...other}) => {
    return ( 
        <HomeItem {...other} className="-like" img={image} styleContainer={{ width: '100%', color:`${color}`, height: '6vh', justifyContent: 'center', cursor: 'pointer', gap: '0.5vh', marginBottom: '0' }} text={text} >
        <div className="emoji-appear">
            {EmojiArray.map((img,index)=>(
             <EmojiPost img={img} style={{height: '5.5vh', width: '5.5vh'}} key={index} onClick={()=>emojiHandler(img)} />

            ))}                       
        </div>
    </HomeItem>
     );
}
 
export default LikePost;