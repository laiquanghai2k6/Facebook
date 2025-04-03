import { useEffect, useRef } from "react";
import UserSettingCard from "./UserSettingCard";

interface UserSettingProps{
    closeUserSetting:Function
}

const UserSetting:React.FC<UserSettingProps> = ({closeUserSetting}) => {
    const userSettingRef = useRef<null |HTMLDivElement>(null)
    useEffect(()=>{

        const handlerClick = (event:MouseEvent)=>{
            const element = (event.target as Element)
         
            if(!element.closest('.user-setting-container')){
                closeUserSetting()
                console.log('close')
            }
            
        }

        document.addEventListener('mousedown',handlerClick)
        return()=>{
            document.removeEventListener('mousedown',handlerClick)
        }

    },[])
    return ( 
        <div className="user-setting-container" ref={userSettingRef}>
        <p className="text-setting" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5rem' }}>Cài đặt</p>
        <div className="user-setting-card-container">
            <UserSettingCard />
        </div>
    </div>
     );
}
 
export default UserSetting;