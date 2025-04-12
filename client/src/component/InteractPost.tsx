import HomeItem from "./HomeItem";
import Like from '../assets/facebook-reactions.png'
import Comment from '../assets/chat.png'
import Share from '../assets/share.png'
import { useMemo, useState } from "react";
import ModalComment from "./ModalComment";
import LikePostEmoji from '../assets/like-post.png'
import LikePost from "./LikePost";
import Love from '../assets/love.png'
import Haha from '../assets/haha.png'
import Wow from '../assets/wow.png'
import Sad from '../assets/sad.png'
import Angry from '../assets/angry.png'
import { Angrys, Hahas, Likes, Loves, PostShareType, PostType, Sads, Wows } from "../slices/postSlice";
import { requestPost } from "../service/service";
import ModalShare from "./ModalShare";
import ModalCommentShare from "./ModalCommentShare";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../selector/userSelector";
import ModalEmoji from "./ModalEmoji";
type ReactionType = "unlike" | "like" | "love" | "haha" | "wow" | "sad" | "angry";
interface Emoji extends Object {
    currentEmojiString: string,
    text: string,
    color: string
    type: ReactionType
}
type InteractPostProps = {
    post: PostType | PostShareType
    type: string
    lengthComment: number | undefined
    isModal:boolean
}

export const debounce = (callback: Function, delay: number) => {
    let time: NodeJS.Timeout | undefined = undefined
    return (type: string, e: string) => {
        clearTimeout(time)
        time = setTimeout(() => {
            callback(type, e)
        }, delay)
    }
}
export const reactions: Array<Emoji> = [{
    type: "unlike",
    currentEmojiString: Like,
    text: 'Thích',
    color: '#94979a'
}, {
    currentEmojiString: LikePostEmoji,
    text: "Đã thích",
    color: '#0866ff',
    type: 'like'
}, {
    type: 'love',
    currentEmojiString: Love,
    text: "Yêu thích",
    color: '#f3393f'
}, {
    type: 'haha',
    currentEmojiString: Haha,
    text: "Haha",
    color: "#f7b126"
}, {
    type: 'wow',
    currentEmojiString: Wow,
    text: "Wow",
    color: "#f7b126"
}, {
    type: 'sad',
    currentEmojiString: Sad,
    text: "Buồn",
    color: "#f7b126"
}, {
    type: 'angry',
    currentEmojiString: Angry,
    text: "Phẫn nộ",
    color: "#e97118"
}];

