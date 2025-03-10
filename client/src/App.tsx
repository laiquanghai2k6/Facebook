import { useState } from 'react'

import './App.css'
import Login from './pages/Auth/Login'
import NavBar from './component/NavBar'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Auth/Register'
import Home from './pages/Home/Home'
import { useSelector } from 'react-redux'
import { RootState } from './store/store'
import Video from './pages/Home/Video'
import Shop from './pages/Home/Shop'
import Group from './pages/Home/Group'
import Game from './pages/Home/Game'
function App() {
    
    

  return (
    <div className='container'>
     <NavBar />
    <Routes>
      <Route path='/' element={<Login />}/>
      <Route path='/register' element={<Register />} />
      <Route path='/home' element={<Home />} />
      <Route path='/video' element={<Video />} />
      <Route path='/shop' element={<Shop />} />
      <Route path='/group' element={<Group />} />
      <Route path='/game' element={<Game />} />
    </Routes>
    </div>
  )
}

export default App
