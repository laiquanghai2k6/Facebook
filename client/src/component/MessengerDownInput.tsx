import React, { ChangeEvent, KeyboardEvent, TextareaHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react';
import Camera from '../assets/camera.png'
import Send from '../assets/send.png'
import SendBlue from '../assets/send-blue.png'
import { UserQuickChat, UserQuickChatID } from './RightHome';
import { socket } from '../socket';
import { UserOnline } from '../slices/messengerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from '../selector/userSelector';
import { requestMessage } from '../service/service';
import { useMutation } from '@tanstack/react-query';
import { Message } from './MessengerDownCard';
import test from '../assets/test2.png'
import { addMessage } from '../slices/messageSlice';
import { updateLastMessage, UpdateMessage } from '../slices/chatSlice';
interface MessengerDownInputProps {
    keys: number,
    card: UserQuickChatID,
    userOnline: UserOnline
}

const MessengerDownInput: React.FC<MessengerDownInputProps> = ({ userOnline, keys, card }) => {
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
    useEffect(()=>{
        const keyEventHandler = (event:Event)=>{
            const keyboardEvent = event as unknown as KeyboardEvent;
            
            if(keyboardEvent.key == "Enter" && !keyboardEvent.shiftKey && textAreaRef.current?.value !=""){
                keyboardEvent.preventDefault()
                console.log('good')
                // sendRef.current?.click()
            }
        }
        if(textAreaRef.current){
            textAreaRef.current.addEventListener('keydown',keyEventHandler)
        }
        return ()=>{
            if(textAreaRef.current){
                textAreaRef.current.removeEventListener('keydown',keyEventHandler)
            }
        }
   
    },[])
    const CreateMessageNormal = async (text:string) => {
        try {
            
            const data = {
                text: text,
                chatId: card.chatId,
                senderId: user._id,
            }
            console.log('data req',data)

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
        onSuccess: (data) => {
            if (data) {
                const { text, chatId, senderId, createdAt } = data
                const newMessage: Message = {
                    chatId,
                    senderId,
                    createdAt,
                    text,
                }
                console.log(newMessage)

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
        onSuccess: (data) => {
            if (data) {
                const { text, chatId, senderId, createdAt, image } = data
                const newMessage: Message = {
                    chatId,
                    senderId,
                    createdAt,
                    text,
                    image
                }
                console.log(newMessage)

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
        console.log(filePath)
        if(!filePath.type.startsWith('image/')){
            alert('Vui lòng gửi ảnh')
        }
        else{
            const imageUrl = URL.createObjectURL(filePath)
            setCurrentFile(filePath)
            setCurrentImage(imageUrl)
            console.log(imageUrl)

        }
    }
    const sendMessage = () => {
        if(currentImage != "" && currentFile ){
            mutationImage.mutate({file:currentFile,text:currentText})
        }else{
            mutationNormal.mutate(currentText)
        }
        const now = new Date()
        if (userOnline[card._id]){
            socket.emit('sendMessage', {
                fromUser:user._id,
                from: userOnline[user._id],
                toSocketId: userOnline[card._id],
                message: currentText,
                createdAt: now,
                name: user.name,
                imageUser: user.image,
                image:currentImage,
                chatId:card.chatId
            })
            const lastMessage:UpdateMessage={
                chatId:card._id,
                lastMessage:currentText,
                createdAt:now.toString(),
                senderId:user._id
            }
            const newMessage:Message={
                chatId:card.chatId,
                createdAt:now.toString(),
                senderId:user._id,
                image:currentImage,
                text:currentText
            }
            dispatch(updateLastMessage(lastMessage))
            dispatch(addMessage(newMessage))
        }
        setCurrentText("")
        setCurrentFile(undefined)
        setCurrentImage("")

    }
    
    return (
        <div className="messenger-down-card-input">
            {currentImage != "" &&(

                <img src={test} style={{width:'3rem',height:'3rem',marginBottom:'0.2rem',borderRadius:'0.2rem',marginLeft:'3.5rem',marginRight:'auto',objectFit:'cover'}} />
            )}

            <div style={{display:'flex',flexDirection:'row'}}>

            <img src={Camera} className='messenger-down-icon-left' onClick={()=>document.getElementById('upload-message-image')?.click()} />
                <textarea ref={textAreaRef} spellCheck={false} value={currentText} onChange={(e) =>{
                    if(e.target.value != '\n'){
                        setCurrentText(e.target.value)
                    }
                    
                } } rows={1} id={`messenger-down-card-input-bar-${card.chatId}`} className='messenger-down-card-input-bar' placeholder='Viết tin nhắn' />
            {currentImage == "" && currentText == "" ? (
                <img src={Send} className='messenger-down-icon-right' />
            ) : (
                <img src={SendBlue} ref={sendRef } onClick={() => {
                    sendMessage()
                }} className='messenger-down-icon-right' />
            )}
            <input  onChange={(e) => {onChangeInputImage(e) }} type="file" style={{ display: 'none' }} id="upload-message-image" />

            </div>
        </div>
    );
}

export default MessengerDownInput;