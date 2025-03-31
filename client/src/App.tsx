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
import { updateLastMessage, UpdateMessage } from './slices/chatSlice'

function App() {
  const dispatch = useDispatch()
  const currentMessengerCard = useSelector((state: RootState) => state.messengerCard)
  const user = useSelector((state: RootState) => state.user.getUser)
  const userInfo = useSelector(selectUserInfo)
  const isUser = user._id != ""
  const currentMessengerCardRef = useRef<Array<UserQuickChatID>>([])
  useEffect(() => {
    currentMessengerCardRef.current = currentMessengerCard.messengerCard
    console.log('currentMessengerCardRef.current',currentMessengerCardRef.current  )
  }, [currentMessengerCard])
  useEffect(() => {
    const isUserSocket = user._id != ""

    if (isUserSocket) {
      socket.connect()
      socket.on('connect', () => {
        socket.emit('uploadCurrentUserId', user._id, socket.id)
        socket.on('getCurrentUserOnline', (userOnline) => {
          dispatch(setCurrentOnline(userOnline as UserOnline))
        })
      })




      socket.on('receiveMessage', ({ from,fromUser, message, name, image, createdAt, imageUser, chatId }) => {
        const width = window.innerWidth;
        const isCardExist = currentMessengerCardRef.current.find((card) => card.chatId == chatId)
        

      
        const lastMessage: UpdateMessage = {
          chatId: chatId,
          lastMessage: message,
          createdAt:createdAt,
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
        if (!isCardExist) {
          const newCard: UserQuickChatID = {
            _id: fromUser,
            name: name,
            image: imageUser,
            online: true,
            chatId: chatId,
            
          }
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

    }

    return () => {
      if (socket) {
        if (user._id != "") {
          const updateLastOnline = async () => {
            try {
              const time = Date.now()
              const data = {
                userId: user._id,
                time: time
              }
              await requestUser.put('updateLastOnline', data)
            } catch (e) {
              console.log(e)
              alert('Lỗi hiển thị')
            }
          }
          socket.off('getCurrentUserOnline')
          socket.disconnect()
          dispatch(clearAll())
          updateLastOnline()

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

        <Route path='/profile' element={isUser ? <Profile user={userInfo} /> : <Login />} />
      </Routes>

    </div>
  )
}

export default App


