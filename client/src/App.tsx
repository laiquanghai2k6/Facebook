import { Profiler, useEffect, useRef, useState } from 'react'

import './App.css'
import Login from './pages/Auth/Login'
import NavBar from './component/NavBar'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Auth/Register'
import Home from './pages/Home/Home'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store/store'

import Shop from './pages/Home/Shop'
import Group from './pages/Home/Group'
import Game from './pages/Home/Game'
import Profile from './pages/Home/Profile'
import ProfileOther from './pages/Home/ProfileOther'
import Video from './pages/Video/Video'
import ScrollToTop from './component/ScrollToTop'
import { io, Socket } from 'socket.io-client'
import { socket } from './socket'
import { selectUserInfo } from './selector/userSelector'
import { clearAll, fullMessengerCard, setCurrentOnline, setMessengerCard, UserOnline } from './slices/messengerSlice'
import { UserQuickChat, UserQuickChatID } from './component/RightHome'
import { requestUser } from './service/service'
import { Message } from './component/MessengerDownCard'
import { addMessage } from './slices/messageSlice'
import { updateLastMessage, UpdateMessage, updateSeen, UpdateSeen } from './slices/chatSlice'

function App() {
  const dispatch = useDispatch()
  const currentMessengerCard = useSelector((state: RootState) => state.messengerCard)
  const user = useSelector((state: RootState) => state.user.getUser)

  const isUser = user._id != ""
  const currentMessengerCardRef = useRef<Array<UserQuickChatID>>([])
  useEffect(() => {
    currentMessengerCardRef.current = currentMessengerCard.messengerCard 
  }, [currentMessengerCard])
  useEffect(() => {
    const isUserSocket = user._id != ""

    if (isUserSocket) {
      socket.connect()
      socket.on('connect', () => {
        socket.emit('uploadCurrentUserId', user._id, socket.id)
        socket.on('getCurrentUserOnline', ({userOnline,isOffline}) => {
          dispatch(setCurrentOnline(userOnline as UserOnline))
        })
      })




      socket.on('receiveMessage', ({ from,fromUser,user,seen1At,seen2At ,message, name, image, createdAt, imageUser, chatId }) => {
        const width = window.innerWidth;
        const isCardExist = currentMessengerCardRef.current.find((card) => card.chatId == chatId)
        const lastMessage: UpdateMessage = {
          chatId: chatId,
          lastMessage: message,
          updatedAt:createdAt,
          senderId: user._id
        }
        const newMessage: Message = {
          chatId: chatId,
          createdAt: createdAt,
          senderId: from,
          image: image,
          text: message
        }
        if(isCardExist){
           dispatch(addMessage(newMessage))
        }
          dispatch(updateLastMessage(lastMessage))
      
        const remToPx = 20 * 16
        
        const newCard:UserQuickChatID={
          _id: fromUser,
          name: name,
          image: imageUser,
          online: true,
          chatId: chatId,
          seen1:seen1At,
          seen2:seen2At,
          user:user
        }
        console.log('receive new message',newCard)

     
        
        if (!isCardExist) {
        
          if (currentMessengerCardRef.current.length == 0) {
            dispatch(setMessengerCard(newCard))
          }
          else if (currentMessengerCardRef.current.length + 1 * remToPx <= 70 * (width / 100)) {
            dispatch(setMessengerCard(newCard))
          } else {
            dispatch(fullMessengerCard(newCard))
          }
        }
      })
      socket.on('noticeSeenMessage',({isSeen,seenWhatAt,chatId,fromUser})=>{
          const updateSeenDispatch:UpdateSeen= {
            isSeen:isSeen,
            seenWhatAt:parseInt(seenWhatAt),
            chatId:chatId,
          }
          dispatch(updateSeen(updateSeenDispatch)) 
      })
    }

    return () => {
     
      if (socket) {
        if (user._id != "") {
         
          socket.off()
          socket.disconnect()
          dispatch(clearAll())
        }
       
      }

      currentMessengerCardRef.current = []
      dispatch(clearAll())
    }
  }, [user])

  return (
    <div className='container'>
      {isUser && <NavBar />}

      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />

        <Route path='/register' element={<Register />} />
        <Route path='/home' element={isUser ? <Home /> : <Login />} />
        <Route path='/video' element={isUser ? <Video /> : <Login />} />
        <Route path='/shop' element={isUser ? <Shop /> : <Login />} />
        <Route path='/group' element={isUser ? <Group /> : <Login />} />
        <Route path='/game' element={isUser ? <Game /> : <Login />} />
        <Route path='/profileOther' element={isUser ? <ProfileOther /> : <Login />} />

        <Route path='/profile' element={isUser ? <Profile user={user} /> : <Login />} />
      </Routes>

    </div>
  )
}

export default App