const InteractPost = ({ post, lengthComment, type,isModal }: InteractPostProps) => {
    const [modalShare, setModalShare] = useState(false)
    const [modalComment, setModalComment] = useState(false)
    const [modalEmoji,setModalEmoji] = useState(false)
    const user = useSelector(selectUserInfo)
    const currentEmoji=[
        {
            num: post.like.like,
            emoji: 'like',
            image: LikePostEmoji
        },

        {
            num: post.angry.angry,
            emoji: 'angry',
            image: Angry
        },
        {
            num: post.haha.haha,
            emoji: 'haha',
            image: Haha
        },
        {
            num: post.wow.wow,
            emoji: 'wow',
            image: Wow
        },
        {
            num: post.sad.sad,
            emoji: 'sad',
            image: Sad
        },
        {
            num: post.love.love,
            emoji: 'love',
            image: Love
        }
    ]
    
    currentEmoji.sort((a,b)=>b.num-a.num)


    const [emoji,setEmoji] = useState(currentEmoji)
    const initEmojiObject = reactions.find((react) => {
        const type = react.type as keyof PostType;
        // console.log('postType:',post[type])
        const PostType = post[type] as Wows | Likes | Hahas | Loves | Sads | Angrys
        return PostType?.userId?.length &&PostType.userId.includes(user._id);
    }) || reactions[0];
    // console.log('initEmoji:',initEmojiObject)
    const [currentEmojiObject, setCurrentEmojiObject] = useState<Emoji>(initEmojiObject)
    let total: number = emoji.reduce((acc, item) => {
        return acc + item.num
    }, 0)
    const [totalEmoji, setTotalEmoji] = useState(total)


    const commenHandler = () => {
        setModalComment(true)
    }

    const debounceLike = async (type: string, e: string) => {

        if (type == 'like') {
            let emojiInMongoDB =""
            switch (e) {
                case "Đã thích":
                    emojiInMongoDB = 'like'
                    post.like.like--
                    post.like.userId = post.like.userId.filter((l)=>l != user._id)
                    break
                case "Yêu thích":
                    emojiInMongoDB = 'love'
                    post.love.love--
                    post.love.userId = post.love.userId.filter((l)=>l != user._id)
                    break
                case "Haha":
                    emojiInMongoDB = 'haha'
                    post.haha.haha--
                    post.haha.userId = post.haha.userId.filter((l)=>l != user._id)
                    break
                case "Wow":
                    emojiInMongoDB = 'wow'
                    post.wow.wow--
                    post.wow.userId = post.wow.userId.filter((l)=>l != user._id)
                    break
                case "Buồn":
                    emojiInMongoDB = 'sad'
                    post.sad.sad--
                    post.sad.userId = post.sad.userId.filter((l)=>l != user._id)
                    break
                case "Phẫn nộ":
                    emojiInMongoDB = 'angry'
                    post.angry.angry--
                    post.angry.userId = post.angry.userId.filter((l)=>l != user._id)
                    break
                default:
                    break
            }
            const data = {
                postId: post._id,
                emoji: emojiInMongoDB,
                isInc: false,
                userId: user._id
            }
            setTotalEmoji((prev)=>prev- 1)
            setEmoji((prev)=>{
                const update= prev.map((p)=>p.emoji == emojiInMongoDB ? {...p,num:p.num-1} : p)
                return [...update].sort((a, b) => b.num - a.num)
            })

            await requestPost.put('/updateEmoji', data)
            
        } else {
            const data = {
                postId: post._id,
                emoji: 'like',
                isInc: true,
                userId: user._id
            }
            setTotalEmoji((prev)=>prev+ 1)

            setEmoji((prev)=>{
                const update= prev.map((p)=>p.emoji == 'like' ? {...p,num:p.num+1} : p)
                return [...update].sort((a, b) => b.num - a.num)
            })
            // console.log('incs: like')
            const response = await requestPost.put('/updateEmoji', data)
            console.log(response.data)
        }
    }

    const clickLikeHandlerDebounce = useMemo(() => {
        return debounce(debounceLike, 1000)
    }, [])


    const clickLikeHandler = async () => {
        const emoji = document.querySelector('.emoji-appear')
        if (emoji) {
            (emoji as HTMLElement).style.visibility = 'hidden'
            setTimeout(() => {
                (emoji as HTMLElement).style.visibility = 'visible';
            }, 1500);
        }
        if (currentEmojiObject.currentEmojiString == Like) {
            setCurrentEmojiObject((prev) => {
                clickLikeHandlerDebounce('liked', prev.text)
                post.like.like++
                post.like.userId.push(user._id)
                return (reactions[1])
            })




        } else {
            setCurrentEmojiObject((prev) => {
                
                clickLikeHandlerDebounce('like', prev.text)
                return (reactions[0])
            })
            // setCurrentEmoji(null)



        }
    }
 
    const emojiHandler = async (img: string) => {
        const currentB = img.split('/').pop()?.split('.')[0]
        const current = currentB?.split('-')[0]
       
        const emojis = document.querySelector('.emoji-appear')
        if (emojis) {


            (emojis as HTMLElement).style.visibility = 'hidden'
            setTimeout(() => {
                (emojis as HTMLElement).style.visibility = 'visible'; // Hiện lại khi cần

            }, 1500);
        }
        let emojiInMongoDB: string = ""
        switch (currentEmojiObject.text) {
            case "Đã thích":
                emojiInMongoDB = 'like'
                post.like.like--
                post.like.userId = post.like.userId.filter((l)=>l != user._id)
                break
            case "Yêu thích":
                emojiInMongoDB = 'love'
                post.love.love--
                post.love.userId = post.love.userId.filter((l)=>l != user._id)
                break
            case "Haha":
                emojiInMongoDB = 'haha'
                post.haha.haha--
                post.haha.userId = post.haha.userId.filter((l)=>l != user._id)
                break
            case "Wow":
                emojiInMongoDB = 'wow'
                post.wow.wow--
                post.wow.userId = post.wow.userId.filter((l)=>l != user._id)
                break
            case "Buồn":
                emojiInMongoDB = 'sad'
                post.sad.sad--
                post.sad.userId = post.sad.userId.filter((l)=>l != user._id)
                break
            case "Phẫn nộ":
                emojiInMongoDB = 'angry'
                post.angry.angry--
                post.angry.userId = post.angry.userId.filter((l)=>l != user._id)
                break
            default:
                break
        }

        if (currentEmojiObject.text != "Thích") {
            let data = {
                postId: post._id,
                userId: user._id,
                emoji: emojiInMongoDB,
                isInc: false
            }
            setEmoji((prev)=>{
                const update= prev.map((p)=>p.emoji == emojiInMongoDB ? {...p,num:p.num-1} : p)
                return [...update].sort((a, b) => b.num - a.num)
            })
            setTotalEmoji(totalEmoji - 1)

            await requestPost.put('/updateEmoji', data)
        }
        setTotalEmoji((prev) => (prev + 1))
        
        switch (current) {

            case 'like-post':
                let data1 = {
                    postId: post._id,
                    userId: user._id,
                    emoji: 'like',
                    isInc: true
                }
                post.like.like++
                post.like.userId.push(user._id)
                const response1 = await requestPost.put('/updateEmoji', data1)
                console.log(response1.data)
                setEmoji((prev)=>{
                    const update= prev.map((p)=>p.emoji == 'like' ? {...p,num:p.num+1} : p)
                    return [...update].sort((a, b) => b.num - a.num)
                })
                setCurrentEmojiObject(reactions[1])
                break;
            case 'love':
                post.love.love++
                post.love.userId.push(user._id)
                let data2 = {
                    postId: post._id,
                    userId: user._id,
                    emoji: 'love',
                    isInc: true
                }
                const response2 = await requestPost.put('/updateEmoji', data2)
                console.log(response2.data)
                setEmoji((prev)=>{
                    const update= prev.map((p)=>p.emoji == 'love' ? {...p,num:p.num+1} : p)
                    return [...update].sort((a, b) => b.num - a.num)
                })
                setCurrentEmojiObject(reactions[2])


                break;
            case 'haha':
                post.haha.haha++
                post.haha.userId.push(user._id)
                let data3 = {
                    postId: post._id,
                    userId: user._id,
                    emoji: 'haha',
                    isInc: true
                }
                const response3 = await requestPost.put('/updateEmoji', data3)
                console.log(response3.data)
                setEmoji((prev)=>{
                    const update= prev.map((p)=>p.emoji == 'haha' ? {...p,num:p.num+1} : p)
                    return [...update].sort((a, b) => b.num - a.num)
                })
                setCurrentEmojiObject(reactions[3])
                // console.log('haha')

                break;
            case 'wow':
                post.wow.wow++
                post.wow.userId.push(user._id)
                let data4 = {
                    postId: post._id,
                    userId: user._id,
                    emoji: 'wow',
                    isInc: true
                }
                const response4 = await requestPost.put('/updateEmoji', data4)
                setEmoji((prev)=>{
                    const update= prev.map((p)=>p.emoji == 'wow' ? {...p,num:p.num+1} : p)
                    return [...update].sort((a, b) => b.num - a.num)
                })
                console.log(response4.data)
                setCurrentEmojiObject(reactions[4])
                // console.log('wow')

                break;
            case 'sad':
                post.sad.sad++
                post.sad.userId.push(user._id)
                let data5 = {
                    postId: post._id,
                    userId: user._id,
                    emoji: 'sad',
                    isInc: true
                }
                const response5 = await requestPost.put('/updateEmoji', data5)
                console.log(response5.data)
                setEmoji((prev)=>{
                    const update= prev.map((p)=>p.emoji == 'sad' ? {...p,num:p.num+1} : p)
                    return [...update].sort((a, b) => b.num - a.num)
                })
                setCurrentEmojiObject(reactions[5])
                // console.log('sad')

                break;
            case 'angry':
                post.angry.angry++
                post.angry.userId.push(user._id)
                let data6 = {
                    postId: post._id,
                    userId: user._id,
                    emoji: 'angry',
                    isInc: true
                }
                const response6 = await requestPost.put('/updateEmoji', data6)
                setEmoji((prev)=>{
                    const update= prev.map((p)=>p.emoji == 'angry' ? {...p,num:p.num+1} : p)
                    return [...update].sort((a, b) => b.num - a.num)
                })
                setCurrentEmojiObject(reactions[6])
                break;
            default:
                break;
        }

    }

    const ShareHandler = async () => {
        setModalShare(true)
    }
    





    return (
        <>
            {modalComment && type == 'own'&&isModal && (
                <ModalComment type={type} post={post} setModalComment={setModalComment} />

            )}
            {modalComment && type == 'share'&&isModal && (
                <ModalCommentShare post={post as PostShareType} setModalComment={setModalComment} />

            )}
            {modalShare && (
                <ModalShare type={type} post={post} setModalShare={setModalShare} />

            )}
            {modalEmoji && <ModalEmoji post={post} setModalEmoji={setModalEmoji} />}

            <div className="interact-post">

                <div className="infomation-interact-post" style={{ userSelect: 'none' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        
                        {emoji[0].num > 0 && <HomeItem className="-interact" img={emoji[0].image} styleImg={{ height: '1.75rem', width: '1.75rem' }} styleContainer={{ marginBottom: '0', }} styleText={{ display: 'none' }} />}
                        {emoji[1].num > 0 && <HomeItem className="-interact" img={emoji[1].image} styleImg={{ height: '1.75rem', width: '1.75rem' }} styleContainer={{ marginBottom: '0', marginLeft: '-0.6rem' }} styleText={{ display: 'none' }} />}
                        {emoji[2].num > 0 && <HomeItem className="-interact" img={emoji[2].image} styleImg={{ height: '1.75rem', width: '1.75rem' }} styleContainer={{ marginBottom: '0', marginLeft: '-0.6rem' }} styleText={{ display: 'none' }} />}
                        <p onClick={()=>setModalEmoji(true)} className="text-infomation-interact-post" >{totalEmoji != 0 ? totalEmoji : ""}</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '0.25rem', marginBottom: '0.25rem' }}>

                        <p className="text-infomation-interact-post">{lengthComment} bình luận</p>
                    </div>
                </div>
                <div className="action-interact-post">


                    <LikePost color={currentEmojiObject.color} onClick={clickLikeHandler} emojiHandler={emojiHandler} image={currentEmojiObject.currentEmojiString} text={currentEmojiObject.text} />
                    <HomeItem onClick={commenHandler} img={Comment} styleContainer={{ width: '100%', color: '#94979a', justifyContent: 'center', cursor: 'pointer', gap: '0.25rem', marginBottom: '0' }} text="Bình luận" />
                    <HomeItem img={Share} styleContainer={{
                        width: '100%', color: '#94979a', justifyContent: 'center', cursor: 'pointer', gap: '0.25rem', marginBottom: '0'

                    }}
                        onClick={ShareHandler}
                        text="Chia sẻ"

                    />

                </div>

            </div>
        </>
    );
}

export default InteractPost;