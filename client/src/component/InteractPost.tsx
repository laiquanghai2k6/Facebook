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

interface Emoji extends Object {
    currentEmojiString: string,
    text: string,
    color: string
}


const InteractPost = () => {
    const [modalComment, setModalComment] = useState(false)
    const [currentEmoji, setCurrentEmoji] = useState<string | null | undefined>(null)
    const [currentEmojiObject, setCurrentEmojiObject] = useState<Emoji>({
        currentEmojiString: Like,
        text: 'Thích',
        color: '#94979a'
    })
    useEffect(() => {
        console.log(currentEmoji)
    }, [currentEmoji])
    const commenHandler = () => {
        setModalComment(true)
    }
   

 const clickLikeHandler = () => {
        const emoji = document.querySelector('.emoji-appear')
        if (emoji) {


            (emoji as HTMLElement).style.visibility = 'hidden'
            setTimeout(() => {
                (emoji as HTMLElement).style.visibility = 'visible';

            }, 1500);
        }
        if (currentEmojiObject.currentEmojiString == Like) {
            console.log('vv')
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
            {modalComment && (
                <ModalComment setModalComment={setModalComment} />

            )}
            <div className="interact-post">

                <div className="infomation-interact-post">
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                        <HomeItem img={LikePostEmoji} styleImg={{ height: '3.5vh', width: '3.5vh' }} styleContainer={{ marginBottom: '0' }} styleText={{ display: 'none' }}

                        />
                        <p className="text-infomation-interact-post">sd</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                        <p className="text-infomation-interact-post">37 bình luận</p>
                    </div>
                </div>
                <div className="action-interact-post">


                    <LikePost color={currentEmojiObject.color} onClick={clickLikeHandler} emojiHandler={emojiHandler} image={currentEmojiObject.currentEmojiString} text={currentEmojiObject.text}  />
                    <HomeItem onClick={commenHandler} img={Comment} styleContainer={{ width: '100%', color: '#94979a', justifyContent: 'center', cursor: 'pointer', gap: '0.5vh', marginBottom: '0' }} text="Bình luận" />
                    <HomeItem img={Share} styleContainer={{
                        width: '100%', color: '#94979a', justifyContent: 'center', cursor: 'pointer', gap: '0.5vh', marginBottom: '0'

                    }} text="Chia sẻ"

                    />

                </div>

            </div>
        </>
    );
}

export default InteractPost;