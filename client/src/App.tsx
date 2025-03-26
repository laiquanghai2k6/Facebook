import { Profiler, useState } from 'react'

import './App.css'
import Login from './pages/Auth/Login'
import NavBar from './component/NavBar'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Auth/Register'
import Home from './pages/Home/Home'
import { useSelector } from 'react-redux'
import { RootState } from './store/store'

import Shop from './pages/Home/Shop'
import Group from './pages/Home/Group'
import Game from './pages/Home/Game'
import Profile from './pages/Home/Profile'
import ProfileOther from './pages/Home/ProfileOther'
import Video from './pages/Video/Video'


function App() {

    const user = useSelector((state:RootState)=>state.user.getUser)
    const isUser = user._id != ""

    return (
    <div className='container'>
     {isUser && <NavBar /> }


    <Routes>
      <Route path='/' element={ <Login />}/>
      <Route path='/login' element={ <Login />}/>

      <Route path='/register' element={<Register />} />
      <Route path='/home' element={isUser ? <Home /> :<Login /> } />
      <Route path='/video' element={isUser ? <Video /> : <Login />} />
      <Route path='/shop' element={isUser ? <Shop />: <Login />} />
      <Route path='/group' element={isUser ?<Group />:<Login />} />
      <Route path='/game' element={isUser ? <Game />: <Login />} />
      <Route path='/profileOther' element={isUser ? <ProfileOther /> : <Login />}/>

      <Route path='/profile' element={isUser ? <Profile /> : <Login />}/>
    </Routes>

    </div>
  )
}

export default App


