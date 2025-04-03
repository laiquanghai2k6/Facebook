import { useCallback, useState } from "react";
import MidProfileNavigate from "./MidProfileNavigate";
import PostProfile from "./PostProfile";
import InfoProfile from "./InfoProfile";
import FacebookButton, { BUTTON_TYPE } from "./button/FacebookButton";
import usertest from '../assets/user-test.jpg'
import { useSelector } from "react-redux";
import { selectUserInfo } from "../selector/userSelector";
import { User } from "../slices/userSlice";
const friendList = [
    'lhm', 'lqh', 'hth', 'ttuan', 'dvu'
]
type MidProfileProp = {
    user:User
}
const MidProfile = ({user}:MidProfileProp) => {
   
    const [currentNavigate, setCurrentNavigate] = useState(1)
    const setCurrentNavigateCallback1 = useCallback(() => {
        setCurrentNavigate(1)
    }, [currentNavigate])
    const setCurrentNavigateCallback2 = useCallback(() => {
        setCurrentNavigate(2)
    }, [currentNavigate])
 
    return (
        <div className="mid-profile-container">
            <MidProfileNavigate currentNavigate={currentNavigate} setCurrentNavigate1={setCurrentNavigateCallback1} setCurrentNavigate2={setCurrentNavigateCallback2} />
            {currentNavigate == 1 ? (
                <div className="mid-profile-combination" id="post">
                    <InfoProfile />
                    <PostProfile currentUserId={user._id} />
                </div>
            ) : (
                <div className="mid-profile-combination-friend" id="friend">
                    {Array.from({ length: friendList.length / 2 }, (_, i) => (
                        <div style={{ display: 'flex', flexDirection: 'row', userSelect: 'none' }}>
                            <div className="friend-card-left">
                                <img src={usertest} style={{ height: '10vh', width: '10vh', objectFit: 'cover', overflow: 'hidden' }} />
                                <p style={{ fontSize: '3vh', color: 'white', marginLeft: '2vh' }}>{friendList[i*2]}</p>
                            </div>
                            <div className="friend-card-right" >
                                <img src={usertest} style={{ height: '10vh', width: '10vh', objectFit: 'cover', overflow: 'hidden' }} />
                                <p style={{ fontSize: '3vh', color: 'white', marginLeft: '2vh' }}>{friendList[i*2+1]}</p>
                            </div>
                        </div>

                    ))}
                    {friendList.length % 2 == 1 &&(
                        <div style={{ display: 'flex', flexDirection: 'row', userSelect: 'none',width:'100%' }}>
                         <div className="friend-card-left" >
                             <img src={usertest} style={{ height: '10vh', width: '10vh', objectFit: 'cover', overflow: 'hidden' }} />
                             <p style={{ fontSize: '3vh', color: 'white', marginLeft: '2vh' }}>{friendList[friendList.length-1]}</p>
                         </div>
                         <div className="friend-card-right-fake" >
                         </div>

                    
                     </div>
                    ) }
                </div>
            )}

        </div>
    );
}

export default MidProfile;