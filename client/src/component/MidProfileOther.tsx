import { useCallback, useState } from "react";
import MidProfileNavigate from "./MidProfileNavigate";
import PostProfile from "./PostProfile";
import InfoProfile from "./InfoProfile";
import usertest from '../assets/user-test.jpg'

import InfoProfileOther from "./InfoProfileOther";
import LoadingPost from "./LoadingPost";
import { User, } from "../slices/userSlice";
const friendList = [
    'lhm', 'lqh', 'hth', 'ttuan', 'dvu'
]
type MidProfileOtherProp = {
    user:User
}
const MidProfileOther = ({user}:MidProfileOtherProp) => {
    const [currentNavigate, setCurrentNavigate] = useState(1)
    const setCurrentNavigateCallback1 = useCallback(() => {
        setCurrentNavigate(1)
    }, [currentNavigate])
    const setCurrentNavigateCallback2 = useCallback(() => {
        setCurrentNavigate(2)
    }, [currentNavigate])
    console.log('user',user)
    return (
        <div className="mid-profile-container">
            <MidProfileNavigate  currentNavigate={currentNavigate} setCurrentNavigate1={setCurrentNavigateCallback1} setCurrentNavigate2={setCurrentNavigateCallback2} />
            {currentNavigate == 1 ? (
                <div className="mid-profile-combination" id="post">
                    <InfoProfileOther user={user} />
                    <div style={{display:'flex',flexDirection:'column',marginLeft:'2rem'}}>

                    {/* <LoadingPost /> */}
                    </div>
                    <PostProfile currentUser={user._id} />
                </div>
            ) : (
                <div className="mid-profile-combination-friend" id="friend">
                    {Array.from({ length: friendList.length / 2 }, (_, i) => (
                        <div style={{ display: 'flex', flexDirection: 'row', userSelect: 'none' }}>
                            <div className="friend-card-left">
                                <img src={usertest} style={{ height: '5rem', width: '5rem', objectFit: 'cover', overflow: 'hidden' }} />
                                <p style={{ fontSize: '1.5rem', color: 'white', marginLeft: '1rem' }}>{friendList[i * 2]}</p>
                            </div>
                            <div className="friend-card-right" >
                                <img src={usertest} style={{ height: '5rem', width: '5rem', objectFit: 'cover', overflow: 'hidden' }} />
                                <p style={{ fontSize: '1.5rem', color: 'white', marginLeft: '1rem' }}>{friendList[i * 2 + 1]}</p>
                            </div>
                        </div>

                    ))}
                    {friendList.length % 2 == 1 && (
                        <div style={{ display: 'flex', flexDirection: 'row', userSelect: 'none', width: '100%' }}>
                            <div className="friend-card-left" >
                                <img src={usertest} style={{ height: '5rem', width: '5rem', objectFit: 'cover', overflow: 'hidden' }} />
                                <p style={{ fontSize: '1.5rem', color: 'white', marginLeft: '1rem' }}>{friendList[friendList.length - 1]}</p>
                            </div>
                            <div className="friend-card-right-fake" >
                            </div>


                        </div>
                    )}
                </div>
            )}

        </div>
    );
}

export default MidProfileOther;