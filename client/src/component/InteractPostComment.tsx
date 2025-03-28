import HomeItem from "./HomeItem";
import Like from '../assets/facebook-reactions.png'
import Comment from '../assets/chat.png'
import Share from '../assets/share.png'
import { useEffect, useState } from "react";
import ModalComment from "./ModalComment";
import LikePostEmoji from '../assets/like-post.png'
import LikePost from "./LikePost";
import Love from '../assets/love.png'
import Haha from '../assets/haha.png'
import Wow from '../assets/wow.png'
import Sad from '../assets/sad.png'
import Angry from '../assets/angry.png'
import { PostType } from "../slices/postSlice";
import { CommentType } from "../slices/commentSlice";

interface Emoji extends Object {
    currentEmojiString: string,
    text: string,
    color: string
}
type InteractPostCommentProps = {
    lengthComment:number | undefined
    post:PostType
}


const InteractPostComment = ({lengthComment,post}:InteractPostCommentProps) => {
    
    const [modalComment, setModalComment] = useState(false)
    const [currentEmoji, setCurrentEmoji] = useState<string | null | undefined>(null)
    const [currentEmojiObject, setCurrentEmojiObject] = useState<Emoji>({
        currentEmojiString: Like,
        text: 'Thích',
        color: '#94979a'
    })
   
    const emoji = [
        {
            num:post.like.like,
            emoji:'like',
            image:LikePostEmoji
        },
        {
            num:post.angry.angry,
            emoji:'angry',
            image:Angry
        },
        {
            num:post.haha.haha,
            emoji:'haha',
            image:Haha
        },
        {
            num:post.wow.wow,
            emoji:'wow',
            image:Wow
        },
        {
            num:post.sad.sad,
            emoji:'sad',
            image:Sad
        },
        {
            num:post.love.love,
            emoji:'love',
            image:Love
        }
    ]
    const total = emoji.reduce((acc,item)=>{
        return acc+item.num
    },0)
    emoji.sort((a,b)=>b?.num - a?.num)

    

    useEffect(() => {
        
    }, [currentEmoji])
  
   

 const clickLikeHandler = () => {
        const emoji = document.querySelector('.emoji-appear')
        if (emoji) {


            (emoji as HTMLElement).style.visibility = 'hidden'
            setTimeout(() => {
                (emoji as HTMLElement).style.visibility = 'visible';

            }, 1500);
        }
        if (currentEmojiObject.currentEmojiString == Like) {
            setCurrentEmojiObject((prev) => (
                {
                    ...prev,
                    currentEmojiString: LikePostEmoji,
                    text: "Đã thích",
                    color: '#0866ff'
                }
            ))



        } else {
            setCurrentEmojiObject((prev) => (
                {
                    ...prev,
                    currentEmojiString: Like,
                    text: "Thích",
                    color: '#94979a'
                }
            ))
            setCurrentEmoji(null)



        }
    }
    const emojiHandler = (img: string) => {
        const current = img.split('/').pop()?.split('.')[0]
        setCurrentEmoji(current)
        console.log('loves')
        
        const emoji = document.querySelector('.emoji-appear')
        if (emoji) {


            (emoji as HTMLElement).style.visibility = 'hidden'
            setTimeout(() => {
                (emoji as HTMLElement).style.visibility = 'visible'; // Hiện lại khi cần

            }, 1500);
        }
        switch (current) {
            case 'like-post':
                setCurrentEmojiObject((prev) => (
                    {
                        ...prev,
                        currentEmojiString: LikePostEmoji,
                        text: "Đã thích",
                        color: '#0866ff'
                    }
                ))
                break;
            case 'love':
                
                setCurrentEmojiObject((prev) => (
                    {
                        ...prev,
                        currentEmojiString: Love,
                        text: "Yêu thích",
                        color: '#f3393f'
                    }
                ))
                break;
            case 'haha':
                setCurrentEmojiObject((prev) => (
                    {
                        ...prev,
                        currentEmojiString: Haha,
                        text: "Haha",
                        color: '#f7b126'
                    }
                ))
                break;
            case 'wow':
                setCurrentEmojiObject((prev) => (
                    {
                        ...prev,
                        currentEmojiString: Wow,
                        text: "Wow",
                        color: '#f7b126'
                    }
                ))
                break;
            case 'sad':
                setCurrentEmojiObject((prev) => (
                    {
                        ...prev,
                        currentEmojiString: Sad,
                        text: "Buồn",
                        color: '#f7b126'
                    }
                ))
                break;
            case 'angry':
                setCurrentEmojiObject((prev) => (
                    {
                        ...prev,
                        currentEmojiString: Angry,
                        text: "Phẫn nộ",
                        color: '#e97118'
                    }
                ))
                break;
            default:
                break;
        }
    }

   




    return (
        <>
          
            <div className="interact-post">

                <div className="infomation-interact-post" style={{userSelect:'none'}}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        
                    {emoji[0].num !=0 &&<HomeItem  className="-interact" img={emoji[0].image}   styleImg={{ height: '3.5vh', width: '3.5vh' }} styleContainer={{ marginBottom: '0', }} styleText={{ display: 'none' }} /> }
                    {emoji[1].num!=0 && <HomeItem className="-interact"  img={emoji[1].image} styleImg={{ height: '3.5vh', width: '3.5vh' }} styleContainer={{ marginBottom: '0',marginLeft:'-1.2vh' }} styleText={{ display: 'none' }}/>}   
                    {emoji[2].num!=0 &&<HomeItem className="-interact"  img={ emoji[2].image} styleImg={{ height: '3.5vh', width: '3.5vh' }} styleContainer={{ marginBottom: '0',marginLeft:'-1.2vh' }} styleText={{ display: 'none' }}/>}
                        
                         
                        <p className="text-infomation-interact-post" >{total != 0 ? total : ""}</p>
                    </div>
                    <div style={{ display: 'flex',marginTop:'0.25rem',marginBottom:'0.25rem', flexDirection: 'row', alignItems: 'center' }}>

                        <p className="text-infomation-interact-post">{lengthComment} bình luận</p>
                    </div>
                </div>
                <div className="action-interact-post">


                    <LikePost color={currentEmojiObject.color} onClick={clickLikeHandler} emojiHandler={emojiHandler} image={currentEmojiObject.currentEmojiString} text={currentEmojiObject.text}  />
                    <HomeItem  img={Comment} styleContainer={{ width: '100%', color: '#94979a', justifyContent: 'center', cursor: 'pointer', gap: '0.25rem', marginBottom: '0' }} text="Bình luận" />
                    <HomeItem img={Share} styleContainer={{
                        width: '100%', color: '#94979a', justifyContent: 'center', cursor: 'pointer', gap: '0.25rem', marginBottom: '0'

                    }} text="Chia sẻ"

                    />

                </div>

            </div>
        </>
    );
}

export default InteractPostComment;