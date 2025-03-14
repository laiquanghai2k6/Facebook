import { useRef } from "react";
import UserSettingCard from "./UserSettingCard";

interface UserSettingProps{
    closeUserSetting:Function
}

const UserSetting:React.FC<UserSettingProps> = ({closeUserSetting}) => {
        const userSettingRef = useRef<null |HTMLDivElement>(null)
    
    return ( 
        <div className="user-setting-container" ref={userSettingRef}>
        <p style={{ color: 'white', fontWeight: 'bold', fontSize: '3vh' }}>Cài đặt</p>
        <div className="user-setting-card-container">
            <UserSettingCard />
        </div>
    </div>
     );
}
 
export default UserSetting;