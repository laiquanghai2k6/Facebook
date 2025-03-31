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
import React, { HTMLAttributes, useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import Messenger from "./Messenger";
import MessengerDown from "./MessengerDown";
import Notification from "./Notification";
import UserSetting from "./UserSetting";
import Default from '../assets/default-image.png'
import { selectUserInfo } from "../selector/userSelector";
import { useQuery } from "@tanstack/react-query";
import { requestUser } from "../service/service";
import DropdownSearch from "./DropdownSearch";

export const debounce = (callback:Function,delay:number)=>{
    let time: NodeJS.Timeout | undefined = undefined
    return (value:string)=>{
        clearTimeout(time)
        time = setTimeout(()=>callback(value),delay)
    }
}

const NavBar = () => {
    const [mesOpen,setMesOpen] = useState(false)
    const [notificationOpen,setNotificationOpen] = useState(false)
    const [userSettingOpen,setUserSettingOpen]=useState(false)
    const [dropdownSearch,setDropdownSearch] = useState(false)
    const [fetchSearch,setFetchSearch] = useState({
        text:"",
        data:[],
    })
    const [isPending, startTransition] = useTransition();
    

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(selectUserInfo)
    const currentNavigate = useSelector((state: RootState) => state.homeNavigate.currentHome)
    const NavigateHomeHandler = (e: string) => {
        dispatch(navigateHome(e))
        navigate(`/${e}`)
    }
 
    const FetchUser = async (value:string)=>{
        try{
            if(value != ""){

                const response = await requestUser.get(`/searchUser?name=${value}`)
                setFetchSearch((prev)=>({...prev,data:response.data}))
            }
        }catch(e){
            console.log(e)
            alert('Lỗi tìm người dùng')
        }
    }
    
    const FetchUserSearch = useMemo(()=>{
        return debounce(FetchUser,500)
    },[])
    const closeMessage = useCallback(()=>setMesOpen(false),[])
    const closeNotification = useCallback(()=>setNotificationOpen(false),[])
    const closeUserSetting = useCallback(()=>setUserSettingOpen(false),[])
    useEffect(()=>{
        
    
        if(dropdownSearch){
            document.addEventListener('click',function (event){
                const id = (event.target as HTMLElement).className
                if(id != "dropdown-search-container"){
                    setDropdownSearch(false)
                }
                
            })

        }
    },[dropdownSearch])
    return (
        <div className="navbar">
            {dropdownSearch && <DropdownSearch isPending={isPending} user={fetchSearch.data} />}
            <div style={{display:'flex',flexDirection:'row',alignItems:'center',width:'21vw'}}>

            <img src={FacebookIcon} alt="FacebookIcon" className="facebook-icon" style={{cursor:'pointer'}} />
            <Input style={{width:'14rem'}} value={fetchSearch.text} onChange={(e)=>
                {   
                    if(e.target.value != "") setDropdownSearch(true)
                    else setDropdownSearch(false)
                    setFetchSearch((prev)=>({...prev,text:e.target.value}))
                    startTransition(()=>{
                        FetchUserSearch(e.target.value)

                    })
                    }} type="text" className="home-input" placeholder="Search" />
            </div>
            <div className="home-icon-middle-container" >
                {currentNavigate == 'home' ? (

                    <div  className="home-icon-middle-blue"  >

                        <IoHomeOutline style={{ width: '7.5rem', height: '3.5rem' }}  />
                    </div>

                ) : (
                    <div className="home-icon-middle" onClick={() => NavigateHomeHandler('home')}>

                        <IoHomeOutline style={{ width: '7.5rem', height: '3.5rem' }} />
                    </div>

                )
                }
                {currentNavigate == 'video' ? (
                    <div className="home-icon-middle" style={{ borderBottom: '0.25ren solid #0866ff',color:'#0866ff' }}  >

                        <LuTvMinimalPlay style={{ width: '7.5rem', height: '3.5rem' }} />
                    </div>

                ) : (
                    <div className="home-icon-middle" onClick={() => NavigateHomeHandler('video')} >

                        <LuTvMinimalPlay style={{ width: '7.5rem', height: '3.5rem' }}  />
                    </div>

                )
                }
                {currentNavigate == 'shop' ? (
                    <div className="home-icon-middle" style={{ borderBottom: '0.25ren solid #0866ff',color:'#0866ff' }} >

                        <CiShop style={{ width: '7.5rem', height: '3.5rem' }} />
                    </div>
                ) : (
                    <div className="home-icon-middle"  onClick={() => NavigateHomeHandler('shop')}>

                        <CiShop style={{ width: '7.5rem', height: '3.5rem' }} />
                    </div>
                )
                }
                {currentNavigate == 'group' ? (
                    <div className="home-icon-middle" style={{ borderBottom: '0.25ren solid #0866ff',color:'#0866ff' }}  >

                        <MdGroups style={{ width: '7.5rem', height: '3.5rem' }}  />
                    </div>

                ) : (
                    <div className="home-icon-middle"  onClick={() => NavigateHomeHandler('group')}>

                        <MdGroups style={{ width: '7.5rem', height: '3.5rem' }}  />
                    </div>

                )
                }
                {currentNavigate == 'game' ? (
                    <div className="home-icon-middle" style={{ borderBottom: '0.25ren solid #0866ff',color:'#0866ff' }}>

                        <IoGameControllerOutline style={{ width: '7.5rem', height: '3.5rem' }}  />
                    </div>


                ) : (
                    <div className="home-icon-middle" onClick={() => NavigateHomeHandler('game')}>

                        <IoGameControllerOutline style={{ width: '7.5rem', height: '3.5rem' }}  />
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
                        <CgMenuGridO style={{ fontSize: '2rem' }} className="home-icon-right-mes4" />
                    </div>
                </div>
                <div className="icon-round-background" onClick={()=>setMesOpen((prev)=>!prev)}>
                    <div className="home-icon-right-mes"  >

                        <FaFacebookMessenger style={{fontSize:'1.5rem'}} className="home-icon-right-mes2" />
                    </div>
                </div>
                <div className="icon-round-background" onClick={()=>setNotificationOpen((prev)=>!prev)}>
                    <div className="home-icon-right-noti">
                        <IoIosNotifications style={{ fontSize: '2rem' }} className="home-icon-right-noti2" />
                    </div>
                </div>
                <UserImage img={user.image == "" ? Default : user.image} width={'2.5rem'} height={'2.5rem'}
                 onClick={()=>setUserSettingOpen((prev)=>!prev)} 
                // onClick={()=>navigate('/profileOther')}
                 />


            </div>
        </div>);
}

export default NavBar;