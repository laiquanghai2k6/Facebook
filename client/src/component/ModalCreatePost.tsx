import { useDispatch, useSelector } from "react-redux";
import Hr from "./Hr";
import { selectUserInfo } from "../selector/userSelector";
import UserImage from "./UserImage";
import DefaultImage from '../assets/default-image.png'
import { useNavigate } from "react-router-dom";
import AddImage from '../assets/add-img.png'
import { ChangeEvent,  useRef, useState } from "react";
import CloseButton from "./button/CloseButton";
import FacebookButton, { BUTTON_TYPE } from "./button/FacebookButton";
import Play from '../assets/play.png'

import { requestPost } from "../service/service";
import { PostType, setPost } from "../slices/postSlice";
import Spinner from "./Spinner";
import { useMutation } from "@tanstack/react-query";


type ModalCreatePostProps = {
    setCreatePostModal: Function
}


const ModalCreatePost = ({ setCreatePostModal }: ModalCreatePostProps) => {
    const user = useSelector(selectUserInfo)
    const contentRef = useRef<HTMLTextAreaElement>(null)
    const [currentFile, setCurrentFile] = useState<File | undefined>(undefined)
    const [currentImage, setCurrentImage] = useState("")
    const [isMedia, setIsMedia] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] as File
        if (file.type.startsWith('image/')) {
            const image = URL.createObjectURL(file)
            setCurrentFile(file)
            setCurrentImage(image)
            setIsMedia(false)
        } else if (file.name.toLocaleLowerCase().endsWith('.mp4')) {
            const video = document.createElement('video');
            video.preload = 'metadata';
            video.src = URL.createObjectURL(file);
            video.onloadedmetadata = function () {
                window.URL.revokeObjectURL(video.src);
                const height = video.videoHeight;
        
                if (height > 720) {
                    alert('Chỉ chấp nhận video độ phân giải tối đa 720p');
                    return;
                } else {
                    getFirstFrame(file)
                }
            }
        } else {
            alert('Vui lòng chọn ảnh hoặc file có đuôi .mp4')
        }

    }
    const getFirstFrame = (file: File) => {
        const video = document.createElement("video");
        video.src = URL.createObjectURL(file);
        video.crossOrigin = "anonymous";
        video.muted = true;
        video.playsInline = true;
        video.preload = "auto";
        video.onloadeddata = () => {
            video.currentTime = 0.1;
        };
        let imageURL =""
        video.oncanplay = () => {
            const canvas = document.createElement('canvas')
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                canvas.toBlob((blob) => {
                     imageURL = URL.createObjectURL(blob as Blob);
                    setCurrentImage(imageURL);
                }, 'image/png');
                setIsMedia(true)
                setCurrentFile(file)
            } else alert("Vui lòng dùng trình duyệt có hỗ trợ canvas")
        }
        video.onerror = () => {
            alert("Lỗi tải video. Hãy thử lại với file khác.");
        };
        return ()=>{
            window.URL.revokeObjectURL(imageURL)
        }
    }
    const CreatePostWithImage=async(content:string)=>{
        try{

            const data = new FormData()
            data.append('userId', user._id)
            data.append('image', currentFile as File)
            data.append('text', content)
            data.append('type', 'own')
            const response = await requestPost.post('/createPostWithImage', data)
            return response.data
        }catch(e){
            console.log(e)
            alert('Lỗi tạo bài viết với ảnh')
        }
    }
    const CreatePostWithVideo = async(content:string)=>{
        try{
            console.log('userId:',user._id)
            const data = new FormData()
            data.append('userId', user._id)
            data.append('video', currentFile as File)
            data.append('text', content)
            data.append('type', 'own')
            const response = await requestPost.post('/createPostWithVideo', data)
            return response.data
        }catch(e){
            console.log(e)
            alert('Lỗi tạo bài viết với video')
        }
    }
    const CreatePostNormal = async(content:string)=>{
        try{
            const data = {
                userId:user._id,
                text:content,
                type:'own'
            }
            const response = await requestPost.post('/createPost', data)
            return response.data
        }catch(e){
            console.log(e)
            alert("Lỗi tạo bài viết")
        }
      
    }
    const imageMutation = useMutation({
        mutationFn:async (content:string)=>CreatePostWithImage(content),
        onSuccess:(data)=>{
            const postStore:PostType = {
                _id:data._id,
                createdAt:data.createdAt.toString(),
                image:data.image,
                text:data.text,
                type:'own',
                userId:user._id,
                video:"",
                like:{
                    like:0,
                    userId:[]
                },
                wow:{
                    wow:0,
                    userId:[]
                },
                haha:{
                    haha:0,
                    userId:[]
                },
                sad:{
                    sad:0,
                    userId:[]
                },
                love:{
                    love:0,
                    userId:[]
                },
                angry:{
                    angry:0,
                    userId:[]
                },
                
            }
            dispatch(setPost(postStore))
            setCreatePostModal()
        },
        onError:(e)=>{
            console.log(e)
            setCreatePostModal()

            alert("Lỗi")
        }
    })
    const videoMutation = useMutation({
        mutationFn:async(content:string)=>CreatePostWithVideo(content),
        onSuccess:(data:PostType)=>{
            const postStore:PostType = {
                _id:data._id,
                createdAt:data.createdAt.toString(),
                image:"",
                text:data.text,
                type:'own',
                userId:user._id,
                video:data.video,
                like:{
                    like:0,
                    userId:[]
                },
                wow:{
                    wow:0,
                    userId:[]
                },
                haha:{
                    haha:0,
                    userId:[]
                },
                sad:{
                    sad:0,
                    userId:[]
                },
                love:{
                    love:0,
                    userId:[]
                },
                angry:{
                    angry:0,
                    userId:[]
                },
            }
            dispatch(setPost(postStore))
            setCreatePostModal()

        },
        onError:(e)=>{
            setCreatePostModal()

            console.log(e)
            alert("Lỗi")
        }
    })
    const nomarlMutation = useMutation({
        mutationFn:(content:string)=>CreatePostNormal(content),
        onSuccess:(data:PostType)=>{
            const postStore:PostType = {
                _id:data._id,
                createdAt:data.createdAt.toString(),
                image:"",
                text:data.text,
                type:'own',
                userId:user._id,
                video:"",
                like:{
                    like:0,
                    userId:[]
                },
                wow:{
                    wow:0,
                    userId:[]
                },
                haha:{
                    haha:0,
                    userId:[]
                },
                sad:{
                    sad:0,
                    userId:[]
                },
                love:{
                    love:0,
                    userId:[]
                },
                angry:{
                    angry:0,
                    userId:[]
                },
            }
            
            dispatch(setPost(postStore))
            setCreatePostModal()

        },
        onError:(e)=>{
            console.log(e)
            alert("Lỗi")
            setCreatePostModal()

        }
    })
    const CreatePost = async () => {
        let content
        if(contentRef.current?.value == "" && currentImage==""){
            return alert("Bài viết không được để trống")
        }
        if(contentRef.current?.value){
            content=contentRef.current.value
        }else content =""
        console.log('content:',content)
        if (!isMedia && currentImage != "") {       
            if (currentFile != undefined) {
                console.log('img')
                imageMutation.mutate(content)
            } else {
                setCreatePostModal()
                return alert('Lỗi up ảnh')
            }
        }else if (isMedia) {
            if (currentFile != undefined) {
                console.log('vd')

                videoMutation.mutate(content)
            } else {
                setCreatePostModal()
                return alert('Lỗi up ảnh')
            }
        }else{
            try{
                console.log('nor')

                nomarlMutation.mutate(content)
            }catch(e){
                setCreatePostModal()
                console.log(e)
                alert("Lỗi tạo bài viết")
            }
 
        }
    }
    console.log(currentImage)
    return (
        <div className="modal-create-post-container">
            {(videoMutation.isPending || imageMutation.isPending||nomarlMutation.isPending) && <Spinner />}
            <div className="modal-create-post-box">
                <p style={{ alignSelf: 'center', top: '0', position: 'absolute', marginTop: '2vh', fontSize: '2.5vh', justifySelf: 'flex-start', fontWeight: 'bold' }}>Tạo bài viết</p>
                <Hr />
                <CloseButton onClick={() => setCreatePostModal()} />
                <div className="left-home-items" style={{ width: '20vh' }} onClick={() => navigate('/profile')}>
                    <UserImage img={user.image == "" ? DefaultImage : user.image} height={'5vh'} width={'5vh'} />
                    <p className="left-home-text">{`${user.name}`}</p>
                </div>
                <textarea ref={contentRef} spellCheck={false} className="create-post-input" style={{ height: '10vh' }} id="text-comment-input" rows={1} placeholder={`${user.name} ơi, bạn đang nghĩ gì`}></textarea>
                <div className="create-post-image" onClick={() => {
                    document.getElementById('input-create-post')?.click()

                }}>
                    {currentImage == "" ? (
                        <>
                            <UserImage img={AddImage} height={'5vh'} width={'5vh'} />
                            <p style={{ fontSize: '2.5vh', fontWeight: 'bold' }}>Thêm ảnh/video</p>
                            <input id="input-create-post" type="file" style={{ display: 'none' }} onChange={(e) => onChangeFile(e)} />
                        </>
                    ) : (<>
                        {isMedia && <img style={{ position: 'fixed' }} src={Play} height={'5%'} />}
                        <img src={currentImage} style={{ objectFit: 'cover' }} height={'50%'} width={'50%'} />
                        <input id="input-create-post" type="file" style={{ display: 'none' }} onChange={(e) => onChangeFile(e)} />

                    </>
                    )}
                </div>
             
                    <FacebookButton onClick={() => CreatePost()} ButtonType={BUTTON_TYPE.basic} text="Đăng bài viết" style={{ width: '95%', margin: '1vh 1vh 1vh 1vh', height: '5vh', alignSelf: 'center', fontSize: '2.5vh' }} />


            </div>
        </div>
    );
}

export default ModalCreatePost;