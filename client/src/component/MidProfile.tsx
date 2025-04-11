import { useCallback, useState } from "react";
import MidProfileNavigate from "./MidProfileNavigate";
import PostProfile from "./PostProfile";
import InfoProfile from "./InfoProfile";
import Default from '../assets/default-image.png'
import { User } from "../slices/userSlice";
import { Friend } from "./BodyProfile";
import UserImage from "./UserImage";
import { useNavigate } from "react-router-dom";

type MidProfileProp = {
    user: User,
    friends: Friend[],
    isLoading: boolean
}
const MidProfile = ({ user, friends, isLoading }: MidProfileProp) => {
    const navigate = useNavigate()
    const [currentNavigate, setCurrentNavigate] = useState(1)
    const setCurrentNavigateCallback1 = useCallback(() => {
        setCurrentNavigate(1)
    }, [currentNavigate])
    const setCurrentNavigateCallback2 = useCallback(() => {
        setCurrentNavigate(2)
    }, [currentNavigate])
    const navigateProfile = (id: string) => {
        navigate(`/profileOther?userId=${id}`)
    }
    return (
        <div className="mid-profile-container">
            <MidProfileNavigate currentNavigate={currentNavigate} setCurrentNavigate1={setCurrentNavigateCallback1} setCurrentNavigate2={setCurrentNavigateCallback2} />
            {currentNavigate == 1 ? (
                <div className="mid-profile-combination" id="post">
                    <InfoProfile />
                    <PostProfile currentUserId={user._id} />
                </div>
            ) : (
                (!isLoading ? (
                    <div className="mid-profile-combination-friend" id="friend">
                        {Array.from({ length: friends?.length / 2 }, (_, i) => (
                            <div style={{ display: 'flex', flexDirection: 'row', userSelect: 'none' }}>
                                <div className="friend-card-left" onClick={()=>navigateProfile(friends?.[i * 2]._id)}>
                                    <UserImage id="image-friend"  img={friends?.[i * 2].image ? friends?.[i * 2].image : Default} height={'5rem'} width={'5rem'} />
                                    <p style={{ fontSize: '1.5rem', color: 'white', marginLeft: '1rem' }}>{friends?.[i * 2].name}</p>
                                </div>
                                <div className="friend-card-right" onClick={()=>navigateProfile(friends?.[i * 2+1]._id)} >
                                    <UserImage id="image-friend"  img={friends?.[i * 2 + 1].image ? friends?.[i * 2 + 1].image : Default} height={'5rem'} width={'5rem'} />

                                    <p style={{ fontSize: '1.5rem', color: 'white', marginLeft: '1rem' }}>{friends?.[i * 2 + 1].name}</p>
                                </div>
                            </div>

                        ))}
                        {friends?.length % 2 == 1 && (
                            <div style={{ display: 'flex', flexDirection: 'row', userSelect: 'none', width: '100%' }}>
                                <div className="friend-card-left" onClick={()=>navigateProfile(friends?.[friends?.length - 1]._id)}>
                                    <UserImage id="image-friend" img={friends?.[friends?.length - 1].image ? friends?.[friends?.length - 1].image : Default} height={'5rem'} width={'5rem'} />
                                    <p style={{ fontSize: '1.5rem', color: 'white', marginLeft: '1rem' }}>{friends?.[friends?.length - 1].name}</p>
                                </div>
                                <div className="friend-card-right-fake">
                                </div>


                            </div>
                        )}
                    </div>
                ) : (
                    <div className="mid-profile-combination-friend" id="friend">
                        {Array.from({ length: 3 }, (_,) => (
                            <div style={{ display: 'flex', flexDirection: 'row', userSelect: 'none' }}>
                                <div className="friend-card-left">
                                    <div className="friend-loading-card"></div>
                                    <div className="friend-name-loading"></div>

                                </div>
                                <div className="friend-card-right" >
                                    <div className="friend-loading-card"></div>
                                    <div className="friend-name-loading"></div>
                                </div>
                            </div>
                        ))}

                    </div>
                ))

            )}

        </div>
    );
}

export default MidProfile;