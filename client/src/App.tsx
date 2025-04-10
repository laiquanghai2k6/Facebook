import { useEffect, useRef, useState } from 'react'

import './App.css'
import Login from './pages/Auth/Login'
import NavBar from './component/NavBar'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
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
import { socket } from './socket'
import { clearAll, setCurrentOnline, setMessengerCard, UserOnline } from './slices/messengerSlice'
import { UserQuickChatID } from './component/RightHome'
import { Message } from './component/MessengerDownCard'
import { addMessage } from './slices/messageSlice'
import { increaseUnRead, updateLastMessage, UpdateMessage, updateSeen, UpdateSeen } from './slices/chatSlice'
import { acceptFriend, addNoti, clearNoti, deleteNoti, notiType, rejectFriend, setNumberNoti } from './slices/notiSlice'
import axios from 'axios'
import { setToken } from './slices/tokenSlice'
import { requestUser } from './service/service'
import { setUser, User } from './slices/userSlice'
import LoadingAuth from './pages/Auth/LoadingAuth'

function App() {
  const dispatch = useDispatch()
  const currentMessengerCard = useSelector((state: RootState) => state.messengerCard)
  const user = useSelector((state: RootState) => state.user.getUser)
  const [isLoadingAuth, setIsLoadingAuth] = useState(true)
  const navigate = useNavigate()
  const isUser = user._id != ""
  const currentMessengerCardRef = useRef<Array<UserQuickChatID>>([])
  useEffect(() => {
    console.log('inApp1')

    const getAccessToken = async () => {
      try {
        console.log('inApp2')

        const token = await axios.get(`${import.meta.env.VITE_SERVER_URL}/users/handlerRefreshToken`, {
          withCredentials: true
        })

        console.log('he')
        const accessToken = token.data

        dispatch(setToken(accessToken))
        const getUser = await requestUser.get('/getUserWithToken')

        dispatch(setUser(getUser.data as User))
        document.documentElement.style.backgroundColor = "#1c1c1d";
        document.body.style.backgroundColor = "#1c1c1d";
        navigate('/home')
        setIsLoadingAuth(false)
      } catch (e) {
        setIsLoadingAuth(false)
        console.log('RefreshToken hết hạn hoặc chưa có');
      }
    }
    getAccessToken()
  }, [])
  useEffect(() => {
    currentMessengerCardRef.current = currentMessengerCard.messengerCard
  }, [currentMessengerCard])
  useEffect(() => {
    const isUserSocket = user._id != ""
    if (isUserSocket) {
      document.documentElement.style.backgroundColor = "#1c1c1d";
      document.body.style.backgroundColor = "#1c1c1d";
      socket.connect()
      dispatch(setNumberNoti(user.numberNoti))
      socket.on('connect', () => {
        socket.emit('uploadCurrentUserId', user._id, socket.id)
        socket.on('getCurrentUserOnline', ({ userOnline }) => {
          dispatch(setCurrentOnline(userOnline as UserOnline))
        })
      })




      socket.on('receiveMessage', ({ from, fromUser, user, seen1, seen2, message, name, image, createdAt, imageUser, chatId }) => {

        const width = window.innerWidth;
        const isCardExist = currentMessengerCardRef.current.find((card) => card.chatId == chatId)


        const lastMessage: UpdateMessage = {
          chatId: chatId,
          lastMessage: message,
          updatedAt: createdAt,
          senderId: user._id,
          seen1: seen1,
          seen2: seen2
        }
        const newMessage: Message = {
          chatId: chatId,
          createdAt: createdAt,
          senderId: from,
          image: image,
          text: message
        }
        if (isCardExist) {
          dispatch(addMessage(newMessage))
        }

        dispatch(updateLastMessage(lastMessage))

        const remToPx = 20 * 16

        const newCard: UserQuickChatID = {
          _id: fromUser,
          name: name,
          image: imageUser,
          online: true,
          chatId: chatId,
          seen1: seen1,
          seen2: seen2,
          user: user
        }


        console.log()
        if (!isCardExist) {

          if (currentMessengerCardRef.current.length == 0) {
            dispatch(setMessengerCard(newCard))
          }
          else if ((currentMessengerCardRef.current.length + 1) * remToPx <= 70 * (width / 100)) {
            dispatch(setMessengerCard(newCard))
          } else {

            dispatch(increaseUnRead(fromUser))
            // dispatch(fullMessengerCard(newCard))
          }
        }
      })
      socket.on('noticeSeenMessage', ({ isSeen, seenWhatAt, chatId }) => {
        const updateSeenDispatch: UpdateSeen = {
          isSeen: isSeen,
          seenWhatAt: parseInt(seenWhatAt),
          chatId: chatId,
        }
        dispatch(updateSeen(updateSeenDispatch))
      })
      socket.on('sendNotiToUser', (noti: notiType) => {
        dispatch(addNoti(noti))
      })
      socket.on('deleteNoti', (userId) => {
        console.log('delete:', userId)
        dispatch(deleteNoti(userId))
      })
      socket.on('successFriend', (toUserId) => {
        dispatch(acceptFriend(toUserId))
      })
      socket.on('rejectFriend', (toUserId) => {
        dispatch(rejectFriend(toUserId))
      })
    }

    return () => {

      if (socket) {
        if (user._id != "") {
          socket.off()
          socket.disconnect()
        }

      }
      currentMessengerCardRef.current = []
      dispatch(clearAll())
      dispatch(clearNoti())

      document.documentElement.style.backgroundColor = "#f0f2f5";
      document.body.style.backgroundColor = "#f0f2f5";
    }
  }, [user])

  if (isLoadingAuth) {
    return <LoadingAuth />
  }
  return (
    <div className='container'>
      {isUser && <NavBar user={user} />}

      <ScrollToTop />
      <Routes>
        <Route path='/' element={
          isLoadingAuth
            ? <LoadingAuth />
            : (isUser ? <Navigate to="/home" /> : <Login />)
        } />
        {/* <Route path='/' element={isLoadingAuth ? <LoadingAuth /> : <Login />} /> */}
        {/* <Route path='/login' element={!isUser && <Login />} /> */}
        <Route path="/login" element={
          isLoadingAuth
            ? <LoadingAuth />
            : (!isUser ? <Login /> : <Navigate to="/home" />)
        } />
        {isLoadingAuth ? (
          <Route path="*" element={<LoadingAuth />} />
        ) : (
          <>
            <Route path='/register' element={<Register />} />
            <Route path='/home' element={isUser ? <Home /> : <Login />} />
            <Route path='/video' element={isUser ? <Video /> : <Login />} />
            <Route path='/shop' element={isUser ? <Shop /> : <Login />} />
            <Route path='/group' element={isUser ? <Group /> : <Login />} />
            <Route path='/game' element={isUser ? <Game /> : <Login />} />
            <Route path='/profileOther' element={isUser ? <ProfileOther /> : <Login />} />

            <Route path='/profile' element={isUser ? <Profile user={user} /> : <Login />} />
          </>
        )}
      </Routes>

    </div>
  )
}

export default App


