import FacebookButton, { BUTTON_TYPE } from "./button/FacebookButton";
import TopLeftProfile from "./TopLeftProfile";
import Camera from '../assets/camera-black.png'
const TopProfile = () => {
    return (
        <div className="top-profile-container">
            <div className='top-profile-direct' >
                <TopLeftProfile />
            </div>
            <div className='top-profile-camera'>
                <img src={Camera} style={{ width: '3vh', height: '3vh', color: 'black' }} />
                <p style={{ fontSize: '2vh', fontWeight: 'bold' }}>Chỉnh sửa ảnh bìa</p>
            </div>
        </div>
    );
}

export default TopProfile;