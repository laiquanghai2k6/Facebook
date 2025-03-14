import FacebookIcon from "../assets/FacebookIcon.png";
import Input from "./Input";
import { IoHomeOutline } from "react-icons/io5";
import { LuTvMinimalPlay } from "react-icons/lu"
import { CiShop } from "react-icons/ci";
import { MdGroups } from "react-icons/md";
import { IoGameControllerOutline } from "react-icons/io5";
import { CgMenuGridO } from "react-icons/cg";
import { FaFacebookMessenger } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import UserImage from "./UserImage";
import { useDispatch, useSelector } from "react-redux";
import { navigateHome } from '../slices/homeNavigateSlice'
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import Messenger from "./Messenger";
import MessengerDown from "./MessengerDown";
import Notification from "./Notification";
import UserSetting from "./UserSetting";
const NavBar = () => {
    const [mesOpen,setMesOpen] = useState(false)
    const [notificationOpen,setNotificationOpen] = useState(false)
    const [userSettingOpen,setUserSettingOpen]=useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const currentNavigate = useSelector((state: RootState) => state.homeNavigate.currentHome)
    
    const NavigateHomeHandler = (e: string) => {
        dispatch(navigateHome(e))
        navigate(`/${e}`)
    }
    const closeMessage = useCallback(()=>setMesOpen(false),[])
    const closeNotification = useCallback(()=>setNotificationOpen(false),[])
    const closeUserSetting = useCallback(()=>setUserSettingOpen(false),[])
    return (
        <div className="navbar">
            <img src={FacebookIcon} alt="FacebookIcon" className="facebook-icon" style={{cursor:'pointer'}} />
            <Input type="text" className="home-input" placeholder="Search" />
            <div className="home-icon-middle-container">
                {currentNavigate == 'home' ? (

                    <div className="home-icon-middle" style={{ borderBottom: '0.5vh solid #0866ff',color:'#0866ff' }} >

                        <IoHomeOutline style={{ width: '15vh', height: '7vh' }}  />
                    </div>

                ) : (
                    <div className="home-icon-middle" onClick={() => NavigateHomeHandler('home')}>

                        <IoHomeOutline style={{ width: '15vh', height: '7vh' }} />
                    </div>

                )
                }
                {currentNavigate == 'video' ? (
                    <div className="home-icon-middle" style={{ borderBottom: '0.5vh solid #0866ff',color:'#0866ff' }}  >

                        <LuTvMinimalPlay style={{ width: '15vh', height: '7vh' }} />
                    </div>

                ) : (
                    <div className="home-icon-middle" onClick={() => NavigateHomeHandler('video')} >

                        <LuTvMinimalPlay style={{ width: '15vh', height: '7vh' }}  />
                    </div>

                )
                }
                {currentNavigate == 'shop' ? (
                    <div className="home-icon-middle" style={{ borderBottom: '0.5vh solid #0866ff',color:'#0866ff' }} >

                        <CiShop style={{ width: '15vh', height: '7vh' }} />
                    </div>
                ) : (
                    <div className="home-icon-middle"  onClick={() => NavigateHomeHandler('shop')}>

                        <CiShop style={{ width: '15vh', height: '7vh' }} />
                    </div>
                )
                }
                {currentNavigate == 'group' ? (
                    <div className="home-icon-middle" style={{ borderBottom: '0.5vh solid #0866ff',color:'#0866ff' }}  >

                        <MdGroups style={{ width: '15vh', height: '7vh' }}  />
                    </div>

                ) : (
                    <div className="home-icon-middle"  onClick={() => NavigateHomeHandler('group')}>

                        <MdGroups style={{ width: '15vh', height: '7vh' }}  />
                    </div>

                )
                }
                {currentNavigate == 'game' ? (
                    <div className="home-icon-middle" style={{ borderBottom: '0.5vh solid #0866ff',color:'#0866ff' }}>

                        <IoGameControllerOutline style={{ width: '15vh', height: '7vh' }}  />
                    </div>


                ) : (
                    <div className="home-icon-middle" onClick={() => NavigateHomeHandler('game')}>

                        <IoGameControllerOutline style={{ width: '15vh', height: '7vh' }}  />
                    </div>

                )
                }



            </div>
            <div className="home-icon-right-container">
                {mesOpen && <Messenger closeMessenger={closeMessage} />}
                {notificationOpen && <Notification closeNotification={closeNotification} />}
                {userSettingOpen && <UserSetting closeUserSetting={closeUserSetting} />}
                <div className="icon-round-background">
                    <div className="home-icon-right">
                        <CgMenuGridO style={{ fontSize: '3.5vh' }} className="home-icon-right-mes4" />
                    </div>
                </div>
                <div className="icon-round-background" onClick={()=>setMesOpen((prev)=>!prev)}>
                    <div className="home-icon-right-mes" style={{width:'6vh'}} >

                        <FaFacebookMessenger className="home-icon-right-mes2" />
                    </div>
                </div>
                <div className="icon-round-background" onClick={()=>setNotificationOpen((prev)=>!prev)}>
                    <div className="home-icon-right-noti">
                        <IoIosNotifications style={{ fontSize: '3.5vh' }} className="home-icon-right-noti2" />
                    </div>
                </div>
                <UserImage width={'5vh'} height={'5vh'} onClick={()=>setUserSettingOpen((prev)=>!prev)} />


            </div>
        </div>);
}

export default NavBar;