import { ChangeEvent, useEffect, useRef, useState } from "react";
import UserImage from "./UserImage";
import Camera from '../assets/camera.png'
import HomeItem from "./HomeItem";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../selector/userSelector";
import Default from '../assets/default-image.png'
import SendBlue from '../assets/send-blue.png'
import Play from '../assets/play.png'


import { requestComment } from "../service/service";
import { PostType } from "../slices/postSlice";
import { CommentType, setComment } from "../slices/commentSlice";
import { useMutation } from "@tanstack/react-query";

type CommentInputProps = {
    post: PostType,
    setLoading: Function
}

const CommentInput = ({ post, setLoading }: CommentInputProps) => {
    const [currentImage, setCurrentImage] = useState("")
    const [currentFile, setCurrentFile] = useState<File | undefined>(undefined)
    const [isMedia, setIsMedia] = useState(false)
    const content = useRef<HTMLTextAreaElement>(null)
    const media = useRef<HTMLInputElement>(null)
    const user = useSelector(selectUserInfo)
    const dispatch = useDispatch()

    useEffect(() => {
        const textarea = document.getElementById("text-comment-input");

        if (textarea) {
            textarea.addEventListener("input", function () {
                (this as HTMLTextAreaElement).rows = 1;
                const computedStyle = window.getComputedStyle(this);

                let lineHeight = parseFloat(computedStyle.lineHeight);
                if (isNaN(lineHeight)) {
                    lineHeight = parseFloat(computedStyle.fontSize) * 1.2;
                }


                const lines = Math.floor(this.scrollHeight / lineHeight);
                const currentRows = Math.max(1, lines);
                if (currentRows > (this as HTMLTextAreaElement).rows) {
                    if (currentRows >= 7) (this as HTMLTextAreaElement).rows = 7;
                    else (this as HTMLTextAreaElement).rows = currentRows;
                }
            });
        }
    }, [])

    const getFirstFrame = (file: File) => {
        const video = document.createElement('video')
        video.muted = true
        video.playsInline = true
        video.src = URL.createObjectURL(file)
        video.crossOrigin = "anonymous"
        video.onloadeddata = () => {
            video.currentTime = 0.1
        }
        video.oncanplay = () => {
            const canvas = document.createElement('canvas')
            canvas.height = video.videoHeight
            canvas.width = video.videoWidth
            const ctx = canvas.getContext('2d')
            if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
                canvas.toBlob((blob) => {
                    const imageUrl = URL.createObjectURL(blob as File)
                    setCurrentImage(imageUrl)
                    setCurrentFile(file)
                    setIsMedia(true)
                }, "image/png")
            } else alert('Vui lòng dùng trình duyệt có hỗ trợ canvas')
        }
        video.onerror = () => {
            alert('Lỗi tải video')
        }
    }

    const onChangeInputImage = (e: ChangeEvent<HTMLInputElement>) => {
        const filePath = e.target.files?.[0] as File
        
        if (filePath.name.endsWith('.mp4')) {
            const video = document.createElement('video');
            video.preload = 'metadata';
            video.src = URL.createObjectURL(filePath);
            video.onloadedmetadata = function () {
                window.URL.revokeObjectURL(video.src);
                const height = video.videoHeight;
        
                if (height > 720) {
                    alert('Chỉ chấp nhận video độ phân giải tối đa 720p');
                    return;
                } else {
                    
                    getFirstFrame(filePath)
                }
            };
           

        } else if (filePath.type.startsWith('image/')) {
           
            const imageUrl = URL.createObjectURL(filePath)
            setIsMedia(false)
            setCurrentFile(filePath)
            setCurrentImage(imageUrl)

        } else {
            return alert('Vui lòng chọn ảnh hoặc file có đuôi .mp4')
        }
    }
    const CreateCommentWithImage = async (text:string) => {

        const data = new FormData()
        data.append("image", currentFile as File)
        data.append("text", text)
        data.append("postId", post._id)
        data.append("userId", user._id)
        data.append("type", 'direct')
        const response = await requestComment.post('/createCommentWithImage', data)
        return response.data

    }
    const CreateCommentWithVideo = async (text:string) => {
        const formData = new FormData()
        formData.append("text",text)
        formData.append("video", currentFile as File)
        formData.append("postId", post._id)
        formData.append("userId", user._id)
        formData.append("type", "direct")
        const response = await requestComment.post('/createCommentWithVideo', formData)
        return response.data
    }
    const CreateCommentNormal = async (text:string) => {
        const data = {
            text: text,
            postId: post._id,
            userId: user._id,
            type: 'direct'
        }
      
        const response = await requestComment.post('/createComment', data)
        return response.data
    }
    const mutationImage = useMutation({
        mutationFn: async (text:string) => CreateCommentWithImage(text),
        onSuccess: (data: CommentType) => {
            const { image, text, _id, postId, userId, type, parentId, createdAt, video } = data
            const newComment: CommentType = {
                _id,
                createdAt,
                image,
                text,
                postId,
                userId,
                type,
                parentId,
                video
            }
            dispatch(setComment(newComment))
            setLoading(false)
        },
        onError: (error) => {
            console.error("Error:", error);
            setLoading(false)
            return alert('Lỗi tạo bình luận')

        },
        onMutate: () => setLoading(true)
    })
    const mutationVideo = useMutation({
        mutationFn: async (text:string) => CreateCommentWithVideo(text),
        onSuccess: (data: CommentType) => {
            const { image, text, _id, postId, userId, type, parentId, createdAt, video } = data
            const newComment: CommentType = {
                _id,
                createdAt,
                image,
                text,
                postId,
                userId,
                type,
                parentId,
                video
            }
            dispatch(setComment(newComment))
            setLoading(false)
        },
        onError: (error) => {
            console.error("Error:", error);
            setLoading(false)
            return alert('Lỗi tạo bình luận')
        },
        onMutate: () => setLoading(true)
    })

    const mutationNormal = useMutation({
        mutationFn: async (text:string) => CreateCommentNormal(text),
        onSuccess: (data: CommentType) => {
            const { image, text, postId, userId, _id, type, parentId, createdAt, video } = data
            const newComment: CommentType = {
                _id,
                createdAt,
                image,
                text,
                postId,
                userId,
                type,
                parentId,
                video
            }
            dispatch(setComment(newComment))
            setLoading(false)
        },
        onError: (error) => {
            console.error("Error:", error);
            setLoading(false)
            return alert('Lỗi tạo bình luận')
        },
        onMutate: () => setLoading(true)
    })
    let text
    const onCreateComment = async () => {

        if(content.current?.value == "" && currentImage==""){
            return alert('Bình luận không được để trống')
        }
        if(content.current?.value){
            text = content.current.value
        }else text =""
        if (currentImage != "" && !isMedia) {
            try {
                mutationImage.mutate(text)
            } catch (e) {
                console.log('eror:', e)
                return alert('Lỗi tạo bình luận với ảnh')
            }
        } else if (currentImage != "" && isMedia) {
            try {
                mutationVideo.mutate(text)
            } catch (e) {
                console.log(e)
                return alert('Lỗi tạo bình luận với ảnh')
            }
        } else {
            try {

                mutationNormal.mutate(text)
            } catch (e) {
                console.log(e)
                return alert('Lỗi tạo bình luận')
            }
        }
        if(content.current){
            content.current.value=""
        }
        if(media.current){
            media.current.value=""
        }
        
        setCurrentImage("")
    }

    return (
        <>
            <div className="comment-input">
                <div style={{ display: 'flex', flexDirection: 'row', margin: '1rem 0 0 0.75rem' }}>

                    <UserImage height={'2.15rem'} width={'2.15rem'} img={user.image == "" ? Default : user.image} />
                    <textarea ref={content} spellCheck={false}  className="text-comment-input" id="text-comment-input" rows={1} placeholder={`Bình luận dưới tên ${user.name}`}></textarea>
                </div>

                <div style={{ minHeight: '2.5rem', marginRight:'1rem',backgroundColor: '#333334', display: 'flex', flexDirection: 'column', color: '#aeb1b6', fontSize: '0.9rem', marginLeft: '3.75em', borderRadius: '0 0 1rem 1rem' }}>
                    {currentImage != "" && (
                        <div style={{ height: '4rem', width: '4rem', position: 'relative', marginLeft: '1rem', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                            {isMedia && <img style={{ position: 'absolute' }} src={Play} height={'20%'} />}

                            <img src={currentImage} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                        </div>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <HomeItem onClick={() => document.getElementById('upload-comment-image')?.click()} img={Camera} styleImg={{ width: '1.5rem', height: '1.5rem' }} styleContainer={{ marginLeft: '1rem' }} />
                        <input ref={media} onChange={(e) => { onChangeInputImage(e) }} type="file" style={{ display: 'none' }} id="upload-comment-image" />
                        

                           
                       
                            <HomeItem img={SendBlue} onClick={onCreateComment} styleImg={{ width: '1.5rem', height: '1.5rem' }} />

                    </div>


                </div>
            </div>

        </>
    );
}

export default CommentInput;