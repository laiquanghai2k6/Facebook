import { useDispatch, useSelector } from "react-redux";
import { PostShareType, PostType, setPost } from "../slices/postSlice";
import CloseButton from "./button/CloseButton";
import Hr from "./Hr";
import UserImage from "./UserImage";
import { selectUserInfo } from "../selector/userSelector";
import DefaultImage from '../assets/default-image.png'
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import FacebookButton, { BUTTON_TYPE } from "./button/FacebookButton";
import { requestPost } from "../service/service";
import { useMutation } from "@tanstack/react-query";
import Spinner from "./Spinner";
import { navigateHome } from "../slices/homeNavigateSlice";
type ModalShareProps = {
    post:PostType|PostShareType,
    setModalShare:Function,
    type:string
}

const ModalShare = ({post,setModalShare,type}:ModalShareProps) => {
    const user = useSelector(selectUserInfo)
    const navigate = useNavigate()
    const contentRef = useRef<HTMLTextAreaElement>(null)
    const dispatch = useDispatch()
    const shareMutationFunction = async ()=>{
        let time
        console.log('type:',type)
        if(type == "share"){
            time = (post as PostShareType).createdOrigin
        }else{
            time = post.createdAt
        }
            const text = contentRef.current ? contentRef.current.value :""
            const data = {
                type:'share',
                video:post.video,
                image:post.image,
                text:post.text,
                textShare:text,
                createdOrigin:time,
                userId:user._id,
                userIdShare:post.userId
            }
            const response = await requestPost.post('/sharePost',data)
            return response.data as PostShareType
       
       
    }
    const shareMutation = useMutation({
        mutationFn:async ()=>shareMutationFunction(),
        onSuccess:(data)=>{
            setModalShare(false)
            dispatch(setPost(data))
            window.scrollTo({ top: 0, behavior: "smooth" });
        },
        onError:(error)=>{
            console.log(error)
            return alert('Lỗi chia sẻ bài viết')
        },

    })
    const CreateShare = async ()=>{
        try{

            await shareMutation.mutate()
        
        }catch(e){
            console.log(e)
            setModalShare(false)
        }


    }
    return ( 
        <div className="modal-share-container">
            {shareMutation.isPending && <Spinner />}
            <div className="modal-share-post-box">
            <p style={{ alignSelf: 'center', top: '0', position: 'absolute', marginTop: '2vh', fontSize: '2.5vh', justifySelf: 'flex-start', fontWeight: 'bold' }}>Chia sẻ bài viết</p>
                <Hr />
                <CloseButton onClick={() => setModalShare(false)} />
                <div className="left-home-items" style={{ width: '20vh' }} onClick={() => {
                                    dispatch(navigateHome('profile'))
                    
                    navigate('/profile')}}>
                    <UserImage img={user.image == "" ? DefaultImage : user.image} height={'5vh'} width={'5vh'} />
                    <p className="left-home-text">{`${user.name}`}</p>
                </div>
                <textarea ref={contentRef} spellCheck={false} className="create-post-input" style={{ height: '10vh' }} id="text-comment-input" rows={1} placeholder={`Hãy nói gì đó về nội dung này...`}></textarea>
                <FacebookButton onClick={() => CreateShare()} ButtonType={BUTTON_TYPE.basic} text="Chia sẻ bài viết" style={{ width: '95%', margin: '1vh 1vh 1vh 1vh', height: '5vh', alignSelf: 'center', fontSize: '2.5vh' }} />

            </div>
        </div>
     );
}
 
export default ModalShare;