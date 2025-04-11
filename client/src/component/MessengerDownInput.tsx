import React, { ChangeEvent, KeyboardEvent,  useEffect, useRef, useState } from 'react';
import Camera from '../assets/camera.png'
import Send from '../assets/send.png'
import SendBlue from '../assets/send-blue.png'
import {  UserQuickChatID } from './RightHome';
import { socket } from '../socket';
import { UserOnline } from '../slices/messengerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from '../selector/userSelector';
import { requestChat, requestMessage } from '../service/service';
import { useMutation } from '@tanstack/react-query';
import { Message } from './MessengerDownCard';
import { addMessage } from '../slices/messageSlice';
import { updateLastMessage, UpdateMessage } from '../slices/chatSlice';
import Spinner from './Spinner';
interface MessengerDownInputProps {
    card: UserQuickChatID,
    userOnline: UserOnline
}

const MessengerDownInput: React.FC<MessengerDownInputProps> = ({ userOnline, card }) => {
    const user = useSelector(selectUserInfo)
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const sendRef = useRef<HTMLImageElement>(null);
    const dispatch= useDispatch()
    const [currentImage, setCurrentImage] = useState("")
    const [currentText, setCurrentText] = useState("")
    const [currentFile, setCurrentFile] = useState<File | undefined>(undefined)
    useEffect(() => {
        const textArea = document.getElementById(`messenger-down-card-input-bar-${card.chatId}`) as HTMLTextAreaElement | null;

        const textAreaControl = (event: Event) => {
            const target = event.target as HTMLTextAreaElement;
            target.rows = 1;

            const computedStyle = window.getComputedStyle(target);
            let lineHeight = parseFloat(computedStyle.lineHeight);
            if (isNaN(lineHeight)) {
                lineHeight = parseFloat(computedStyle.fontSize) * 1.2;
            }

            const line = Math.floor(target.scrollHeight / lineHeight);
            if (line > target.rows) {
                target.rows = line >= 7 ? 7 : line;
            }
        };

        if (textArea) {
            textArea.addEventListener("input", textAreaControl);
        }

        return () => {
            if (textArea) {
                textArea.removeEventListener("input", textAreaControl);
            }
        };
    }, [card.chatId])
    // useEffect(()=>{
        
    //     if(textAreaRef.current){
    //         textAreaRef.current.addEventListener('keydown',keyEventHandler)
    //     }
    //     return ()=>{
    //         if(textAreaRef.current){
    //             textAreaRef.current.removeEventListener('keydown',keyEventHandler)
    //         }
    //     }
   
    // },[])
    const CreateMessageNormal = async (text:string) => {
        try {
            
            const data = {
                text: text,
                chatId: card.chatId,
                senderId: user._id,
            }

            const response = await requestMessage.post('/createMessage', data)
            return response.data as Message
        } catch (e) {
            console.log(e)
            return alert('Lỗi gửi tin nhắn')
        }

    }
    const CreateMessageImage = async (file:File,texts:string) => {
        try {
            if (!file) return alert('Lỗi gửi ảnh tin nhắn')
            const data = new FormData()
            data.append('image', file)
            data.append('text', texts)
            data.append('chatId', card.chatId)
            data.append('senderId', user._id)

            const response = await requestMessage.post('/createMessageImage', data)
            return response.data as Message
        } catch (e) {
            console.log(e)
            return alert('Lỗi gửi ảnh tin nhắn')
        }

    }
    const mutationNormal = useMutation({
        mutationFn: async (text:string) => CreateMessageNormal(text),
        onSuccess: async (data) => {
            if (data) {
                const { text, chatId, senderId, createdAt, image } = data
                const now = new Date()
                const newMessage:Message={
                    chatId:chatId,
                    createdAt:createdAt,
                    senderId:senderId,
                    image:image,
                    text:text
                }
                const lastMessage:UpdateMessage={
                    chatId:chatId,
                    lastMessage:text ? text : "",
                    updatedAt:now.toString(),
                    senderId:senderId
                }
                const isUser1 = card?.user[0] == user._id

                if (userOnline[card._id]){
                    socket.emit('sendMessage', {
                        fromUser:user._id,
                        from: userOnline[user._id],
                        toSocketId: userOnline[card._id],
                        toUserId:card._id,
                        message: text,
                        createdAt: now,
                        name: user.name,
                        imageUser: user.image,
                        image:image,
                        chatId:chatId,
                        user:card.user,
                        seen2:isUser1 ? false : true,
                        seen1:isUser1 ? true : false,
                    })
        
                }
                if(isUser1){
                    const lastMessageMongodb = {...lastMessage,seen1:true,seen2:false}
                     requestChat.put('/updateLatestMessage', lastMessageMongodb)
                }else{
                    const lastMessageMongodb = {...lastMessage,seen1:false,seen2:true}
                     requestChat.put('/updateLatestMessage', lastMessageMongodb)
                }
                
                dispatch(updateLastMessage(lastMessage))
                dispatch(addMessage(newMessage))
                setCurrentText("")
                setCurrentFile(undefined)
                setCurrentImage("")
            }
            // dispatch(setComment(newComment))
            // setLoading(false)
        },
        onError: (error) => {
            console.error("Error:", error);
            // setLoading(false)
            return alert('Lỗi gửi tin nhắn')
        },
        // onMutate: () => setLoading(true)
    })
    const mutationImage = useMutation({
        mutationFn: async ({file,text}:{file:File,text:string}) => CreateMessageImage(file,text),
        onSuccess: async (data) => {
            if (data) {
                const { text, chatId, senderId, createdAt, image } = data
                const now = new Date()
                const newMessage:Message={
                    chatId:chatId,
                    createdAt:createdAt,
                    senderId:senderId,
                    image:image,
                    text:text
                }
                const lastMessage:UpdateMessage={
                    chatId:chatId,
                    lastMessage:text ? text : "",
                    updatedAt:now.toString(),
                    senderId:senderId
                }
                const isUser1 = card?.user[0] == user._id

                if (userOnline[card._id]){
                    socket.emit('sendMessage', {
                        fromUser:user._id,
                        from: userOnline[user._id],
                        toSocketId: userOnline[card._id],
                        message: text,
                        createdAt: now,
                        name: user.name,
                        imageUser: user.image,
                        image:image,
                        chatId:chatId,
                        user:card.user,
                        seen2:isUser1 ? false:true,
                        seen1:isUser1 ? true : false,
                    })
                }
                if(isUser1){
                    const lastMessageMongodb = {...lastMessage,seen1:true,seen2:false}
                     requestChat.put('/updateLatestMessage', lastMessageMongodb)
                }else{
                    const lastMessageMongodb = {...lastMessage,seen1:false,seen2:true}
                     requestChat.put('/updateLatestMessage', lastMessageMongodb)
                }
                
                dispatch(updateLastMessage(lastMessage))
                dispatch(addMessage(newMessage))
                setCurrentText("")
                setCurrentFile(undefined)
                setCurrentImage("")
          

            }

            // dispatch(setComment(newComment))
            // setLoading(false)
        },
        onError: (error) => {
            console.error("Error:", error);
            return alert('Lỗi gửi ảnh tin nhắn')
        },
        // onMutate: () => setLoading(true)
    })
    const onChangeInputImage = (e:ChangeEvent<HTMLInputElement>)=>{
        const filePath = e.target.files?.[0] as File
        
        if(!filePath.type.startsWith('image/')){
            alert('Vui lòng gửi ảnh')
        }
        else{
            const imageUrl = URL.createObjectURL(filePath)
            setCurrentFile(filePath)
            setCurrentImage(imageUrl)
           

        }
    }
    const sendMessage =async () => {
        if(currentImage != "" && currentFile ){
            mutationImage.mutate({file:currentFile,text:currentText})
        }else{
            mutationNormal.mutate(currentText)
            
        }
       

    }
    const keyEventHandler = async (event:KeyboardEvent<HTMLTextAreaElement>)=>{
        // const keyboardEvent = event as unknown as KeyboardEvent;
        
        if(event.key == "Enter" && !event.shiftKey ){
            event.preventDefault()
            // console.log('good')
            const value = event.currentTarget.value.trim();
            if(value){
                sendMessage()

            }
        }
    }
    return (
        <div className="messenger-down-card-input">
            {mutationImage.isPending && <Spinner />}
            {currentImage != "" &&(

                <img src={currentImage} style={{width:'3rem',height:'3rem',marginBottom:'0.2rem',borderRadius:'0.2rem',marginLeft:'3.5rem',marginRight:'auto',objectFit:'cover'}} />
            )}

            <div style={{display:'flex',flexDirection:'row'}}>

            <img src={Camera} className='messenger-down-icon-left' onClick={()=>document.getElementById('upload-message-image')?.click()} />
                <textarea onKeyDown={(e)=>keyEventHandler(e)} ref={textAreaRef} spellCheck={false} value={currentText} onChange={(e) =>{
                    if(e.target.value != '\n'){
                        setCurrentText(e.target.value)
                    }
                    
                } } rows={1} id={`messenger-down-card-input-bar-${card.chatId}`} className='messenger-down-card-input-bar' placeholder='Viết tin nhắn' />
            {currentImage == "" && currentText == "" ? (
                <img src={Send} className='messenger-down-icon-right' />
            ) : (
                <img src={SendBlue} ref={sendRef} onClick={() => {
                    sendMessage()
                }} className='messenger-down-icon-right' />
            )}
            <input  onChange={(e) => {onChangeInputImage(e) }} type="file" style={{ display: 'none' }} id="upload-message-image" />

            </div>
        </div>
    );
}

export default MessengerDownInput;