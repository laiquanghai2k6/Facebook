import { useCallback, useState } from "react";
import FacebookButton, { BUTTON_TYPE } from "./button/FacebookButton";
import HomeBio from '../assets/home-bio.png'
import Heart from '../assets/heart.png'
import GPS from '../assets/pin.png'
import HomeItem from "./HomeItem";
import ModalInfo from "./ModalInfo";
import Calendar from '../assets/calendar.png'
import Gender from '../assets/gender.png'
import { requestUser } from "../service/service";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo, selectUserProfileInfo } from "../selector/userSelector";
import { setUserBios } from "../slices/userSlice";
import Spinner from "./Spinner";



const InfoProfile = () => {
    const user = useSelector(selectUserInfo)
    const dispatch = useDispatch()
    const profileInfo = useSelector(selectUserProfileInfo)
    const [loading,isLoading] = useState(false)
    const [isBio, setIsBio] = useState(false)
    const [isInfo, setIsInfo] = useState(false)
    const closeInfo = useCallback(() => {
        setIsInfo(false)
    }, [isInfo])
    const [bioInput, setBioInput] = useState("")
    const [bio, setBio] = useState(profileInfo.bio)
    const setUserBio = async () => {

        isLoading(true)

        await requestUser.post('/setUserBio', {
            userId: user._id,
            bio: bioInput
        })
        setBio(bioInput)
        dispatch(setUserBios(bioInput))
        isLoading(false)

        setIsBio(false)
    }
    return (

        <div className="infor-profile-container">
            {isInfo && <ModalInfo closeInfo={closeInfo} />}
            {loading && <Spinner />}
            <p style={{ userSelect: 'none', color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>Giới thiệu</p>
            <p style={{ userSelect: 'none', color: 'white', fontSize: '1rem', alignSelf: 'center', marginTop: '0.25rem', marginBottom: '0.25rem' }}>{bio}</p>

            {isBio ? (
                <>
                    <textarea spellCheck={false} onChange={(e) => setBioInput(e.target.value)} style={{ height: '5rem', borderRadius: '0.5rem', border: 'none', backgroundColor: '#333334', color: 'white', outline: 'none', wordWrap: 'break-word', resize: 'none', padding: '0.5rem', userSelect: 'none' }} />
                    <div style={{ display: 'flex', marginTop: '0.5rem', flexDirection: 'row', justifyContent: 'flex-end' }}>

                        <FacebookButton onClick={() => setIsBio(false)} style={{ width: '7.5rem', height: '2rem', marginRight: '1rem', fontSize: '1rem' }} ButtonType={BUTTON_TYPE.cancel} text="Hủy" />
                        <FacebookButton onClick={() => setUserBio()} style={{ width: '7.5rem', height: '2rem', fontSize: '1rem' }} ButtonType={BUTTON_TYPE.basic} text="Lưu" />
                    </div>

                </>
            ) : (

                <FacebookButton onClick={() => setIsBio(true)} ButtonType={BUTTON_TYPE.cancel} text="Thêm tiểu sử" isLoading={false} style={{ height: '2.25rem', fontSize: '1rem', width: '100%', marginTop: '1rem' }} />
            )}
            <HomeItem img={HomeBio} text={profileInfo.live == "Chưa có" ? "Chưa có" : `Sống tại ${profileInfo.live}`} styleText={{ color: 'white' }} styleContainer={{ marginTop: '0.5rem' }} styleImg={{ width: '1.5rem', height: '1.5rem' }} />
            <HomeItem img={GPS} text={profileInfo.from == "Chưa có" ? "Chưa có" : `Đến từ ${profileInfo.from}`} styleText={{ color: 'white' }} styleContainer={{ marginTop: '0.5rem' }} styleImg={{ width: '1.5rem', height: '1.5rem' }} />
            <HomeItem img={Heart} text={profileInfo.relationship == "Chưa có" ? "Chưa có" : profileInfo.relationship} styleText={{ color: 'white' }} styleContainer={{ marginTop: '0.5rem' }} styleImg={{ width: '1.5rem', height: '1.5rem' }} />
            <HomeItem img={Calendar} text={profileInfo.birth} styleText={{ color: 'white' }} styleContainer={{ marginTop: '0.5rem' }} styleImg={{ width: '1.5rem', height: '1.5rem' }} />
            <HomeItem img={Gender} text={profileInfo.gender} styleText={{ color: 'white' }} styleContainer={{ marginTop: '0.5rem' }} styleImg={{ width: '1.5rem', height: '1.5rem' }} />

            <FacebookButton onClick={() => setIsInfo(true)} ButtonType={BUTTON_TYPE.cancel} text="Chỉnh sửa chi tiết" isLoading={false} style={{ height: '2.25rem', fontSize: '1rem', width: '100%', marginTop: '1rem' }} />

        </div>
    );
}

export default InfoProfile;